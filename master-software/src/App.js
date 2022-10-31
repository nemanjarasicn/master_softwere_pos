import * as React from 'react';

import  {LoginPage}    from   './Pages/loginPage'
import  {MainPayment}    from   './Pages/mainPayment'
import { Route, Routes ,  BrowserRouter as Router} from "react-router-dom";
import {initialValuePopust}   from "./Data/initialValuePopust"
import {initialValueKusur}   from "./Data/initialValueKusur"
import {initialValueKupac}   from "./Data/initialValueKupac"
import {initialValueTipUplate}  from "./Data/initialValueTipUplate"
import {optionIndetifikacijaKupca}  from "./Data/optionIndetifikacijaKupca"
import { css } from "@emotion/react";
import Box from '@mui/material/Box';

import  {ModalAlertErrorConection }  from './Components/alertErrorConection'
import CircularProgress from '@mui/material/CircularProgress';
import { optionOpcionoPoljeKupca } from './Data/optionOpcionoPoljeKupca';
import  secureLocalStorage  from  "react-secure-storage";
import { artiklTmp }  from './Data/artikliTmp'
import { ButtonRacunList } from  "./Data/racuniList"
import { display } from '@mui/system';
import { saveArtikle } from './Funkcije/functions';


function App() {


  const [racunTmp01, setRacunTmp01] = React.useState([]);
  const [listaRacunaTmp, setListaRacunaTmp] = React.useState([]);
  const [operater, setOperater] = React.useState('');
  const [loading, setLoading]  = React.useState(false);
  const [error, setError]  =  React.useState(true);


  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
    },
  };


 

localStorage.setItem('racunTmp01', JSON.stringify(racunTmp01)); 
localStorage.setItem('listaRacunaTmp', JSON.stringify(listaRacunaTmp));
secureLocalStorage.setItem('test', 'test');
localStorage.setItem('buttonRacunList', JSON.stringify(ButtonRacunList)); 
localStorage.setItem('operater', JSON.stringify(''));       
localStorage.setItem('buttonRacunCount', JSON.stringify(2));   

localStorage.setItem('initialValuePopust', JSON.stringify(initialValuePopust));
localStorage.setItem('optionIndetifikacijaKupca', JSON.stringify(optionIndetifikacijaKupca));
localStorage.setItem('optionOpcionoPoljeKupca', JSON.stringify(optionOpcionoPoljeKupca));

localStorage.setItem('initialValueKusur', JSON.stringify(initialValueKusur));
localStorage.setItem('initialValueKupac', JSON.stringify(initialValueKupac));
localStorage.setItem('initialValueTipUplate', JSON.stringify(initialValueTipUplate));

//localStorage.setItem('Cash', JSON.stringify(0));
//localStorage.setItem('WireTransfer', JSON.stringify(0));
//localStorage.setItem('MobileMoney', JSON.stringify(0));
//localStorage.setItem('Other', JSON.stringify(0));
//localStorage.setItem('Voucher', JSON.stringify(0));
//localStorage.setItem('Card', JSON.stringify(0));


const dataForModal  =  {message:  'Greska pri konekciji'};

const requestOptions = {
        method: 'GET',
        headers: { 'PETCOM': 'dejan' },
        
    };

    fetch('http://localhost:8087/api/v1/search//products/1234Danijela1234556966665668', requestOptions) 
        .then((response) => response.json())
        .then((data) =>  {
          console.log(data);
          saveArtikle(data);
           setLoading(false);

        } , (error) => {
          if (error) {
            console.log('sfsfsffss');
            setError(true);
          }
        });




  return (
    <>
    <Router>  
        <Routes >
          <Route exact path='/' element={loading ? 
                (!error  ? (<Box sx={{display: 'flex',  justifyContent:  'center', mt: '25%' }}><CircularProgress thickness={5} size={ 100}  sx={{color: '#1E6812'}} disableShrink /></Box>) : <ModalAlertErrorConection openProps={true}   fromParent={dataForModal}></ModalAlertErrorConection> ) :   <LoginPage/>} />
          <Route exact path='/naplata' element={<MainPayment/>} />
        </Routes>
    </Router>
    </>
  );
}

export default App;