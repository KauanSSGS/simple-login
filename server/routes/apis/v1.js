const express = require("express")
const router = express.Router()
const aboutUser = {
    username : ""


}



router.get("/",(req,res,next)=>{
    res.send("this is the index api route, it servers no porpuse, for now")
    next()
})
router.get("/aboutAccount", async (req,res)=>{
 res.send(aboutUser)
})


module.exports = router