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
            <Box  sx={{ flexGrow: 1, p: 3, height: '100vh', overflow: 'auto'  , display:  'flex' }}>
                  <Grid 
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto' }}
                      xs={8} 
                    >
                      <Grid  
                          container
                          direction="column"
                          justifyContent="space-between"
                          sx={{ height: "100%" }} 
                        >
                            <Grid item style={{ background: "#1e2730", height: "10%", alignContent:  'center',  justifyContent:  'flex-start',  display:  'flex'}} >
            
                                    <Button variant="contained"  sx={{fontSize: 6, backgroundColor:  '#323b40',
                                                                      '&:hover': {
                                                                        backgroundColor: '#6cb238',
                                                                        borderColor: '#0062cc',
                                                                        boxShadow: 'none',
                                                                      }, }}>racun 01</Button>
                                    <Button variant="contained" sx={{ml:2,fontSize: 6, backgroundColor:  '#323b40',
                                                                      '&:hover': {
                                                                        backgroundColor: '#6cb238',
                                                                        borderColor: '#0062cc',
                                                                        boxShadow: 'none',
                                                                      },}}>racun 02</Button>
                                    <Button variant="contained" sx={{ml:2,fontSize: 6 , backgroundColor:  '#323b40',
                                                                      '&:hover': {
                                                                        backgroundColor: '#6cb238',
                                                                        borderColor: '#0062cc',
                                                                        boxShadow: 'none',
                                                                      },}}>racun 03</Button>
                                    <Button variant="contained" sx={{ml:2, fontSize: 6, backgroundColor:  '#323b40',
                                                                      '&:hover': {
                                                                        backgroundColor: '#6cb238',
                                                                        borderColor: '#0062cc',
                                                                        boxShadow: 'none',
                                                                      },}}>racun 04</Button>
                                    <Button variant="contained" sx={{ml:2, fontSize: 6, backgroundColor:  '#323b40',
                                                                      '&:hover': {
                                                                        backgroundColor: '#6cb238',
                                                                        borderColor: '#0062cc',
                                                                        boxShadow: 'none',
                                                                      },}}>racun 05</Button>
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
                             
                            <Grid  sx={{ background: "#323b40", height: "75%"}}  >
                                <Grid item xs={12} m={2}  sx={{display: 'flex', height: '15%'}}>
                                    <Button variant="contained"  sx={{ width: '25%', background: "#1e2730", fontSize: 10}}  >Govedja kobasica zlatiborac</Button>
                                    <Button variant="contained"  sx={{ml:2,width: '25%', background: "#1e2730", fontSize: 10}}>Slanina u omotu Carnex</Button>
                                    <Button variant="contained"  sx={{ml:  2,width: '25%', background: "#1e2730", fontSize: 10}}>Slanina barena mesara Seka</Button>
                                    <Button variant="contained" sx={{ml:  2,width: '25%', background: "#1e2730", fontSize: 10}}>Madjarski pileci narezak</Button>
                                </Grid>
                                <Grid item xs={12} m={2}  sx={{display: 'flex', height: '15%'}}>
                                    <Button variant="contained"  sx={{ width: '25%', background: "#1e2730", fontSize: 10}}  >Cureca sunka</Button>
                                    <Button variant="contained"  sx={{ml:2,width: '25%', background: "#1e2730", fontSize: 10}}>Praska sunka PIK</Button>
                                    <Button variant="contained"  sx={{ml:  2,width: '25%', background: "#1e2730", fontSize: 10}}>Alpska kobasica Yuhor</Button>
                                    <Button variant="contained" sx={{ml:  2,width: '25%', background: "#1e2730", fontSize: 10}}>Wudi parizer AIA</Button> 
                                </Grid>
                                <Grid item xs={12} m={2}  sx={{display: 'flex', height: '15%'}}>
                                    <Button variant="contained"  sx={{ width: '25%', background: "#1e2730", fontSize: 10}}  >Suvi vrat 1kg</Button>
                                    <Button variant="contained"  sx={{ml:2,width: '25%', background: "#1e2730", fontSize: 10}}>Alpska kobasica Imes</Button>
                                    <Button variant="contained"  sx={{ml:  2,width: '25%', background: "#1e2730", fontSize: 10}}>Pileca extra XXL</Button>
                                    <Button variant="contained" sx={{ml:  2,width: '25%', background: "#1e2730", fontSize: 10}}>Suve kosti 1kg</Button> 
                                </Grid>
                                <Grid  item xs={12} m={2}  sx={{display: 'flex', height: '15%'}}>
                                    <Button variant="contained"  sx={{ width: '25%',  background: "#1e2730", fontSize: 10}}  >Pecenica 1kg</Button>
                                    <Button variant="contained"  sx={{ml:2,width: '25%', background: "#1e2730", fontSize: 10}}>Sendvic kobasica Neoplanta 1kg</Button>
                                    <Button variant="contained"  sx={{ ml: 2, width: '25%',  background: "#1e2730", fontSize: 10}}  ></Button>
                                    <Button variant="contained"  sx={{ml:2,width: '25%', background: "#1e2730", fontSize: 10}}></Button>
                    
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
                  <Grid
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto', marginLeft: 2 }}
                      xs={4}
                    >
                        <Grid item style={{ background: "blue", height: "100%", mt:5, border:  'solid 1px white'}} >
                        </Grid>
                    </Grid>
            </Box>
        
    </Grid>
    </ThemeProvider>
  );
}
