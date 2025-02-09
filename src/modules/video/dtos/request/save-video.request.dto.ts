import { UUID } from "crypto";

export class SaveVideoRequestDto {
    userId: UUID;
    s3Key: string;
    videoId: UUID;
}