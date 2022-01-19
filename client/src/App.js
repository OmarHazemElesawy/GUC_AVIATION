import React from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import {Button, Stack} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import "./App.css"
function App() {
  const classes =useStyles();
  const navigate=useNavigate();
  return (

    <div className="App">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >GUC Aviation</Typography>
          </AppBar>
      </Container>
      <Container maxWidth="lg" align="center"> 
      <div className="Button">
      <Stack spacing={5} direction="column">
        <h1>
          To log in as Admin:
          </h1>
        <Button variant="contained"size="small" onClick={()=>{navigate("admin")}}>Admin page</Button>
        </Stack>
        <br/><br/><br/><br/>
        <Stack spacing={5} direction="column">
        <h1>
          To log in as Existing User/Register as new User:
          </h1>
        <Button variant="contained" size="small" onClick={()=>{navigate("auth")}}>Login / Register</Button>
        </Stack>
        <br/><br/><br/><br/>
        <Stack spacing={5} direction="column">
        <h1>
          To log in as Guest User:
          </h1>
        <Button variant="contained"size="small" onClick={()=>{navigate("guestUser")}}>Guest user page</Button>
        </Stack>
    </div>
    </Container>
    </div>
  );
}

export default App