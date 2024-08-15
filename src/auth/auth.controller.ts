import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(
    @Body()
    createUserDto: CreateUserDto,
  ) {
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
}
