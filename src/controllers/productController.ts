import { Request, Response, NextFunction } from "express";
import { product } from "../models/product";
import { BackendError } from "../middlewares/errorHandler";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name, image, price, quantity } = req.body;

    const response = await product.create({
        name,
        image,
        price,
        quantity
    });

    if(!response){
        return next(new BackendError(500,"Unable to add product"));
    }
    
    
    res.status(201).json({
        status: "Success",
        message:"Product added successfully",
        result:response
    });
}

export {
    addProduct,
}