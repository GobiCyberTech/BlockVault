import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Shield,
  BadgeAlert,
  Cpu,
  History,
  AlertTriangle,
} from 'lucide-react';
import { OfficerIdentity, HardwareAsset } from '../types';

interface IdentityDetailViewProps {
  identity: OfficerIdentity;
  onBack: () => void;
  onInspectAsset: (assetId: string) => void;
  onRevokeCredentials: (identityId: string) => void;
  assets: HardwareAsset[];
}

export const IdentityDetailView: React.FC<IdentityDetailViewProps> = ({
  identity,
  onBack,
  onInspectAsset,
  onRevokeCredentials,
  assets,
}) => {
  const assignedAssets = assets.filter(
    (a) =>
      identity.assignedAssetIds.includes(a.id) ||
      a.custodian.toLowerCase().includes(identity.name.split(',')[0].toLowerCase())
  );

  return (
    <section className="space-y-6">
      {/* Top Breadcrumb & Status */}
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
              {identity.name}
            </h1>
            <p className="text-[11px] font-mono text-[#48d7f9]">
              {identity.did}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#0b2524] border border-[#00b8d9] text-[#48d7f9] text-[10px] font-mono font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#48d7f9]" />
            DID Cryptographically Verified
          </span>
          <span className="px-2.5 py-1 rounded bg-[#6de039]/10 border border-[#6de039]/40 text-[#6de039] text-[10px] font-mono font-bold flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#6de039]" />
            Hardware Signature Valid
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded bg-[#212a39] border-2 border-[#48d7f9]/60 flex items-center justify-center text-[#48d7f9] text-3xl shrink-0">
              <Shield className="w-8 h-8 text-[#48d7f9]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#d9e3f7] font-headline">
                {identity.name}
              </h3>
              <span className="text-xs text-[#8b90a0] block mt-0.5">
                {identity.roleTitle}
              </span>
              <div className="mt-1.5">
                <span className="px-2 py-0.5 rounded bg-[#6de039]/20 text-[#6de039] text-[10px] font-mono font-bold">
                  STATUS: {identity.status}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-[#414755]/20 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Assigned Department:</span>
              <span className="text-[#d9e3f7]">{identity.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Wallet Address:</span>
              <span className="text-[#48d7f9]">{identity.wallet}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Public Key Hash:</span>
              <span className="text-[#d9e3f7]">{identity.publicKeyHash}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Security Clearance:</span>
              <span className="text-[#6de039] font-bold">{identity.clearance}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onRevokeCredentials(identity.id)}
              className="w-full py-2 bg-[#93000a]/20 border border-[#ff4d4f]/40 text-[#ff4d4f] rounded text-xs font-semibold hover:bg-[#93000a]/40 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Revoke Credentials / Suspend</span>
            </button>
          </div>
        </div>

        {/* Owned Assets & Timeline */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[#414755]/20">
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Assigned Hardware & NFT Assets
            </h3>
            <span className="text-[11px] font-mono text-[#48d7f9]">
              {assignedAssets.length} Tokens Assigned
            </span>
          </div>

          {assignedAssets.length === 0 ? (
            <div className="p-4 rounded bg-[#16202f] border border-[#414755]/20 text-xs text-[#8b90a0] text-center">
              No hardware assets currently assigned to this identity.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {assignedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-3.5 rounded bg-[#16202f] border border-[#414755]/30 flex items-center justify-between hover:border-[#48d7f9]/50 transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-[#48d7f9] font-mono">
                      {asset.id}
                    </div>
                    <div className="text-xs text-[#d9e3f7] font-medium mt-0.5">
                      {asset.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#8b90a0] mt-1">
                      ERC-721 Token {asset.tokenId}
                    </div>
                  </div>
                  <button
                    onClick={() => onInspectAsset(asset.id)}
                    className="px-2.5 py-1 rounded bg-[#212a39] hover:bg-[#2c3545] border border-[#414755]/40 text-[11px] font-mono text-[#d9e3f7] hover:text-[#48d7f9] transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Identity Lifecycle Timeline */}
          <div className="pt-4 border-t border-[#414755]/20">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#8b90a0] mb-3 font-semibold">
              Identity Lifecycle Timeline
            </h4>
            <div className="space-y-3 font-mono text-xs">
              {identity.timeline.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      event.type === 'attestation'
                        ? 'bg-[#6de039]'
                        : event.type === 'role'
                        ? 'bg-[#48d7f9]'
                        : 'bg-[#1677ff]'
                    }`}
                  ></span>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-[#d9e3f7] font-semibold block sm:inline">
                        {event.title}
                      </span>
                      <p className="text-[#8b90a0] text-[11px] mt-0.5">
                        {event.subtitle}
                      </p>
                    </div>
                    <span className="text-[#8b90a0] text-[11px] shrink-0">
                      {event.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
