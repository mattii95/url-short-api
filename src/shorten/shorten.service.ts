import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';
import { Shorten } from './entities/shorten.entity';

@Injectable()
export class ShortenService {

    private readonly logger = new Logger('ShortenService');

    constructor(
        @InjectRepository(Shorten)
        private readonly shortenRepository: Repository<Shorten>,
        private readonly configService: ConfigService,
    ) { }

    async create(createShortenDto: CreateShortenDto) {
        try {
            const code = uuid().slice(0, 8);
            createShortenDto.shortCode = code;

            const shorten = this.shortenRepository.create(createShortenDto);

            await this.shortenRepository.save(shorten);

            const urlShorten = `${this.configService.get('HOST_API')}/${shorten.shortCode}`;

            return { urlShorten };
        } catch (error) {
            this.logger.error(error);
        }
    }

    async findAll() {
        const shortens = await this.shortenRepository.find({});
        return shortens;
    }

    async findOneByCode(code: string) {
        const shorten = await this.shortenRepository.findOne({ where: { shortCode: code } })
        if (!shorten)
            throw new NotFoundException(`URL Shorten with code "${code}" not found`)

        return shorten;
    }

    async update(code: string, updateShortenDto: UpdateShortenDto) {
        try {
            const existShorten = await this.findOneByCode(code);
            const shorten = await this.shortenRepository.preload({
                id: existShorten.id,
                ...updateShortenDto,
                updatedAt: new Date(),
            })
            return this.shortenRepository.save(shorten);
        } catch (error) {
            this.logger.error(error);
            return error.response;
        }
    }

    async remove(code: string) {
        await this.findOneByCode(code);
        await this.shortenRepository.delete({ shortCode: code });
    }

    async updateClick(id: number, accessCount: number) {
        try {
            await this.shortenRepository.update(id, { accessCount })
        } catch (error) {
            this.logger.error(error);
        }
    }
}
