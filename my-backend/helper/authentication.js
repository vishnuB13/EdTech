const jwt = require('jsonwebtoken')
const secretKey = 'secret key'

const authenticateToken = (requiredRole) => (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        console.log(token,"token in authenticate token")

        if (!token || token === 'undefined') {
            return res.json({ message: 'Authorization header missing or invalid' });
        }
        jwt.verify(token, secretKey, (err, result) => {
            if (err) {
                console.error(err, "Error in verifying token");
                return res.json({ message: 'Invalid token' });
            }
            else   if (requiredRole && result.role !== requiredRole){
                return res.status(403).json({ message: 'Insufficient permissions' });
            }
           else{
            console.log(result, "Result in authenticate token");
            req.user = result;
            req.user.role=result.role
             next();
           }
               
            
          
        });
    } catch (error) {
        console.error(error, "Error in authenticate middleware");
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authenticateToken;
