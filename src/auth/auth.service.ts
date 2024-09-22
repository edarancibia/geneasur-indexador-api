import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/user.schema';
import { PayloadToken } from './models/token.model';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch) {
        const { password, ...response } = user.toJSON();

        return response;
      }
    }

    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
