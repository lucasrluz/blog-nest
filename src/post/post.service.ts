import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { IPost } from './interface/post.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY') private postRepository: Repository<Post>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async savePost(id_user: number, post: IPost) {
    const postValidate = await this.postRepository.findOne({
      title: post.title,
    });

    if (postValidate !== undefined) {
      throw new InternalServerErrorException('Este título já está em uso');
    }

    const user = await this.userRepository.findOne(id_user);

    post.user = user;

    return this.postRepository.insert(post);
  }
  async findAll() {
    return this.postRepository.find();
  }

  async findById(id_post: number) {
    const post = await this.postRepository.findOne(id_post);

    if (post === undefined) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async findByUser(username: string) {
    const user = await this.userRepository.findOne({ username: username });

    return await this.postRepository.find({
      where: { user: { id_user: user.id_user } },
    });
  }

  async editPost(id_user: number, id_post: number, post: IPost) {
    const postValidate = await this.postRepository.findOne({
      where: { id_post: id_post, user: { id_user: id_user } },
    });

    if (postValidate === undefined) {
      throw new NotFoundException('Usuário ou Post não encontrado');
    }

    const postNameValidate = await this.postRepository.findOne({
      title: post.title,
    });

    if (postNameValidate !== undefined) {
      throw new InternalServerErrorException('Este título já está em uso');
    }

    const user = await this.userRepository.findOne(id_user);

    post.user = user;

    return this.postRepository.update(id_post, post);
  }

  async deletePost(id_user: number, id_post: number) {
    const postValidate = await this.postRepository.findOne({
      where: { id_post: id_post, user: { id_user: id_user } },
    });

    if (postValidate === undefined) {
      throw new NotFoundException('Usuário ou Post não encontrado');
    }

    return this.postRepository.delete(id_post);
  }
}
