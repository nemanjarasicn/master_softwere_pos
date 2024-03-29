import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from  '../Images/master_logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonRacunList } from  "../Data/racuniList"
import {initialValuePopust}   from "../Data/initialValuePopust"
import {initialValueKusur}   from "../Data/initialValueKusur"
import {initialValueKupac}   from "../Data/initialValueKupac"
import {initialValueTipUplate}  from "../Data/initialValueTipUplate"
import {optionIndetifikacijaKupca}  from "../Data/optionIndetifikacijaKupca"
import { optionOpcionoPoljeKupca } from '../Data/optionOpcionoPoljeKupca';
import  secureLocalStorage  from  "react-secure-storage";
import { artiklTmp }  from '../Data/artikliTmp'
import { Users }  from '../Data/users'
import  {ModalAlertErrorConection }  from '../Components/alertErrorConection'

function Footer(props) {
  return (
    <Grid xs={12}   container  sx={{ marginLeft: 1}} alignContent={'flex-end'}   >
      <Grid xs={4} justifyContent='flex-start'>
        <Typography variant="body2" color="#ffffff"   {...props}>
          <Link color="inherit" href="https://mui.com/">
              {'petcom.rs'}
          </Link>{' '}
        </Typography>
      </Grid>
      <Grid xs={4} justifyContent='center'  sx={{display:  'flex', justifyContent: 'center'}}>
        <Typography variant="body2" color="#ffffff"  {...props}>
              {'|'}
        </Typography>
      </Grid>
      <Grid xs={4} justifyContent='flex-end'>
        <Typography variant="body2" color="#ffffff"  {...props}>
              {'011 4 405 405'}
        </Typography>
      </Grid>
    </Grid>
  );
}

const theme = createTheme();

export const LoginPage = () => {


  const [racunTmp01, setRacunTmp01] = React.useState([]);
  const [listaRacunaTmp, setListaRacunaTmp] = React.useState([]);
  const [operater, setOperater] = React.useState('');
  const [isError,  setIsError]    =   React.useState(false);
  const [openModal, setOpenModal]  =  React.useState(false);

  const dataForModal  =  {message:  'Korisnik ne postoji'};

  const handleCloseModal = ()  =>  {
  
    setOpenModal(false);
  }
  
  const navigate  = useNavigate();
  


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
    });

    const user = Users.filter(obj=>  obj.password ===  data.get('password'));
    console.log('user',  user);
    if(user.length  >   0 ) {

      const requestOptions = {
        method: 'GET',
        headers: { 'PETCOM': 'dejan' },
        
      };


        localStorage.setItem('operater', JSON.stringify(user[0].username ?  user[0].username  :  '')); 

          /*fetch('http://localhost:8087/api/v1/search//products/1234Danijela1234556966665668', requestOptions) 
            .then((response) => response.json())
            .then((data) =>  {
              console.log(data);
                localStorage.setItem('artikalList', JSON.stringify(data));
            } , (error) => {
              if (error) {
                localStorage.setItem('artikalList', JSON.stringify(racunTmp01) );
              }
            });*/

          /* localStorage.setItem('artikalList', JSON.stringify(artiklTmp) );
            console.log(artiklTmp);

          localStorage.setItem('racunTmp01', JSON.stringify(racunTmp01)); 
          localStorage.setItem('listaRacunaTmp', JSON.stringify(listaRacunaTmp));
          secureLocalStorage.setItem('test', 'test');
          localStorage.setItem('buttonRacunList', JSON.stringify(ButtonRacunList)); 
          localStorage.setItem('operater', JSON.stringify(data.get('password')));       
          localStorage.setItem('buttonRacunCount', JSON.stringify(2));   
          
          localStorage.setItem('initialValuePopust', JSON.stringify(initialValuePopust));
          localStorage.setItem('optionIndetifikacijaKupca', JSON.stringify(optionIndetifikacijaKupca));
          localStorage.setItem('optionOpcionoPoljeKupca', JSON.stringify(optionOpcionoPoljeKupca));

          localStorage.setItem('initialValueKusur', JSON.stringify(initialValueKusur));
          localStorage.setItem('initialValueKupac', JSON.stringify(initialValueKupac));
          localStorage.setItem('initialValueTipUplate', JSON.stringify(initialValueTipUplate));*/
          navigate({
            pathname: '/naplata',
            state: {
              data: data.password,
            },
          })
    } else {
      console.log('dsdssddd');
        setOpenModal(true);
    }
  };


   

        return (
        <ThemeProvider theme={theme}>
          <Grid container spacing={1} 
                sx={{ height: '100vh',  
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display:  'flex',
                      justifyContent:  'flex-end'
                      
                      }}>
            <CssBaseline />
            <ModalAlertErrorConection  openProps={openModal}   fromParent={dataForModal}  handleCloseprops={handleCloseModal}></ModalAlertErrorConection>
            <Grid  sx={{  backgroundColor: '#6cb238', marginRight: 8, display: 'flex', flexDirection:  'column'}}   >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img src={Logo} alt="Master logo" style={{maxWidth:100}}  />
                <Typography component="h1" sx={{fontSize: 50, color: '#ffffff'}}>
                  master
                </Typography>
                <Typography component="body1" color="#bedda8">
                  ERP solution
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, marginTop: 10}}> 
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    variant="standard"
                    placeholder="Unesite korisnicko ime ili kod"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{input : { color: '#ffffff'},
                      '& .MuiInput-input:before': { color: '#ffffff' },
                      '& .MuiInput-underline:before': { borderBottomColor: '#ffffff' },
                      '& .MuiInput-underline:after': { borderBottomColor: '#ffffff' },
                      '& .MuiInput-underline:hover:before': { borderBottom: 'solid 1px !important', borderBottomColor: '#ffffff !important' },
                      
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, 
                          mb: 2, 
                          color: 'white', 
                          borderColor: '#ffffff', 
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: "",
                            borderColor: '#ffffff',
                            boxShadow: 'none',
                          },
                          '&:active': {
                            
                          },
                          '&:focus': {
                            
                          },
                        }}
                  >
                    {'Prijava'}
                  </Button>
                </Box>
              </Box>
              <Footer ></Footer>  
            </Grid>
          </Grid>
        </ThemeProvider>
        );
   
}