import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
 } from "typeorm";

 interface QrCode {
    id: number;
    code: string;
    group_id: number;
    user_id: number;
    expires_at: Date;
 }

@Entity({ name: "qr_codes" })
export class QrCodeEntity implements QrCode {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', comment: 'Unique hash used for QR code URL.' })
    code!: string;

    @Column({ type: 'bigint', unsigned: true, comment: 'ID of group or sub-group.' })
    group_id!: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true, comment: 'ID of inviter or null for anon group invitation.' })
    user_id!: number;

    @Column({ type: "timestamp", comment: 'Timestamp when this QR code expires.' })
    expires_at!: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date;
}
