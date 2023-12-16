import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDataDTO } from '../users/users.controller';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('signIn')
  @ApiOperation({ summary: 'User authorization' })
  @ApiBody({ type: UserDataDTO, description: 'Request body' })
  @ApiResponse({ status: 201, description: 'User logged' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not found' })
  signIn(@Body() userData: UserDataDTO) {
    return this.authService.signIn(userData.email, userData.password);
  }
}
