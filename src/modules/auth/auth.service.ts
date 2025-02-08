import { Injectable } from '@nestjs/common';
import { AuthResponseDto } from './dtos/auth.response.dto';
import AWSProvider from '@providers/aws/aws.provider';

@Injectable()
export class AuthService {
  constructor(private _awsProvider: AWSProvider) { }

  async authenticate(code: string): Promise<AuthResponseDto> {
    return await this._awsProvider.GetOAuthToken(code);
  }
}
