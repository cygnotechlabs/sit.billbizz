// // authMiddleware.js

// function verifyToken(req, res, next) {
//     // Extract token from Authorization header
//     const bearerHeader = req.headers['authorization'];
    
//     if (typeof bearerHeader !== 'undefined') {
//         // Split the header into parts
//         const bearerToken = bearerHeader.split(' ')[1];
//         // console.log(bearerToken)
        
//         req.token = bearerToken; // Set the token in the request object
//         next();
//     } else {
//         // If there is no token, return a 403 Forbidden response
//         res.sendStatus(403);
//     }
// }

// module.exports = { verifyToken };



const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; 

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        
        jwt.verify(req.token, secretKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

module.exports = { verifyToken };
