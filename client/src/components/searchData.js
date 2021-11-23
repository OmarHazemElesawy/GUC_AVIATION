import {React,useEffect,useState} from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SearchData() {

    var flightData=JSON.parse(localStorage['flight']);
    const[flightList, setFlightList]=useState([]);
    var filteredFlights=[];
    var finalFilteredFlights=[];
      useEffect(()=>{
        axios.get('http://localhost:5000/flights').then((allFlights)=>{
          setFlightList(allFlights.data);
        }) 
      },[])
      for (var i in flightList){
        var item=flightList[i]
        filteredFlights.push({
          "flightNo":item.flightNo,
          "departureTime":item.departureTime,
          "arrivalTime":item.arrivalTime,
          "airport":item.airport,
          "terminal":item.terminal
        })
      }
      for (var j in filteredFlights){
        if(JSON.stringify(filteredFlights[j])===JSON.stringify(flightData)){
        finalFilteredFlights.push(filteredFlights[j])
        }
      }
    return(
        <div>
          the data from the text field:
            <br/>
            {JSON.stringify(flightData)}
            <br/>
            <br/>
            all flights:
            <br/>
            {JSON.stringify(flightList)}
             <br/>
            <br/>
            filtered flights:
            <br/>
            {JSON.stringify(filteredFlights)}
            <br/>
            <br/>
            search result:
            <br/>
            {JSON.stringify(finalFilteredFlights)}
            <br/>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Flight No.</TableCell>
            <TableCell align="right">Departure Time</TableCell>
            <TableCell align="right">Arrival Time</TableCell>
            <TableCell align="right">Airport</TableCell>
            <TableCell align="right">Terminal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalFilteredFlights.map((flight,key)=> (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{flight.flightNo}</TableCell>
              <TableCell align="right">{flight.departureTime}</TableCell>
              <TableCell align="right">{flight.arrivalTime}</TableCell>
              <TableCell align="right">{flight.airport}</TableCell>
              <TableCell align="right">{flight.terminal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
    }
