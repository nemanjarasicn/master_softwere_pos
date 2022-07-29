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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40'
  };

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
                <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                    <Grid sx={{display:  'flex', height:  '10%',  justifyContent:  'center'}} >
                    <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{display:  'flex', justifyContent:  'center', color:  'white'}}>
                        Popust na racun
                    </Typography>
                    </Grid>
                    <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '60%', alignItems:  'center'}} >
                    <Grid item xs={12}  sx={{display: 'flex'}} >
                            <Grid item xs={6}     sx={{display: 'flex',  alignItems:  'flex-end'}} >
                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontSize: 14  , justifyContent:  'center', color:  'white'}}>
                                        Popust(%)
                                </Typography>
                            </Grid>
                            <Grid item xs={6}    sx={{display: 'flex',  alignItems:  'flex-end'}}>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                placeholder='0.00'
                                variant="filled"
                            
                                size="small"
                                sx={{ input: {   fontSize: 14,      color:  'white', ml: 2},  }}
                                inputRef={ref}
                                />
                            </Grid>

                        </Grid>
                        <Grid item xs={12}  sx={{display: 'flex'}} >
                            <Grid item xs={6}     sx={{display: 'flex',  alignItems:  'flex-end'}} >
                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontSize: 14  , justifyContent:  'center', color:  'white'}}>
                                        Fiksni popust
                                </Typography>
                            </Grid>
                            <Grid item xs={6}    sx={{display: 'flex',  alignItems:  'flex-end'}}>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                placeholder='0.00'
                                variant="filled"
                            
                                size="small"
                                sx={{ input: {   fontSize: 14,      color:  'white', ml: 2},  }}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    
                    <Grid sx={{display:  'flex', height:  '30%', flexDirection:  'column',  justifyContent:  'center', mt: 2}} >
                        <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                            <Button variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Detaljna pretraga</Button>
                        </Box>
                        <Typography id="modal-modal-title" variant="h8" component="h6"  sx={{mt:  2, display:  'flex', justifyContent:  'center',  color:  'white'}}>
                        Odustani
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }