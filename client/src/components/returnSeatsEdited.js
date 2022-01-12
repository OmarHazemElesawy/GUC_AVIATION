import {React,useEffect,useState} from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import { useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function DepartureSeatsEdited() {

const navigate=useNavigate();
const classes =useStyles();

 let {id}:{id:string}=useParams();
 let {ID2}:{ID2:string}=useParams();
 let {cabinClass}:{cabinClass:string}=useParams();
 var returnSeatsEdited=JSON.parse(localStorage['returnSeatsEdited']);
 let economicCount=0;
 let businessCount=0;
 let countList=[];
 let countListFiltered=[];
 var selectedSeats=[];
 let reservedSeats=[''];
 let seatsCount;
 let flightPrice;
 let flightAllowance;

 const[flightList, setFlightList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/flights').then((allFlights)=>{
      setFlightList(allFlights.data);
    })
  },[])

  const[reservationList, setReservationList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/reservations').then((allReservations)=>{
      setReservationList(allReservations.data);
    })
  },[])

  for (var k in flightList){
    if(flightList[k]['_id']===ID2){
      economicCount=flightList[k]['ecoSeatNo'];
      businessCount=flightList[k]['businessSeatNo']
    }
  }

  for (var a in reservationList){
    if(reservationList[a]['_id']===id){
      if((reservationList[a]["retSeats"]).length===0){
        seatsCount=(reservationList[a]["depSeats"]).length;
      }else{
        seatsCount=(reservationList[a]["retSeats"]).length;
      }
    }
  }

  if(cabinClass==="Economic"){
    for(let j =0;j<economicCount;j++){
      countList[j]=j+1;
    }
    flightPrice="1000 Euros";
    flightAllowance="One 23 kg bag";
  }else{
    for(let i =0;i<businessCount;i++){
      countList[i]=i+1;
    }
    flightPrice="2000 Euros";
    flightAllowance="Two 23 kg bags";
  }
  for(let x=0;x<countList.length;x++){
    if(!(reservedSeats.includes(countList[x]))){
      countListFiltered.push(countList[x])
    }
  }
  const [reservation1,setReservation1]=useState({
    flightNo:returnSeatsEdited[0].flightNo,
    flightID:ID2,
    date:returnSeatsEdited[0].date,
    departureTime:returnSeatsEdited[0].departureTime,
    arrivalTime:returnSeatsEdited[0].arrivalTime,
    departureAirport:returnSeatsEdited[0].departureAirport,
    arrivalAirport:returnSeatsEdited[0].arrivalAirport,
    departureTerminal:returnSeatsEdited[0].departureTerminal,
    arrivalTerminal:returnSeatsEdited[0].arrivalTerminal,
    tripDuration:returnSeatsEdited[0].tripDuration,
    allowance:flightAllowance,
    price:flightPrice,
    class:cabinClass,
    depSeats:[],
    retSeats:[]
});
const updateReservation1=(ID)=>{
  axios.post(`http://localhost:5000/reservations/${ID}`,reservation1).then(()=>{
      window.location.reload(false);   
   })
};
  return (
    <div className="departureSeats">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Your Departure Seats</Typography>
          </AppBar>
            <h2>
            Please select {seatsCount} Seats:
            </h2>
            <br/>
            {countListFiltered.map(count => 
            <Button variant="outlined" onClick={()=>{
              if(selectedSeats.includes(count)){
                window.alert("you already selected this seat before");
                } else{
              seatsCount--;
              selectedSeats.push(count);
              if(seatsCount===0){
               window.alert("you have selected all seats!\n Please Confirm Selection By Clicking Button Below");
               localStorage["editedDepSeats"]=JSON.stringify(selectedSeats);

               setReservation1({ ...reservation1,retSeats:selectedSeats})
              }
              }}}>{count}</Button>)}
               <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={()=>{
                updateReservation1(id)
                navigate("/existingUser")
              }}>Confirm Selection</Button>
              </Stack>
          </Container>
    </div>
  );
  }
export default DepartureSeatsEdited