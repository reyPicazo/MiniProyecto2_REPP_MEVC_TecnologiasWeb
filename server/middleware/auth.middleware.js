const verifyUser = (req, res, next) =>{
    const user = req.headers['x-user'];
    if(!user || user.trim() ==''){
        return res.status(401).json({message: 'Usuario no autorizado'});

    }
    next();
}

module.exports={verifyUser};