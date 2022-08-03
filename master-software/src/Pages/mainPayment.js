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
import {Sidebar} from '../Components/sidebar'
import {ArtikliList}  from '../Data/artikli'
import {TipoviProizvoda}  from '../Data/tipoviProizvoda'

import * as txtGeneral from '../Data/txt';


export const MainPayment = () => {
  const theme = useTheme();
  const [openModalKolicina, setOpenModalKolicina] = React.useState(false);
  const [openModalPopustArtikal, setOpenModalPopustArtikal] = React.useState(false);
  const [openModalPopustRacun, setOpenModalPopustRacun] = React.useState(false);
  const [openModalStornoArtikla, setOpenModalStornoArtikla] = React.useState(false);
  const [openModalStornoRacun, setOpenModalStornoRacun] = React.useState(false);
  const [openModalNaplata, setOpenModalNaplata] = React.useState(false);
  const [activRacun, setActivRacun] = React.useState(1);
  const [activTipProizvoda, setActivTipProizvoda] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalPopust, setTotalPopust] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState('');
  const [listaRacunaTmp, setListaRacunaTmp] = React.useState(JSON.parse(localStorage.getItem('listaRacunaTmp')));
  const [buttonRacunList, setButtonRacunList] = React.useState(JSON.parse(localStorage.getItem('buttonRacunList')));
  const [buttonRacunCount, setButtonRacunCount] = React.useState(JSON.parse(localStorage.getItem('buttonRacunCount')));
  const [txt, setTxt] = React.useState(txtGeneral);
  //da aplikacija ne bi pucala ako je lista artikala prazna ili ako ima problem sa komunikacijom sa api
  const artikalListTmp = [];
  const [artikalList, setArtikalList] = React.useState(ArtikliList);
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
  const handleCloseModalStornoRacun = () => setOpenModalStornoRacun(false);
  const handleOpenModalNaplata = () => setOpenModalNaplata(true);
  const handleCloseModalNaplata = () => {
                                          setOpenModalNaplata(false);
                                          deleteRacun();
                                          localStorage.setItem('racunTmp01', JSON.stringify([]));                                    
                                          setTotalPrice(0);
  }

  const unique = [...new Set(artikalList.map(item => item.groupName))];
  const [tipoviProizvoda1, settipoviProizvoda1]  =  React.useState(TipoviProizvoda);

  {/*useEffect(() => {
    unique.map((obj,i) => {
      let objTmp = {id: i,name: obj};
      settipoviProizvoda1(prevState => [...prevState, objTmp]);
    })
  },[]);*/}
  

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
const arrayChunk = (arr, n) => {
  const arrayTmp = arr.filter(element =>  element.tipProizvodaId == `${activTipProizvoda}`);
  
  const array = arrayTmp.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};

//dodavanje artikla iz tipova 
const handleAddArtikalRacunTipovi = (sifra) => {
    let artikalTmp = artikalList.filter(element => element.code === sifra);
    //let artikalCheckTmp = checkArtikal(artikalTmp);
    if(artikalTmp.length === '') {
      let artikalTmp2 = {
        productid: artikalTmp[0].id,
        productName: artikalTmp[0].name,
        kolicina: artikalTmp[0].kolicina ,
        cena:  artikalTmp[0].cena, //zakucano dok Deki ne sredi price list
        tipProizvodaId: artikalTmp[0].tipProizvodaId,
        code: artikalTmp[0].sifra,
        activRacun: activRacun
      }
  
       //setRacunTmp01(prevState => [...prevState,artikalTmp[0]]);
       setListaRacunaTmp(prevState => [...prevState,artikalTmp2]);
  } else{
    //setErrorMessage(artikalCheckTmp);
    console.log('ne postoji artikal');
  } 
}

