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
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40',
    display: 'flex'
  };

export const ModalStornoArtikal = ({openProps,handleCloseprops,titleTextProps}) => {

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

                <Grid item xs={6}  >
                        <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                            <Grid sx={{display:  'flex', height:  '10%',  justifyContent:  'flex-start'}} >
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
                            <Grid sx={{display:  'flex', height:  '50%', alignItems:  'center'}} >
                            <Grid item xs={12}  sx={{display: 'flex'}} >   
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-normal"
                                        
                                        value={value}
                                        onChange={handleChange}
                                        variant="filled"
                                        placeholder='unesite autorizacioni kod'
                                        size="small"
                                        sx={{ input: {  fontSize: 14,   color:  'white', ml: 2},  }}
                                        />
                                    </Grid>
                            
                            </Grid>
                            <Grid sx={{display:  'flex', height:  '25%', flexDirection:  'column',  justifyContent:  'center'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtPotvrdi}</Button>
                                </Box>

                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtOdustani}</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid xs={6}  sx={{display:  'flex', ml: 3, flexDirection:   'column',mb:5,  height:  '100%'}}  >
                        {numericKeyboard.map(obj => (
                            <Grid item xs={12}   sx={{display: 'flex' }}>
                            {obj.map((col, i) => (
                                <Grid item xs={4}       className={classes.root}>
                                        <Button variant="contained"  value={col} fullWidth  onClick={handleAddValue} sx={{width:  'auto', height:  '80%'}}>{col}</Button>
                                </Grid>
                            ))}
                          </Grid>
                           
                        ))}
                    </Grid>
            </Box>
      </Modal>
    );
  }