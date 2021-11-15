import {React,useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

// function createData(name, flightNo,departureTime,arrivalTime,ecoSeatNo,businessSeatNo,airport,terminal) {
//   return { name, flightNo,departureTime,arrivalTime,ecoSeatNo,businessSeatNo,airport,terminal};
// }

// const rows = [
//   createData('EgyptAir',731,"10:25","12:15",120,40,'CAI','E3'),
//   createData('Lufthansa',731,"9:15","13:45",130,35,'LAX','T2'),
//   createData('RaynAir',5364,"12:55","14:35",140,45,'SXF','7'),
//   createData('Emirates',721,"11:45","13:15",145,40,'FRA','A1'),
//   createData('Egyptair',711,"10:45","11:25",130,50,'MUC','F3'),
// ];


export default function ShowFlight() {
  const[flightList, setFlightList]=useState([])

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
      <Table style={{width : 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" >FlightNo</TableCell>
            <TableCell align="right" >DepartureTime</TableCell>
            <TableCell align="right" >ArrivalTime</TableCell>
            <TableCell align="right" >EcoSeatNo</TableCell>
            <TableCell align="right" >BusinessSeatNo</TableCell>
            <TableCell align="right" >Airport</TableCell>
            <TableCell align="right" >Terminal</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
