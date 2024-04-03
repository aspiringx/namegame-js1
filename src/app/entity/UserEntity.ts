import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { GroupUserEntity } from '@entity/GroupUserEntity';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: Date;
    photo_url: string;
    mobile_phone: string;
    mobile_phone_verified_at: Date;
    mobile_phone_carrier: string;
}

@Entity({ name: "users" })
export class UserEntity implements User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    first_name!: string;

    @Column({ type: 'varchar', length: 100 })
    last_name!: string;

    @Column({ type: 'varchar', unique: true })
    email!: string;

    @Column({ type: 'timestamp', nullable: true })
    email_verified_at!: Date;

    @Column({ type: 'varchar', nullable: true })
    photo_url!: string;

    @Column({ type: 'varchar', nullable: true })
    mobile_phone!: string;

    @Column({ type: 'timestamp', nullable: true })
    mobile_phone_verified_at!: Date;

    @Column({ type: 'varchar', nullable: true })
    mobile_phone_carrier!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date;

    @OneToMany(() => GroupUserEntity, group_user => group_user.user_id)
    group_users!: GroupUserEntity[];
}
