import { Schema, Types } from "mongoose"
import { Response } from "express"
import { Application } from "twilio/lib/twiml/VoiceResponse"

interface RequestType<T1, T2, T3> extends Express.Request {
	body: T1
	query: T2
	params: T3
	[prop: string]: any
}
interface IUser {
	firstName: string
	lastName: string
	phoneNo: string
	userType?: string
}

interface pagination {
	search: string | undefined
	page: number | undefined
	limit: number | undefined
	sortby: string | undefined
	sortorder: string | undefined
}

interface IdragAndDrop {
	preProductIdx: number
	currentProductIdx: number
	nextProductIdx: number
}

interface DocId {
	id: Schema.Types.ObjectId
}

interface editProductData {
	name: string
	image: string
	price: string
}

interface productData extends editProductData {
	quantityId: Schema.Types.ObjectId
}

interface IProduct extends productData {
	indexNumber: number
}

interface base {
	_id: Types.ObjectId
	__v?: number
	createdAt: Date
	updatedAt: Date
}

interface dbProductData extends base, IProduct {}

interface listUserInterface {
	data: Array<IUser>
	totalUsers: Array<{ count: number }>
}

interface returnRes {
    status : string,
    result? : object,
    message?: string,
}
interface ResponseType<T1, T2> extends Response {
	ResBody: T1
	ResLocals: T2
}

interface myApplication<T1 , T2> extends Express.Application {
	[prop: string]: any
}
export {
	RequestType,
	IUser,
	pagination,
	IdragAndDrop,
	DocId,
	editProductData,
	productData,
	IProduct,
	dbProductData,
	listUserInterface,
	ResponseType,
	myApplication,
}
