import { Module } from '@nestjs/common';
import EnvironmentConfigModule from './config/environment-config/environment-config.module';
import ProvidersModule from './externals/providers/providers.module';
import { AuthModule } from './modules/auth/auth.module';
import { VideosService } from './modules/video/videos.service';
import { VideosModule } from './modules/video/videos.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    ProvidersModule,
    AuthModule,
    VideosModule
  ],
})

export class AppModule { }
