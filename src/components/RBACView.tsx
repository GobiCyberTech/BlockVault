import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ShieldCheck,
  KeyRound,
  FileCode,
  Users,
} from 'lucide-react';
import { RBAC_PERMISSIONS, ContractPermission } from '../data/mockData';

export const RBACView: React.FC = () => {
  const [permissions, setPermissions] = useState<ContractPermission[]>(RBAC_PERMISSIONS);
  const [isSyncingHashes, setIsSyncingHashes] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleSyncHashes = () => {
    setIsSyncingHashes(true);
    setSyncMessage(null);
    setTimeout(() => {
      setIsSyncingHashes(false);
      setSyncMessage('Role permission hashes cryptographically verified against BEL-HQ Sovereign EVM bytecodes (Chain ID 31337).');
      setTimeout(() => setSyncMessage(null), 4000);
    }, 800);
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
            Role-Based Access Control (RBAC) & Permission Matrix
          </h1>
          <p className="text-xs text-[#c1c6d7]">
            Defense Tier-4 authorization policies enforced via Sovereign Smart Contracts
          </p>
        </div>

        <button
          onClick={handleSyncHashes}
          disabled={isSyncingHashes}
          className="bg-[#212a39] border border-[#414755]/40 px-3 py-1.5 rounded text-xs font-medium hover:border-[#48d7f9] text-[#48d7f9] transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncingHashes ? 'animate-spin' : ''}`} />
          <span>Sync Role Hashes</span>
        </button>
      </div>

      {syncMessage && (
        <div className="p-3 rounded bg-[#0b2524] border border-[#00b8d9] text-[#48d7f9] text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#6de039]" />
          <span>{syncMessage}</span>
        </div>
      )}

      {/* 4 Tier Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tier 1: Admin */}
        <div className="p-4 rounded bg-[#121c2a] border border-[#48d7f9]/50 shadow-[0_0_12px_rgba(72,215,249,0.12)]">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-[#48d7f9] uppercase tracking-wider">
              TIER 1
            </span>
            <span className="px-2 py-0.5 rounded bg-[#48d7f9]/10 text-[#48d7f9] text-[10px] font-mono font-bold">
              12 Users
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#d9e3f7] font-headline mt-2">
            Admin / Commander
          </h3>
          <p className="text-xs text-[#c1c6d7] mt-1">
            Full root privileges: node governance, minting, multi-sig escrow approvals.
          </p>
          <div className="mt-3 pt-3 border-t border-[#414755]/20 text-[11px] font-mono text-[#6de039] font-bold">
            10/10 Permissions Active
          </div>
        </div>

        {/* Tier 2: Manager */}
        <div className="p-4 rounded bg-[#121c2a] border border-[#414755]/30">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-[#afc6ff] uppercase tracking-wider">
              TIER 2
            </span>
            <span className="px-2 py-0.5 rounded bg-[#afc6ff]/10 text-[#afc6ff] text-[10px] font-mono font-bold">
              48 Users
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#d9e3f7] font-headline mt-2">
            Department Manager
          </h3>
          <p className="text-xs text-[#c1c6d7] mt-1">
            Authorized to initiate asset transfers and inspect unit attestation status.
          </p>
          <div className="mt-3 pt-3 border-t border-[#414755]/20 text-[11px] font-mono text-[#afc6ff] font-bold">
            7/10 Permissions Active
          </div>
        </div>

        {/* Tier 3: Auditor */}
        <div className="p-4 rounded bg-[#121c2a] border border-[#414755]/30">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-[#6de039] uppercase tracking-wider">
              TIER 3
            </span>
            <span className="px-2 py-0.5 rounded bg-[#6de039]/10 text-[#6de039] text-[10px] font-mono font-bold">
              16 Users
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#d9e3f7] font-headline mt-2">
            Security Auditor
          </h3>
          <p className="text-xs text-[#c1c6d7] mt-1">
            Read-only cryptographic verification, zero-knowledge proofs, and tamper detection.
          </p>
          <div className="mt-3 pt-3 border-t border-[#414755]/20 text-[11px] font-mono text-[#6de039] font-bold">
            5/10 Permissions Active
          </div>
        </div>

        {/* Tier 4: User */}
        <div className="p-4 rounded bg-[#121c2a] border border-[#414755]/30">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold text-[#8b90a0] uppercase tracking-wider">
              TIER 4
            </span>
            <span className="px-2 py-0.5 rounded bg-[#16202f] text-[#8b90a0] text-[10px] font-mono font-bold">
              1,172 Users
            </span>
          </div>
          <h3 className="text-sm font-bold text-[#d9e3f7] font-headline mt-2">
            Operator / User
          </h3>
          <p className="text-xs text-[#c1c6d7] mt-1">
            Standard asset custody, local verification scanner, status reporting.
          </p>
          <div className="mt-3 pt-3 border-t border-[#414755]/20 text-[11px] font-mono text-[#8b90a0] font-bold">
            3/10 Permissions Active
          </div>
        </div>
      </div>

      {/* Complete Permission Matrix Table */}
      <div className="rounded bg-[#121c2a] border border-[#414755]/30 overflow-hidden">
        <div className="p-4 bg-[#16202f] border-b border-[#414755]/20 flex justify-between items-center">
          <span className="text-xs font-bold text-[#d9e3f7] font-headline">
            Cryptographic Smart Contract Permission Matrix (PS 26125)
          </span>
          <span className="text-[11px] font-mono text-[#48d7f9]">
            Verified on EVM Bytecode (ERC-721 + AccessControl.sol)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#050e1c] text-[11px] font-mono text-[#8b90a0] border-b border-[#414755]/20">
                <th className="py-3 px-4">FUNCTIONAL PERMISSION SIGNATURE</th>
                <th className="py-3 px-4">MODULE</th>
                <th className="py-3 px-4 text-center">ADMIN</th>
                <th className="py-3 px-4 text-center">MANAGER</th>
                <th className="py-3 px-4 text-center">AUDITOR</th>
                <th className="py-3 px-4 text-center">USER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#414755]/10 font-mono text-[11px]">
              {permissions.map((perm, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#16202f]/30 transition-colors"
                >
                  <td className="py-3 px-4 text-[#d9e3f7] font-semibold">
                    {perm.functionSignature}
                  </td>
                  <td className="py-3 px-4 text-[#8b90a0]">
                    {perm.category}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.admin ? (
                      <CheckCircle2 className="w-4 h-4 text-[#6de039] mx-auto inline" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#8b90a0] mx-auto inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.manager ? (
                      <CheckCircle2 className="w-4 h-4 text-[#6de039] mx-auto inline" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#8b90a0] mx-auto inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.auditor ? (
                      <CheckCircle2 className="w-4 h-4 text-[#6de039] mx-auto inline" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#8b90a0] mx-auto inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {perm.user ? (
                      <CheckCircle2 className="w-4 h-4 text-[#6de039] mx-auto inline" />
                    ) : (
                      <XCircle className="w-4 h-4 text-[#8b90a0] mx-auto inline" />
                    )}
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
