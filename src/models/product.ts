import { model, Schema } from "mongoose";
import { IProduct } from "../interfaces/appInterfaces";


const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
    quantityId: {
        type: Schema.Types.ObjectId,
        ref:'units', 
        required: true,
    },
    indexNumber:{
        type:Number,
        required:true,
    }
},
    {
        timestamps: true
    }
);

export const product = model<IProduct>('products', productSchema);