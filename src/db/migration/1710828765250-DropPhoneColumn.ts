import { MigrationInterface, QueryRunner } from "typeorm";

export class DropPhoneColumn1710828765250 implements MigrationInterface {
    name = 'DropPhoneColumn1710828765250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`groups\` DROP COLUMN \`mobile_phone\``);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`description\` \`description\` varchar(255) NULL COMMENT 'Group description.'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` ADD \`mobile_phone\` varchar(255) NULL COMMENT 'Group description.'`);
    }

}
