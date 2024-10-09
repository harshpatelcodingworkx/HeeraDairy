const jwt = require("jsonwebtoken");
const { AppError } = require("../middleware/handleError");
const tokenSecreteKey = process.env.JWTTOKENKEY;


const generateToken = (userId , expiry)=>{
    const payload = {
        id : userId
    }

    const token = jwt.sign(payload ,tokenSecreteKey,{ expiresIn : expiry});

    return token;
}

const verifyToken = (token, next)=>{
    try {
        const payload = jwt.verify(token , tokenSecreteKey);
        return payload;
    } catch (err) {
        return next(new AppError(400, "Invalid Token"));
    }
}

module.exports ={
    generateToken,
    verifyToken
}