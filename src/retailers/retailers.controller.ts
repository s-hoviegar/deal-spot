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

  // RETAILERS RATINGS crud functionalities
  @Post('ratings')
  createRating(
    @Body() createRetailerRatingDto: Prisma.RetailerRatingCreateInput,
  ) {
    return this.retailersService.createRating(createRetailerRatingDto);
  }

  @Get('ratings')
  findAllRating() {
    return this.retailersService.findAllRating();
  }

  @Get('ratings/:id')
  findOneRating(@Param('id') id: string) {
    return this.retailersService.findOneRating(+id);
  }

  @Patch('ratings/:id')
  updateRating(
    @Param('id') id: string,
    @Body() updateRetailerRatingDto: Prisma.RetailerRatingUpdateInput,
  ) {
    return this.retailersService.updateRating(+id, updateRetailerRatingDto);
  }

  @Delete('ratings/:id')
  removeRating(@Param('id') id: string) {
    return this.retailersService.removeRating(+id);
  }

  // RETAILER
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

  @Get(':id/ratings')
  findOneProductRatings(@Param('id') id: string) {
    return this.retailersService.findOneRetailerRatings(+id);
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
