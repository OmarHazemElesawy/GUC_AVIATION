import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    passport:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
    
});
//flight number, departure and arrival times, dates, number of Economy seats, number of Business class seats, and airport
const user=mongoose.model('user',userSchema);
export default user;
