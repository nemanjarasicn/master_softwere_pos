import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRef,  useState, useEffect }  from 'react'
import Divider from '@mui/material/Divider';
import { txtPotvrdi } from '../Data/txt';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 300 : 600 , 
    height: () => window.devicePixelRatio == 1.5 ? 150 : 300 ,
   

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 5,
    backgroundColor:  '#323b40',
    display:  'flex'
  };


  const numericKeyboard = [
    ['7',      '8',         '9'],
    ['4',      '5',         '6'],
    ['1',      '2',         '3'],
    ['.',      '0',         '<x']
  ];



export const ModalConfirm = ({openProps,handleCloseprops, logOut}) => {
    
    
    const [uplataStr, setUplataStr] = React.useState();
    const [uplata, setUplata] = React.useState(0);
    const [kusur, setKusur] = React.useState(0);
    const [valueUplata, setValueUplata] = React.useState('');
    const [potvrdi, setPotvrdi] =  React.useState(false);
    //const [selectedTipPlacanja, setSelectedtipPlacanja] = React.useState('');
    

    const currencyFormat = (num) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }


     const potvrdiFunc = () => {
            logOut();
     }




     
      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onBackdropClick="false"
        >
            <Box sx={style} >
                <Grid sx={{display:  'flex', width: '100%',  flexDirection:  'column',  height:  '100%'}} >
                        <Grid item xs={12}  sx={{display:  'flex',    justifyContent:  'flex-start',alignItems:   'center'}}>
                            <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'none',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 30,   justifyContent:  'flex-start', color:  'white'}}>
                                            Da li ste sigurni da zelite da se izlogujete
                            </Typography>
                        </Grid>
                        
                        <Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
                                    <Grid xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"     onClick={() => handleCloseprops()} sx={{fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                    </Grid>
                                    <Divider />
                                    <Grid xs={6} >
                                                <Button fullWidth variant="contained"  onClick = {() => {setPotvrdi(true); potvrdiFunc()}}    sx={{ fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Potvrdi</Button>
                                  </Grid>      
                            </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }