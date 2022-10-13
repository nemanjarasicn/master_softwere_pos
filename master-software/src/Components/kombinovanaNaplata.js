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



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 550 : 828 , 
    height: () => window.devicePixelRatio == 1.5 ? 350 : 822 ,
   

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



export const ModalKombinovanaNaplata = ({openProps,handleCloseprops, toModalKombinovano}) => {
    
    
    const [uplataGotovina, setUplataGotovina] = React.useState(0);
    const [uplataPlatnaKartica, setUplataPlatnaKartica] = React.useState(0);
    const [uplataCek, setUplataCek] = React.useState(0);
    const [uplataVirman, setUplataVirman] = React.useState(0);
    const [kusur, setKusur] = React.useState(0);
    

    const currencyFormat = (num) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

     const naplataGotovinom = () => {
        setKusur(0);
        handleCloseprops();
     }

     const handleChangeGotovina = (event) => {
        if (event.key === 'Enter') {
 
                let tmpUplata = currencyFormat(parseFloat(event.target.value));
                setUplataGotovina(tmpUplata);
                event.target.value = tmpUplata;
                inputRefs.current[2].focus();

        }

     } 

     const handleChangePlatnaKartica = (event) => {
        if (event.key === 'Enter') {
 
                let tmpUplata = currencyFormat(parseFloat(event.target.value));
                setUplataPlatnaKartica(tmpUplata);
                event.target.value = tmpUplata;
                inputRefs.current[3].focus();

        }

     } 

     const handleChangeCek = (event) => {
        if (event.key === 'Enter') {
 
                let tmpUplata = currencyFormat(parseFloat(event.target.value));
                setUplataCek(tmpUplata);
                event.target.value = tmpUplata;
                inputRefs.current[4].focus();

        }

     } 

     const handleChangeVirman = (event) => {
        if (event.key === 'Enter') {
 
                let tmpUplata = currencyFormat(parseFloat(event.target.value));
                setUplataVirman(tmpUplata);
                event.target.value = tmpUplata;
                
                

        }

     } 

     

     const inputRefs = useRef([]); 
     
     React.useEffect(() => {
        setTimeout(() => {
            inputRefs.current[1].focus();
        }, 200);
     },[openProps])

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
                                        Kombinovana naplata
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
                                    }}} >X</Typography>
                            </Grid>
                    </Grid>
                    <Divider sx={{backgroundColor:  '#6cb238'}} />
                    <Grid  sx={{display:  'flex', height:  '80%' }} >
                            <Grid item xs={6} sx={{display:  'flex',   flexDirection:  'column'    ,mt: 3,  height:  '100%'}} >
                            
                                <Box  mt={2} >
                                    <Grid item xs={12}   sx={{display:  'flex'}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,   justifyContent:  'flex-start', color:  'white'}}>
                                                    Total racun
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
                                                       {currencyFormat(toModalKombinovano)}
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
                                                    Popust
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
                                                      {currencyFormat(0)}
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
                                                        Total za naplatu
                                                    </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '38px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  14 : 30,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                                         {currencyFormat(0)}
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                    <Divider sx={{backgroundColor:  '#4E595F', mt: 3}} />
                                    <Grid item xs={12}   sx={{display:  'flex', mt: 3}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start', alignItems:  'center'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Gotovina
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',  justifyContent:  'flex-end'}}>
                                            <TextField
                                                hiddenLabel
                                                id="filled-hidden-label-normal"
                                                placeholder='0,00'
                                                variant="filled"
                                                onKeyDown={(event) => handleChangeGotovina(event)}
                                               
                                                size="small"
                            
                                                sx={{ input: {  fontFamily: 'Roboto', 
                                                fontStyle: 'normal',
    
                                                /* or 158% */
                                                lineHeight:  '32px', 
                                                textAlign: 'end',
                                                textTransform: 'none',
                                                fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white', ml: 2},  }}
                                                autoFocus
                                                inputRef={(ref) => (inputRefs.current[1] = ref)}
                                                />
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex', mt: 2.5}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start', alignItems:  'center'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Platna kartica
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',  justifyContent:  'flex-end'}}>
                                            <TextField
                                                hiddenLabel
                                                id="filled-hidden-label-normal"
                                                placeholder='0,00'
                                                variant="filled"
                                            
                                               
                                                size="small"
                                               
                                                sx={{ input: {  fontFamily: 'Roboto', 
                                                fontStyle: 'normal',
    
                                                /* or 158% */
                                                lineHeight:  '32px', 
                                                textAlign: 'end',
                                                textTransform: 'none',
                                                fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white', ml: 2},  }}
                                                autoFocus
                                                onKeyDown={(event) => handleChangePlatnaKartica(event)}
                                                inputRef={(ref) => (inputRefs.current[2] = ref)}
                                               
                                                />
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex', mt:  2.5}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start', alignItems:  'center'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Cek
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',  justifyContent:  'flex-end'}}>
                                            <TextField
                                                hiddenLabel
                                                id="filled-hidden-label-normal"
                                                placeholder='0,00'
                                                variant="filled"
                                                onKeyDown={(event) => handleChangeCek(event)}
                                            
                                               
                                                size="small"
                                                sx={{ input: {  fontFamily: 'Roboto', 
                                                fontStyle: 'normal',
    
                                                /* or 158% */
                                                lineHeight:  '32px', 
                                                textAlign: 'end',
                                                textTransform: 'none',
                                                fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white', ml: 2},  }}
                                                autoFocus
                                                inputRef={(ref) => (inputRefs.current[3] = ref)}
                                               
                                                />
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex', mt:  2.5}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start', alignItems:  'center'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Virman
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',  justifyContent:  'flex-end'}}>
                                            <TextField
                                                hiddenLabel
                                                id="filled-hidden-label-normal"
                                                placeholder='0,00'
                                                variant="filled"
                                                onKeyDown={(event) => handleChangeVirman(event)}
                                               
                                                size="small"
                                                sx={{ input: {  fontFamily: 'Roboto', 
                                                fontStyle: 'normal',
    
                                                /* or 158% */
                                                lineHeight:  '32px', 
                                                textAlign: 'end',
                                                textTransform: 'none',
                                                fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white', ml: 2},  }}
                                                autoFocus
                                                inputRef={(ref) => (inputRefs.current[4] = ref)}
                                                
                                                />
                                            </Grid>
                                    </Grid>
                                    <Divider sx={{backgroundColor:  '#4E595F',  mt: 2.5}} />
                                    <Grid item xs={12}   sx={{display:  'flex', mt: 2}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Ostatak
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                                                    fontStyle: 'normal',

                                                                    /* or 158% */
                                                                    lineHeight:  '32px', 
                                                                    textAlign: 'center',
                                                                    textTransform: 'none',
                                                                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   justifyContent:  'flex-start', color:  'white'}}>
                                                        {currencyFormat(kusur)}
                                                    </Typography>
                                            </Grid>
                                    </Grid>


                                </Box>
                                


                            
                            </Grid>

                            <Grid item  xs={6}  sx={{ pl: 5,  mt: 6,   height: '100%', display: 'flex', flexDirection: 'column'}} >
                                    <Grid sx={{height:  '100%', alignSelf:  'center',}}>
                                        {numericKeyboard.map(obj => (
                                            <Grid item xs={12}   sx={{display: 'flex' }}>
                                            {obj.map((col, i) => (
                                                <Grid item xs={4}   sx={{paddingLeft:  '12px', paddingBottom:  '12px',}} >
                                                        <Button variant="contained"   value={col} fullWidth   sx={{width:  '104px', height:  '76px', borderRadius:  '12px', fontFamily: 'Roboto',
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
                            </Grid>
                            {/*<Grid item xs={6} sx={{display:  'flex',  ml: 2,      height:  '100%'}} >
                                    <Box>
                                        <Grid item xs={12}  sx={{display: 'flex'}}>
                                            <Grid item xs={6} >
                                                <Button   variant="contained"  sx={{ background: "#4f5e65", height: 50,  fontSize: 10, width: '90%'}}  >Instant placanje</Button>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Button   variant="contained"  sx={{ml:1, background: "#4f5e65", height: 50,  fontSize: 10, width: '90%'}}  >Cekovi</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}  sx={{display: 'flex', mt: 1}}>
                                            <Grid item xs={6} >
                                                <Button   variant="contained"  sx={{ background: "#4f5e65", height: 50,  fontSize: 10, width: '90%'}}  >Vaucer</Button>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Button   variant="contained"  sx={{ml:1, background: "#4f5e65", height: 50,  fontSize: 10, width: '90%'}}  >Prenos na racun</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}  sx={{display: 'flex',  mt:   1}}>
                                            <Grid item xs={6} >
                                                <Button   variant="contained"  sx={{ background: "#4f5e65", height: 50,  fontSize: 10, width: '90%'}}  >Kombinovano placanje</Button>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Button   variant="contained"  sx={{ml:1, background: "#4f5e65", height: 50,  fontSize: 10, width: '90%'}}  >Drugo bezgotovinsko placanje</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}  sx={{display: 'flex',  mt:   1}}>
                                                <Button variant="contained"  onClick={naplataGotovinom}  sx={{fontSize: 14,   backgroundColor:  '#6cb238',  '&.MuiButton-root': {color:  'black'}}}   fullWidth>Gotovina</Button>
                                        </Grid>
                                        <Grid item xs={12}  sx={{display: 'flex',  mt:   1}}>
                                                <Button variant="contained"   sx={{fontSize: 14, backgroundColor:  '#6cb238',  '&.MuiButton-root': {color:  'black'}}}   fullWidth>Platna kartica</Button>
                                        </Grid>
                                        <Grid item xs={12}  sx={{display: 'flex',  mt:   1}}>
                                                <Button variant="contained"   sx={{fontSize: 14, backgroundColor:  '#6cb238',  '&.MuiButton-root': {color:  'black'}}}   fullWidth>Faktura</Button>
                                        </Grid>
                                        
                                    </Box>
                            </Grid>*/}
                    </Grid>
                    <Divider sx={{backgroundColor:  '#4E595F'}} />
                    <Grid  sx={{display:  'flex', height:  '10%', mt:  5 }}  >
                                    <Grid xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth  variant="contained"   sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}   onClick={handleCloseprops}>Odustani</Button>
                                    </Grid>
                                    <Divider />
                                    <Grid xs={6} >
                                                <Button fullWidth   variant="contained"    sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Potvrdi</Button>
                                    </Grid>     
                    </Grid>
    

                </Grid>

            </Box>
      </Modal>
    );
  }