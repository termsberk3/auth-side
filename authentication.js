const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) =>{
    const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token,"secret",(err,user) =>{
            if(err){
                return res.json({message:err});
            }else{
                req.user = user;    
                next();
            }
        })
}

module.exports =isAuthenticated;