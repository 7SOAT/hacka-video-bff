import { ApiProperty } from "@nestjs/swagger";

export class AuthRequestDto {
    @ApiProperty()
    code: string;
}