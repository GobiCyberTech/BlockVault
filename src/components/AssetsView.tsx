import React, { useState } from 'react';
import {
  PlusSquare,
  Search,
  Cpu,
  Layers,
  Clock,
  Archive,
  ArrowRightLeft,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { HardwareAsset } from '../types';

interface AssetsViewProps {
  assets: HardwareAsset[];
  onInspectAsset: (assetId: string) => void;
  onInitiateTransfer: (asset: HardwareAsset) => void;
  onOpenRegisterAsset: () => void;
}

export const AssetsView: React.FC<AssetsViewProps> = ({
  assets,
  onInspectAsset,
  onInitiateTransfer,
  onOpenRegisterAsset,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tokenId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = assets.length;
  const escrowCount = assets.filter((a) => a.status === 'Escrow').length;
  const attestedCount = assets.filter((a) => a.status === 'Attested').length;

  return (
    <section className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
            Hardware Digital Asset Registry (ERC-721)
          </h1>
          <p className="text-xs text-[#c1c6d7]">
            Defense hardware assets tokenized as cryptographic non-fungible tokens on BEL local EVM
          </p>
        </div>

        <button
          onClick={onOpenRegisterAsset}
          className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer self-start md:self-auto"
        >
          <PlusSquare className="w-4 h-4" />
          <span>+ Register Asset</span>
        </button>
      </div>

      {/* KPI Mini Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded bg-[#121c2a] border border-[#414755]/20">
          <span className="text-[10px] font-mono text-[#8b90a0]">TOTAL REGISTRY ASSETS</span>
          <div className="text-xl font-bold font-headline text-[#d9e3f7] mt-0.5">
            {846 + (assets.length - 5)}
          </div>
        </div>
        <div className="p-3 rounded bg-[#121c2a] border border-[#414755]/20">
          <span className="text-[10px] font-mono text-[#8b90a0]">ERC-721 SMART TOKENS</span>
          <div className="text-xl font-bold font-headline text-[#48d7f9] mt-0.5">
            {792 + (assets.length - 5)}
          </div>
        </div>
        <div className="p-3 rounded bg-[#121c2a] border border-[#414755]/20">
          <span className="text-[10px] font-mono text-[#8b90a0]">TRANSFERS IN ESCROW</span>
          <div className="text-xl font-bold font-headline text-[#faad14] mt-0.5">
            {12 + escrowCount - 1}
          </div>
        </div>
        <div className="p-3 rounded bg-[#121c2a] border border-[#414755]/20">
          <span className="text-[10px] font-mono text-[#8b90a0]">DECOMMISSIONED</span>
          <div className="text-xl font-bold font-headline text-[#8b90a0] mt-0.5">
            42
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by asset tag, name, owner, or token ID..."
            className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 pl-8 text-[11px] font-mono text-[#d9e3f7] focus:border-[#48d7f9] focus:outline-none placeholder:text-[#8b90a0]"
          />
          <Search className="w-3.5 h-3.5 text-[#8b90a0] absolute left-2.5 top-2.5" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#16202f] border border-[#414755]/40 text-[#d9e3f7] text-xs rounded px-2.5 py-1.5 focus:border-[#48d7f9] focus:outline-none cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="Attested">Attested</option>
          <option value="Escrow">In Escrow</option>
          <option value="Decommissioned">Decommissioned</option>
        </select>
      </div>

      {/* Asset Table */}
      <div className="rounded bg-[#121c2a] border border-[#414755]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#16202f] text-[11px] font-mono text-[#8b90a0] border-b border-[#414755]/30">
                <th className="py-3 px-4">ASSET SERIAL / ID</th>
                <th className="py-3 px-4">CLASSIFICATION & NAME</th>
                <th className="py-3 px-4">NFT TOKEN ID</th>
                <th className="py-3 px-4">CURRENT OWNER / DEPT</th>
                <th className="py-3 px-4">METADATA HASH (SHA-256)</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">OPERATIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#414755]/10">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  className="hover:bg-[#16202f]/40 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#48d7f9]">
                    {asset.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#d9e3f7]">{asset.name}</div>
                    <div className="text-[#8b90a0] text-[10px] font-mono">{asset.subsystem}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#6de039] font-bold">
                    {asset.tokenId}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#2c3545] text-[#d9e3f7] text-[10px] font-mono">
                      {asset.owner}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#8b90a0]">
                    {asset.hash.slice(0, 16)}...
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        asset.status === 'Attested'
                          ? 'bg-[#6de039]/10 text-[#6de039] border-[#6de039]/30'
                          : asset.status === 'Escrow'
                          ? 'bg-[#faad14]/10 text-[#faad14] border-[#faad14]/30'
                          : 'bg-[#ff4d4f]/10 text-[#ff4d4f] border-[#ff4d4f]/30'
                      }`}
                    >
                      {asset.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => onInspectAsset(asset.id)}
                      className="px-2.5 py-1 bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/40 hover:border-[#48d7f9] rounded text-[11px] font-mono text-[#48d7f9] transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </button>
                    <button
                      onClick={() => onInitiateTransfer(asset)}
                      className="px-2.5 py-1 bg-[#1677ff]/20 hover:bg-[#1677ff]/30 border border-[#1677ff]/40 rounded text-[11px] font-mono text-[#afc6ff] transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <ArrowRightLeft className="w-3 h-3" />
                      <span>Transfer</span>
                    </button>
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
