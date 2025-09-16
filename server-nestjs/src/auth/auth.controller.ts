import { Controller, Get, UseGuards } from '@nestjs/common';
import { CognitoAuthGuard } from './guards/cognito-auth.guard';
import { CurrentUser } from './decorators/user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(CognitoAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return {
      cognitoInfo: user,
      userInfo: await this.authService.validateCognitoUser(user),
    };
  }
}
