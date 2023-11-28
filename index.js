const express = require('express')
const jwt = require('jsonwebtoken')
const verify = require('./verifytoken')
const app = express();
require('dotenv').config();
try{
    app.post('/login',(req,res)=>{
    const user ={
        id:1,
        username: "Aman",
        email: "aman@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'1hr'},(err,token)=>{
        if(err){
            console.error('Error generating token:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({token})
     })
})
secretKey = process.env.secretKey
app.post('/profile',verify,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){ 
            res.send({result: "Invalid Token"})
        }
        else{
            res.send({ status: 'success', message: 'Profile accessed successfully',authData})
        }
    })
})
 
}catch(err){
   console.log("Error Occured",err)
   res.status(500).send("Internal Server error") 
}
PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})