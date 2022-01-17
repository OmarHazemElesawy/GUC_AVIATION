import {AUTH} from "../components/constants/actionTypes"
import * as api from "../api/index.js"

export const signin=(formData,navigate)=>async(dispatch)=>{
try{
    const {data}= await api.signIn(formData);
    dispatch({type:AUTH,data});
    navigate("/existingUser") 
}catch(error){
    window.confirm("wrong Email or Password")
    console.log(error)
}
};

export const signup=(formData,navigate)=>async(dispatch)=>{
    try{
        const {data}= await api.signUp(formData);
        dispatch({type:AUTH,data});
        navigate("/existingUser") 
    }catch(error){
        window.confirm(error.JSON.message);
        console.log(error);
    }
};
