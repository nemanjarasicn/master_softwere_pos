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

import  '../Css/detaljnaPretraga.css'




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
    width: () => window.devicePixelRatio == 1.5 ? 800 : 1042 , 
    height: () => window.devicePixelRatio == 1.5 ? 550 : 842 ,

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40',
    display: 'flex'
  };

export const ModalDetaljnaPretraga = ({openProps,handleCloseprops,titleTextProps,fromModalDp, refresh}) => {
    

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
        console.log(dataFilter);
        let artikliList = JSON.parse(localStorage.getItem('artikalList'));
        let artikalTmp = artikliList.filter(obj => obj.id === dataFilter || obj.productName.toLowerCase().includes(dataFilter.toLowerCase()));
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




      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onBackdropClick="false"
        >
            <Box sx={style}>
                     
                <Grid item xs={12}  >
                        <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                            <Grid sx={{display:  'flex', height:  '10%', alignItems:   'flex-end', justifyContent:  'flex-start'}} >
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24 }}
                                        className='title'>
                                            Detaljna pretraga
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography  sx={{ 
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24 }}
                                        className='title'
                                        onClick={() => handleCloseprops()}>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{backgroundColor:  '#6cb238'}} />
                            <Grid sx={{display:  'flex',  width: '100%',    height:  '10%', mt: 3, alignItems:  'center'}} >
                                    <Grid item xs={6}  sx={{}} >
                                        <Typography sx={{
                                        fontSize:  window.devicePixelRatio == 1.5 ?  10 : 14 }}
                                        className='labelSearch'>Pretraga</Typography>
                                            <CustomSearchField fromSearch={filterArtikal}></CustomSearchField>
                                    </Grid>
                                    <Grid item xs={3}   sx={{mr:4}} >
                                    <Typography sx={{fontSize:  window.devicePixelRatio == 1.5 ?  10 : 14}}
                                    className='labelSearch'>Kategorija proizvoda</Typography>
                                            <CustomSelectField fontSize={16}></CustomSelectField>
                                    </Grid>
                                    <Grid item xs={3}    >
                                    <Typography sx={{fontSize:  window.devicePixelRatio == 1.5 ?  10 : 14}}
                                    className='labelSearch'>Podkategorija proizvoda</Typography>
                                            <CustomSelectField fontSize={16}></CustomSelectField>
                                    </Grid>
                            </Grid>
                            <Grid sx={{height:  '60%', display:  'flex'}} >
                            <TableContainer sx={{ maxHeight:  window.devicePixelRatio == 1.5 ?  300 : 962 }}  className='tableConteiner' >
                                <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#1e2730'}}}  >
                                  <TableHead   >
                                      <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'}}}  >
                                        <TableCell  sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell'>{txt.txtArtikal}</TableCell>
                                        <TableCell   sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell' align="right">{txt.txtCena}</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflow: "auto", scrollBehavior: "smooth"}} >
                                    {searchValue.slice(1).map((row,i) => (
                                    <TableRow
                                         sx={{ '& td, & th': {color:  'white',  border:  0, fontFamily: 'Roboto',
                                         fontStyle: 'normal',
 
                                         /* or 158% */
                                         lineHeight:  '32px', 
                                         textTransform: 'none',
                                         fontSize:  window.devicePixelRatio == 1.5 ?  8 : 14}, backgroundColor: () => row.id === selectedValue ? '#6cb238' : '#1e2730' }}
                                         onClick={() => setSelectedValue(row.id)}
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
                            <Divider sx={{color: 'red'}} />
                            <Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
                                    <Grid xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtOdustani}</Button>
                                    </Grid>
                                    <Divider />
                                    <Grid xs={6} >
                                                <Button fullWidth variant="contained"  onClick={() => saveSearch()}  sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtPotvrdi}</Button>
                                  </Grid>      
                            </Grid>
                        </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }