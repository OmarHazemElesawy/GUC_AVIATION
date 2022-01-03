import {React,useEffect,useState} from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import {Button} from '@mui/material';
import {useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';

function Itinerary() {

  moment().format();
  const classes =useStyles();
  const navigate=useNavigate();
  const {id1}:{id1:string}=useParams();
  const {id2}:{id2:string}=useParams();
  const {cabinClass}:{cabinClass:string}=useParams();
  var flightListSum1=JSON.parse(localStorage['filteredFlightList1']);
  var flightListSum2=JSON.parse(localStorage['filteredFlightList2']);
 // var depData=JSON.parse(localStorage['selectedDepSeats']);
// var retData=JSON.parse(localStorage['selectedRetSeats']);
  let start;
  let end;
  var selectedDepSeats=JSON.parse(localStorage['selectedDepSeats']);
  let selectedDepSeatsString=(JSON.stringify(selectedDepSeats)).substring(1,JSON.stringify(selectedDepSeats).length-1)
  var selectedRetSeats=JSON.parse(localStorage['selectedRetSeats']);
  let selectedRetSeatsString=(JSON.stringify(selectedRetSeats)).substring(1,JSON.stringify(selectedRetSeats).length-1)
  let difference=[];
  let differenceMs;
  let allowance="";
  let price="";
  let price2="";
  let reserve1=false

  if (cabinClass==="Business"){
      allowance="Two 23 kg bags"
      price="2000 Euros"
      price2="4000 Euros"
  }else{
      allowance="One 23 kg bags"
      price="1000 Euros"
      price2="2000 Euros"
  }

  var filteredFlightList1=[];
  var filteredFlightList2=[];
  var filteredFlightListSum1=[];
  var filteredFlightListSum2=[];
 const[flightList, setFlightList]=useState([]);

   useEffect(()=>{
     axios.get(`http://localhost:5000/flights/`).then((allFlights)=>{
       setFlightList(allFlights.data);
     })
   },[])
  
   for (var j in flightList){
      if(flightList[j]['_id']===id1){
        start=moment.duration(flightList[j]['departureTime'],"HH:mm");
        end=moment.duration(flightList[j]['arrivalTime'],"HH:mm");
        differenceMs=end.subtract(start);
        difference.push(differenceMs.asHours()+" Hours");
        filteredFlightList1.push({
          "flightNo":flightList[j].flightNo,
          "date":flightList[j].date,
          "departureTime":flightList[j].departureTime,
          "arrivalTime":flightList[j].arrivalTime,
          "departureAirport":flightList[j].departureAirport,
          "arrivalAirport":flightList[j].arrivalAirport,
          "departureTerminal":flightList[j].departureTerminal,
          "arrivalTerminal":flightList[j].arrivalTerminal,
          "tripDuration":difference[0]
        })
      }
   }
    for (var k in flightList){
        if(flightList[k]['_id']===id2){
          start=moment.duration(flightList[k]['departureTime'],"HH:mm");
          end=moment.duration(flightList[k]['arrivalTime'],"HH:mm");
          differenceMs=end.subtract(start);
          difference.push(differenceMs.asHours()+" Hours");
          filteredFlightList2.push({
            "flightNo":flightList[k].flightNo,
            "date":flightList[k].date,
            "departureTime":flightList[k].departureTime,
            "arrivalTime":flightList[k].arrivalTime,
            "departureAirport":flightList[k].departureAirport,
            "arrivalAirport":flightList[k].arrivalAirport,
            "departureTerminal":flightList[k].departureTerminal,
            "arrivalTerminal":flightList[k].arrivalTerminal,
            "tripDuration":difference[1]
          })
        }
      }
      for (var a in flightListSum1){
        filteredFlightListSum1.push({
          "flightNo":flightListSum1[a].flightNo,
          "date":flightListSum1[a].date,
          "departureTime":flightListSum1[a].departureTime,
          "arrivalTime":flightListSum1[a].arrivalTime,
          "departureAirport":flightListSum1[a].departureAirport,
          "arrivalAirport":flightListSum1[a].arrivalAirport,
          "departureTerminal":flightListSum1[a].departureTerminal,
          "arrivalTerminal":flightListSum1[a].arrivalTerminal,
          "tripDuration":flightListSum1[a].tripDuration,
          "allowance":flightListSum1[a].allowance,
          "price":flightListSum1[a].price,
          "class":flightListSum1[a].class,
          "confirmationCode":flightListSum1[a].confirmationCode,
          "payed":flightListSum1[a].payed,
          'depSeats':selectedDepSeatsString
      })
    }
      for (var b in flightListSum2){
        filteredFlightListSum2.push({
          "flightNo":flightListSum2[b].flightNo,
          "date":flightListSum2[b].date,
          "departureTime":flightListSum2[b].departureTime,
          "arrivalTime":flightListSum2[b].arrivalTime,
          "departureAirport":flightListSum2[b].departureAirport,
          "arrivalAirport":flightListSum2[b].arrivalAirport,
          "departureTerminal":flightListSum2[b].departureTerminal,
          "arrivalTerminal":flightListSum2[b].arrivalTerminal,
          "tripDuration":flightListSum2[b].tripDuration,
          "allowance":flightListSum2[b].allowance,
          "price":flightListSum2[b].price,
          "class":flightListSum2[b].class,
          "confirmationCode":flightListSum2[b].confirmationCode,
          "payed":flightListSum2[b].payed,
          'retSeats':selectedRetSeatsString
      })
    }
  const createReservation1=()=>{
    axios.post('http://localhost:5000/reservations',filteredFlightListSum1[0]).then(()=>{
      window.location.reload(false);
    })
    reserve1=true;
};
const createReservation2=()=>{
  axios.post('http://localhost:5000/reservations',filteredFlightListSum2[0]).then(()=>{
    window.location.reload(false);
    reserve1=false;
  })
};
return (

  <div>
       <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className= {classes.heading} variant= "h4" align="center" >Your Itinerary</Typography>
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
        <TableCell align="right">Selected Seats</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredFlightList1.map((flight,key)=> (
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
            <TableCell align="right">{difference[0]}</TableCell>
            <TableCell align="right">{allowance}</TableCell>
            <TableCell align="right">{price}</TableCell>
            <TableCell align="right">{cabinClass}</TableCell>
            <TableCell align="right">{selectedDepSeatsString}</TableCell>
          </TableRow>
        ))}
        {filteredFlightList2.map((flight,key)=> (
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
            <TableCell align="right">{difference[1]}</TableCell>
            <TableCell align="right">{allowance}</TableCell>
            <TableCell align="right">{price}</TableCell>
            <TableCell align="right">{cabinClass}</TableCell>
            <TableCell align="right">{selectedRetSeatsString}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </TableContainer>
        <h3 align='right'>Total Price:{price2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;</h3>
        <Container maxWidth="lg" align="center"> 
    <div className="Button"/>
      <h2>
        To return to home page, please click below:
        </h2>
      <Button variant="contained" onClick={()=>{
         createReservation1()
         if(reserve1){
         createReservation2()}
        navigate("/existingUser")}}>Reserve Seats</Button>
      <br/>
     </Container>
    </div>
);
}
export default Itinerary