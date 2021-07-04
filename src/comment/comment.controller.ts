import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('post/:id')
  findByPost(@Param('id') id: number) {
    return this.commentService.findByPost(id);
  }
}
