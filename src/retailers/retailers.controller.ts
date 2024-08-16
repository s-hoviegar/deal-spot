import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { Prisma } from '@prisma/client';

@Controller('retailers')
export class RetailersController {
  constructor(private readonly retailersService: RetailersService) {}

  @Post()
  create(@Body() createRetailerDto: Prisma.RetailerCreateInput) {
    return this.retailersService.create(createRetailerDto);
  }

  @Get()
  findAll() {
    return this.retailersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retailersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRetailerDto: Prisma.RetailerCreateInput,
  ) {
    return this.retailersService.update(+id, updateRetailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retailersService.remove(+id);
  }
}
