import { MigrationInterface, QueryRunner } from "typeorm";

export class User1728899946830 implements MigrationInterface {
    name = 'User1728899946830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_usertype_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNo" character varying NOT NULL, "profilePicture" character varying, "userType" "public"."users_usertype_enum" NOT NULL, "otp" character varying, "otpSentOn" TIMESTAMP, "token" character varying, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "UQ_8fa17b55b91f0e4b348e1472a13" UNIQUE ("phoneNo"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_usertype_enum"`);
    }

}
