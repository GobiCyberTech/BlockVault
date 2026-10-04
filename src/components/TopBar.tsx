import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  ShieldAlert,
  Wallet,
  Lock,
  RefreshCw,
  Flame,
} from 'lucide-react';

interface TopBarProps {
  currentBlock: number;
  isSyncing: boolean;
  onSyncLedger: () => void;
  onEmergencyFreeze: () => void;
  onOpenWalletModal: () => void;
  onOpenHelpModal: () => void;
  onNavigate: (view: string) => void;
  walletLabel: string;
  unreadAlertsCount: number;
  onSearch: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentBlock,
  isSyncing,
  onSyncLedger,
  onEmergencyFreeze,
  onOpenWalletModal,
  onOpenHelpModal,
  onNavigate,
  walletLabel,
  unreadAlertsCount,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-30 flex items-center justify-between px-6 bg-[#16202f] border-b border-[#414755]/30">
      {/* Title & Live Node Telemetry */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-base lg:text-lg font-bold text-[#afc6ff] tracking-tight hover:text-white transition-colors cursor-pointer text-left font-headline"
        >
          BlockVault :: BEL Sovereign Infrastructure
        </button>

        {/* Live Synced Chips */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded bg-[#121c2a] border border-[#414755]/40 text-[#48d7f9] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#48d7f9]"></span>
            EVM: 31337 (Local)
          </span>

          <button
            onClick={onSyncLedger}
            title="Click to synchronize peer block headers"
            className="px-2.5 py-1 rounded bg-[#121c2a] border border-[#414755]/40 text-[#6de039] flex items-center gap-1.5 hover:border-[#6de039]/60 cursor-pointer transition-colors"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full bg-[#6de039] ${
                isSyncing ? 'animate-ping' : ''
              }`}
            ></span>
            Block #{currentBlock} {isSyncing ? '(Syncing...)' : '(Synced)'}
            <RefreshCw
              className={`w-3 h-3 ml-0.5 text-[#8b90a0] hover:text-[#6de039] ${
                isSyncing ? 'animate-spin text-[#6de039]' : ''
              }`}
            />
          </button>

          <span className="px-2.5 py-1 rounded bg-[#121c2a] border border-[#414755]/40 text-[#c1c6d7] flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#6de039]" />
            HSM: Online
          </span>
        </div>
      </div>

      {/* Right Action Clusters */}
      <div className="flex items-center gap-3">
        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden xl:block">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search DID, Asset, Block #..."
            className="bg-[#050e1c] border border-[#414755]/40 text-[#d9e3f7] text-[11px] font-mono rounded pl-8 pr-3 py-1.5 focus:border-[#48d7f9] focus:outline-none focus:ring-1 focus:ring-[#48d7f9] w-56 placeholder:text-[#8b90a0]"
          />
          <Search className="w-3.5 h-3.5 text-[#8b90a0] absolute left-2.5 top-2.5" />
        </form>

        {/* Auxiliary Icons */}
        <div className="flex items-center gap-1 border-r border-[#414755]/30 pr-3">
          <button
            onClick={() => onNavigate('notifications')}
            title="SOC Alerts & Notifications"
            className="p-2 rounded hover:bg-[#212a39] text-[#c1c6d7] hover:text-[#afc6ff] transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff4d4f] rounded-full ring-2 ring-[#16202f]"></span>
            )}
          </button>

          <button
            onClick={() => onNavigate('audit')}
            title="Immutable Audit & Tamper Inspection"
            className="p-2 rounded hover:bg-[#212a39] text-[#c1c6d7] hover:text-[#afc6ff] transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenHelpModal}
            title="Smart India Hackathon • BEL Defense Briefing"
            className="p-2 rounded hover:bg-[#212a39] text-[#c1c6d7] hover:text-[#afc6ff] transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Emergency Freeze Action */}
        <button
          onClick={onEmergencyFreeze}
          className="bg-[#2a1215] border border-[#ff4d4f]/40 text-[#ff4d4f] hover:bg-[#3c1418] hover:border-[#ff4d4f] px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Flame className="w-3.5 h-3.5 text-[#ff4d4f]" />
          <span className="hidden sm:inline">Emergency Freeze</span>
        </button>

        {/* Connect Wallet */}
        <button
          onClick={onOpenWalletModal}
          className="bg-[#1677ff] text-white border border-[#4096ff] px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-2 hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer"
        >
          <Wallet className="w-3.5 h-3.5" />
          <span className="font-mono">{walletLabel}</span>
        </button>
      </div>
    </header>
  );
};
