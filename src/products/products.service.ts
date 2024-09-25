import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: CreateProductDto) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  async findAll() {
    const products = await this.databaseService.product.findMany({});

    const results = products.map(async (product) => ({
      ...product,
      imageExists: await this.imageExists(product.product_id),
      images: await this.findAllImages(product.product_id),
    }));
    return Promise.all(results);
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: {
        product_id: id,
      },
    });

    return {
      ...product,
      imageExists: await this.imageExists(product.product_id),
      images: await this.findAllImages(product.product_id),
    };
  }

  async findOneProductRatings(id: number) {
    return this.databaseService.productRating.findMany({
      where: {
        product_id: id,
      },
    });
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        product_id: id,
      },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({
      where: {
        product_id: id,
      },
    });
  }

  // PRODUCTS RATINGS crud functionalities
  async createRating(createProductRatingDto: Prisma.ProductRatingCreateInput) {
    return this.databaseService.productRating.create({
      data: createProductRatingDto,
    });
  }

  async findAllRating() {
    return this.databaseService.productRating.findMany({});
  }

  async findOneRating(id: number) {
    return this.databaseService.productRating.findUnique({
      where: {
        product_rating_id: id,
      },
    });
  }

  async updateRating(
    id: number,
    updateProductRatingDto: Prisma.ProductRatingUpdateInput,
  ) {
    return this.databaseService.productRating.update({
      where: {
        product_rating_id: id,
      },
      data: updateProductRatingDto,
    });
  }

  async removeRating(id: number) {
    return this.databaseService.productRating.delete({
      where: {
        product_rating_id: id,
      },
    });
  }

  // Product Images CRUD Functionalities
  async uploadImage(files: Array<Express.Multer.File>, productId: number) {
    const newFiles: Prisma.ProductImageCreateManyInput[] = files.map((file) => {
      return {
        name: file.filename,
        product_id: productId,
        file: `${file.path}`,
      };
    });
    console.log(newFiles);
    return this.databaseService.productImage.createMany({
      data: newFiles,
    });
  }

  async findAllImages(productId: number) {
    const images = await this.databaseService.productImage.findMany({
      where: {
        product_id: productId,
      },
    });
    if (images.length === 0) {
      return [];
    }
    return images;
  }

  private async imageExists(productId: number) {
    try {
      const images = await this.findAllImages(productId);
      if (images.length !== 0) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
}
