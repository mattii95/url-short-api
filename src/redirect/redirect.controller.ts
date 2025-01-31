import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';

@Controller()
export class RedirectController {
    constructor(
        private readonly redirectService: RedirectService
    ) { }


    @Get(':shortCode')
    async redirectUrl(
        @Param('shortCode') shortCode: string,
        @Res() res: Response
    ) {
        const url = await this.redirectService.redirectUrl(shortCode);
        return res.redirect(url);
    }

}
