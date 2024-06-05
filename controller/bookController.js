const bookModel=require('../models/bookModel')
const userModel=require('../models/userModel')
const cartModel=require('../models/cartModel')
const cartDetailsModel=require('../models/cartDetailsModel')
//bookModel.belongsTo(userModel, { foreignKey: "userid" });

const addBooks=async (req,reply)=>{
    try{
        
        const { name,description,price}=req.body
        const data={
            name,description,price
        }
        if(!name || !description || !price ){
            reply.status(406).send({
                status:false,
                message:"Not acceptable",
                error:"Invalid input Parameters"
            })
        }
        const books=await bookModel.create(data)
        if(!books){
            reply.status(
                400).send({
                        status:false,
                        message:"Bad request",
                        error:[]
                })
        }
        reply.status(200).send({status:true,
                                result:books})
    }
    catch(e){
        reply.status(500).send({
            status:false,
            message:e.message
        })
    }
}
const bookIssue=async (req,reply)=>{
    try{
        
        const {book_id,qty,dueDate}=req.body
        let user_id=req.user
       const books= await bookModel.update({isAvailable:false},{where:{
            id:book_id
           }})
           if(books){
            return reply.status(400).send({
                status:false,
                messsage:"Book Not Found",
                error:[]
            })
           }
        const cartDetails=await cartModel.findOne({where:{user_id:user_id}})
        if(!cartDetails){
         const createCart=await cartModel.create({user_id:user_id})
         if(!createCart){
            return reply.status(400).send({
                status:false,
                messsage:"Bad Requset",
                error:[]
            })
         }

        }
        const bookDetails={
            user_id:user_id,book_id,qty,dueDate
        }
        
        const bookCreate=await cartDetailsModel.create(bookDetails)
        if(!bookCreate){
            return reply.status(400).send({
                status:false,
                messsage:"Bad Requset",
                error:[]
            })
         }
       await bookModel.update({isAvailable:false},{where:{
        id:book_id
       }})
        reply.status(200).send({status:true,
                                message:"Book Issued successfully"})
    }
    catch(e){
        reply.status(500).send({
            status:false,
            message:e.message
        })
    }
}
const bookStatusUpdate=async (req,reply)=>{
    try{
        
        const {book_id}=req.params
        console.log(book_id)
        let user_id=req.user
        const books= await bookModel.update({isAvailable:true},{where:{
            id:book_id
           }})
           if(!books){
            return reply.status(400).send({
                status:true,
                messsage:"Bad Requset",
                error:[]
            })
        }
        reply.status(200).send({
            status:true,
            messsage:"Success",
            error:[]
        })
    }
    catch(e){
        reply.status(500).send({
            status:false,
            message:e.message
        })
    }
}
const getBooks=async (req,reply)=>{
    try{
        const { search, orderBy, sortedBy } = req.query;
        let query = {};
        let whereCondition = [];
        if (orderBy) {
            query = {
              where: whereCondition,
              order: [[orderBy, sortedBy]],
            };
        }
        const details=await bookModel.findAll(query)
        if(!details){
            reply.status(404).send({
                "status":false,
                "message":"Not Found",
                "error":[]
            })
        }
        const result=details.map((e)=>{
            return {
                "bookid":e.id,
                "name":e.name,
                "description":e.description,
                "isAvailable":e.isAvailable
                
                       
            }
        })
        
            reply.status(200).send({status:true,
            message:"Success",
        result:result
    })
        
    }
    catch(e){
        reply.status(500).send({
            status:false,
            message:"failed",
            error:e.message
        })
    }

}

const getsingleBooks=async (req,reply)=>{
    try{
        if(!req.params.id){
            reply.status(406).send({
                status:false,
                message:"Not acceptable",
                error:"Invalid input Parameters"
            })

        }
        const details=await bookModel.findAll({where:{
            id:req.params.id
        }})
        if(!details){
            reply.status(404).send({
                "status":false,
                "message":"Not Found",
                "error":[]
            })
        }
        const result=details.map((e)=>{
            return {
                "bookid":e.id,
                "name":e.name,
                "description":e.description,
                "isAvailable":e.isAvailable
                
                       
            }
        })
        
            reply.status(200).send({status:true,
            message:"Success",
        result:result
    })
        
    }
    catch(e){
        reply.status(500).send({
            error:e.message
        })
    }

}

module.exports={
    addBooks,
    getBooks,
    getsingleBooks,
    bookIssue,
    bookStatusUpdate
}