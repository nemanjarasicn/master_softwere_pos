import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';



const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    color:  'white', 
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ced4da',
    fontSize: 24,
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


export const CustomSelectField = ({fontSize}) => {
  return (
    

    <FormControl sx={{mt: 1, minWidth: '100%' }} >
          <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
               
                input={<BootstrapInput />}
                >
                <MenuItem value={10}>PIB Kupca</MenuItem>
                
              
          </Select>
    </FormControl>
   
  );
}
