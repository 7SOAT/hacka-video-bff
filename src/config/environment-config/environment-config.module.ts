import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import EnvironmentConfigService from './environment-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
      ignoreEnvFile: true,
      isGlobal: true
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})

export default class EnvironmentConfigModule { }