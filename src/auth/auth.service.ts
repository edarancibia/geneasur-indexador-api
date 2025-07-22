import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { PayloadToken } from './models/token.model';
import LoginDto from './dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...response } = user;

        return response;
      }
    }

    return null;
  }

  async generateJwt(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email);
    const payload: PayloadToken = { role: user.role, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async sendPasswordReset(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const token = this.jwtService.sign(
      { sub: user.id },
      { secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '1h' },
    );

    const resetLink = `${this.configService.get<string>('APP_URL')}reset-password?token=${token}`;

    this.logger.log(`[AuthService] sendPasswordReset: sending recovery password to ${email}`);

    await this.mailService.sendEmail({
      to: email,
      subject: 'Recupera tu contraseña',
      html: `<p>Haz clic para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
      text: ''
    });
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      console.log(newPassword)
      const decoded = this.jwtService.verify(token, { secret: this.configService.get<string>('JWT_SECRET') });
      const user = await this.userService.findById(decoded.sub);

      if (!user) throw new Error('Usuario no encontrado');

      console.log(user.password)
      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepo.save(user);
    } catch (err) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }
}
