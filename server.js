const express = require("express")
const authRoute = require("./server/routes/auth")
const homeRoute = require("./server/routes/home")
const  APIsRoutes = require("./server/routes/apis/v1")

const app = express()
const PORT = process.env.PORT || 3000


app.use("/auth",authRoute)
app.use("/home",homeRoute)
app.use("/v1",APIsRoutes)

app.use(express.static("client"))


app.get("/",(req,res)=>{
    res.redirect("/auth/login")
})

app.listen(PORT)