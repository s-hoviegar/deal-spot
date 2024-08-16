import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RetailersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRetailerDto: Prisma.RetailerCreateInput) {
    return this.databaseService.retailer.create({ data: createRetailerDto });
  }

  async findAll() {
    return this.databaseService.retailer.findMany({});
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
}
