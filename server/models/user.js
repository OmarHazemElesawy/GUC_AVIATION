import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    passport:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
    pass:{type:String}
});
const user=mongoose.model('user',userSchema);
export default user;
