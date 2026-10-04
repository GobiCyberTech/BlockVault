import React, { useState } from 'react';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Lock,
  Search,
} from 'lucide-react';
import { HardwareAsset } from '../types';

interface ScannerViewProps {
  assets: HardwareAsset[];
  initialAssetId?: string;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  assets,
  initialAssetId = 'BEL-SRV-001',
}) => {
  const [assetIdInput, setAssetIdInput] = useState(initialAssetId);
  const [isScanning, setIsScanning] = useState(false);
  const [simulateTamper, setSimulateTamper] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: 'AUTHENTIC' | 'TAMPERED';
    score: number;
    matchedAsset?: HardwareAsset;
    blockNumber: number;
    txHash: string;
    zkRoot: string;
  }>({
    status: 'AUTHENTIC',
    score: 98,
    matchedAsset: assets.find((a) => a.id === initialAssetId) || assets[0],
    blockNumber: 18495,
    txHash: '0x8d7291ab21ef09c7a234',
    zkRoot: '0x992fa1029ba8801ceb11c8',
  });

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const cleanId = assetIdInput.trim().toUpperCase();
      const found = assets.find((a) => a.id.toUpperCase() === cleanId);

      if (simulateTamper || !found) {
        setScanResult({
          status: 'TAMPERED',
          score: 12,
          matchedAsset: found,
          blockNumber: 26125,
          txHash: '0xBAD000' + Math.random().toString(16).slice(2, 10),
          zkRoot: '0xINVALID_ZK_SIGNATURE_BREACH',
        });
      } else {
        setScanResult({
          status: 'AUTHENTIC',
          score: 98,
          matchedAsset: found,
          blockNumber: found.provenance[0]?.blockNumber || 18495,
          txHash: found.provenance[0]?.txHash || '0x8d7291ab...',
          zkRoot: '0x992fa1029ba8801ceb11c8',
        });
      }
    }, 1100);
  };

  return (
    <section className="space-y-6">
      <div className="p-4 rounded bg-[#121c2a] border border-[#414755]/30">
        <h1 className="text-lg md:text-xl font-bold text-[#d9e3f7] font-headline">
          Hardware Verification & Tamper Scanner
        </h1>
        <p className="text-xs text-[#c1c6d7]">
          Simulate hardware RFID/QR scan and trigger live smart contract cryptographic verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Radar / Scanner Viewport */}
        <div className="p-6 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-col items-center justify-center space-y-6 text-center">
          {/* Radar Scanner Visual Container */}
          <div className="relative w-56 h-56 rounded-full border-2 border-[#00b8d9]/40 flex items-center justify-center overflow-hidden bg-[#050e1c] shadow-[0_0_24px_rgba(0,184,217,0.15)]">
            <div className="absolute inset-0 radar-sweep"></div>
            <div className="absolute w-40 h-40 rounded-full border border-[#00b8d9]/20"></div>
            <div className="absolute w-24 h-24 rounded-full border border-[#00b8d9]/30"></div>
            <div className="relative z-10 p-3 rounded bg-[#16202f] border border-[#00b8d9] text-[#48d7f9] shadow-lg">
              <QrCode className="w-8 h-8" />
            </div>
          </div>

          {/* Input and Trigger */}
          <div className="w-full max-w-sm space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={assetIdInput}
                onChange={(e) => setAssetIdInput(e.target.value)}
                placeholder="Enter Asset ID..."
                className="flex-1 bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-2 text-xs font-mono text-[#d9e3f7] focus:border-[#48d7f9] focus:outline-none"
              />
              <button
                onClick={handleRunScan}
                disabled={isScanning}
                className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer disabled:opacity-50 whitespace-nowrap flex items-center gap-1.5"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SCANNING...</span>
                  </>
                ) : (
                  <span>VERIFY ASSET</span>
                )}
              </button>
            </div>

            {/* Quick-fill pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono">
              <span className="text-[#8b90a0]">Quick test:</span>
              {assets.slice(0, 3).map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAssetIdInput(a.id);
                    setSimulateTamper(false);
                  }}
                  className="px-2 py-0.5 rounded bg-[#16202f] hover:bg-[#212a39] text-[#48d7f9] border border-[#414755]/40 transition-colors cursor-pointer"
                >
                  {a.id}
                </button>
              ))}
            </div>

            {/* Simulated Tamper toggle */}
            <div className="pt-2 border-t border-[#414755]/20 flex items-center justify-center gap-2 text-xs">
              <input
                type="checkbox"
                id="simulate-tamper"
                checked={simulateTamper}
                onChange={(e) => setSimulateTamper(e.target.checked)}
                className="rounded border-[#414755] bg-[#050e1c] text-[#ff4d4f] focus:ring-0 cursor-pointer"
              />
              <label
                htmlFor="simulate-tamper"
                className="text-[#c1c6d7] text-xs cursor-pointer select-none"
              >
                Simulate Tampered Hardware Tag (Defense Test)
              </label>
            </div>
          </div>
        </div>

        {/* Right: Verification Result Proof Card */}
        <div className="p-6 rounded bg-[#121c2a] border border-[#414755]/30 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#414755]/20 gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b90a0]">
                Cryptographic Proof Report
              </span>

              {scanResult.status === 'AUTHENTIC' ? (
                <span className="px-3 py-1 rounded bg-[#0b2524] text-[#6de039] border border-[#6de039] text-xs font-mono font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6de039]" />
                  98% TRUST VERIFIED • AUTHENTIC
                </span>
              ) : (
                <span className="px-3 py-1 rounded bg-[#2a1215] text-[#ff4d4f] border border-[#ff4d4f] text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
                  <ShieldAlert className="w-4 h-4 text-[#ff4d4f]" />
                  TAMPER DETECTED • UNVERIFIED TAG
                </span>
              )}
            </div>

            {/* Verification Steps Display */}
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-[#16202f] border border-[#414755]/20 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#d9e3f7]">
                  {scanResult.status === 'AUTHENTIC' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#6de039]" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#ff4d4f]" />
                  )}
                  Checking NFT Registry (Token {scanResult.matchedAsset?.tokenId || '#UNKNOWN'})
                </span>
                <span
                  className={
                    scanResult.status === 'AUTHENTIC' ? 'text-[#6de039] font-bold' : 'text-[#ff4d4f] font-bold'
                  }
                >
                  {scanResult.status === 'AUTHENTIC' ? 'MATCH' : 'MISMATCH'}
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#16202f] border border-[#414755]/20 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#d9e3f7]">
                  {scanResult.status === 'AUTHENTIC' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#6de039]" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#ff4d4f]" />
                  )}
                  Verifying Custody ({scanResult.matchedAsset?.owner || 'Unknown'})
                </span>
                <span
                  className={
                    scanResult.status === 'AUTHENTIC' ? 'text-[#6de039] font-bold' : 'text-[#ff4d4f] font-bold'
                  }
                >
                  {scanResult.status === 'AUTHENTIC' ? 'VALID' : 'INVALID'}
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#16202f] border border-[#414755]/20 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#d9e3f7]">
                  {scanResult.status === 'AUTHENTIC' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#6de039]" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#ff4d4f]" />
                  )}
                  Checking Blockchain Consensus Proof (#{scanResult.blockNumber})
                </span>
                <span
                  className={
                    scanResult.status === 'AUTHENTIC' ? 'text-[#6de039] font-bold' : 'text-[#ff4d4f] font-bold'
                  }
                >
                  {scanResult.status === 'AUTHENTIC' ? 'CONFIRMED' : 'REJECTED'}
                </span>
              </div>
            </div>

            {/* Cryptographic Parameters */}
            <div className="p-3 rounded bg-[#050e1c] border border-[#414755]/30 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Network:</span>
                <span className="text-[#d9e3f7]">Local EVM (Chain ID 31337)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Contract:</span>
                <span className="text-[#48d7f9]">0x4F8...71cB (AssetNFT)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Block Number:</span>
                <span className="text-[#d9e3f7]">#{scanResult.blockNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8b90a0]">Transaction Hash:</span>
                <span className="text-[#48d7f9]">{scanResult.txHash}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#414755]/20 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#8b90a0]">Zero-Knowledge Root:</span>
            <span className={scanResult.status === 'AUTHENTIC' ? 'text-[#6de039]' : 'text-[#ff4d4f]'}>
              {scanResult.zkRoot}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
