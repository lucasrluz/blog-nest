import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}

  async findByPost(id_post: number) {
    return this.commentRepository.find({
      where: { post: { id_post: id_post } },
    });
  }
}
