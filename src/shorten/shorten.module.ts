import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShortenService } from './shorten.service';
import { ShortenController } from './shorten.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shorten } from './entities/shorten.entity';

@Module({
    controllers: [ShortenController],
    providers: [ShortenService],
    imports: [
        TypeOrmModule.forFeature([Shorten]),
        ConfigModule
    ],
    exports: [ShortenService]
})
export class ShortenModule { }
