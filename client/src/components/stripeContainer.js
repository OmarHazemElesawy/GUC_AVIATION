import React from "react"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from "./paymentForm.js"
import "./stripeContainer.css"

const PUBLIC_KEY="pk_test_51KD9GhKpEO7AdK7ca6N3P0vGpslOyO6rdJTG1z5mqlRYTtX8OHogcPv9ljUTfkQSsQ4Hd9PtWLG2cniD3aM186Ga00nxVJBZqt"

const stripeTestPromise= loadStripe(PUBLIC_KEY)

export default function StripeContainer(){
    return(
        <div className="stripeContainer">
        <Elements stripe={stripeTestPromise} class>
            <PaymentForm/>
        </Elements>
        </div>
    )
}