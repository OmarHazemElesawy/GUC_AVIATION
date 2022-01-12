import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { React, useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {Container , AppBar,Typography,Grow} from '@material-ui/core';
import useStyles from './styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm() {


    const {id1}:{id1:string}=useParams();
    const {id2}:{id2:string}=useParams();
    const navigate=useNavigate();
    const classes =useStyles();
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    let amountInCents;
    const {id_dep}:{id_dep:string}=useParams();
    const {cabinClass}:{cabinClass:string}=useParams();
    let departureString;
    let returnString;
    let roundTripString;

    if(cabinClass==="Business"){
        amountInCents=4000*100;
    }else{
        amountInCents=2000*100
    }

    const[reservationList, setReservationList]=useState([]);
    useEffect(()=>{
      axios.get('http://localhost:5000/reservations').then((allReservations)=>{
        setReservationList(allReservations.data);
      })
    },[])
    for (var k in reservationList){
        if(reservationList[k]['_id']===id1){
            if(reservationList[k]['depSeats'].length===0){
                returnString=`Your Return Flight:<br><br>
                # Flight Number: ${reservationList[k]['flightNo']}<br>
                # Flight Date: ${reservationList[k]['date']}<br>
                # Departure Time: ${reservationList[k]['departureTime']}<br>
                # Arrival Time: ${reservationList[k]['arrivalTime']}<br>
                # Departure Airport: ${reservationList[k]['departureAirport']}<br>
                # Arrival Airport: ${reservationList[k]['arrivalAirport']}<br>
                # Departure Terminal: ${reservationList[k]['departureTerminal']}<br>
                # Arrival Terminal: ${reservationList[k]['arrivalTerminal']}<br>
                # Trip Duration: ${reservationList[k]['tripDuration']}<br>
                # Baggage Allowance: ${reservationList[k]['allowance']}<br>
                # Price: ${reservationList[k]['price']}<br>
                # Class: ${reservationList[k]['class']}<br>
                # Confirmation Code: ${reservationList[k]['confirmationCode']}<br>
                # Reserved Seats: ${reservationList[k]['retSeats']}<br><br>`
            }else{
                departureString=`Your Departure Flight:<br><br>
                 # Flight Number: ${reservationList[k]['flightNo']}<br>
                 # Flight Date: ${reservationList[k]['date']}<br>
                 # Departure Time: ${reservationList[k]['departureTime']}<br>
                 # Arrival Time: ${reservationList[k]['arrivalTime']}<br>
                 # Departure Airport: ${reservationList[k]['departureAirport']}<br>
                 # Arrival Airport: ${reservationList[k]['arrivalAirport']}<br>
                 # Departure Terminal: ${reservationList[k]['departureTerminal']}<br>
                 # Arrival Terminal: ${reservationList[k]['arrivalTerminal']}<br>
                 # Trip Duration: ${reservationList[k]['tripDuration']}<br>
                 # Baggage Allowance: ${reservationList[k]['allowance']}<br>
                 # Price: ${reservationList[k]['price']}<br>
                 # Class: ${reservationList[k]['class']}<br>
                 # Confirmation Code: ${reservationList[k]['confirmationCode']}<br>
                 # Reserved Seats: ${reservationList[k]['depSeats']}<br><br>`
            }
        }
        if(reservationList[k]['_id']===id2){
            if(reservationList[k]['depSeats'].length===0){
                returnString=`Your Return Flight:<br><br>
                # Flight Number: ${reservationList[k]['flightNo']}<br>
                # Flight Date: ${reservationList[k]['date']}<br>
                # Departure Time: ${reservationList[k]['departureTime']}<br>
                # Arrival Time: ${reservationList[k]['arrivalTime']}<br>
                # Departure Airport: ${reservationList[k]['departureAirport']}<br>
                # Arrival Airport: ${reservationList[k]['arrivalAirport']}<br>
                # Departure Terminal: ${reservationList[k]['departureTerminal']}<br>
                # Arrival Terminal: ${reservationList[k]['arrivalTerminal']}<br>
                # Trip Duration: ${reservationList[k]['tripDuration']}<br>
                # Baggage Allowance: ${reservationList[k]['allowance']}<br>
                # Price: ${reservationList[k]['price']}<br>
                # Class: ${reservationList[k]['class']}<br>
                # Confirmation Code: ${reservationList[k]['confirmationCode']}<br>
                # Reserved Seats: ${reservationList[k]['retSeats']}<br><br>`
            }else{
                departureString=`Your Departure Flight:<br><br>
                 # Flight Number: ${reservationList[k]['flightNo']}<br>
                 # Flight Date: ${reservationList[k]['date']}<br>
                 # Departure Time: ${reservationList[k]['departureTime']}<br>
                 # Arrival Time: ${reservationList[k]['arrivalTime']}<br>
                 # Departure Airport: ${reservationList[k]['departureAirport']}<br>
                 # Arrival Airport: ${reservationList[k]['arrivalAirport']}<br>
                 # Departure Terminal: ${reservationList[k]['departureTerminal']}<br>
                 # Arrival Terminal: ${reservationList[k]['arrivalTerminal']}<br>
                 # Trip Duration: ${reservationList[k]['tripDuration']}<br>
                 # Baggage Allowance: ${reservationList[k]['allowance']}<br>
                 # Price: ${reservationList[k]['price']}<br>
                 # Class: ${reservationList[k]['class']}<br>
                 # Confirmation Code: ${reservationList[k]['confirmationCode']}<br>
                 # Reserved Seats: ${reservationList[k]['depSeats']}<br><br>`
            }
          }
      }
      roundTripString=departureString+returnString;
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:5000/payment", {
                amount: amountInCents,
                id,
                description:""+id_dep+"",
            })

            if(response.data.success) {
                console.log("Successful payment")
                
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        window.confirm("please enter correct credit card Information!")
        window.location.reload(false);
        console.log(error.message)
    }
}
const handleSend=async(text)=>{
    try{
        await axios.post("http://localhost:5000/sendMail",{text})
    }catch(error){
        console.log(error)
    }
}
const [reservation1,setReservation1]=useState({
    flightNo: '',
    date:'',
    departureTime:'',
    arrivalTime:'',
    departureAirport:'',
    arrivalAirport:'',
    departureTerminal:'',
    arrivalTerminal:'',
    tripDuration:'',
    allowance:'',
    price:'',
    class:'',
    confirmationCode:'',
    payed:false,
});
const [reservation2,setReservation2]=useState({
    flightNo: '',
    date:'',
    departureTime:'',
    arrivalTime:'',
    departureAirport:'',
    arrivalAirport:'',
    departureTerminal:'',
    arrivalTerminal:'',
    tripDuration:'',
    allowance:'',
    price:'',
    class:'',
    confirmationCode:'',
    payed:false,
});

