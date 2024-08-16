import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);

      return {
        success: true,
        message: 'User Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const data = await this.userService.findAll();
      return {
        success: true,
        data,
        message: 'User Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req: Request) {
    try {
      if (id == req.user['id']) {
        const data = await this.userService.findOne(+id);
        console.log(req.headers.authorization);
        return {
          success: true,
          data,
          message: 'User Fetched Successfully',
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    try {
      if (id == req.user['id']) {
        await this.userService.update(+id, updateUserDto);
        return {
          success: true,
          message: 'User Updated Successfully',
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      if (id == req.user['id']) {
        await this.userService.remove(+id);
        return {
          success: true,
          message: 'User Deleted Successfully',
        };
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
