import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import AWSProvider from "./aws/aws.provider";
import EnvironmentConfigModule from "@config/environment-config/environment-config.module";
import EnvironmentConfigService from "@config/environment-config/environment-config.service";
import UploadServiceProvider from "./upload-service/upload-service.provider";
import VideosServiceProvider from "./video-service/video-service.provider";



@Module({
    imports: [HttpModule, EnvironmentConfigModule],
    providers: [
        EnvironmentConfigService,
        AWSProvider,
        UploadServiceProvider,
        VideosServiceProvider
    ],
    exports: [AWSProvider, UploadServiceProvider, VideosServiceProvider]
})

export default class ProvidersModule { }
