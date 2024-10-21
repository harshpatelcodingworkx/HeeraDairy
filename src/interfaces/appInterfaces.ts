import { Request } from "express"


interface IUser {
    firstName:string,
    lastName:string,
    phoneNo:string,
    userType?: string
}


interface RequestType extends Request  {
    [prop: string]: any
} 



interface pagination  {
    search?: string,
    page?:number,
    limit?:number,
    sortby?:string,
}


export {
    IUser,
    RequestType,
    pagination,
}

