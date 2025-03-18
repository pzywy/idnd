import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserSubscriber} from "./UserSubscriber";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UserSubscriber],
    exports: [UsersService, TypeOrmModule],
})
export class UsersModule {
}