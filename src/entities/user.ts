import {    Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type UserRoleType = "0" | "1" | "2" // 0-> admin 1 ->manager 2-> user

@Entity()
export default class USERS {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({
        unique: true
    })
    phoneNo: string

    @Column({
        nullable: true
    })
    profilePicture: string

    @Column({
        type: "enum",
        enum: ['0', '1', '2'] // 0-> admin 1 ->manager 2-> user
    })
    userType: UserRoleType

    @Column({
        nullable: true,
    })
    otp: string

    @Column({
        nullable: true,
    })
    otpSentOn: Date

    @Column({
        nullable: true
    })
    token: string

    @Column({
        nullable: false //  default value
    })
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column({
        nullable: true
    })
    deletedAt: Date
}