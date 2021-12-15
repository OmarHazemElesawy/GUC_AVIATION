import mongoose from 'mongoose';

const seatsSchema = mongoose.Schema({
    flightId:String,
    businessNo:String,
    economicNo:String,
    seatsBusiness:[String],
    seatsEconomic:[String]

});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const seats=mongoose.model('seats',seatsSchema);
export default seats;
