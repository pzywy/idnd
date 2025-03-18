import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {PublicEndpoint} from "./PublicEndpoint";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @PublicEndpoint()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @PublicEndpoint()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() signInDto: Record<string, any>) {
        return this.authService.signUp(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
