const {sequelize,DataTypes}=require("sequelize")
const db=require('../config')
const cartModel=db.define("bookcart",
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
}
},
{
    freezeTableName:true
})
module.exports=cartModel