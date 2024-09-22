import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(username: string, email: string, password: string): Promise<User> {
      const userDb = await this.findByEmail(email);

      if(userDb) {
        throw new HttpException('Email already exists',HttpStatus.CONFLICT)
      }
      const newUser = new this.userModel({ username, email, password });

      return newUser.save();
    }
  
    async findById(id: string): Promise<User | undefined> {
      const user = await this.userModel.findById(id);

      return user;
    }

    async findByEmail(email: string) {
      return await this.userModel.findOne({ email: email }).exec();
    }
  
    async validateUser(id: string, password: string): Promise<User | null> {
      const user = await this.findById(id);

      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    }
}
