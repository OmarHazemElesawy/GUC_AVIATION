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
const flight=mongoose.model('flight',flightSchema);
export default flight;
