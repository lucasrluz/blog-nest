import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post/:id')
  savePost(
    @Request() req,
    @Param('id') id_post: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentService.saveComment(req.user.id_user, id_post, comment);
  }

  @Get('post/:id')
  findByPost(@Param('id') id: number) {
    return this.commentService.findByPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findByUser(@Param('id') id: number, @Request() req) {
    return this.commentService.findByUser(id, req.user.id_user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  editComment(
    @Param('id') id_comment: number,
    @Request() req,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentService.editComment(
      id_comment,
      req.user.id_user,
      comment,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteComment(@Param('id') id_comment: number, @Request() req) {
    return this.commentService.deleteComment(id_comment, req.user.id_user);
  }
}
