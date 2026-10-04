import React, { useState } from 'react';
import {
  Shield,
  Server,
  Settings as SettingsIcon,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Key,
} from 'lucide-react';
import { INITIAL_NODES } from '../data/mockData';

export const SettingsView: React.FC = () => {
  const [isRunningDiag, setIsRunningDiag] = useState(false);
  const [diagOutput, setDiagOutput] = useState<string | null>(null);

  const handleRunDiagnostics = () => {
    setIsRunningDiag(true);
    setDiagOutput(null);
    setTimeout(() => {
      setIsRunningDiag(false);
      setDiagOutput(
        'HSM Attestation Benchmark Output:\n[✓] Secure Enclave Isolation: 100% Passed\n[✓] FIPS 140-3 Level 4 Cryptographic Boundaries: Compliant\n[✓] Asymmetric Ring Signatures: secp256k1 keys validated\n[✓] Zero entropy leakage detected across 10.24.0.1 subnet.'
      );
    }, 1000);
  };

  return (
    <section className="space-y-6">
      <div className="p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
          BEL Defense Sovereign Node Settings
        </h1>
        <p className="text-xs text-[#c1c6d7]">
          Local EVM parameters, hardware attestation, and cryptographic certificates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Consensus & Network Configuration */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 space-y-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#48d7f9]" />
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Consensus & Network Configuration
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-[10px] text-[#8b90a0] block uppercase tracking-wider">
                RPC ENDPOINT URL
              </label>
              <input
                type="text"
                readOnly
                value="http://127.0.0.1:8545 (Local Sovereign Subnet)"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 text-[#d9e3f7] mt-1 select-all"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#8b90a0] block uppercase tracking-wider">
                SOVEREIGN CHAIN ID
              </label>
              <input
                type="text"
                readOnly
                value="31337 (BEL Sovereign EVM Engine)"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 text-[#6de039] font-bold mt-1"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#8b90a0] block uppercase tracking-wider">
                ASSET NFT SMART CONTRACT
              </label>
              <input
                type="text"
                readOnly
                value="0x5FbDB2315678afecb367f032d93F642f64180aa3"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 text-[#48d7f9] mt-1 select-all"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#8b90a0] block uppercase tracking-wider">
                DPKI REGISTRY CONTRACT
              </label>
              <input
                type="text"
                readOnly
                value="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 text-[#48d7f9] mt-1 select-all"
              />
            </div>
          </div>
        </div>

        {/* Hardware Security Module (HSM) */}
        <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#6de039]" />
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Hardware Security Module (HSM)
            </h3>
          </div>

          <div className="p-3.5 rounded bg-[#16202f] border border-[#414755]/30 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Model:</span>
              <span className="text-[#d9e3f7]">BEL-CRYPTO-HSM-v4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">FIPS 140-3 Compliance:</span>
              <span className="text-[#6de039] font-bold">LEVEL 4 VERIFIED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Enclave Status:</span>
              <span className="text-[#6de039] font-bold">TAMPER-SEALED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8b90a0]">Root Fingerprint:</span>
              <span className="text-[#48d7f9]">B9:8A:23:44:FF:01:99:A2</span>
            </div>
          </div>

          {diagOutput && (
            <div className="p-3 rounded bg-[#050e1c] border border-[#6de039]/40 text-[11px] font-mono text-[#6de039] whitespace-pre-wrap">
              {diagOutput}
            </div>
          )}

          <button
            onClick={handleRunDiagnostics}
            disabled={isRunningDiag}
            className="w-full py-2 bg-[#212a39] border border-[#414755]/40 text-[#d9e3f7] hover:border-[#48d7f9] rounded text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunningDiag ? 'animate-spin text-[#48d7f9]' : ''}`} />
            <span>{isRunningDiag ? 'Running Cryptographic Diagnostics...' : 'Run Real-Time HSM Diagnostics'}</span>
          </button>
        </div>
      </div>

      {/* Cluster Defense Nodes */}
      <div className="p-5 rounded bg-[#121c2a] border border-[#414755]/30 space-y-3">
        <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
          Sovereign Node Topology
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {INITIAL_NODES.map((node) => (
            <div
              key={node.id}
              className="p-3.5 rounded bg-[#16202f] border border-[#414755]/30 space-y-1.5 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#48d7f9]">{node.name}</span>
                <span className="w-2 h-2 rounded-full bg-[#6de039]"></span>
              </div>
              <div className="text-[11px] text-[#c1c6d7]">{node.subnet}</div>
              <div className="text-[10px] text-[#8b90a0] flex justify-between pt-1 border-t border-[#414755]/20">
                <span>{node.role}</span>
                <span className="text-[#6de039]">{node.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
