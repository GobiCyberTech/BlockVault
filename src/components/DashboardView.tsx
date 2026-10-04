import React from 'react';
import {
  ShieldCheck,
  RefreshCw,
  BadgeAlert,
  Cpu,
  Layers,
  Clock,
  Activity,
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserPlus,
  PlusSquare,
  QrCode,
  Sparkles,
  ExternalLink,
  Copy,
} from 'lucide-react';
import { BlockchainBlock } from '../types';

interface DashboardViewProps {
  currentBlock: number;
  isSyncing: boolean;
  onSyncLedger: () => void;
  onNavigate: (view: string) => void;
  onOpenCreateIdentity: () => void;
  onOpenRegisterAsset: () => void;
  identitiesCount: number;
  activeAssetsCount: number;
  nftAssetsCount: number;
  pendingTransfersCount: number;
  eventsCount: number;
  securityScore: number;
  recentBlocks: BlockchainBlock[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentBlock,
  isSyncing,
  onSyncLedger,
  onNavigate,
  onOpenCreateIdentity,
  onOpenRegisterAsset,
  identitiesCount,
  activeAssetsCount,
  nftAssetsCount,
  pendingTransfersCount,
  eventsCount,
  securityScore,
  recentBlocks,
}) => {
  const [copiedHash, setCopiedHash] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  return (
    <section className="space-y-6">
      {/* Top Banner / Trust Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded bg-[#121c2a] border border-[#414755]/30 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded bg-[#00b8d9]/10 border border-[#00b8d9]/30 text-[#48d7f9]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
              Bharat Electronics Limited Sovereign Trust Fabric
            </h1>
            <p className="text-xs text-[#c1c6d7]">
              Defense-grade Zero-Trust PKI • ERC-721 Hardware Tokenization • Real-time EVM Consensus
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded bg-[#0b2524] border border-[#00b8d9] text-[#48d7f9] text-[11px] font-mono flex items-center gap-1.5 font-bold">
            <Lock className="w-3 h-3 text-[#48d7f9]" />
            VALIDATED: BLOCK #{currentBlock}
          </span>
          <button
            onClick={onSyncLedger}
            disabled={isSyncing}
            className="px-3 py-1 bg-[#212a39] border border-[#414755]/40 rounded text-xs font-medium text-[#d9e3f7] hover:border-[#48d7f9] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#48d7f9]' : ''}`} />
            <span>Sync Ledger</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Bento Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: DPKI Identities */}
        <button
          onClick={() => onNavigate('identities')}
          className="p-4 rounded bg-[#121c2a] border border-[#414755]/20 hover:border-[#48d7f9]/50 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0]">
            <span>DPKI IDENTITIES</span>
            <BadgeAlert className="w-3.5 h-3.5 text-[#48d7f9] group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#d9e3f7] tabular-nums">
            {identitiesCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#6de039] flex items-center gap-1">
            <span>↑ +4 this week</span>
          </div>
        </button>

        {/* KPI 2: Active Assets */}
        <button
          onClick={() => onNavigate('assets')}
          className="p-4 rounded bg-[#121c2a] border border-[#414755]/20 hover:border-[#48d7f9]/50 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0]">
            <span>ACTIVE ASSETS</span>
            <Cpu className="w-3.5 h-3.5 text-[#48d7f9] group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#d9e3f7] tabular-nums">
            {activeAssetsCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#48d7f9] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#48d7f9]"></span>
            <span>100% Attested</span>
          </div>
        </button>

        {/* KPI 3: NFT Assets */}
        <button
          onClick={() => onNavigate('assets')}
          className="p-4 rounded bg-[#121c2a] border border-[#414755]/20 hover:border-[#48d7f9]/50 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0]">
            <span>NFT ASSETS (ERC-721)</span>
            <Layers className="w-3.5 h-3.5 text-[#48d7f9] group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#d9e3f7] tabular-nums">
            {nftAssetsCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#6de039] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Minted on Local EVM</span>
          </div>
        </button>

        {/* KPI 4: Pending Transfers */}
        <button
          onClick={() => onNavigate('asset-details')}
          className="p-4 rounded bg-[#121c2a] border border-[#414755]/20 hover:border-[#48d7f9]/50 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0]">
            <span>PENDING TRANSFERS</span>
            <Clock className="w-3.5 h-3.5 text-[#faad14] group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#d9e3f7] tabular-nums">
            {pendingTransfersCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#faad14] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#faad14]"></span>
            <span>Multisig pending</span>
          </div>
        </button>

        {/* KPI 5: Blockchain Events */}
        <button
          onClick={() => onNavigate('audit')}
          className="p-4 rounded bg-[#121c2a] border border-[#414755]/20 hover:border-[#48d7f9]/50 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0]">
            <span>BLOCKCHAIN EVENTS</span>
            <Activity className="w-3.5 h-3.5 text-[#48d7f9] group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#d9e3f7] tabular-nums">
            {eventsCount.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#6de039] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6de039] animate-ping"></span>
            <span>0 Reverts</span>
          </div>
        </button>

        {/* KPI 6: Security Score */}
        <button
          onClick={() => onNavigate('rbac')}
          className="p-4 rounded bg-[#121c2a] border border-[#414755]/20 hover:border-[#6de039]/50 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0]">
            <span>SECURITY SCORE</span>
            <Shield className="w-3.5 h-3.5 text-[#6de039] group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 text-2xl font-bold font-headline text-[#6de039] tabular-nums">
            {securityScore}%
          </div>
          <div className="mt-1 text-[11px] font-mono text-[#6de039]">
            Defense Spec Tier-4
          </div>
        </button>
      </div>

      {/* Signature Interactive Cryptographic Chain */}
      <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-[#414755]/20 gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#48d7f9] font-bold">
              End-to-End Cryptographic Chain
            </span>
            <h2 className="text-base font-bold text-[#d9e3f7] font-headline">
              BEL Sovereign Trust Pipeline
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#8b90a0]">
            Click any node to navigate to relevant enforcement module
          </span>
        </div>

        {/* Trust Chain Nodes */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {/* Node 1 */}
          <button
            onClick={() => onNavigate('identities')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>01. DPKI</span>
              <BadgeAlert className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Identity
            </div>
            <div className="text-[11px] font-mono text-[#6de039] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6de039]"></span>
              <span>DID Verified</span>
            </div>
          </button>

          {/* Node 2 */}
          <button
            onClick={() => onNavigate('rbac')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>02. RBAC</span>
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Role Matrix
            </div>
            <div className="text-[11px] font-mono text-[#48d7f9] flex items-center gap-1.5">
              <span>4 Active Tiers</span>
            </div>
          </button>

          {/* Node 3 */}
          <button
            onClick={() => onNavigate('rbac')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>03. ACCESS</span>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Permission
            </div>
            <div className="text-[11px] font-mono text-[#6de039] flex items-center gap-1.5">
              <span>Zero-Trust Gate</span>
            </div>
          </button>

          {/* Node 4 */}
          <button
            onClick={() => onNavigate('assets')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>04. ASSET</span>
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Hardware Token
            </div>
            <div className="text-[11px] font-mono text-[#48d7f9] flex items-center gap-1.5">
              <span>ERC-721 Spec</span>
            </div>
          </button>

          {/* Node 5 */}
          <button
            onClick={() => onNavigate('asset-details')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>05. TITLE</span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Ownership
            </div>
            <div className="text-[11px] font-mono text-[#6de039] flex items-center gap-1.5">
              <span>Attested DID</span>
            </div>
          </button>

          {/* Node 6 */}
          <button
            onClick={() => onNavigate('scanner')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>06. CONSENSUS</span>
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Blockchain EVM
            </div>
            <div className="text-[11px] font-mono text-[#6de039] flex items-center gap-1.5">
              <span>Block Finality</span>
            </div>
          </button>

          {/* Node 7 */}
          <button
            onClick={() => onNavigate('audit')}
            className="group p-3 rounded bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/30 hover:border-[#48d7f9] transition-all text-left flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8b90a0] group-hover:text-[#48d7f9]">
              <span>07. INTEGRITY</span>
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div className="my-2 font-bold text-sm text-[#d9e3f7] group-hover:text-[#48d7f9]">
              Audit Trail
            </div>
            <div className="text-[11px] font-mono text-[#48d7f9] flex items-center gap-1.5">
              <span>Tamper-Proof</span>
            </div>
          </button>
        </div>
      </div>

      {/* Middle Grid: AI Security Intelligence, Health Breakdown & Immediate Ops */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: AI Security Intelligence */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#48d7f9] text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-[#48d7f9]" />
                AI Security Intelligence
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#6de039]/10 text-[#6de039] border border-[#6de039]/30 text-[10px] font-mono font-bold">
                CONFIDENCE 94%
              </span>
            </div>

            <div className="mt-4 p-3 rounded bg-[#16202f] border border-[#414755]/20">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#8b90a0]">SYSTEM RISK LEVEL</span>
                <span className="text-[#6de039] font-bold">LOW (0.04)</span>
              </div>
              <div className="w-full bg-[#050e1c] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#6de039] h-full w-[4%]"></div>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#c1c6d7] leading-relaxed">
              “AI provides security recommendations; smart contracts enforce authorization.” System
              detected zero anomalous DID delegation attempts in the past 24 hours. Hardware
              security module (HSM) attestation parameters conform strictly to BEL Tier-4 Sovereign
              Defense protocols.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#414755]/20 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#8b90a0]">Smart Contract Guard:</span>
            <span className="text-[#48d7f9]">0x4F8...71cB (Active)</span>
          </div>
        </div>

        {/* Panel 2: Security Health Matrix */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
                Security Health Matrix
              </h3>
              <span className="text-[#6de039] text-[11px] font-mono flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Operational
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Identity */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#d9e3f7]">Identity Authenticity</span>
                  <span className="text-[#48d7f9] font-mono">98%</span>
                </div>
                <div className="w-full bg-[#16202f] h-2 rounded overflow-hidden">
                  <div className="bg-[#48d7f9] h-full rounded w-[98%]"></div>
                </div>
              </div>

              {/* Access */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#d9e3f7]">Access Authorization Rigor</span>
                  <span className="text-[#1677ff] font-mono">95%</span>
                </div>
                <div className="w-full bg-[#16202f] h-2 rounded overflow-hidden">
                  <div className="bg-[#1677ff] h-full rounded w-[95%]"></div>
                </div>
              </div>

              {/* Asset Integrity */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#d9e3f7]">Digital Asset Integrity</span>
                  <span className="text-[#48d7f9] font-mono">97%</span>
                </div>
                <div className="w-full bg-[#16202f] h-2 rounded overflow-hidden">
                  <div className="bg-[#48d7f9] h-full rounded w-[97%]"></div>
                </div>
              </div>

              {/* Immutable Audit */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#d9e3f7]">Immutable Audit Coverage</span>
                  <span className="text-[#6de039] font-mono">100%</span>
                </div>
                <div className="w-full bg-[#16202f] h-2 rounded overflow-hidden">
                  <div className="bg-[#6de039] h-full rounded w-[100%] shadow-[0_0_8px_rgba(109,224,57,0.4)]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#414755]/20 text-[11px] font-mono text-[#8b90a0] flex items-center justify-between">
            <span>Next Attestation Scan:</span>
            <span className="text-[#d9e3f7]">In 14 mins</span>
          </div>
        </div>

        {/* Panel 3: Immediate Operations */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Immediate Operations
            </h3>
            <p className="text-xs text-[#c1c6d7] mt-1">
              One-click privileged workflows with smart contract verification
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={onOpenCreateIdentity}
                className="w-full p-2.5 rounded bg-[#16202f] border border-[#414755]/30 hover:border-[#48d7f9] hover:bg-[#212a39] transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="flex items-center gap-2.5 text-xs font-medium text-[#d9e3f7] group-hover:text-[#48d7f9]">
                  <UserPlus className="w-4 h-4 text-[#48d7f9]" />
                  Issue New Sovereign DPKI
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8b90a0] group-hover:text-[#48d7f9]" />
              </button>

              <button
                onClick={onOpenRegisterAsset}
                className="w-full p-2.5 rounded bg-[#16202f] border border-[#414755]/30 hover:border-[#48d7f9] hover:bg-[#212a39] transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="flex items-center gap-2.5 text-xs font-medium text-[#d9e3f7] group-hover:text-[#48d7f9]">
                  <PlusSquare className="w-4 h-4 text-[#48d7f9]" />
                  Tokenize Hardware (ERC-721)
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8b90a0] group-hover:text-[#48d7f9]" />
              </button>

              <button
                onClick={() => onNavigate('scanner')}
                className="w-full p-2.5 rounded bg-[#16202f] border border-[#414755]/30 hover:border-[#48d7f9] hover:bg-[#212a39] transition-all flex items-center justify-between text-left cursor-pointer group"
              >
                <span className="flex items-center gap-2.5 text-xs font-medium text-[#d9e3f7] group-hover:text-[#48d7f9]">
                  <QrCode className="w-4 h-4 text-[#48d7f9]" />
                  Scan & Verify Physical Tag
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8b90a0] group-hover:text-[#48d7f9]" />
              </button>
            </div>
          </div>

          <div className="mt-4 p-2 bg-[#050e1c] rounded text-[11px] font-mono flex items-center justify-between border border-[#414755]/20">
            <span className="text-[#8b90a0]">Active Role:</span>
            <span className="text-[#6de039] font-bold">SUPER_ADMIN (BEL-HQ)</span>
          </div>
        </div>
      </div>

      {/* Live Blockchain Activity Feed */}
      <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30">
        <div className="flex items-center justify-between pb-3 border-b border-[#414755]/20">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#48d7f9]" />
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Live Blockchain Activity Feed
            </h3>
          </div>
          <button
            onClick={() => onNavigate('audit')}
            className="text-xs text-[#48d7f9] hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>View Complete Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[11px] font-mono text-[#8b90a0] border-b border-[#414755]/20">
                <th className="py-2.5 px-3">BLOCK / TX HASH</th>
                <th className="py-2.5 px-3">ACTION EVENT</th>
                <th className="py-2.5 px-3">ORIGINATING DID</th>
                <th className="py-2.5 px-3">TARGET IDENTIFIER</th>
                <th className="py-2.5 px-3">TIMESTAMP</th>
                <th className="py-2.5 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#414755]/10 font-mono text-[11px]">
              {recentBlocks.map((block) => (
                <tr
                  key={block.blockNumber}
                  className="hover:bg-[#16202f]/40 transition-colors"
                >
                  <td className="py-2.5 px-3 text-[#48d7f9]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#d9e3f7] font-bold">#{block.blockNumber}</span>
                      <button
                        onClick={() => copyToClipboard(block.txHash)}
                        title="Copy transaction hash"
                        className="text-[#8b90a0] hover:text-[#48d7f9] flex items-center gap-1 cursor-pointer"
                      >
                        <span>{block.txHash.slice(0, 10)}...</span>
                        <Copy className="w-3 h-3 opacity-60 hover:opacity-100" />
                      </button>
                      {copiedHash === block.txHash && (
                        <span className="text-[9px] text-[#6de039]">Copied</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-[#d9e3f7] font-sans font-medium">
                    {block.action}
                  </td>
                  <td className="py-2.5 px-3 text-[#8b90a0]">
                    {block.originatingDid}
                  </td>
                  <td className="py-2.5 px-3 text-[#afc6ff]">
                    {block.targetIdentifier}
                  </td>
                  <td className="py-2.5 px-3 text-[#8b90a0]">
                    {block.timestamp}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-[#6de039]/10 text-[#6de039] border border-[#6de039]/30 text-[10px] font-bold">
                      {block.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
