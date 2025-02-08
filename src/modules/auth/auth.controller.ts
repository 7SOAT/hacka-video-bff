import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { AuthRequestDto } from './dtos/auth.request.dto';
import AWSProvider from '@providers/aws/aws.provider';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly _authService: AuthService = new AuthService(this._awsProvider);

  constructor(private _awsProvider: AWSProvider) { }

  @Post()
  async getOAuthToken(
    @Body() { code }: AuthRequestDto
  ): Promise<AuthResponseDto> {
    return await this._authService.authenticate(code);
  }
}
