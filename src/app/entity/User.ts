import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { GroupUser } from '@entity/GroupUser';

@Entity({ name: "users" })
export class User {

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

    @OneToMany(() => GroupUser, group_user => group_user.users)
    group_users!: GroupUser[];
}
