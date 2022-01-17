import express from 'express';
import {getUser,createUser,updateUser,signin,signup, updatePassword} from '../controllers/user.js';

const router=express.Router();

router.get("/",getUser);
router.post("/",createUser);
router.post("/signin",signin);
router.post('/signup',signup);
router.post('/:id',updateUser);
router.post('/password/:id',updatePassword);

export default router;

