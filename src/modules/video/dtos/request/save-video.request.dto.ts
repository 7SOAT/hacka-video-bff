import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class SaveVideoRequestDto {
    @ApiProperty()
    filename: string;

    @ApiProperty()
    videoId: UUID;
}