import * as React from 'react';
import { useState, useEffect }  from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Logo from  '../Images/master_logo.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { fontSize } from '@mui/system';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupIcon from '@mui/icons-material/Group';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../Css/mainPaymentCss.css'
import Tabs from '@mui/material/Tabs';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input';
import {ModalCount} from '../Components/modalCount'
import {ModalPopustArtikal} from '../Components/modalPopustArtikal'
import {ModalPopustRacun} from '../Components/modalPopustRacun'
import {ModalStornoArtikal} from '../Components/modalStornoArtikla'
import {ModalNaplata} from '../Components/modalNaplata'
import {Sidebar} from '../Components/sidebar'
import { ArtikliList } from  "../Data/artikli"
import { RacuniList } from  "../Data/racuniList"
import { Racun01 }  from  "../Data/racun01"
import { TipoviProizvoda } from '../Data/tipoviProizvoda';






  

export const MainPayment = () => {
  const theme = useTheme();
  const [openModalKolicina, setOpenModalKolicina] = React.useState(false);
  const [openModalPopustArtikal, setOpenModalPopustArtikal] = React.useState(false);
  const [openModalPopustRacun, setOpenModalPopustRacun] = React.useState(false);
  const [openModalStornoArtikla, setOpenModalStornoArtikla] = React.useState(false);
  const [openModalStornoRacun, setOpenModalStornoRacun] = React.useState(false);
  const [openModalNaplata, setOpenModalNaplata] = React.useState(false);
  const [activRacun, setActivRacun] = React.useState(1);
  const [racunTmp01, setRacunTmp01] = React.useState([]);
  const [racunTmp02, setRacunTmp02] = React.useState([]);
  const [activTipProizvoda, setActivTipProizvoda] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalPopust, setTotalPopust] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState('');
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
                                          setRacunTmp01([]);
                                          setTotalPrice(0);
  }
  

  const racuni = [
    {
      idRacuna: 1,
      racun: racunTmp01
    },
    {
      idRacuna: 2,
      racun: racunTmp02
    },
  ];


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currencyFormat = (num) => {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  const setAtivButton = (idButton) => {
    setActivRacun(idButton);
 };


 const setAtivTipPro = (idButton) => {
  setActivTipProizvoda(idButton);
};

const arrayChunk = (arr, n) => {
  const arrayTmp = arr.filter(element => element.tipProizvodaId === activTipProizvoda);
  const array = arrayTmp.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};



const handleAddArtikalRacun = (event) => {
  if (event.key === 'Enter') {
    const artikalTmp = ArtikliList.filter(element => element.sifra === event.target.value);
    if(artikalTmp.length) {
      console.log(artikalTmp[0]);
      event.target.value = '';
      setRacunTmp01(prevState => [...prevState,artikalTmp[0]])

    } else{
      console.log('nema artikla');
    }
  }
}

const childToParent = (childdata) => {
  const newState = racunTmp01.map(obj => {
    if (obj.id === childdata.id) {
      return {...obj, kolicina: childdata.counter};
    }
    return obj;
  });
  setRacunTmp01(newState);
}

const toModalCount = (id) => {
  setData(id);
}



useEffect(() => {
  if(racunTmp01.length) {
      const total = racunTmp01.reduce((total, row) => total + (parseFloat(row.kolicina)  * (parseFloat(row.cena))),0);
    setTotalPrice(total);
  }
}, [racunTmp01]);



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
                      justifyContent="space-between"
                      sx={{ height: "100%", p: 1}}
                    >
                      <Grid  
                          container
                          direction="column"
                          justifyContent="space-between"
                          sx={{ height: "100%"}}
                        >
                            <Grid item style={{ background: "#1e2730", height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                                    {RacuniList.map((item,index) => (
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
                                <TextField
                                    id="outlined-password-input"
                                    variant= "outlined"
                                    onKeyDown={handleAddArtikalRacun}
                                    autoComplete="current-password"
                                    autoFocus
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
                                  <Button variant="contained"  startIcon={<SearchIcon />} sx={{ml: 2,fontSize: 8, backgroundColor:  '#6cb238' }}>Detaljna pretraga</Button>
                            </Grid>  
                             
                            <Grid  sx={{ background: "#323b40", height: "75%",  borderRadius:  2}}  >
                              <Grid  sx={{ height: "80%", maxHeight: '70%' , overflowY:  'scroll'}} >
                                {arrayChunk(ArtikliList, 4).map((row, i) => (
                                  <Grid item xs={12} m={2}  sx={{display: 'flex'}}>
                                    {row.map((col, i) => (
                                        <Grid item xs={3} >
                                            <Button   variant="contained"  sx={{ml:1, background: "#1e2730", height: 50,  fontSize: 10, width: '90%'}}  >{col.name}</Button>
                                        </Grid>
                                    ))}
                                  </Grid>
                                ))} 
                                </Grid>
                                <Grid    sx={{maxWidth: { xs: 500, sm: 700 },  height:  '20%',  mt:7}}>
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
                                    {TipoviProizvoda.map((row,index)  => (
                                        <Tab label={row.name}  onClick={()=>setActivTipProizvoda(row.id)}   sx={{color: '#5b6266'}} />
                                    ))}
                                  </Tabs>
                                </Grid> 
                            </Grid>
                            <Grid item style={{ background: "#1e2730", height: "10%" }} >
                            <Grid  container  sx={{display: 'flex'}}>
                                <Grid item xs={4} justifyContent='flex-start'>
                                  <Typography variant="body2" color="#ffffff"  >
                                        {'operater  0124'}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4} justifyContent='center'> 
                                </Grid>
                                <Grid  item xs={4} sx={{display:  'flex'}} justifyContent='flex-end'>
                                  <Typography variant="body2" color="#ffffff"  >
                                        {'Kupac: XZY Kupac 1234'}
                                  </Typography>
                                </Grid>
                              </Grid>         
                            </Grid>
                      </Grid>
                  </Grid>
                  <Grid item
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto' }}
                      xs={4}
                    >
                        <Grid item style={{ background: "#323b40", height: "100%",  display:  'flex',  flexDirection:  'column'}} >
                            <Grid item style={{ height: "70%",   display:  'flex', margin: 5,  }} >
                              <TableContainer sx={{ maxHeight: 300 }}>
                                <Table  stickyHeader  aria-label="sticky table"  sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#323b40'}}}  >
                                  <TableHead   >
                                      <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'}}}  >
                                        <TableCell  sx={{color:  'white', width:  '40%',  textOverflow: 'ellipsis', overflow: 'hidden'}}>Artikal</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">Kolicina</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">Cena</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">Ukupno</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody sx={{border: 'solid 1px red', overflowY: 'scroll'}}>
                                  {racuni.filter(racun => racun.idRacuna === activRacun).map((row,index) => (
                                    row.racun.map((col,i) =>  (
                                    <TableRow
                                      selected = {col.id === 1} 
                                      key={i}
                                      sx={{ '& td, & th': {color:  'white',  border:  0,  backgroundColor: () => i%2 ===0 ? '#1e2730' : '#323b40', fontSize: 8, maxWidth: 90}, "&.Mui-selected": {backgroundColor:  'white'} }}
                                    >
                                      <TableCell component="th" scope="row"   onClick={handleOpenModalStornoArtikal}>
                                        {col.name}
                                      </TableCell>
                                      <TableCell align="right"  onClick={() => {toModalCount(col.id); handleOpenModalKolicina()}}>{col.kolicina}</TableCell>
                                      <TableCell align="right"  onClick={handleOpenModalPopustArtikal}>{currencyFormat(col.cena)}</TableCell>
                                      <TableCell align="right">{currencyFormat(parseFloat(col.kolicina) * parseFloat(col.cena))}</TableCell>
                                      
                                    </TableRow>
                                    ))
                                  ))}
                                </TableBody>
                                </Table>
                              </TableContainer>        
                              <ModalCount openProps={openModalKolicina} handleCloseprops={handleCloseModalKolicina}    childToParent={childToParent} toModalCount={data}></ModalCount>
                              <ModalPopustArtikal openProps={openModalPopustArtikal} handleCloseprops={handleCloseModalPopustArtikal}   ></ModalPopustArtikal>
                              <ModalStornoArtikal openProps={openModalStornoArtikla} handleCloseprops={handleCloseModalStornoArtikal}  titleTextProps={'Storno artikla'} ></ModalStornoArtikal>
                            </Grid>
                            <Grid item style={{ height: "5%",   display:  'flex', margin: 1, alignItems:    'center',   justifyContent:  'flex-end' }} >
                                 <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , maxWidth: "20px", maxHeight: "20px",minWidth: "20px",minHeight: "20px", alignItems: 'center',  flexWrap: 'wrap',}} > <KeyboardArrowUpIcon /></Button>
                                 <Button variant="contained"   sx={{ml: 1, mr: 1, display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   maxWidth: "20px", maxHeight: "20px",minWidth: "20px",minHeight: "20px",  alignItems: 'center',  flexWrap: 'wrap', }}><KeyboardArrowDownIcon /></Button>
                            </Grid>
                            <Grid item style={{  height: "10%",   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                              <Card sx={{ minWidth: 275, display: 'flex', backgroundColor:  '#4f5e65', m: 1}}>

                                <ButtonGroup sx={{
                                                  mt: 1,
                                                  mb: 1,
                                                  width: "100%",
                                                  justifyContent: "space-evenly"}}>
                                    <Button variant="contained"   onClick={handleOpenModalPopustRacun} startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Popust</Button>
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Numeric</Button>
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Vaga</Button>
                                    <Button variant="contained"   onClick={handleOpenModalStornoRacun} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Storno</Button>
                                  </ButtonGroup>

                              </Card>
                              <ModalPopustRacun openProps={openModalPopustRacun} handleCloseprops={handleCloseModalPopustRacun} ></ModalPopustRacun>
                              <ModalStornoArtikal openProps={openModalStornoRacun} handleCloseprops={handleCloseModalStornoRacun}  titleTextProps={'Storno Racun'} ></ModalStornoArtikal>        
                            </Grid>
                            <Grid item sx={{  height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                                  <Grid item xs={6}  sx={{  height: "100%", marginTop: 1}}>
                                    <Grid sx={{display:  'flex', ml:1}}>
                                      <Grid item xs={6}  ><Typography  sx={{fontSize: 10, color:  'white'}}>Total racun</Typography></Grid>
                                      <Grid item xs={6}  justifyContent="flex-end"><Typography  sx={{fontSize: 10, color:  'white', display:  'flex', justifyContent:  'flex-end'}}>{currencyFormat(totalPrice)}</Typography></Grid>
                                    </Grid>
                                    <Grid sx={{display:  'flex',  ml:  1  }}>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3}} >Total za naplatu</Typography></Grid>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3,  display:  'flex', justifyContent:  'flex-end'}} >{currencyFormat(totalPrice)}</Typography></Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid xs={6} sx={{   height: "100%",    display:  'flex', marginTop:  1}} >
                                      <Button variant="contained"   sx={{ml: 2,fontSize: 14, backgroundColor:  '#6cb238', mr:1, '&.MuiButton-root': {color:  'black'}}}  onClick={handleOpenModalNaplata}  fullWidth>Naplata</Button>
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
