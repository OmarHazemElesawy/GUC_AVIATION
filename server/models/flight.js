import mongoose from 'mongoose';

const flightSchema = mongoose.Schema({
    flightNo: String,
    date: String,
    departureTime:String,
    arrivalTime:String,
    ecoSeatNo:String,
    businessSeatNo:String,
    departureAirport:String,
    arrivalAirport:String,
    departureTerminal:String,
    arrivalTerminal:String,

});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const flight=mongoose.model('flight',flightSchema);
export default flight;
