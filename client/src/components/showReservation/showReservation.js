import {React,useEffect,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import {useNavigate } from 'react-router-dom';

export default function ShowReservation() {
  const[reservationList, setReservationList]=useState([]);

const navigate=useNavigate();
const deleteFlight=(id)=>{
  axios.delete(`http://localhost:5000/reservations/${id}`).then(()=>{
    window.location.reload(false);
  })
}

  useEffect(()=>{
    axios.get('http://localhost:5000/reservations').then((allReservations)=>{
      setReservationList(allReservations.data);
    })
  },[])
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
      <>
      <h2>
          Reservations/Itinerarys
      </h2>
    <TableContainer component={Paper}>
      <Table style={{width : 900}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right" >Flight No.</StyledTableCell>
            <StyledTableCell align="right" >Date</StyledTableCell>
            <StyledTableCell align="right" >Departure Time</StyledTableCell>
            <StyledTableCell align="right" >Arrival Time</StyledTableCell>
            <StyledTableCell align="right" >Departure Airport</StyledTableCell>
            <StyledTableCell align="right" >Arrival Airport</StyledTableCell>
            <StyledTableCell align="right" >Departure Terminal</StyledTableCell>
            <StyledTableCell align="right" >Arrival Terminal</StyledTableCell>
            <StyledTableCell align="right" >Trip Duration</StyledTableCell>
            <StyledTableCell align="right" >Baggage Allowance</StyledTableCell>
            <StyledTableCell align="right" >Price</StyledTableCell>
            <StyledTableCell align="right" >Class</StyledTableCell>
            <StyledTableCell align="right" >confirmation Code</StyledTableCell>
            <StyledTableCell align="right" >departure Seats</StyledTableCell>
            <StyledTableCell align="right" >return Seats</StyledTableCell>
            <StyledTableCell align="right" >Pay</StyledTableCell>
            <StyledTableCell align="right" >Cancel Reservation</StyledTableCell>
            <StyledTableCell align="center" >Edit Flight</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservationList.map((reservation,key) => (
            <StyledTableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="right">{reservation.flightNo}</StyledTableCell>
              <StyledTableCell align="right">{reservation.date}</StyledTableCell>
              <StyledTableCell align="right">{reservation.departureTime}</StyledTableCell>
              <StyledTableCell align="right">{reservation.arrivalTime}</StyledTableCell>
              <StyledTableCell align="right">{reservation.departureAirport}</StyledTableCell>
              <StyledTableCell align="right">{reservation.arrivalAirport}</StyledTableCell>
              <StyledTableCell align="right">{reservation.departureTerminal}</StyledTableCell>
              <StyledTableCell align="right">{reservation.arrivalTerminal}</StyledTableCell>
              <StyledTableCell align="right">{reservation.tripDuration}</StyledTableCell>
              <StyledTableCell align="right">{reservation.allowance}</StyledTableCell>
              <StyledTableCell align="right">{reservation.price}</StyledTableCell>
              <StyledTableCell align="right">{reservation.class}</StyledTableCell>
              <StyledTableCell align="right">{reservation.confirmationCode}</StyledTableCell>

              <>{!((reservation.depSeats).length===0)?<StyledTableCell align="center">{reservation.depSeats}</StyledTableCell>:
              <StyledTableCell align="center">-</StyledTableCell>}</>
              <>{!((reservation.retSeats).length===0)?<StyledTableCell align="center">{reservation.retSeats}</StyledTableCell>:
              <StyledTableCell align="center">-</StyledTableCell>}</>

              <>{key%2===1? <StyledTableCell align="right">
              <>{!(reservation.payed)?<Button variant="outlined" onClick={()=>{navigate(`payment/${reservationList[key-1]._id}/${reservationList[key]._id}/${reservation.class}`)
              }}>PAY</Button>:<Button variant="disabled">PAY</Button>}</>
              </StyledTableCell>:<StyledTableCell align="center">-</StyledTableCell>}</>

             <> {key%2===1?  <StyledTableCell align="center">
              <IconButton aria-label="cancel" onClick={()=>{
                const confirmBox = window.confirm("Do you really want to cancel this reservation?")
                if(confirmBox===true){
                  deleteFlight(reservationList[0]._id)
                  deleteFlight(reservationList[1]._id)
                }
              }}>
                <DeleteIcon />
                </IconButton>
              </StyledTableCell>:<StyledTableCell align="center">-</StyledTableCell>}</>

              <> {key%2===0?<StyledTableCell align="center">
                <Button variant="contained" onClick={()=>{navigate(`depReserved/${reservation._id}`)}}>Departure</Button>
                    </StyledTableCell>
                    :
                    <StyledTableCell align="center">
                      <Button variant="contained" onClick={()=>{navigate(`retReserved/${reservation._id}`)}}>Return</Button>
                      </StyledTableCell>}</>
            </StyledTableRow>
             
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </>
  );
}
