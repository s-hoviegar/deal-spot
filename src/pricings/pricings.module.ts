import { Module } from '@nestjs/common';
import { PricingsService } from './pricings.service';
import { PricingsController } from './pricings.controller';
import { RetailersService } from 'src/retailers/retailers.service';

@Module({
  controllers: [PricingsController],
  providers: [PricingsService, RetailersService],
})
export class PricingsModule {}