///depSeats:[String],
///retSeats:[String]
    
  const updateReservation1=(ID)=>{
    axios.post(`http://localhost:5000/reservations/${ID}`,reservation1).then(()=>{
        window.location.reload(false);   
     })
  };
  const updateReservation2=(ID)=>{
    axios.post(`http://localhost:5000/reservations/${ID}`,reservation2).then(()=>{
        window.location.reload(false);
    })
  };

    return (
        <>
        <div>
      <Container maxWidth="lg"> 
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className= {classes.heading} variant= "h4" align="center" >Payment for round Trip</Typography>
        </AppBar>
      </Container>
      <Grow in>
        <Container>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button onClick={()=>{
                   setReservation1({ ...reservation1,payed:true});
                   setReservation2({ ...reservation2,payed:true});
              }}>Pay</button>
        </form>
        :
       <div>
           <h2 align="center">payment successful! you payed</h2>
           <Stack spacing={2} direction="row">
               <Button variant="contained"  onClick={()=>{
                     console.log(reservation1.payed)
                   console.log(reservation2.payed)
                   updateReservation1(id1);
                   updateReservation2(id2);
                   handleSend(roundTripString)
                   navigate("/existingUser");
              }}>Return to Home Page</Button>
               </Stack>
       </div> 
        }
         </Container>
      </Grow>
        </div>
        </>
    )
}
            

