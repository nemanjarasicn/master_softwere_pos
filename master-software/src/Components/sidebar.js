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


const drawerWidth = 96;

  
  const closedMixin = (theme) => ({
    overflowX: 'hidden',
    width: window.devicePixelRatio == 1.5 ?  65 : drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width:  window.devicePixelRatio == 1.5 ?  65 : drawerWidth,
      backgroundColor:  '#323B40',
    },
  });
  
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
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

export const Sidebar = ({openModal, openModalIzvestajOp}) => {


  const openModalFunc = (text) => {
    if(text  ===  'Kupac') {
      openModal();
    } else if( text === 'Admin')  {
      openModalIzvestajOp();
    }
    }

   
      return (
        <Drawer variant="permanent" >
        <DrawerHeader>
          <Box  sx={{ mt:  window.devicePixelRatio == 1.5 ?   '25px' : '48px' }}>
              <img src={Logo} alt="Master logo" style={{maxWidth:48}}  />
          </Box>
        </DrawerHeader>
        <Box sx={{marginTop:  window.devicePixelRatio == 1.5 ?  '50px' : '120px' }}>
            <List>
            {icons.map((item, index) => (
                <ListItem key={item} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent:  'center',
                      borderRadius: 8,
                      px: 2.5,
                      display:  'flex',
                      flexDirection:  'column'
                    }}
                    onClick={ () => openModalFunc(item.text)}
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
                                              fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              textAlign: 'center',
                                              textTransform: 'uppercase',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  10 : 12,
                                              fontWeight: 'medium',
                                              letterSpacing: 0,
                                              flex: 'none',
                                              order: 1,
                                              flexGrow: 0,
                                            }} />
                </ListItemButton>
                 <Divider  sx={{ width:  '80%', marginLeft:   '10px',   background: 'white', marginBottom:  '20px', }} /> 
                </ListItem>
            ))}
            </List>
        </Box>
    </Drawer>
    );
  }