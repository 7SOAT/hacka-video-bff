import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { VideoUrlResponseDto } from './dtos/response/video-url.response.dto';
import UploadServiceProvider from '@providers/upload-service/upload-service.provider';
import { VideoUrlRequestDto } from './dtos/request/video-url.request.dto';
import VideosServiceProvider from '@providers/video-service/video-service.provider';
import { SaveVideoRequestDto } from './dtos/request/save-video.request.dto';
import { SaveVideoResponseDto } from './dtos/response/save-video.response.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  private readonly _videoService: VideosService = new VideosService(this._uploadServiceProvider, this._videosServiceProvider);

  constructor(
    private _uploadServiceProvider: UploadServiceProvider,
    private _videosServiceProvider: VideosServiceProvider
  ) { }

  @Get('url')
  async getPreSignedUrl(
    @Query() { filename, userId }: VideoUrlRequestDto
  ): Promise<VideoUrlResponseDto> {
    return await this._videoService.getPreSignedUrl(filename, userId);
  }

  @Get('/:id/download')
  async getDownlaodUrl(
    @Param('id') videoId: string,
    @Query() { filename }: VideoUrlRequestDto
  ) {
    //
  }

  @Post('save')
  async saveVideo(
    @Query() body: SaveVideoRequestDto
  ): Promise<SaveVideoResponseDto> {
    const { videoId, userId, s3Key } = body;
    return await this._videoService.saveVideo(videoId, userId, s3Key);
  }
}
