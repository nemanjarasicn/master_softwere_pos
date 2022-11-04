import * as React from 'react';
import { useRef,  useState, useEffect }  from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Card from '@mui/material/Card';
import '../Css/mainPaymentCss.css'
import Tabs from '@mui/material/Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import Tab from '@mui/material/Tab';

import {ModalCount} from '../Components/modalCount'
import {ModalPopustArtikal} from '../Components/modalPopustArtikal'
import {ModalPopustRacun} from '../Components/modalPopustRacun'
import {ModalStornoArtikal} from '../Components/modalStornoArtikla'
import {ModalNaplata} from '../Components/modalNaplata'
import {Sidebar} from '../Components/sidebar'
import {ModalDetaljnaPretraga} from '../Components/detaljnaPretraga'
import { ModalPdfStampa }  from  "../Components/stampaPdf"
import { ModalAvans}  from  "../Components/modalAvans"
import {ModalKupac} from '../Components/kupac'
import { ModalIzvestaj } from '../Components/modalIzvestaj';
import { countRacunIdList } from '../Data/countRacunId';

import {ModalIndetifikacijaKupca} from '../Components/indetifikacijaKupca'
import {ModalOpcionoPoljeKupca} from '../Components/opcionoPoljeKupca'
import   { ModalConfirm }  from "../Components/modalConfirm"
import {ModalKombinovanaNaplata} from '../Components/kombinovanaNaplata'
import {ModalAlertError} from '../Components/alerError'
import { artiklTmpBAckInitial } from '../Data/artikalBackInitial';

import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddTaskIcon from '@mui/icons-material/AddTask';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import textFile from '../Images/robots.txt'
import { sendDataPrinter,  sendDataVpfr, arrayChunk , checkArtikal, handleTop, handleBottom, handleBottomStep, saveFile, addUplataDnevniIzvestaj, addArtikalDnevniIzvestaj} from '../Funkcije/functions';

import * as txtGeneral from '../Data/txt';
import { artiklTmp }  from '../Data/artikliTmp'
import  artikli1 from '../Data/artikliTmp1.json'
import { chainPropTypes } from '@mui/utils';


