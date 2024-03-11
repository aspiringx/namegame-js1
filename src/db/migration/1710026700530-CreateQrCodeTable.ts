import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQrCodeTable1710026700530 implements MigrationInterface {
    name = 'CreateQrCodeTable1710026700530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`qr_codes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL COMMENT 'Unique hash used for QR code URL.', \`group_id\` bigint UNSIGNED NOT NULL COMMENT 'ID of group or sub-group.', \`user_id\` bigint UNSIGNED NULL COMMENT 'ID of inviter or null for anon group invitation.', \`expires_at\` timestamp NOT NULL COMMENT 'Timestamp when this QR code expires.', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`qr_codes\``);
    }

}
