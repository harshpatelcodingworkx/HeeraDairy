import { MigrationInterface, QueryRunner } from "typeorm";

export class User1728667539394 implements MigrationInterface {
    name = 'User1728667539394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNo" character varying NOT NULL, "profilePicture" character varying NOT NULL, "otp" character varying NOT NULL, "otpSentOn" TIMESTAMP NOT NULL, "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
