import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { VideoUrlResponseDto } from './dtos/response/video-url.response.dto';
import UploadServiceProvider from '@providers/upload-service/aws.provider';
import { VideoUrlRequestDto } from './dtos/request/video-url.request.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  private readonly _videoService: VideosService = new VideosService(this._uploadServiceProvider);

  constructor(private _uploadServiceProvider: UploadServiceProvider) { }

  @Get('url')
  async getPreSignedUrl(
    @Query() { filename }: VideoUrlRequestDto
  ): Promise<VideoUrlResponseDto> {
    return await this._videoService.getPreSignedUrl(filename);
  }

}
