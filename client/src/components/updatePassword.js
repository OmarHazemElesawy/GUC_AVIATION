import{ React,useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { useParams,useNavigate } from 'react-router-dom';
import { Button,Stack,Box, Container } from '@mui/material';
import useStyles from './styles';
import axios from 'axios';
import "../stylesUser.js"
import {AppBar,Typography} from '@material-ui/core';
function UpdatePassword() {
    const classes =useStyles();
    const {id}:{id:string}=useParams();
    const navigate=useNavigate();
    const userProfile=JSON.parse(localStorage.getItem('profile'));
    let oldPassword;
    let confirmPassword;
    const [user,setUser]=useState({
        password:'',
         });

      const updatePassword=(ID)=>{
        axios.post(`http://localhost:5000/user/password/${ID}`,user).then(()=>{
          window.location.reload(false);
        })
      };

      const[userList, setUserList]=useState([]);

      useEffect(()=>{
        axios.get('http://localhost:5000/user').then((allUsers)=>{
          setUserList(allUsers.data);
        })
      },[])
      for (var k in userList){
        if(userList[k]['_id']===userProfile.result._id){
          oldPassword=userList[k]['pass']
        }
      }
    return (
     <div className="UpdatePassword">
        <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Update your Password</Typography>
        </AppBar>
        <h3>
          Your Old Password:
          {oldPassword}
          <br/>
        </h3>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
         <TextField id="outlined-basic" label="confirm password" variant="outlined" required fullWidth onChange={(event)=>{
        confirmPassword=event.target.value}
      }/>
    <TextField id="outlined-basic" label="Password" variant="outlined" required fullWidth value={user.password}onChange={(event)=>{
        setUser({ ...user,password:event.target.value});
      }}/>
    
      <div className="Button">
      <Stack spacing={20} size="large" direction="column" alignItems="center" alignSelf="center">
        <Button variant="contained" onClick={()=>{const confirmBox = window.confirm("Are you sure you want to update Password?")
                if(confirmBox===true){
                  if(oldPassword===confirmPassword){
                  
                  updatePassword(id);
                  navigate("/ExistingUser")
                }
                  else{
                    // window.confirm("old password is not correct ")
                    window.confirm(`${confirmPassword}`)
                  }
                }
                  }}>Update Password</Button>
          
    </Stack>
    </div>
    </Box>
    </Container>
    </div>
    );
}

export default UpdatePassword;