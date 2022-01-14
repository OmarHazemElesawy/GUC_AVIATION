import {Container , AppBar,Typography,Grow,Grid,Avatar,Button} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import {React,useState,useEffect} from 'react';
import Search from './components/searchFlightUser';
import ShowUser from "./components/showUser/showUser"
import useStyles from './stylesUser';
import Show from './components/showReservation/showReservation';
import { Outlet ,useNavigate,useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./ExistingUser.css";
function ExistingUser() {
  const classes =useStyles();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const[user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const logout=()=>{
    dispatch({type:'LOGOUT'});
    navigate("/")
    setUser(null)
  }
  useEffect(()=>{
    const token=user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);


  return (

    <div className="Admin">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <div className={classes.toolbar}>
          <Typography className= {classes.heading} variant= "h4" align="center" >Home</Typography>
          <Avatar className= {classes.purple} alt={user?.result.name} src={user?.result.imageUrl} align="left" >{user?.result.name.charAt(0)}</Avatar>
          <Typography className= {classes.userName} variant= "h6" align="left" >{user?.result.name}</Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Stack spacing={14} direction="column">
          <Button variant="contained" className={classes.logout} color="primary" align="left" onClick={logout}>Logout</Button>
          </Stack>
          </div>
        </AppBar>
      <Grow in>
        <Container>
        <Grid container justify="space-between" alignItems="stretch">
           <Grid item xs={12} sm={7}>
             <AppBar className={classes.appBar}position="static" color="inherit">
               <Show>
               </Show>
             </AppBar>
             <AppBar className={classes.appBar}position="static" color="inherit">
             <Search>
             </Search>
             </AppBar>
           </Grid>
           <Grid item xs={12} sm={4}>
           <AppBar className={classes.appBar}position="static" color="inherit">
             <ShowUser>
             </ShowUser>
             </AppBar>
           </Grid>
          </Grid>
        </Container>
      </Grow>
      </Container>
      <Outlet/>
    </div>
  );
}
export default ExistingUser
