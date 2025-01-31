import { Module } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { RedirectController } from './redirect.controller';
import { ShortenModule } from 'src/shorten/shorten.module';

@Module({
    controllers: [RedirectController],
    providers: [RedirectService],
    imports: [ShortenModule]
})
export class RedirectModule { }