//dodavanje artikla sa input polja
const handleAddArtikalRacun = (event) => {
  if (event.key === 'Enter') {
    console.log(event.target.value);
    let artikalTmp = artikalList.filter(element => element.sifra === event.target.value);
    //let artikalCheckTmp = checkArtikal(artikalTmp);
   // if(artikalTmp.length === '') {
      let artikalTmp2 = {
        productid: artikalTmp[0].id,
        productName: artikalTmp[0].name,
        kolicina: artikalTmp[0].kolicina ,
        cena:  artikalTmp[0].cena, //zakucano dok Deki ne sredi price list
        tipProizvodaId: artikalTmp[0].tipProizvodaId,
        code: artikalTmp[0].sifra,
        activRacun: activRacun
      }
      
      event.target.value = '';
      //setRacunTmp01(prevState => [...prevState,artikalTmp[0]])
      setListaRacunaTmp(prevState => [...prevState,artikalTmp2])
   // } else{
      //setErrorMessage(artikalCheckTmp);
      //console.log('nema artikal');
    //}
  }
}


const childToParent = (childdata) => {
  let listaRacunaTmp1 =  JSON.parse(localStorage.getItem('listaRacunaTmp'));
  const newState = listaRacunaTmp1.map(obj => {
    if (obj.id === childdata.id && obj.activRacun === activRacun) {
      return {...obj, kolicina: childdata.counter};
    }
    return obj;
  });
  //setRacunTmp01(newState);
  setListaRacunaTmp(newState);
}

//funkcija brise racun posle naplate
const deleteRacun = () => {
  let deleteRacunTmp =  JSON.parse(localStorage.getItem('listaRacunaTmp')).filter(racun => racun.activRacun !== activRacun);
  setListaRacunaTmp(deleteRacunTmp);
  if(activRacun > 1) {
    let buttonRacunListTmp = buttonRacunList.filter(buttonList => buttonList.id  !==  activRacun);
    setButtonRacunList(buttonRacunListTmp);
    setButtonRacunCount(buttonRacunCount -1);
    setActivRacun(1);
  }
    
}


