import { NextFunction, Request, Response } from "express"
import { user } from "../models/user"
import { BackendError } from "../middlewares/errorHandler"
import {
	entryInterface,
	listUserInterface,
	pagination,
	RequestType,
} from "../interfaces/appInterfaces"
import entry from "../models/entries"
import { unit } from "../models/units"

const addUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firstName, lastName, phoneNo, userType = 2 } = req.body

		const existingPhoneNo = await user.findOne({
			phoneNo: phoneNo,
		})

		if (existingPhoneNo) {
			return next(new BackendError(500, "Number already exist"))
		}

		const result = await user.create({
			firstName,
			lastName,
			phoneNo,
			userType,
		})

		if (!result) {
			return next(new BackendError(500, "Unable to add user"))
		}

		res.status(201).json({
			status: "Success",
			message: "Successfully added user",
			result: {},
		})
	} catch (err: any) {
		console.log("error", err)
	}
}

const listUsers = async (
	req: RequestType<unknown, pagination, unknown>,
	res: Response
) => {
	const { search = "" } = req.query
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10

	const skip = (page - 1) * limit
	const val = search.match(/[a-zA-Z]*/g)?.join("")

	const searchRegex = new RegExp(val ? val : search, "i")
	const searchBy = val ? "firstName" : "phoneNo"

	// console.log("searchBy", searchBy)
	// console.log("val", val)
	const [userList] = await user.aggregate<listUserInterface>([
		{
			$match: { [searchBy]: { $regex: searchRegex } },
		},
		{
			$facet: {
				data: [{ $sort: { firstName: 1 } }, { $skip: skip }, { $limit: limit }],
				totalUsers: [{ $count: "count" }],
			},
		},
	])

	res.status(200).json({
		status: "Success",
		totalUsers: userList.totalUsers[0],
		result: userList.data,
	})
}

const addEntries = async (
	req: RequestType<Array<entryInterface>, unknown, unknown>,
	res: Response,
	next: NextFunction
) => {
	if (req.user.userType === "2") {
		return next(new BackendError(400, "Unauthorized"))
	}

	req.body.forEach((entry) => {
		entry.createdBy = req.user.userType
	})

	const entries = await entry.insertMany(req.body)

	res.status(200).json({
		status: "Status",
		message: "Entries added successfully",
		result: entries,
	})
}

const addUnits = async (req: Request, res: Response, next: NextFunction) => {
	const response = await unit.insertMany(req.body)

	if (!response) {
		return next(new BackendError(500, "unable to add units"))
	}
	res.status(200).json({
		status: "success",
		message: "Units added successfully",
	})
}

export { addUser, listUsers, addEntries, addUnits }
