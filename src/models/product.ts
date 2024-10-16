import { model, Schema } from "mongoose";

interface IProduct {
    name: string,
    image: string,
    price: number,
    quantityId: Schema.Types.ObjectId,
}

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
        type: Number,
        required: true,
    },
    quantityId: {
        type: Schema.Types.ObjectId,
        ref:'units',
        required: true,
    },
},
    {
        timestamps: true
    }
);


export const product = model<IProduct>('products', productSchema);