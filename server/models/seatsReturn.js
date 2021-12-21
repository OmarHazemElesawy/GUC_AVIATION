import mongoose from 'mongoose';

const seatsReturnSchema = mongoose.Schema({
    flightId:String,
    seatsBusiness:[String],
    seatsEconomic:[String]

});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const seatsReturn=mongoose.model('seatsReturn',seatsReturnSchema);
export default seatsReturn;
