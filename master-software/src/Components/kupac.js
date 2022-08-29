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
import  {CustomSearchField}   from  '../Components/customSearchField'
import  {CustomSelectField}   from  '../Components/customSelectField'
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import * as txt from '../Data/txt';
import SearchIcon from '@mui/icons-material/Search';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';




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
    width: () => window.devicePixelRatio == 1.5 ? 800 : 1360 , 
    height: () => window.devicePixelRatio == 1.5 ? 550 : 810 ,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 5,
    backgroundColor:  '#323b40',
    display: 'flex'
  };

export const  ModalKupac = ({openProps,handleCloseprops,titleTextProps,fromModalDp, openModalIndetifikacijaKupca,  openModalOpKupca}) => {
    

    const initialArtikal = [
        {
            id:  '', 
            productName: '',
            cena: '',
            code: ''

        }
    ]

    const [value, setValue] = React.useState('');
    const [searchValue, setSearchValue] = React.useState(initialArtikal);
    
    const [selectedValue, setSelectedValue] = React.useState('');
    const classes = useStyles();


    React.useEffect(() => {
        console.log('test');
        setSearchValue(initialArtikal);
      },[openProps]);




    const filterArtikal = (dataFilter) => {
        let artikliList = JSON.parse(localStorage.getItem('artikalList'));
        let artikalTmp = artikliList.filter(obj => obj.code === dataFilter || obj.productName.toLowerCase().includes(dataFilter.toLowerCase()));
        console.log(artikalTmp);
        setSearchValue(initialArtikal);
        setSelectedValue('');
        if(artikalTmp['length'] && dataFilter !== '') {
            artikalTmp.map((row,i) => {
                console.log(row);
                let artikalValue = 
                    {
                        id: row.id,
                        productName: row.productName,
                        cena: '100',
                        code:  row.code

                    }
                
                setSearchValue(prevState => [...prevState,artikalValue]);
            })
            console.log(searchValue);
        } else {            
            setSearchValue(initialArtikal);
        }
    }


    const saveSearch = () => {
        fromModalDp(selectedValue);
        handleCloseprops();
    }

    const  openModalIndKupca = () => {
        console.log('ghggfhh');
        openModalIndetifikacijaKupca();
    }


    const openModalOpcionPoljeKupca = () => {

        openModalOpKupca();
    }




      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                     
                <Grid item xs={12}  >
                        <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                            <Grid sx={{display:  'flex', height:  '10%', alignItems:   'flex-end', justifyContent:  'flex-start'}} >
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start', mb: 1}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',

                                    /* or 158% */

                                    
                                    lineHeight:  '32px',
                                    
                                    fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 24, color:  'white'}}>
                                            KUPAC
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',  mb:  1,    color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography sx={{fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              
                                              lineHeight:  '32px',
                                              
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 16 : 24}}>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{backgroundColor:  '#6cb238'}} />
                            <Grid  sx={{display:  'flex', height:  '100%'}}>
                                <Grid xs={2.78}   sx={{display:  'flex' ,   flexDirection:  'column',  height:  '100%', mt: 6}} >

                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                                <Button fullWidth variant="contained"    sx={{mt: 1.5  , height:  '78px',
                                             backgroundColor:  '#64B5F6', color:    'black',   display:  'flex',  justifyContent:  'center' }}><Box sx={{display:  'flex',  flexDirection:  'column',  alignItems:  'center' }}><PersonAddAltIcon  sx={{fontSize: 40}} /><Typography  sx={{fontFamily: 'Roboto',
                                             fontStyle: 'normal',

                                             /* or 158% */

                                             fontWeight:  700,
                                             lineHeight:  '26px',
                                             fontSize: () => window.devicePixelRatio == 1.5 ? 14 : 16}}>Dodaj novog kupca</Typography> </Box></Button>
                                            </Box>              
                                    
                                            <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                                <Button fullWidth variant="contained"    sx={{mt: 4  ,  height:  '42px', fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 14 : 16, backgroundColor:  '#55666E', display:  'flex',  justifyContent:  'center' }}
                                                        
                                                        onClick={() => openModalIndKupca()}>Indetifikacija Kupca</Button>
                                            </Box>
                                            <Divider />
                                            <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                                <Button fullWidth variant="contained"   sx={{mt: 1.5  , heigh:  '42px',  fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 14 : 16,
                                                         backgroundColor:  '#55666E', display:  'flex',  justifyContent:  'center' }}
                                                         onClick={() => openModalOpcionPoljeKupca()}>Opciono polje kupca</Button>
                                            </Box>
                                </Grid>
                                <Grid xs={9.21}  sx={{display:    'flex' , pl: 4,  flexDirection:  'column', height:  '100%',  mt: 9 }} >
                                        <Grid sx={{display:  'flex',  width: '100%',    height:  '10%', alignItems:  'center'}} >
                                                <Grid item xs={6}  >
                                                    <Typography sx={{color: '#6cb238', fontFamily: 'Roboto',
                                              fontStyle: 'normal',

                                              /* or 158% */

                                              
                                              lineHeight:  '22px',
                                              
                                              fontSize: () => window.devicePixelRatio == 1.5 ? 10 : 14}}>Pretraga</Typography>
                                                        <CustomSearchField fromSearch={filterArtikal}></CustomSearchField>
                                                </Grid>
                                                <Grid item xs={3}   >
                                                
                                                </Grid>
                                                <Grid item xs={3}   >
                                                
                                                </Grid>
                                        </Grid>
                                        <Grid sx={{height:  '60%', display:  'flex'}} >
                                        <TableContainer sx={{ maxHeight: 400 , border:  'solid 1px', mt:3, backgroundColor:  '#1e2730'}} >
                                            <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#1e2730'}}}  >
                                            <TableHead   >
                                                <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'},}}  >
                                                    <TableCell  sx={{color:  'white', width:  '20%', fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                              
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16 ,   textOverflow: 'ellipsis', overflow: 'hidden'}}>Naziv</TableCell>
                                                    <TableCell  sx={{color:  'white',  width:  '15%', fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                                        
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16}} align="right">PIB</TableCell>
                                                    <TableCell  sx={{color:  'white',  width:   '15%', fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                              
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16 ,  textOverflow: 'ellipsis', overflow: 'hidden'}}>Maticni Broj</TableCell>
                                                    <TableCell  sx={{color:  'white',  width:  '15%', fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                              
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16 ,   textOverflow: 'ellipsis', overflow: 'hidden'}}>Postanski br.</TableCell>
                                                    <TableCell  sx={{color:  'white', width:   '15%'  ,fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                              
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16 ,  textOverflow: 'ellipsis', overflow: 'hidden'}}>Mesto</TableCell>
                                                    <TableCell  sx={{color:  'white',  width:  '15%',  fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                              
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16 , width:  '40%',  textOverflow: 'ellipsis', overflow: 'hidden'}}>Email</TableCell>
                                                    <TableCell  sx={{color:  'white',  width:  '10%', fontFamily: 'Roboto',
                                                        fontStyle: 'normal',

                                                        /* or 158% */

                                                        
                                                        lineHeight:  '26px',
                                              
                                                        fontSize: () => window.devicePixelRatio == 1.5 ? 8 : 16 ,  textOverflow: 'ellipsis', overflow: 'hidden'}}>Popust</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflow: "auto", scrollBehavior: "smooth"}} >
                                                {searchValue.slice(1).map((row,i) => (
                                                <TableRow
                                                    sx={{ '& td, & th': {color:  'white',  border:  0, fontSize: 8, maxWidth: 90}, backgroundColor: () => row.code === selectedValue ? '#6cb238' : '#1e2730' }}
                                                    onClick={() => setSelectedValue(row.code)}
                                                >   
                                                <TableCell component="th" scope="row"  >
                                                    {row.productName}
                                                </TableCell>
                                                <TableCell align="right">{row.cena}</TableCell>
                                                
                                                </TableRow>

                                                ))}
                                                
                                            
                                            </TableBody>
                                            </Table>
                                        </TableContainer>        
                                        </Grid>
                                        <Grid sx={{display:  'flex', height:  '20%',  justifyContent:  'center',  mt: 5}} >
                                            <Grid xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#1e2730',  height:  '56px',  display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtOdustani}</Button>
                                            </Grid>
                                            <Divider />
                                            <Grid xs={6} >
                                                <Button fullWidth variant="contained"  onClick={() => saveSearch()}  sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtPotvrdi}</Button>
                                            </Grid>
                                        </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }