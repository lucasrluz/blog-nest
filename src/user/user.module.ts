import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { commentProviders } from 'src/comment/comment.providers';
import { postProviders } from 'src/post/post.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    ...userProviders,
    ...commentProviders,
    ...postProviders,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
