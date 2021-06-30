import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { postProviders } from './post.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.providers';

@Module({
    imports: [DatabaseModule],
    providers: [PostService, ...postProviders, ...userProviders],
    controllers: [PostController]
})
export class PostModule {}
