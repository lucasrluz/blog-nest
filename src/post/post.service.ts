import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { IPost } from './interface/post.interface';

@Injectable()
export class PostService {
    constructor(
        @Inject('POST_REPOSITORY') private postRepository: Repository<Post>,
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>
    ) {}

    async savePost(id_user: number, post: IPost) {
        const postValidate = await this.postRepository.findOne({ title: post.title });
        
        if (postValidate !== undefined) {
            throw new InternalServerErrorException('Este título já está em uso');
        }

        const user = await this.userRepository.findOne(id_user);

        post.user = user;
        
        return this.postRepository.insert(post);
    }
}
