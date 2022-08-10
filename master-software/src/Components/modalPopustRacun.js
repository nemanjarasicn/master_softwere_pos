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

    if(openProps) {
        setTimeout(() => {
            ref.current.focus();
        }, 200);
     }
     
    const ref = useRef();

      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid xs={6}  sx={{display:  'flex',  flexDirection:   'column',mb:5,  height:  '100%'}}  >
                        {numericKeyboard.map(obj => (
                            <Grid item xs={12}   sx={{display: 'flex' }}>
                            {obj.map((col, i) => (
                                <Grid item xs={4}  >
                                        <Button variant="contained"  value={col} fullWidth   sx={{width:  'auto', height:  '80%'}}>{col}</Button>
                                </Grid>
                            ))}
                          </Grid>
                           
                        ))}
                </Grid>
                <Grid item xs={6}  sx={{ml: 3}}>
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
                            <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '30%', alignItems:  'center'}} >
                                <Grid item xs={12}  sx={{display: 'flex', mt: 2}} >
                                    <TextField
                                        hiddenLabel
                                        fullWidth
                                        id="filled-hidden-label-normal"
                                        placeholder='0.00'
                                        variant="filled"
                                    
                                        
                                        sx={{ input: {   fontSize: 12,      color:  'white', ml: 2},  }}
                                        inputRef={ref}
                                        />

                                </Grid>
                                <Grid item xs={12}  sx={{display: 'flex', width: '100%', ml: 1}} >
                                        <Grid item xs={6} sx={{display:  'flex', justifyContent:  'flex-start' }}  >  
                                                <FormControlLabel sx={{color:  'white'}} value="1" name='test' control={<Radio sx={{color: 'white'}} />} label={<Typography variant="body2" sx={{color:  'white', fontSize: 8}}>Procenat(%)</Typography>} />
                                        </Grid>
                                        <Grid   item xs={6}  sx={{display:  'flex', justifyContent:  'flex-end' }}>
                                                <FormControlLabel sx={{color:  'white'}} value="0"  name='test' control={<Radio  sx={{color:  'white'}} />} label={<Typography variant="body2"  sx={{color:  'white',  fontSize: 8}}>Fiksni popust</Typography>} />
                                        </Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid sx={{display:  'flex', height:  '20%', mt: 7, flexDirection:  'column',  justifyContent:  'center'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button  fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 12, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Detaljna pretraga</Button>
                                </Box>
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 12, backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }