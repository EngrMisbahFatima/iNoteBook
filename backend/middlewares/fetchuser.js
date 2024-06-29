var jwt = require('jsonwebtoken');
var JWT_SECRET = "misbahfatima"

const fetchuser = (req, res, next) => {

    // get authentication token
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({error: 'Plaese use a valid token to authenticate a user.'})
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } 
    
    catch (error) {
        return res.status(401).send({error: 'Plaese use a valid token to authenticate a user.'})
    }
    
}

module.exports = fetchuser;