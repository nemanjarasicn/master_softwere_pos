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
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableBody from '@mui/material/TableBody';
import { artiklTmp }  from '../Data/artikliTmp'
import { handleTop,   handleBottomStep } from '../Funkcije/functions';

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


  const  refTablePretraga = React.useRef();

    

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
    const [filter, setFilter] = React.useState('');


    const [selectedValue, setSelectedValue] = React.useState('');
    const [kategorije, setKategorije] = React.useState('');
    const [podkategorije, setPodkategorije]   =  React.useState('');
    const classes = useStyles();


    React.useEffect(() => {
        setSearchValue(initialArtikal);
        setKategorije('');
        setPodkategorije('');
        setFilter('');
      },[openProps]);

    
      React.useEffect(() => {
        filterArtikal(filter);
      },[kategorije,podkategorije]);




    const filterArtikal = (dataFilter) => {
      console.log(dataFilter);
        //let artikliList = JSON.parse(localStorage.getItem('artikalList'));

        let artikliList = artiklTmp;

        if(dataFilter !==  '')    {
              let artikalTmp = artikliList.filter(obj => (dataFilter !==  '' ? (obj.id === dataFilter || obj.productName.toLowerCase().includes(dataFilter.toLowerCase()))  : true ) 
                && (kategorije !== '' ? (obj.groupName === kategorije)   : true ) 
                && (podkategorije !== ''  ?  (obj.productGroupRequest[1].groupName  === podkategorije)   :  true  ) 
                );
            
              setSearchValue(initialArtikal);
              setSelectedValue('');
              if(artikalTmp['length'] && dataFilter !== '') {
                  artikalTmp.map((row,i) => {
                    
                      let artikalValue = 
                          {
                              id: row.id,
                              productName: row.productName,
                              cena: '100',
                              code:  row.code

                          }
                      
                      setSearchValue(prevState => [...prevState,artikalValue]);
                  })
                
              } else {            
                  setSearchValue(initialArtikal);
              }
            } else {
              setSearchValue(initialArtikal);
            }
    }


    const saveSearch = () => {
        fromModalDp(selectedValue);
        handleCloseprops();
    }

    console.log(kategorije);
  
    
    
    const  addFilter = (dataFilter)  =>  {
      setFilter(dataFilter);
      filterArtikal(dataFilter);
    }


    const ComponentSelectKategorija =  ({fontSize}) => {

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
      

          
        const optionsKategorije = JSON.parse(localStorage.getItem('uniqueTipoviArtikla'));

        return (
            <FormControl sx={{ minWidth: '100%' }} >
            <Select
                 displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
              
                  input={<BootstrapInput  sx={{fontSize: {fontSize}, color: 'white'}}/>}
                 
                  renderValue={
                    kategorije !== "" ? (select) => <em>{kategorije}</em> : () => <em>select value</em>                  }
                  onChange={(select) =>  {setKategorije(select.target.value); setPodkategorije('')} }
                  inputProps={{ 'aria-label': 'Without label' }}
                  >
                  {optionsKategorije.map(obj => (
                    <MenuItem value={obj}>{obj}</MenuItem>
                    ))}
                  
                
            </Select>
      </FormControl>
        )
      }



      const ComponentSelectPodkategorija =  ({fontSize}) => {

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


         // let artikliList = JSON.parse(localStorage.getItem('artikalList'));

          let artikliList = artiklTmp;

          let podkategorijeTmp = artikliList.filter(obj => obj.groupName  ===  kategorije    &&   obj.parentId  !==  null);
          
          const unique = [...new Set(podkategorijeTmp.map(item => item.productGroupRequest[1].groupName))]; 
      

        console.log(unique);

        const optionsPodkategorije = kategorije  !== ''   ?  unique  : [''];

        return (
            <FormControl sx={{ minWidth: '100%' }} >
            <Select
                 displayEmpty
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  label="tets"
                  input={<BootstrapInput  sx={{fontSize: {fontSize}, color: 'white'}}/>}
                  renderValue={
                    podkategorije !== "" ? (select) => <em>{podkategorije}</em> : () => <em>select value</em>  }
                  onChange={(select) =>  {setPodkategorije(select.target.value)} }
                  inputProps={{ 'aria-label': 'Without label' }}
                  >
                  {optionsPodkategorije.map(obj => (
                    <MenuItem value={obj}>{obj}</MenuItem>
                    ))}
                  
                
            </Select>
      </FormControl>
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
                                            '&:hover':{cursor: 'pointer'},
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
                                            <CustomSearchField fromSearch={addFilter}></CustomSearchField>
                                    </Grid>
                                    <Grid item xs={3}   sx={{mr:4}} >
                                    <Typography sx={{fontSize:  window.devicePixelRatio == 1.5 ?  10 : 14}}
                                    className='labelSearch'>Kategorija proizvoda</Typography>
                                            {/*<CustomSelectField fontSize={16}  options={'kategorije'} fromSelect={addSelectItem}></CustomSelectField>*/}
                                            <ComponentSelectKategorija  fontSize={16}></ComponentSelectKategorija>
                                    </Grid>
                                    <Grid item xs={3}    >
                                    <Typography sx={{fontSize:  window.devicePixelRatio == 1.5 ?  10 : 14}}
                                    className='labelSearch'>Podkategorija proizvoda</Typography>
                                            {/*<CustomSelectField fontSize={16} options={'podKategorije'} ></CustomSelectField>*/}
                                            <ComponentSelectPodkategorija   fotSize={16}></ComponentSelectPodkategorija>
                                    </Grid>
                            </Grid>
                            <Grid sx={{height:  '60%', display:  'flex'}} >
                            <TableContainer sx={{ height:  window.devicePixelRatio == 1.5 ?  300 : 450 }}  className='tableConteiner'  ref={refTablePretraga} >
                                <Table  stickyHeader    sx={{'& .MuiTableCell-stickyHeader': {backgroundColor: '#1e2730'}}}  >
                                  <TableHead   >
                                      <TableRow  sx={{'& .MuiTableCell-head': {borderColor:  '#6cb238'}}}  >
                                        <TableCell  sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell'>{txt.txtArtikal}</TableCell>
                                        <TableCell   sx={{fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16}}  className='tableCell' align="right">{txt.txtCena}</TableCell>
                                      </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: "scroll" }} >
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
                            <Grid item xs={12}  sx = {{ display:  'flex',    justifyContent:  'flex-end', alignItems: 'center'}}  >
                                      <Button variant="contained"    sx={{display: 'flex', backgroundColor:   '#4f5e65',  alignContent:    'center' , 
                                              maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                              maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32, alignItems: 'center',  flexWrap: 'wrap',}}     onClick={() => handleTop(2,  refTablePretraga, '')}  > <KeyboardArrowUpIcon  sx={{fontSize: 20}}/></Button>
                                      <Button variant="contained"   sx={{   marginLeft:   window.devicePixelRatio == 1.5 ? '16px' : '24px', display: 'flex',    backgroundColor:   '#4f5e65'  ,  alignContent:    'center',   
                                              maxWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32 ,
                                              maxHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minWidth: () => window.devicePixelRatio == 1.5 ? 20 : 32,
                                              minHeight: () => window.devicePixelRatio == 1.5 ? 20 : 32,  alignItems: 'center',  flexWrap: 'wrap', }}   onClick={() => handleBottomStep(2,  refTablePretraga, '')}  ><KeyboardArrowDownIcon  sx={{ fontSize:  20}} /></Button>
                                </Grid> 
                            <Divider sx={{color: 'red'}} />
                            <Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
                                    <Grid xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"     onClick={() => handleCloseprops()} sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>{txtStornoArtikla.txtOdustani}</Button>
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