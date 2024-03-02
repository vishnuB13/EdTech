const jwt = require('jsonwebtoken')
const secretKey = 'secret key'

const authenticateToken=(req,res,next)=>{
    
const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
console.log(token,"in admin authenticate token")
if(!token){
return res.sendStatus(403).json({message:"No token"})
}else{
jwt.verify(token,secretKey,(err,result)=>{
    if(err){
        res.sendStatus(403).json({message:"incorrect token"})
    }
    console.log(result,"result in authenticate token")
    req.admin = result
    next()
})
}
}
module.exports=authenticateToken