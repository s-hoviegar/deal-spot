import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createProductDto });
  }

  async findAll() {
    return this.databaseService.product.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: {
        product_id: id,
      },
    });
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
}
