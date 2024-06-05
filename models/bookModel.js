const {sequelize,DataTypes}=require("sequelize")
const db=require('../config')
const bookModel=db.define("books",
{
id:{
    type:DataTypes.BIGINT,
   // allowNull:false,
    primaryKey:true,
    autoIncrement:true
},
name:{
    type:DataTypes.STRING(200),
},
description:{
    type:DataTypes.STRING(200),
},
price:{
    type:DataTypes.STRING(200)
    
},
isAvailable:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
}
},
{
    freezeTableName:true
})
module.exports=bookModel