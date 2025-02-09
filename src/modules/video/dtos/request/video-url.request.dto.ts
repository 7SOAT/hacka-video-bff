import { ApiProperty } from "@nestjs/swagger";

export class VideoUrlRequestDto {
    @ApiProperty({ description: 'O nome do arquivo de vídeo com a extensão' })
    filename: string;
}