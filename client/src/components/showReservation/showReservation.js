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
//import EditIcon from '@material-ui/icons/Edit';
//import {useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';

export default function ShowReservation() {
  const[reservationList, setReservationList]=useState([]);


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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
 // const navigate=useNavigate();
  return (
      <>
      <h2>
          All Reservations
      </h2>
    <TableContainer component={Paper}>
      <Table style={{width : 900}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right" >Flight No.</StyledTableCell>
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
            <StyledTableCell align="right" >Cancel</StyledTableCell>
            {/*<StyledTableCell align="right" >Update</StyledTableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {reservationList.map((reservation,key) => (
            <StyledTableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="right">{reservation.flightNo}</StyledTableCell>
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
             <StyledTableCell align="right">
              <IconButton aria-label="cancel" onClick={()=>{
                const confirmBox = window.confirm("Do you really want to cancel this reservation?")
                if(confirmBox===true){
                  deleteFlight(reservation._id)
                }
              }}>
                <DeleteIcon />
                </IconButton>
              </StyledTableCell>{/*
              <StyledTableCell align="right">
              <IconButton aria-label="update" onClick={()=>{navigate(`update/${flight._id}`)
              }}>
                <EditIcon />
                </IconButton>
            </StyledTableCell>*/}
            </StyledTableRow>
             
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </>
  );
}
