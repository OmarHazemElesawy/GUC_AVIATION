import {React,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Create() {

    const [flight,setFlight]=useState({
      flightNo:'',
      date:'',
      departureTime:'',
      arrivalTime:'',
      ecoSeatNo:'',
      businessSeatNo:'',
      departureAirport:'',
      arrivalAirport:'',
      departureTerminal:'',
      arrivalTerminal:''
       });
    const createFlight=()=>{
        axios.post('http://localhost:5000/flights',flight).then(()=>{
          window.location.reload(false);
        })
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
      <TextField id="outlined-basic" label="Flight Number" variant="outlined" helperText="Ex:MS731" value={flight.flightNo}onChange={(event)=>{
          setFlight({ ...flight,flightNo:event.target.value});
        }}/>
         <TextField id="outlined-basic" label="Date" variant="outlined" helperText="2020-01-01" value={flight.date}onChange={(event)=>{
          setFlight({ ...flight,date:event.target.value});
        }}/>
      <TextField id="outlined-basic" label="Departure Time" variant="outlined" helperText="Ex:10:45" value={flight.departureTime}onChange={(event)=>{
          setFlight({ ...flight,departureTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Arrival Time" variant="outlined" helperText="Ex:14:30" value={flight.arrivalTime}onChange={(event)=>{
          setFlight({ ...flight,arrivalTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Economic Seat Number" variant="outlined" helperText="Ex:175" value={flight.ecoSeatNo}onChange={(event)=>{
          setFlight({ ...flight,ecoSeatNo:event.target.value});
        }}/>
               <TextField id="outlined-basic" label="Business Seat Number" variant="outlined" helperText="Ex:175" value={flight.businessSeatNo}onChange={(event)=>{
         setFlight({ ...flight,businessSeatNo:event.target.value});
        }}/>
        <TextField id="outlined-basic" label=" Departure Airport" variant="outlined" helperText="Ex:SXF" value={flight.departureAirport}onChange={(event)=>{
          setFlight({ ...flight,departureAirport:event.target.value})
        }}/>
      <TextField id="outlined-basic" label=" Arrival Airport" variant="outlined" helperText="Ex:SXF" value={flight.arrivalAirport}onChange={(event)=>{
          setFlight({ ...flight,arrivalAirport:event.target.value})
        }}/>
        <TextField id="outlined-basic" label="Departure Terminal" variant="outlined" helperText="Ex:F4" value={flight.departureTerminal}onChange={(event)=>{
          setFlight({ ...flight,departureTerminal:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Arrival Terminal" variant="outlined" helperText="Ex:F4" value={flight.arrivalTerminal}onChange={(event)=>{
          setFlight({ ...flight,arrivalTerminal:event.target.value})
        }}/>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={createFlight}>Create Flight</Button>
    </Stack>
    </Box>
    </>
  );
}
