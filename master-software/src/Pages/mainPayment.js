import * as React from 'react';
import { useRef,  useState, useEffect }  from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../Css/mainPaymentCss.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {ModalCount} from '../Components/modalCount'
import {ModalPopustArtikal} from '../Components/modalPopustArtikal'
import {ModalPopustRacun} from '../Components/modalPopustRacun'
import {ModalStornoArtikal} from '../Components/modalStornoArtikla'
import {ModalNaplata} from '../Components/modalNaplata'
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Sidebar} from '../Components/sidebar'

import {ModalDetaljnaPretraga} from '../Components/detaljnaPretraga'
import {ModalKupac} from '../Components/kupac'

import {ModalIndetifikacijaKupca} from '../Components/indetifikacijaKupca'
import {ModalOpcionoPoljeKupca} from '../Components/opcionoPoljeKupca'
import {ModalKombinovanaNaplata} from '../Components/kombinovanaNaplata'
import AddTaskIcon from '@mui/icons-material/AddTask';
import textFile from '../Images/robots.txt'


import { saveAs } from 'file-saver';
import { format } from 'date-fns';


import {ModalAlertError} from '../Components/alerError'


import * as txtGeneral from '../Data/txt';


export const MainPayment = () => {

  
  const theme = useTheme();
  const [openModalKolicina, setOpenModalKolicina] = React.useState(false);
  const [openModalPopustArtikal, setOpenModalPopustArtikal] = React.useState(false);
  const [openModalPopustRacun, setOpenModalPopustRacun] = React.useState(false);
  const [openModalStornoArtikla, setOpenModalStornoArtikla] = React.useState(false);
  const [openModalStornoRacun, setOpenModalStornoRacun] = React.useState(false);
  const [openModalNaplata, setOpenModalNaplata] = React.useState(false);
  const [openModalDetaljnaPretraga, setOpenDetaljnaPretraga] = React.useState(false);
  const [openModalKupac, setOpenModalKupac] = React.useState(false);
  const [openModalIndKupca, setOpenIndKupca] = React.useState(false);
  const [openModalOpKupca, setOpenModalOpKupca] = React.useState(false);
  const [openModalKomPlacanje, setOpenModalKomPlacanje] = React.useState(false);
  const [openModalAlertError, setOpenModalAlertError] = React.useState(false);
  const [activRacun, setActivRacun] = React.useState(1);
  const [activRacunNaplata, setActivRacunNaplata] = React.useState(1);
  const [activTipProizvoda, setActivTipProizvoda] = React.useState('slatkisi,');
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalPopust, setTotalPopust] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState('');
  const [totalKusurList, setTotalKusurList] = React.useState(JSON.parse(localStorage.getItem('initialValueKusur')));
  const [toModalKombinovano, setToModalKombinovano] = React.useState(0);
  const [showKusur, setShowKusur] = React.useState(false);
  const [listaRacunaTmp, setListaRacunaTmp] = React.useState(JSON.parse(localStorage.getItem('listaRacunaTmp')));
  const [buttonRacunList, setButtonRacunList] = React.useState(JSON.parse(localStorage.getItem('buttonRacunList')));
  const [buttonRacunCount, setButtonRacunCount] = React.useState(JSON.parse(localStorage.getItem('buttonRacunCount')));
  const [txt, setTxt] = React.useState(txtGeneral);
  const [totalPopustList, setTotalPopustList] = React.useState(JSON.parse(localStorage.getItem('initialValuePopust')));
  //da aplikacija ne bi pucala ako je lista artikala prazna ili ako ima problem sa komunikacijom sa api
  const artikalListTmp = !JSON.parse(localStorage.getItem('artikalList')).error  ? JSON.parse(localStorage.getItem('artikalList')) : [];
  const [artikalList, seArtikalList] = React.useState(artikalListTmp);
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
                                          if(obj.tipNaplate === 'gotovina')  {
                                              naplataGotovinom(obj.activId, 'gotovina'); 
                                          }       
                                          setOpenModalNaplata(false);
                                          
  }

  const handleOpenModalDetaljnaPretraga = () => setOpenDetaljnaPretraga(true);
  const handleCloseModalDetaljnaPretraga = () => setOpenDetaljnaPretraga(false);
  const handleOpenModalKupac = () => setOpenModalKupac(true);
  const handleCloseModalKupac = () => setOpenModalKupac(false);
  const handleOpenModalIndKupca = () => setOpenIndKupca(true);
  const handleCloseModalIndKupca = () => setOpenIndKupca(false);
  const handleOpenModalOpKupca = () => setOpenModalOpKupca(true);
  const handleCloseModakOpKupca = () => setOpenModalOpKupca(false);


  const handleOpenModalKomPlacanje = () => setOpenModalKomPlacanje(true);
  const handleCloseModalKomPlacanje = () => setOpenModalKomPlacanje(false);


  const handleOpenModalAlertError = () => setOpenModalAlertError(true);
  const handleCloseModalAlertError = () => {
                                            
                                              setErrorMessage('');
                                              setOpenModalAlertError(false);}
  

  const [inputTmp, setInputTmp] = React.useState('');
  

  const unique = [...new Set(artikalList.map(item => item.groupName))];
  const [tipoviProizvoda1, settipoviProizvoda1]  =  React.useState([]);

  useEffect(() => {
    unique.map((obj,i) => {
      let objTmp = {id: i,name: obj};
      settipoviProizvoda1(prevState => [...prevState, objTmp]);
    })
    console.log(tipoviProizvoda1 );
  },[]);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //funkcija vraca format za novac
  const currencyFormat = (num) => {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  const setAtivButton = (idButton) => {
    setActivRacun(idButton);
 };

//pakuje niz u podnizove od n elemenata
const arrayChunk = (arr, n, activTipProizvoda) => {
  console.log(activTipProizvoda);
  const arrayTmp = arr.filter(element => element.groupName === `${activTipProizvoda}`);
  const array = arrayTmp.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};

//dodavanje artikla iz tipova 
const handleAddArtikalRacunTipovi = (sifra) => {
    let artikalTmp = artikalList.filter(element => element.code === sifra);
    let artikalCheckTmp = checkArtikal(artikalTmp);
    if(artikalCheckTmp === '') {
      let artikalTmp2 = {
        productid: artikalTmp[0].productId,
        productName: artikalTmp[0].productName,
        kolicina: artikalTmp[0].unitName === 'Kom' ? 1 : 2,
        cena:  artikalTmp[0].priceLists[0].price, //zakucano dok Deki ne sredi price list
        tipProizvodaId: artikalTmp[0].productGroupRequest[0].idGroup,
        code: artikalTmp[0].code,
        activRacun: activRacun
      }
  
       //setRacunTmp01(prevState => [...prevState,artikalTmp[0]]);
       setListaRacunaTmp(prevState => [...prevState,artikalTmp2]);
  } else{
    setErrorMessage(artikalCheckTmp);
    handleOpenModalAlertError();
    console.log(artikalCheckTmp);
  } 
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
    inputTmp = event.target.value.split('*')[0];
    inputTmpAfter = event.target.value.split('*')[1];
    let inputValue  =   inputTmpAfter !==  undefined ?  inputTmpAfter  :  event.target.value;
    console.log(inputValue);
    let artikalTmp = artikalList.filter(element => element.code ===   inputValue || element.barCode ===  inputValue );
    let artikalCheckTmp = checkArtikal(artikalTmp);
    if(artikalCheckTmp === '') {
      let artikalTmp2 = {
        productid: artikalTmp[0].prodctId,
        productName: artikalTmp[0].productName,
        //kolicina: artikalTmp[0].unitName === 'Kom' ? 1 : 2,
        kolicina:  inputTmpAfter  !==  undefined  ?  inputTmp  : 1,
        cena:  artikalTmp[0].priceLists[0].price, //zakucano dok Deki ne sredi price list
        tipProizvodaId: artikalTmp[0].productGroupRequest[0].idGroup,
        code: artikalTmp[0].code,
        activRacun: activRacun
      }
      
      event.target.value = '';
      console.log(artikalTmp2);
      //setRacunTmp01(prevState => [...prevState,artikalTmp[0]])
      setListaRacunaTmp(prevState => [...prevState,artikalTmp2]);
      setInputTmp('');
    } else{
      setErrorMessage(artikalCheckTmp);
      handleOpenModalAlertError();
      setInputTmp('');
      event.target.value = '';
      console.log(artikalCheckTmp);
    }
  }
}


