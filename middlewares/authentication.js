const jwt=require('jsonwebtoken')
require("dotenv").config()
async function verfyToken(req,reply,next){
    let authHeader=req.headers.authorization


    if(authHeader==undefined){
       return  reply.status(400).send({
        "status":false,
            "message":"No token found"
        })
    }
        let token=authHeader.split(' ')[1]
        jwt.verify(token,process.env.secretkey,(err,result)=>{
            if(err){
                reply.status(500).send({
                    "status":false,
                    "message" :"Unauthorized"

                })
            }

            else{
                req.user=result.id
               next()
            }

        })
    }

    module.exports={
        verfyToken
    }