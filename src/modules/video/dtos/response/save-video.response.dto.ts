import { UUID } from "crypto";

export class SaveVideoResponseDto {
    id: UUID;
    userId: UUID;
    s3Key: string;
    status: string;
    s3ZipKey: string;
    createdAt: Date;
    updatedAt: Date;
}