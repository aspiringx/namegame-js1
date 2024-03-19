import { MigrationInterface, QueryRunner } from "typeorm";

export class RestructureGroupsAndUsersManyToManyJunctionTableRelationAndIndex1710825537484 implements MigrationInterface {
    name = 'RestructureGroupsAndUsersManyToManyJunctionTableRelationAndIndex1710825537484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_eba8af4e65056abb4c5f62556c6\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_be6db0d7dabab05d97233d19f61\``);
        await queryRunner.query(`DROP INDEX \`REL_be6db0d7dabab05d97233d19f6\` ON \`group_users\``);
        await queryRunner.query(`DROP INDEX \`REL_eba8af4e65056abb4c5f62556c\` ON \`group_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_36620c8747186b00c458893c59\` ON \`group_users\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`group_id\` \`group_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`group_id\` \`group_id\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_36620c8747186b00c458893c59\` ON \`group_users\` (\`user_id\`, \`group_id\`)`);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_eba8af4e65056abb4c5f62556c6\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_be6db0d7dabab05d97233d19f61\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_be6db0d7dabab05d97233d19f61\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_eba8af4e65056abb4c5f62556c6\``);
        await queryRunner.query(`DROP INDEX \`IDX_36620c8747186b00c458893c59\` ON \`group_users\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`group_id\` \`group_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`group_id\` \`group_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`group_users\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_36620c8747186b00c458893c59\` ON \`group_users\` (\`user_id\`, \`group_id\`)`);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_be6db0d7dabab05d97233d19f61\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_eba8af4e65056abb4c5f62556c6\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_eba8af4e65056abb4c5f62556c\` ON \`group_users\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_be6db0d7dabab05d97233d19f6\` ON \`group_users\` (\`group_id\`)`);
    }

}
