import { UUID } from "crypto";

export class InsertVideoRequestDto {
    userId: string;
    s3Key: string;
    id: UUID;
}