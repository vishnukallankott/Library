const {sequelize,DataTypes}=require("sequelize")
const db=require('../config')
const cartDetailsModel=db.define("cartdetails",
{
id:{
    type:DataTypes.BIGINT,
   // allowNull:false,
    primaryKey:true,
    autoIncrement:true
},
user_id:{
    type:DataTypes.BIGINT,
    references:{
        model: "user",
        key: "id",
    }
},
book_id:{
    type:DataTypes.BIGINT,
    references:{
        model: "books",
        key: "id",
    }
},
qty:{
    type:DataTypes.BIGINT
},
dueDate:{
  type:DataTypes.DATE,
  
}
},
{
    freezeTableName:true
})
module.exports=cartDetailsModel