import jwt from 'jsonwebtoken';

const SECRET_KEY =  process.env.JWT_SECRET || '';

export interface UserPayload{
    UserId: string;
    UserRole: string;
}

export const generateToken = (userPayload: UserPayload) => {
    if(!SECRET_KEY){
        throw new Error('Secret key not defined');
    }

    if(userPayload.UserRole == 'admin'){
        return jwt.sign(userPayload, SECRET_KEY, {expiresIn: '2h'});
    }

    const token = jwt.sign(userPayload, SECRET_KEY, {expiresIn: '2h'});
    return token;
}

export const verifyToken = (token: string):UserPayload=>{
    try{
        return jwt.verify(token, SECRET_KEY) as UserPayload;
    }catch(err){
        throw new Error('Invalid token');
    }
}