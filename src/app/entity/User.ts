import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100 })
    first_name: string

    @Column({ type: 'varchar', length: 100 })
    last_name: string

    @Column({ type: 'varchar', unique: true })
    email: string

    @Column({ type: 'timestamp', nullable: true })
    email_verified_at: Date

    @Column({ type: 'varchar', nullable: true })
    photo_url: string

    @Column({ type: 'varchar', nullable: true })
    mobile_phone: string

    @Column({ type: 'timestamp', nullable: true })
    mobile_phone_verified_at: Date

    @Column({ type: 'varchar', nullable: true })
    mobile_phone_carrier: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    // Initialize properties to address TS strict mode
    epoch = new Date();

    constructor() {
        this.id = 0;
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.email_verified_at = this.epoch;
        this.photo_url = '';
        this.mobile_phone = '';
        this.mobile_phone_verified_at = this.epoch;
        this.mobile_phone_carrier = '';
        this.created_at = this.epoch;
        this.updated_at = this.epoch;
    }
}
