import { MigrationInterface, QueryRunner } from "typeorm";

export class SetGroupUserTableGroupIdToCascadeOnDelete1712389805987 implements MigrationInterface {
    name = 'SetGroupUserTableGroupIdToCascadeOnDelete1712389805987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_be6db0d7dabab05d97233d19f61\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_be6db0d7dabab05d97233d19f61\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_users\` DROP FOREIGN KEY \`FK_be6db0d7dabab05d97233d19f61\``);
        await queryRunner.query(`ALTER TABLE \`group_users\` ADD CONSTRAINT \`FK_be6db0d7dabab05d97233d19f61\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
