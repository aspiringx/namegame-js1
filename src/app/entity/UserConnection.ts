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
import { UserEntity } from '@entity/UserEntity';
import { Group } from '@entity/Group';

@Entity({ name: "user_connections" })
@Index(['group_id', 'user_id', 'user_id_invitee'], { unique: true })
export class UserConnection {
    @PrimaryGeneratedColumn()
    id!: number;

    // Column comment: ID of the user that was the inviter.
    @OneToOne((type) => UserEntity, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user_id!: number;

    // Column comment: ID of the user that was invited.
    @OneToOne((type) => UserEntity, {onDelete: "CASCADE"})
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
