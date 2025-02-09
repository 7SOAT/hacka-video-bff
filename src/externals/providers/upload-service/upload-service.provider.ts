import { HttpService } from "@nestjs/axios";
import { HttpException, Inject } from "@nestjs/common";
import EnvironmentConfigService from "@config/environment-config/environment-config.service";
import { GetPreSignedUrlResponseDto } from "./dto/response/get-pre-signed-url.response.dto";
import { GetPreSignedUrlRequestDto } from "./dto/request/get-pre-signed-url.request.dto";
import UploadSeviceConfig from "src/interfaces/config/upload-service.config";

export default class UploadServiceProvider {
   private readonly updload_service_url: string = this._uploadServiceConfig.getUploadServiceUrl();

   constructor(
      @Inject(HttpService)
      private readonly _httpService: HttpService,

      @Inject(EnvironmentConfigService)
      private readonly _uploadServiceConfig: UploadSeviceConfig
   ) { }

   async getPreSignedUrl(filename: string): Promise<GetPreSignedUrlResponseDto> {
      const params: GetPreSignedUrlRequestDto = { filename };
      const url = `${this.updload_service_url}/v1/presigned-url`;

      try {
         const { data } = await this._httpService.axiosRef.post(
            url,
            null,
            { params }
         );

         return data;
      } catch (err: any) {
         throw new HttpException(err.response?.data ?? err, err.response?.status ?? 400);
      }
   }
}