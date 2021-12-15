import {React,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  
    const [flight,setFlight]=useState({
      passengerChild:'',
      passengerAdult:'',
      departureTime:'',
      arrivalTime:'',
      departureAirport:'',
      arrivalAirport:'',
      departureTerminal:'',
      arrivalTerminal:'',
      cabinClass:''
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
      <TextField id="outlined-basic" label="Number of Children" variant="outlined" helperText="Ex: 3" value={flight.passengerChild}onChange={(event)=>{
          setFlight({ ...flight,passengerChild:event.target.value})
        }}/>
         <TextField id="outlined-basic" label="Number of Adults" variant="outlined" helperText="Ex: 2" value={flight.passengerAdult}onChange={(event)=>{
          setFlight({ ...flight,passengerAdult:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Departure Time" variant="outlined" helperText="Ex: 10:45" value={flight.departureTime}onChange={(event)=>{
          setFlight({ ...flight,departureTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Arrival Time" variant="outlined" helperText="Ex: 14:30" value={flight.arrivalTime}onChange={(event)=>{
          setFlight({ ...flight,arrivalTime:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="departure Airport" variant="outlined" helperText="Ex: CAI" value={flight.departureAirport}onChange={(event)=>{
          setFlight({ ...flight,departureAirport:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="arrival Airport" variant="outlined" helperText="Ex: A2" value={flight.arrivalAirport}onChange={(event)=>{
          setFlight({ ...flight,arrivalAirport:event.target.value})
        }}/>
         <TextField id="outlined-basic" label="Departure Terminal" variant="outlined" helperText="Ex: CAI" value={flight.departureTerminal}onChange={(event)=>{
          setFlight({ ...flight,departureTerminal:event.target.value})
        }}/>
      <TextField id="outlined-basic" label="Arrival Terminal" variant="outlined" helperText="Ex: A2" value={flight.arrivalTerminal}onChange={(event)=>{
          setFlight({ ...flight,arrivalTerminal:event.target.value})
        }}/>
        <TextField id="outlined-basic" label="Cabin Class" variant="outlined" helperText="Ex:Business/Economic" value={flight.cabinClass}onChange={(event)=>{
          setFlight({ ...flight,cabinClass:event.target.value})
        }}/>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={()=>{
              if(flight['flightNo']===""||flight['departureTime']===""||flight['arrivalTime']===""||
              flight['departureAirport']===""||flight['arrivalAirport']===""||flight['departureTerminal']===""||
              flight['arrivalTerminal']===""){
               const alertBox = window.alert("please enter data in the provided fields")
               if(alertBox===true){
                navigate("/existingUser")
               }
           }else{
            const confirmBox = window.confirm("redirect to another page to search?")
                if(confirmBox===true){
                  searchFlight()
                  localStorage["flight"]=JSON.stringify(flight);
                  navigate("/searchDataUser")}
         } }}>show results</Button>
    </Stack>
    </Box>
    </>
  );
}
