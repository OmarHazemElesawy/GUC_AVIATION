import mongoose from 'mongoose';

const flightSchema = mongoose.Schema({
    flightNo: Number,
    departureTime:Date,
    arrivalTime:Date,
    ecoSeatNo:Number,
    businessSeatNo:Number,
    airport:String,
    terminal:String
});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const flight=mongoose.model('flight',flightSchema);
export default flight;
