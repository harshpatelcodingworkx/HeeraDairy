import { BeforeInsert, Column , Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class USERS {
    @BeforeInsert()
    set(){
        if(this.otp){
            this.otpSentOn = new Date()
        }
    }


    @PrimaryGeneratedColumn() 
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    phoneNo:string

    @Column({
        nullable:true
    })
    profilePicture:string

    @Column({
        enum:["0","1","2"], // 0-> admin 1 ->manager 2-> user
    })
    userType:string

    @Column({
        nullable:true
    })
    otp:string

    @Column({
        nullable:true
    })
    otpSentOn:Date

    @Column({
        nullable:true
    })
    token:string

    @Column({
        nullable:false //  default value
    })
    createdAt:Date

    @Column()
    updatedAt:Date
    
    @Column({
        nullable:true
    })
    deletedAt:Date
}