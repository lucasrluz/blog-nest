import {
  Body,
  Controller,
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
  @Put(':id_comment/post/:id_post/')
  editComment(
    @Param('id_comment') id_comment: number,
    @Param('id_post') id_post: number,
    @Request() req,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentService.editComment(
      id_comment,
      req.user.id_user,
      id_post,
      comment,
    );
  }
}
