import * as React from 'react';
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

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    backgroundColor:  '#323b40',
  },
});


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const icons = [
  {
    id: 0,
    avatarIcon: (<MonetizationOnIcon/>),
    text: "Naplata",
  },
  {
    id: 1,
    avatarIcon: (<TextSnippetIcon/>),
    text: "Predracun",
    
  },
  {
    id: 2,
    avatarIcon: (<BadgeIcon/>),
    text: "Loyality",
  },
  {
    id: 3,
    avatarIcon: (<GroupIcon/>),
    text: "Kupac",
  },
  {
    id: 2,
    avatarIcon: (<ContactPageIcon/>),
    text: "Admin",
  },
];

const dataListTip = [
{
  id: 1,
  name: 'Govedja kobasica zlatiborac'
}, 
{
  id:2,
  name:  'Slanina u omotu Carnex'
},
{
  id:3,
  name:  'Slanina barena mesara Seka'
},
{
  id: 4,
  name:  'Madjarski pileci narezak'
}, 
{
  id: 5,
  name:  'Madjarski pileci narezak'
},
{
  id: 1,
  name: 'Govedja kobasica zlatiborac'
}, 
{
  id:2,
  name:  'Slanina u omotu Carnex'
},
{
  id:3,
  name:  'Slanina barena mesara Seka'
},
{
  id: 4,
  name:  'Madjarski pileci narezak'
}, 
{
  id: 5,
  name:  'Madjarski pileci narezak'
},
{
  id: 1,
  name: 'Govedja kobasica zlatiborac'
}, 
{
  id:2,
  name:  'Slanina u omotu Carnex'
},
{
  id:3,
  name:  'Slanina barena mesara Seka'
},
{
  id: 4,
  name:  'Madjarski pileci narezak'
}, 
{
  id: 5,
  name:  'Madjarski pileci narezak'
},
{
  id: 1,
  name: 'Govedja kobasica zlatiborac'
}, 
{
  id:2,
  name:  'Slanina u omotu Carnex'
},
{
  id:3,
  name:  'Slanina barena mesara Seka'
},
{
  id: 4,
  name:  'Madjarski pileci narezak'
}, 
{
  id: 5,
  name:  'Madjarski pileci narezak'
},
{
  id: 1,
  name: 'Govedja kobasica zlatiborac'
}, 
{
  id:2,
  name:  'Slanina u omotu Carnex'
},
{
  id:3,
  name:  'Slanina barena mesara Seka'
},
{
  id: 4,
  name:  'Madjarski pileci narezak'
}, 
{
  id: 5,
  name:  'Madjarski pileci narezak'
}
];


const listRacuna = [
  {
    id: 1,
    name: 'Racun 01'
  }, 
  {
    id:2,
    name:  'Racun 02'
  },
  {
    id:3,
    name:  'Racun 03'
  },
  {
    id: 4,
    name:  'Racun 04'
  }, 
  {
    id: 5,
    name:  'Racun 05'
  }
  ];


  const artikliTmp = [
    {
      id: 1,
      artikal: 'Govedja kobasica zlatiborac',
      kolicina: 1,
      cena: 100
    }, 
    {
      id:2,
      artikal:  'Slanina u omotu Carnex',
      kolicina: 1,
      cena: 100
    },
    {
      id:3,
      artikal:  'Slanina barena mesara Seka',
      kolicina: 1,
      cena: 100
    },
    {
      id: 4,
      artikal:  'Madjarski pileci narezak',
      kolicina: 1,
      cena: 100
    }, 
    {
      id: 5,
      artikal:  'Madjarski pileci narezak',
      kolicina: 1,
      cena: 100
    },
    {
      id: 1,
      artikal: 'Govedja kobasica zlatiborac',
      kolicina: 1,
      cena: 100
    }, 
    {
      id:2,
      artikal:  'Slanina u omotu Carnex',
      kolicina: 1,
      cena: 100
    },
    {
      id: 5,
      artikal:  'Madjarski pileci narezak',
      kolicina: 1,
      cena: 100
    },
    {
      id: 1,
      artikal: 'Govedja kobasica zlatiborac',
      kolicina: 1,
      cena: 100
    }, 
    {
      id:2,
      artikal:  'Slanina u omotu Carnex',
      kolicina: 1,
      cena: 100
    },
    
    
    ];


    
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      height: 300,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      borderRadius: 2,
      p: 4,
      backgroundColor:  '#323b40'
    };


const arrayChunk = (arr, n) => {
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};





