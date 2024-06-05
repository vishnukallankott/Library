
// const register_controller=require('../controller/register')
// router.post('/register',register_controller.register)
// module.exports=router

const {register, login}=require('../controller/userController')



exports.route_config = (app) => {
    /*@parms */
   app.post('/register',register)
   app.post('/login',login)

   
//    app.post('/resetpassword',registerController.register)


   /*for validating user*/
   //app.get('/validateToken',auth,jwtController.validateUser)
}