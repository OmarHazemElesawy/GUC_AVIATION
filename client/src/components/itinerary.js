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
  // const [flight1,setFlight]=useState({
  //       flightNo:'',
  //       departureTime:'',
  //       arrivalTime:'',
  //       ecoSeatNo:'',
  //       businessSeatNo:'',
  //       departureAirport:'',
  //       arrivalAirport:'',
  //       departureTerminal:'',
  //       arrivalTerminal:'',
  //       seatsBusiness:[],
  //       seatsEconomic:[]
  //        });

  //     const updateFlight=(ID)=>{
  //       axios.post(`http://localhost:5000/flights/${ID}`,flight1).then(()=>{
  //         window.location.reload(false);
  //       })
  //     };
  //     for (var f in flightList){
  //       if(flightList[f]['_id']===id1){
  //         setFlight({ ...flight1,seatsBusiness:depData})
  //       }}
return (

  <div>
       <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className= {classes.heading} variant= "h4" align="center" >Your Itinerary </Typography>
      </AppBar>
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell align="right">Flight No.</TableCell>
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
        //updateFlight(id1)
        //updateFlight(id2)
        navigate("/existingUser")}}>Reserve Seats</Button>
      <br/>
     </Container>
    </div>
);
}
export default Itinerary