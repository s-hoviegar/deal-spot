import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PricingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPricingDto: Prisma.PricingCreateInput) {
    return this.databaseService.pricing.create({ data: createPricingDto });
  }

  async findAll() {
    return this.databaseService.pricing.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.pricing.findUnique({
      where: {
        price_id: id,
      },
    });
  }

  async update(id: number, updatePricingDto: Prisma.PricingUpdateInput) {
    return this.databaseService.pricing.update({
      where: {
        price_id: id,
      },
      data: updatePricingDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.pricing.delete({
      where: {
        price_id: id,
      },
    });
  }
}