const childToParent = (childdata) => {
  // console.log(childdata);
   //let popustValueTmp = (childdata.tipPopust  === 'fiksniPopust' && childdata.tipPopust  !== 'fiksniIznos') ? childData.popust : 0;
   //let cenaPopustTmp =  childdata.tipPopust  ===  fiksnaCena  ?  childdata.popust  :  '';
   let listaRacunaTmp1 =  JSON.parse(localStorage.getItem('listaRacunaTmp'));
   const newState = listaRacunaTmp1.map(obj => {
       if (obj.productid === childdata.id && obj.activRacun === activRacun) {
         return {...obj, kolicina: childdata.counter};
       }
     
    
     return obj;
   });
   //setRacunTmp01(newState);
   setListaRacunaTmp(newState);
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

  saveFile(activRacun,true);
    
}


const toModalCount = (id,productName) => {
  console.log(id);
  setData({id,txt,productName});

}

// funkija proverava da li artikal ima sve potrebne vrednosti, ako ne vraca gresku 
const checkArtikal = (artikalCheckTmp) =>  {
  //ako je message prazan onda je artikal u redu
  let message = !artikalCheckTmp.length  ? 'Ne postoji artikal' : '';
  artikalCheckTmp.map(obj => {
    Object.keys(obj).map(key => {
      if(key === 'priceLists' && !obj[key]) {
          message = 'Fali cena na artiklu';
      }
      if(key === 'productGroupRequest' && !obj[key][0].idGroup) {
          message = 'Fali idGroup na artiklu';

      }
      if(!obj[key] && key !== 'vatName') {
         message = 'Fali podatak u artiklu';
      }
    });
  })
  return message;
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
  //localStorage.setItem('racunTmp01', JSON.stringify(racunTmp01));
  localStorage.setItem('initialValuePopust', JSON.stringify(totalPopustList));
  
}, [totalPopustList]);


