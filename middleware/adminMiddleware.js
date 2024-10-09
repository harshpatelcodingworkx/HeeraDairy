const { AppError } = require("./handleError");

const authadmin = async (req , res , next)=>{
    const bearerToken = req.headers['authorization'];

    const token = bearerToken?.split(" ")[1];
    const { id } = verifyToken(token);

    if(id === "invalid token"){
        return next(new AppError(400, "Invalid token"));
    }
    
    const userByPk = await users.findByPk(id, 
        { 
            attributes:{
                exclude:['createdAt','deletedAt','updatedAt']
            },
            raw: true 
        }
    );

    if(userByPk.token === token && userByPk.userType === '0'){
        next();
    }

    return res.status().json({
        status:"Failure",
    });
}

module.exports = authadmin;