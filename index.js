const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const secretKey = "secretKey"

app.get('/',(req,res)=>{
  res.json({
    msg:"simple api"
  })
})

app.post('/login',(req,resp)=>{
    const user ={
        id: 1,
        username: "Aman",
        email:"aman@gmail.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'500s'},(err,token)=>{
        resp.json({
            token
        })
    })
})

app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({result: "Invalid Token"})
        }
        else{
            res.json({
                msg:"profile Acessed",
                authData
            })
        }
    })
})
function verifyToken(req,res,next){
 const bearerHeader = req.headers['authorization']
 if(typeof bearerHeader !== 'undefined'){
 const bearer = bearerHeader.split(" ");
 const token = bearer[1]
  req.token = token
  next();
 }
 else{
    res.send({
        result: "Token is not Valid"
    })
 }
}
app.listen(5000,()=>{
    console.log("app is running on port 5000")
})