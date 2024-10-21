import { Request, Response, NextFunction } from "express";
import { product } from "../models/product";
import { BackendError } from "../middlewares/errorHandler";
import { DocId, editProductData, IdragAndDrop, IProduct, pagination, RequestType } from "../interfaces/appInterfaces"

const addProduct = async (req: RequestType<IProduct, unknown, unknown>, res: Response, next: NextFunction) => {
    const { name, image, price, quantityId } = req.body;
    const productData = await product.findOne().sort({ indexNumber: -1 });

    const indexNumber = productData ? productData.indexNumber + 1000 : 1000;
    const response = await product.create({
        name,
        image,
        price,
        quantityId,
        indexNumber,
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
    const { search, limit, page, sortby: sortBy = "indexNumber" }: pagination = req.query;
    const sortOrder = req.query.sortorder === 'asc' ? 1 : -1; // by default descending order
    const limits = limit ? Number(limit) : 5 // by limit = 5
    const skip = page ? (Number(page) - 1) * limits : 0;

    const searchRegex = new RegExp(search ? search : '', 'i');
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

const editProduct = async (req: RequestType<editProductData, unknown, DocId>, res: Response, next: NextFunction) => {
    const { userType } = req.user
    if (userType !== '0') {
        return next(new BackendError(400, "Unauthorized user"));
    }

    const { name, image, price } = req.body;
    const productId = req.params.id;

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

const dragAndDrop = async (req: RequestType<unknown, IdragAndDrop, unknown>, res: Response, next: NextFunction) => {
    const { userType } = req.user
    if (userType !== '0') {
        return next(new BackendError(400, "Unauthorized user"));
    }

    const { preProductIdx, nextProductIdx, currentProductIdx } = req.query;

    const preProduct = await product.findById(preProductIdx);
    const nextProduct = await product.findById(nextProductIdx);

    if (!preProduct && !nextProduct) {
        return next(new BackendError(500, "Unable to find product details"));
    }

    let newIdx;
    if(!nextProduct && preProduct){ // dropped at last 
        newIdx = preProduct.indexNumber -  1000;
    }
    else if(nextProduct && !preProduct){ // dropped at beginning
        newIdx = nextProduct.indexNumber +  1000;
    }
    else if(nextProduct && preProduct){ // dropped in middle
        newIdx = (preProduct.indexNumber + nextProduct.indexNumber) / 2 ;
    }

    await product.findByIdAndUpdate(currentProductIdx, {
        indexNumber: newIdx
    })

    res.status(200).json({
        status: "Success",
        message: "Product list updated successfully",
    });
}

const deleteProduct = async (req: RequestType<unknown, unknown, DocId>, res: Response, next: NextFunction) => {
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
    dragAndDrop,
}