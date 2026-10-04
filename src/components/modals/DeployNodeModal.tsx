import React, { useState } from 'react';
import { X, Server, CheckCircle2, Shield } from 'lucide-react';

interface DeployNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (nodeName: string, subnet: string) => void;
}

export const DeployNodeModal: React.FC<DeployNodeModalProps> = ({
  isOpen,
  onClose,
  onDeploy,
}) => {
  const [nodeName, setNodeName] = useState('BEL-DEFENSE-NODE-5');
  const [subnet, setSubnet] = useState('10.24.4.1 (Northern Tactical Command)');
  const [isDeploying, setIsDeploying] = useState(false);

  if (!isOpen) return null;

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      onDeploy(nodeName, subnet);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#121c2a] border border-[#414755]/40 rounded-lg max-w-md w-full p-6 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-[#414755]/20">
          <div className="flex items-center gap-2 text-[#48d7f9]">
            <Server className="w-5 h-5" />
            <h3 className="text-sm font-bold text-[#d9e3f7] font-headline">
              Deploy Sovereign Defense Node
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b90a0] hover:text-[#d9e3f7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#c1c6d7]">
          Deploy an additional zero-trust validator container to the Bharat Electronics Limited sovereign subnet.
        </p>

        <div className="space-y-3 font-mono text-xs">
          <div>
            <label className="text-[10px] text-[#8b90a0] block uppercase tracking-wider">
              Node Identifier
            </label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 text-[#d9e3f7] mt-1 focus:border-[#48d7f9] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-[#8b90a0] block uppercase tracking-wider">
              Assigned Subnet IP
            </label>
            <input
              type="text"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-1.5 text-[#d9e3f7] mt-1 focus:border-[#48d7f9] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-[#050e1c] rounded border border-[#414755]/30 space-y-1 text-[11px]">
            <div className="text-[#6de039] font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              HSM Hardware Enclave: Level 4 Auto-Attested
            </div>
            <div className="text-[#8b90a0]">Consensus Protocol: Proof of Authority (PoA)</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#414755]/20">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#16202f] text-[#d9e3f7] rounded text-xs hover:bg-[#212a39] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="bg-[#1677ff] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#0059c7] transition-all shadow-[0_0_12px_rgba(22,119,255,0.35)] cursor-pointer disabled:opacity-50"
          >
            {isDeploying ? 'Deploying Enclave...' : 'Deploy Node'}
          </button>
        </div>
      </div>
    </div>
  );
};
