import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  create(@Body() createShortenDto: CreateShortenDto) {
    return this.shortenService.create(createShortenDto);
  }

  @Get()
  findAll() {
    return this.shortenService.findAll();
  }

  @Get(':code')
  findOneByCode(@Param('code') code: string) {
    return this.shortenService.findOneByCode(code);
  }

  @Get(':code/stats')
  getStatisticsByCode(@Param('code') code: string) {
    return this.shortenService.getStatisticsByCode(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateShortenDto: UpdateShortenDto) {
    return this.shortenService.update(code, updateShortenDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.shortenService.remove(code);
  }
}
