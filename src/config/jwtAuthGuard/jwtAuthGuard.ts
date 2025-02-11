import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { decodeJwt } from 'jose'
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard() {
    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found');
        }

        const bearerToken = authHeader.split(' ')[1];
        if (!bearerToken) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = decodeJwt(bearerToken);
            (request as Request & { user: any }).user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized');
        }
    }
}