const toModalCount = (id) => {
  setData({id,txt});

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

 



  return (
    <ThemeProvider theme={theme}>
      <Grid container  
            sx={{ height: '100vh',  
                  backgroundColor:  '#1e2730',
                  display:  'flex'
                   }}>
        <CssBaseline />
            <Sidebar></Sidebar>
            <Box  sx={{ flexGrow: 1,  height: '100vh', overflow: 'auto'  , display:  'flex' }}>
                      <Grid  
                          container
                          direction="column"
                          justifyContent="space-between"
                          sx={{ height: "100%", p: 1}}
                        >
                            <Grid item style={{ background: "#1e2730", height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                            <Box sx={{width: 250, height: 100, borderRadius: 2, display: errorMessage  ? '' :  'none', backgroundColor: 'white', position: 'absolute', zIndex: 2}}>
                              <Box sx={{display:  'flex'}}>
                                  <Typography sx={{ml:1, color: 'red'}}> Error heandling</Typography>
                                  <Typography sx={{ml: 14,
                                                '&:hover': {
                                                  cursor:  'pointer'
                                                },}} onClick={() => setErrorMessage('')}>X</Typography>
                              </Box>
                                  <Typography sx={{mt: 2, ml:1, color: '#6cb238'}}>{errorMessage}</Typography>
                              
                            </Box>
                                <Grid item xs={6}  sx={{display:  'flex'}}>
                                    {buttonRacunList.map((item,index) => (
                                        <Button key={index} variant="contained" onClick={()=>setAtivButton(item.id)} sx={{ml:2, fontSize: 6, 
                                         backgroundColor:  () => item.id === activRacun ? '#6cb238' : '#323b40', 
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
                                        }, }}>{item.name}</Button>
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
                                      sx={{ml:  1,
                                          "& .MuiOutlinedInput-root ": {
                                            backgroundColor:  '#323b40',
                                    
                                          },
                                          "& .MuiOutlinedInput-input": {
                                            color: "white",
                                            height: 20            
                                          },
                                        }}
                                    />
                                </Grid>
                                <Grid xs={2}   sx={{display:  'flex'}}  >
                                  <Button  fullWidth variant="contained"  startIcon={<SearchIcon />} sx={{ml: 2,fontSize: 8, backgroundColor:  '#6cb238' }}>{txt.txtDetaljnaPretraga}</Button>
                                </Grid>
                            </Grid>  
                             
                            <Grid  sx={{ background: "#323b40", height: "75%",  borderRadius:  2}}  >
                              <Grid  sx={{ height: "80%", maxHeight: '70%' , overflowY:  'scroll'}} ref={refTipoviProizvoda}>
                                {arrayChunk(artikalList, 4).map((row, i) => (
                                  <Grid item xs={12} m={2}  sx={{display: 'flex'}}>
                                    {row.map((col, i) => (
                                        <Grid item xs={3} >
                                            <Button  onClick={() => handleAddArtikalRacunTipovi(col.code)}   variant="contained"  sx={{ml:1, background: "#1e2730", height: 50,  fontSize: 10, width: '90%'}}  >{col.name}</Button>
                                        </Grid>
                                    ))}
                                  </Grid>
                                ))} 
                                </Grid>
                                <Grid item style={{ height: "5%",   display:  'flex',  alignItems:    'center',  marginTop: 15,   justifyContent:  'flex-end' }} >
                                        <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , maxWidth: "20px", maxHeight: "20px",minWidth: "20px",minHeight: "20px", alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(0)} > <KeyboardArrowUpIcon /></Button>
                                        <Button variant="contained"   sx={{ml: 1, mr: 1, display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   maxWidth: "20px", maxHeight: "20px",minWidth: "20px",minHeight: "20px",  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(0)} ><KeyboardArrowDownIcon /></Button>
                                </Grid>
                                <Grid    sx={{maxWidth: { xs: 500, sm: 700 },  height:  '20%',  mt:  3}}>
                                  <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    aria-label="scrollable auto tabs example"
                                    sx={{'& .MuiTabScrollButton-root': {
                                      color: 'red'
                                    },
                                    '& .Mui-selected': {color:  'white !important'}}}
                                    TabIndicatorProps={{ style: { background: "#6cb238" } }}  
                                  >
                                    {tipoviProizvoda1.map((row,index)  => (
                                        <Tab label={row.name}  onClick={()=>setActivTipProizvoda(row.id)}   sx={{color: '#5b6266'}} />
                                    ))}
                                  </Tabs>
                                </Grid> 
                            </Grid>
                            <Grid item style={{ background: "#1e2730", height: "10%" }} >
                            <Grid  container  sx={{display: 'flex'}}>
                                <Grid item xs={4} justifyContent='flex-start'>
                                  <Typography variant="body2" color="#ffffff"  >
                                        {txt.txtOperater} {txt.txtOperaterNumber}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4} justifyContent='center'> 
                                </Grid>
                                <Grid  item xs={4} sx={{display:  'flex'}} justifyContent='flex-end'>
                                  <Typography variant="body2" color="#ffffff"  >
                                        {txt.txtKupac} : {txt.txtKupacNumber}
                                  </Typography>
                                </Grid>
                              </Grid>         
                            </Grid>
                      </Grid>
    
                  <Grid item
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto' }}
                      xs={6}
                    >
                        <Grid item style={{ background: "#323b40", height: "100%",  display:  'flex',  flexDirection:  'column'}} >
                            <Grid item style={{ height: "70%",   display:  'flex', margin: 5,  }} >
                              <TableContainer sx={{ maxHeight: 300 }} ref={refTable}>
                                <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#323b40'}}}  >
                                  <TableHead   >
                                      <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'}}}  >
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
                                      sx={{'&:last-child th,  &:last-child td': { backgroundColor:  '#6cb238', opacity: 1 }, '& td, & th': {color:  'white',  border:  0,  backgroundColor: () => index%2 ===0 ? '#1e2730' : '#323b40', fontSize: 8, maxWidth: 90} }}
                                    >
                                      <TableCell component="th" scope="row"   onClick={handleOpenModalStornoArtikal}>
                                        {row.productName}
                                      </TableCell>
                                      <TableCell align="right"  onClick={() => {toModalCount(row.id); handleOpenModalKolicina()}}>{row.kolicina}</TableCell>
                                      <TableCell align="right"  onClick={handleOpenModalPopustArtikal}>{currencyFormat(row.cena)}</TableCell>
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
                            <Grid item style={{ height: "5%",   display:  'flex', margin: 1, alignItems:    'center',   justifyContent:  'flex-end' }} >
                                 <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , maxWidth: "20px", maxHeight: "20px",minWidth: "20px",minHeight: "20px", alignItems: 'center',  flexWrap: 'wrap',}}  onClick={() => handleTop(1)} > <KeyboardArrowUpIcon /></Button>
                                 <Button variant="contained"   sx={{ml: 1, mr: 1, display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   maxWidth: "20px", maxHeight: "20px",minWidth: "20px",minHeight: "20px",  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(1)} ><KeyboardArrowDownIcon /></Button>
                            </Grid>
                            <Grid item style={{  height: "10%",   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                              <Card sx={{ minWidth: 275, display: 'flex', backgroundColor:  '#4f5e65', m: 1}}>

                                <ButtonGroup sx={{
                                                  mt: 1,
                                                  mb: 1,
                                                  width: "100%",
                                                  justifyContent: "space-evenly"}}>
                                    <Button variant="contained"   onClick={handleOpenModalPopustRacun} startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>{txt.txtPopust}</Button>
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>{txt.txtNumeric}</Button>
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>{txt.txtVaga}</Button>
                                    <Button variant="contained"   onClick={handleOpenModalStornoRacun} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>{txt.txtStorno}</Button>
                                  </ButtonGroup>

                              </Card>
                              <ModalPopustRacun openProps={openModalPopustRacun} handleCloseprops={handleCloseModalPopustRacun} ></ModalPopustRacun>
                              <ModalStornoArtikal openProps={openModalStornoRacun} handleCloseprops={handleCloseModalStornoRacun}  titleTextProps={'Storno Racun'} ></ModalStornoArtikal>        
                            </Grid>
                            <Grid item sx={{  height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                                  <Grid item xs={6}  sx={{  height: "100%", marginTop: 1}}>
                                    <Grid sx={{display:  'flex', ml:1}}>
                                      <Grid item xs={6}  ><Typography  sx={{fontSize: 10, color:  'white'}}>{txt.txtTotalRacun}</Typography></Grid>
                                      <Grid item xs={6}  justifyContent="flex-end"><Typography  sx={{fontSize: 10, color:  'white', display:  'flex', justifyContent:  'flex-end'}}>{currencyFormat(totalPrice)}</Typography></Grid>
                                    </Grid>
                                    <Grid sx={{display:  'flex',  ml:  1  }}>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3}} >{txt.txtTotalRacun}</Typography></Grid>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3,  display:  'flex', justifyContent:  'flex-end'}} >{currencyFormat(totalPrice)}</Typography></Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid xs={6} sx={{   height: "100%",    display:  'flex', marginTop:  1}} >
                                      <Button variant="contained"   sx={{ml: 2,fontSize: 14, backgroundColor:  '#6cb238', mr:1, '&.MuiButton-root': {color:  'black'}}}  onClick={handleOpenModalNaplata}  fullWidth>{txt.txtNaplata}</Button>
                                  </Grid>
                                  <ModalNaplata openProps={openModalNaplata}  toModalNaplata={[{totalPrice: totalPrice, totalPopust: totalPopust,  activRacun:  activRacun}]} handleCloseprops={handleCloseModalNaplata} ></ModalNaplata>
                            </Grid>
                        </Grid>
                  </Grid>
            </Box>
    </Grid>
    </ThemeProvider>
  );
}
