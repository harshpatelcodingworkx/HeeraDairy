import { Request, Response, NextFunction, RequestHandler } from "express";
import { product } from "../models/product";
import { BackendError } from "../middlewares/errorHandler";
import { pagination, RequestType } from "../interfaces/appInterfaces"

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name, image, price, quantityId } = req.body;

    const response = await product.create({
        name,
        image,
        price,
        quantityId
    });

    if (!response) {
        return next(new BackendError(500, "Unable to add product"));
    }


    res.status(201).json({
        status: "Success",
        message: "Product added successfully",
        result: response
    });
}


const productList = async (req: Request, res: Response) => {
    const { search, limit, page, sortby: sortBy = "createdAt" }: pagination = req.query;
    const sortOrder = req.query.sortorder === 'asc' ? 1 : -1; // by default descending order
    const limits = limit ? Number(limit) : 5 // by limit = 5
    const skip = page ? (Number(page) - 1) * limits : 0;

    const searchRegex = new RegExp(search ? search : '' , 'i');
    const [products] = await product.aggregate([
        {
            $match: { name: { $regex: searchRegex } }
        },
        {
            $facet: {
                data: [{ $sort: { [sortBy]: sortOrder } }, { $skip: skip }, { $limit: limits }],
                totalCount: [{ $count: "count" }]
            }
        }
    ]);

    res.status(200).json({
        status: "Success",
        totalProduct: products.totalCount,
        result: products.data
    });
}

const editProduct = async (req: RequestType, res: Response, next: NextFunction) => {
    const { userType } = req.user
    if (userType !== '0') {
        return next(new BackendError(400, "Unauthorized user"));
    }

    const { name, image, price } = req.body;
    const productId = req.params.id;
    console.log(name, image, price, productId);

    await product.findByIdAndUpdate(productId, {
        ...(name?.length && { name }),
        ...(image?.length && { image }),
        ...(price?.length && { price }),
    })


    res.status(200).json({
        status: "Success",
        message: "Product updated successfully",
    });
}


const deleteProduct = async (req: RequestType, res: Response, next: NextFunction) => {
    const { userType } = req.user
    if (userType !== '0') {
        return next(new BackendError(400, "Unauthorized user"));
    }

    const productId = req.params.id;

    await product.findByIdAndDelete(productId);

    res.status(200).json({
        status: "Success",
        message: "Product deleted successfully",
    })
}
export {
    addProduct,
    productList,
    editProduct,
    deleteProduct,
}