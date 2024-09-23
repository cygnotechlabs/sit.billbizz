require('dotenv').config()

const express = require('express')

const cors = require('cors')

const server = express()

const accountRouter = require("./router/accountRouter")

require('./database/connection/connection')

server.use(cors())

server.use(express.json())

server.use(accountRouter)

const PORT = process.env.PORT || 5001;

server.get('/',(req,res)=>{
    res.status(200).json("Bill BIZZ server started - Accounts")
})

server.listen(PORT,()=>{
    console.log(`BillBIZZ server Accounts started at port : ${PORT}`);
})

