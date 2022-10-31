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
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';


import {sortBy} from 'lodash';
import {printReport } from '../Funkcije/functions';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 550 : 828 , 
    height: () => window.devicePixelRatio == 1.5 ? 350 : 978 ,
   

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



export const ModalIzvestaj = ({openProps,handleCloseprops,toModalNaplata, openModalKomPlacanje, fromModalNaplata}) => {
    
    
    const [uplataStr, setUplataStr] = React.useState();
    const [uplata, setUplata] = React.useState(0);
    const [kusur, setKusur] = React.useState(0);
    const [valueUplata, setValueUplata] = React.useState('');
    const [prodatiArtikliList, setProdatiArtikliList]    =   React.useState(JSON.parse(localStorage.getItem('prodatiArtikli'))  ?  JSON.parse(localStorage.getItem('prodatiArtikli'))   :   []);
    //const [selectedTipPlacanja, setSelectedtipPlacanja] = React.useState('');
    

    const currencyFormat = (num) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

    

     
     const printIzvestaj = () =>   {
        printReport();
        handleCloseprops();
     }


     /*useEffect(() => {
        setProdatiArtikliList(JSON.parse(localStorage.getItem('prodatiArtikli')));
      }, [JSON.parse(localStorage.getItem('prodatiArtikli'))]);*/

    

   
     

     
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
                                        Izvestaj
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
                    <Divider sx={{backgroundColor:  '#6cb238'}} />
                    <Grid  sx={{display:  'flex', height:  '90%' }} >
                            <Grid item xs={12} sx={{display:  'flex',   flexDirection:  'column'    ,mt: 4}} >
                            
                                <Box  mt={2} >
                                <Grid sx={{display:  'flex', flexDirection:  'column', height:  '50%', justifyContent:  'center'}} >
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                            <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                    fontStyle: 'normal',

                                                    /* or 158% */
                                                    lineHeight:  '32px', 
                                                    textAlign: 'center',
                                                    textTransform: 'none',
                                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,   justifyContent:  'flex-start', color:  'white'}}>
                                                            Gotovina
                                            </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                        fontStyle: 'normal',

                                                        /* or 158% */
                                                        lineHeight:  '32px', 
                                                        textAlign: 'center',
                                                        textTransform: 'none',
                                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,   justifyContent:  'flex-start', color:  'white'}}>
                                                             {localStorage.getItem('Cash')  ?  currencyFormat(JSON.parse(localStorage.getItem('Cash')))  :  currencyFormat(0)}   
                                                </Typography>
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                        fontStyle: 'normal',

                                                        /* or 158% */
                                                        lineHeight:  '32px', 
                                                        textAlign: 'center',
                                                        textTransform: 'none',
                                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,  mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                                             Platna kartica   
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                        fontStyle: 'normal',

                                                        /* or 158% */
                                                        lineHeight:  '32px', 
                                                        textAlign: 'center',
                                                        textTransform: 'none',
                                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,  mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                                {localStorage.getItem('Card')  ?  currencyFormat(JSON.parse(localStorage.getItem('Card')))  :  currencyFormat(0)}  
                                                </Typography>
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                            
                                                                lineHeight:  '32px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                                                            Prenos na racun
                                                    </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                                lineHeight:  '38px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                                        {localStorage.getItem('WireTransfer')  ?  currencyFormat(JSON.parse(localStorage.getItem('WireTransfer')))  :  currencyFormat(0)}  
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                            
                                                                lineHeight:  '32px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                                                            Cek
                                                    </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                                lineHeight:  '38px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                                        {localStorage.getItem('WireTransfer')  ?  currencyFormat(JSON.parse(localStorage.getItem('WireTransfer')))  :  currencyFormat(0)} 
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                            
                                                                lineHeight:  '32px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                                                            Vaucer
                                                    </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                                lineHeight:  '38px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                                        {localStorage.getItem('Voucher')  ?  currencyFormat(JSON.parse(localStorage.getItem('Cash')))  :  currencyFormat(0)} 
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                            
                                                                lineHeight:  '32px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                                                            Instant placanje
                                                    </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                                lineHeight:  '38px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                                        {localStorage.getItem('MobileMoney')  ?  currencyFormat(JSON.parse(localStorage.getItem('MobileMoney')))  :  currencyFormat(0)} 
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                            
                                                                lineHeight:  '32px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                                                            Ukupno
                                                    </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                fontStyle: 'normal',

                                                                /* or 158% */
                                                                lineHeight:  '38px', 
                                                                textAlign: 'center',
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  14 : 20,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                                       
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                </Grid>
                                <Grid sx={{height:  '50%', display:  'flex'}} >
                                                <TableContainer sx={{ maxHeight:  window.devicePixelRatio == 1.5 ?  300 : 962 }}  className='tableConteiner' >
                                                        <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#1e2730'}}}  >
                                                        <TableHead   >
                                                        <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'}}}  >
                                                                <TableCell  sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell'>Naziv</TableCell>
                                                                <TableCell   sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell' align="right">Cena</TableCell>
                                                                <TableCell   sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell' align="right">Kolicina</TableCell>
                                                                <TableCell   sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell' align="right">Ukupno</TableCell>
                                                        </TableRow>
                                                        </TableHead>
                                                        <TableBody sx={{ overflow: "auto", scrollBehavior: "smooth"}} >
                                                        {sortBy(prodatiArtikliList, ['productName']).map((row,i) => (
                                                        <TableRow
                                                                sx={{ '& td, & th': {color:  'white',  border:  0, fontFamily: 'Roboto',
                                                                fontStyle: 'normal',
                        
                                                                /* or 158% */
                                                                lineHeight:  '32px', 
                                                                textTransform: 'none',
                                                                fontSize:  window.devicePixelRatio == 1.5 ?  8 : 14}, backgroundColor:'#1e2730'  }}
                                                                // onClick={() => setSelectedValue(row.id)}
                                                        >   
                                                        <TableCell component="th" scope="row"  >
                                                                {row.productName}  
                                                        </TableCell>
                                                        <TableCell align="right">{row.cena}</TableCell>
                                                        <TableCell align="right">{row.kolicina}</TableCell>
                                                        <TableCell align="right">{parseFloat(row.kolicina)  *   parseFloat(row.cena)}</TableCell>
                                                        
                                                        </TableRow>

                                                        ))}
                                                        
                                                        
                                                        </TableBody>
                                                        </Table>
                                                </TableContainer>        
                                </Grid>
                                <Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
                                        <Grid xs={6} sx={{mr: 2.5}}>
                                                        <Button fullWidth variant="contained"     onClick={() => handleCloseprops()} sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                        </Grid>
                                        <Divider />
                                        <Grid xs={6} >
                                                        <Button fullWidth variant="contained"   onClick = {() => printIzvestaj()}   sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Potvrdi</Button>
                                        </Grid>      
                                </Grid>
    
    


                                </Box>
                                


                            
                            </Grid>     
                    </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }