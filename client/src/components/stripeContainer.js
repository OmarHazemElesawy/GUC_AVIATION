import React from "react"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import PaymentForm from "./paymentForm.js"
import "./stripeContainer.css"

const PUBLIC_KEY="pk_test_51KJccQBNkf4dPSaLWr3P59FSiy0kYIQHqn6aCZxD6lp13myN9NrXXuuIq5z95Yx5mEMARVNUA1noDcJsEjXX00rd00Yo6xhXmw"

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
