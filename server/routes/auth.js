const express = require("express")
                  require('dotenv').config();
const {MongoClient} = require("mongodb");
const { loginSchema } = require("../models/schemas");
const {createUserdb,checkIfUserExist}= require("../models/db");


const router = express.Router()

router.use(express.urlencoded({extended: true}))

router.use(express.json())


const URL = process.env.DB_URL;


const authBody = {
    user : {
        brokenUser : [],
        validUser : []

    },
    error : {
        status : false,
        errors : []
    }
}



router.get("/",(req,res,next)=>{
    res.send(authBody)

    next()
})
router.post("/",async (req,res)=>{
    try{
        const user = req.body
        const {error,value} = loginSchema.validate(user)
        const client =  new MongoClient(URL)
        await client.connect()

     
        

        if(error){
           const message  = error.details[0].message
           console.log(message)
            authBody.error.errors = message
            authBody.error.status = true
            authBody.user.brokenUser = value
            res.redirect("/auth/login")
            

        }else{
               //if user already exists 
               const userExist = await checkIfUserExist(client,user)
            if(userExist){
                let newError = "this username is already in use"
                authBody.error.errors = newError
                authBody.error.status = true
                authBody.user.brokenUser = value
                res.redirect("/auth/login")


            }else{
                //if user doenst exist
                console.log("user doenst exist")
                authBody.error.status = false
                authBody.user.validUser = user
                authBody.error.errors = ""
                createUserdb(client,user)
                res.redirect("/home")

            }
        }

    

    }catch(err){
        if(err){
            console.log(err)
        }

    }

    
    
})

router.get("/login",async (req,res)=>{
    res.sendFile("login.html",{root : "./client/html"})
   
})






module.exports = router