import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceGateway } from './marketplace.gateway';
import { MarketplaceService } from './marketplace.service';
import { UnavailableMarketplaceGateway } from './unavailable-marketplace.gateway';

@Module({
  controllers: [MarketplaceController],
  providers: [
    MarketplaceService,
    { provide: MarketplaceGateway, useClass: UnavailableMarketplaceGateway },
  ],
})
export class MarketplaceModule {}
