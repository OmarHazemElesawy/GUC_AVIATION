import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    passport:String
});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const user=mongoose.model('user',userSchema);
export default user;
