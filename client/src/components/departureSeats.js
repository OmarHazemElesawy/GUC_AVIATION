import {React,useEffect,useState} from 'react';
import {Container , AppBar,Typography} from '@material-ui/core';
import useStyles from './styles';
import { useParams} from 'react-router-dom';
import axios from 'axios';
//import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
//import {Button} from '@mui/material';
//import Stack from '@mui/material';
//import Switch from '@mui/material/Switch';
import {useNavigate} from 'react-router-dom';
//import { styled } from '@mui/material/styles';
function DepartureSeats() {

const navigate=useNavigate();
const classes =useStyles();
 let {adult}:{adult:string}=useParams();
 let {children}:{children:string}=useParams();
 let {id1}:{id1:string}=useParams();
 //let {id2}:{id2:string}=useParams();
 let {cabinClass}:{cabinClass:string}=useParams();
 let economicCount=0;
 let businessCount=0;
 let countList=[];
 let countListFiltered=[];
 var selectedSeats=[];
 let adultCount=parseInt(adult);
 let childrenCount=parseInt(children);
 let reservedSeats=[1,2,3];
 let confirmBox;
 const[flightList, setFlightList]=useState([]);
// const[color,setColor]=useState('primary');
  useEffect(()=>{
    axios.get('http://localhost:5000/flights').then((allFlights)=>{
      setFlightList(allFlights.data);
    })
  },[])


  for (var k in flightList){
    if(flightList[k]['_id']===id1){
      economicCount=flightList[k]['ecoSeatNo'];
      businessCount=flightList[k]['businessSeatNo']
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
  return (
    <div className="departureSeats">
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Your Departure Seats</Typography>
          </AppBar>
            <h2>
            Please select {adult} adult tickets:
            </h2>
            <br/>
            {countListFiltered.map(count => 
            <Button variant="outlined" onClick={()=>{
              adultCount--;
              selectedSeats.push(count);
              if(adultCount===0){
              confirmBox=window.alert("you have selected all seats, please select children seats");

              }
            }}>{count}</Button>) }
            <br/>
            <h2>
            Please select {children} children tickets:
            </h2>
            <br/>
            {countListFiltered.map(count => 
            <Button variant="outlined"onClick={()=>{
              if(selectedSeats.includes(count)){
              confirmBox=window.alert("you already selected this seat before");
              }else{
              childrenCount--;
              selectedSeats.push(count);
              confirmBox=false;
              if(childrenCount===0){
                confirmBox=window.alert("you have selected all seats redirecting now");
                localStorage["selectedDepSeats"]=JSON.stringify(selectedSeats);
                navigate("retSeats");
              }
            }}}>{count}</Button>) }
            
            <br/>
          </Container>
    </div>
  );

//{flightList.map((flight,key) => ())}     {/*{JSON.stringify(countList)}*/}
//<Checkbox {...label} defaultChecked />
// <Button variant="outlined" onClick={()=>{navigate("update")}}>update page</Button>
// <Button variant="outlined" onClick={()=>{navigate("searchData")}}>Search page</Button>*/
  }
export default DepartureSeats