export const MainPayment = () => {
  const theme = useTheme();
  const [openModalKolicina, setOpenModalKolicina] = React.useState(false);
  const [openModalPopustArtikal, setOpenModalPopustArtikal] = React.useState(false);
  const [openModalPopustRacun, setOpenModalPopustRacun] = React.useState(false);
  const [openModalStornoArtikla, setOpenModalStornoArtikla] = React.useState(false);
  const [openModalStornoRacun, setOpenModalStornoRacun] = React.useState(false);
  const [openModalNaplata, setOpenModalNaplata] = React.useState(false);
  const [value, setValue] = React.useState(0);
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
  const handleCloseModalNaplata = () => setOpenModalNaplata(false);
  


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currencyFormat = (num) => {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }



  return (
    <ThemeProvider theme={theme}>
      <Grid container  
            sx={{ height: '100vh',  
                  backgroundColor:  '#1e2730',
                  display:  'flex'
                   }}>
        <CssBaseline />
            <Drawer variant="permanent" >
                <DrawerHeader>
                  <Box>
                      <img src={Logo} alt="Master logo" style={{maxWidth:50}}  />
                  </Box>
                </DrawerHeader>
                <Box sx={{marginTop: 5}}>
                    <List>
                    {icons.map((item, index) => (
                        <ListItem key={item} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent:  'center',
                              px: 2.5,
                              display:  'flex',
                              flexDirection:  'column'
                            }}
                        >
                            <ListItemIcon
                            sx={{
                                justifyContent: 'center',
                                color:  () => item.text === 'Naplata' ? '#6cb238' : '#ffffff',
                            }}
                            >
                            {item.avatarIcon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ color: 'white'}} 
                                primaryTypographyProps={{
                                                      fontSize: 15,
                                                      fontWeight: 'medium',
                                                      letterSpacing: 0,
                                                    }} />
                        </ListItemButton>
                        {item.text === 'Naplata' ? <Divider  sx={{ background: 'white', marginBottom: 1, }} /> : <p></p>}
                        </ListItem>
                    ))}
                    </List>
                </Box>
            </Drawer>
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
                                    {listRacuna.map((item,index) => (
                                        <Button variant="contained"  sx={{ml:2, fontSize: 6, backgroundColor:  '#323b40',
                                        '&:hover': {
                                          backgroundColor: '#6cb238',
                                          borderColor: '#0062cc',
                                          boxShadow: 'none',
                                        },
                                        '&:first-child': {
                                         ml: 0,
                                        }, }}>{item.name}</Button>
                                    ))}
                                <TextField
                                    id="outlined-password-input"
                                    variant= "outlined"
                                    type="password"
                                    autoComplete="current-password"
                                    sx={{ml:  1,
                                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                           background: "#323b40",
                                        },
                                        "& .MuiOutlinedInput-input": {
                                          color: "green",
                                          height: 20            
                                        },
                                      }}
                                  />
                                  <Button variant="contained"  startIcon={<SearchIcon />} sx={{ml: 2,fontSize: 8, backgroundColor:  '#6cb238' }}>Detaljna pretraga</Button>
                            </Grid>  
                             
                            <Grid  sx={{ background: "#323b40", height: "75%",  borderRadius:  2}}  >
                              <Grid  sx={{ height: "80%", maxHeight: '70%' , overflowY:  'scroll'}} >
                                {arrayChunk(dataListTip, 4).map((row, i) => (
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
                                    <Tab label="Mlecni proizvodi"    sx={{color: '#5b6266'}} />
                                    <Tab label="Suhomesnato"     sx={{color:  '#5b6266'}} />
                                    <Tab label="Hleb i peciva"   sx={{color:  '#5b6266'}} />
                                    <Tab label="Kafa"    sx={{color:  '#5b6266'}}/>
                                    <Tab label="Sokovi i voce"     sx={{color:  '#5b6266'}}/>
                                    <Tab label="Item Seven"   sx={{color:  '#5b6266'}}/>
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
                                  {artikliTmp.map((row,index) => (
                                    <TableRow
                                      key={index}
                                      sx={{ '& td, & th': {color:  'white',  border:  0,  backgroundColor: () => index%2 ===0 ? '#1e2730' : '#323b40', fontSize: 8, maxWidth: 90} }}
                                    >
                                      <TableCell component="th" scope="row"   onClick={handleOpenModalStornoArtikal}>
                                        {row.artikal}
                                      </TableCell>
                                      <TableCell align="right" onClick={handleOpenModalKolicina}>{row.kolicina}</TableCell>
                                      <TableCell align="right"  onClick={handleOpenModalPopustArtikal}>{currencyFormat(row.cena)}</TableCell>
                                      <TableCell align="right">{currencyFormat(parseFloat(row.kolicina) * parseFloat(row.cena))}</TableCell>
                                  
                                    </TableRow>
                                  ))}
                                </TableBody>
                                </Table>
                              </TableContainer>        
                              <ModalCount openProps={openModalKolicina} handleCloseprops={handleCloseModalKolicina} ></ModalCount>
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
                                      <Grid item xs={6}  justifyContent="flex-end"><Typography  sx={{fontSize: 10, color:  'white', display:  'flex', justifyContent:  'flex-end'}}>{currencyFormat(2490)}</Typography></Grid>
                                    </Grid>
                                    <Grid sx={{display:  'flex',  ml:  1  }}>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3}} >Total za naplatu</Typography></Grid>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3,  display:  'flex', justifyContent:  'flex-end'}} >{currencyFormat(2490)}</Typography></Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid xs={6} sx={{   height: "100%",    display:  'flex', marginTop:  1}} >
                                      <Button variant="contained"   sx={{ml: 2,fontSize: 14, backgroundColor:  '#6cb238', mr:1, '&.MuiButton-root': {color:  'black'}}}  onClick={handleOpenModalNaplata}  fullWidth>Naplata</Button>
                                  </Grid>
                                  <ModalNaplata openProps={openModalNaplata} handleCloseprops={handleCloseModalNaplata} ></ModalNaplata>
                            </Grid>
                        </Grid>
                    </Grid>
            </Box>
        
    </Grid>
    </ThemeProvider>
  );
}
