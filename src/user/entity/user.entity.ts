import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_user: number

    @Column()
    username: string

    @Column()
    password: string
}