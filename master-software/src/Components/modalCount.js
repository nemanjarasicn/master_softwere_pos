import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import * as txtCount from '../Data/txt';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createStyles, makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useRef,  useState, useEffect }  from 'react'




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
    width: () => window.devicePixelRatio == 1.5 ? 550 : 870 , 
    height: () => window.devicePixelRatio == 1.5 ? 400 : 792 ,
   

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p:  window.devicePixelRatio == 1.5 ?  2.5 : '40px 40px 64px',
    backgroundColor:  '#323b40'
  };


  const useStyles = makeStyles(theme =>
    createStyles({
      smallRadioButton: {
        "& svg": {
          width: 16,
          height: 16
        }
      }
    })
  );




export const ModalCount = ({openProps,handleCloseprops,childToParent,toModalCount}) => {

    const [counter, setCounter] = React.useState(1);
    const [valuePopust, setValuePopust]   = React.useState('');
    const [tipPopusta, setTipPopusta]   = React.useState('procenat');
    const [valueTab, setValueTab] =  React.useState('kolicina');
    const classes = useStyles();


    
    const ref = useRef();
    const refCounter = useRef();
    



    React.useEffect(() => {
      setCounter(1);
      setValuePopust('');
      setValueTab('kolicina');
      setTipPopusta('procenat');
    },[openProps]);

    

    //increase counter
  const increase = () => {
    let counterTmp = parseFloat(counter) + 1;
    setCounter(counterTmp);
  };

  //decrease counter
  const decrease = () => {
        let counterTmp = parseFloat(counter)  - 1;
        if(counterTmp < 0)  {
          setCounter(0);
        } else  {
          setCounter(counterTmp);
        }
  };


  //reset counter 
  const reset = () =>{
    setCounter(1)
  }

  const handleSubmit = () => {
    childToParent({counter: counter, valuePopust:  valuePopust,   id: toModalCount.id, tipPopusta:  tipPopusta});
    reset();
    handleCloseprops();
  }

  


  const handleChangeTab = (event, newValue) => {
    //reset();
    //setValuePopust('');
    setValueTab(newValue);
  }

  const  handleChangeRadioButton = (event, newButton) => {

    setTipPopusta(newButton);
  }

  const  handleChangeCounter  =   (event) => {
    setCounter(event.target.value);

    setTimeout(() => {
            refCounter.current.focus();
        }, 100);
  }



  const handleChangePopust = (event) => {
    setValuePopust(event.target.value);
    setTimeout(() => {
      ref.current.focus();
  }, 100);
}





const handleAddValue = (event) => {

  let valueTmp;
  if(valueTab === 'kolicina')   {
    valueTmp = counter + event.target.value;
    setCounter(valueTmp);
    setTimeout(() => {
      refCounter.current.focus();
  }, 100);
  } else {
    valueTmp = valuePopust + event.target.value;
    setValuePopust(valueTmp);
    setTimeout(() => {
      ref.current.focus();
  }, 100);
  }


}


  const numericKeyboard = [
    ['7',      '8',         '9'],
    ['4',      '5',         '6'],
    ['1',      '2',         '3'],
    ['.',      '0',         '<x']
  ];


  const ComponentKolicina =  () => {

    return (
      <Grid item   sx={{display: 'flex',  height:  '100%'}} >
                                      <Grid item xs={2}     sx={{display: 'flex',  alignItems:  'center'}} >
                                            <Button variant="contained"   onClick={decrease}  sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , 
                                                maxWidth: window.devicePixelRatio == 1.5 ?  30 : 48,
                                                maxHeight:  window.devicePixelRatio == 1.5 ?  30 : 48,
                                                minWidth:  window.devicePixelRatio == 1.5 ?  30 : 48,
                                                minHeight:  window.devicePixelRatio == 1.5 ?  30 : 48, alignItems: 'center',  flexWrap: 'wrap',}} > <RemoveIcon /></Button>
                                      </Grid>
                                      <Grid item xs={8}    sx={{display: 'flex', alignItems:  'center'}}>
                                          <TextField
                                              hiddenLabel
                                              id="filled-hidden-label-normal"
                                              defaultValue="1"
                                              inputProps={{min: 0, style: { textAlign: 'center' }}}
                                              variant="filled"
                                              value={counter}
                                              size="small"
                                              color="neutral"
                                              onChange={handleChangeCounter}
                                              sx={{ input: {  fontFamily: 'Roboto', 
                                                      fontStyle: 'normal',

                                                      /* or 158% */
                                                      lineHeight:  '32px', 
                                                      textAlign: 'center',
                                                      textTransform: 'uppercase',
                                                      fontSize:  window.devicePixelRatio == 1.5 ?  12 : 72,   color:  'white', ml: 1},  }}
                                              inputRef={refCounter}
                                              />
                                      </Grid>
                                      <Grid item xs={2}   sx={{display:  'flex', alignItems:  'center' , justifyContent:  'flex-end'}}>
                                          <Button variant="contained"  onClick={increase}   sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' ,
                                            maxWidth: window.devicePixelRatio == 1.5 ?  30 : 48,
                                            maxHeight:  window.devicePixelRatio == 1.5 ?  30 : 48,
                                            minWidth:  window.devicePixelRatio == 1.5 ?  30 : 48,
                                            minHeight:  window.devicePixelRatio == 1.5 ?  30 : 48, alignItems: 'center',  flexWrap: 'wrap',}} > <AddIcon /></Button>
                                  
                                      </Grid>
                              </Grid>
    )
  }


  const ComponentPopust =  () => {

    return (
      <Grid  sx={{display: 'flex', flexDirection: 'column', height:  '70%'}} >
                                      <Grid item xs={12}    sx={{display: 'flex',   alignItems:  'center'}}>
                                          <TextField
                                              fullWidth
                                              hiddenLabel
                                              id="filled-hidden-label-normal"
                                              inputProps={{min: 0, style: { textAlign: 'center' }}}
                                              defaultValue="1"
                                              onChange={handleChangePopust}
                                              variant="filled"
                                              color="neutral"
                                              placeholder='Input number'
                                              value={valuePopust}
                                              size="small"
                                              sx={{ input: {   fontFamily: 'Roboto', 
                                              fontStyle: 'normal',
          
                                              /* or 158% */
                                              lineHeight:  '38px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  12 : 30,      color:  'white', ml: 2, display:  'flex', justifyContent:  'center'},  }}
                                              inputRef={ref}
                                              />
                                      </Grid>
                                      
                                      <Grid item xs={12}  sx={{display: 'flex',    flexDirection:  'column',  width: '100%', }} >
                                        <RadioGroup
                                          aria-labelledby="demo-radio-buttons-group-label"
                                          defaultValue="procenat"
                                          name="radio-buttons-group"
                                          sx={{display:  'flex', }}
                                          onChange={handleChangeRadioButton}
                                        
                                      >
                                          
                                              <FormControlLabel  className={classes.smallRadioButton}  sx={{color:  'white', mb: 3,  }} value="procenat" control={<Radio sx={{ color: 'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography variant="body2" sx={{color:  'white', fontFamily: 'Roboto', 
                                              fontStyle: 'normal',
          
                                              /* or 158% */
                                              lineHeight:  '32px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  8 : 24}}>Procenat(%)</Typography>} />
                                              <FormControlLabel  className={classes.smallRadioButton} sx={{color:  'white',  mb: 3}} value="fiksniPopust"   control={<Radio  sx={{ color:  'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography variant="body2"  sx={{color:  'white',  fontFamily: 'Roboto', 
                                              fontStyle: 'normal',
          
                                              /* or 158% */
                                              lineHeight:  '38px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  8 : 24}}>Fiksni popust</Typography>} />
                                              <FormControlLabel   className={classes.smallRadioButton} sx={{color:  'white',}} value="fiksniIznos"   control={<Radio  sx={{color:  'white', '&.Mui-checked': {color: '#6cb238' }}} />} label={<Typography variant="body2"  sx={{color:  'white',   fontFamily: 'Roboto', 
                                              fontStyle: 'normal',
          
                                              /* or 158% */
                                              lineHeight:  '38px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  8 : 24}}>Fiksni iznos</Typography>} />
                                        </RadioGroup>
                                      </Grid>

                              </Grid>
    )
  }
  




      return (
        <ThemeProvider theme={theme}>
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-artikal"
            aria-describedby="modal-izmena kolicine i popusta"
            onBackdropClick="false"
        >
            <Box sx={style}>
                <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                    <Grid sx={{display:  'flex', height:  '8%'}} >
                          <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                  <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white'}}>
                                          {toModalCount.productName}
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
                    <Grid sx={{display:  'flex', height:  '10%',  mt:   window.devicePixelRatio == 1.5 ?  1 :  6 }} >
                        <Tabs    sx={{ width:  '100%','& .MuiTabs-indicator': { backgroundColor:  '#6cb238'},   '& .Mui-selected': {color:  'white !important'}, display:  'flex',  justifyContent:   'space-around'}}
                                 variant="fullWidth"
                                 aria-label="wrapped label tabs example"
                                 value={valueTab}
                                 onChange={handleChangeTab}
                                >
                          <Tab label="Kolicina" value="kolicina"  wrapped sx={{color: 'white', fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24}} />
                          <Tab label="Popust"   value="popust" sx={{color:   'white', fontFamily: 'Roboto', 
                                    fontStyle: 'normal',

                                    /* or 158% */
                                    lineHeight:  '32px', 
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24}} />
                        </Tabs>
                    </Grid>
                    <Grid sx={{display: 'flex' ,   height:  '82%', mt: 4}}  >
                      <Grid item xs={6}   sx={{display:  'flex',  pr: window.devicePixelRatio == 1.5 ?  2.5 :  5, height:  '100%',  flexDirection:  'column'}}>
                          
                            {valueTab === 'kolicina' ? <ComponentKolicina></ComponentKolicina>       : <ComponentPopust></ComponentPopust>}
                            <Grid item sx={{display:  'flex',   height:  '30%', flexDirection:  'column',  justifyContent:  'flex-end'}} >
                                      <Button  fullWidth variant="contained" onClick={() => handleSubmit()}  sx={{mb: 1, fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'uppercase',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,  height:  window.devicePixelRatio == 1.5 ?  '30px' : '56px',  color:  'black',  backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Potvrdi</Button>
                                      <Button fullWidth variant="contained"  onClick={handleCloseprops}  sx={{fontFamily: 'Roboto',  mt:  window.devicePixelRatio == 1.5 ?  0 :   2.5,
                                              fontStyle: 'normal',

                                              /* or 158% */
                                              lineHeight:  '32px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,  height:  window.devicePixelRatio == 1.5 ?  '30px' : '56px',  border:  'solid 1px white', backgroundColor:  'transparent', display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                  
                            </Grid>
                      </Grid>
                      <Divider orientation="vertical" sx={{backgroundColor:  '#4f5e65'}}  variant="middle" flexItem />
                      <Grid item  xs={6}  sx={{ pl:  window.devicePixelRatio == 1.5 ?  0 :   5,   height: '100%', display: 'flex', flexDirection: 'column'}} >

                     
                          <Grid sx={{height:  '100%', alignSelf:  'center',}}>
                              {numericKeyboard.map(obj => (
                                  <Grid item xs={12}   sx={{display: 'flex' }}>
                                  {obj.map((col, i) => (
                                      <Grid item xs={4}   sx={{paddingLeft:  '12px', paddingBottom:  '12px',}} >
                                              <Button variant="contained"  onClick={handleAddValue}  value={col} fullWidth   sx={{width: window.devicePixelRatio == 1.5 ?  '50px' : '104px', height:  window.devicePixelRatio == 1.5 ?  '33px' : '76px' , borderRadius:  window.devicePixelRatio == 1.5 ?   '6px' : '12px', fontFamily: 'Roboto',
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
                
                         <Box  sx={{height:  '25%', display: 'flex', flexDirection:  'column',  justifyContent:  'flex-start'}}  >
                                      <Button  fullWidth  startIcon={<HourglassTopIcon  sx={{width: 14}} />} variant="contained"   sx={{mb: 1,  fontFamily: 'Roboto', 
                                              fontStyle: 'normal',

                                              /* or 158% */
                                              lineHeight:  '32px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  8 : 24, backgroundColor:  '#4f5e65', display:  'flex',  justifyContent:  'center' }}
                                              onClick={handleCloseprops}>Vaga</Button>
                                      <Button fullWidth   startIcon={<DeleteIcon  sx={{width: 14}} />}  variant="contained"   sx={{ fontFamily: 'Roboto', 
                                              fontStyle: 'normal',

                                              /* or 158% */
                                              lineHeight:  '32px', 
                                              textAlign: 'center',
                                              textTransform: 'none',
                                              fontSize:  window.devicePixelRatio == 1.5 ?  8 : 24,  mt: 2.5,  backgroundColor:  '#4f5e65', display:  'flex',  justifyContent:  'center' }}>Storno</Button>
                                
                          </Box>
    
                      </Grid>
                    </Grid>
                </Grid>
            </Box>
      </Modal>
      </ThemeProvider>
    );
  }