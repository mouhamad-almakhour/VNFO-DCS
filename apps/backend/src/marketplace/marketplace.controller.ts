import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { EventsQueryDto } from './dto/events-query.dto';
import { ResourceRequestDto } from './dto/resource-request.dto';
import { MarketplaceService } from './marketplace.service';
import type { CloudVersion, EventPage, PreparedOperation, ResourceCapacity, ResourceQuote, VnfDetails } from './marketplace.types';

@Controller()
export class MarketplaceController {
  constructor(private readonly marketplace: MarketplaceService) {}

  @Get('resources')
  getResources(): Promise<ResourceCapacity> {
    return this.marketplace.getResources();
  }

  @Post('quotes')
  @HttpCode(HttpStatus.OK)
  quote(@Body() resources: ResourceRequestDto): Promise<ResourceQuote> {
    return this.marketplace.quote(resources);
  }

  @Get('vnfs')
  listVnfs(): Promise<VnfDetails[]> {
    return this.marketplace.listVnfs();
  }

  @Get('vnfs/:vnfId')
  getVnf(@Param('vnfId', new ParseUUIDPipe({ version: '4' })) vnfId: string): Promise<VnfDetails> {
    return this.marketplace.getVnf(vnfId);
  }

  @Post('vnfs')
  @HttpCode(HttpStatus.ACCEPTED)
  prepareCreate(@Body() resources: ResourceRequestDto): Promise<PreparedOperation> {
    return this.marketplace.prepareCreate(resources);
  }

  @Post('vnfs/:vnfId/resize')
  @HttpCode(HttpStatus.ACCEPTED)
  prepareResize(
    @Param('vnfId', new ParseUUIDPipe({ version: '4' })) vnfId: string,
    @Body() additionalResources: ResourceRequestDto,
  ): Promise<PreparedOperation> {
    return this.marketplace.prepareResize(vnfId, additionalResources);
  }

  @Delete('vnfs/:vnfId')
  @HttpCode(HttpStatus.ACCEPTED)
  prepareTerminate(
    @Param('vnfId', new ParseUUIDPipe({ version: '4' })) vnfId: string,
  ): Promise<PreparedOperation> {
    return this.marketplace.prepareTerminate(vnfId);
  }

  @Get('events')
  getEvents(@Query() query: EventsQueryDto): Promise<EventPage> {
    return this.marketplace.getEvents(query);
  }

  @Get('openstack/version')
  getCloudVersion(): Promise<CloudVersion> {
    return this.marketplace.getCloudVersion();
  }
}
