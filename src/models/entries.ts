import { model, Schema } from "mongoose"
import {  entryInterface } from "../interfaces/appInterfaces"

const entrySchema = new Schema<entryInterface>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "products",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "users",
            required : true
		},
		dataOfPurchasing: {
			type: Date,
			required: true,
		},
        createdBy:{
            type :String ,
            enum :['0','1'], //// 0->admin, 1-> manager,
            required : true
        }
	},
	{
		timestamps: true,
	}
);


const entry = model<entryInterface>('entries', entrySchema);

export default entry;