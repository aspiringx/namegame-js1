import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserUsersTable1710035444046 implements MigrationInterface {
    name = 'CreateUserUsersTable1710035444046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE \`user_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`relationship\` varchar(255) NOT NULL COMMENT 'Relationship between users. Friend, sibling, parent, etc.', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`user_id_invitee\` int NULL, \`group_id\` int NULL, UNIQUE INDEX \`IDX_ae3deffdbd586827be02ce75cb\` (\`group_id\`, \`user_id\`, \`user_id_invitee\`), UNIQUE INDEX \`REL_c7efd3aae057b64915ac8808b5\` (\`user_id\`), UNIQUE INDEX \`REL_99b6f029d834ecf1484dc385ae\` (\`user_id_invitee\`), UNIQUE INDEX \`REL_8b0c97716304ab7fd25afff506\` (\`group_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`relationship\` varchar(255) NOT NULL DEFAULT 'friend' COMMENT 'Relationship between users. Friend, sibling, parent, etc.', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, \`user_id_invitee\` int NOT NULL, \`group_id\` int NOT NULL, UNIQUE INDEX \`IDX_ae3deffdbd586827be02ce75cb\` (\`group_id\`, \`user_id\`, \`user_id_invitee\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_users\` ADD CONSTRAINT \`FK_c7efd3aae057b64915ac8808b59\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_users\` ADD CONSTRAINT \`FK_99b6f029d834ecf1484dc385ae0\` FOREIGN KEY (\`user_id_invitee\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_users\` ADD CONSTRAINT \`FK_8b0c97716304ab7fd25afff5067\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_users\` DROP FOREIGN KEY \`FK_8b0c97716304ab7fd25afff5067\``);
        await queryRunner.query(`ALTER TABLE \`user_users\` DROP FOREIGN KEY \`FK_99b6f029d834ecf1484dc385ae0\``);
        await queryRunner.query(`ALTER TABLE \`user_users\` DROP FOREIGN KEY \`FK_c7efd3aae057b64915ac8808b59\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae3deffdbd586827be02ce75cb\` ON \`user_users\``);
        await queryRunner.query(`DROP TABLE \`user_users\``);
    }

}
