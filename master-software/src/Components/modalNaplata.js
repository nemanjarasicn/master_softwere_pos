import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40',
    display:  'flex'
  };



export const ModalNaplata = ({openProps,handleCloseprops,toModalNaplata}) => {
    
    
    const [uplataStr, setUplataStr] = React.useState();
    const [uplata, setUplata] = React.useState(0);
    const [kusur, setKusur] = React.useState(0);
    

    const currencyFormat = (num) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }

     const naplataGotovinom = () => {
        setKusur(0);
        handleCloseprops();
     }

     const handleChange = (event) => {
        if (event.key === 'Enter') {
            setKusur(0);
            let kusurTmp = (parseFloat(event.target.value)  -  parseFloat(toModalNaplata[0].totalPrice));
            setKusur(kusurTmp);
            
            let tmpUplata = currencyFormat(parseFloat(event.target.value));
            setUplataStr(tmpUplata);
            setUplata(event.target.value);
            event.target.value = tmpUplata;

        }

     } 


      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Grid item xs={6} sx={{display:  'flex',   flexDirection:  'column'    ,  marginRight: 2 ,  height:  '100%'}} >
                    
                    <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{display:  'flex',  borderBottom:  'solid 1px ',   justifyContent:  'flex-start', color:  'white'}}>
                        Naplata
                    </Typography>
                    <Box  mt={2} >
                        <Grid item xs={12}   sx={{display:  'flex'}}>
                                <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,   justifyContent:  'flex-start', color:  'white'}}>
                                        Total racun
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                        <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,   justifyContent:  'flex-start', color:  'white'}}>
                                            {currencyFormat(toModalNaplata[0].totalPrice)}
                                        </Typography>
                                </Grid>
                        </Grid>
                        <Grid item xs={12}   sx={{display:  'flex'}}>
                                <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,  mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                        Popust
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,  mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                            {currencyFormat(toModalNaplata[0].totalPopust)}
                                    </Typography>
                                </Grid>
                        </Grid>
                        <Grid item xs={12}   sx={{display:  'flex'}}>
                                <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                        <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 14,   mt: 2, justifyContent:  'flex-start', color:  'white'}}>
                                            Total za naplatu
                                        </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                        <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 14,   mt: 2,  justifyContent:  'flex-start', color:  'white'}}>
                                            {currencyFormat(toModalNaplata[0].totalPrice)}
                                        </Typography>
                                </Grid>
                        </Grid>
                        <Grid item xs={12}   sx={{display:  'flex', mt: 4}}>
                                <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start', alignItems:  'center'}}>
                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,    justifyContent:  'flex-start', color:  'white'}}>
                                        Uplata
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:  'flex',  justifyContent:  'flex-end'}}>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    placeholder='0,00'
                                    variant="filled"
                                   
                                    onKeyDown={handleChange}
                                    size="small"
                                    sx={{ input: {  fontSize: 12,   color:  'white', ml: 2},  }}
                                    />
                                </Grid>
                        </Grid>
                        <Grid item xs={12}   sx={{display:  'flex', mt: 2}}>
                                <Grid item xs={6}  sx={{display:  'flex',    justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,    justifyContent:  'flex-start', color:  'white'}}>
                                        Kusur
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{display:  'flex',    justifyContent:  'flex-end'}}>
                                        <Typography id="modal-modal-title"   sx={{display:  'flex',  fontSize: 12,   justifyContent:  'flex-start', color:  'white'}}>
                                             {currencyFormat(kusur)}
                                        </Typography>
                                </Grid>
                        </Grid>


                    </Box>
                    


                   
                </Grid>
                <Grid item xs={6} sx={{display:  'flex',  ml: 2,      height:  '100%'}} >
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
                </Grid>
            </Box>
      </Modal>
    );
  }