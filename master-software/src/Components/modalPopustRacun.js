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
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40',
    display:  'flex'
  };


  const numericKeyboard = [
    ['7',      '8',         '9'],
    ['4',      '5',         '6'],
    ['1',      '2',         '3'],
    ['.',      '0',         '<x']
];

export const ModalPopustRacun = ({openProps,handleCloseprops}) => {


    const [value, setValue] = React.useState('');

    if(openProps) {
        setTimeout(() => {
            ref.current.focus();
        }, 200);
     }
     
    const ref = useRef();

    const handleAddValue = (event) => {

        console.log(event.target.value);
        let valueTmp = value + event.target.value;
        setValue(valueTmp);


    }


    const handleChange = (event) => {
        setValue(0);
        setValue(event.target.value)
    }

      return (
        <ThemeProvider theme={theme}>
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
        
                <Grid item xs={6} >
                        <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                            <Grid sx={{display:  'flex', height:  '10%',  justifyContent:  'center'}} >
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', color:  'white'}}>
                                            POPUST NA RACUN
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{backgroundColor:  '#6cb238'}} />
                            <Grid sx={{display:  'flex', flexDirection:  'column', mt: 2, height:  '40%', alignItems:  'center'}} >
                                <Grid item xs={12}  sx={{display: 'flex', mt: 2}} >
                                    <TextField
                                        hiddenLabel
                                        fullWidth
                                        id="filled-hidden-label-normal"
                                        value={value}
                                        onChange={handleChange}
                                        placeholder='Input number'
                                        variant="filled"
                                        color="neutral"
                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                        sx={{ input: {   fontSize: 12,      color:  'white', ml: 2, display:  'flex', justifyContent:  'center'},  }}
                                        inputRef={ref}
                                        />

                                </Grid>
                                <Grid item xs={12}  sx={{display: 'flex', width: '100%', mt: 1,  ml: 1}} >
                                <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="procenat"
                                        name="radio-buttons-group"
                                        sx={{display:  'flex', flexDirection: 'row'}}
                                    >
                                        <Grid item xs={6} sx={{display:  'flex', justifyContent:  'flex-start' }}  >  
                                                <FormControlLabel sx={{color:  'white'}} value="procenat" control={<Radio sx={{color: 'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography variant="body2" sx={{color:  'white', fontSize: 8}}>Procenat(%)</Typography>} />
                                        </Grid>
                                        <Grid   item xs={6}  sx={{display:  'flex', justifyContent:  'flex-end' }}>
                                                <FormControlLabel sx={{color:  'white', margin: 0}} value="fiksni"   control={<Radio  sx={{color:  'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography variant="body2"  sx={{color:  'white',  fontSize: 8}}>Fiksni popust</Typography>} />
                                        </Grid>
                                </RadioGroup>
                                </Grid>
                            </Grid>
                            
                            <Grid sx={{display:  'flex', height:  '20%', mt: 4, flexDirection:  'column',  justifyContent:  'center'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button  fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 12, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Detaljna pretraga</Button>
                                </Box>
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 1  ,fontSize: 12, border:  'solid 1px white', backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid xs={6}  sx={{display:  'flex',  ml:  3, flexDirection:   'column',mb:5,  height:  '100%'}}  >
                <Divider sx={{backgroundColor:  '#4f5e65', mb: 2}} />
                        {numericKeyboard.map(obj => (
                            <Grid item xs={12}   sx={{display: 'flex' }}>
                            {obj.map((col, i) => (
                                <Grid item xs={4}  >
                                        <Button variant="contained"  onClick={handleAddValue}  value={col} fullWidth   sx={{width:  'auto', height:  '80%', backgroundColor:  '#1e2730'}}>{col}</Button>
                                </Grid>
                            ))}
                          </Grid>
                           
                        ))}
                <Divider sx={{backgroundColor:  '#4f5e65', mt: 1}} />
                </Grid>
            </Box>
      </Modal>
      </ThemeProvider>
    );
  }