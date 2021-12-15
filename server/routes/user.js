import express from 'express';
import {getUser,createUser,updateUser} from '../controllers/user.js';

const router=express.Router();

router.get("/",getUser);
router.post("/",createUser);
router.post('/:id',updateUser);
export default router;

