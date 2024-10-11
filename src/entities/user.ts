import { Column , Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class USERS {
    @PrimaryGeneratedColumn() 
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    phoneNo:string

    @Column()
    profilePicture:string

    @Column()
    otp:string

    @Column()
    otpSentOn:Date

    @Column()
    token:string

    @Column()
    createdAt:Date

    @Column()
    updatedAt:Date

}