export const MainPayment = () => {

  
  const theme = useTheme();

  const navigate  = useNavigate();
  const [openModalKolicina, setOpenModalKolicina] = React.useState(false);
  const [openModalPopustArtikal, setOpenModalPopustArtikal] = React.useState(false);
  const [openModalPopustRacun, setOpenModalPopustRacun] = React.useState(false);
  const [openModalStornoArtikla, setOpenModalStornoArtikla] = React.useState(false);
  const [openModalStornoRacun, setOpenModalStornoRacun] = React.useState(false);
  const [openModalNaplata, setOpenModalNaplata] = React.useState(false);
  const [openModalAvans, setOpenModalAvans] = React.useState(false);
  const [logOutFlag, setLogOutFlag] = React.useState(false);
  const [openModalIzvestaj, setOpenModalIzvestaj] = React.useState(false);
  const [openModalDetaljnaPretraga, setOpenDetaljnaPretraga] = React.useState(false);
  const [openModalPdfStampa, setOpenModalPdfStampa] = React.useState(false);
  const [openModalKupac, setOpenModalKupac] = React.useState(false);
  const [openModalIndKupca, setOpenIndKupca] = React.useState(false);
  const [openModalConfirm, setOpenModalConfirm] = React.useState(false);
  const [openModalOpKupca, setOpenModalOpKupca] = React.useState(false);
  const [openModalKomPlacanje, setOpenModalKomPlacanje] = React.useState(false);
  const [openModalAlertError, setOpenModalAlertError] = React.useState(false);
  const [activRacun, setActivRacun] = React.useState(1);
  const [activRacunNaplata, setActivRacunNaplata] = React.useState(1);
  const [activTipProizvoda, setActivTipProizvoda] = React.useState('slatkisi,');
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [podgrupaId, setPodgrupaId] = React.useState('');
  const [totalPopust, setTotalPopust] = React.useState(0);
  const [isPodgrupa, setIsPodgrupa] = React.useState(false);
  const [activPlacanje, setActivPlacanje] = React.useState('Normal');
  const [disabledFlag, setDisabledFlag]  =  React.useState(false);
  const [kupacList, setKupacList] = React.useState(JSON.parse(localStorage.getItem('initialValueKupac')));
   const [tipUplateList, setTipUplateList] = React.useState(JSON.parse(localStorage.getItem('initialValueTipUplate')));
  const [kupac, setKupac] = React.useState('');
  const [startArrayTipovi, setStartArrayTipovi] = React.useState(0);
  const [endArrayTipovi, setEndArrayTipovi] = React.useState(20);
  const [countRacunId, setCountRacunId] = React.useState(countRacunIdList);
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState('');
  const [totalKusurList, setTotalKusurList] = React.useState(JSON.parse(localStorage.getItem('initialValueKusur')));
  const [toModalKombinovano, setToModalKombinovano] = React.useState(0);
  const [showKusur, setShowKusur] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [listaRacunaTmp, setListaRacunaTmp] = React.useState(JSON.parse(localStorage.getItem('listaRacunaTmp')));
  const [buttonRacunList, setButtonRacunList] = React.useState(JSON.parse(localStorage.getItem('buttonRacunList')));
  const [buttonRacunCount, setButtonRacunCount] = React.useState(JSON.parse(localStorage.getItem('buttonRacunCount')));
  const [txt, setTxt] = React.useState(txtGeneral);
  const [totalPopustList, setTotalPopustList] = React.useState(JSON.parse(localStorage.getItem('initialValuePopust')));
  //da aplikacija ne bi pucala ako je lista artikala prazna ili ako ima problem sa komunikacijom sa api
  //const artikalListTmp = !JSON.parse(localStorage.getItem('artikalList')).error  ? JSON.parse(localStorage.getItem('artikalList')) : [];
  const articalListTmp1 =   artiklTmp;
  //const  articalListTmp1 = artikli1;
  console.log('artikl',artikli1);


  const [artikalList, seArtikalList] = React.useState(articalListTmp1);
  const [tipoviProizvodaListArtikal, setTipoviProizvodaListArtikal] = React.useState(artikalList);
  const [errorMessage, setErrorMessage] = React.useState('');
  const handleOpenModalKolicina = () => setOpenModalKolicina(true);
  const handleCloseModalKolicina = () => setOpenModalKolicina(false);
  const handleOpenModalPopustArtikal = () => setOpenModalPopustArtikal(true);
  const handleCloseModalPopustArtikal = () => setOpenModalPopustArtikal(false);
  const handleOpenModalPopustRacun = () => setOpenModalPopustRacun(true);
  const handleCloseModalPopustRacun = () => setOpenModalPopustRacun(false);
  const handleOpenModalStornoArtikal = () => setOpenModalStornoArtikla(true);
  const handleCloseModalStornoArtikal = () => setOpenModalStornoArtikla(false);
  const handleOpenModalStornoRacun = () => setOpenModalStornoRacun(true);
  const handleCloseModalStornoRacun = (obj) => {
  
                                              if(obj)    {
                                                  stornoRacun();
                                              }
                                              setOpenModalStornoRacun(false);}
  const handleOpenModalNaplata = () =>  {
                                          totalPopustList.filter(obj => obj.id == activRacun).map(row => ( setTotalPopust(row.popust)));
                                          setOpenModalNaplata(true);}
  const handleCloseModalNaplata = (obj) => {  
                                            if(obj.tipNaplate)  {
                                              naplataTotal(obj.activId, obj.tipNaplate,  obj.uplata, obj.kusur);      
                                              setOpenModalNaplata(false);     
                                            }  else {
                                              setOpenModalNaplata(false);  
                                            } 

  }

  const handleOpenModalDetaljnaPretraga = () => setOpenDetaljnaPretraga(true);
  const handleCloseModalDetaljnaPretraga = () => setOpenDetaljnaPretraga(false);
  const handleOpenModalKupac = () => setOpenModalKupac(true);
  const handleCloseModalKupac = () => setOpenModalKupac(false);
  const handleOpenModalConfirm = () => setOpenModalConfirm(true);
  const handleCloseModalConfirm = () => setOpenModalConfirm(false);
  const handleOpenModalIndKupca = () => setOpenIndKupca(true);
  const handleCloseModalIndKupca = () => setOpenIndKupca(false);
  const handleOpenModalIzvestaj = () => setOpenModalIzvestaj(true);
  const handleCloseModalIzvestaj = () => setOpenModalIzvestaj(false);
  const handleOpenModalPdfStampa = () => setOpenModalPdfStampa(true);
  const handleCloseModalPdfStampa = () => setOpenModalPdfStampa(false);
  const handleOpenModalAvans = () => setOpenModalAvans(true);
  const handleCloseModalAvans = () => setOpenModalAvans(false);
  const handleOpenModalOpKupca = () => setOpenModalOpKupca(true);
  const handleCloseModakOpKupca = () => setOpenModalOpKupca(false);


  const handleOpenModalKomPlacanje = () => setOpenModalKomPlacanje(true);
  const handleCloseModalKomPlacanje = () => setOpenModalKomPlacanje(false);


  const handleOpenModalAlertError = () => setOpenModalAlertError(true);
  const handleCloseModalAlertError = () => {
                                            
                                              setErrorMessage('');
                                              setOpenModalAlertError(false);}
  

  const [inputTmp, setInputTmp] = React.useState('');
  const unique = [...new Set(artikalList.map(item => item.groupName))].filter(obj=>   obj  !==  '');


  localStorage.setItem('uniqueTipoviArtikla', JSON.stringify(unique));   
  const [tipoviProizvoda1, settipoviProizvoda1]  =  React.useState([]);

  useEffect(() => {
    console.time('useEffect');
    unique.map((obj,i) => {
      let objTmp = {id: i,name: obj};
      settipoviProizvoda1(prevState => [...prevState, objTmp]);
    })
    console.timeEnd('useEffect');
  },[]);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartArrayTipovi(0);
    setEndArrayTipovi(20);
  };

  //funkcija vraca format za novac
  const currencyFormat = (num) => {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  const setAtivButton = (idButton) => {
    setActivRacun(idButton);
 };


//dodavanje artikla iz tipova 
const handleAddArtikalRacunTipovi = (artikal) => {

  localStorage.setItem('testCount', JSON.stringify(2)); 
  console.time('addFromTipovi');
    //let artikalTmp = artikalList.filter(element => element.code === sifra);
    let artikalTmp = [artikal];
    console.log(artikalTmp);
    let artikalCheckTmp = checkArtikal(artikalTmp);
    let countIdTmp = countRacunId.filter(obj => obj.id === activRacun);
    if(artikalCheckTmp === '') {

      
      if(checkIsInRacun(artikalTmp).length > 0) {
        const newStateArtikal = listaRacunaTmp.map(obj => {
          if (obj.id ===  artikalTmp[0].id  &&  obj.activRacun    ===   activRacun) {
            return {...obj, kolicina:  (parseFloat(obj.kolicina)   + 1)};
          } else {
            return obj;
          }
        });

        
         setListaRacunaTmp(newStateArtikal);

      
      
      }  else  {
            let artikalTmp2 = {
              id:  artikalTmp[0].id,
              idRacunProduct: countIdTmp[0].countId,
              productid: artikalTmp[0].prodctId,
              productName: artikalTmp[0].productName,
              kolicina: artikalTmp[0].unitName === 'Kom' ? 1 : 2,
              cena:  artikalTmp[0].priceLists[0].price, //zakucano dok Deki ne sredi price list
              tipProizvodaId: artikalTmp[0].productGroupRequest[0].idGroup,
              code: artikalTmp[0].code,
              activRacun: activRacun,
              popust: 0,
              vat: artikalTmp[0].vat,
              vatValue:  artikalTmp[0].vatValue1
            }
            const newState = countRacunId.map(obj => {
              if (obj.id ===  activRacun) {
                return {...obj, countId: obj.countId + 1};
              } else {
                return obj;
              }
            });
              
            //setRacunTmp01(prevState => [...prevState,artikalTmp[0]]);
            setListaRacunaTmp(prevState => [...prevState,artikalTmp2]);
            setCountRacunId(newState)
            }
  } else{
    setErrorMessage(artikalCheckTmp);
    handleOpenModalAlertError();
   
  } 

  console.timeEnd('addFromTipovi');
}



const  checkIsInRacun  = (artikal) => {
  console.log(listaRacunaTmp);
  let idTmp = artikal[0].id;
  const checkArtikal = listaRacunaTmp.filter(obj=>  obj.id  === idTmp &&  obj.activRacun   ===  activRacun);

  return checkArtikal;
}

//dodavanje artikla sa input polja
const handleAddArtikalRacun = (event) => {
  let inputTmp = '';
  let inputTmpAfter = '';
  if(event.key === '*') {
    inputTmp = event.target.value.split('*')[0];
    setInputTmp(inputTmp);
  }
 
  if (event.key === 'Enter') {
    if((event.target.value).length ===  13) {
      const str = event.target.value;
      const first2 = str.slice(0, 2);
      if(first2 === '21' )  {
        const codeTezinskiTmp = str.slice(2, 7);
        const masaTmp = str.slice(7, 13);
        const kgTmp =  masaTmp.slice(0,3);
        const grTmp = masaTmp.slice(3,6);
        const masa = parseFloat(kgTmp + '.'  + grTmp);
        console.log('tezinski bar kod', masa);


        let artikalTmp = artikalList.filter(element => element.code ===   codeTezinskiTmp  );
        let artikalCheckTmp = checkArtikal(artikalTmp);
        let countIdTmp = countRacunId.filter(obj => obj.id === activRacun);


        if(artikalCheckTmp === '') {

          let artikalTmp2 = {
            id:  artikalTmp[0].id,
            idRacunProduct: countIdTmp[0].countId,
            productid: artikalTmp[0].prodctId,
            productName: artikalTmp[0].productName,
            //kolicina: artikalTmp[0].unitName === 'Kom' ? 1 : 2,
            kolicina:   masa,
            cena:  artikalTmp[0].priceLists[0].price, //zakucano dok Deki ne sredi price list
            tipProizvodaId: artikalTmp[0].productGroupRequest[0].idGroup,
            code: artikalTmp[0].code,
            activRacun: activRacun,
            popust: 0,
            vat: artikalTmp[0].vat,
            vatValue:  artikalTmp[0].vatValue1
          }
          

          const newState = countRacunId.map(obj => {
            if (obj.id ===  activRacun) {
              return {...obj, countId: obj.countId + 1};
            } else {
              return obj;
            }
          });


          event.target.value = '';
        
          //setRacunTmp01(prevState => [...prevState,artikalTmp[0]])
          setListaRacunaTmp(prevState => [...prevState,artikalTmp2]);
          setCountRacunId(newState)
          setInputTmp('');

        }   else  {
          setErrorMessage(artikalCheckTmp);
          handleOpenModalAlertError();
          setInputTmp('');
          event.target.value = '';
        }



      }
    } else {
        inputTmp = event.target.value.split('*')[0];
        inputTmpAfter = event.target.value.split('*')[1];
        const re = /^[0-9\b\/.\/*]+$/;
        if(re.test(event.target.value) )  {
            let inputValue  =   inputTmpAfter !==  undefined ?  inputTmpAfter  :  event.target.value;
            
            let artikalTmp = artikalList.filter(element => element.code ===   inputValue || element.barCode ===  inputValue );
            let artikalCheckTmp = checkArtikal(artikalTmp);
            let countIdTmp = countRacunId.filter(obj => obj.id === activRacun);

          

            if(artikalCheckTmp === '') {

              let checkDecimal;
              if(inputTmpAfter !==  undefined) {
              
                checkDecimal =  (inputTmp % 1 !== 0  &&  artikalTmp[0].decimalShow)  ? true: (inputTmp % 1 === 0) ? true: false;
              } else {
                checkDecimal = true;
              }

              if(checkDecimal) {

                console.log('sasass');
      
                if(checkIsInRacun(artikalTmp).length > 0) {
                  const newStateArtikal = listaRacunaTmp.map(obj => {
                    if (obj.id ===  artikalTmp[0].id &&  obj.activRacun  ===  activRacun) {
                      return {...obj, kolicina:  inputTmpAfter  !==  undefined  ? (parseFloat(obj.kolicina)  + parseFloat(inputTmp))  :  (parseFloat(obj.kolicina)   + 1),};
                    } else {
                      return obj;
                    }
                  });

                  
                  event.target.value = '';
                  setListaRacunaTmp(newStateArtikal);
                  setInputTmp('');
                } else {
        
                      let artikalTmp2 = {
                        id:  artikalTmp[0].id,
                        idRacunProduct: countIdTmp[0].countId,
                        productid: artikalTmp[0].prodctId,
                        productName: artikalTmp[0].productName,
                        //kolicina: artikalTmp[0].unitName === 'Kom' ? 1 : 2,
                        kolicina:  inputTmpAfter  !==  undefined  ?  inputTmp  : 1,
                        cena:  artikalTmp[0].priceLists[0].price, //zakucano dok Deki ne sredi price list
                        tipProizvodaId: artikalTmp[0].productGroupRequest[0].idGroup,
                        code: artikalTmp[0].code,
                        activRacun: activRacun,
                        popust: 0,
                        vat: artikalTmp[0].vat,
                        vatValue:  artikalTmp[0].vatValue1
                      }
                      

                      const newState = countRacunId.map(obj => {
                        if (obj.id ===  activRacun) {
                          return {...obj, countId: obj.countId + 1};
                        } else {
                          return obj;
                        }
                      });


                      event.target.value = '';
                    
                      //setRacunTmp01(prevState => [...prevState,artikalTmp[0]])
                      setListaRacunaTmp(prevState => [...prevState,artikalTmp2]);
                      setCountRacunId(newState)
                      setInputTmp('');
                }
              }  else {
                setErrorMessage('Kolicina ne moze biti decimalni broj');
                handleOpenModalAlertError();
                setInputTmp('');
                event.target.value = '';
              
              }
            } else{
              setErrorMessage(artikalCheckTmp);
              handleOpenModalAlertError();
              setInputTmp('');
              event.target.value = '';
            
            }
          } else {

              setErrorMessage('Ne mozete uneti nista osim brojeva i znakova "*" i "."');
              setShowKusur(false);
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 5000);
              setInputTmp('');
              event.target.value = '';
          }
        }
    }
}


const childToParent = (childdata) => {
 
  console.log('asasasa', childdata.counter);
   let listaRacunaTmp1 =  JSON.parse(localStorage.getItem('listaRacunaTmp'));
   if(parseFloat(childdata.counter) === 0 )    {
    console.log('usao u count');
      const newState = listaRacunaTmp.filter(obj  =>  obj.idRacunProduct !=  childdata.id  &&     obj.activRacun  ===    activRacun);
       //setRacunTmp01(newState);
      setListaRacunaTmp(newState);
   } else   {
      const newState = listaRacunaTmp1.map(obj => {
          if (obj.idRacunProduct === childdata.id && obj.activRacun === activRacun) {
            if(childdata.tipPopusta  !==  'fiksniIznos')   {
            let popustTmp = childdata.tipPopusta === 'fiksniPopust'  ?  childdata.valuePopust   :  ((parseFloat(obj.cena) / 100) * parseFloat(childdata.valuePopust)); 
          
            return {...obj, kolicina: childdata.counter, popust:  popustTmp,  cena:  childdata.valuePopust  !== ''  ? (parseFloat(obj.cena) -   parseFloat(popustTmp)) :  parseFloat(obj.cena) };
            } else if(childdata.tipPopusta   ===  'fiksniIznos')  {
            return {...obj, kolicina: childdata.counter, popust:  childdata.valuePopust,  cena:  parseFloat(childdata.valuePopust) };
            }
          }
        
        
        return obj;
      });
       //setRacunTmp01(newState);
      setListaRacunaTmp(newState);
    }
   
 }

//funkcija brise racun posle naplate
const deleteRacun = (id) => {
  setTotalPrice(0);
  setTotalPopust(0);
  const newState = totalPopustList.map(obj => {
        if (obj.id === id) {
          return {...obj, popust: 0};
        }
    
      return obj;
  });

  setTotalPopustList(newState);
  
  let deleteRacunTmp =  JSON.parse(localStorage.getItem('listaRacunaTmp')).filter(racun => racun.activRacun !== activRacun);
  setListaRacunaTmp(deleteRacunTmp);
  if(activRacun > 1) {
    let buttonRacunListTmp = buttonRacunList.filter(buttonList => buttonList.id  !==  activRacun);
    setButtonRacunList(buttonRacunListTmp);
    setButtonRacunCount(buttonRacunCount -1);
    setActivRacun(1);
  }
    
}


const stornoRacun = () => {
  setTotalPrice(0);
  setTotalPopust(0);
  const newState = totalPopustList.map(obj => {
        if (obj.id === activRacun) {
          return {...obj, popust: 0};
        }
    
      return obj;
  });

  setTotalPopustList(newState);
  
  let deleteRacunTmp =  JSON.parse(localStorage.getItem('listaRacunaTmp')).filter(racun => racun.activRacun !== activRacun);
  setListaRacunaTmp(deleteRacunTmp);
  if(activRacun > 1) {
    let buttonRacunListTmp = buttonRacunList.filter(buttonList => buttonList.id  !==  activRacun);
    setButtonRacunList(buttonRacunListTmp);
    setButtonRacunCount(buttonRacunCount -1);
    setActivRacun(1);
  }
  saveFile(activRacun,true, listaRacunaTmp);
   
}

const toModalCount = (id,productName) => {
 
  setData({id,txt,productName});

}


// setuje listu racuna i total price
useEffect(() => {
  //localStorage.setItem('racunTmp01', JSON.stringify(racunTmp01));
  localStorage.setItem('listaRacunaTmp', JSON.stringify(listaRacunaTmp));
  let listaRacunaTmp1 =  JSON.parse(localStorage.getItem('listaRacunaTmp'));
  if(JSON.parse(localStorage.getItem('listaRacunaTmp')).length) {
      const total = listaRacunaTmp1.filter(racun => racun.activRacun === activRacun).reduce((total, row) => total + (parseFloat(row.kolicina)  * (parseFloat(row.cena))),0);
    setTotalPrice(total);
  }
}, [listaRacunaTmp,activRacun]);

// setuje listu popusta
useEffect(() => {
  console.time('useEffectPopust');
  //localStorage.setItem('racunTmp01', JSON.stringify(racunTmp01));
  localStorage.setItem('initialValuePopust', JSON.stringify(totalPopustList));
  console.time('useEffectPopust');
}, [totalPopustList]);


useEffect(() => {
  console.time('useEffectButton');
  localStorage.setItem('buttonRacunList', JSON.stringify(buttonRacunList));
  localStorage.setItem('buttonRacunCount', JSON.stringify(buttonRacunCount));
  console.time('useEffectButton');
}, [buttonRacunList]);


useEffect(() => {
  if(logOutFlag) {
    navigate({
      pathname: '/',
    
    })
  }
  
}, [logOutFlag]);


// ovo su ref koji gadjaju na odredjeni element
const refTable = useRef();
const refTipoviProizvoda = useRef();
const refTextField = useRef();

// omogucava uvek focus na input polju i omogucava da kad se ubaci 
// novi artikal, uvek scroll bude na kraju
useEffect(() => {
  refTextField.current.focus();
  handleBottom(refTable);
});


const  addSearchValue = (searchCode) => {
  //let artikalSearchTmp = JSON.parse(localStorage.getItem('artikalList')).filter(obj => obj.id ===  searchCode );


  let artikalSearchTmp = artiklTmp.filter(obj => obj.id ===  searchCode );

  console.log('test', artikalSearchTmp[0]);
 
  handleAddArtikalRacunTipovi(artikalSearchTmp[0]);
 

}


const  addKupac = (searchKupac)  => {

  let kupacTmp =  searchKupac.tipSearch === 'indetifikacijaKupca'   ? { naziv: ''  , pib: (searchKupac.selectIndetifikacija + ':'  + searchKupac.indetifikacijaValue) }  :  searchKupac.kupac[0] 
 
  setKupac(searchKupac[0]);
  const newState = kupacList.map(obj => {
    if (obj.id === activRacun) {
      return {...obj, kupac:  kupacTmp};
    }
    return obj;
  });
 
  setKupacList(newState);
}



//  funkcija za dodavanje racuna na +
const addRacun = () => {
   let buttonRacunTmp = 
   {
        id: buttonRacunCount,
        name: 'Racun 0' + buttonRacunCount
  }
  if(buttonRacunCount <= 4) {
      setButtonRacunList(prevState => [...prevState,buttonRacunTmp]);
      setButtonRacunCount(buttonRacunCount + 1);
  }
  refTextField.current.focus();

  fetch('http://localhost:3001/provera', {method: 'GET', mode: 'no-cors',})
  .then((response) => {console.log('sacuvan podatak')
} )
}


const  addPopust = (dataPopust) => {
 
    let popust = dataPopust.popustRadio === 'procenat'  ?  
    ((parseFloat(totalPrice) / 100) * parseFloat(dataPopust.popust)) : parseFloat(dataPopust.popust);

    const newState = totalPopustList.map(obj => {
      if (obj.id === activRacun) {
        return {...obj, popust: popust};
      }
      return obj;
    });
    console.log(dataPopust.massageError)
    
    if(dataPopust.massageError !== '') {
      setErrorMessage(dataPopust.massageError);
      setTotalPopustList(newState);
      setShowKusur(false);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
   
          setTotalPopustList(newState);
    }
}

const openModalKu = () => {
  handleOpenModalKupac();
}

const  openModalIz = () =>   {
  console.log('faffadfdf');
  handleOpenModalIzvestaj();
}

const scrollUpTipovi = ()   =>  {
  if(startArrayTipovi >  0)   {
      setStartArrayTipovi(startArrayTipovi - 20);
      setEndArrayTipovi(endArrayTipovi - 20);
  }
}


const scrollDownTipovi = ()   =>  {
    setStartArrayTipovi(startArrayTipovi + 20);
    setEndArrayTipovi(endArrayTipovi + 20);
}


const openIndKupcaFunc = () => {
 
  handleCloseModalKupac();
  handleOpenModalIndKupca();
}

const openOPKupca  = () => {
  handleCloseModalKupac();
  handleOpenModalOpKupca();
}

const openModelKomPlacanje =  (activIdNp) => {
  handleCloseModalNaplata({activId: activIdNp});
  setToModalKombinovano({totalPrice:  totalPrice, activId:  activIdNp,  totalPopust:    totalPopust  });
  handleOpenModalKomPlacanje();

}


/*const addKusur = (dataKusur) => {
  console.log('kusur total',dataKusur);
  const newState = totalPopustList.map(obj => {
    if (obj.id === dataKusur.id) {
      return {...obj, kusur: dataKusur.kusur};
    }
    return obj;
  });
  setTotalKusurList(newState);
}*/


 const naplataTotal =  async (activRacunid, tipNaplate, uplata, kusur) => {

    setDisabledFlag(true);
  
    const newState = totalKusurList.map(obj => {
      if (obj.id === activRacunid) {
        return {...obj, kusur: kusur};
      }
      return obj;
    });
    setTotalKusurList(newState);


  
 

  const kupacTmp =  kupacList.filter(kupac => kupac.id ===  activRacunid);
  console.log('kupac',  kupacTmp[0])

  let racunConfig = '';
  let invoiceType = activPlacanje === 'Advance'  ?  'Advance' : (activPlacanje   ===  'Proforma'  ?  'Proforma'  :    'Normal');
  let transactionType = activPlacanje  !== 'Refund'   ?   'Sale'  : 'Refund';
  let invoiceHeader  =   activPlacanje !==  'Proforma'   ? 'FISKALNI RAČUN' :  'OVO NIJE FISKALNI RAČUN'; //ovo je zkucano dok ne ubacimo kopije racuna
  let invoiceFooter   =  activPlacanje !==  'Proforma'   ? 'FISKALNI RAČUN' :  'OVO NIJE FISKALNI RAČUN'; //ovo je zakucano dok ne ubacimo kopije racuna
  let buyerId  =  kupacTmp[0].kupac  !== '' ?   kupacTmp[0].kupac  :  null;
  let buyerCostCenterId =  kupacTmp.kupac  !== '' ?   kupacTmp.kupac  :  null;
  let headLine =  activPlacanje === 'Advance'  ?  'AVANS-PRODAJA' : (activPlacanje   ===  'Proforma'  ?  'PREDRACUN PRODAJA'  :    'PROMET PRODAJA');

  if(tipNaplate  === 'dirGotovina')  {
    racunConfig = {invoiceType: invoiceType,
                  transactionType:transactionType,
                  invoiceHeader:invoiceHeader,
                  invoiceFooter:invoiceFooter,
                  buyerId:buyerId,
                  buyerCostCenterId:buyerCostCenterId,
                  headLine:  headLine,
                   payment: [
                    {
                      paymentType: "Cash",
                      amount:  Number(totalPrice).toFixed(2)
                    }
                  ]
                  }

  } else if(tipNaplate ===  'kombinovanoPlacanje') {



    console.log('fsdffd', uplata.Cash);
     racunConfig = {invoiceType: invoiceType,
                    transactionType:transactionType,
                    invoiceHeader:invoiceHeader,
                    invoiceFooter:invoiceFooter,
                    buyerId:buyerId,
                    buyerCostCenterId:buyerCostCenterId,
                    headLine:  headLine,
                   payment: [
                    {
                      paymentType: "Cash",
                      amount:  Number(uplata.Cash).toFixed(2)
                    },
                    {
                      paymentType: "Card",
                      amount:  Number(uplata.platnaKartica).toFixed(2)
                    },
                    {
                      paymentType: "Check",
                      amount:  Number(uplata.cek).toFixed(2)
                    },
                    /*{
                      paymentType: "Virman",
                      amount:  Number(uplata.virman).toFixed(2)
                    },*/
                    
                  ]
                  }


  }  else {
    racunConfig = {
                    invoiceType: invoiceType,
                    transactionType:transactionType,
                    invoiceHeader:invoiceHeader,
                    invoiceFooter:invoiceFooter,
                    buyerId:buyerId,
                    buyerCostCenterId:buyerCostCenterId,
                    headLine:  headLine,
                    payment: [
                      {
                        paymentType: tipNaplate,
                        amount:  Number(uplata).toFixed(2)
                      }
                    ]
                  }
  }

  const dataLpfr = await(sendDataVpfr(activRacunid, listaRacunaTmp,  totalPrice, racunConfig));

  console.log(kupacList);

  if(dataLpfr.flag) {

        let gotovinaTmp = 0;
        
        addUplataDnevniIzvestaj(tipNaplate,totalPrice,uplata);
        addArtikalDnevniIzvestaj(activRacunid, listaRacunaTmp);


        if(tipNaplate  === 'dirGotovina')  {
          //addKusur({id: activRacunid, kusur: 0 });
          gotovinaTmp = totalPrice;

        }  




        setActivRacunNaplata(activRacunid)
        setShowError(false);
        setShowKusur(true);
        localStorage.setItem('racunTmp01', JSON.stringify([]));
        sendDataPrinter(activRacunid,gotovinaTmp, listaRacunaTmp,  artikalList, totalPrice,dataLpfr.response, uplata, racunConfig);                                    
        saveFile(activRacunid,false, listaRacunaTmp);
        deleteRacun(activRacunid);
        const newState = countRacunId.map(obj => {
          if (obj.id ===  activRacunid) {
            return {...obj, countId: 1};
          } else {
            return obj;
          }
        });
        const newStateKupac = kupacList.map(obj => {
         
          if (obj.id ===  1) {
            return {...obj, kupac: ''};
          } else {  
            return obj;
          }
        });
        console.log(newStateKupac);
        setCountRacunId(newState)
        setKupac('');
        setActivPlacanje('Normal');
        setKupacList(newStateKupac);
        setTimeout(() => {
                setShowKusur(false);
                setDisabledFlag(false);
        }, 5000);
        

 } else {
  setErrorMessage('Racun nije poslat u lpfr');
  setShowKusur(false);
  setShowError(true);
  setTimeout(() => {
    setShowError(false);
  }, 5000);
 }
  
}

const CustomButtonTipProizvodaPodgrupe = (col) => {
   return (
    <Box sx={{position: 'relative', mt: 2.5}}>
            <Button  onClick={() => addTipoviProizvodaListPodgrupe(col.col.productGroupRequest[1].idGroup)}   variant="contained"  sx={{ml:2, zIndex: 2,  position:  'relative', background: "#1e2730", height: () => window.devicePixelRatio == 1.5 ? 60 : 80, gap:  '8px',   padding:  '20px',   borderColor:   'red !important',  borderRadius:   '12px',  border:  ' 3px solid #EA9A22',lineHeight: '32px', fontWeight: 400, fontFamily: 'Roboto', textTransform:  'none', fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 20, width: '90%'}}  >{col.col.productGroupRequest[1].groupName}</Button>
            <Button   variant="contained"  sx={{ml:2, zIndex: 1,  bottom: '8px',left: '5px', position:  'absolute',  background: "#1e2730", height: () => window.devicePixelRatio == 1.5 ? 60 : 80, gap:  '8px',   padding:  '20px',   borderColor:   'red !important',  borderRadius:   '12px',  border:  ' 3px solid #EA9A22',lineHeight: '32px', fontWeight: 400, fontFamily: 'Roboto', textTransform:  'none', fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 20, width: '85%'}}  ></Button>
            <Button   variant="contained"  sx={{ml:2, bottom: '16px',left: '12px', position:  'absolute',  background: "#1e2730", height: () => window.devicePixelRatio == 1.5 ? 60 : 80, gap:  '8px',   padding:  '20px',   borderColor:   'red !important',  borderRadius:   '12px',  border:  ' 3px solid #EA9A22',lineHeight: '32px', fontWeight: 400, fontFamily: 'Roboto', textTransform:  'none', fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 20, width: '75%'}}  ></Button>
    </Box>
    )
}


const CustomButtonTipProizvoda = (col) => {
   return (
    <Box sx={{position: 'relative', mt: 2.5}}>
            <Button  onClick={() => col.col.productName === 'test' ? backFromPredgrupa() : handleAddArtikalRacunTipovi(col.col)}   variant="contained"  sx={{ml:2, zIndex: 2,  position:  'relative', background: "#1e2730", height: () => window.devicePixelRatio == 1.5 ? 60 : 80, gap:  '8px',   padding:  '20px',   borderColor:   'red !important',  borderRadius:   '12px',  border:  () => col.col.productName === 'test' ?  'none' : ' 3px solid #EA9A22',lineHeight: '32px', fontWeight: 400, fontFamily: 'Roboto', textTransform:  'none', fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 20, width: '90%'}}  >{col.col.productName  ===  'test' ? <KeyboardReturnIcon></KeyboardReturnIcon>  : col.col.productName }</Button>

    </Box>
    )
}

const  backFromPredgrupa = () => {
  const arrayTmp = artikalList.filter(element => element.groupName ===  activTipProizvoda);
  setTipoviProizvodaListArtikal(arrayTmp);
  setIsPodgrupa(false);
  setPodgrupaId('');
}

const  addTipoviProizvodaListPodgrupe = (idPodgr) =>  {
      setIsPodgrupa(true);
      setPodgrupaId(idPodgr);
      const arrayTmp = artikalList.filter(element => element.parentId !==  null    &&  element.productGroupRequest[1].idGroup ===   idPodgr);
      arrayTmp.unshift(artiklTmpBAckInitial);
      
      setTipoviProizvodaListArtikal(arrayTmp);          
}




const  naplataKombinovano =  (dataKomNaplata)   =>   {

  console.log('dsdsdd',dataKomNaplata);
  naplataTotal(1,dataKomNaplata.tipUplate,dataKomNaplata.uplata, 0);
  handleCloseModalKomPlacanje();



}

const  setActivTabTipProizvoda = (groupName) => {
  setIsPodgrupa(false);
  setPodgrupaId('');
  setActivTipProizvoda(groupName);
  setTipoviProizvodaListArtikal(artikalList);
}



const  logOutFunc   =  (potvrdi)  =>   {
  if(potvrdi)   {
      navigate({
        pathname: '/',
      
      })
    }
}


  return (
    <ThemeProvider theme={theme}>
      <Grid container  
            sx={{ height: '100vh',  
                  backgroundColor:  '#1e2730',
                  display:  'flex'
                   }}>
        <CssBaseline />
            <Grid item xs={0.6} >
              <Sidebar openModal={openModalKu}  openModalIzvestajOp={openModalIz}  openModalPdfStampa={handleOpenModalPdfStampa}  openModalConfirmOp={handleOpenModalConfirm}></Sidebar>
            </Grid>
            <Grid item xs={11.4}>
              <Box  sx={{ flexGrow: 1,  height: '100vh', overflow: 'auto'  , display:  'flex' }}>
                    <Grid  item
                        xs={8.131}
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%", padding:  '20px', pt: 0}}
                      >
                          <Grid item style={{ background: "#1e2730", height: "5%",  marginTop:window.devicePixelRatio == 1.5 ?  '25px' : '40px' ,  alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                          <ModalAlertError openProps={openModalAlertError} handleCloseprops={handleCloseModalAlertError}   fromParent={errorMessage}  ></ModalAlertError>
                          {totalKusurList.filter(obj => obj.id == activRacunNaplata).map(row => (
                                        

                          <Box sx={{position:  'absolute',   display:  showKusur ?  'flex'  :  'none'  ,width:  '408px', height: '80px', borderRadius:   '8px',      top: '90%',left: '26%',  backgroundColor:  '#6CB238'}} >
                               <Grid  item xs={6}  sx={{display:  'flex' , alignItems:  'center', justifyContent:  'center'}}>
                                    <Typography  sx={{display:  'flex',
                                          }}><AddTaskIcon sx={{ fontSize: 30, mr: 1.5,  mt: 0.5,  color:  'white'}} /><Typography  sx={{ fontFamily: 'Roboto', mt: 0.5, color:  'white', 
                                          fontStyle: 'normal',

                                          /* or 158% */
                                          letterSpacing: '0.02em',
                                          fontWeight: 700,
                                          lineHeight:  '32px',
                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24, alignItems:  'center', justifyContent:  'center'}}> Racun {activRacunNaplata}</Typography></Typography>
                                </Grid>
                              <Grid  item  xs={6}    sx={{display:  'flex' , alignItems:  'center', justifyContent:  'center'}}  >
                                    <Typography  sx={{display: 'flex', fontFamily: 'Roboto', color:  'white', 
                                          fontStyle: 'normal',

                                          /* or 158% */
                                          letterSpacing: '0.02em',
                                          fontWeight: 400,
                                          lineHeight:  '32px',
                                          textAlign: 'center',
                                          textTransform: 'none',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,
                                          }}> Kusur: <Typography sx={{fontFamily: 'Roboto', ml: 2.5, color:  'white', 
                                          fontStyle: 'normal',

                                          /* or 158% */
                                          letterSpacing: '0.02em',
                                          fontWeight: 700,
                                          lineHeight:  '32px',
                                          textAlign: 'center',
                                          textTransform: 'none',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,
                                         }}>{currencyFormat(row.kusur)}</Typography></Typography>
                              </Grid>  
                          </Box>
                           ))}
                          <Box sx={{position:  'absolute',   display:  showError ?  'flex'  :  'none'  ,width:  '361px', height: '80px', borderRadius:   '8px',      top: '90%',left: '26%',  backgroundColor:  '#D54663'}} >
                               <Grid  item xs={6}  sx={{display:  'flex' , alignItems:  'center', justifyContent:  'center'}}>
                                    <Typography  sx={{display:  'flex',
                                          }}><ErrorOutlineIcon sx={{ fontSize: 30, mr: 1.5,  mt: 0.5,  color:  'white'}} /><Typography  sx={{ fontFamily: 'Roboto', mt: 0.5, color:  'white', 
                                          fontStyle: 'normal',

                                          /* or 158% */
                                          letterSpacing: '0.02em',
                                          fontWeight: 400,
                                          lineHeight:  '32px',
                                          textAlign: 'center',
                                          textTransform: 'none',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24, alignItems:  'center', justifyContent:  'center'}}> Greska - </Typography></Typography>
                                </Grid>
                              <Grid  item  xs={6}    sx={{display:  'flex' , alignItems:  'center', justifyContent:  'center'}}  >
                                    <Typography  sx={{display: 'flex', fontFamily: 'Roboto', color:  'white', 
                                          fontStyle: 'normal',

                                          /* or 158% */
                                          letterSpacing: '0.02em',
                                          fontWeight: 400,
                                          lineHeight:  '32px',
                                          textAlign: 'center',
                                          textTransform: 'none',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16,
                                          }}> {errorMessage}</Typography>
                              </Grid>  
                          </Box>
                              <Grid item xs={6}  sx={{display:  'flex'}}>
                                  {buttonRacunList.map((item,index) => (
                                      <Button key={index} variant="contained" onClick={()=>setAtivButton(item.id)} sx={{ml:2,
                                        p:   window.devicePixelRatio == 1.5 ?  0 : 'none',
                                        backgroundColor:  () => item.id === activRacun ? '#1E6812' : '#323b40', 
                                      '&:hover': {
                                        backgroundColor: '#6cb238',
                                        borderColor: '#0062cc',
                                        boxShadow: 'none',
                                      },
                                      '&:first-child': {
                                        ml: 0,
                                      },
                                      "&:active": {
                                        backgroundColor: '#6cb238'
                                      }, }}
                                      
                                      ><Typography sx={{fontSize:  () => window.devicePixelRatio == 1.5 ? 10 : 16}}>{item.name}</Typography></Button>
                                  ))}
                                  <Button  variant="contained"   onClick={() => addRacun()} sx={{ml:2, fontSize: 28, 
                                        backgroundColor: '#323b40',
                                        
                                      '&:hover': {
                                        backgroundColor: '#6cb238',
                                        borderColor: '#0062cc',
                                        boxShadow: 'none',
                                        
                                      },
                                      '&:first-child': {
                                        ml: 0,
                                      },
                                      "&:active": {
                                        backgroundColor: '#6cb238'
                                      }, }}>+</Button>
                              </Grid>
                              <Grid item xs={4} sx={{display:  'flex'}} >
                                  <TextField
                                      id="outlined-password-input"
                                      variant= "outlined"
                                      onKeyDown={handleAddArtikalRacun}
                                      autoComplete="current-password"
                                      inputRef={refTextField}
                                      autoFocus
                                      fullWidth
                                      sx={{ml:  2,
                                          "& .MuiOutlinedInput-root ": {
                                            backgroundColor:  '#323b40',
                                            height: '48px'
                                    
                                          },
                                          "& .MuiOutlinedInput-input": {
                                            color: "white",
                                                       
                                          },
                                        }}
                                    />
                              </Grid>
                              <Grid xs={2}   sx={{display:  'flex'}}  >
                

                                    <Button  fullWidth variant="contained"   onClick={handleOpenModalDetaljnaPretraga} startIcon={<SearchIcon  sx={{color:  'black'}} />} sx={{ml: 2, backgroundColor:  '#6CB238' }}>
                                      <Typography sx={{ color:  'black', 
                                              fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  10 : 16,
                                              fontWeight: 'medium'}}>{txt.txtDetaljnaPretraga}</Typography>
                                    </Button>
                          
                                
                              </Grid>
                          </Grid>  
                          <ModalDetaljnaPretraga openProps={openModalDetaljnaPretraga}  handleCloseprops={handleCloseModalDetaljnaPretraga}    fromModalDp={addSearchValue}  refresh={true} ></ModalDetaljnaPretraga>
                          <ModalPdfStampa  openProps={openModalPdfStampa}  handleCloseprops={handleCloseModalPdfStampa}></ModalPdfStampa>
                          <ModalAvans  openProps={openModalAvans}  handleCloseprops={handleCloseModalAvans}></ModalAvans>
                          <ModalKupac openProps={openModalKupac}  handleCloseprops={handleCloseModalKupac}    fromModalKupac={addKupac}   openModalIndetifikacijaKupca={openIndKupcaFunc}    openModalOpKupca={openOPKupca}   ></ModalKupac>
                          <ModalIzvestaj  openProps={openModalIzvestaj}  handleCloseprops={handleCloseModalIzvestaj}></ModalIzvestaj>
                          <ModalConfirm  openProps={openModalConfirm}  handleCloseprops={handleCloseModalConfirm}   logOut={() => setLogOutFlag(true)}></ModalConfirm>
                          <ModalIndetifikacijaKupca openProps={openModalIndKupca}  handleCloseprops={handleCloseModalIndKupca}     fromIndetifikacijaKupca={addKupac}     ></ModalIndetifikacijaKupca>
                          <ModalOpcionoPoljeKupca openProps={openModalOpKupca}  handleCloseprops={handleCloseModakOpKupca}     ></ModalOpcionoPoljeKupca>
                          <Grid  sx={{ background: "#323b40", marginTop:  '20px',  height: "82%",  borderRadius:  2}}  >
                            <Grid  sx={{ height: "80%", maxHeight: '80%' , overflowY:  'scroll'}} ref={refTipoviProizvoda}>
                            {/*<Typography sx={{mt: 2, ml:1, color: '#6cb238'}}>{inputTmp} X</Typography>*/}
                              {arrayChunk(tipoviProizvodaListArtikal, 4,activTipProizvoda, isPodgrupa, startArrayTipovi,  endArrayTipovi, podgrupaId).map((row, i) => (
                                <Grid item xs={12} m={2}  sx={{display: 'flex'}}>
                                  {row.map((col, i) => (
                                      <Grid item xs={3} >
                
                                          {/*<Button  onClick={() => handleAddArtikalRacunTipovi(col.code)}   variant="contained"  sx={{ml:2, background: "#1e2730", height: () => window.devicePixelRatio == 1.5 ? 60 : 80, gap:  '8px',   padding:  '20px',   borderColor:   'red !important',  borderRadius:   '12px',  border:  ' 3px solid #EA9A22',lineHeight: '32px', fontWeight: 400, fontFamily: 'Roboto', textTransform:  'none', fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 20, width: '90%'}}  >{col.productName}</Button>*/}
                                         { col.parentId  === null ? <CustomButtonTipProizvoda col={col}></CustomButtonTipProizvoda> : (isPodgrupa  ? <CustomButtonTipProizvoda col={col}></CustomButtonTipProizvoda> : <CustomButtonTipProizvodaPodgrupe  col={col}></CustomButtonTipProizvodaPodgrupe>)}
                                      </Grid>
                                  ))}
                                </Grid>
                              ))}   
                              </Grid>
                              <Grid item sx={{ height: "5%",   display:  'flex',  alignItems:    'center',  mr: 2.5, justifyContent:  'flex-end' }} >
                                      <Button variant="contained"    sx={{display: 'flex', mt: 9, backgroundColor:   '#4f5e65',  alignContent:    'center' , 
                                            maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                            maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                            minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                            minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => scrollUpTipovi()} > <KeyboardArrowUpIcon /></Button>
                                      <Button variant="contained"   sx={{marginLeft:  window.devicePixelRatio == 1.5 ? '16px' : '24px', mr: 1,  mt:  9,  display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   
                                            maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                            maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                            minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                            minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => scrollDownTipovi()} ><KeyboardArrowDownIcon /></Button>
                              </Grid>
                              <Grid    sx={{   height:  '10%',  display: 'flex', mt:   window.devicePixelRatio == 1.5 ? 4 : 6}}>
                                  <Grid item xs={10} >
                                    <Tabs
                                      value={value}
                                      onChange={handleChange}
                                      variant="scrollable"
                                      scrollButtons
                                      allowScrollButtonsMobile
                                      aria-label="scrollable auto tabs example"
                                      sx={{'& .MuiTabScrollButton-root': {
                                        color: 'red',
                                        
                                      },
                                      '& .Mui-selected': {color:  'white !important'}}}
                                      TabIndicatorProps={{ style: { background: "#6cb238" } }}  
                                    >
                                      {tipoviProizvoda1.map((row,index)  => (
                                          <Tab label={row.name}  onClick={()=>setActivTabTipProizvoda(row.name) }   sx={{color: '#CED2D4', fontFamily: 'Roboto',
                                          fontStyle: 'normal',

                                          /* or 158% */

                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,
                                          fontWeight: 'medium'}} />
                                      ))}
                                    </Tabs>
                                  </Grid>
                                  <Grid item xs={2}  sx = {{ display:  'flex',  mr: 2.5,  justifyContent:  'flex-end', alignItems: 'center'}}  >
                                      <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , 
                                              maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                              maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(0, refTipoviProizvoda, refTextField)} > <ArrowBackIosIcon  sx={{ml:1, fontSize: 16}}/></Button>
                                      <Button variant="contained"   sx={{   marginLeft:   window.devicePixelRatio == 1.5 ? '16px' : '24px', mr: 1, display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   
                                              maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                              maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(0,  refTipoviProizvoda, refTextField)} ><ArrowForwardIosIcon  sx={{ fontSize:  16}} /></Button>
                                </Grid>               
                              </Grid> 
                          </Grid>
                          <Grid item style={{ background: "#1e2730", marginTop: '20px', height: "5%" }} >
                          <Grid  container  sx={{display: 'flex'}}>
                              <Grid item xs={4} justifyContent='flex-start'>
                                <Typography sx={{fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              
                                              lineHeight:  '26px',
                                              
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16}} color="#ffffff"  >
                                      {txt.txtOperater} : 
                                      {JSON.parse(localStorage.getItem('operater')) !== undefined  ? (' ' + JSON.parse(localStorage.getItem('operater')))  :  ''} 
                                </Typography>
                              </Grid>
                              <Grid item xs={5} justifyContent='center'> 
                              </Grid>
                              <Grid  item xs={3} sx={{display:  'flex', backgroundColor:  '#B5D4A7',  borderRadius:  '8px'}} justifyContent='flex-start'>
                              {kupacList.filter(kupac => kupac.id === activRacun).map((row,index) => (
                                <Typography   sx={{  color:  'black', ml: 2,  fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              lineHeight:  '26px',
                                              
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16, marginTop:  '8px', marginBottom:  '8px'}} color="#ffffff"  >
                                      {txt.txtKupac} : {row.kupac.naziv} ({row.kupac.pib})
                                  
                                </Typography>
                                ))}
                              </Grid>
                            </Grid>         
                          </Grid>
                    </Grid>
      
                    <Grid item
                        justifyContent="space-between"
                        sx={{ height: "100%", overflow:  'auto' }}
                        xs={3.868}
                      >
                          <Grid item style={{ background: "#323b40", height: "100%",  display:  'flex',  flexDirection:  'column'}} >
                              <Grid item style={{  height: "5%",  marginTop: window.devicePixelRatio == 1.5 ? '25px' : '40px',   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                                    <ButtonGroup sx={{
                                      marginLeft:  '10px',
                                      marginRight:  '10px',
                                      width: "100%",
                                      height: '50px'
                                      
                                      }}  >
                                        <Button variant="contained"   onClick={() => setActivPlacanje('Normal')}    sx={{backgroundColor:  activPlacanje === 'Normal'  ?    '#1E6812' :  '#1e2730' ,   width:   '22.5%',  marginRight: '8px',fontFamily: 'Roboto',
                                              fontStyle: 'normal',
                                              '&:hover': {
                                                backgroundColor: '#6cb238',
                                                borderColor: '#0062cc',
                                                boxShadow: 'none',
                                              },

                                              /* or 158% */

                                              textTransform:  'none', 
                                              lineHeight:  '26px', fontSize:  () => window.devicePixelRatio == 1.5 ? 10 : 16}}>Prodaja</Button>
                                        <Button variant="contained"  onClick={() => setActivPlacanje('Proforma')}    sx={{backgroundColor:  activPlacanje === 'Proforma'  ?    '#FDBD01' :  '#1e2730'   ,  marginRight: '8px',   width:   '22.5%',fontFamily: 'Roboto',
                                              fontStyle: 'normal',
                                              '&:hover': {
                                                backgroundColor: '#6cb238',
                                                borderColor: '#0062cc',
                                                boxShadow: 'none',
                                              },

                                              /* or 158% */

                                              textTransform:  'none',
                                              lineHeight:  '26px',  fontSize:  () => window.devicePixelRatio == 1.5 ? 10 : 16}}>Predracun</Button>
                                        <Button variant="contained"    onClick={() => {setActivPlacanje('Advance'); handleOpenModalAvans()}}      sx={{backgroundColor:  activPlacanje === 'Advance'  ?    '#E55451' :  '#1e2730' , marginRight:  '8px',   width:   '22.5%',  fontFamily: 'Roboto',
                                              fontStyle: 'normal',
                                              '&:hover': {
                                                backgroundColor: '#6cb238',
                                                borderColor: '#0062cc',
                                                boxShadow: 'none',
                                              },

                                              /* or 158% */

                                              textTransform:  'none', 
                                              lineHeight:  '26px', fontSize:  () => window.devicePixelRatio == 1.5 ? 10 : 16}}>Avans</Button>
                                        <Button variant="contained"     onClick={() => setActivPlacanje('obrt')}    sx={{backgroundColor:  activPlacanje === 'obrt'  ?    '#1E6812' :  '#1e2730'  ,      width:   '22.5%',  fontFamily: 'Roboto',
                                              fontStyle: 'normal',
                                              '&:hover': {
                                                backgroundColor: '#6cb238',
                                                borderColor: '#0062cc',
                                                boxShadow: 'none',
                                              },

                                              /* or 158% */

                                              textTransform:  'none',
                                              lineHeight:  '26px',  fontSize:  () => window.devicePixelRatio == 1.5 ? 10 : 16}}>Obuka</Button>
                                      </ButtonGroup>
                              </Grid>
                              <Grid item style={{ height: "60%",   display:  'flex', margin: 5,  }} >
                                <TableContainer sx={{ maxHeight: window.devicePixelRatio == 1.5 ?  300 : 550, margin:  window.devicePixelRatio == 1.5 ? '10px' : '20px' }} ref={refTable}>
                                  <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#323b40'}}}  >
                                    <TableHead   >
                                        <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238', fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */
                                              textAlign: 'flex-end',
                                              
                                              fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16,
                                              fontWeight: 'medium',}}}  >
                                          <TableCell  sx={{color:  'white', width:  '40%',  textOverflow: 'ellipsis', overflow: 'hidden'}}>{txt.txtArtikal}</TableCell>
                                          <TableCell  sx={{color:  'white'}} align="right">{txt.txtKolicina}</TableCell>
                                          <TableCell  sx={{color:  'white'}} align="right">{txt.txtCena}</TableCell>
                                          <TableCell  sx={{color:  'white'}} align="right">{txt.txtUkupno}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflow: "auto", scrollBehavior: "smooth"}} >
                                    {listaRacunaTmp.filter(racun => racun.activRacun === activRacun).map((row,index) => (
                                      
                                      <TableRow

                                        key={index}
                                        sx={{'&:last-child th,  &:last-child td': { backgroundColor:  activPlacanje === 'Proforma'  ? '#FDBD01' :  ( activPlacanje === 'Advance'  ? '#E55451'  : '#6cb238' ) , opacity: 1 }, '& td, & th': {color:  'white',  border:  0,  backgroundColor: () => index%2 ===0 ? '#1e2730' : '#323b40',fontFamily: 'Roboto',
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        textAlign: 'flex-end',
                                        
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16, maxWidth: 90} }}
                                        onClick={() => {toModalCount(row.idRacunProduct,row.productName); handleOpenModalKolicina()}}
                                      >
                                        <TableCell component="th" scope="row"   >
                                          {row.productName}
                                        </TableCell>
                                        <TableCell align="right" >{row.kolicina}</TableCell>
                                        <TableCell align="right"  >{currencyFormat(row.cena)}</TableCell>
                                        <TableCell align="right">{currencyFormat(parseFloat(row.kolicina) * parseFloat(row.cena))}</TableCell>
                                        
                                      </TableRow>
                                      
                                    ))}
                                  </TableBody>
                                  </Table>
                                </TableContainer>        
                                <ModalCount openProps={openModalKolicina} handleCloseprops={handleCloseModalKolicina}    childToParent={childToParent} toModalCount={data}></ModalCount>
                                <ModalPopustArtikal openProps={openModalPopustArtikal} handleCloseprops={handleCloseModalPopustArtikal}   ></ModalPopustArtikal>
                                <ModalStornoArtikal openProps={openModalStornoArtikla} handleCloseprops={handleCloseModalStornoArtikal}  titleTextProps={txt.txtStornoArtikla} ></ModalStornoArtikal>
                              </Grid>
                              <Grid item sx={{ height: "5%",   display:  'flex', alignItems:    'center',  mr:  1.5, justifyContent:  'flex-end' }} >
                                <Grid item xs={10}   sx={{ width:  '100%',    ml: 2.5, mr: 3}} >
                                {totalPopustList.filter(obj => obj.id == activRacun).map(row => (
                                    <Card sx={{display: row.popust === 0 ? 'none'  :   'flex' , height:  32,  backgroundColor:  'rgba(108, 178, 56, 0.2)',}}>
                                      <Grid item xs={8}  >
                                          <Typography  sx={{display:  'flex', ml:  2.5,  color:   'white',   fontFamily: 'Roboto',
                                                  fontStyle: 'normal',

                                                  /* or 158% */
                                                  fontWeight:  700,
                                                  textAlign: 'center',
                                                  lineHeight:  '32px',
                                                  textTransform: 'none',
                                                  fontSize:  () => window.devicePixelRatio == 1.5 ? 8 : 20,  justifyContent:  'flex-start'}}>
                                                Popust:
                                          </Typography>
                                      </Grid>
                                      <Grid  item xs={4}  >
                                          <Typography  sx={{display:  'flex',   mr:  2.5,    color: 'white',   fontFamily: 'Roboto',
                                                  fontStyle: 'normal',

                                                  /* or 158% */
                                                  fontWeight:  700,
                                                  textAlign: 'center',
                                                  lineHeight:  '32px',
                                                  textTransform: 'none',
                                                  fontSize:  () => window.devicePixelRatio == 1.5 ? 8 : 20,   justifyContent:  'flex-end'}}>
                                                - {currencyFormat(row.popust)}
                                          </Typography>
                                      </Grid>
                                    </Card>
                                    ))}
                                </Grid>
                                <Grid item xs={2}  sx={{display:  'flex', justifyContent:  'flex-end'}}  >
                                  <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , 
                                        maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                        maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                        minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                        minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(1,refTable,   refTextField)} > <KeyboardArrowUpIcon /></Button>
                                  <Button variant="contained"   sx={{marginLeft: window.devicePixelRatio == 1.5 ? '16px' : '24px', display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',    
                                        maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                        maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                        minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                        minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,   alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(1, refTable,  refTextField)} ><KeyboardArrowDownIcon /></Button>
                                </Grid>
                              </Grid>
                              <Grid item style={{  height: "10%",   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                                <Card sx={{ minWidth: 275, display: 'flex', backgroundColor:  '#4f5e65', ml: window.devicePixelRatio == 1.5 ? 1.5 : 2.5 ,  mr: window.devicePixelRatio == 1.5 ? 1.5 : 2.5}}>

                                  <ButtonGroup sx={{
                                                    mt: 2,
                                                    mb: 2 ,
                                                    width: "100%",
                                                    justifyContent: "space-evenly"}}>
                                      <Button variant="contained"   onClick={handleOpenModalPopustRacun} startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' ,  
                                              fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textAlign: 'center',
                                              lineHeight:  '26px',
                                              textTransform: 'uppercase',
                                              fontSize:  () => window.devicePixelRatio == 1.5 ? 8 : 16}}>{txt.txtPopust}
                                      </Button>
                                      <Button variant="contained"  onClick={handleOpenModalStornoRacun} startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' ,  ml:  2,
                                              fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textAlign: 'center',
                                              lineHeight:  '26px',
                                              textTransform: 'uppercase',
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16}}>{txt.txtStorno}
                                      </Button>
                          
                                      <Button variant="contained"    sx={{backgroundColor:   '#64B5F6' , width:'40%',   borderRadius: 2,
                                              fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textAlign: 'center',
                                              lineHeight:   '26px',
                                              textTransform: 'uppercase',
                                              fontSize:  () => window.devicePixelRatio == 1.5 ? 8 : 16}}
                                              onClick={() => { naplataTotal(activRacun,'dirGotovina', totalPrice,   0)}}
                                              disabled={((listaRacunaTmp.filter(obj  =>  obj.activRacun  ===   activRacun)).length  ===  0 ?  true  : false) || disabledFlag}>Gotovina
                                      </Button>
                                    </ButtonGroup>

                                </Card>
                                <ModalPopustRacun openProps={openModalPopustRacun} handleCloseprops={handleCloseModalPopustRacun}  toModalPopustRacun={totalPrice}  fromModalPopustRacun={addPopust} ></ModalPopustRacun>
                                <ModalStornoArtikal openProps={openModalStornoRacun} handleCloseprops={handleCloseModalStornoRacun}  titleTextProps={'Storno Racun'} ></ModalStornoArtikal>        
                              </Grid>
                              <Grid item sx={{  height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                                    <Grid item xs={6}  sx={{  height: "100%"}}>
                                      {/*{totalPopustList.filter(obj => obj.id == activRacun).map(row => (
                                          <Grid sx={{display:  'flex', ml:1}}>
                                            <Grid item xs={6}  ><Typography  sx={{fontSize: 10, color:  'white'}}>Popust:</Typography></Grid>
                                            <Grid item xs={6}  justifyContent="flex-end"><Typography  sx={{fontSize: 10, color:  'white', display:  'flex', justifyContent:  'flex-end'}}>- {currencyFormat(row.popust)}</Typography></Grid>
                                          </Grid>
                                      ))}*/}
                                      <Grid sx={{display:  'flex',  ml: 2, marginTop:  window.devicePixelRatio === 1.5 ?   '20px' : '35px'}}>
                                        <Grid item xs={6} sx={{display:  'flex', justifyContent:  'flex-start'}}><Typography  sx={{  color:  'white', fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */
                                              
                                              textAlign: 'center',
                                              lineHeight:  '32px',
                                          
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 12 : 20, mt: 3}} >{txt.txtTotalRacun}</Typography></Grid>
                                        <Grid item xs={6}  sx={{display:  'flex',  justifyContent:  'flex-end'}}><Typography  sx={{  color:  'white',  fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              
                                              lineHeight:  '38px',
                                              textTransform: 'uppercase',
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 30, mt: 3}} >{currencyFormat(totalPrice)}</Typography></Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid xs={6} sx={{   height: "100%",  marginTop: window.devicePixelRatio == 1.5 ?   '10px' : '0px',   display:  'flex', justifyContent:  'center', alignItems:  'flex-end'}} >
                                        <Button variant="contained"   sx={{ml: 2,
                                          fontFamily: 'Roboto',
                                          fontStyle: 'normal',

                                          /* or 158% */

                                          
                                          lineHeight:  '38px',
                                          textTransform: 'uppercase',
                                          height: window.devicePixelRatio == 1.5 ?   '38px' : '56px',
                                          fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 24, backgroundColor:  '#6cb238', mr:2, '&.MuiButton-root': {color:  'black'}}}  onClick={handleOpenModalNaplata}  fullWidth
                                          disabled={((listaRacunaTmp.filter(obj  =>  obj.activRacun  ===   activRacun)).length  ===  0 ?  true  : false)   ||  disabledFlag}>{txt.txtNaplata}</Button>
                                    </Grid>
                                    <ModalNaplata openProps={openModalNaplata}  toModalNaplata={[{totalPrice: totalPrice, totalPopust: totalPopust,  activRacun:  activRacun}]} handleCloseprops={handleCloseModalNaplata}   openModalKomPlacanje={openModelKomPlacanje}      ></ModalNaplata>
                                    <ModalKombinovanaNaplata openProps={openModalKomPlacanje} handleCloseprops={handleCloseModalKomPlacanje}  toModalKombinovano={toModalKombinovano}    fromModalKombinovano={naplataKombinovano} ></ModalKombinovanaNaplata>
                              </Grid>
                          </Grid>
                    </Grid>
              </Box>
            </Grid>
      </Grid>
    </ThemeProvider>
  );
}
