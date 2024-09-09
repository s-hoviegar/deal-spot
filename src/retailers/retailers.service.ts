import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateRetailerDto } from './dto/create-retailer.dto';

@Injectable()
export class RetailersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRetailerDto: CreateRetailerDto, userId: number) {
    // console.log(createRetailerDto);
    return this.databaseService.retailer.create({
      data: { ...createRetailerDto, owner_id: userId },
    });
  }

  async uploadImage(files: Array<Express.Multer.File>, retailerId: number) {
    const newFiles: Prisma.RetailerImageCreateManyInput[] = files.map(
      (file) => {
        return {
          name: file.filename,
          retailer_id: retailerId,
          file: `${file.path}/${file.filename}`,
        };
      },
    );
    return this.databaseService.retailerImage.createMany({
      data: newFiles,
    });
  }

  async findAll(userId: number) {
    return this.databaseService.retailer.findMany({
      where: {
        owner_id: userId,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.retailer.findUnique({
      where: {
        retailer_id: id,
      },
    });
  }

  async update(id: number, updateRetailerDto: Prisma.RetailerUpdateInput) {
    return this.databaseService.retailer.update({
      where: {
        retailer_id: id,
      },
      data: updateRetailerDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.retailer.delete({
      where: {
        retailer_id: id,
      },
    });
  }

  // RETAILERS RATINGS crud functionalities
  async createRating(
    createRetailerRatingDto: Prisma.RetailerRatingCreateInput,
  ) {
    return this.databaseService.retailerRating.create({
      data: createRetailerRatingDto,
    });
  }

  async findAllRating() {
    return this.databaseService.retailerRating.findMany({});
  }

  async findOneRating(id: number) {
    return this.databaseService.retailerRating.findUnique({
      where: {
        retailer_rating_id: id,
      },
    });
  }

  async findOneRetailerRatings(id: number) {
    return this.databaseService.retailerRating.findMany({
      where: {
        retailer_id: id,
      },
    });
  }

  async updateRating(
    id: number,
    updateRetailerRatingDto: Prisma.RetailerRatingUpdateInput,
  ) {
    return this.databaseService.retailerRating.update({
      where: {
        retailer_rating_id: id,
      },
      data: updateRetailerRatingDto,
    });
  }

  async removeRating(id: number) {
    return this.databaseService.retailerRating.delete({
      where: {
        retailer_rating_id: id,
      },
    });
  }
}
