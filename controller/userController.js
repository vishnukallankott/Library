const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
var salt = bcrypt.genSaltSync(10);
require("dotenv").config()
const userModel=require('../models/userModel')
const tokenModel=require('../models/tokenModel')
tokenModel.belongsTo(userModel, { foreignKey: "user_id" });

const register=async(req,reply)=>{
    try{
        const {firstName,lastName,email,phone,password}=req.body
        console.log(req.body)
        if(!firstName || !email || !phone || !password){
           return reply.status(406).send({
                "status":false,
                "message":"Not Acceptable"
            })
        }
        const userData=await userModel.findOne({where:{
            email:email
        }})
        if(userData){
           return  reply.status(406).send({
                "status":false,
                "message":"Email is already registered"
            })
        }
        const hash=bcrypt.hashSync(password, salt);
        const insertedData={
            firstName,lastName,email,phone,password:hash
        }
        const createdData=await userModel.create(insertedData)
        if(!createdData){
            reply.status(400).send({
                "status":false,
                error:"Bad Request "
            })
        }
        reply.status(200).send({
            "status":true,
            "message":"successfully created"
        })

    }
    catch(e){
        reply.status(500).send({
            error:e.message
        })
    }


}

const login=async (req,reply)=>{
    const {email,password}=req.body
    let secret=process.env.secretkey
    if(!email || !password){
       return reply.status(406).send({
            status:false,
            message:"Not Acceptable"
        })
    }
    const userDetails=await userModel.findOne({where:{
        email:email
    }})
    if(!userDetails){
        reply.status(404).send({
            status:false,
            message:"Not Found"
        })
    }
  bcrypt.compare(password,userDetails.password,(err,result)=>{
        if(err){
            reply.status(400).send({
                status:false,
                message:"Failed"
            })
        }
        if(!result){
            reply.status(400).send({
                status:false,
                message:"Password miss match"
            })
        }
        let payload={
            id:userDetails.id
        }
        let expireToken={
            expiresIn:"1d"
        }

        let token=jwt.sign(payload,secret)
        const data= {user_id:userDetails.id,token:token}
        inserToken(data)
        reply.status(200).send({
            status:true,
            token:token
        })
    })

}

async function inserToken(data){
    await tokenModel.create(data)

}
module.exports={
    register,login
 }
// app.post('/register',async (req,reply)=>{
    
//     const hash = bcrypt.hashSync(password, salt);
//     const data={
//         name,email,password:hash
//     }
//     const createdData=await userModel.create(data)
//     if(!createdData){
//         reply.status(404).send({
//             error:"error creating data"
//         })
//     }
//     reply.status(200).send({
//         "message":"successfully created"
//     })
//     })