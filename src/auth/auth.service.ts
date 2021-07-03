import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);

    if (user) {
      const validatePassword = await bcrypt.compare(pass, user.password);

      if (validatePassword) {
        const { password, ...result } = user;

        return result;
      }

      return null;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id_user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
