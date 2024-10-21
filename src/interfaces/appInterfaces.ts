import { Schema, Types } from "mongoose"


interface RequestType<T1, T2, T3> extends Express.Request {
    body: T1,
    query: T2,
    params: T3
    [prop: string]: any
}
interface IUser {
    firstName: string,
    lastName: string,
    phoneNo: string,
    userType?: string
}


interface pagination {
    search?: string,
    page?: number,
    limit?: number,
    sortby?: string,
}

interface IdragAndDrop {
    preProductIdx: number,
    currentProductIdx : number,
    nextProductIdx: number,

}

interface DocId {
    id : Schema.Types.ObjectId
}


interface editProductData {
    name :string,
    image:string,
    price:string
}


interface productData extends editProductData{
    quantityId  : Schema.Types.ObjectId
}


interface IProduct  extends productData{
    indexNumber: number
}

interface base {
    _id :Types.ObjectId,
    __v? :number,
    createdAt: Date,
    updatedAt: Date,
}

interface dbProductData extends base ,IProduct {}
export {
    RequestType,
    IUser,
    pagination,
    IdragAndDrop,
    DocId,
    editProductData,
    productData,
    IProduct,
    dbProductData
}

