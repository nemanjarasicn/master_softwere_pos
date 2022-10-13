import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { color } from '@mui/system';
import { Typography } from '@mui/material';
import { sendDataPrinter } from '../Funkcije/functions';



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
    


const  optionsPodkategorije = [
    {
      value: 20,
      label: 'Broj SNPDV',

    },
    {
      value: 21,
      label: 'Broj LNPDV'
    },
    {
      value: 30,
      label: 'Broj PPO-PDV'
    },
    {
      value: 31,
      label: 'Broj ZPPO-PDV'
    },
    {
      value: 32,
      label: 'Broj MPPO-PDV'
    },
    {
      value: 33,
      label: 'Broj IPPO-PDV'
    },
    {
      value: 50,
      label: 'Broj korparaciske kartice'
    },
    {
      value: 30,
      label: 'Broj pasosa (strano lice)'
    },
    {
      value: 60,
      label: 'Vremenski period'
    },
   
]


export const CustomSelectField = ({fontSize,  options, fromSelect}) => {

 

  const [optionsTmp, setOptionsTmp] = React.useState(   optionsPodkategorije );
  const [selectedItem, setSelectedItem]    = React.useState('');


  const  sendData = (item)   =>  {
    console.log(item);
    fromSelect({selected: item});
  }



  
  
  return (
  
    <FormControl sx={{ minWidth: '100%' }} >
          <Select
               
                labelId="demo-simple-select-label"
                id="demo-simple-select-label"
                label="tets"
                input={<BootstrapInput  sx={{fontSize: {fontSize}, color: 'white'}}/>}
                renderValue={(selected) => {
                  if (selected === 0) {
                    return <em>Placeholder</em>;
                  }
                  setSelectedItem(selected)
                  return selected;
                }}
                onChange={(selected) =>  sendData(selected.target) }
                inputProps={{ 'aria-label': 'Without label' }}
                >
                {optionsTmp.map(obj => (
                  <MenuItem value={obj.label}>{obj.label}</MenuItem>
                  ))}
                
              
          </Select>
    </FormControl>
   
  );

}
