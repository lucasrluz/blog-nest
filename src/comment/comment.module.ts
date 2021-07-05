import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from 'src/database/database.module';
import { commentProviders } from './comment.providers';
import { userProviders } from 'src/user/user.providers';
import { postProviders } from 'src/post/post.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    CommentService,
    ...commentProviders,
    ...userProviders,
    ...postProviders,
  ],
  controllers: [CommentController],
})
export class CommentModule {}
