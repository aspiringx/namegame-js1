import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupsTable1709885059023 implements MigrationInterface {
    name = 'CreateGroupsTable1709885059023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`groups\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`parent_id\` bigint UNSIGNED NULL COMMENT 'ID of parent group.',
                \`name\` varchar(255) NULL COMMENT 'Common or short group name.',
                \`name_full\` varchar(255) NOT NULL COMMENT 'Formal or long group name.',
                \`slug\` varchar(255) NOT NULL COMMENT 'URL slug for group. Default to lower-case name no spaces.',
                \`description\` varchar(255) NULL, \`mobile_phone\` varchar(255) NULL COMMENT 'Group description.',
                \`logo_url\` varchar(255) NULL COMMENT 'Optional logo image URL.',
                \`is_active\` tinyint NOT NULL COMMENT 'Must be active to be visible.' DEFAULT 1,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_eccfe767267171ae21e7cbf183\` (\`slug\`),
                PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_eccfe767267171ae21e7cbf183\` ON \`groups\``);
        await queryRunner.query(`DROP TABLE \`groups\``);
    }

}
