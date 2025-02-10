import { ApiProperty } from "@nestjs/swagger";
import { UUID } from "crypto";

export class VideoUrlRequestDto {
    @ApiProperty({ description: 'O nome do arquivo de vídeo com a extensão' })
    filename: string;

    @ApiProperty({ description: 'O id do usuário' })
    userId: UUID;
}