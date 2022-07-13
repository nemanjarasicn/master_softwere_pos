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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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