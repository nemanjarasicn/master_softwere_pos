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
import {Deposits}  from   './deposits'
import {Charts}  from   './chart'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Logo from  '../Images/master_logo.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

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
                <img src={Logo} alt="Master logo" style={{maxWidth:50}}  />
                </DrawerHeader>
                <Divider sx={{ background: 'white'}} />
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent:  'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color:  'white'
                        }}
                        >
                        {index % 2 === 0 ? <MonetizationOnIcon /> : <TextSnippetIcon />}
                        </ListItemIcon>
                        <ListItemText primary={'test'} sx={{ opacity: 0, color: 'white'}} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Divider  sx={{ background: 'white'}} />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color:  'white',
                        }}
                        >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <Box  sx={{ flexGrow: 1, p: 3, height: '100vh', overflow: 'auto'  , display:  'flex' }}>
                  <Grid
                      direction="row"
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto' }}
                      xs={8}
                    >
                      <Grid  
                          container
                          direction="column"
                          justifyContent="space-between"
                          style={{ height: "100%" }}
                          
                        >
                            <Grid item style={{ background: "#1e2730", height: "10%",  alignContent: 'center',  display:  'flex'}} >
                                <Button variant="contained"  sx={{fontSize: 8, backgroundColor:  '#323b40' }}>racun 01</Button>
                                <Button variant="contained" sx={{ml:1,fontSize: 8, backgroundColor:  '#323b40'}}>racun 02</Button>
                                <Button variant="contained" sx={{ml:1,fontSize: 8 , backgroundColor:  '#323b40'}}>racun 03</Button>
                                <Button variant="contained" sx={{ml:1, fontSize: 8, backgroundColor:  '#323b40'}}>racun 04</Button>
                                
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
                                          color: "green"
                                        },
                                      }}
                                  />
                                <Button variant="contained"  startIcon={<SearchIcon />} sx={{ml: 1,fontSize: 8, backgroundColor:  '#6cb238' }}>Detaljna pretraga</Button>
                            </Grid>
                            <Grid item style={{ background: "#1e2730", height: "70%", border:  'solid 1px white'}} >
                                <h1>OKKK</h1>
                            </Grid>
                            <Grid item style={{ background: "#1e2730", height: "20%", m:5, border:  'solid 1px  white' }} >
                                <h1>OKKK</h1>
                            </Grid>
                      </Grid>
                  </Grid>
                  <Grid
                      direction="row"
                      justifyContent="space-between"
                      sx={{ height: "100%", overflow:  'auto' }}
                      xs={4}
                    >
                          <Grid item style={{ background: "blue", height: "100%", mt:5, border:  'solid 1px white'}} >
                                <h1>OKKK</h1>
                            </Grid>
                    </Grid>
                  
            </Box>
        
    </Grid>
    </ThemeProvider>
  );
}
