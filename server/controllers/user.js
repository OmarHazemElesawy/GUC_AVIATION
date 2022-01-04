import UserData from '../models/user.js';
import bcrypt from "bcrypt"

export const getUser = async(req,res)=>{
    try{
        const allUsers=await UserData.find();
        res.status(200).json(allUsers);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};
export const createUser = async (req,res)=>{
     //req from user
     const user=req.body;
     const hashPassword=await bcrypt.hash(req.body.password,10)
     //model..variable
     const newUser= new UserData(user);
     newUser.password=hashPassword
    try{
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}
export const loginUser = async (req,res)=>{
        const user=await UserData.find({firstName:req.body.firstName,lastName:req.body.lastName});
        if(user===null){
            return res.status(400).send("cannot find user")
        }
    try{
      if(await bcrypt.compare(req.body.password,user[0].password)){
          res.send("success")
          console.log(user[0]);
      }else{
        res.send("not allowed")
      }
    }catch(error){
        console.log(error)
    }
}
export const updateUser = async (req,res)=>{
    const id =req.params.id;
    try{
        await UserData.findOneAndUpdate({_id:id},{
            firstName:req.body.firstName||UserData.firstName,
            lastName:req.body.lastName||UserData.lastName,
            email:req.body.email||UserData.email,
            passport:req.body.passport||UserData.passport,
            password:req.body.password||UserData.password
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }