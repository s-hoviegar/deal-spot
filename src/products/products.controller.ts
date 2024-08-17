import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // PRODUCTS RATINGS crud functionalities
  @Post('ratings')
  createRating(
    @Body() createProductRatingDto: Prisma.ProductRatingCreateInput,
  ) {
    return this.productsService.createRating(createProductRatingDto);
  }

  @Get('ratings')
  findAllRating() {
    return this.productsService.findAllRating();
  }

  @Get('ratings/:id')
  findOneRating(@Param('id') id: string) {
    return this.productsService.findOneRating(+id);
  }

  @Patch('ratings/:id')
  updateRating(
    @Param('id') id: string,
    @Body() updateProductRatingDto: Prisma.ProductRatingUpdateInput,
  ) {
    return this.productsService.updateRating(+id, updateProductRatingDto);
  }

  @Delete('ratings/:id')
  removeRating(@Param('id') id: string) {
    return this.productsService.removeRating(+id);
  }

  // PRODUCTS
  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get(':id/ratings')
  findOneProductRatings(@Param('id') id: string) {
    return this.productsService.findOneProductRatings(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
