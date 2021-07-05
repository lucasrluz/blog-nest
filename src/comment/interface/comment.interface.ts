import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';

export interface IComment {
  content: string;
  user: User;
  post: Post;
}
