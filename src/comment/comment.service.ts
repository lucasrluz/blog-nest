import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { IComment } from './interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
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

    if (comments.length === 0) {
      throw new NotFoundException(
        'Nenhum comentário encontrado para ente usuário.',
      );
    }

    return comments;
  }

  async saveComment(id_user: number, id_post: number, comment: IComment) {
    const post = await this.postRepository.findOne(id_post);

    if (post === undefined) {
      throw new NotFoundException('Erro ao salvar comentário');
    }

    const user = await this.userRepository.findOne(id_user);

    comment.user = user;
    comment.post = post;

    return this.commentRepository.insert(comment);
  }

  async editComment(id_comment: number, id_user: number, comment: IComment) {
    const commentValidate = await this.commentRepository.findOne({
      where: {
        id_comment: id_comment,
        user: { id_user: id_user },
      },
    });

    if (commentValidate === undefined) {
      throw new NotFoundException('Erro ao editar comentário');
    }

    return this.commentRepository.update(id_comment, {
      content: comment.content,
    });
  }

  async deleteComment(id_comment: number, id_user: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id_comment: id_comment,
        user: { id_user: id_user },
      },
    });

    if (comment === undefined) {
      throw new NotFoundException('Comentário não encontrado.');
    }

    return this.commentRepository.delete(id_comment);
  }
}
