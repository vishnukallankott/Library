const {sequelize,DataTypes}=require("sequelize")
const db=require('../config')
const userModel=db.define("user",
{
id:{
    type:DataTypes.BIGINT,
    //allowNull:false,
    primaryKey:true,
    autoIncrement:true
},
firstName:{
    type:DataTypes.STRING(200),
},
lastName:{
    type:DataTypes.STRING(200),
},
email:{
    type:DataTypes.STRING(200),
},
phone:{
    type:DataTypes.STRING(200),
},
password:{
    type:DataTypes.STRING(200)
    
}
},
{
    freezeTableName:true
})
module.exports=userModel