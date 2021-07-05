import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';

export class CreateCommentDto {
  content: string;
  user: User;
  post: Post;
}
