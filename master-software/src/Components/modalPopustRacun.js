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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { withTheme } from '@emotion/react';

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
    padding: () => window.devicePixelRatio == 1.5 ? 4 : '40px 40px 64px',
    backgroundColor:  '#323b40',
    display:  'flex',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '12px',
    gap: '40px'
  };


  const numericKeyboard = [
    ['7',      '8',         '9'],
    ['4',      '5',         '6'],
    ['1',      '2',         '3'],
    ['.',      '0',         '<x']
];

export const ModalPopustRacun = ({openProps,handleCloseprops,fromModalPopustRacun, toModalPopustRacun}) => {


    const [value, setValue] = React.useState('');
    const [valueRadio, setValueRadio] =  React.useState('procenat');

    if(openProps) {
        setTimeout(() => {
            ref.current.focus();
        }, 200);
     }

     React.useEffect(() => {
        setValue('');
        setValueRadio('procenat');
      },[openProps]);

     
    const ref = useRef();

    const handleAddValue = (event) => {

        let valueTmp = value + event.target.value;
        setValue(valueTmp);


    }


    const handleChange = (event) => {
        setValue(0);
        setValue(event.target.value)
    }


    const  handleChangeRadio = (event) => {
            setValueRadio(event.target.value);
    }



    const handleSave = () => {
        let massage = '';
        if((valueRadio ===  'procenat'  &&  value > 100)  ||  (valueRadio  ===  'fiksni'  &&  value   >   toModalPopustRacun)) {
            massage =  'Popust ne moze biti veci od ukupnog racuna';
            fromModalPopustRacun({popustRadio:  '',  popust:  0, massageError:    massage});
            handleCloseprops();
        } else   {
                    fromModalPopustRacun({popustRadio:  valueRadio,  popust:  value, massageError:    massage});
                    handleCloseprops();
        }
    }

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
        
                <Grid item xs={6} >
                        <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                            <Grid sx={{display:  'flex', height:  '10%',  justifyContent:  'center'}} >
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', fontSize:  () => window.devicePixelRatio == 1.5 ? 12 : 24 ,  color:  'white'}}>
                                            POPUST NA RACUN
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography sx={{fontSize:  () => window.devicePixelRatio == 1.5 ? 12 : 24,
                                        '&:hover':{cursor: 'pointer'
                                    }}}  onClick={handleCloseprops}>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{backgroundColor:  '#6cb238'}} />
                            <Grid sx={{display:  'flex', flexDirection:  'column', mt: 2, height:  '40%', alignItems:  'center'}} >
                                <Grid item xs={12}  sx={{display: 'flex', marginTop: window.devicePixelRatio == 1.5 ?  '25px' : '60px'}} >
                                    <TextField
                                        hiddenLabel
                                        fullWidth
                                        id="filled-hidden-label-normal"
                                        value={value}
                                        onChange={handleChange}
                                        placeholder='Unesite popust'
                                        variant="filled"
                                        color="neutral"
                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                        sx={{ input: {   
                                            fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */

                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  16 : 30 ,     color:  'white', ml: 2, display:  'flex', justifyContent:  'center'},  }}
                                        inputRef={ref}
                                        />

                                </Grid>
                                <Grid item xs={12}  sx={{display: 'flex', width: '100%', marginTop:  window.devicePixelRatio == 1.5 ?  '12px' : '28px',  ml: 1}} >
                                <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="procenat"
                                        name="radio-buttons-group"
                                        sx={{display:  'flex', flexDirection: 'row'}}
                                        onChange={handleChangeRadio}
                                    >
                                        <Grid item  sx={{display:  'flex'}}  >  
                                        <FormControlLabel sx={{color:  'white'}} value="procenat" control={<Radio sx={{color: 'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography  sx={{color:  'white', fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  6 : 24 }}>Procenat(%)</Typography>} />
                                        </Grid>
                                        <Grid   item   sx={{display:  'flex' }}>
                                        <FormControlLabel sx={{color:  'white', margin: 0}} value="fiksni"   control={<Radio  sx={{color:  'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography   sx={{color:  'white',  fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  6 : 24 }}>Fiksni popust</Typography>} />
                                        </Grid>
                                </RadioGroup>
                                </Grid>
                            </Grid>
                            
                            <Grid sx={{display:  'flex', height:  '20%', marginTop:   window.devicePixelRatio == 1.5 ?  '50px' : '80px', flexDirection:  'column',  justifyContent:  'center'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button  fullWidth variant="contained"     onClick={() => handleSave()}  sx={{mt: 2  , fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            borderRadius:   window.devicePixelRatio == 1.5 ?  '6px' : '12px', 
                                            textTransform: 'uppercase',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24 , backgroundColor:  '#6cb238', color:   'black',  display:  'flex', height:  window.devicePixelRatio == 1.5 ?  '30px' : '56px',  justifyContent:  'center' }}
                                           >Potvrdi</Button>
                                </Box>
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{marginTop:  window.devicePixelRatio == 1.5 ?  '10px' : '20px'   , fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            borderRadius:  window.devicePixelRatio == 1.5 ?  '6px' : '12px', 
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24 , border:  'solid 1px white', height:  window.devicePixelRatio == 1.5 ?  '30px' : '56px', backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}
                                            onClick={handleCloseprops}>Odustani</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid xs={6}  sx={{display:  'flex', flexDirection:   'column',  height:  '100%'}}  >
                <Divider sx={{backgroundColor:  '#4f5e65', marginBottom:  '42px'}} />
                <Grid sx={{height:  '100%', alignSelf:  'center', }}>
                        {numericKeyboard.map(obj => (
                            <Grid item xs={12}   sx={{display: 'flex' }}>
                            {obj.map((col, i) => (
                                <Grid item xs={4}   sx={{paddingLeft:  '12px', paddingBottom:  '12px',}} >
                                        <Button variant="contained"  onClick={handleAddValue}  value={col} fullWidth   sx={{width: window.devicePixelRatio == 1.5 ?  '50px' : '104px', height:  window.devicePixelRatio == 1.5 ?  '33px' : '76px' , borderRadius: window.devicePixelRatio == 1.5 ?  '6px' : '12px', fontFamily: 'Roboto',
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
                <Divider sx={{backgroundColor:  '#4f5e65',  marginTop:    window.devicePixelRatio == 1.5 ?  '25px' : '42px'}} />
                </Grid>
            </Box>
      </Modal>
      </ThemeProvider>
    );
  }