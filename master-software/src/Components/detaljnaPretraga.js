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
    width: 800,
    height: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40',
    display: 'flex'
  };

export const ModalDetaljnaPretraga = ({openProps,handleCloseprops,titleTextProps}) => {

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
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', color:  'white'}}>
                                            STORNO RACUNA
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{backgroundColor:  '#6cb238'}} />
                            <Grid sx={{display:  'flex',  width: '100%',    height:  '10%', mt: 3, alignItems:  'center'}} >
                                    <Grid item xs={6}  >
                                        <Typography sx={{color: '#6cb238', fontSize: 10}}>Pretraga</Typography>
                                            <CustomSearchField></CustomSearchField>
                                    </Grid>
                                    <Grid item xs={3}   >
                                    <Typography sx={{color: '#6cb238',  fontSize: 10}}>Kategorija proizvoda</Typography>
                                            <CustomSelectField></CustomSelectField>
                                    </Grid>
                                    <Grid item xs={3}   >
                                    <Typography sx={{color: '#6cb238',   fontSize: 10}}>Podkategorija proizvoda</Typography>
                                            <CustomSelectField></CustomSelectField>
                                    </Grid>
                            </Grid>
                            <Grid sx={{height:  '60%', display:  'flex'}} >
                            <TableContainer sx={{ maxHeight: 300 , border:  'solid 1px', mt:3, backgroundColor:  '#1e2730'}} >
                                <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#1e2730'}}}  >
                                  <TableHead   >
                                      <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'}}}  >
                                        <TableCell  sx={{color:  'white', width:  '40%',  textOverflow: 'ellipsis', overflow: 'hidden'}}>{txt.txtArtikal}</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">{txt.txtKolicina}</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">{txt.txtCena}</TableCell>
                                        <TableCell  sx={{color:  'white'}} align="right">{txt.txtUkupno}</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflow: "auto", scrollBehavior: "smooth"}} >
                                    <TableRow
                                         sx={{ '& td, & th': {color:  'white',  border:  0,  backgroundColor: '#1e2730', fontSize: 8, maxWidth: 90} }}
                                    >
                                      <TableCell component="th" scope="row"  >
                                        
                                      </TableCell>
                                      <TableCell align="right"   ></TableCell>
                                      <TableCell align="right"  ></TableCell>
                                      <TableCell align="right"></TableCell>
                                      
                                    </TableRow>
                                    
                                  
                                </TableBody>
                                </Table>
                              </TableContainer>        
                            </Grid>
                            <Grid sx={{display:  'flex', height:  '20%', flexDirection:  'column',  justifyContent:  'center'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtPotvrdi}</Button>
                                </Box>
                                <Divider />
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtOdustani}</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }