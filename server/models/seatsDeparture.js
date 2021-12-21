import mongoose from 'mongoose';

const seatsDepartureSchema = mongoose.Schema({
    flightId:String,
    seatsBusiness:[String],
    seatsEconomic:[String]

});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const seatsDeparture=mongoose.model('seatsDeparture',seatsDepartureSchema);
export default seatsDeparture;
