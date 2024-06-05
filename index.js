const express=require("express")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const path = require("path")
const userModel=require('./models/userModel')
const productModel=require('./models/bookModel')
const dbConnection=require('./dbConnection')
const registerRoutes=require('./routes/users')
const booksRoutes=require('./routes/books')
const cors=require('cors')
const app=express()
//const router=express.Router()
require("dotenv").config()
app.use(express.json())
app.set('port',process.env.port)
app.set('host',process.env.host)
app.set('view engine', 'hbs')
app.use(
    cors({
      origin: "*",
      method: ["GET", "POST"],
    })
  );  
const publicDir = path.join(__dirname, './public')
app.use(express.static(publicDir))
registerRoutes.route_config(app)
booksRoutes.route_config(app)

  dbConnection.connection();

app.listen(app.get('port'), () => {
    console.log(' app is running at the port number',app.get('port'));
  });


