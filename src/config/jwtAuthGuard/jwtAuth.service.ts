import { UUID } from 'crypto';
import * as jwt from 'jsonwebtoken';

export class JwtAuthService {
    decodeToken(token: string): { userId: UUID } {
        const tokenDecoded = jwt.decode(token.split(' ')[1])!;
        const userId: UUID = tokenDecoded.sub as UUID;
        return { userId };
    }
}