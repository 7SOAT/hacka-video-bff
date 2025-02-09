import { UUID } from "crypto";

export class InsertVideosRequestDto {
    userId: string;
    s3Key: string;
    id: UUID;
}