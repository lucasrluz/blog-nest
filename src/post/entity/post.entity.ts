import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id_post: number

    @Column()
    title: string

    @Column()
    content: string
}