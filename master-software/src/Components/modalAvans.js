import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import ReactPDF from '@react-pdf/renderer';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ArticleIcon from '@mui/icons-material/Article';
import TextField from '@mui/material/TextField';

import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';



import Divider from '@mui/material/Divider';
import { MyDocument }   from  '../Components/pdf'

import Box from '@mui/material/Box'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 550 : 828 , 
    height: () => window.devicePixelRatio == 1.5 ? 300 : 600 ,
   

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

  const avansi = [
    {
        id: 1,
        nazivLabel:  'Novi Avans',
        naziv: 'noviAvans',
        icon:  <AddIcon   sx={{width: 100, height: 100, ml:1, color: 'white'}} ></AddIcon>
      },
      {
        id: 2,
        nazivLabel:  'Prethodni avans',
        naziv: 'prethodniAvans',
        icon:  <ArticleIcon   sx={{width: 100, height: 100, ml:1, color: 'white'}} ></ArticleIcon>
      },
      {
        id: 3,
        nazivLabel:  'Refundacija avansa',
        naziv: 'refuAvans',
        icon:  <CurrencyExchangeIcon   sx={{width: 100, height: 100, ml:1, color: 'white'}} ></CurrencyExchangeIcon>
      },
      {
        id: 4,
        nazivLabel:  'Konacni racun',
        naziv: 'konacniRacun',
        icon:  <FactCheckIcon   sx={{width: 100, height: 100, ml:1, color: 'white'}} ></FactCheckIcon>
      },
     
     
  ]



export const ModalAvans = ({openProps,handleCloseprops}) => {
    

    const [activAvans, setActivAvans]  = React.useState('noviAvans');
    
    
   
     

     
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
                    <Grid sx={{display:  'flex', height:  '5%'}} >
                            <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        fontWeight:   700, 
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white'}}>
                                            Avans
                                    </Typography>
                            
                            </Grid>
                            <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                    <Typography  onClick={handleCloseprops}  sx={{fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,
                                        '&:hover':{cursor: 'pointer'
                                    }}}>X</Typography>
                            </Grid>
                    </Grid>
                    <Divider sx={{backgroundColor:  '#6cb238', mt:2}} />

                    <Grid sx={{display:  'flex', height:  '50%', mt: 5, justifyContent:  'center'}} >
                    {avansi.map(obj => (

                            <Grid item xs={4}  sx={{display: 'flex',  justifyContent:  'center'}} >
                            <Box >
                                <Card  onClick = {() => setActivAvans(obj.naziv)} variant="outlined" sx={{height: 150, width: 150,  borderRadius: 5,   backgroundColor: activAvans === obj.naziv ?  '#6cb238'  :  '#1e2730', border:  'solid 1px', '&:hover': {
                                            backgroundColor: '#6cb238',
                                            borderColor: '#0062cc',
                                            boxShadow: 'none',
                                           
                                            
                                        },}}>
                                        <CardContent>
                                                    {obj.icon}
                                        </CardContent>
                                        <Typography  sx={{display: 'flex', justifyContent:  'center', mt: -3, color: 'white'}}>
                                            {obj.nazivLabel}
                                        </Typography>
                                        
                                </Card>
                            </Box>
                            </Grid>
                           
                        ))}
                    </Grid>
                        
                    <Grid sx={{display:  'flex', height:  '30%', justifyContent:  'center'}} >

                            <Grid item xs={12}  sx={{display: 'flex',  mt: 5}} >    
                                    <TextField
                                        hiddenLabel
                                        fullWidth
                                        id="filled-hidden-label-normal"
                                       
                                        
                                        placeholder='broj prethodnog avansa'
                                        variant="filled"
                                        color="neutral"
                                        inputProps={{min: 0, style: { textAlign: 'start' }}}
                                        sx={{ input: {   
                                            fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */

                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 30 ,     color:  'white', ml: 2, display:  'flex', justifyContent:  'center'},  }}
                                        disabled={activAvans === 'noviAvans'  ? true  :  false}   
                                        />

                                </Grid>
                            </Grid>

                    
                    <Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
                                    <Grid xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"     onClick={() => handleCloseprops()} sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                    </Grid>
                                    <Divider />
                                    <Grid xs={6} >
                                                <Button fullWidth variant="contained"    sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Potvrdi</Button>
                                  </Grid>      
                            </Grid>
            </Grid>
            </Box>
      </Modal>
    );
  }