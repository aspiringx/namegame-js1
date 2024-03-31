import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { UserEntity } from '@entity/UserEntity';
import { GroupEntity } from '@entity/GroupEntity';

interface GroupUser {
    id: number;
    user_id: number;
    group_id: number;
    role: string;
    title: string;
    member_since: Date;
    is_leader: boolean;
    is_active: boolean;
}

@Entity({ name: "group_users" })
@Index(['user_id', 'group_id'], { unique: true })
export class GroupUserEntity implements GroupUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserEntity, user => user.group_users, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({name: 'user_id'})
    user_id!: number;

    @ManyToOne(() => GroupEntity, group => group.group_users, { nullable: false })
    @JoinColumn({name: 'group_id'})
    group_id!: number;

    @Column({ type: 'varchar', nullable: true, comment: 'Role of user for permission pruposes.' })
    role!: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Title of user in group. Leader, president, etc.' })
    title!: string;

    @Column({ type: 'timestamp', nullable: true, comment: 'When user joined up. May be before created_at.' })
    member_since!: Date;

    @Column({ type: 'boolean', nullable: true, default: false, comment: 'Leaders are visible to group members before personal connections.' })
    is_leader!: boolean;

    @Column({ type: 'boolean', default: true, comment: 'Must be active to be visible.' })
    is_active!: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date;
}
