import express from 'express';
import {getUser,createUser,updateUser,loginUser} from '../controllers/user.js';

const router=express.Router();

router.get("/",getUser);
router.post("/",createUser);
router.post('/login',loginUser);
router.post('/:id',updateUser);

export default router;

