import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
          file: `${file.path}`,
        };
      },
    );
    return this.databaseService.retailerImage.createMany({
      data: newFiles,
    });
  }

  async findAll(userId: number) {
    const retailers = await this.databaseService.retailer.findMany({
      where: {
        owner_id: userId,
      },
    });
    const results = retailers.map(async (retailer) => ({
      ...retailer,
      imageExists: await this.imageExists(retailer.retailer_id),
      images: await this.findAllImages(retailer.retailer_id),
    }));
    return Promise.all(results);
  }

  async findOne(id: number, userId: number) {
    const retailer = await this.databaseService.retailer.findUnique({
      where: {
        retailer_id: id,
      },
    });
    if (retailer.owner_id === userId) {
      return {
        ...retailer,
        imageExists: await this.imageExists(retailer.retailer_id),
        images: await this.findAllImages(retailer.retailer_id),
      };
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
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

  // Retailer images crud
  async findAllImages(retailerId: number) {
    const images = await this.databaseService.retailerImage.findMany({
      where: {
        retailer_id: retailerId,
      },
    });
    if (images.length === 0) {
      return [];
    }
    return images;
  }

  private async imageExists(retailerId: number) {
    try {
      const images = await this.findAllImages(retailerId);
      if (images.length !== 0) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
}
