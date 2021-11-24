import {React,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    //update date
    const [flight,setFlight]=useState({
      flightNo:'',
      departureTime:'',
      arrivalTime:'',
      airport:'',
      terminal:''
       });
       const searchFlight=()=>{
           axios.get('http://localhost:5000/flights').then((allFlights)=>{
             setFlight(allFlights.data);
            })
          };
          const navigate=useNavigate();
  return (
      <>
      <h2>
          Search For Flights
      </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Flight Number" variant="outlined" helperText="Ex: MS731" value={flight.flightNo}onChange={(event)=>{
          setFlight({ ...flight,flightNo:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Departure Time" variant="outlined" helperText="Ex: 10:45" value={flight.departureTime}onChange={(event)=>{
          setFlight({ ...flight,departureTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Arrival Time" variant="outlined" helperText="Ex: 14:30" value={flight.arrivalTime}onChange={(event)=>{
          setFlight({ ...flight,arrivalTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Airport" variant="outlined" helperText="Ex: CAI" value={flight.airport}onChange={(event)=>{
          setFlight({ ...flight,airport:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Terminal" variant="outlined" helperText="Ex: A2" value={flight.terminal}onChange={(event)=>{
          setFlight({ ...flight,terminal:event.target.value})
        }}/>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={()=>{const confirmBox = window.confirm("redirect to another page to search?")
                if(confirmBox===true){
                  searchFlight()
                  localStorage["flight"]=JSON.stringify(flight);
                  navigate("/searchData")}}}>show results</Button>
    </Stack>
    </Box>
    </>
  );
}
