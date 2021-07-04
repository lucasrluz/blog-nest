import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async findByPost(id_post: number) {
    const comments = await this.commentRepository.find({
      where: { post: { id_post: id_post } },
    });

    if (comments.length === 0) {
      throw new NotFoundException(
        'Nenhum comentário encontrado para este post',
      );
    }

    return comments;
  }

  async findByUser(id_param: number, id_user: number) {
    if (id_param != id_user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const comments = await this.commentRepository.find({
      where: { user: { id_user: id_user } },
    });

    if (comments === undefined) {
      throw new NotFoundException(
        'Nenhum comentário encontrado para ente usuário.',
      );
    }

    return comments;
  }
}
