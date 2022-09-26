import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/UserService';
import { UserLoginDto } from './dto/user.login.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(userLogin: UserLoginDto): Promise<void>;
    login(user: UserLoginDto): Promise<{
        access_token: string;
    }>;
}
