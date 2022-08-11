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



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    backgroundColor:  '#323b40'
  };

export const ModalCount = ({openProps,handleCloseprops,childToParent,toModalCount}) => {

    const [counter, setCounter] = React.useState(1);
    

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
    setCounter(1)
  }

  const handleSubmit = () => {
    childToParent({counter: counter, id: toModalCount.id});
    reset();
    handleCloseprops();
  }


  const numericKeyboard = [
    ['7',      '8',         '9'],
    ['4',      '5',         '6'],
    ['1',      '2',         '3'],
    ['.',      '0',         '<x']
  ];






      return (
        <Modal
            open={openProps}
            onClose={handleCloseprops}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid sx={{display:  'flex', flexDirection:  'column',  height:  '100%'}} >
                    <Grid sx={{display:  'flex', height:  '8%'}} >
                          <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                  <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', color:  'white'}}>
                                          {txtCount.txtKolicina}
                                  </Typography>
                        
                          </Grid>
                          <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                  <Typography>X</Typography>
                          </Grid>
                    </Grid>
                    <Divider sx={{backgroundColor:  '#6cb238'}} />
                    <Grid sx={{display:  'flex', height:  '20%' }} >
                        <Tabs    sx={{ width:  '100%','& .MuiTabs-indicator': { backgroundColor:  '#6cb238'},   '& .Mui-selected': {color:  'white !important'}, display:  'flex',  justifyContent:   'space-around'}}
                                 variant="fullWidth"
                                 aria-label="wrapped label tabs example"
                                 value={0}
                                >
                          <Tab label="Item One"  wrapped sx={{color: 'white'}} />
                          <Tab label="Item Two"  sx={{color:   'white'}} />
                        </Tabs>
                    </Grid>
                    <Grid sx={{display: 'flex' , height:  '60%'}}  >
                      <Grid item xs={6}   sx={{display:  'flex', mt: 3,p:2, flexDirection:  'column'}}>
                          <Grid sx={{display:  'flex'}} >
                            <Grid item xs={12}  sx={{display: 'flex', mt: 3}} >
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
                            <Grid sx={{display:  'flex', mt: 10, height:  '30%', flexDirection:  'column',  justifyContent:  'center'}} >
                                  <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                      <Button  fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 12, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Detaljna pretraga</Button>
                                  </Box>
                                  <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                      <Button fullWidth variant="contained"   sx={{mt: 1  ,fontSize: 12, border:  'solid 1px white', backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                  </Box>
                            </Grid>
                      </Grid>
                      <Divider orientation="vertical"   variant="middle" flexItem />
                      <Grid item  xs={6}  sx={{mt: 3, p:2, height: '100%', display: 'flex', flexDirection: 'column'}} >

                        <Box  sx={{height:  '100%',  justifyContent:  'flex-start'}}  >
                          {numericKeyboard.map(obj => (
                              <Grid item xs={12}   sx={{display: 'flex', height: '20%'}}>
                              {obj.map((col, i) => (
                                  <Grid item xs={4}  >
                                          <Button variant="contained"   value={col} fullWidth   sx={{width:  'auto', height:  '80%', backgroundColor:  '#1e2730'}}>{col}</Button>
                                  </Grid>
                              ))}
                            </Grid>
                            
                          ))}
                         <Box  sx={{height:  '20%', mt: 3,  justifyContent:  'flex-end'}}  >
                                  <Box sx={{  display: 'flex', justifyContent:  'flex-end', flexDirection:  'column'}}  >
                                      <Button  fullWidth variant="contained"   sx={{mt: 2  ,fontSize: 12, backgroundColor:  '#6cb238', display:  'flex',  justifyContent:  'center' }}>Detaljna pretraga</Button>
                                  </Box>
                                  <Box sx={{  display: 'flex',  justifyContent:  'center'}}  >
                                      <Button fullWidth variant="contained"   sx={{mt: 1  ,fontSize: 12, border:  'solid 1px white', backgroundColor:  '#1e2730', display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                  </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                </Grid>
            </Box>
      </Modal>
    );
  }