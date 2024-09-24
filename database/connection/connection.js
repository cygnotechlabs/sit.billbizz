// const mongoose = require('mongoose')

// const DB = process.env.DATABASE

// mongoose.connect(DB)
// .then(()=>{
//     console.log("📡...BillBizz Database Connected Succesfully...📡");
// }).catch((error)=>{
//     console.log(`Database error ${error}`);
// })








const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
 
const region = "ap-south-1"; // Your AWS region
const parameterName = "billbizz_DB"; // Your parameter name
 
const ssmClient = new SSMClient({ region });
 
async function getParameter() {
    try {
        const command = new GetParameterCommand({
            Name: parameterName,
            WithDecryption: true // Set to true to decrypt the secure string
        });
 
        const response = await ssmClient.send(command);
        return response.Parameter.Value; // The secure string value
    } catch (error) {
        console.error("Error fetching parameter: ", error);
        throw error;
    }
}
 
async function connectToDatabase() {
    try {
        const dbUri = await getParameter(); // Get the secure string parameter
 
        // Now use dbUri to connect to your database (e.g., MongoDB)
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
 
        console.log("📡...Database Connected Successfully...📡");
    } catch (error) {
        console.log(`Database connection error: ${error}`);
    }
}
 
// Initialize database connection
connectToDatabase();