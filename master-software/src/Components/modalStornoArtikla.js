import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useRef,  useState, useEffect }  from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as txtStornoArtikla from '../Data/txt';
import NumPad from 'react-numpad-material';
import Keyboard from 'react-material-ui-keyboard';
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';



const theme = createTheme({
    palette: {
      neutral: {
        main: 'white',
        contrastText: '#fff',
      },
    },
  });

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 500 : 853 , 
    height: () => window.devicePixelRatio == 1.5 ? 300 : 532 ,
    

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    padding:  window.devicePixelRatio == 1.5 ?  2.5 :  '40px 40px 64px',
    backgroundColor:  '#323b40',
    display: 'flex'
  };

export const ModalStornoArtikal = ({openProps,handleCloseprops,titleTextProps}) => {

    const [value, setValue] = React.useState('');


    const numericKeyboard = [
        ['7',      '8',         '9'],
        ['4',      '5',         '6'],
        ['1',      '2',         '3'],
        ['.',      '0',         '<x']
    ];




    const handleAddValue = (event) => {

        let valueTmp = value + event.target.value;
        setValue(valueTmp);


    }

    const ref = useRef();
    
    if(openProps) {
        setTimeout(() => {
            ref.current.focus();
        }, 200);
     }

    
    const handleChange = (event) => {
        setValue(0);
        setValue(event.target.value)
    }


    

    const handleSubmit = () =>   {
        if(value ===  '0000') {
            handleCloseprops(true);
        }
    }



    React.useEffect(() => {
       setValue('');
      },[openProps]);
  




      return (
        <ThemeProvider theme={theme}>
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onBackdropClick="false"
        >
            <Box sx={style}>

                <Grid item xs={6}  >
                        <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                            <Grid sx={{display:  'flex', height:  '10%',  justifyContent:  'flex-start'}} >
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center',
                                    fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24, color:  'white'}}>
                                            STORNO RACUNA
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography  sx={{fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,
                                    '&:hover':{cursor: 'pointer'
                                    }}}
                                    onClick={() => handleCloseprops(false)}>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{backgroundColor:  '#6cb238'}} />
                            <Grid sx={{display:  'flex', height:  '50%', alignItems:  'end'}} >
                            <Grid item xs={12}  sx={{display: 'flex'}} >   
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        fullWidth
                                        value={value}
                                        onChange={handleChange}
                                        variant="filled"
                                        placeholder='unesite autorizacioni kod'
                                        color="neutral"
                                        size="small"
                                        sx={{ input: {   fontFamily: 'Roboto', 
                                            fontStyle: 'normal',
        
                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  14 : 24,   color:  'white', ml: 2},  }}
                                        
                                        inputRef={ref}
                                        />
                                    </Grid>
                            
                            </Grid>
                            <Grid sx={{display:  'flex', height:  '40%', mt: window.devicePixelRatio == 1.5 ?  2 : 'none', flexDirection:  'column',  justifyContent:  'flex-end'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  14 : 24, height:  window.devicePixelRatio == 1.5 ?  '30px' : '56px', color:  'black',    backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}
                                    onClick={() => handleSubmit()}>Potvrdi brisanje</Button>
                                </Box>

                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: window.devicePixelRatio == 1.5 ?  1 : 2  ,  fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  14 : 24, backgroundColor:  '#1e2730',  height:  window.devicePixelRatio == 1.5 ?  '30px' : '56px',  display:  'flex',  justifyContent:  'center' }}
                                    onClick={() => handleCloseprops(true)}>{txtStornoArtikla.txtOdustani}</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid xs={6}  sx={{display:  'flex', ml: 3, flexDirection:   'column',  height:  '100%'}}  >
                <Divider sx={{backgroundColor:  '#4f5e65', }} />
                    <Grid sx={{height:  '100%', alignSelf:  'center',  mt: 5}}>
                        {numericKeyboard.map(obj => (
                            <Grid item xs={12}   sx={{display: 'flex' }}>
                            {obj.map((col, i) => (
                                <Grid item xs={4}   sx={{paddingLeft:  '12px', paddingBottom:  '12px',}} >
                                        <Button variant="contained"  onClick={handleAddValue}  value={col} fullWidth   sx={{width: window.devicePixelRatio == 1.5 ?  '50px' : '104px', height:  window.devicePixelRatio == 1.5 ?  '33px' : '76px' , borderRadius:  '12px', fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 36,   backgroundColor:  '#1e2730'}}>{col}</Button>
                                </Grid>
                            ))}
                          </Grid>
                           
                        ))}
                    </Grid>
                <Divider sx={{backgroundColor:  '#4f5e65'}} />
                    </Grid>
            </Box>
      </Modal>
      </ThemeProvider>
    );
  }