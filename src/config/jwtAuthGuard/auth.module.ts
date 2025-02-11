import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule],
    providers: [],
    exports: [PassportModule],
})
export class JwtAuthModule { }
