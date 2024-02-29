const jwt = require('jsonwebtoken')
const secretKey = 'secret key'

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        console.log(token,"token in authenticate token")

        if (!token) {
            return res.json({ message: 'Authorization header missing' });
        }
        else if(token==='undefined'){
           return res.json({message:'not logged'})
        }

        jwt.verify(token, secretKey, (err, result) => {
            if (err) {
                console.error(err, "Error in verifying token");
                return res.json({ message: 'Invalid token' });
            }

            console.log(result, "Result in authenticate token");
            req.user = result;
            next();
        });
    } catch (error) {
        console.error(error, "Error in authenticate middleware");
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = authenticateToken;
