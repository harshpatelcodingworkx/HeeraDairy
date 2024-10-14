import jwt, { Secret, JwtPayload} from 'jsonwebtoken';
import { BackendError } from '../middlewares/errorHandling';

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
    try {
        const payload  = jwt.verify(token, SECRET_KEY);
        return payload as myPayload;
    } catch (err : any) {
        throw new BackendError(400 , err.stack?.split('\n')[0].split(":")[1]);
        
    }
}

export{
    generateToken,
    verifyToken
}