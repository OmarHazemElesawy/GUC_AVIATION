import {React,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
export default function Create() {
    //update date
    const [flight,setFlight]=useState({
      flightNo: 0,
      departureTime:0,
      arrivalTime:0,
      ecoSeatNo:0,
      businessSeatNo:0,
      airport:'',
      terminal:''
       });
    const createFlight=()=>{
        axios.post('http://localhost:5000/flights',flight);
    };
  return (
      <>
      <h2>
          Create Flight
      </h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="flightNo" variant="outlined" value={flight.flightNo}onChange={(event)=>{
          setFlight({ ...flight,flightNo:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="departureTime" variant="outlined" value={flight.departureTime}onChange={(event)=>{
          setFlight({ ...flight,departureTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="arrivalTime" variant="outlined" value={flight.arrivalTime}onChange={(event)=>{
          setFlight({ ...flight,arrivalTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="ecoSeatNo" variant="outlined"value={flight.ecoSeatNo}onChange={(event)=>{
          setFlight({ ...flight,ecoSeatNo:event.target.value})
        }}/>
              <TextField id="outlined-basic" label="businessSeatNo" variant="outlined" value={flight.businessSeatNo}onChange={(event)=>{
          setFlight({ ...flight,businessSeatNo:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="airport" variant="outlined" value={flight.airport}onChange={(event)=>{
          setFlight({ ...flight,airport:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="terminal" variant="outlined"value={flight.terminal}onChange={(event)=>{
          setFlight({ ...flight,terminal:event.target.value})
        }}/>
      <Stack spacing={2} direction="row">
      <Button variant="outlined" align="center" onClick={createFlight}>Create Flight</Button>
    </Stack>
    </Box>
    </>
  );
}
