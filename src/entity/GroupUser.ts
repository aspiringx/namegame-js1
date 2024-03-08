import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    Index
} from "typeorm"
import { User } from './User';
import { Group } from './Group';

@Entity({ name: "group_users" })
@Index(['user_id', 'group_id'])
export class GroupUser {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne((type) => Group)
    @JoinColumn({ name: 'group_id' })
    group_id: number;

    @OneToOne((type) => User, {onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user_id: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Role of user for permission pruposes.' })
    role: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Title of user in group. Leader, president, etc.' })
    title: string;

    @Column({ type: 'timestamp', nullable: true, comment: 'When user joined up. May be before created_at.' })
    member_since: Date;

    @Column({ type: 'boolean', nullable: true, default: false, comment: 'Leaders are visible to group members before personal connections.' })
    is_leader: boolean;

    @Column({ type: 'boolean', default: true, comment: 'Must be active to be visible.' })
    is_active: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    // Initialize properties to address TS strict mode.
    now = new Date();

    constructor() {
        this.id = 0;
        this.group_id = 0;
        this.user_id = '';
        this.role = '';
        this.title = '';
        this.member_since = this.now;
        this.is_leader = false;
        this.is_active = true;
        this.created_at = this.now;
        this.updated_at = this.now;
    }
}
