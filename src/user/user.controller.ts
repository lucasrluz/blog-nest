import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    saveUser(@Body() userDto: CreateUserDto) {
        return this.userService.saveUser(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    ediUser(
        @Request() req,
        @Param('id') id: string,
        @Body() newPassword: EditUserDto
    ) {
        return this.userService.editUser(id, req.user.id_user, newPassword);
    }
}
