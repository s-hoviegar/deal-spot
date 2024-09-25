import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PRODUCT_IMAGES } from './products-images';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

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

  @Get(':id/ratings')
  findOneProductRatings(@Param('id') id: string) {
    return this.productsService.findOneProductRatings(+id);
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
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post(':productId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: PRODUCT_IMAGES,
        filename: (req, file, callback) => {
          callback(
            null,
            `${uuid()}_${req.params.productId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadProductImage(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Param('productId') id: string,
  ) {
    console.log(files);
    return this.productsService.uploadImage(files, +id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
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
