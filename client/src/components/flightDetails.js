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
import moment from 'moment';
import {Button} from '@mui/material';

function FlightDetails() {
  const navigate=useNavigate();
    moment().format();
    const classes =useStyles();
    const {id}:{id:string}=useParams();
    const {cabinClass}:{cabinClass:string}=useParams();
    let start;
    let end;
    var differenceMs;
    var difference;
    let allowance="";
    let price="";
    if (cabinClass==="Business"){
        allowance="Two 23 kg bags"
        price="2000 Euros"
    }else{
        allowance="One 23 kg bags"
        price="1000 Euros"
    }

    var filteredFlightList=[];
   const[flightList, setFlightList]=useState([]);

     useEffect(()=>{
       axios.get(`http://localhost:5000/flights/`).then((allFlights)=>{
         setFlightList(allFlights.data);
       })
     },[])

     for (var j in flightList){
        if(flightList[j]['_id']===id){
         start=moment.duration(flightList[j]['departureTime'],"HH:mm");
          end=moment.duration(flightList[j]['arrivalTime'],"HH:mm");
          differenceMs=end.subtract(start);
          difference=differenceMs.asHours()+" Hours"
          filteredFlightList.push({
            "flightNo":flightList[j].flightNo,
            "date":flightList[j].date,
            "departureTime":flightList[j].departureTime,
            "arrivalTime":flightList[j].arrivalTime,
            "departureAirport":flightList[j].departureAirport,
            "arrivalAirport":flightList[j].arrivalAirport,
            "departureTerminal":flightList[j].departureTerminal,
            "arrivalTerminal":flightList[j].arrivalTerminal,
            "tripDuration":difference
          })
        }
      }
      localStorage["flight"]=JSON.stringify(filteredFlightList);
  return (

    <div>
         <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Your Selected Flight details</Typography>
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
          <TableCell align="right">Trip duration</TableCell>
          <TableCell align="right">Baggage allowance</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredFlightList.map((flight,key)=> (
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
              <TableCell align="right">{difference}</TableCell>
              <TableCell align="right">{allowance}</TableCell>
              <TableCell align="right">{price}</TableCell>
              <TableCell align="right">{cabinClass}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
          <Container maxWidth="lg" align="center"> 
      <div className="Button"/>
        <h2>
          To see all available return flights please click below:
          </h2>
        <Button variant="contained" onClick={()=>{navigate("returnFlights")}}>Proceed</Button>
        <br/>
       </Container>
      </div>
  );
}
export default FlightDetails;