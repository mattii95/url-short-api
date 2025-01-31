import { Injectable } from '@nestjs/common';
import { ShortenService } from 'src/shorten/shorten.service';


@Injectable()
export class RedirectService {

    constructor(
        private readonly shortenService: ShortenService,
    ) { }

    async redirectUrl(shortCode: string) {
        const { id, url, accessCount } = await this.shortenService.findOneByCode(shortCode);
        try {
            await this.shortenService.updateClick(id, accessCount + 1);
            return url;
        } catch (error) {
            console.log(error);
        }
    }

}
