import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserApprovalCronService } from './userApproval.cron.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly appovalCron: UserApprovalCronService,
  ) { }

  async createUser(name: string, lastname: string, email: string, password: string): Promise<User> {
    const userDb = await this.findByEmail(email);

    if (userDb) {
      throw new HttpException('El Email ya está registrado', HttpStatus.CONFLICT)
    }
    const newUser = this.userRepo.create({ name, lastname, email, password });

    const createdUser = await this.userRepo.save(newUser);

    const adminsUsers = await this.userRepo.find({ where: { role: 'admin' } });
    const adminMails: string[] = adminsUsers.map(user => user.email);

    this.appovalCron.scheduleExecutionForUser(newUser, adminMails, true);

    return createdUser;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { id: id } });

    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email: email } });
  }

  async validateUser(id: string, password: string): Promise<User | null> {
    const user = await this.findById(id);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async approveUser(userId: string, approverId: string): Promise<User> {
    let appoverUser = await this.userRepo.findOneBy({ id: approverId });

    if(appoverUser.role != 'admin') {
      throw new HttpException('No tienes privilegios para aprobar nuevos usuarios' , HttpStatus.FORBIDDEN);
    }

    let user = await this.userRepo.findOneBy({ id: userId });
    user.enabled = true;

    try {
      const updatedUser = await this.userRepo.save(user);
      delete updatedUser.password;

      await this.appovalCron.scheduleExecutionForUser(user, [], false);

      return updatedUser;
    } catch (error) {
      this.logger.error(`[UserService] approveUser: ${error}`);
      throw error;
    }
  }

  async getPendingApprovals(): Promise<User[]> {
    const users = await this.userRepo.find({ where: { enabled: false } });

    if(users.length < 1) {
      return;
    }

    users.forEach(user => {
      delete user.password
    });

    return users;
  }

  async passwordRecovery(
    userEmail: string,
    newPassword: string,
  ): Promise<User> {
    try {
      const userDb = await this.userRepo.findOne({
        where: { email: userEmail },
      });

      if (!userDb) {
        throw new NotFoundException('Usuario inválido');
      }

      userDb.password = newPassword;
      return await this.userRepo.save(userDb);
    } catch (error) {
      throw error;
    }
  }
}
