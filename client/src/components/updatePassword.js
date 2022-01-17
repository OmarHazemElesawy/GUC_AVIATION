import{ React,useState} from 'react';
import TextField from '@mui/material/TextField';
import { useParams,useNavigate } from 'react-router-dom';
import { Button,Stack,Box } from '@mui/material';
import useStyles from './styles';
import axios from 'axios';
import "../stylesUser.js"
import {AppBar,Typography} from '@material-ui/core';
//import bcrypt from "bcrypt"
function UpdatePassword() {
    const classes =useStyles();
    const {id}:{id:string}=useParams();
    const navigate=useNavigate();
    //const user=JSON.parse(localStorage.getItem('profile'));
    //const passwordDcrypted=bcryptuser.result.password
    const [user,setUser]=useState({
        password:'',
        confirmPassword:''
         });

      const updatePassword=(ID)=>{
        axios.post(`http://localhost:5000/user/password/${ID}`,user).then(()=>{
          window.location.reload(false);
        })
      };

    return (
     <div className="UpdatePassword">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Update your Password</Typography>
          {/* <Typography className= {classes.userName} variant= "h6" align="left" >u</Typography> */}
        </AppBar>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField id="outlined-basic" label="Password" variant="outlined" required fullWidth value={user.password}onChange={(event)=>{
        setUser({ ...user,password:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Confrim Password" variant="outlined" required fullWidth value={user.confirmPassword}onChange={(event)=>{
        setUser({ ...user,confirmPassword:event.target.value})
      }}/>
      <div className="Button">
      <Stack spacing={2} direction="row" alignItems="center" alignSelf="center">
        <Button variant="outlined" onClick={()=>{const confirmBox = window.confirm("Are you sure you want to update Password?")
                if(confirmBox===true){
                  updatePassword(id);
                  navigate("/ExistingUser")}}}>Update Password</Button>
          
    </Stack>
    </div>
    </Box>
    </div>
    );
}

export default UpdatePassword;