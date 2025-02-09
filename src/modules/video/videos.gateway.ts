import { Inject } from "@nestjs/common";
import { PostVideoRequestDto } from "@providers/video-service/request/post-video.request.dto";
import VideosServiceProvider from "@providers/video-service/video-service.provider";
import { UUID } from "crypto";

export default class VideoServiceProviderGateway {
    constructor(
        @Inject(VideosServiceProvider)
        private readonly _videoServiceProvider: VideosServiceProvider
    ) { }

    async insertVideo(videoId: UUID, userId: UUID, s3Key: string): Promise<{
        id: UUID;
        userId: UUID;
    }> {
        const request: PostVideoRequestDto = {
            id: videoId,
            userId: userId,
            s3Key: s3Key
        }

        const response = await this._videoServiceProvider.insertVideo(request);

        return { id: response.id, userId: response.userId };
    }

    async getVideosByUserId(videoId: UUID): Promise<{
        id: UUID,
        userId: UUID,
        s3Key: string,
        status: string,
        s3ZipKey: string,
        createdAt: Date,
        updatedAt: Date,
    }[]> {
        const response = await this._videoServiceProvider.getVideosByUserId(videoId);
        return response;
    }

}