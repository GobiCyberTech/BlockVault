import React from 'react';
import {
  ArrowLeft,
  ArrowRightLeft,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Clock,
  ExternalLink,
  QrCode,
} from 'lucide-react';
import { HardwareAsset } from '../types';

interface AssetDetailViewProps {
  asset: HardwareAsset;
  onBack: () => void;
  onInitiateTransfer: (asset: HardwareAsset) => void;
  onVerifyInScanner: (assetId: string) => void;
}

export const AssetDetailView: React.FC<AssetDetailViewProps> = ({
  asset,
  onBack,
  onInitiateTransfer,
  onVerifyInScanner,
}) => {
  return (
    <section className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded bg-[#121c2a] border border-[#414755]/30 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded bg-[#16202f] hover:bg-[#212a39] text-[#c1c6d7] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
              {asset.id}
            </h1>
            <p className="text-[11px] font-mono text-[#48d7f9]">
              ERC-721 NFT {asset.tokenId} • Smart Contract: 0x4F8...71cB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onVerifyInScanner(asset.id)}
            className="bg-[#212a39] border border-[#414755]/40 text-[#48d7f9] hover:border-[#48d7f9] px-3 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Verify in Scanner</span>
          </button>

          <button
            onClick={() => onInitiateTransfer(asset)}
            className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Initiate Asset Transfer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Specs Card */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 space-y-4">
          <div className="p-4 rounded bg-[#050e1c] border border-[#00b8d9]/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-[#48d7f9] font-bold uppercase tracking-wider">
                  SOVEREIGN HARDWARE TOKEN
                </span>
                <h3 className="text-base font-bold text-[#d9e3f7] font-headline mt-1">
                  {asset.name}
                </h3>
              </div>
              <span className="p-2 rounded bg-[#00b8d9]/10 text-[#48d7f9] border border-[#00b8d9]/40">
                <Cpu className="w-5 h-5" />
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#414755]/20 font-mono text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Token ID:</span>
                <span className="text-[#d9e3f7] font-bold">{asset.tokenId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Owner:</span>
                <span className="text-[#6de039] font-bold">{asset.owner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Custodian:</span>
                <span className="text-[#48d7f9]">{asset.custodian}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">MAC Address / Hardware UUID:</span>
              <span className="text-[#d9e3f7] font-mono">{asset.macAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Deployment Subsystem:</span>
              <span className="text-[#d9e3f7] text-right">{asset.subsystem}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Blockchain Finality:</span>
              <span className="text-[#6de039] font-bold">{asset.blockFinality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Metadata Digest:</span>
              <span className="text-[#8b90a0] font-mono">{asset.hash.slice(0, 16)}...</span>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#414755]/20">
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Provenance & Ownership Ledger
            </h3>
            <span className="text-[11px] font-mono text-[#6de039] flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographic Integrity 100%
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {asset.provenance.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded bg-[#16202f]/60 border border-[#414755]/20 hover:border-[#48d7f9]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#1677ff]/20 text-[#48d7f9] flex items-center justify-center shrink-0">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[#d9e3f7] font-semibold font-sans">
                      {item.event}
                    </span>
                    <span className="text-[#48d7f9] text-[11px]">
                      Block #{item.blockNumber}
                    </span>
                  </div>
                  <p className="text-xs text-[#c1c6d7] mt-1 font-sans">
                    {item.details}
                  </p>
                  <div className="mt-2 text-[10px] text-[#8b90a0] flex items-center gap-3">
                    <span>Operator: {item.operator}</span>
                    <span>•</span>
                    <span>Hash: {item.txHash}</span>
                    <span>•</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
