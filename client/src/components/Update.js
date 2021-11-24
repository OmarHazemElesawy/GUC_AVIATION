import{ React,useState} from 'react';
import TextField from '@mui/material/TextField';
import { useParams,useNavigate } from 'react-router-dom';
import { Button,Stack,Box } from '@mui/material';
import useStyles from './styles';
import axios from 'axios';
import "./Update.css"
import {AppBar,Typography} from '@material-ui/core';
function Update() {
    const classes =useStyles();
    const {id}:{id:string}=useParams();
    const navigate=useNavigate();
    const [flight,setFlight]=useState({
        flightNo:'',
        departureTime:'',
        arrivalTime:'',
        ecoSeatNo:'',
        businessSeatNo:'',
        airport:'',
        terminal:''
         });

      const updateFlight=(ID)=>{
        axios.post(`http://localhost:5000/flights/${ID}`,flight).then(()=>{
          window.location.reload(false);
        })
      };
    return (
     <div className="Update">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Search Results</Typography>
        </AppBar>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField id="outlined-basic" label="Flight Number" variant="outlined" value={flight.flightNo}onChange={(event)=>{
        setFlight({ ...flight,flightNo:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Departure Time" variant="outlined" value={flight.departureTime}onChange={(event)=>{
        setFlight({ ...flight,departureTime:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Arrival Time" variant="outlined" value={flight.arrivalTime}onChange={(event)=>{
        setFlight({ ...flight,arrivalTime:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Economic Seat Number" variant="outlined"value={flight.ecoSeatNo}onChange={(event)=>{
        setFlight({ ...flight,ecoSeatNo:event.target.value})
      }}/>
            <TextField id="outlined-basic" label="Business Seat Number" variant="outlined" value={flight.businessSeatNo}onChange={(event)=>{
        setFlight({ ...flight,businessSeatNo:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Airport" variant="outlined" value={flight.airport}onChange={(event)=>{
        setFlight({ ...flight,airport:event.target.value})
      }}/>
    <TextField id="outlined-basic" label="Terminal" variant="outlined"value={flight.terminal}onChange={(event)=>{
        setFlight({ ...flight,terminal:event.target.value})
      }}/>
      <div className="Button">
      <Stack spacing={2} direction="row" alignItems="center" alignSelf="center">
        <Button variant="outlined" onClick={()=>{const confirmBox = window.confirm("Are you sure you want to update?")
                if(confirmBox===true){
                  updateFlight(id)
                  navigate("/")}}}>Update Flight</Button>
          
    </Stack>
    </div>
    </Box>
    </div>
    );
}

export default Update;