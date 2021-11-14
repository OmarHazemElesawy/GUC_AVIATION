import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';

const app=express();

app.use(express.json({limit:"20mb", extended:true}));
app.use(express.urlencoded({limit:"20mb", extended:true}));

app.use(cors());

const CONNECTION_URL=
'mongodb+srv://vscode1357:vscode1357@cluster0.kxzfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>app.listen(PORT,()=>
    console.log(`connection is established  and running on port:${PORT}`)
)).catch((err)=> console.log(err.message));
