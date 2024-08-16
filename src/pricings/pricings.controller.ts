import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { Prisma } from '@prisma/client';

@Controller('pricings')
export class PricingsController {
  constructor(private readonly pricingsService: PricingsService) {}

  @Post()
  create(@Body() createPricingDto: Prisma.PricingCreateInput) {
    return this.pricingsService.create(createPricingDto);
  }

  @Get()
  findAll() {
    return this.pricingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePricingDto: Prisma.PricingCreateInput,
  ) {
    return this.pricingsService.update(+id, updatePricingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingsService.remove(+id);
  }
}
