import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Lock, Shield, User } from 'lucide-react';
import { Department, RoleTier } from '../../types';

interface CreateIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, dept: Department, role: RoleTier) => void;
  currentBlock: number;
}

export const CreateIdentityModal: React.FC<CreateIdentityModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentBlock,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [dept, setDept] = useState<Department>('Department A (HQ)');
  const [role, setRole] = useState<RoleTier>('User');

  if (!isOpen) return null;

  const simulatedDid = `did:blockvault:0x${Math.random().toString(16).slice(2, 10).toUpperCase()}...${Math.random().toString(16).slice(2, 6)}`;
  const simulatedKeyHash = `secp256k1:0x${Math.random().toString(16).slice(2, 16)}`;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit(name.trim() || 'Officer Maya Verma', dept, role);
      setStep(1);
      setName('');
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
              SOVEREIGN DPKI GENERATOR
            </span>
            <h2 className="text-base font-bold text-[#d9e3f7] font-headline">
              Create Decentralized Identity
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
            1. Officer Info
          </span>
          <span className="text-[#414755]">→</span>
          <span className={step === 2 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            2. DID Generation
          </span>
          <span className="text-[#414755]">→</span>
          <span className={step === 3 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            3. Role Assignment
          </span>
          <span className="text-[#414755]">→</span>
          <span className={step === 4 ? 'text-[#48d7f9] font-bold' : 'text-[#8b90a0]'}>
            4. Proof & Mint
          </span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#d9e3f7] block">
                Full Sovereign Officer Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Commander Maya Verma"
                className="w-full bg-[#050e1c] border border-[#414755]/40 rounded px-3 py-2 text-xs font-mono text-[#d9e3f7] mt-1.5 focus:border-[#48d7f9] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#d9e3f7] block">
                Department Division
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value as Department)}
                className="w-full bg-[#16202f] border border-[#414755]/40 rounded px-3 py-2 text-xs text-[#d9e3f7] mt-1.5 focus:border-[#48d7f9] focus:outline-none cursor-pointer"
              >
                <option value="Department A (HQ)">Department A (HQ)</option>
                <option value="Department B (Naval Fleet)">Department B (Naval Fleet)</option>
                <option value="Cyber SOC (Defense Ops)">Cyber SOC (Defense Ops)</option>
                <option value="Aerospace Division">Aerospace Division</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#050e1c] border border-[#00b8d9]/40 rounded">
              <span className="text-[#8b90a0] text-[10px] block">
                Generated Decentralized Identifier (DID):
              </span>
              <div className="text-[#48d7f9] font-mono mt-1 break-all select-all">
                {simulatedDid}
              </div>
            </div>

            <div className="p-3 bg-[#050e1c] border border-[#414755]/30 rounded">
              <span className="text-[#8b90a0] text-[10px] block">
                Simulated Keypair Signature Digest:
              </span>
              <div className="text-[#6de039] font-mono mt-1 select-all">
                {simulatedKeyHash}
              </div>
            </div>

            <p className="text-[11px] text-[#8b90a0] font-sans">
              Cryptographic keys are derived within the local hardware enclave via secp256k1 standard curves.
            </p>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="text-xs font-medium text-[#d9e3f7] block">
              Select Defense Tier Role
            </label>
            <div className="space-y-2">
              {[
                { role: 'Admin', desc: 'Tier 1: Root sovereign commander, minting & multisig control' },
                { role: 'Manager', desc: 'Tier 2: Division director, asset transfers & custody management' },
                { role: 'Auditor', desc: 'Tier 3: Cryptographic verification, zero-knowledge proofs' },
                { role: 'User', desc: 'Tier 4: Unit operator, hardware custody & verification' },
              ].map((item) => (
                <label
                  key={item.role}
                  className={`p-3 rounded border flex items-start gap-3 cursor-pointer transition-colors ${
                    role === item.role
                      ? 'bg-[#16202f] border-[#48d7f9]'
                      : 'bg-[#050e1c] border-[#414755]/30 hover:border-[#414755]'
                  }`}
                >
                  <input
                    type="radio"
                    name="role-tier"
                    value={item.role}
                    checked={role === item.role}
                    onChange={() => setRole(item.role as RoleTier)}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#d9e3f7] block">
                      {item.role}
                    </span>
                    <span className="text-[11px] text-[#8b90a0]">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 bg-[#0b2524] border border-[#6de039] rounded text-[#6de039] space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#6de039]" />
                Cryptographic Proof Ready for EVM
              </span>
              <p className="text-xs text-[#c1c6d7] font-sans mt-1">
                Ready to anchor new identity onto Local EVM block #{currentBlock + 1}.
              </p>
            </div>

            <div className="p-3 bg-[#050e1c] rounded border border-[#414755]/30 space-y-1 text-[11px]">
              <div>Officer: <strong className="text-[#d9e3f7]">{name || 'Officer Maya Verma'}</strong></div>
              <div>Department: <strong className="text-[#48d7f9]">{dept}</strong></div>
              <div>Assigned Tier: <strong className="text-[#6de039]">{role}</strong></div>
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
            <span>{step === 4 ? 'Mint Identity on Ledger' : 'Next →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
