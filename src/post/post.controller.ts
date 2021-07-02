import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    savePost(@Request() req, @Body() post: CreatePostDto) {
        return this.postService.savePost(req.user.id_user, post);
    }

    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id_post: number) {
        return this.postService.findById(id_post);
    }

    @Get('user/:username')
    findByUser(@Param('username') username: string) {
        return this.postService.findByUser(username);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    editPost(@Param('id') id: number, @Body() post: CreatePostDto, @Request() req) {
        return this.postService.editPost(req.user.id_user, id, post);
    }
}
