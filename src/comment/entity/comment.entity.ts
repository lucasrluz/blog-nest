import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id_comment: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'id_post' })
  post: Post;
}
