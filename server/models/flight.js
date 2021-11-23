import mongoose from 'mongoose';

const flightSchema = mongoose.Schema({
    flightNo: String,
    departureTime:String,
    arrivalTime:String,
    ecoSeatNo:String,
    businessSeatNo:String,
    airport:String,
    terminal:String
});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const flight=mongoose.model('flight',flightSchema);
export default flight;
