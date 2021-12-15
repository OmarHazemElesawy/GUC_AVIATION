import UserData from '../models/user.js';
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
     //model..variable
     const newUser= new UserData(user);
    try{
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(409).json({message:error.message});
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
        }).exec();
        res.send('Successfully updated')
    }catch(error){
        console.log(error);
    }
 }