import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule, PostModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
