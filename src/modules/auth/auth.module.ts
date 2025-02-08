import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import ProvidersModule from "@providers/providers.module";

@Module({
    imports: [ProvidersModule],
    providers: [],
    controllers: [
        AuthController,
    ]
})

export class AuthModule { }