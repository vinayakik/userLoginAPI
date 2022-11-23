const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const config=require('../config');
const User=require('../model/userModel');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());


//To get all the user data
router.get('/users',(req,res)=>{
    User.find({},(err,data)=>{      ////User is a schema which we are using. Instead of writting db.collection.find()
        if(err) throw err;
        res.send(data);
    } )
})


//To register the user
router.post('/register',(req,res)=>{
    User.find({email:req.body.email},(err,data)=>{
        if(err) throw err;
        if(data.length>0){
            res.send('Email already taken');
        }
        else{
            //encrypt the password
            let hashPassword=bcrypt.hashSync(req.body.password,8); //hashSync is a function of bcrypt
            User.create({
                name :req.body.name,
                email:req.body.email,
                password:hashPassword,
                phone:req.body.phone,
                role:req.body.role?req.body.role:'User'
            },(err,data)=>{
                if (err) return res.send('error while register');
                res.send('Registration successful');
            })
        }
    })
})


//loginUser
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.send({auth:false,token:'Error while Logging'});
        if(!user) return res.send({auth:false,token:'No User Found'});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
            // in case both valid
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})   //To create a token which is valid for 24 hrs
            res.send({auth:true,token:token})
        }
    })
})

//userInfo
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'});
    //jwt verify
    jwt.verify(token,config.secret,(err,user) => {
        if(err) return res.send({auth:false,token:'Invalid Token'});
        User.findById(user.id,(err,result) => {
            res.send(result)
        })
    })
})


module.exports = router;