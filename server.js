require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();

// Import routers
const organizationRouter = require('./router/organizationRouter');


require('./database/connection/connection');

// Middleware setup
server.use(cors());
server.use(express.json());

// Routes setup
server.use(organizationRouter);


const PORT = process.env.PORT || 5004;

server.get('/', (req, res) => {
    res.status(200).json("Bill BIZZ server started - Organization");
});

server.listen(PORT, () => {
    console.log(`BillBIZZ server Organization started at port : ${PORT}`);
});
