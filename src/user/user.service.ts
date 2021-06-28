import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) {}

    async saveUser(user: IUser) {
        const userValidate = await this.userRepository.findOne({ username: user.username });

        if (userValidate !== undefined) {
            throw new InternalServerErrorException('Este nome de usuário já está em uso');
        }

        const passwordHash = await bcrypt.hash(user.password, 8);

        user.password = passwordHash;

        return this.userRepository.insert(user);
    }

    async findOne(username: string) {
        return this.userRepository.findOne({ username: username });
    }
}
