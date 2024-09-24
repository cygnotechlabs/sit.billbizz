// const mongoose = require('mongoose')

// const DB = process.env.DATABASE

// mongoose.connect(DB)
// .then(()=>{
//     console.log("📡...BillBizz Database Connected Succesfully...📡");
// }).catch((error)=>{
//     console.log(`Database error ${error}`);
// })






// const mongoose = require('mongoose')

// const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");
 
// const region = "ap-south-1"; // Your AWS region
// const parameterName = "billbizz_DB"; // Your parameter name
 
// const ssmClient = new SSMClient({ region });
 
// async function getParameter() {
//     try {
//         const command = new GetParameterCommand({
//             Name: parameterName,
//             WithDecryption: true // Set to true to decrypt the secure string
//         });
 
//         const response = await ssmClient.send(command);
//         return response.Parameter.Value; // The secure string value
//     } catch (error) {
//         console.error("Error fetching parameter: ", error);
//         throw error;
//     }
// }


 
// async function connectToDatabase() {
//     try {
//         const dbUri = await getParameter(); // Get the secure string parameter
 
//         // Now use dbUri to connect to your database (e.g., MongoDB)
//         await mongoose.connect(dbUri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
 
//         console.log("📡...BillBizz Database Connected Succesfully...📡");
//     } catch (error) {
//         console.log(`Database connection error: ${error}`);
//     }
// }
 
// // Initialize database connection
// connectToDatabase();






















const mongoose = require('mongoose')

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
        const param = await getParameter(); // Get the secure string parameter
 
        // Parse the string as JSON to extract the connection string
        const parsedParam = JSON.parse(param);
        const dbUri = parsedParam.dbUri;  // Ensure this matches how your URI is stored in SSM
 
        console.log(`Fetched MongoDB URI: ${dbUri}`); // Log to confirm
 
        // Now use dbUri to connect to your MongoDB database
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
 
        console.log("📡...BillBizz Database Connected Succesfully...📡");
    } catch (error) {
        console.log(`Database connection error: ${error}`);
    }
}
 
// Initialize database connection
connectToDatabase();
