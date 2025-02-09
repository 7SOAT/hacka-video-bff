import { UUID } from "crypto";

export class PostVideoRequestDto {
    userId: string;
    s3Key: string;
    id: UUID;
}