import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUser } from './interface/user.interface';
import { IEditUser } from './interface/edit-user.interface';
import * as bcrypt from 'bcrypt';
import { Comment } from 'src/comment/entity/comment.entity';
import { Post } from 'src/post/entity/post.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,

    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}

  async saveUser(user: IUser) {
    const userValidate = await this.userRepository.findOne({
      username: user.username,
    });

    if (userValidate !== undefined) {
      throw new InternalServerErrorException(
        'Este nome de usuário já está em uso',
      );
    }

    const passwordHash = await bcrypt.hash(user.password, 8);

    user.password = passwordHash;

    return this.userRepository.insert(user);
  }

  async findOne(username: string) {
    return this.userRepository.findOne({ username: username });
  }

  async editUser(
    param_id_user: string,
    id_user: string,
    newPasswordUser: IEditUser,
  ) {
    if (param_id_user != id_user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newPasswordHash = await bcrypt.hash(newPasswordUser.newPassword, 8);

    return this.userRepository.update(id_user, { password: newPasswordHash });
  }

  async deleteUser(param_id_user: string, id_user: string) {
    if (param_id_user != id_user) {
      throw new InternalServerErrorException('Usuário não encontrado');
    }

    await this.commentRepository.remove(await this.commentRepository.find());
    await this.postRepository.remove(await this.postRepository.find());

    return this.userRepository.delete(id_user);
  }
}
