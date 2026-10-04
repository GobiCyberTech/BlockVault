import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { Department } from '../../types';

interface RegisterAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, name: string, owner: Department, subsystem: string) => void;
  currentBlock: number;
}

export const RegisterAssetModal: React.FC<RegisterAssetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentBlock,
}) => {
  const [step, setStep] = useState(1);
  const [assetId, setAssetId] = useState('');
  const [assetName, setAssetName] = useState('');
  const [subsystem, setSubsystem] = useState('');
  const [ownerDept, setOwnerDept] = useState<Department>('Department A (HQ)');

  if (!isOpen) return null;

  const simulatedHash = `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}...`;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit(
        assetId.trim() || `BEL-DEV-${Math.floor(100 + Math.random() * 900)}`,
        assetName.trim() || 'Tactical Defense Terminal',
        ownerDept,
        subsystem.trim() || 'Sovereign Telemetry Enclave'
      );
      setStep(1);
      setAssetId('');
      setAssetName('');
      setSubsystem('');
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#121c2a] border border-[#414755]/40 rounded-lg max-w-lg w-full p-6 space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414755]/20">
          <div>
            <span className="text-[10px] font-mono text-[#48d7f9] font-semibold uppercase tracking-wider">
              SOVEREIGN HARDWARE TOKENIZER
            </span>
            <h2 className="text-base font-bold text-[#d9e3f7] font-headline">
              Register Asset & Mint ERC-721
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b90a0] hover:text-[#d9e3f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className={step === 1 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            1. Hardware Info
          </span>
          <span className="text-[#414755]">→</span>
          <span className={step === 2 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            2. Metadata Hash
          </span>
          <span className="text-[#414755]">→</span>
          <span className={step === 3 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            3. Assign Custody
          </span>
          <span className="text-[#414755]">→</span>
          <span className={step === 4 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            4. Mint NFT
          </span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#d9e3f7] block">
                Asset Tag / Serial ID
              </label>
              <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="e.g. BEL-DRN-099"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-2 text-xs font-mono text-[#d9e3f7] mt-1.5 focus:border-[#48d7f9] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#d9e3f7] block">
                Asset Description / Name
              </label>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="e.g. Tactical UAV Surveillance Unit"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-2 text-xs text-[#d9e3f7] mt-1.5 focus:border-[#48d7f9] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#d9e3f7] block">
                Deployment Subsystem
              </label>
              <input
                type="text"
                value={subsystem}
                onChange={(e) => setSubsystem(e.target.value)}
                placeholder="e.g. Naval Carrier Tactical Reconnaissance"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-2 text-xs text-[#d9e3f7] mt-1.5 focus:border-[#48d7f9] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#050e1c] border border-[#00b8d9]/40 rounded">
              <span className="text-[#8b90a0] text-[10px] block">
                Computed Hardware SHA-256 Digest:
              </span>
              <div className="text-[#48d7f9] font-mono mt-1 break-all select-all">
                {simulatedHash}
              </div>
            </div>

            <p className="text-[11px] text-[#8b90a0] font-sans">
              Asset hardware specifications and cryptographic UUID are verified via TPM 2.0 enclave and anchored to the local EVM state.
            </p>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="text-xs font-medium text-[#d9e3f7] block">
              Initial Department Custodian
            </label>
            <select
              value={ownerDept}
              onChange={(e) => setOwnerDept(e.target.value as Department)}
              className="w-full bg-[#16202f] border border-[#414755]/40 rounded px-3 py-2 text-xs text-[#d9e3f7] mt-1.5 focus:border-[#48d7f9] focus:outline-none cursor-pointer"
            >
              <option value="Department A (HQ)">Department A (HQ)</option>
              <option value="Department B (Naval Fleet)">Department B (Naval Fleet)</option>
              <option value="Cyber SOC (Defense Ops)">Cyber SOC (Defense Ops)</option>
              <option value="Aerospace Division">Aerospace Division</option>
            </select>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-[#0b2524] border border-[#6de039] rounded text-[#6de039] flex items-center gap-3">
              <Cpu className="w-8 h-8 shrink-0 text-[#6de039]" />
              <div>
                <div className="font-bold">ERC-721 Smart Token Ready for Minting</div>
                <div className="text-xs text-[#c1c6d7] font-sans mt-0.5">
                  Hardware token will be generated on Local EVM block #{currentBlock + 1}.
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#050e1c] rounded border border-[#414755]/30 space-y-1 text-[11px]">
              <div>Asset Tag: <strong className="text-[#48d7f9]">{assetId || 'BEL-DEV-990'}</strong></div>
              <div>Name: <strong className="text-[#d9e3f7]">{assetName || 'Tactical Defense Unit'}</strong></div>
              <div>Assigned Owner: <strong className="text-[#6de039]">{ownerDept}</strong></div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#414755]/20">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 bg-[#16202f] text-[#d9e3f7] rounded text-xs hover:bg-[#212a39] transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={handleNext}
            className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer flex items-center gap-1.5"
          >
            <span>{step === 4 ? 'Mint ERC-721 Token' : 'Next →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
