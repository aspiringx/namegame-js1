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
import { User } from './User';
import { Group } from './Group';

@Entity({ name: "group_users" })
@Index(['users', 'groups'])
export class GroupUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.group_users, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({name: 'user_id'})
    users!: number;

    @ManyToOne(() => Group, group => group.group_users, { nullable: false })
    @JoinColumn({name: 'group_id'})
    groups!: number;

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
