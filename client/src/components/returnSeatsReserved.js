import {React,useEffect,useState} from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import { useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function ReturnSeatsReserved() {

const navigate=useNavigate();
const classes =useStyles();

 let {id}:{id:string}=useParams();
 let {ID}:{ID:string}=useParams();
 let economicCount=0;
 let businessCount=0;
 let countList=[];
 let countListFiltered=[];
 var selectedSeats=[];
 let reservedSeats=[''];
 let seatsCount;
 let cabinClass;

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
    if(flightList[k]['_id']===ID){
      economicCount=flightList[k]['ecoSeatNo'];
      businessCount=flightList[k]['businessSeatNo']
    }
  }

  for (var a in reservationList){
    if(reservationList[a]['_id']===id){
      cabinClass=reservationList[a]["class"];
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
  }else{
    for(let i =0;i<businessCount;i++){
      countList[i]=i+1;
    }
  }
  for(let x=0;x<countList.length;x++){
    if(!(reservedSeats.includes(countList[x]))){
      countListFiltered.push(countList[x])
    }
  }
  const [reservation1,setReservation1]=useState({
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
          <Typography className= {classes.heading} variant= "h4" align="center" >Your Return Seats</Typography>
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
               window.alert("You Have Selected All Seats!\nPlease Confirm Selection By Clicking Button Below");
               localStorage["editedRetSeats"]=JSON.stringify(selectedSeats);
               setReservation1({ ...reservation1,retSeats:selectedSeats})
              }
              }}}>{count}</Button>)}
               <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={()=>{
                updateReservation1(id)
                navigate(-1)
              }}>Confirm Selection</Button>
              </Stack>
          </Container>
    </div>
  );
  }
export default ReturnSeatsReserved