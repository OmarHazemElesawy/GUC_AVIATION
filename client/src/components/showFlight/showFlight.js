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
import EditIcon from '@material-ui/icons/Edit';
import {useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';

export default function ShowFlight() {
  const[flightList, setFlightList]=useState([]);

const deleteFlight=(id)=>{
  axios.delete(`http://localhost:5000/flights/${id}`).then(()=>{
    window.location.reload(false);
  })
}

  useEffect(()=>{
    axios.get('http://localhost:5000/flights').then((allFlights)=>{
      setFlightList(allFlights.data);
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
  
  const navigate=useNavigate();
  return (
      <>
      <h2>
          All Flights
      </h2>
    <TableContainer component={Paper}>
      <Table style={{width : 900}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right" >Flight No.</StyledTableCell>
            <StyledTableCell align="right" >Departure Time</StyledTableCell>
            <StyledTableCell align="right" >Arrival Time</StyledTableCell>
            <StyledTableCell align="right" >Economic Seats No.</StyledTableCell>
            <StyledTableCell align="right" >Business Seats No.</StyledTableCell>
            <StyledTableCell align="right" >Departure Airport</StyledTableCell>
            <StyledTableCell align="right" >Arrival Airport</StyledTableCell>
            <StyledTableCell align="right" >Departure Terminal</StyledTableCell>
            <StyledTableCell align="right" >Arrival Terminal</StyledTableCell>
            <StyledTableCell align="right" >Delete</StyledTableCell>
            <StyledTableCell align="right" >Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flightList.map((flight,key) => (
            <StyledTableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {flight.flightNo}
              </StyledTableCell>
              <StyledTableCell align="right">{flight.departureTime}</StyledTableCell>
              <StyledTableCell align="right">{flight.arrivalTime}</StyledTableCell>
              <StyledTableCell align="right">{flight.ecoSeatNo}</StyledTableCell>
              <StyledTableCell align="right">{flight.businessSeatNo}</StyledTableCell>
              <StyledTableCell align="right">{flight.departureAirport}</StyledTableCell>
              <StyledTableCell align="right">{flight.arrivalAirport}</StyledTableCell>
              <StyledTableCell align="right">{flight.departureTerminal}</StyledTableCell>
              <StyledTableCell align="right">{flight.arrivalTerminal}</StyledTableCell>
              <StyledTableCell align="right">
              <IconButton aria-label="delete" onClick={()=>{
                const confirmBox = window.confirm("Do you really want to delete this entry?")
                if(confirmBox===true){
                  deleteFlight(flight._id)
                }
              }}>
                <DeleteIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="right">
              <IconButton aria-label="update" onClick={()=>{navigate(`update/${flight._id}`)
              }}>
                <EditIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
             
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </>
  );
}
