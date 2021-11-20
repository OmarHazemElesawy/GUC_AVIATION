import {React,useEffect,useState} from 'react';
import axios from 'axios';

export default function SearchData() {
    var flight=JSON.parse(localStorage['flight']);
    const[flightList, setFlightList]=useState([]);

      useEffect(()=>{
        axios.get('http://localhost:5000/flights').then((allFlights)=>{
          setFlightList(allFlights.data);
        }) 
      },[])
      var FlightList=JSON.stringify(flightList);
      console.log(flightList);
    //   var FlightList1=[{}];
    //   for(var i=0;FlightList.length;i++){ 
    //   }

    return(
        <div>
            {flight}
            <br/>
            <br/>
            {FlightList}
            )}
        </div>
    )
    }
