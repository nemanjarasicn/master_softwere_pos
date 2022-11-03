import axios from 'axios';

import { format } from 'date-fns'

// funkcija koja salje podatke na printer
export const  sendDataPrinter = (id, gotovina, listaRacunaTmp, artikalList,  totalPrice, dataLpfr,  uplata, racunConfig) => {
 
    let listRacunPrinter = [];

    let listRacunPrinterTax = [];
    listaRacunaTmp.filter(racun => racun.activRacun === id).map(racun => {
      let newState = {
              vatCode:racun.vat,
              productName: racun.productName,
              unitName:"KOM",
              quantity: parseFloat(racun.kolicina),
              price: parseFloat(racun.cena),
              value: (parseFloat(racun.kolicina) * parseFloat(racun.cena))
      }
      listRacunPrinter.push(newState);
  
    });
  
    let uniqueVat = [...new Set(listRacunPrinter.map(item => item.vatCode))];
    
  
    uniqueVat.map(tax => {
       let totalTax = 0;
       let rateTmp;
       rateTmp = parseFloat(artikalList.filter(obj => obj.vat === tax)[0].vatValue1)  * 10;
       listRacunPrinter.filter(artikalTax => artikalTax.vatCode === tax).map(artikal => {
          totalTax = totalTax + ((parseFloat(artikal.value) / 100)  * rateTmp);
       })
  
  
       let newStateTax =  {
        categoryType: 0,
        label: tax,
        amount: Number(totalTax).toFixed(2),
        rate: rateTmp.toFixed(2),
        categoryName: "VAT"
       }
  
       listRacunPrinterTax.push(newStateTax);
    });

    
    let bayerIdTmp  =  racunConfig.buyerId ?  racunConfig.buyerId.pib   :   null

    console.log('prinete', racunConfig);
    const printerTemplate = {
      numOfCharacters: 42,
      bayerId:   bayerIdTmp,
      serverName: "POS1",
      invoiceType: racunConfig.invoiceType,
      userId: JSON.parse(localStorage.getItem('operater')) ?  JSON.parse(localStorage.getItem('operater'))  :  'Operater',
      invoiceHeader: racunConfig.invoiceHeader,
      invoiceFooter: racunConfig.invoiceFooter,
      invoiceTransactionType: racunConfig.transactionType,
      esirInvoiceNumber: "1101/1",
      headLine: racunConfig.headLine,
      refNumber: "JNJPD3MY-Dt1Ov1o0-144",
      refDateAndTime: format(new Date(), 'dd.MM.yyyy. HH:mm:ss'),
      dateAndTimeOfIssue: null,
      person: null,
      invoiceResult: {
        requestedBy: dataLpfr.data.requestedBy,
        sdcDateTime: dataLpfr.data.sdcDateTime,
        invoiceCounter: dataLpfr.data.invoiceCounter,
        invoiceCounterExtension: dataLpfr.data.invoiceCounterExtension,
        invoiceNumber: dataLpfr.data.invoiceNumber,
        resultItems: listRacunPrinter,
        invoicePayments:  racunConfig.payment,
        taxItems: dataLpfr.data.taxItems,
        verificationUrl: dataLpfr.data.verificationUrl,
        messages: dataLpfr.data.messages,
        signedBy: dataLpfr.data.signedBy,
        encryptedInternalData:  dataLpfr.data.encryptedInternalData,
        signature:  dataLpfr.data.signature, 
        totalCounter: dataLpfr.data.totalCounter,
        transactionTypeCounter: dataLpfr.data.transactionTypeCounter,
        totalAmount: dataLpfr.data.totalAmount.toFixed(2),
        taxGroupRevision: dataLpfr.data.taxGroupRevision,
        businessName: dataLpfr.data.businessName,
        tin:  dataLpfr.data.tin,
        locationName: dataLpfr.data.locationName,
        address: dataLpfr.data.address,
        district: dataLpfr.data.district,
        mrc:  dataLpfr.data.mrc
      }
    }
    const data = JSON.stringify(printerTemplate);
    const url =  'http://localhost:8085/api/v3/printers';
    axios.post(url, printerTemplate, {
      headers:  {
        'Content-Type': 'application/json',
    }
    
    
    }); //I need to change this line

    
  
}
// funkcija koja salje podatke na lpfr
export const  sendDataVpfr = (id, listaRacunaTmp, totalPrice, racunConfig) => {

  console.log('usao u lpfr',racunConfig.bayerId);
    return new Promise((resolve, reject) => {
    

        let listRacunVpfr = [];
        listaRacunaTmp.filter(racun => racun.activRacun === id).map(racun => {
          let list = [];
          list.push(racun.vat);
          let newState = {
                  gtin:  null,
                  name: racun.productName,
                  labels: list,
                
                  quantity: parseFloat(racun.kolicina),
                  unitPrice: parseFloat(racun.cena),
                  totalAmount: (parseFloat(racun.kolicina) * parseFloat(racun.cena))
          }
          listRacunVpfr.push(newState);
          
        });

        let bayerIdTmp  =  racunConfig.buyerId  ?  racunConfig.buyerId.pib   :   null
  
        const dataToVpfrTmp = {
          dateAndTimeOfIssue: null,
          invoiceType: racunConfig.invoiceType,
          transactionType:  racunConfig.transactionType,
          cashier: JSON.parse(localStorage.getItem('operater')) ?  JSON.parse(localStorage.getItem('operater'))  :  'Operater',
          buyerId:   bayerIdTmp,
          buyerCostCenterId: null, //racunConfig.buyerCostCenterId,
          invoiceNumber: "1129/2.1",
          referentDocumentNumber: "",
          referentDocumentDT: null,
          items:  listRacunVpfr,
          payment: racunConfig.payment
        }
  
        const data = JSON.stringify(dataToVpfrTmp);
        const url =  'http://localhost:8085/api/v3/invoices';
        //const url =  'http://devesdc.sandbox.suf.purs.gov.rs:8888/9e2388e9-dc30-433e-a00f-3cf187024bb4/api/v3/invoices';
        axios.post(url, data, {
          headers:  {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept-Language': 'sr-Cyrl-RS',

            
        },
        })
        .then((response) => {
          resolve({flag: true, response: response});
        }, (error) => {
          //console.log(error);
          
          reject(false);
        });; //I need to change this line
    });
}

