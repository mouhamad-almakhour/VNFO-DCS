import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MarketplaceGateway } from './marketplace.gateway';
import type {
  CloudVersion,
  EventPage,
  PreparedOperation,
  ResourceCapacity,
  ResourceQuote,
  VnfDetails,
} from './marketplace.types';

@Injectable()
export class UnavailableMarketplaceGateway extends MarketplaceGateway {
  override getResources(): Promise<ResourceCapacity> {
    return this.unavailable();
  }

  override quote(): Promise<ResourceQuote> {
    return this.unavailable();
  }

  override listVnfs(): Promise<VnfDetails[]> {
    return this.unavailable();
  }

  override getVnf(): Promise<VnfDetails> {
    return this.unavailable();
  }

  override prepareCreate(): Promise<PreparedOperation> {
    return this.unavailable();
  }

  override prepareResize(): Promise<PreparedOperation> {
    return this.unavailable();
  }

  override prepareTerminate(): Promise<PreparedOperation> {
    return this.unavailable();
  }

  override getEvents(): Promise<EventPage> {
    return this.unavailable();
  }

  override getCloudVersion(): Promise<CloudVersion> {
    return this.unavailable();
  }

  private unavailable<T>(): Promise<T> {
    return Promise.reject(new ServiceUnavailableException(
      'Marketplace integrations are not connected yet.',
    ));
  }
}
