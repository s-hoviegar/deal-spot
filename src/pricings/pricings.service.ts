import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { RetailersService } from 'src/retailers/retailers.service';

@Injectable()
export class PricingsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly retailersService: RetailersService,
  ) {}

  async create(createPricingDto: Prisma.PricingCreateInput) {
    return this.databaseService.pricing.create({ data: createPricingDto });
  }

  async findAll(userId: number) {
    const retailers = await this.retailersService.findAll(userId);
    const results = await Promise.all(
      retailers.map(async (retailer) => {
        return {
          retailer_id: retailer.retailer_id,
          pricings: [
            ...(await this.databaseService.pricing.findMany({
              where: {
                retailer_id: retailer.retailer_id,
              },
              omit: {
                retailer_id: true,
              },
            })),
          ],
        };
      }),
    );
    return results;
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
