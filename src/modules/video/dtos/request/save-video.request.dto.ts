import { UUID } from "crypto";

export class SaveVideoRequestDto {
    userId: string;
    s3Key: string;
    videoId: UUID;
}