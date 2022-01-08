import {React,useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams,useNavigate} from 'react-router-dom';
import {AppBar,Typography,Container} from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';
import {Button} from '@mui/material';
import { Stack } from '@mui/material';

function RetReserved() {
  const navigate=useNavigate();
  const classes =useStyles();
    const {id}:{id:string}=useParams();
    var filteredReservationList=[];

   const[reservationList, setReservationList]=useState([]);

     useEffect(()=>{
       axios.get(`http://localhost:5000/reservations/`).then((allReservations)=>{
        setReservationList(allReservations.data);
       })
     },[])
     for (var j in reservationList){
        if(reservationList[j]['_id']===id){
          if((reservationList[j].retSeats).length===0){
            filteredReservationList.push({
            "flightNo":reservationList[j].flightNo,
            "date":reservationList[j].date,
            "departureTime":reservationList[j].departureTime,
            "arrivalTime":reservationList[j].arrivalTime,
            "departureAirport":reservationList[j].departureAirport,
            "arrivalAirport":reservationList[j].arrivalAirport,
            "departureTerminal":reservationList[j].departureTerminal,
            "arrivalTerminal":reservationList[j].arrivalTerminal,
            "tripDuration":reservationList[j].tripDuration,
            "allowance":reservationList[j].allowance,
            "price":reservationList[j].price,
            "class":reservationList[j].class,
            "confirmationCode":reservationList[j].confirmationCode,
            "payed":reservationList[j].payed,
            "Seats":reservationList[j].depSeats
          })
        }else{
          filteredReservationList.push({
            "flightNo":reservationList[j].flightNo,
            "date":reservationList[j].date,
            "departureTime":reservationList[j].departureTime,
            "arrivalTime":reservationList[j].arrivalTime,
            "departureAirport":reservationList[j].departureAirport,
            "arrivalAirport":reservationList[j].arrivalAirport,
            "departureTerminal":reservationList[j].departureTerminal,
            "arrivalTerminal":reservationList[j].arrivalTerminal,
            "tripDuration":reservationList[j].tripDuration,
            "allowance":reservationList[j].allowance,
            "price":reservationList[j].price,
            "class":reservationList[j].class,
            "confirmationCode":reservationList[j].confirmationCode,
            "payed":reservationList[j].payed,
            "Seats":reservationList[j].retSeats
          })

        }
        }
      }
    
  return (

    <div>
         <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Your Selected Return Flight Details</Typography>
        </AppBar>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Flight No.</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Departure Time</TableCell>
          <TableCell align="center">Arrival Time</TableCell>
          <TableCell align="center">Departure Airport</TableCell>
          <TableCell align="center">Arrival Airport</TableCell>
          <TableCell align="center">Departure Terminal</TableCell>
          <TableCell align="center">Arrival Terminal</TableCell>
          <TableCell align="center">Trip duration</TableCell>
          <TableCell align="center">Baggage allowance</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Class</TableCell>
          <TableCell align="center">Confirmation Code</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Reserved Seats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredReservationList.map((reservation,key)=> (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{reservation.flightNo}</TableCell>
              <TableCell align="center">{reservation.date}</TableCell>
              <TableCell align="center">{reservation.departureTime}</TableCell>
              <TableCell align="center">{reservation.arrivalTime}</TableCell>
              <TableCell align="center">{reservation.departureAirport}</TableCell>
              <TableCell align="center">{reservation.arrivalAirport}</TableCell>
              <TableCell align="center">{reservation.departureTerminal}</TableCell>
              <TableCell align="center">{reservation.arrivalTerminal}</TableCell>
              <TableCell align="center">{reservation.tripDuration}</TableCell>
              <TableCell align="center">{reservation.allowance}</TableCell>
              <TableCell align="center">{reservation.price}</TableCell>
              <TableCell align="center">{reservation.class}</TableCell>
              <TableCell align="center">{reservation.confirmationCode}</TableCell>
             <>{reservation.payed?<TableCell align="center">{"Payed"}</TableCell>:
             <TableCell align="center">{"Not Payed"}</TableCell>}</>
              <TableCell align="center">{(reservation.Seats).toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
          <Container maxWidth="lg" align="center"> 
      <div className="Button"/>
      <h2 align="left">
        Change Selected Seats:
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Change Selected Reserved Flight:
        </h2>
        <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={()=>{navigate("retSeatsReserved")}}>Proceed</Button>
        <Button variant="contained" onClick={()=>{navigate("editRetReserved")}}>Proceed</Button>
        </Stack>
        <br/>
        <h2 align="center">
        Go back To Main Page:
        </h2>
        <Stack spacing={2} direction="row">
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={()=>{navigate("/existingUser")}}>Proceed</Button>
        </Stack>
       </Container>
      </div>
  );
}
export default RetReserved;