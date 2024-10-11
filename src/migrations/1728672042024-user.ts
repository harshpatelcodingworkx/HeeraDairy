import { MigrationInterface, QueryRunner } from "typeorm";

export class User1728672042024 implements MigrationInterface {
    name = 'User1728672042024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "otp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "otpSentOn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "token" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "otpSentOn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "otp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profilePicture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userType"`);
    }

}
