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
    }
    ];




const arrayChunk = (arr, n) => {
  const array = arr.slice();
  const chunks = [];
  while (array.length) chunks.push(array.splice(0, n));
  return chunks;
};



export const MainPayment = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container  
            sx={{ height: '100vh',  
                  backgroundColor:  '#1e2730',
                  display:  'flex'
                   }}>
        <CssBaseline />
            <Drawer variant="permanent" open={open}>
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
                                {arrayChunk(dataListTip, 4).map((row, i) => (
                                  <Grid item xs={12} m={2}  sx={{display: 'flex'}}>
                                    {row.map((col, i) => (
                                        <Grid item xs={3} >
                                            <Button variant="contained"  sx={{ml:1, background: "#1e2730", height: 50,  fontSize: 10}}  >{col.name}</Button>
                                        </Grid>
                                    ))}
                                  </Grid>
                                ))}  
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
                  <Grid
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto' }}
                      xs={4}
                    >
                        <Grid item style={{ background: "#323b40", height: "100%",  display:  'flex',  flexDirection:  'column'}} >
                            <Grid item style={{ height: "75%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex', margin: 5}} >
                                <Table size='medium' aria-label="a dense table" >
                                  <TableHead>
                                      <TableRow   >
                                        <TableCell  sx={{color:  'white', width:  '40%',  textOverflow: 'ellipsis', overflow: 'hidden'}}>Artikal</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">Kolicina</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">Cena</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">Ukupno</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                  {artikliTmp.map((row,index) => (
                                    <TableRow
                                      key={index}
                                      sx={{ '& td, & th': {color:  'white',  border:  0,  backgroundColor: () => index%2 ===0 ? '#1e2730' : '#323b40', fontSize: 8, maxWidth: 90} }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {row.artikal}
                                      </TableCell>
                                      <TableCell align="right">{row.kolicina}</TableCell>
                                      <TableCell align="right">{row.cena}</TableCell>
                                      <TableCell align="right">{row.kolicina} * {row.cena}</TableCell>
                                  
                                    </TableRow>
                                  ))}
                                </TableBody>
                                </Table>
                            </Grid>
                            <Grid item style={{  height: "10%",   display:  'flex', flexDirection:  'column',  justifyContent:  'center'}}  >
                            <Card sx={{ minWidth: 275, display: 'flex', backgroundColor:  '#4f5e65', m: 1}}>
                                
                                <ButtonGroup sx={{
                                                  mt: 1,
                                                  mb: 1,
                                                  width: "100%",
                                                  justifyContent: "space-evenly"}}>
                                    <Button variant="contained"  startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Popust</Button>
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Numeric</Button>
                                    <Button variant="contained" startIcon={<SearchIcon />} sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Vaga</Button>
                                    <Button variant="contained" sx={{backgroundColor:  '#323b40' , height:  '90%',  fontSize:  8}}>Storno</Button>
                                  </ButtonGroup>

                              </Card>

                            </Grid>
                            <Grid item sx={{  height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
                                  <Grid item xs={6}  sx={{  height: "100%", marginTop: 1}}>
                                    <Grid sx={{display:  'flex', ml:1}}>
                                      <Grid item xs={6}  ><Typography  sx={{fontSize: 10, color:  'white'}}>Total racun</Typography></Grid>
                                      <Grid item xs={6}  justifyContent="flex-end"><Typography  sx={{fontSize: 10, color:  'white', display:  'flex'}}>2490</Typography></Grid>
                                    </Grid>
                                    <Grid sx={{display:  'flex',  ml:  1  }}>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3}} >Total za naplatu</Typography></Grid>
                                      <Grid item xs={6}><Typography  sx={{  fontSize: 12,  color:  'white', mt: 3,  display:  'flex', justifyContent:  'flex-end'}} >2490</Typography></Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid xs={6} sx={{   height: "100%",    display:  'flex', marginTop:  1}} >
                                      <Button variant="contained"   sx={{ml: 2,fontSize: 14, backgroundColor:  '#6cb238', mr:1 }} fullWidth>Naplata</Button>
                                  </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            </Box>
        
    </Grid>
    </ThemeProvider>
  );
}
