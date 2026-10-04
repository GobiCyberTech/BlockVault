import React from 'react';
import {
  Shield,
  LayoutDashboard,
  UserCheck,
  Cpu,
  ArrowLeftRight,
  ScanLine,
  History,
  Lock,
  PlusCircle,
  Settings,
  User,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onDeployNode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onDeployNode,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview & KPIs',
      icon: LayoutDashboard,
    },
    {
      id: 'identities',
      label: 'Identity & Role Matrix',
      icon: UserCheck,
    },
    {
      id: 'assets',
      label: 'Asset Tokenization',
      icon: Cpu,
    },
    {
      id: 'asset-details',
      label: 'Asset Transfer',
      icon: ArrowLeftRight,
    },
    {
      id: 'scanner',
      label: 'Verification Scanner',
      icon: ScanLine,
    },
    {
      id: 'audit',
      label: 'Immutable Audit',
      icon: History,
    },
    {
      id: 'rbac',
      label: 'RBAC Matrix',
      icon: Lock,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 z-40 flex flex-col justify-between p-4 bg-[#121c2a] border-r border-[#414755]/30">
      {/* Brand & Status */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded bg-[#1677ff]/10 border border-[#1677ff]/40 flex items-center justify-center text-[#48d7f9] shadow-[0_0_12px_rgba(72,215,249,0.2)]">
            <Shield className="w-5 h-5 text-[#48d7f9]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#d9e3f7] uppercase tracking-wider font-headline">
              BlockVault BEL
            </span>
            <span className="text-[11px] font-mono text-[#48d7f9]">
              DPKI & Asset Security
            </span>
          </div>
        </div>

        <div className="px-2.5 py-1.5 bg-[#050e1c]/80 border border-[#414755]/30 rounded flex items-center justify-between text-[11px] font-mono">
          <span className="text-[#8b90a0]">NODE STATUS</span>
          <span className="flex items-center gap-1.5 text-[#6de039]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6de039] animate-pulse"></span>
            BEL-DEFENSE-NODE-1
          </span>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'identities' && currentView === 'identity-details');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded transition-colors w-full text-left cursor-pointer ${
                  isActive
                    ? 'text-[#48d7f9] bg-[#2c3545]/60 border-l-2 border-[#48d7f9] font-semibold'
                    : 'text-[#c1c6d7] hover:text-[#d9e3f7] hover:bg-[#16202f]/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls & Officer Profile */}
      <div className="flex flex-col gap-3 pt-3 border-t border-[#414755]/30">
        <button
          onClick={onDeployNode}
          className="w-full bg-[#1677ff] text-white py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer active:scale-[0.99]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Deploy New Node</span>
        </button>

        <div className="flex flex-col gap-1 text-[11px] font-mono">
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center justify-between px-2 py-1 text-[#c1c6d7] hover:text-[#48d7f9] rounded hover:bg-[#16202f]/40 transition-colors w-full cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#8b90a0]" />
              HSM Attestation
            </span>
            <span className="text-[#6de039] font-bold">VALID</span>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center justify-between px-2 py-1 text-[#c1c6d7] hover:text-[#48d7f9] rounded hover:bg-[#16202f]/40 transition-colors w-full cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-[#8b90a0]" />
              Network Settings
            </span>
            <span className="text-[#48d7f9]">31337</span>
          </button>
        </div>

        {/* User Card */}
        <button
          onClick={() => onNavigate('identity-details')}
          className="p-2.5 rounded bg-[#050e1c] border border-[#414755]/30 flex items-center gap-2.5 hover:border-[#48d7f9]/40 transition-colors cursor-pointer text-left w-full"
        >
          <div className="w-8 h-8 rounded bg-[#2c3545] border border-[#414755]/40 flex items-center justify-center text-[#48d7f9] shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-semibold text-[#d9e3f7] truncate">
              Arun Kumar, BEL
            </span>
            <span className="text-[10px] font-mono text-[#8b90a0] truncate">
              Chief Cryptographic Off.
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
};
