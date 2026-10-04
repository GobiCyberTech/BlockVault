export type RoleTier = 'Admin' | 'Manager' | 'Auditor' | 'User';

export type Department = 'Department A (HQ)' | 'Department B (Naval Fleet)' | 'Cyber SOC (Defense Ops)' | 'Aerospace Division';

export interface TimelineEvent {
  id: string;
  title: string;
  subtitle: string;
  block?: string;
  timestamp: string;
  type: 'mint' | 'transfer' | 'attestation' | 'role' | 'freeze';
}

export interface OfficerIdentity {
  id: string;
  name: string;
  did: string;
  wallet: string;
  role: RoleTier;
  roleTitle: string;
  department: Department;
  status: 'ACTIVE' | 'SUSPENDED' | 'REVOKED';
  clearance: string;
  publicKeyHash: string;
  assetsCount: number;
  lastActivity: string;
  assignedAssetIds: string[];
  timeline: TimelineEvent[];
}

export interface ProvenanceRecord {
  id: string;
  event: string;
  blockNumber: number;
  txHash: string;
  operator: string;
  details: string;
  timestamp: string;
}

export interface HardwareAsset {
  id: string; // e.g. BEL-SRV-001
  name: string;
  tokenId: string; // #1001
  owner: Department;
  custodian: string;
  hash: string; // SHA-256
  status: 'Attested' | 'Escrow' | 'Decommissioned' | 'Tampered';
  macAddress: string;
  subsystem: string;
  blockFinality: string;
  provenance: ProvenanceRecord[];
}

export interface BlockchainBlock {
  blockNumber: number;
  txHash: string;
  action: string;
  originatingDid: string;
  targetIdentifier: string;
  timestamp: string;
  status: 'FINALIZED' | 'PENDING' | 'REVERTED';
  gasUsed: number;
}

export interface SOCAlert {
  id: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  timestamp: string;
  targetView?: string;
  resolved: boolean;
}

export interface DefenseNode {
  id: string;
  name: string;
  subnet: string;
  status: 'ONLINE' | 'STANDBY' | 'SYNCING';
  hsmStatus: 'LEVEL 4 VALID' | 'BENCHMARKING';
  latencyMs: number;
  role: 'Consensus Validator' | 'Witness Node' | 'Archive Sentinel';
}
