import { Controller, Get, Param, Post, Query, UseGuards, Header, Headers, Request, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import { VideoUrlResponseDto } from './dtos/response/video-url.response.dto';
import UploadServiceProvider from '@providers/upload-service/upload-service.provider';
import { VideoUrlRequestDto } from './dtos/request/video-url.request.dto';
import VideosServiceProvider from '@providers/video-service/video-service.provider';
import { SaveVideoRequestDto } from './dtos/request/save-video.request.dto';
import { SaveVideoResponseDto } from './dtos/response/save-video.response.dto';
import { UUID } from 'crypto';
import { JwtAuthGuard } from '@config/jwtAuthGuard/jwtAuthGuard';
import { JwtAuthService } from '@config/jwtAuthGuard/jwtAuth.service';

@ApiTags('videos')
@Controller('videos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VideosController {
  private readonly _videoService: VideosService = new VideosService(this._uploadServiceProvider, this._videosServiceProvider);
  private readonly _jwtAuthService: JwtAuthService = new JwtAuthService();

  constructor(
    private _uploadServiceProvider: UploadServiceProvider,
    private _videosServiceProvider: VideosServiceProvider
  ) { }

  @Get('url')
  async getPreSignedUrl(
    @Query() { filename }: VideoUrlRequestDto,
    @Request() req: any
  ): Promise<VideoUrlResponseDto> {
    const { userId } = this._jwtAuthService.decodeToken(req.headers.authorization);
    return await this._videoService.getPreSignedUrl(filename, userId);
  }

  @Get('getSignedUrl')
  async getDownlaodUrl(
    @Query('videoId') videoId: UUID,
    @Request() req: any
  ) {
    const { userId } = this._jwtAuthService.decodeToken(req.headers.authorization);
    return await this._videoService.downloadVideo(videoId, userId);
  }

  @Get()
  async getVideosByUser(
    @Request() req: any
  ): Promise<{
    id: UUID,
    userId: UUID,
    s3Key: string,
    status: string,
    s3ZipKey: string,
    createdAt: Date,
    updatedAt: Date,
  }[]> {
    const { userId } = this._jwtAuthService.decodeToken(req.headers.authorization);
    return await this._videoService.getVideosByUserId(userId);
  }

  @Post('save')
  async saveVideo(
    @Query() body: SaveVideoRequestDto,
    @Request() req: any
  ): Promise<SaveVideoResponseDto> {
    const { videoId, filename } = body;
    const { userId } = this._jwtAuthService.decodeToken(req.headers.authorization);
    return await this._videoService.saveVideo(videoId, userId, filename);
  }
}
