import {
    MigrationInterface,
    QueryRunner,
    Table,
} from "typeorm"

export class QuestionRefactoringTIMESTAMP implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "firstName",
                        type: "varchar",
                    },
                    {
                        name: "lastName",
                        type: "varchar",
                    },
                    {
                        name: "phoneNo",
                        type: "varchar",
                    },
                    {
                        name: "profilePicture",
                        type: "varchar",
                    },
                    {
                        name: "otp",
                        type: "varchar",
                    },
                    {
                        name: "otpSentOn",
                        type: "date",
                    },
                    {
                        name: "token",
                        type: "varchar",
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
            }))
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}