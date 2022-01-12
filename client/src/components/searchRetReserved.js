import {React,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  
    const [flight,setFlight]=useState({
      date:'',
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
        <TextField id="outlined-basic" label="Date" variant="outlined" helperText="Ex: 2021-10-01" value={flight.date}onChange={(event)=>{
          setFlight({ ...flight,date:event.target.value})
        }}/>
        <TextField id="outlined-basic" label="Cabin Class" variant="outlined" helperText="Ex: Business/Economic" value={flight.cabinClass}onChange={(event)=>{
          setFlight({ ...flight,cabinClass:event.target.value})
        }}/>
      <Stack justifyContent="center" alignItems="center" direction="row" spacing={2}>
        <Button variant="outlined" onClick={()=>{
              if(flight['date']===""||flight['cabinClass']===""){
               const alertBox = window.alert("please enter data in the provided fields")
               if(alertBox===true){
                window.location.reload(false);
               }
           }else{
            const confirmBox = window.confirm("redirect to another page to search?")
                if(confirmBox===true){
                  searchFlight()
                  localStorage["searchRetReserved"]=JSON.stringify(flight);
                  navigate("searchDataRet")
         }} }}>show results</Button>
    </Stack>
    </Box>
    </>
  );
}
