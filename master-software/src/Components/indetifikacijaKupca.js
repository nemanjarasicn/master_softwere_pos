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
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { withTheme } from '@emotion/react';

import  {CustomSelectField}   from  '../Components/customSelectField'
import  '../Css/indetifikacijaKupca.css'

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
    width: () => window.devicePixelRatio == 1.5 ? 500 : 853 , 
    height: () => window.devicePixelRatio == 1.5 ? 300 : 600 ,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    padding: () => window.devicePixelRatio == 1.5 ? 4 : '40px 40px 64px',
    backgroundColor:  '#323b40',
    display:  'flex',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '12px',
    gap: '40px'
  };


  const numericKeyboard = [
    ['7',      '8',         '9'],
    ['4',      '5',         '6'],
    ['1',      '2',         '3'],
    ['.',      '0',         '<x']
];

export const ModalIndetifikacijaKupca = ({openProps,handleCloseprops,fromIndetifikacijaKupca}) => {


    const [value, setValue] = React.useState('');
    const [valueRadio, setValueRadio] =  React.useState('procenat');
    const [placeholder, setPlaceholder] = React.useState('');

    if(openProps) {
        setTimeout(() => {
            ref.current.focus();
        }, 200);
     }

     React.useEffect(() => {
        setValue('');
        setValueRadio('procenat');
        setPlaceholder('PIB kupca');
      },[openProps]);

     
    const ref = useRef();

    const handleAddValue = (event) => {

        let valueTmp = value + event.target.value;
        setValue(valueTmp);


    }


    const handleChange = (event) => {
        setValue(event.target.value)
    }


    const  handleChangeRadio = (event) => {
            setValueRadio(event.target.value);
    }



    const handleSave = () => {
        let valueIndKupcaSelect =  JSON.parse(localStorage.getItem('optionIndetifikacijaKupca')).filter(obj=> obj.label === placeholder)

        console.log('ssasas',valueIndKupcaSelect)
        fromIndetifikacijaKupca({selectIndetifikacija:  valueIndKupcaSelect[0].value,  indetifikacijaValue:  value, tipSearch: 'indetifikacijaKupca'});
        handleCloseprops();
    }


    const ComponentSelectIndetifikacijaKupca =  ({fontSize}) => {

        const BootstrapInput = styled(InputBase)(({ theme }) => ({
 
            '& .MuiInputBase-input': {
              borderRadius: 8,
              color:  'white', 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ced4da',
              backgroundColor:  '#1E2730',
              padding: '10px 26px 10px 12px',
              transition: theme.transitions.create(['border-color', 'box-shadow']),
              // Use the system font instead of the default Roboto font.
              fontFamily: [
                
                'Roboto',
               
              ],
              
            },
            '& .MuiSvgIcon-root ': {
              fill: "#6cb238 !important",
              fontSize: 32
            }
          }));
      

          
        const optionsIndetifikacijaKupca = JSON.parse(localStorage.getItem('optionIndetifikacijaKupca'));

        return (
            <FormControl sx={{ minWidth: '100%' }} >
            <Select
                 displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
              
                  input={<BootstrapInput  sx={{fontSize: {fontSize}, color: 'white'}}/>}
                 
                  renderValue={
                    placeholder !== "" ? (select) => <em>{placeholder}</em> : () => <em>select value</em>     }
                  onChange={(select) =>  {setPlaceholder(select.target.value)} }
                  inputProps={{ 'aria-label': 'Without label' }}
                  >
                  {optionsIndetifikacijaKupca.map(obj => (
                    <MenuItem value={obj.label}>{obj.label}</MenuItem>
                    ))}
                  
                
            </Select>
      </FormControl>
        )
      }


      return (
        <ThemeProvider theme={theme}>
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onBackdropClick="false"
        >
            <Box sx={style}>
        
                <Grid item xs={6} >
                        <Grid id="gridConteiner"  className='gridConteiner'  >
                            <Grid id="gridConteinerTitle" className='gridConteinerTitle'   >
                                <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="titleText"  className='titleText'   sx={{fontSize:  () => window.devicePixelRatio == 1.5 ? 16 : 24 , }}>
                                            Indetifikacija kupca
                                    </Typography>
                    
                                </Grid>
                                <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                        <Typography id="closeButton"  className='titleText'  sx={{fontSize:  () => window.devicePixelRatio == 1.5 ? 16 : 24}}  onClick={handleCloseprops}>X</Typography>
                                </Grid>
                            </Grid>
                            <Divider  id='divider'  className='dividerGreen'  />
                            <Grid sx={{display:  'flex', flexDirection:  'column', mt: 2, height:  '40%', alignItems:  'center'}} >
                                <Grid xs={12}  sx={{width:  '100%', mt: 6}}>
                                <Typography sx={{color: '#6cb238',  fontSize: 16}}>Label</Typography>
                                            <ComponentSelectIndetifikacijaKupca   fontSize={24}></ComponentSelectIndetifikacijaKupca>
                                </Grid>
                                <Grid item xs={12}  sx={{display: 'flex',  mt: 5}} >    
                                    <TextField
                                        hiddenLabel
                                        fullWidth
                                        id="filled-hidden-label-normal"
                                        value={value}
                                        onChange={handleChange}
                                        placeholder={placeholder}
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
                                        inputRef={ref}
                                        />

                                </Grid>
                                
                            </Grid>
                            
                            <Grid sx={{display:  'flex', height:  '20%', mt: 13, flexDirection:  'column',  justifyContent:  'center'}} >
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button  fullWidth variant="contained"     onClick={() => handleSave()}  sx={{mt: 2  , fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            borderRadius:  '12px', 
                                            textTransform: 'uppercase',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24 , backgroundColor:  '#6cb238', color:   'black',  display:  'flex', height: '56px',  justifyContent:  'center' }}>Potvrdi</Button>
                                </Box>
                                <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                    <Button fullWidth variant="contained"   sx={{marginTop:  '20px'  , fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            borderRadius:  '12px', 
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24 , border:  'solid 1px white', height: '56px', backgroundColor:  'transparent', display:  'flex',  justifyContent:  'center' }}  onClick={handleCloseprops}>Odustani</Button>
                                </Box>
                            </Grid>
                        </Grid>
                </Grid>
                <Grid xs={6}  sx={{display:  'flex', flexDirection:   'column',  height:  '100%'}}  >
                <Divider sx={{backgroundColor:  '#4f5e65', marginBottom:  '76px'}} />
                <Grid sx={{height:  '100%', alignSelf:  'center', }}>
                        {numericKeyboard.map(obj => (
                            <Grid item xs={12}   sx={{display: 'flex' }}>
                            {obj.map((col, i) => (
                                <Grid item xs={4}   sx={{paddingLeft:  '12px', paddingBottom:  '12px',}} >
                                        <Button variant="contained"  onClick={handleAddValue}  value={col} fullWidth   sx={{width:  '104px', height:  '76px', borderRadius:  '12px', fontFamily: 'Roboto',
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px',
                                            letterSpacing:  '0.02em',
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 36,   backgroundColor:  '#1e2730'}}>{col}</Button>
                                </Grid>
                            ))}
                          </Grid>
                           
                        ))}
                    </Grid>
                <Divider sx={{backgroundColor:  '#4f5e65',  marginTop:  '42px'}} />
                </Grid>
            </Box>
      </Modal>
      </ThemeProvider>
    );
  }