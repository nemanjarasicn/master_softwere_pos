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
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import  '../Css/alertError.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 350 : 480 , 
    height: () => window.devicePixelRatio == 1.5 ? 320 : 430 ,
   

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 5,
    backgroundColor:  '#323b40',
    display:  'flex'
  };


  

export const ModalAlertErrorConection = ({openProps,handleCloseprops, fromParent}) => {


  console.log(fromParent);
    

      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Grid id="gridConteiner" className='gridConteiner'  >
                
                    <Grid id="gridConteinerImg"  className='gridConteinerImg'  >
                        <Box   sx={{display: 'flex', justifyContent: 'center',  alignItems:  'center'}}   >
                          <WarningAmberIcon id="imgAlert"  className="imgAlert"   />
                        </Box>
                    </Grid>
                    <Grid  sx={{display:  'flex', height:  '40%'}} >
                    <Grid item  xs={12}  sx={{display:  'flex', flexDirection:   'column'  }}>
                                    <Typography id="titleMessage"   className="titleMessage"   sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24}}>
                                       GRESKA
                                    </Typography>
                                    <Divider id="divider"  className="divider" />
                                    <Typography id="messageText"  className='messageText'  sx={{fontSize:  window.devicePixelRatio == 1.5 ?  10 : 20}}>
                                      {fromParent.message}
                                    </Typography>
                            
                            </Grid> 
                    </Grid>


                </Grid>

            </Box>
      </Modal>
    );
  }