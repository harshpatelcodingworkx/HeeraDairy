import { Request, Response } from "express";

const login = (req : Request , res: Response)=>{
    res.status(200).json({
        status:"Success",
    });
}


export {
    login,
}
