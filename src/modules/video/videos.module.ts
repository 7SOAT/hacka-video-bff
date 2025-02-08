import { Module } from "@nestjs/common";
import ProvidersModule from "@providers/providers.module";
import { VideosController } from "./videos.controller";

@Module({
    imports: [ProvidersModule],
    providers: [],
    controllers: [
        VideosController,
    ]
})

export class VideosModule { }