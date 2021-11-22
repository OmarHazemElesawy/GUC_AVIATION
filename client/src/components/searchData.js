import {React,useEffect,useState} from 'react';
import axios from 'axios';

export default function SearchData() {
  //retrieving the data from the localstorage cache
    var flight=JSON.stringify(JSON.parse(localStorage['flight']));
    const[flightList, setFlightList]=useState([]);

      useEffect(()=>{
        axios.get('http://localhost:5000/flights').then((allFlights)=>{
          setFlightList(allFlights.data);
        }) 
      },[])
      var FlightList=JSON.stringify(flightList);
      console.log(flightList);
    return(
        <div>
          the data from the text field:
            {flight}
            <br/>
            <br/>
            all flights
            {FlightList}
            )}
        </div>
    )
    }