//pakuje niz u podnizove od n elemenata
export const arrayChunk = (arr, n, activTipProizvoda,isPodgrupa, start, end , podgrupaId) => {

    let arrayTmp = arr.filter(element => element.groupName === `${activTipProizvoda}`);
    let arrayPodgrupaTmp =  arrayTmp.filter(obj   => obj.parentId  !== null);
    console.log('sddsd',getUnique(arrayTmp));
    let arratListTmp =   getUnique(arrayTmp);
   let arrayTmp1 = arratListTmp.slice(start,end);

  
    let arrayT =  arrayTmp.slice(start,end);
   
    const uniqueArray = !isPodgrupa ? getUnique(arrayTmp1) :     arrayT  ;
    const array = uniqueArray.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));

    return chunks;
  };

  const  getUnique = (arr) =>   {

    const uniqueIds = [];
    
    const unique = arr.filter(element => {
      const isDuplicate = uniqueIds.includes(element.productGroupRequest[1] && element.productGroupRequest[1].idGroup);
  
      if(element.parentId !== null) {
        if (!isDuplicate) {
          uniqueIds.unshift(element.productGroupRequest[1].idGroup);
  
          return true;
        } else {
          return false;
        }
      }
      return true;
    });
  
     return unique;
  }

// funkija proverava da li artikal ima sve potrebne vrednosti, ako ne vraca gresku 
export const checkArtikal = (artikalCheckTmp) =>  {
    //ako je message prazan onda je artikal u redu
    let message = !artikalCheckTmp.length  ? 'Ne postoji artikal' : '';
    artikalCheckTmp.map(obj => {
      Object.keys(obj).map(key => {
        if(key === 'priceLists' && !obj[key]) {
            message = 'Fali cena na artiklu';
        }
        /*if(key === 'productGroupRequest' && !obj[key][0].idGroup) {
            message = 'Fali idGroup na artiklu';
  
        }*/
        /*if(!obj[key] && key !== 'vatName' && key !== 'parentId') {
           message = 'Fali podatak u artiklu';
        }*/
      });
    })
    return message;
  }    

