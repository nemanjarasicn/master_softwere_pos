import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
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
import Divider from '@mui/material/Divider';



const useStyles = makeStyles(theme => ({
    root: {
       
            margin: '0px !important',
           
        }
    }
  ));

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
    padding: '40px 40px 64px',
    backgroundColor:  '#323b40',
    display: 'flex'
  };

export const ModalStornoArtikal = ({openProps,handleCloseprops,titleTextProps}) => {

    const [value, setValue] = React.useState('');
    const classes = useStyles();


    const numericKeyboard = [
        ['7',      '8',         '9'],
        ['4',      '5',         '6'],
        ['1',      '2',         '3'],
        ['.',      '0',         '<x']
    ];




    const handleAddValue = (event) => {

        console.log(event.target.value);
        let valueTmp = value + event.target.value;
        setValue(valueTmp);


    }
    


    
    const handleChange = (event) => {
        setValue(0);
        setValue(event.target.value)
    }


    

    const handleSubmit = () =>   {
        console.log(value);
        if(value ===  '0000') {
            handleCloseprops(true);
        }
    }



    React.useEffect(() => {
       setValue('');
      },[openProps]);
  




      return (
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
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24}}
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
                                        size="small"
                                        sx={{ input: {   fontFamily: 'Roboto', 
                                            fontStyle: 'normal',
        
                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  14 : 24,   color:  'white', ml: 2},  }}
                                        />
                                    </Grid>
                            
                            </Grid>
                            <Grid sx={{display:  'flex', height:  '40%', flexDirection:  'column',  justifyContent:  'flex-end'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  14 : 24, height:  '56px', color:  'black',    backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}
                                    onClick={() => handleSubmit()}>Potvrdi brisanje</Button>
                                </Box>

                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 2  ,  fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  14 : 24, backgroundColor:  '#1e2730',  height:  '56px',  display:  'flex',  justifyContent:  'center' }}
                                    onClick={() => handleCloseprops(false)}>{txtStornoArtikla.txtOdustani}</Button>
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
                                        <Button variant="contained"  onClick={handleAddValue}  value={col} fullWidth   sx={{width:  '104px', height:  '76px', borderRadius:  '12px', fontFamily: 'Roboto',
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
    );
  }