import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGroupUserTable1709941511910 implements MigrationInterface {
    name = 'CreateGroupUserTable1709941511910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(255) NULL COMMENT 'Role of user for permission pruposes.', \`title\` varchar(255) NULL COMMENT 'Title of user in group. Leader, president, etc.', \`member_since\` timestamp NULL COMMENT 'When user joined up. May be before created_at.', \`is_leader\` tinyint NULL COMMENT 'Leaders are visible to group members before personal connections.' DEFAULT 0, \`is_active\` tinyint NOT NULL COMMENT 'Must be active to be visible.' DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`group_id\` int NULL, \`user_id\` int NULL, INDEX \`IDX_36620c8747186b00c458893c59\` (\`user_id\`, \`group_id\`), UNIQUE INDEX \`REL_be6db0d7dabab05d97233d19f6\` (\`group_id\`), UNIQUE INDEX \`REL_eba8af4e65056abb4c5f62556c\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_be6db0d7dabab05d97233d19f61\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_eba8af4e65056abb4c5f62556c6\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_eba8af4e65056abb4c5f62556c6\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_be6db0d7dabab05d97233d19f61\``);
        await queryRunner.query(`DROP INDEX \`REL_eba8af4e65056abb4c5f62556c\` ON \`group_users\``);
        await queryRunner.query(`DROP INDEX \`REL_be6db0d7dabab05d97233d19f6\` ON \`group_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_36620c8747186b00c458893c59\` ON \`group_users\``);
        await queryRunner.query(`DROP TABLE \`group_users\``);
    }

}