// funkcija za scroll up na strelice
export const handleTop = (tipScroll, refTable, refTextField) => {
    if(tipScroll === 1) {
        refTable.current.scrollBy({ top: -100, behavior: 'smooth' });
        refTextField.current.focus();
    }
    else if(tipScroll  === 2)  {
      refTable.current.scrollBy({ top: -100, behavior: 'smooth' });
    } else {
      refTable.current.scrollBy({ top: -100, behavior: 'smooth' });
      refTextField.current.focus();
    }
    
  };

// funkcija za scroll na kraj tabele
export const handleBottom = (refTable) => {
    refTable.current.scrollTop = refTable.current.scrollHeight
  }

// funkcija za scrol down na strelice
export const handleBottomStep = (tipScroll, refTable, refTextField  ) => {
    if(tipScroll === 1) { //1 za tabelu artikala 0 za tabelu tipova proizvoda
        refTable.current.scrollBy({ top: 100, behavior: 'smooth' });
        refTextField.current.focus();
    } else if(tipScroll  === 2)  {
      refTable.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
     else {
      refTable.current.scrollBy({ top: 100, behavior: 'smooth' });
        refTextField.current.focus();
    }
    
}


export const saveFile = (id,isStorno, listaRacunaTmp) => {
    const racunNaplataTmp = listaRacunaTmp.filter(racun => racun.activRacun === id)
    const url = !isStorno ? 'http://localhost:3001/saveRacun'   : 'http://localhost:3001/stornoRacun';
    axios.post(url, {
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
      body: racunNaplataTmp
    }); //I need to change this line
  
  const requestOptions = {
      method: 'POST',
      headers: {
        "content-type": "text/javascript",
      },
      body: racunNaplataTmp
      
  };
  
  
    fetch(url, requestOptions) 
          .then((response) => {console.log('sacuvan podatak')
          } , (error) => {
            if (error) {
             console.log(error);
            }
          });
   fetch('http://localhost:3001/provera', {method: 'GET'})
   .then((response) => {console.log('sacuvan podatak')
} , (error) => {
  if (error) {
   console.log(error);
  }
});
  }



export const   addUplataDnevniIzvestaj = (tipUplate,totalPrice, uplata) =>   {


  let trenutniIznos;


  if(tipUplate === 'dirGotovina')  {
      trenutniIznos = JSON.parse(localStorage.getItem('Cash'))   ?   JSON.parse(localStorage.getItem('Cash')) :  0;
  } else  {
      trenutniIznos = JSON.parse(localStorage.getItem(tipUplate))   ?   JSON.parse(localStorage.getItem(tipUplate)) :  0;
  }
      console.log('cash',trenutniIznos);
    
      if(tipUplate === 'dirGotovina')  {
          localStorage.setItem('Cash', JSON.stringify(parseFloat(trenutniIznos)    +   parseFloat(totalPrice)));
      } else if(tipUplate === 'kombinovanoPlacanje')  {
          const cashTmp =  JSON.parse(localStorage.getItem('Cash')) !== null  ?   JSON.parse(localStorage.getItem('Cash')) :  0;
          const cardTmp  =   JSON.parse(localStorage.getItem('Card')) !== null  ?   JSON.parse(localStorage.getItem('Card')) :  0;
          const checkTmp  =  JSON.parse(localStorage.getItem('Check')) !== null  ?   JSON.parse(localStorage.getItem('Check')) :  0;
          localStorage.setItem('Cash', JSON.stringify(parseFloat(cashTmp)    +   parseFloat(uplata.Cash)));
          localStorage.setItem('Card', JSON.stringify(parseFloat(cardTmp)    +   parseFloat(uplata.platnaKartica)));
          localStorage.setItem('Check', JSON.stringify(parseFloat(checkTmp)    +   parseFloat(uplata.cek)));
      } else    {
          localStorage.setItem(tipUplate, JSON.stringify(parseFloat(trenutniIznos)    +   parseFloat(totalPrice)));
      }
        

}




 export const  printReport = ()   =>  {
  console.log('dsddsds');


  const printerTemplate = {
    
      "pib":"12345",
     "numOfCharacters": 42,
      "serverName": "POS1",
     "invoiceType": "Normal",
     "companyName": "petcom",
     "reportHeader": "Dnevni izvestaj",
      "dateFrom": "2022-09-02 09:24:42",
      "dateTo": "2022-09-02 09:24:42",
     "address": "Kajmakcalanska 123",
     "invoiceResult": {
         "paidFinishdBill":500.00,
         "taxFinishTotal":12.00,
        "requestedBy": "JNJPD3MY",
        "sdcDateTime": "2022-09-02 09:24:42",
        "invoiceCounter": "6/144КП",
        "invoiceCounterExtension": "КП",
        "invoiceNumber": "JNJPD3MY-Dt1Ov1o0-144",
        "pdv":[{"N":2}], 
        "basic":[ 
            {"Gotovina":100.00,
               "Platna Kartica":0.00}],
        "reportPayment": [
           {
               "Gotovina":100.00,
               "Platna Kartica":0.00,
               "Ček":0.00,
               "Prenos na račun":0.00,
               "Vaučer":0.00,
               "Instant plaćanje":0.00,
               "Ostalo":0.00,
               "Ukupno":100.00
           }
        ]
       ,
        "avans": 10.00,
        "total": 100.00,
        "predracun":0.00
     }
  
  }

 

  const url =  'http://localhost:8085/api/v3/printers/report';
  axios.post(url, printerTemplate, {
    headers:  {
      'Content-Type': 'application/json',
  }
  });



 }




export  const  addArtikalDnevniIzvestaj   = (activId, listaRacunaTmp) =>   {


  let  izvestajProdatiArtikliTmp  =  JSON.parse(localStorage.getItem('prodatiArtikli'))  ?  JSON.parse(localStorage.getItem('prodatiArtikli'))    :   [];

  console.log('prodati arikli',  izvestajProdatiArtikliTmp);
  const racunArtikalList =   listaRacunaTmp.filter(obj  =>  obj.activRacun  ===   activId);

   racunArtikalList.map(artikal=>  {
    if(izvestajProdatiArtikliTmp && (izvestajProdatiArtikliTmp.filter(obj=>  obj.id ===  artikal.id)).length  >  0 ) {

        let  artikalProdato  =  izvestajProdatiArtikliTmp.filter(artikalProdatoTmp =>   artikalProdatoTmp.id   ===   artikal.id)
        let artikalAddTmp = {id: artikal.id, cena: artikal.cena, productName:  artikal.productName,  kolicina:  (parseFloat(artikal.kolicina) +  parseFloat(artikalProdato[0].kolicina))} 

        //const artikalProdatoList =   JSON.stringify([...izvestajProdatiArtikliTmp,artikalAddTmp]);
        console.log('fadfdfaf', artikalProdato );

        izvestajProdatiArtikliTmp =  izvestajProdatiArtikliTmp.filter(obj=> obj.id !==  artikal.id);

        izvestajProdatiArtikliTmp  =  [...izvestajProdatiArtikliTmp,artikalAddTmp];
  
        //localStorage.setItem('prodatiArtikli',   artikalProdatoList); 

    } else if(izvestajProdatiArtikliTmp  && (izvestajProdatiArtikliTmp.filter(obj=>  obj.id ===  artikal.id)).length  ===  0)  {
      let newState = {
        id: artikal.id,
        cena: artikal.cena,
        productName:  artikal.productName,
        kolicina:  artikal.kolicina
      }
      izvestajProdatiArtikliTmp =  [...izvestajProdatiArtikliTmp,newState];
    }

    localStorage.setItem('prodatiArtikli',   JSON.stringify(izvestajProdatiArtikliTmp)); 
  })

  
       
}

  
  

export const saveArtikle = (artikliLoad) => {
  const url =  'http://localhost:3001/saveArtikli';
  axios.post(url, {
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
    body: artikliLoad
  }); //I need to change this line

};