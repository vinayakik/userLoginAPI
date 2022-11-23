const express=require('express');
const app=express();
const db=require('./db')

const port=5000;

const cors=require('cors');  //cors->cross origin resource sharing. It helps in interacting with different origins. 
app.use(cors())

const AuthController=require('./controller/AuthController');
app.use('/api/auth',AuthController);

app.listen(port,()=>{
    console.log('listening on port 5000')
})