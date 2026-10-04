import React, { useState } from 'react';
import {
  History,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Search,
  Database,
  Layers,
  ArrowRight,
  FileSearch,
} from 'lucide-react';
import { BlockchainBlock } from '../types';

interface AuditViewProps {
  recentBlocks: BlockchainBlock[];
  activeDepartment: string;
  onReconcile: () => void;
  isReconciled: boolean;
}

export const AuditView: React.FC<AuditViewProps> = ({
  recentBlocks,
  activeDepartment,
  onReconcile,
  isReconciled,
}) => {
  const [isAuditing, setIsAuditing] = useState(false);
  const [forensicInfo, setForensicInfo] = useState<string | null>(null);

  const handleRunTamperAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      alert(
        'Tamper Audit Scan Completed:\nVerified 846 ERC-721 smart tokens across 4 defense nodes. Merkle root signature 0x992fa...11c8 confirmed authentic. 0 unauthorized bytecode manipulations found.'
      );
    }, 900);
  };

  const handleInvestigateForensic = () => {
    setForensicInfo(
      'Forensic Investigation Report:\n• Nonce: 42 verified on secp256k1 keypair.\n• Multi-Sig Escrow Signatures: 2 of 3 valid.\n• Off-chain cache latency was 450ms during block #18495 mining.\n• Zero private key leakage detected.'
    );
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
            Immutable Audit Trail & Tamper Detection
          </h1>
          <p className="text-xs text-[#c1c6d7]">
            Real-time discrepancy detection between local database records and sovereign ledger
          </p>
        </div>

        <button
          onClick={handleRunTamperAudit}
          disabled={isAuditing}
          className="bg-[#00b8d9] text-[#003641] px-3.5 py-2 rounded text-xs font-semibold hover:bg-[#48d7f9] transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>Run Tamper Audit</span>
        </button>
      </div>

      {/* Forensic Info Modal / Notification */}
      {forensicInfo && (
        <div className="p-4 rounded bg-[#050e1c] border border-[#00b8d9]/50 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-[#48d7f9] font-bold">
            <span className="flex items-center gap-1.5">
              <FileSearch className="w-4 h-4" />
              Forensic Hash Analysis (BEL-SRV-001)
            </span>
            <button
              onClick={() => setForensicInfo(null)}
              className="text-[#8b90a0] hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          <pre className="text-[#c1c6d7] whitespace-pre-wrap font-mono">{forensicInfo}</pre>
        </div>
      )}

      {/* RECORD INTEGRITY CHECK / TAMPER DETECTION CARD */}
      <div
        className={`p-5 rounded transition-all space-y-4 border ${
          isReconciled
            ? 'bg-[#121c2a] border-[#6de039]/60 shadow-[0_0_16px_rgba(109,224,57,0.1)]'
            : 'bg-gradient-to-r from-[#121c2a] to-[#93000a]/20 border-[#ff4d4f]/60'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div
            className={`flex items-center gap-2 font-bold text-sm font-headline ${
              isReconciled ? 'text-[#6de039]' : 'text-[#ff4d4f]'
            }`}
          >
            {isReconciled ? (
              <CheckCircle2 className="w-5 h-5 text-[#6de039]" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-[#ff4d4f]" />
            )}
            <span>
              {isReconciled
                ? 'RECORD INTEGRITY VERIFIED • ALL STORES RECONCILED'
                : 'RECORD INTEGRITY CHECK • TAMPER DISCREPANCY INTERCEPTED'}
            </span>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold self-start sm:self-auto border ${
              isReconciled
                ? 'bg-[#6de039]/10 text-[#6de039] border-[#6de039]/40'
                : 'bg-[#ff4d4f]/20 text-[#ff4d4f] border-[#ff4d4f] animate-pulse'
            }`}
          >
            {isReconciled ? '100% LEDGER CONSENSUS' : 'MISMATCH DETECTED'}
          </span>
        </div>

        <p className="text-xs text-[#d9e3f7] leading-relaxed">
          {isReconciled ? (
            <>
              Off-chain Application Database has been successfully reconciled with the sovereign
              blockchain smart contract for asset{' '}
              <strong className="text-[#48d7f9] font-mono">BEL-SRV-001</strong>. All database nodes
              now report current owner as{' '}
              <strong className="text-[#6de039]">{activeDepartment}</strong>.
            </>
          ) : (
            <>
              A discrepancy between the off-chain Application Database and the on-chain Sovereign
              Smart Contract was intercepted for asset{' '}
              <strong className="text-[#48d7f9] font-mono">BEL-SRV-001</strong>.{' '}
              <span className="text-[#6de039] font-semibold">
                “Blockchain Record = Immutable Source of Truth.”
              </span>
            </>
          )}
        </p>

        {/* Split Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* DB Record */}
          <div
            className={`p-3 rounded bg-[#050e1c] border space-y-2 ${
              isReconciled ? 'border-[#6de039]/40' : 'border-[#ff4d4f]/40'
            }`}
          >
            <span
              className={`font-bold flex items-center gap-1.5 ${
                isReconciled ? 'text-[#6de039]' : 'text-[#ff4d4f]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {isReconciled
                ? 'Local Application DB Record (SYNCHRONIZED)'
                : 'Local Application DB Record (SUSPECT / STALE)'}
            </span>
            <div className="space-y-1 text-[#c1c6d7]">
              <div>
                Owner Field:{' '}
                <strong className={isReconciled ? 'text-[#6de039]' : 'text-[#ff4d4f]'}>
                  {isReconciled ? activeDepartment : 'Department A (HQ)'}
                </strong>
              </div>
              <div>Status: In Custody</div>
              <div className="text-[#8b90a0]">Hash: 0x48192019aa...2291</div>
            </div>
          </div>

          {/* Blockchain Truth */}
          <div className="p-3 rounded bg-[#050e1c] border border-[#6de039]/40 space-y-2">
            <span className="text-[#6de039] font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              On-Chain Blockchain Ledger (IMMUTABLE TRUTH)
            </span>
            <div className="space-y-1 text-[#d9e3f7]">
              <div>
                Owner Field: <strong className="text-[#6de039]">{activeDepartment}</strong>
              </div>
              <div>Block Confirmed: #18495</div>
              <div className="text-[#8b90a0]">Hash: 0x8d7291ab21ef09c...</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {!isReconciled ? (
            <button
              onClick={onReconcile}
              className="px-4 py-2 bg-[#6de039] text-[#002d6c] font-semibold rounded text-xs hover:bg-[#88fd54] transition-colors flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(109,224,57,0.3)]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reconcile with Chain</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 bg-[#6de039]/10 text-[#6de039] rounded text-xs font-mono font-bold flex items-center gap-1.5 border border-[#6de039]/30">
              <CheckCircle2 className="w-4 h-4" />
              Reconciled: Off-chain DB state matching Chain
            </span>
          )}

          <button
            onClick={handleInvestigateForensic}
            className="px-4 py-2 bg-[#212a39] border border-[#414755]/40 text-[#d9e3f7] rounded text-xs hover:border-[#48d7f9] transition-colors cursor-pointer"
          >
            Investigate Forensic Hash
          </button>
        </div>
      </div>

      {/* Ledger Block Progression Timeline */}
      <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 space-y-4">
        <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
          Ledger Block Progression (EVM Blocks)
        </h3>

        <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#414755]/40 font-mono text-xs">
          {recentBlocks.map((block, idx) => (
            <div key={block.blockNumber} className="relative">
              <span
                className={`absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 border-[#121c2a] ${
                  idx === 0 ? 'bg-[#48d7f9]' : 'bg-[#6de039]'
                }`}
              ></span>

              <div className="p-3.5 rounded bg-[#16202f] border border-[#414755]/20 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:border-[#48d7f9]/40 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#48d7f9] font-bold">
                      Block #{block.blockNumber}
                    </span>
                    <span className="px-2 py-0.2 rounded bg-[#6de039]/10 text-[#6de039] border border-[#6de039]/30 text-[10px] font-bold">
                      {block.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#d9e3f7] font-sans mt-1">
                    {block.action}: {block.targetIdentifier}
                  </p>
                  <div className="text-[10px] text-[#8b90a0] mt-1 font-mono">
                    Origin: {block.originatingDid}
                  </div>
                </div>

                <div className="text-right text-[#8b90a0] text-[11px] shrink-0 font-mono">
                  <div>Hash: {block.txHash.slice(0, 14)}...</div>
                  <div>Gas: {block.gasUsed.toLocaleString()}</div>
                  <div>{block.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
