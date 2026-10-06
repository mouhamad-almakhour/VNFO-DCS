export interface Resources {
  cpuCores: number;
  memoryMiB: number;
  storageGiB: number;
}

export interface ResourceCapacity {
  available: Resources;
}

export interface ResourceQuote {
  resources: Resources;
  available: boolean;
  amountWei: string;
}

export interface VnfDetails {
  vnfId: string;
  resources: Resources;
  status: 'pending' | 'active' | 'resizing' | 'terminating' | 'terminated';
  cloudVnfId: string | null;
  cloudVnfdId: string | null;
  contractAddress: string | null;
}

export interface PreparedOperation {
  operationId: string;
  status: 'awaiting-signature';
  transactionRequest: {
    chainId: number;
    to: string;
    data: string;
    valueWei: string;
  };
}

export interface EventQuery {
  source: 'all' | 'openstack' | 'blockchain';
  limit: number;
  cursor?: string;
}

export interface LifecycleEvent {
  id: string;
  source: 'openstack' | 'blockchain';
  type: string;
  vnfId: string | null;
  occurredAt: string;
}

export interface EventPage {
  items: LifecycleEvent[];
  nextCursor: string | null;
}

export interface CloudVersion {
  versions: string[];
}
