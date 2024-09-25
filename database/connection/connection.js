const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB)
.then(()=>{
    console.log("📡...BillBizz Database Connected Succesfully...📡");
}).catch((error)=>{
    console.log(`Database error ${error}`);
})






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
//         const param = await getParameter(); // Get the secure string parameter
//         console.log("param:",param);
        
 
//         // Parse the string as JSON to extract the connection string
//         const parsedParam = JSON.parse(param);
//         const dbUri = parsedParam.dbUri;  // Ensure this matches how your URI is stored in SSM
//         console.log("dbUri:",dbUri);
        
 
//         console.log(`Fetched MongoDB URI: ${dbUri}`); // Log to confirm
 
//         // Now use dbUri to connect to your MongoDB database
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




























// const mongoose = require('mongoose');
// const AWS = require('aws-sdk');

// // Configure AWS SDK with region
// const region = 'ap-south-1'; // Your AWS region
// AWS.config.update({ region });

// // Create an instance of the SSM (Systems Manager) client
// const ssm = new AWS.SSM();

// async function getDbCredentials() {
//   try {
//     // Fetch the parameter from AWS Parameter Store (with decryption enabled)
//     const params = {
//       Name: 'billbizz_DB1', // Replace with your parameter name
//       WithDecryption: true, // Ensure KMS decryption is used
//     };

//     const result = await ssm.getParameter(params).promise();
//     const credentials = result.Parameter.Value;
//     console.log('Fetched credentials:', credentials);
    
//     // Parse the string as JSON to extract the connection string
//     const parsedCredentials = JSON.parse(credentials);
//     return parsedCredentials.dbUri;  // Ensure this matches how your URI is stored in SSM
//   } catch (error) {
//     console.error('Error fetching credentials from Parameter Store:', error);
//     throw error;
//   }
// }

// async function connectToDatabase() {
//   try {
//     const dbUri = await getDbCredentials();
//     console.log(`Fetched MongoDB URI: ${dbUri}`);

//     // Now use dbUri to connect to your MongoDB database
//     await mongoose.connect(dbUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("📡...BillBizz Database Connected Successfully...📡");
//   } catch (error) {
//     console.log(`Database connection error: ${error}`);
//   }
// }

// // Initialize database connection
// connectToDatabase();

