const {addBooks, getBooks,getsingleBooks,bookIssue,bookStatusUpdate}=require('../controller/bookController')

const auth=require("../middlewares/authentication")

exports.route_config = (app) => {
    /*@parms */
   app.get('/books',//auth.verfyToken,
   getBooks)
   app.post('/books',auth.verfyToken,addBooks)
   app.get("/books/:id",getsingleBooks)
    app.post("/bookissued",auth.verfyToken,bookIssue)
    app.put("/bookStatus/:book_id",auth.verfyToken,bookStatusUpdate)

   
//    app.post('/resetpassword',registerController.register)


   /*for validating user*/
   //app.get('/validateToken',auth,jwtController.validateUser)
}