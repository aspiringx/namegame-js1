import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    Index
} from "typeorm";
import { User } from './User';
import { Group } from './Group';

@Entity({ name: "user_connections" })
@Index(['group_id', 'user_id', 'user_id_invitee'])
export class UserConnection {
    @PrimaryGeneratedColumn()
    id!: number;

    // Column comment: ID of the user that was the inviter.
    @OneToOne((type) => User, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user_id!: number;

    // Column comment: ID of the user that was invited.
    @OneToOne((type) => User, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id_invitee' })
    user_id_invitee!: number;

    // Column comment: ID of group in which users are connected.
    @OneToOne((type) => Group)
    @JoinColumn({ name: 'group_id' })
    group_id!: number;

    @Column({ type: 'varchar', comment: 'Relationship between users. Friend, sibling, parent, etc.' })
    relationship!: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date;
}
