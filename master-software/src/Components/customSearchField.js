import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export const CustomSearchField = () => {
  return (
    <Paper
      sx={{  display: 'flex', alignItems: 'center' , width: '90%', color:  'white',  border:  'solid 1px white',  backgroundColor:  '#1e2730' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, backgroundColor:  '#1e2730' , color:  'white', fontSize:  12}}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" sx={{ p: '3px' , color: 'white'}} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </Paper>
  );
}
