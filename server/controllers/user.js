import UserData from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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
export const signin = async (req,res)=>{
    const{email,password}=req.body;
    try{
      const existingUser=await UserData.findOne({email})

      if(!existingUser)return res.status(404).json({message:"user doesn't exist."})
      const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)

      if(!isPasswordCorrect){
          return res.status(400).json({message:"invalid credentials"})
      }

      const token=jwt.sign({email:existingUser.email,id:existingUser._id},"test",{expiresIn:"1h"});

      res.status(200).json({result:existingUser,token});

    }catch(error){
        res.status(500).json({message:"something went wrong"});
    }
};
export const signup = async (req,res)=>{
    const{email,password,confirmPassword,firstName,lastName,passport}=req.body;
    try{
      const existingUser=await UserData.findOne({email})

      if(existingUser)return res.status(400).json({message:"user already exists."})
      if(!(password===confirmPassword))return res.status(400).json({message:"passwords don't match"})
      const hashedPassword=await bcrypt.hash(password,12)
      const result =await UserData.create({email,passport,password:hashedPassword,name:`${firstName} ${lastName}`,pass:password})
      const token=jwt.sign({email:result.email,id:result._id},"test",{expiresIn:"1h"});
      res.status(201).json({result,token});

    }catch(error){
        res.status(500).json({message:"something went wrong"});
    }
}
export const updateUser = async (req,res)=>{
    const id =req.params.id;
    try{
        await UserData.findOneAndUpdate({_id:id},{
            name:req.body.name||UserData.name,
            email:req.body.email||UserData.email,
            passport:req.body.passport||UserData.passport,
            password:req.body.password||UserData.password,
            id:req.body.id||UserData.id
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }
 export const updatePassword = async (req,res)=>{
    const id =req.params.id;
    const userPassword=req.body;
    try{

        const existingUser=await UserData.findOne({_id:id})
        const isPasswordSame=await bcrypt.compare(userPassword.password,existingUser.password)
        if(isPasswordSame){
            return res.status(400).json({message:"password entered is similar to the exisitng password,please enter a different one"})
        }
        const hashedPassword=await bcrypt.hash(userPassword.password,12)
        console.log(hashedPassword)
        await UserData.findOneAndUpdate({_id:id},{
            password:hashedPassword,
            pass:userPassword.password
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }