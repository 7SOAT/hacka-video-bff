import { UUID } from "crypto";

export class GetPreSignedUrlRequestDto {
   filename: string;
   userId: UUID;
}