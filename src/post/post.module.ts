import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { userProviders } from 'src/user/user.providers';

@Module({
  providers: [PostService, ...userProviders],
  controllers: [PostController]
})
export class PostModule {}
