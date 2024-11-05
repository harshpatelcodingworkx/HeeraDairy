import { model, Schema } from "mongoose"
import { unitInterface } from "../interfaces/appInterfaces";

const unitsSchema = new Schema<unitInterface>(
	{
		unitName: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);


export const unit = model('units',unitsSchema);
