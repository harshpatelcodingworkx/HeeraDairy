import jwt, { Secret, JwtPayload} from 'jsonwebtoken';

const SECRET_KEY : Secret = process.env.SECRET_KEY? process.env.SECRET_KEY : 'something';

interface myPayload {
    id:number
}
const generateToken = (userId : number , expire : string ) : string =>{

    const payload : JwtPayload = {
        id : userId
    }

    const token = jwt.sign(payload , SECRET_KEY , {expiresIn : expire});

    return token;
}


const verifyToken = (token : string) =>{
    const payload  = jwt.verify(token, SECRET_KEY);
    return payload as myPayload;
}

export{
    generateToken,
    verifyToken
}