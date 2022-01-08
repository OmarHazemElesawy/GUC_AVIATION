import {React,useEffect,useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
export default function SearchDataReturn() {

    const classes =useStyles();
    var flightData=JSON.parse(localStorage['searchRetReserved']);

    const[flightList, setFlightList]=useState([]);
    var filteredFlights=[];
    var fullFilteredFlights=[];
    var finalFilteredFlights=[];
    var flightDataFiltered=[];

      useEffect(()=>{
        axios.get('http://localhost:5000/flights').then((allFlights)=>{
          setFlightList(allFlights.data);
        }) 
      },[])
      for (var i in flightList){
        var item=flightList[i]
        filteredFlights.push({
          "date":item.date,
        })
      }
      for (var k in flightList){
        var Item=flightList[k]
        fullFilteredFlights.push({
          "_id":Item._id,
          "cabinClass":flightData['cabinClass'],
          "flightNo":Item.flightNo,
          "date":Item.date,
          "departureTime":Item.departureTime,
          "arrivalTime":Item.arrivalTime,
          "departureAirport":Item.departureAirport,
          "arrivalAirport":Item.arrivalAirport,
          "departureTerminal":Item.departureTerminal,
          "arrivalTerminal":Item.arrivalTerminal
        })
      }
      flightDataFiltered.push({
        "date":flightData.date
      })
      for (var j in filteredFlights){
        if(JSON.stringify(filteredFlights[j])===JSON.stringify(flightDataFiltered[0])){
        finalFilteredFlights.push(fullFilteredFlights[j]);
        }
      }
      const navigate=useNavigate();
    return(
        <div>
           <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Search Results</Typography>
        </AppBar>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Flight No.</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Departure Time</TableCell>
            <TableCell align="right">Arrival Time</TableCell>
            <TableCell align="right">Departure Airport</TableCell>
            <TableCell align="right">Arrival Airport</TableCell>
            <TableCell align="right">Departure Terminal</TableCell>
            <TableCell align="right">Arrival Terminal</TableCell>
            <TableCell align="center">Select</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {finalFilteredFlights.map((flight,key)=> (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{flight.flightNo}</TableCell>
              <TableCell align="right">{flight.date}</TableCell>
              <TableCell align="right">{flight.departureTime}</TableCell>
              <TableCell align="right">{flight.arrivalTime}</TableCell>
              <TableCell align="right">{flight.departureAirport}</TableCell>
              <TableCell align="right">{flight.arrivalAirport}</TableCell>
              <TableCell align="right">{flight.departureTerminal}</TableCell>
              <TableCell align="right">{flight.arrivalTerminal}</TableCell>
              <TableCell align="right">
                    <Button variant="contained"onClick={()=>{navigate(0)
              }}>select Flight</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
        </div>
    )
    }
