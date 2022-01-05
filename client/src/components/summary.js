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

function Summary() {
  
  moment().format();
  const classes =useStyles();
  const navigate=useNavigate();
  const {id1}:{id1:string}=useParams();
  const {id2}:{id2:string}=useParams();
  //let resNoOne=(id1).substring((id1).length-1,(id1).length-5)
  //let resNoTwo=(id2).substring((id2).length-6,(id2).length-10)
  let resNo=makeid(8);
  const {cabinClass}:{cabinClass:string}=useParams();
  let start;
  let end;
  let difference=[];
  let differenceMs;
  let allowance="";
  let price="";
  let price2="";
  var filteredFlightList1=[]
  var filteredFlightList2=[]
  // let reserve1=false
  if (cabinClass==="Business"){
      allowance="Two 23 kg bags"
      price="2000 Euros"
      price2="4000 Euros"
  }else{
      allowance="One 23 kg bags"
      price="1000 Euros"
      price2="2000 Euros"
  }

  var filteredFlightList=[];
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
        filteredFlightList1.push({
          "flightNo":flightList[j].flightNo,
          "date":flightList[j].date,
          "departureTime":flightList[j].departureTime,
          "arrivalTime":flightList[j].arrivalTime,
          "departureAirport":flightList[j].departureAirport,
          "arrivalAirport":flightList[j].arrivalAirport,
          "departureTerminal":flightList[j].departureTerminal,
          "arrivalTerminal":flightList[j].arrivalTerminal,
          "tripDuration":difference[0],
          "allowance":allowance,
          "price":price,
          "class":cabinClass,
          "confirmationCode":resNo,
          "payed":false

        })
      }
    }
    for (var k in flightList){
        if(flightList[k]['_id']===id2){
          start=moment.duration(flightList[k]['departureTime'],"HH:mm");
          end=moment.duration(flightList[k]['arrivalTime'],"HH:mm");
          differenceMs=end.subtract(start);
          difference.push(differenceMs.asHours()+" Hours");
          filteredFlightList.push({
            "flightNo":flightList[k].flightNo,
            "date":flightList[k].date,
            "departureTime":flightList[k].departureTime,
            "arrivalTime":flightList[k].arrivalTime,
            "departureAirport":flightList[k].departureAirport,
            "arrivalAirport":flightList[k].arrivalAirport,
            "departureTerminal":flightList[k].departureTerminal,
            "arrivalTerminal":flightList[k].arrivalTerminal,
            "tripDuration":difference,
          })
          filteredFlightList2.push({
            "flightNo":flightList[k].flightNo,
            "date":flightList[k].date,
            "departureTime":flightList[k].departureTime,
            "arrivalTime":flightList[k].arrivalTime,
            "departureAirport":flightList[k].departureAirport,
            "arrivalAirport":flightList[k].arrivalAirport,
            "departureTerminal":flightList[k].departureTerminal,
            "arrivalTerminal":flightList[k].arrivalTerminal,
            "tripDuration":difference[1],
            "allowance":allowance,
            "price":price,
            "class":cabinClass,
            "confirmationCode":resNo,
            "payed":false
          })
        }
      }
      function makeid(length) {
        var result = '';
        var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    localStorage["flight"]=JSON.stringify(filteredFlightList);
    localStorage["filteredFlightList2"]=JSON.stringify(filteredFlightList2);
    localStorage["filteredFlightList1"]=JSON.stringify(filteredFlightList1);
return (

  <div>
       <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className= {classes.heading} variant= "h4" align="center" >Your Summary</Typography>
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
            <TableCell align="right">{difference[key]}</TableCell>
            <TableCell align="right">{allowance}</TableCell>
            <TableCell align="right">{price}</TableCell>
            <TableCell align="right">{cabinClass}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </TableContainer>
        <h3 align='right'>Total Price:{price2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <Container maxWidth="lg" align="center"> 
    <div className="Button"/>
      <h2>
        To reserve flights and proceed to seats selection please click below:
        </h2>
      <Button variant="contained" onClick={()=>{
        // createReservation1()
        // if(reserve1){
        // createReservation2()}
        navigate("depSeats")}}>Reserve Seats</Button>
      <br/>
     </Container>
    </div>
);
}
export default Summary