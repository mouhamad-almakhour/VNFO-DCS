import { Injectable } from '@nestjs/common';
import { MarketplaceGateway } from './marketplace.gateway';
import type {
  CloudVersion,
  EventPage,
  EventQuery,
  PreparedOperation,
  ResourceCapacity,
  ResourceQuote,
  Resources,
  VnfDetails,
} from './marketplace.types';

@Injectable()
export class MarketplaceService {
  constructor(private readonly gateway: MarketplaceGateway) {}

  getResources(): Promise<ResourceCapacity> {
    return this.gateway.getResources();
  }

  quote(resources: Resources): Promise<ResourceQuote> {
    return this.gateway.quote(resources);
  }

  listVnfs(): Promise<VnfDetails[]> {
    return this.gateway.listVnfs();
  }

  getVnf(vnfId: string): Promise<VnfDetails> {
    return this.gateway.getVnf(vnfId);
  }

  prepareCreate(resources: Resources): Promise<PreparedOperation> {
    return this.gateway.prepareCreate(resources);
  }

  prepareResize(vnfId: string, additionalResources: Resources): Promise<PreparedOperation> {
    return this.gateway.prepareResize(vnfId, additionalResources);
  }

  prepareTerminate(vnfId: string): Promise<PreparedOperation> {
    return this.gateway.prepareTerminate(vnfId);
  }

  getEvents(query: EventQuery): Promise<EventPage> {
    return this.gateway.getEvents(query);
  }

  getCloudVersion(): Promise<CloudVersion> {
    return this.gateway.getCloudVersion();
  }
}
