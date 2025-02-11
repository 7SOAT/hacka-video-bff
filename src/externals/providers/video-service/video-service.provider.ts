import { HttpService } from "@nestjs/axios";
import { HttpException, Inject } from "@nestjs/common";
import EnvironmentConfigService from "@config/environment-config/environment-config.service";
import UploadSeviceConfig from "src/interfaces/config/upload-service.config";
import { PostVideoRequestDto } from "./request/post-video.request.dto";
import { PostVideoResponseDto } from "./response/post-video.response.dto";
import VideoServiceConfig from "src/interfaces/config/video-service.config";
import { UUID } from "crypto";

export default class VideosServiceProvider {
   private readonly videos_service_url: string = this._videosServiceConfig.getVideoServiceUrl();

   constructor(
      @Inject(HttpService)
      private readonly _httpService: HttpService,

      @Inject(EnvironmentConfigService)
      private readonly _videosServiceConfig: VideoServiceConfig
   ) { }

   async insertVideo(request: PostVideoRequestDto): Promise<PostVideoResponseDto> {
      const url = `${this.videos_service_url}/v1/videos`;

      try {
         console.log(`saving video parameters`, {
            url,
            request
         });

         const { data } = await this._httpService.axiosRef.post(
            url,
            request
         );

         return data;
      } catch (err: any) {
         throw new HttpException(err.response?.data ?? err, err.response?.status ?? 400);
      }
   }

   async getVideoDownloadUrl(videoId: UUID, userId: UUID): Promise<string> {
      const url = `${this.videos_service_url}/v1/videos/${videoId}/user/${userId}/`;

      try {
         const { data } = await this._httpService.axiosRef.get(url);
         return data;
      } catch (err: any) {
         throw new HttpException(err.response?.data ?? err, err.response?.status ?? 400);
      }
   }

   async getVideosByUserId(userId: string): Promise<{
      id: UUID,
      userId: UUID,
      s3Key: string,
      status: string,
      s3ZipKey: string,
      createdAt: Date,
      updatedAt: Date,
   }[]> {
      const url = `${this.videos_service_url}/v1/videos/user/${userId}`;

      try {
         const { data } = await this._httpService.axiosRef.get(url);
         return data;
      } catch (err: any) {
         throw new HttpException(err.response?.data ?? err, err.response?.status ?? 400);
      }
   }
}