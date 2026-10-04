import React, { useState } from 'react';
import { X, ArrowRightLeft, CheckCircle2, RefreshCw, Lock } from 'lucide-react';
import { HardwareAsset, Department } from '../../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: HardwareAsset | null;
  onConfirmTransfer: (assetId: string, newOwner: Department) => void;
  currentBlock: number;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  asset,
  onConfirmTransfer,
  currentBlock,
}) => {
  const [targetDept, setTargetDept] = useState<Department>('Department B (Naval Fleet)');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !asset) return null;

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmTransfer(asset.id, targetDept);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#121c2a] border border-[#414755]/40 rounded-lg max-w-lg w-full p-6 space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414755]/20">
          <div>
            <span className="text-[10px] font-mono text-[#48d7f9] font-semibold uppercase tracking-wider">
              SMART CONTRACT ESCROW
            </span>
            <h2 className="text-base font-bold text-[#d9e3f7] font-headline">
              Transfer Asset Custody
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b90a0] hover:text-[#d9e3f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Asset summary */}
        <div className="p-3.5 bg-[#16202f] rounded border border-[#414755]/30 font-mono text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Asset Target:</span>
            <span className="text-[#48d7f9] font-bold">
              {asset.id} ({asset.tokenId})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Current Owner:</span>
            <span className="text-[#6de039] font-bold">{asset.owner}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8b90a0]">Custodian:</span>
            <span className="text-[#d9e3f7]">{asset.custodian}</span>
          </div>
        </div>

        {/* Recipient select */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#d9e3f7] block">
            Target Recipient Department Division
          </label>
          <select
            value={targetDept}
            onChange={(e) => setTargetDept(e.target.value as Department)}
            disabled={isProcessing}
            className="w-full bg-[#16202f] border border-[#414755]/40 rounded px-3 py-2 text-xs text-[#d9e3f7] focus:border-[#48d7f9] focus:outline-none cursor-pointer"
          >
            <option value="Department B (Naval Fleet)">
              Department B (Naval Fleet Command)
            </option>
            <option value="Department A (HQ)">
              Department A (HQ Strategic Division)
            </option>
            <option value="Cyber SOC (Defense Ops)">
              Cyber SOC (Defense Security Ops)
            </option>
            <option value="Aerospace Division">
              Aerospace Avionics Division
            </option>
          </select>
        </div>

        {/* Verification checklist */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#6de039]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#6de039]" />
            <span>Requester Identity Verified (did:blockvault:0x83A7...92F)</span>
          </div>
          <div className="flex items-center gap-2 text-[#6de039]">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#6de039]" />
            <span>Role Permission: transferAssetOwnership Allowed</span>
          </div>
        </div>

        {/* Processing animation */}
        {isProcessing && (
          <div className="p-3 rounded bg-[#00b8d9]/10 border border-[#00b8d9] text-[#48d7f9] text-xs font-mono flex items-center gap-3">
            <RefreshCw className="w-4 h-4 animate-spin text-[#48d7f9]" />
            <span>Awaiting Local EVM Transaction Finality (Block #{currentBlock + 1})...</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#414755]/20">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-3.5 py-1.5 bg-[#16202f] text-[#d9e3f7] rounded text-xs hover:bg-[#212a39] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleExecute}
            disabled={isProcessing}
            className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Validating Escrow...</span>
            ) : (
              <span>Sign & Execute Transfer</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
