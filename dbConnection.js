const database = require('./config')
const users=require('./models/userModel')
const products=require('./models/bookModel')
const tokens=require('./models/tokenModel')
const bookcart=require('./models/cartModel')
const cartdetails=require('./models/cartDetailsModel')

exports.connection = async () => {
  try {
    await database.authenticate();
    await database.sync({ alter: true })
    console.log("database connection established successfully")
  } catch (error) {
    console.log("Error in establishing connection", error.message)
  }
}