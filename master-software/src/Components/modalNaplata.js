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



export const ModalNaplata = ({openProps,handleCloseprops,toModalNaplata, openModalKomPlacanje}) => {
    
    
    const [uplataStr, setUplataStr] = React.useState();
    const [uplata, setUplata] = React.useState(0);
    const [kusur, setKusur] = React.useState(0);
    const [valueUplata, setValueUplata] = React.useState('');
    const [flag, setFlag] = React.useState(true); // flag za brisanje inputa pri prvom kucanju
    //const [selectedTipPlacanja, setSelectedtipPlacanja] = React.useState('');
    

    const currencyFormat = (num) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

     const handleChangeUplata = (event) => {
        setValueUplata(event.target.value);
        
          ref.current.focus();
      
    }

     const naplata = (selectedTipPlacanja) => {
        if(parseFloat(uplata) >= (parseFloat(toModalNaplata[0].totalPrice - parseFloat(toModalNaplata[0].totalPopust)))) {
                //fromModalNaplata({id: toModalNaplata[0].activRacun,  kusur:  kusur});
                setKusur(0);
                let tipNaplateTmp =  buttonPlacanjeList.filter(tip => tip.id   ===  selectedTipPlacanja); 
    
                handleCloseprops({activId: toModalNaplata[0].activRacun, tipNaplate: tipNaplateTmp[0].naziv, uplata:  uplata,  kusur:  kusur});
        } else {
            console.log('uplata je manja od total racuna');
        }
     }

     const handleAddValue = (event) => {

        let valueTmp;
       
            valueTmp = flag ?  event.target.value :  (valueUplata + event.target.value);
            setValueUplata(valueTmp);
        
            ref.current.focus();
            
        if(flag) {
            setFlag(false);
        }

            
      }

     const handleChange = (event) => {
        if(flag) {
            event.target.value = '';
            setTimeout(() => {
                setFlag(false)
            }, 100);
        }

        
        if (event.key === 'Enter') {
            setKusur(0);
            let kusurTmp = (parseFloat(event.target.value)  -  (parseFloat(toModalNaplata[0].totalPrice - parseFloat(toModalNaplata[0].totalPopust))));
            setKusur(kusurTmp);
            
            let tmpUplata = currencyFormat(parseFloat(event.target.value));
            setUplataStr(tmpUplata);
            setUplata(event.target.value);
            setTimeout(() => {
                event.target.value = tmpUplata;
            }, 100);

        }

     } 


     const  addKusur  = (event)  =>  {
        setKusur(0);
        let kusurTmp = (parseFloat(event.target.value)  -  (parseFloat(toModalNaplata[0].totalPrice - parseFloat(toModalNaplata[0].totalPopust))));
        setKusur(kusurTmp);

        let tmpUplata = currencyFormat(parseFloat(event.target.value));
            setUplataStr(tmpUplata);
            setUplata(event.target.value);
            setTimeout(() => {
                event.target.value = tmpUplata;
            }, 100);
     }

     const ref = useRef();
     
     React.useEffect(() => {
        setUplata('');
        setValueUplata((parseFloat(toModalNaplata[0].totalPrice) - (parseFloat(toModalNaplata[0].totalPopust))));
        setUplata((parseFloat(toModalNaplata[0].totalPrice) - (parseFloat(toModalNaplata[0].totalPopust))));
        setKusur(0);
        setFlag(true);
        //setSelectedtipPlacanja('');
      
     },[openProps])

     React.useEffect(() => {
        
        console.log(uplata);
      
     },[uplata])



     const openKomPlacanje  = (activId) =>   {
        openModalKomPlacanje({activId:    activId});
     }


     const addTipPlacanja = (idTipPlacanja)  => {
       // setSelectedtipPlacanja(idTipPlacanja);
     }
     



     const buttonPlacanjeList = [
        {
          id: 1,
          nazivLabel:  'Prenos na racun',
          naziv: 'WireTransfer'
        },
        {
          id: 2,
          nazivLabel:  'Instant placanje',
          naziv: 'MobileMoney'
        },
        {
          id: 3,
          nazivLabel:  'Vaucer',
          naziv: 'Voucher'
        },
        {
          id: 4,
          nazivLabel:  'Drugo bezgotovinsko placanje',
          naziv: 'Other'
        },
        {
          id: 5,
          nazivLabel:  'Gotovina',
          naziv: 'Cash'
        },
        {
          id: 6,
          nazivLabel:  'Platna kartica',
          naziv: 'Card'
        },
       
      ]

     const CustomButtonPlacanje = (button) => {
        return (
            <Button  fullWidth variant="contained"   sx={{ fontFamily: 'Roboto',  mt: button.button.id !==  1  ? 2.5 : 0,
                    fontStyle: 'normal',

                    /* or 158% */
                    lineHeight:  '32px', 
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,  
                    height:  '56px',  
                    color:  'white', 
                    backgroundColor:     '#55666E', 
                    display:  'flex',  
                    justifyContent:  'center',
                    '&:hover': {
                        backgroundColor: '#1E6812',
                      },}}  onClick={() =>  { addTipPlacanja(button.button.id); naplata(button.button.id)}}>{button.button.nazivLabel}</Button>
            )
     }


     
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
                                        Naplata
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
                    <Grid  sx={{display:  'flex', height:  '44%' }} >
                            <Grid item xs={6} sx={{display:  'flex',   flexDirection:  'column'    ,mt: 4,  height:  '100%'}} >
                            
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
                                                        {currencyFormat(toModalNaplata[0].totalPrice)}
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
                                                        {currencyFormat(toModalNaplata[0].totalPopust)}
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
                                                        {currencyFormat((parseFloat(toModalNaplata[0].totalPrice) - (parseFloat(toModalNaplata[0].totalPopust))))}
                                                    </Typography>
                                            </Grid>
                                    </Grid>
                                    <Divider sx={{backgroundColor:  '#4E595F', mt: 3}} />
                                    <Grid item xs={12}   sx={{display:  'flex', mt: 4}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start', alignItems:  'center'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex', fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Uplata
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} sx={{display:  'flex',  justifyContent:  'flex-end'}}>
                                            <TextField
                                                hiddenLabel
                                                id="filled-hidden-label-normal"
                                                placeholder='0,00'
                                                variant="filled"
                                                onChange={handleChangeUplata}
                                                onKeyDown={handleChange}
                                                onBlur={addKusur}
                                                value={valueUplata}
                                                size="small"
                                                sx={{ input: {  fontFamily: 'Roboto', 
                                                fontStyle: 'normal',
                        
                                                /* or 158% */
                                                lineHeight:  '32px', 
                                                textAlign: 'end',
                                                textTransform: 'none',
                                                fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white', ml: 2},  }}
                                                autoFocus
                                                inputRef={ref}
                                                />
                                            </Grid>
                                    </Grid>
                                    <Grid item xs={12}   sx={{display:  'flex', mt: 2}}>
                                            <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                                <Typography id="modal-modal-title"   sx={{display:  'flex',  fontFamily: 'Roboto', 
                                            fontStyle: 'normal',

                                            /* or 158% */
                                            lineHeight:  '32px', 
                                            textAlign: 'center',
                                            textTransform: 'none',
                                            fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,    justifyContent:  'flex-start', color:  'white'}}>
                                                    Kusur
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
                                                        <Button variant="contained"  onClick={handleAddValue}   value={col} fullWidth   sx={{width:  '104px', height:  '76px', borderRadius:  '12px', fontFamily: 'Roboto',
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
                    <Divider sx={{backgroundColor:  '#4E595F',  mt: 5}} />
                    <Grid  sx={{display:  'flex', height:  '48%',  mt:  5}}>
                        <Grid item xs={6}    sx={{display:  'flex',   flexDirection:  'column' , height: '100%'}}>
                        {buttonPlacanjeList.filter(button => button.id < 5 ).map(obj => (
                            <CustomButtonPlacanje   button={obj} ></CustomButtonPlacanje>
                        ))}
                       
                        <Button  fullWidth variant="contained"   sx={{mt:  2.5,  fontFamily: 'Roboto', 
                                fontStyle: 'normal',

                                /* or 158% */
                                lineHeight:  '32px', 
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                fontSize:  window.devicePixelRatio == 1.5 ?  12 : 20,  height:  '56px',  color:  'black',  backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}
                                onClick={() => openKomPlacanje({activId:  toModalNaplata[0].activRacun})}>Kombinovano placanje</Button>
                                  
                        </Grid>
                        <Grid item xs={6} sx={{ml: 2.5}} >
                        <Button fullWidth variant="contained"   onClick={() =>  { naplata(5)}}  sx={{fontFamily: 'Roboto', 
                                fontStyle: 'normal',

                                /* or 158% */
                                lineHeight:  '38px', 
                                textAlign: 'center',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                fontSize:  window.devicePixelRatio == 1.5 ?  16 : 30,   height:  '170px',  color:   'black',  backgroundColor:  '#64B5F6', display:  'flex',  justifyContent:  'center' }}>Gotovina</Button>
                                  
                                  <Button fullWidth variant="contained"   onClick={() =>  { naplata(6)}}   sx={{fontFamily: 'Roboto',  mt: 2.5,
                                fontStyle: 'normal',

                                /* or 158% */
                                lineHeight:  '32px',
                                fontWeight:  '700',  
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                fontSize:  window.devicePixelRatio == 1.5 ?  16 : 30,    color:  'black',   height:  '170px', backgroundColor:  '#F49E67', display:  'flex',  justifyContent:  'center' }}>Platna kartica</Button>



                        </Grid>

                    </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }