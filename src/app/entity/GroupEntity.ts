import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { GroupUser } from "@entity/GroupUser";

interface Group {
    id: number;
    parent_id: number;
    name: string;
    name_full: string;
    slug: string;
    description: string;
    logo_url: string;
    is_active: boolean;
}

@Entity({ name: "groups" })
export class GroupEntity implements Group {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'bigint', unsigned: true, nullable: true, comment: 'ID of parent group.' })
    parent_id!: number;

    @Column({ type: 'varchar', nullable: true, comment: 'Common or short group name.' })
    name!: string;

    @Column({ type: 'varchar', comment: 'Formal or long group name.' })
    name_full!: string;

    @Column({ type: 'varchar', unique: true, comment: 'URL slug for group. Default to lower-case name no spaces.' })
    slug!: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Group description.' })
    description!: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Optional logo image URL.' })
    logo_url!: string;

    @Column({ type: 'boolean', default: true, comment: 'Must be active to be visible.' })
    is_active!: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date;

    @OneToMany(() => GroupUser, group_user => group_user.group_id)
    group_users!: GroupUser[];
}
