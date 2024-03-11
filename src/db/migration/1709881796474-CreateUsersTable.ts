import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1709881796474 implements MigrationInterface {
    name = 'CreateUsersTable1709881796474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`users\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`first_name\` varchar(100) NOT NULL,
            \`last_name\` varchar(100) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`email_verified_at\` timestamp NULL,
            \`photo_url\` varchar(255) NULL,
            \`mobile_phone\` varchar(255) NULL,
            \`mobile_phone_verified_at\` timestamp NULL,
            \`mobile_phone_carrier\` varchar(255) NULL,
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
            PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
