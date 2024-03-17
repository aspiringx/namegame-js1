import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"

@Entity({ name: "groups" })
export class Group {

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

    @Column({ type: 'varchar', nullable: true })
    description!: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Group description.' })
    mobile_phone!: string;

    @Column({ type: 'varchar', nullable: true, comment: 'Optional logo image URL.' })
    logo_url!: string;

    @Column({ type: 'boolean', default: true, comment: 'Must be active to be visible.' })
    is_active!: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at!: Date;
}
