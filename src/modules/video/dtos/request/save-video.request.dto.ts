import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class SaveVideoRequestDto {
    @ApiProperty()
    s3Key: string;

    @ApiProperty()
    videoId: UUID;
}