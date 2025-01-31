import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortenModule } from './shorten/shorten.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
        }),
        ShortenModule,
        RedirectModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
