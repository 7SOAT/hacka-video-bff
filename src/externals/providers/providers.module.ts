import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import AWSProvider from "./aws/aws.provider";
import EnvironmentConfigModule from "@config/environment-config/environment-config.module";
import EnvironmentConfigService from "@config/environment-config/environment-config.service";
import UploadServiceProvider from "./upload-service/aws.provider";



@Module({
    imports: [HttpModule, EnvironmentConfigModule],
    providers: [
        EnvironmentConfigService,
        AWSProvider,
        UploadServiceProvider
    ],
    exports: [AWSProvider, UploadServiceProvider]
})

export default class ProvidersModule { }
