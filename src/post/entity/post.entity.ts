import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id_post: number

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: "id_user" })
    user: User;
}