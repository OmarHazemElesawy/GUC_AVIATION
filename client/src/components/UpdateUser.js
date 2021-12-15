import{ React,useState} from 'react';
import TextField from '@mui/material/TextField';
import { useParams,useNavigate } from 'react-router-dom';
import { Button,Stack,Box } from '@mui/material';
import useStyles from './styles';
import axios from 'axios';
import "./UpdateUser.css"
import {AppBar,Typography} from '@material-ui/core';
function UpdateUser() {
    const classes =useStyles();
    const {id}:{id:string}=useParams();
    const navigate=useNavigate();
    const [user,setUser]=useState({
        firstName:'',
        lastName:'',
        email:'',
        passport:''
         });

      const updateUser=(ID)=>{
        axios.post(`http://localhost:5000/users/${ID}`,user).then(()=>{
          window.location.reload(false);
        })
      };
    return (
     <div className="UpdateUser">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Update your data</Typography>
        </AppBar>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField id="outlined-basic" label="First Name" variant="outlined" value={user.firstName}onChange={(event)=>{
        setUser({ ...user,firstName:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Last Name" variant="outlined" value={user.lastName}onChange={(event)=>{
        setUser({ ...user,lastName:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Email" variant="outlined" value={user.email}onChange={(event)=>{
        setUser({ ...user,email:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Passport" variant="outlined"value={user.passport}onChange={(event)=>{
        setUser({ ...user,passport:event.target.value})
      }}/>
      <div className="Button">
      <Stack spacing={2} direction="row" alignItems="center" alignSelf="center">
        <Button variant="outlined" onClick={()=>{const confirmBox = window.confirm("Are you sure you want to update?")
                if(confirmBox===true){
                  updateUser(id)
                  navigate("/ExistingUser")}}}>Update Data</Button>
          
    </Stack>
    </div>
    </Box>
    </div>
    );
}

export default UpdateUser;