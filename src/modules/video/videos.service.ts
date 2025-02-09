import { Injectable } from '@nestjs/common';
import { VideoUrlResponseDto } from './dtos/response/video-url.response.dto';
import UploadServiceProvider from '@providers/upload-service/aws.provider';

@Injectable()
export class VideosService {
  constructor(private _uploadServiceProvider: UploadServiceProvider) { }

  async getPreSignedUrl(filename: string): Promise<VideoUrlResponseDto> {
    return await this._uploadServiceProvider.getPreSignedUrl(filename);
  }
}
