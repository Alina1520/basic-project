import { User } from "src/domain/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contacts{
    @PrimaryGeneratedColumn()
    id:number

    @OneToOne(()=>User,user=>user.contact,{onDelete:"CASCADE"})
    @JoinColumn({name:'userId'})
    user:User

	@Column()
	phoneNumber: string

    @Column() 
	birthday: Date

	@Column()
	country: string

	@Column()
	city: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
    updatedAt: string;
}