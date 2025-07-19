import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApprovalCronService } from './userApproval.cron.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserApprovalCronService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
