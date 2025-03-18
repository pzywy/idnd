import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    create(name: string, password: string): Promise<User> {
        return this.usersRepository.save({name, password});
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({id});
    }

    findOneByName(name: string): Promise<User | null> {
        return this.usersRepository.findOneBy({name});
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}