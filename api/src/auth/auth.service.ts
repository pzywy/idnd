import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(
        name: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByName(name);
        if (!user) throw new NotFoundException()
        if (!await bcrypt.compare(pass, user.password)) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, username: user.name};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(
        name: string,
        pass: string,
    ): Promise<User> {
        const foundUser = await this.usersService.findOneByName(name);
        if (foundUser) {
            //TODO change error
            throw new ConflictException();
        }

        const hash = await bcrypt.hash(pass, 10);
        const user = await this.usersService.create(name, hash);
        //TODO dont return password
        return user;
    }
}
