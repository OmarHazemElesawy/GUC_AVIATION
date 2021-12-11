import React from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import { Button,Stack} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import "./App.css"
function App() {
  const classes =useStyles();
  const navigate=useNavigate();
  return (

    <div className="App">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Home Page</Typography>
          </AppBar>
      </Container>
      <Container maxWidth="lg" align="center"> 
      <div className="Button">
      <Stack spacing={2} direction="row" alignItems="center" alignSelf="center">
        <Button variant="outlined" onClick={()=>{navigate("admin")}}>Admin page</Button>
    </Stack>
    </div>
    </Container>
    </div>
  );
}
// <Button variant="outlined" onClick={()=>{navigate("update")}}>update page</Button>
// <Button variant="outlined" onClick={()=>{navigate("searchData")}}>Search page</Button>
export default App