useEffect(() => {
  localStorage.setItem('buttonRacunList', JSON.stringify(buttonRacunList));
  localStorage.setItem('buttonRacunCount', JSON.stringify(buttonRacunCount));
}, [buttonRacunList]);


// ovo su ref koji gadjaju na odredjeni element
const refTable = useRef();
const refTipoviProizvoda = useRef();
const refTextField = useRef();

// omogucava uvek focus na input polju i omogucava da kad se ubaci 
// novi artikal, uvek scroll bude na kraju
useEffect(() => {
  refTextField.current.focus();
  handleBottom();
});

// funkcija za scroll up na strelice
const handleTop = (tipScroll) => {
  if(tipScroll === 1) {
      refTable.current.scrollBy({ top: -100, behavior: 'smooth' });
  } else {
      refTipoviProizvoda.current.scrollBy({ top: -100, behavior: 'smooth' });
  }
  refTextField.current.focus();
};

// funkcija za scroll na kraj tabele
const handleBottom = () => {
  refTable.current.scrollTop = refTable.current.scrollHeight
}

// funkcija za scrol down na strelice
const handleBottomStep = (tipScroll) => {
    if(tipScroll === 1) { //1 za tabelu artikala 0 za tabelu tipova proizvoda
        refTable.current.scrollBy({ top: 100, behavior: 'smooth' });
    } else {
        refTipoviProizvoda.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
    refTextField.current.focus();
}


const  addSearchValue = (searchCode) => {
  let artikalSearchTmp = JSON.parse(localStorage.getItem('artikalList')).filter(obj => obj.id ===  searchCode );

  
  console.log(artikalSearchTmp[0].code);

  handleAddArtikalRacunTipovi(artikalSearchTmp[0].code);
  console.log(searchCode);

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
}



const  addPopust = (dataPopust) => {
  console.log(dataPopust);
    let popust = dataPopust.popustRadio === 'procenat'  ?  
    ((parseFloat(totalPrice) / 100) * parseFloat(dataPopust.popust)) : parseFloat(dataPopust.popust);

    const newState = totalPopustList.map(obj => {
      if (obj.id === activRacun) {
        return {...obj, popust: popust};
      }
      return obj;
    });
    console.log(popust);
    setTotalPopustList(newState);
}


 

const openModalKu = () => {
  handleOpenModalKupac();
}


const openIndKupcaFunc = () => {
  console.log('asasas');
  handleCloseModalKupac();
  handleOpenModalIndKupca();
}

const openOPKupca  = () => {
  handleCloseModalKupac();
  handleOpenModalOpKupca();
}

const openModelKomPlacanje = () => {
  handleCloseModalNaplata({activId: activRacun, tipNaplate:  'komPlacanje'});
  setToModalKombinovano(totalPrice);
  handleOpenModalKomPlacanje();

}


const saveFile = (id,isStorno) => {
  console.log('asasss');
  const racunNaplataTmp = listaRacunaTmp.filter(racun => racun.activRacun === id)
  const url = !isStorno ? 'http://localhost:3001/saveRacun'   : 'http://localhost:3001/stornoRacun';
  axios.post(url, {
    headers: {
      "content-type": "multipart/form-data",
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


console.log(requestOptions);
  fetch(url, requestOptions) 
        .then((response) => {console.log('sacuvan podatak')
        } , (error) => {
          if (error) {
           console.log(error);
          }
        });

  
}


const addKusur = (dataKusur) => {
  const newState = totalPopustList.map(obj => {
    if (obj.id === dataKusur.id) {
      return {...obj, kusur: dataKusur.kusur};
    }
    return obj;
  });
  setTotalKusurList(newState);
}


const naplataGotovinom = (activRacunid, tipNaplate) => {
  if(tipNaplate  === 'dirGotovina')  {
    addKusur({id: activRacunid, kusur: 0 });
  }
  setActivRacunNaplata(activRacunid)
  setShowKusur(true);
  deleteRacun(activRacunid);
  localStorage.setItem('racunTmp01', JSON.stringify([]));                                    
  saveFile(activRacunid,false);
  setTimeout(() => {
          setShowKusur(false);
  }, 5000);
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
              <Sidebar openModal={openModalKu}></Sidebar>
            </Grid>
            <Grid item xs={11.4}>
              <Box  sx={{ flexGrow: 1,  height: '100vh', overflow: 'auto'  , display:  'flex' }}>
                    <Grid  item
                        xs={8.131}
                        direction="column"
                        justifyContent="space-between"
                        sx={{ height: "100%", padding:  '20px', pt: 0}}
                      >
                          <Grid item style={{ background: "#1e2730", height: "5%",  marginTop:'40px',  alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
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
                                         }}>{row.kusur}</Typography></Typography>
                              </Grid>  
                          </Box>
                           ))}
                              <Grid item xs={6}  sx={{display:  'flex'}}>
                                  {buttonRacunList.map((item,index) => (
                                      <Button key={index} variant="contained" onClick={()=>setAtivButton(item.id)} sx={{ml:2,
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
                                      
                                      ><Typography sx={{fontSize:  () => window.devicePixelRatio == 1.5 ? 6 : 16}}>{item.name}</Typography></Button>
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
                          <ModalKupac openProps={openModalKupac}  handleCloseprops={handleCloseModalKupac}    openModalIndetifikacijaKupca={openIndKupcaFunc}    openModalOpKupca={openOPKupca}   ></ModalKupac>
                          <ModalIndetifikacijaKupca openProps={openModalIndKupca}  handleCloseprops={handleCloseModalIndKupca}     ></ModalIndetifikacijaKupca>
                          <ModalOpcionoPoljeKupca openProps={openModalOpKupca}  handleCloseprops={handleCloseModakOpKupca}     ></ModalOpcionoPoljeKupca>
                          <Grid  sx={{ background: "#323b40", marginTop:  '20px',  height: "82%",  borderRadius:  2}}  >
                            <Grid  sx={{ height: "80%", maxHeight: '80%' , overflowY:  'scroll'}} ref={refTipoviProizvoda}>
                            {/*<Typography sx={{mt: 2, ml:1, color: '#6cb238'}}>{inputTmp} X</Typography>*/}
                              {arrayChunk(artikalList, 4,activTipProizvoda).map((row, i) => (
                                <Grid item xs={12} m={2}  sx={{display: 'flex'}}>
                                  {row.map((col, i) => (
                                      <Grid item xs={3} >
                                          <Button  onClick={() => handleAddArtikalRacunTipovi(col.code)}   variant="contained"  sx={{ml:2, background: "#1e2730", height: 80, gap:  '8px',   padding:  '20px',   borderColor:   'red !important',  borderRadius:   '12px',  border:  ' 3px solid #EA9A22',lineHeight: '32px', fontWeight: 400, fontFamily: 'Roboto', textTransform:  'none', fontSize: () => window.devicePixelRatio == 1.5 ? 10 : 20, width: '90%'}}  >{col.productName}</Button>
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
                                            minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(0)} > <KeyboardArrowUpIcon /></Button>
                                      <Button variant="contained"   sx={{marginLeft:  '24px', mr: 1,  mt:  9,  display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   
                                            maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                            maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                            minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                            minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(0)} ><KeyboardArrowDownIcon /></Button>
                              </Grid>
                              <Grid    sx={{   height:  '10%',  display: 'flex', mt: 6}}>
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
                                          <Tab label={row.name}  onClick={()=>setActivTipProizvoda(row.name)}   sx={{color: '#CED2D4', fontFamily: 'Roboto',
                                          fontStyle: 'normal',

                                          /* or 158% */

                                          textAlign: 'center',
                                          textTransform: 'uppercase',
                                          fontSize:  window.devicePixelRatio == 1.5 ?  10 : 20,
                                          fontWeight: 'medium'}} />
                                      ))}
                                    </Tabs>
                                  </Grid>
                                  <Grid item xs={2}  sx = {{ display:  'flex',  mr: 2.5,  justifyContent:  'flex-end'}}  >
                                      <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , 
                                              maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                              maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(0)} > <ArrowBackIosIcon  sx={{ml:1, fontSize: 16}}/></Button>
                                      <Button variant="contained"   sx={{   marginLeft:   '24px', mr: 1, display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   
                                              maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                              maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(0)} ><ArrowForwardIosIcon  sx={{ fontSize:  16}} /></Button>
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
                                      {txt.txtOperater} {txt.txtOperaterNumber}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} justifyContent='center'> 
                              </Grid>
                              <Grid  item xs={2} sx={{display:  'flex', backgroundColor:  '#B5D4A7',  borderRadius:  '8px'}} justifyContent='center'>
                                <Typography   sx={{  color:  'black', fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              
                                              lineHeight:  '26px',
                                              
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16, marginTop:  '8px', marginBottom:  '8px'}} color="#ffffff"  >
                                      {txt.txtKupac} : {txt.txtKupacNumber}
                                </Typography>
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
                              <Grid item style={{  height: "5%",  marginTop:  '40px',   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                                    <ButtonGroup sx={{
                                      marginLeft:  '20px',
                                      marginRight:  '20px',
                                      width: "100%",
                                      height: '50px'
                                      
                                      }}  >
                                        <Button variant="contained"       sx={{backgroundColor:  '#1e2730' , width:   '22.5%',  marginRight: '8px',fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textTransform:  'none', 
                                              lineHeight:  '26px', fontSize:  () => window.devicePixelRatio == 1.5 ? 6 : 16}}>Prodaja</Button>
                                        <Button variant="contained"    sx={{backgroundColor:  '#1e2730' ,marginRight: '8px',   width:   '22.5%',fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textTransform:  'none',
                                              lineHeight:  '26px',  fontSize:  () => window.devicePixelRatio == 1.5 ? 6 : 16}}>Predracun</Button>
                                        <Button variant="contained"       sx={{backgroundColor:  '#1e2730' ,marginRight:  '8px',   width:   '22.5%',  fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textTransform:  'none', 
                                              lineHeight:  '26px', fontSize:  () => window.devicePixelRatio == 1.5 ? 6 : 16}}>Avans</Button>
                                        <Button variant="contained"    sx={{backgroundColor:  '#1e2730' ,    width:   '22.5%',  fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textTransform:  'none',
                                              lineHeight:  '26px',  fontSize:  () => window.devicePixelRatio == 1.5 ? 6 : 16}}>Obrt</Button>
                                      </ButtonGroup>
                              </Grid>
                              <Grid item style={{ height: "60%",   display:  'flex', margin: 5,  }} >
                                <TableContainer sx={{ maxHeight: window.devicePixelRatio == 1.5 ?  300 : 550, margin:  '20px' }} ref={refTable}>
                                  <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#323b40'}}}  >
                                    <TableHead   >
                                        <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238', fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */
                                              textAlign: 'flex-end',
                                              
                                              fontSize:  window.devicePixelRatio == 1.5 ?  8 : 16,
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
                                        sx={{'&:last-child th,  &:last-child td': { backgroundColor:  '#6cb238', opacity: 1 }, '& td, & th': {color:  'white',  border:  0,  backgroundColor: () => index%2 ===0 ? '#1e2730' : '#323b40',fontFamily: 'Roboto',
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        textAlign: 'flex-end',
                                        
                                        fontSize:  window.devicePixelRatio == 1.5 ?  8 : 16, maxWidth: 90} }}
                                        onClick={() => {toModalCount(row.productid,row.productName); handleOpenModalKolicina()}}
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
                              <Grid item sx={{ height: "5%",   display:  'flex', alignItems:    'center',  mr:  2.5, justifyContent:  'flex-end' }} >
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
                                        minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(1)} > <KeyboardArrowUpIcon /></Button>
                                  <Button variant="contained"   sx={{marginLeft: '24px', display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',    
                                        maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                        maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                        minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                        minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,   alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(1)} ><KeyboardArrowDownIcon /></Button>
                                </Grid>
                              </Grid>
                              <Grid item style={{  height: "10%",   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                                <Card sx={{ minWidth: 275, display: 'flex', backgroundColor:  '#4f5e65', ml: 2.5,  mr: 2.5}}>

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
                                              onClick={() => naplataGotovinom(activRacun,'dirGotovina')}>Gotovina
                                      </Button>
                                    </ButtonGroup>

                                </Card>
                                <ModalPopustRacun openProps={openModalPopustRacun} handleCloseprops={handleCloseModalPopustRacun}   fromModalPopustRacun={addPopust} ></ModalPopustRacun>
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
                                      <Grid sx={{display:  'flex',  ml: 2, marginTop:    '35px'}}>
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
                                    <Grid xs={6} sx={{   height: "100%",    display:  'flex', justifyContent:  'center', alignItems:  'flex-end'}} >
                                        <Button variant="contained"   sx={{ml: 2,
                                          fontFamily: 'Roboto',
                                          fontStyle: 'normal',

                                          /* or 158% */

                                          
                                          lineHeight:  '38px',
                                          textTransform: 'uppercase',
                                          height: '56px',
                                          fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 24, backgroundColor:  '#6cb238', mr:2, '&.MuiButton-root': {color:  'black'}}}  onClick={handleOpenModalNaplata}  fullWidth>{txt.txtNaplata}</Button>
                                    </Grid>
                                    <ModalNaplata openProps={openModalNaplata}  toModalNaplata={[{totalPrice: totalPrice, totalPopust: totalPopust,  activRacun:  activRacun}]} handleCloseprops={handleCloseModalNaplata}   openModalKomPlacanje={openModelKomPlacanje}    fromModalNaplata={addKusur}></ModalNaplata>
                                    <ModalKombinovanaNaplata openProps={openModalKomPlacanje} handleCloseprops={handleCloseModalKomPlacanje}  toModalKombinovano={toModalKombinovano}  ></ModalKombinovanaNaplata>
                              </Grid>
                          </Grid>
                    </Grid>
              </Box>
            </Grid>
      </Grid>
    </ThemeProvider>
  );
}
