import { User } from 'src/user/entity/user.entity';

export class CreatePostDto {
  title: string;
  content: string;
  user: User;
}
