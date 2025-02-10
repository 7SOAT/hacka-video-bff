import { Injectable } from '@nestjs/common';
import { VideoUrlResponseDto } from './dtos/response/video-url.response.dto';
import UploadServiceProvider from '@providers/upload-service/upload-service.provider';
import { SaveVideoRequestDto } from './dtos/request/save-video.request.dto';
import VideosServiceProvider from '@providers/video-service/video-service.provider';
import { SaveVideoResponseDto } from './dtos/response/save-video.response.dto';
import { UUID } from 'crypto';
import VideoServiceProviderGateway from './videos.gateway';

@Injectable()
export class VideosService {
  private _videosServiceGateway: VideoServiceProviderGateway = new VideoServiceProviderGateway(this._videosServiceProvider);

  constructor(
    private _uploadServiceProvider: UploadServiceProvider,
    private _videosServiceProvider: VideosServiceProvider
  ) { }

  async getPreSignedUrl(filename: string, userId: UUID): Promise<VideoUrlResponseDto> {
    return await this._uploadServiceProvider.getPreSignedUrl(filename, userId);
  }

  async getVideosByUserId(userId: UUID): Promise<{
    id: UUID,
    userId: UUID,
    s3Key: string,
    status: string,
    s3ZipKey: string,
    createdAt: Date,
    updatedAt: Date,
  }[]> {
    return await this._videosServiceGateway.getVideosByUserId(userId);
  }

  async saveVideo(videoId: UUID, userId: UUID, s3Key: string): Promise<SaveVideoResponseDto> {
    const response = await this._videosServiceGateway.insertVideo(videoId, userId, s3Key);
    return { videoId: response.id, userId: response.userId };
  }

  async downloadVideo(videoId: UUID, userId: UUID): Promise<string> {
    return await this._videosServiceProvider.getVideoDownloadUrl(videoId, userId);
  }
}
