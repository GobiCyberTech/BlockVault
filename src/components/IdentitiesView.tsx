import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  CheckCircle2,
  ExternalLink,
  Shield,
  Eye,
  Filter,
} from 'lucide-react';
import { OfficerIdentity, RoleTier } from '../types';

interface IdentitiesViewProps {
  identities: OfficerIdentity[];
  onSelectIdentity: (identity: OfficerIdentity) => void;
  onOpenCreateIdentity: () => void;
}

export const IdentitiesView: React.FC<IdentitiesViewProps> = ({
  identities,
  onSelectIdentity,
  onOpenCreateIdentity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');

  const filteredIdentities = identities.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || item.role === roleFilter;
    const matchesDept = deptFilter === 'ALL' || item.department.includes(deptFilter);

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <section className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
            Decentralized PKI & Identity Registry
          </h1>
          <p className="text-xs text-[#c1c6d7]">
            Sovereign DID management, cryptographic keys, and biometric-bound hardware signers
          </p>
        </div>

        <button
          onClick={onOpenCreateIdentity}
          className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Create Identity</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="p-3 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, DID hash, or department..."
              className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 pl-8 text-[11px] font-mono text-[#d9e3f7] focus:border-[#48d7f9] focus:outline-none placeholder:text-[#8b90a0]"
            />
            <Search className="w-3.5 h-3.5 text-[#8b90a0] absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-[#16202f] border border-[#414755]/40 text-[#d9e3f7] text-xs rounded px-2.5 py-1.5 focus:border-[#48d7f9] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Auditor">Auditor</option>
            <option value="User">User</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[#16202f] border border-[#414755]/40 text-[#d9e3f7] text-xs rounded px-2.5 py-1.5 focus:border-[#48d7f9] focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            <option value="Department A">Department A (HQ)</option>
            <option value="Department B">Department B (Naval Fleet)</option>
            <option value="Cyber SOC">Cyber SOC (Defense Ops)</option>
          </select>
        </div>
      </div>

      {/* Identity Table */}
      <div className="rounded bg-[#121c2a] border border-[#414755]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#16202f] text-[11px] font-mono text-[#8b90a0] border-b border-[#414755]/30">
                <th className="py-3 px-4">SOVEREIGN USER</th>
                <th className="py-3 px-4">DECENTRALIZED ID (DID)</th>
                <th className="py-3 px-4">ETHEREUM WALLET</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ASSETS</th>
                <th className="py-3 px-4">LAST ACTIVITY</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#414755]/10">
              {filteredIdentities.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#8b90a0]">
                    No identities match your search filter criteria.
                  </td>
                </tr>
              ) : (
                filteredIdentities.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#16202f]/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#d9e3f7]">{item.name}</div>
                      <div className="text-[#8b90a0] text-[10px] font-mono">
                        {item.department}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#48d7f9]">
                      {item.did.slice(0, 20)}...
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#8b90a0]">
                      {item.wallet.slice(0, 10)}...
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          item.role === 'Admin'
                            ? 'bg-[#00b8d9]/15 text-[#48d7f9] border border-[#00b8d9]/30'
                            : item.role === 'Manager'
                            ? 'bg-[#1677ff]/15 text-[#afc6ff] border border-[#1677ff]/30'
                            : item.role === 'Auditor'
                            ? 'bg-[#6de039]/15 text-[#6de039] border border-[#6de039]/30'
                            : 'bg-[#2c3545] text-[#c1c6d7]'
                        }`}
                      >
                        {item.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          item.status === 'ACTIVE'
                            ? 'bg-[#6de039]/10 text-[#6de039] border-[#6de039]/30'
                            : 'bg-[#ff4d4f]/10 text-[#ff4d4f] border-[#ff4d4f]/30'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[#d9e3f7] font-mono">
                      {item.assetsCount}
                    </td>
                    <td className="py-3 px-4 text-[#8b90a0] text-[11px] font-mono">
                      {item.lastActivity}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectIdentity(item)}
                        className="px-2.5 py-1 bg-[#16202f] hover:bg-[#212a39] border border-[#414755]/40 hover:border-[#48d7f9] rounded text-[11px] font-mono text-[#48d7f9] transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
