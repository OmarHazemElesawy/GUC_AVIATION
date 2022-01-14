import {React,useState,UseState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container,AppBar } from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import {GoogleLogin} from "react-google-login"
import Icon from "./icon"
import useStyles from "./styles"
import {useDispatch} from "react-redux";
import Input from "./input"
import { useNavigate } from 'react-router-dom'
import {signin,signup} from "../../actions/auth"
const initialState={firstName:'',lastName:'',passport:'',email:'',password:'',confirmPassword:''}
const Auth = () => {
    const classes =useStyles();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [showPassword,setShowPassword]=useState(false);
    const [isSignUp,setIsSignUp]=useState(false);
    const [formData,setFormData]=useState(initialState);

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(isSignUp){
       dispatch(signup(formData,navigate));
      }else{
       dispatch(signin(formData,navigate));
      }
    };
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});

    }
    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword);
    }
    const switchMode=()=>{
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
        setShowPassword(false);
    }
    const googleSuccess=async(res)=>{
       const result=res?.profileObj;
       const token=res?.tokenId;
       try{
         dispatch({type:"AUTH",data:{result,token}})
         navigate("/existingUser")
       }catch(error){
         console.log(error)
       }
    };
     const googleFailure=()=>{
      console.log("Google Sign in was unsuccessful. Try Again Later");
    };

    return (
        <Container component="main" maxWidth="xs">
             <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >{ isSignUp ? 'Sign up' : 'Sign in' }</Typography>
          </AppBar>
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">{ isSignUp ? 'Sign up' : 'Sign in' }</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                { isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  <Input name="passport" label="Passport Number" handleChange={handleChange} type="passport" />
                </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                { isSignUp ? 'Sign Up' : 'Sign In' }
              </Button>
              <GoogleLogin
                clientId="473363598524-vmrv6dvkv05cm4u1oto8ut3u59jt0pls.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button fullWidth variant='text' onClick={switchMode}>
                    { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      );
    };
    
    export default Auth;
