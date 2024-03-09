import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
 } from "typeorm";

@Entity({ name: "qr_codes" })
export class QrCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', comment: 'Unique hash used for QR code URL.' })
    code: string;

    @Column({ type: 'bigint', unsigned: true, comment: 'ID of group or sub-group.' })
    group_id: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true, comment: 'ID of inviter or null for anon group invitation.' })
    user_id: number;

    @Column({ type: "timestamp", comment: 'Timestamp when this QR code expires.' })
    expires_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    // Initialize properties to address TS strict mode.
    epoch = new Date(0);

    constructor() {
        this.id = 0;
        this.group_id = 0;
        this.user_id = 0;
        this.code = ''
        this.expires_at = this.epoch;
        this.created_at = this.epoch;
        this.updated_at = this.epoch;
    }
}
