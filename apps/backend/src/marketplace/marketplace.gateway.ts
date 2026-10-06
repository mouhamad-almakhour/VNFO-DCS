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

// The production gateway stays unavailable until authenticated, owner-scoped
// orchestration is connected. Tests replace it through Nest dependency injection.
export abstract class MarketplaceGateway {
  abstract getResources(): Promise<ResourceCapacity>;
  abstract quote(resources: Resources): Promise<ResourceQuote>;
  abstract listVnfs(): Promise<VnfDetails[]>;
  abstract getVnf(vnfId: string): Promise<VnfDetails>;
  abstract prepareCreate(resources: Resources): Promise<PreparedOperation>;
  abstract prepareResize(vnfId: string, additionalResources: Resources): Promise<PreparedOperation>;
  abstract prepareTerminate(vnfId: string): Promise<PreparedOperation>;
  abstract getEvents(query: EventQuery): Promise<EventPage>;
  abstract getCloudVersion(): Promise<CloudVersion>;
}
