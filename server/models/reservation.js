import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    flightNo: String,
    flightID:String,
    userID:String,
    date:String,
    departureTime:String,
    arrivalTime:String,
    departureAirport:String,
    arrivalAirport:String,
    departureTerminal:String,
    arrivalTerminal:String,
    tripDuration:String,
    allowance:String,
    price:String,
    class:String,
    confirmationCode:String,
    payed:Boolean,
    depSeats:[String],
    retSeats:[String]

});
const reservation=mongoose.model('reservation',reservationSchema);
export default reservation;
