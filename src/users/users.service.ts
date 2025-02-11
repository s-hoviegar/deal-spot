import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      return await this.databaseService.user.create({
        data: {
          ...createUserDto,
          password_hash: await bcrypt.hash(createUserDto.password_hash, 10),
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      throw err;
    }
  }

  async findAll() {
    const users = await this.databaseService.user.findMany();
    if (users.length === 0) {
      throw new NotFoundException('No user found.');
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        user_id: id,
      },
    });
    if (user === null) {
      throw new NotFoundException('User does not exist.');
    }
    return user;
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.databaseService.user.findUniqueOrThrow({
      where: filter,
      select: { user_id: true, password_hash: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let data;
    if (updateUserDto.password_hash) {
      data = {
        ...updateUserDto,
        password_hash: await bcrypt.hash(updateUserDto.password_hash, 10),
      };
    } else {
      data = updateUserDto;
    }
    try {
      return await this.databaseService.user.update({
        where: {
          user_id: id,
        },
        data,
      });
    } catch (err) {
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('Email already exists.');
      }
      if (err.code === 'P2025') {
        throw new NotFoundException('User does not exist.');
      }
      throw err;
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.user.delete({
        where: {
          user_id: id,
        },
      });
    } catch (err) {
      if (err.code === 'P2025') {
        throw new NotFoundException('User does not exist.');
      }
      throw err;
    }
  }
}
