import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export const CustomSearchField = ({fromSearch}) => {


    const[searchNaziv, setSearchNaziv] = React.useState('');
  
    const handleSave = (event) => {
        if (event.key === 'Enter') {
        fromSearch(event.target.value) 
        }
    }

    const handleSaveBlur = (event) => {
     
      fromSearch(event.target.value) 
      
  }

  return (
    <Paper
      sx={{  display: 'flex', alignItems: 'center' , width: '90%', color:  'white',   height: '42px', border:  'solid 1px white',  backgroundColor:  '#1e2730' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, backgroundColor:  '#1e2730' , color:  'white', fontFamily: 'Roboto',
        fontStyle: 'normal',

        /* or 158% */

        
        lineHeight:  '26px',
        
        fontSize: () => window.devicePixelRatio == 1.5 ? 12 : 16}}
        placeholder="Unesite naziv ili sifru proizvoda"
        onKeyDown={event=>{                                 //adding the onChange event
            handleSave(event)
          }}
        onBlur={event  => {
          handleSaveBlur(event)
        }}
      />
      <IconButton type="submit"    sx={{ p: '3px' , color: 'white'}} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
  );
}
