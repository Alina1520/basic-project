import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUser, UserRole } from "../typing";
import { Contacts } from "./contacts.entity";

@Entity()
export class User implements IUser{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: 'varchar', nullable: false })
	role: UserRole

	@Column({ type: 'varchar', nullable: true, array: true })
	roles: UserRole[]

    @OneToOne(()=>Contacts,cnt=>cnt.user)
    contact:Contacts

	@Column({ type: 'varchar', nullable: false, unique: true })
	email: string

	@Column({ nullable: false })
	name: string

    @Column({ type: 'varchar', nullable: false, select: false })
	password: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    updatedAt: string;
}