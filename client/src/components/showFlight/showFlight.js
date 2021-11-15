import {React,useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ShowFlight() {
  const[flightList, setFlightList]=useState([])

const deleteFlight=(id)=>{
  axios.delete(`http://localhost:5000/flights/${id}`).then(()=>{
    window.location.reload(false);
  })
}
const updateFlight=(id)=>{
  axios.post(`http://localhost:5000/flights/${id}`).then(()=>{
    window.location.reload(false);
  })
}
  useEffect(()=>{
    axios.get('http://localhost:5000/flights').then((allFlights)=>{
      setFlightList(allFlights.data);
    })
  },[])
  
  return (
      <>
      <h2>
          All Flights
      </h2>
    <TableContainer component={Paper}>
      <Table style={{width : 900}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" >Flight No.</TableCell>
            <TableCell align="right" >Departure Time</TableCell>
            <TableCell align="right" >Arrival Time</TableCell>
            <TableCell align="right" >Economic Seats No.</TableCell>
            <TableCell align="right" >Business Seats No.</TableCell>
            <TableCell align="right" >Airport</TableCell>
            <TableCell align="right" >Terminal</TableCell>
            <TableCell align="right" >Delete</TableCell>
            <TableCell align="right" >Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flightList.map((flight,key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {flight.flightNo}
              </TableCell>
              <TableCell align="right">{flight.departureTime}</TableCell>
              <TableCell align="right">{flight.arrivalTime}</TableCell>
              <TableCell align="right">{flight.ecoSeatNo}</TableCell>
              <TableCell align="right">{flight.businessSeatNo}</TableCell>
              <TableCell align="right">{flight.airport}</TableCell>
              <TableCell align="right">{flight.terminal}</TableCell>
              <TableCell align="right">
              <IconButton aria-label="delete" onClick={()=>{
                const confirmBox = window.confirm("Do you really want to delete this entry?")
                if(confirmBox===true){
                  deleteFlight(flight._id)
                }
              }}>
                <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
              <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={()=>updateFlight(flight._id)}>Select</Button>
        </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
