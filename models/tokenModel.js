const {sequelize,DataTypes}=require("sequelize")
const db=require('../config')
const bookModel=db.define("tokens",
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
token:{
    type:DataTypes.STRING(200),
}
},
{
    freezeTableName:true
})
module.exports=bookModel