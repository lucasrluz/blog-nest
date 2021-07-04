import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('post/:id')
  findByPost(@Param('id') id: number) {
    return this.commentService.findByPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: number, @Request() req) {
    return this.commentService.findByUser(id, req.user.id_user);
  }
}
