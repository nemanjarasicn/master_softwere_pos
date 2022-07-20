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
    width: 300,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40'
  };

export const ModalCount = ({openProps,handleCloseprops,childToParent,parentToChild}) => {

    const [counter, setCounter] = React.useState(0);


    //increase counter
  const increase = () => {
    setCounter(count => count + 1);
  };

  //decrease counter
  const decrease = () => {
        setCounter(count => count - 1);
  };


  //reset counter 
  const reset = () =>{
    setCounter(0)
  }

  const handleSubmit = () => {
    childToParent({counter: counter, id: 1});
    handleCloseprops(parentToChild);
  }

      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                    <Grid sx={{display:  'flex', height:  '10%',  justifyContent:  'center'}} >
                    <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{display:  'flex', justifyContent:  'center', color:  'white'}}>
                        Kolicina
                    </Typography>
                    </Grid>
                    <Grid sx={{display:  'flex', height:  '60%', alignItems:  'center'}} >
                    <Grid item xs={12}  sx={{display: 'flex'}} >
                            <Grid item xs={4}     sx={{display: 'flex',  alignItems:  'center'}} >
                                <Button variant="contained"  onClick={increase}   sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px", alignItems: 'center',  flexWrap: 'wrap',}} > <KeyboardArrowUpIcon /></Button>
                            </Grid>
                            <Grid item xs={4}    sx={{display: 'flex'}}>
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-normal"
                                defaultValue="1"
                                variant="filled"
                                value={counter}
                                size="small"
                                sx={{ input: {  fontSize: 36,   color:  'white', ml: 1},  }}
                                />
                            </Grid>
                            <Grid item xs={4}   sx={{display:  'flex', alignItems:  'center' , justifyContent:  'flex-end'}}>
                                <Button variant="contained"   onClick={decrease}  sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , maxWidth: "30px", maxHeight: "30px",minWidth: "30px",minHeight: "30px", alignItems: 'center',  flexWrap: 'wrap',}} > <KeyboardArrowUpIcon /></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid sx={{display:  'flex', height:  '30%', flexDirection:  'column',  justifyContent:  'center'}} >
                        <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                            <Button variant="contained"  onClick={handleSubmit}  sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Detaljna pretraga</Button>
                        </Box>
                        <Typography id="modal-modal-title" variant="h8" component="h6"  sx={{mt:  2, display:  'flex', justifyContent:  'center',  color:  'white'}}>
                                Odustani
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }