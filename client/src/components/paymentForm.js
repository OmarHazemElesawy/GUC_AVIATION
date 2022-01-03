import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
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
    const navigate=useNavigate();
    const classes =useStyles();
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    let amountInCents;
    const {id_dep}:{id_dep:string}=useParams();
    const {cabinClass}:{cabinClass:string}=useParams();
    if(cabinClass==="Business"){
        amountInCents=2000*100;
    }else{
        amountInCents=1000*100
    }
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
            <button>Pay</button>
        </form>
        :
       <div>
           <h2 align="center">payment successful! you payed</h2>
           <Stack spacing={2} direction="row">
               <Button variant="contained"  onClick={()=>{navigate("/existingUser")
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
            

