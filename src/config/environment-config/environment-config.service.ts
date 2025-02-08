import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AwsConfig from 'src/interfaces/config/aws.config';
import UploadSeviceConfig from 'src/interfaces/config/upload-service.config';

@Injectable()
export default class EnvironmentConfigService implements AwsConfig, UploadSeviceConfig {
  constructor(private configService: ConfigService) { }

  getAwsClientId(): string {
    return this.configService.get<string>('AWS_CLIENT_ID') || '';
  }

  getAwsClientSecret(): string {
    return this.configService.get<string>('AWS_CLIENT_SECRET') || '';
  }

  getAwsRedirectUrl(): string {
    return this.configService.get<string>('AWS_REDIRECT_URI') || '';
  }

  getAwsRegion(): string {
    return this.configService.get<string>('AWS_REGION') || '';
  }

  getAwsCognitoDomain(): string {
    return this.configService.get<string>('AWS_COGNITO_DOMAIN') || '';
  }

  getUploadServiceUrl(): string {
    return this.configService.get<string>('UPLOAD_SERVICE_URL') || '';
  }

}
