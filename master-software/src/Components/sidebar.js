import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Logo from  '../Images/master_logo.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import GroupIcon from '@mui/icons-material/Group';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BadgeIcon from '@mui/icons-material/Badge';


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

export const Sidebar = () => {

   
      return (
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
    );
  }