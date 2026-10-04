/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { IdentitiesView } from './components/IdentitiesView';
import { IdentityDetailView } from './components/IdentityDetailView';
import { RBACView } from './components/RBACView';
import { AssetsView } from './components/AssetsView';
import { AssetDetailView } from './components/AssetDetailView';
import { ScannerView } from './components/ScannerView';
import { AuditView } from './components/AuditView';
import { NotificationsView } from './components/NotificationsView';
import { SettingsView } from './components/SettingsView';

import { CreateIdentityModal } from './components/modals/CreateIdentityModal';
import { RegisterAssetModal } from './components/modals/RegisterAssetModal';
import { TransferModal } from './components/modals/TransferModal';
import { DeployNodeModal } from './components/modals/DeployNodeModal';
import { WalletModal } from './components/modals/WalletModal';
import { HelpModal } from './components/modals/HelpModal';
import { EmergencyFreezeModal } from './components/modals/EmergencyFreezeModal';

import {
  INITIAL_IDENTITIES,
  INITIAL_ASSETS,
  INITIAL_BLOCKS,
  INITIAL_ALERTS,
} from './data/mockData';
import {
  OfficerIdentity,
  HardwareAsset,
  BlockchainBlock,
  SOCAlert,
  Department,
  RoleTier,
} from './types';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Ledger & Node State
  const [currentBlock, setCurrentBlock] = useState<number>(26125);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [walletLabel, setWalletLabel] = useState<string>('0x83A7...92F (Connected)');

  // Domain Entity State
  const [identities, setIdentities] = useState<OfficerIdentity[]>(INITIAL_IDENTITIES);
  const [assets, setAssets] = useState<HardwareAsset[]>(INITIAL_ASSETS);
  const [recentBlocks, setRecentBlocks] = useState<BlockchainBlock[]>(INITIAL_BLOCKS);
  const [alerts, setAlerts] = useState<SOCAlert[]>(INITIAL_ALERTS);

  // Selected Entities for Detail Views
  const [selectedIdentity, setSelectedIdentity] = useState<OfficerIdentity>(INITIAL_IDENTITIES[0]);
  const [selectedAsset, setSelectedAsset] = useState<HardwareAsset>(INITIAL_ASSETS[0]);
  const [scannerTargetAssetId, setScannerTargetAssetId] = useState<string>('BEL-SRV-001');

  // Audit Reconciliation State
  const [isReconciled, setIsReconciled] = useState<boolean>(false);
  const [activeDepartment, setActiveDepartment] = useState<string>('Department B (Naval Fleet)');

  // Modal Visibility State
  const [isCreateIdentityOpen, setIsCreateIdentityOpen] = useState(false);
  const [isRegisterAssetOpen, setIsRegisterAssetOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDeployNodeOpen, setIsDeployNodeOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isEmergencyFreezeOpen, setIsEmergencyFreezeOpen] = useState(false);

  // Sync Ledger Handler
  const handleSyncLedger = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const newBlockNum = currentBlock + 1;
      setCurrentBlock(newBlockNum);

      const newBlock: BlockchainBlock = {
        blockNumber: newBlockNum,
        txHash: '0x' + Math.random().toString(16).slice(2, 18),
        action: 'Peer Ledger State Hash Synchronized',
        originatingDid: 'did:blockvault:0x83A7...92F',
        targetIdentifier: 'BEL-DEFENSE-NODE-1',
        timestamp: 'Just now',
        status: 'FINALIZED',
        gasUsed: 21000,
      };

      setRecentBlocks((prev) => [newBlock, ...prev]);
    }, 800);
  };

  // Create Identity Handler
  const handleCreateIdentity = (name: string, dept: Department, role: RoleTier) => {
    const newBlockNum = currentBlock + 1;
    setCurrentBlock(newBlockNum);

    const randomSuffix = Math.random().toString(16).slice(2, 6).toUpperCase();
    const newDid = `did:blockvault:0x${randomSuffix}71B029A88...`;
    const newWallet = `0x${randomSuffix}71B029`;

    const newId: OfficerIdentity = {
      id: `id-${Date.now()}`,
      name,
      did: newDid,
      wallet: newWallet,
      role,
      roleTitle:
        role === 'Admin'
          ? 'Sovereign Commander'
          : role === 'Manager'
          ? 'Division Technical Director'
          : role === 'Auditor'
          ? 'Zero-Knowledge Security Auditor'
          : 'Defense Systems Operator',
      department: dept,
      status: 'ACTIVE',
      clearance: role === 'Admin' ? 'TOP SECRET / SCI' : 'DEFENSE CONFIDENTIAL',
      publicKeyHash: `0x${Math.random().toString(16).slice(2, 14).toUpperCase()}...B991`,
      assetsCount: 0,
      lastActivity: 'Just now',
      assignedAssetIds: [],
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'DPKI Keypair Registered & Minted',
          subtitle: `Block #${newBlockNum} • Gas 54,100`,
          timestamp: 'Just now',
          type: 'mint',
        },
      ],
    };

    setIdentities((prev) => [newId, ...prev]);

    // Add block event
    const newBlock: BlockchainBlock = {
      blockNumber: newBlockNum,
      txHash: '0x' + Math.random().toString(16).slice(2, 18),
      action: 'Identity DPKI Minted',
      originatingDid: 'did:blockvault:0x83A7...92F',
      targetIdentifier: `${name} (${role})`,
      timestamp: 'Just now',
      status: 'FINALIZED',
      gasUsed: 48900,
    };
    setRecentBlocks((prev) => [newBlock, ...prev]);
  };

  // Register Asset Handler
  const handleRegisterAsset = (
    assetId: string,
    name: string,
    ownerDept: Department,
    subsystem: string
  ) => {
    const newBlockNum = currentBlock + 1;
    setCurrentBlock(newBlockNum);

    const newTokenId = `#100${assets.length + 1}`;
    const newHash = `0x${Math.random().toString(16).slice(2, 16)}${Math.random().toString(16).slice(2, 16)}`;

    const newAsset: HardwareAsset = {
      id: assetId,
      name,
      tokenId: newTokenId,
      owner: ownerDept,
      custodian: selectedIdentity.name,
      hash: newHash,
      status: 'Attested',
      macAddress: `00:1A:2B:${Math.random().toString(16).slice(2, 4).toUpperCase()}:${Math.random().toString(16).slice(2, 4).toUpperCase()}:AA`,
      subsystem,
      blockFinality: `CONFIRMED (Block #${newBlockNum})`,
      provenance: [
        {
          id: `p-${Date.now()}`,
          event: 'ERC-721 Hardware Token Minted',
          blockNumber: newBlockNum,
          txHash: '0x' + Math.random().toString(16).slice(2, 18),
          operator: selectedIdentity.name,
          details: `Genesis Tokenization at ${ownerDept}`,
          timestamp: 'Just now',
        },
      ],
    };

    setAssets((prev) => [newAsset, ...prev]);

    // Blockchain Event
    const newBlock: BlockchainBlock = {
      blockNumber: newBlockNum,
      txHash: '0x' + Math.random().toString(16).slice(2, 18),
      action: 'Asset Minted (ERC-721)',
      originatingDid: selectedIdentity.did,
      targetIdentifier: `${assetId} (Token ${newTokenId})`,
      timestamp: 'Just now',
      status: 'FINALIZED',
      gasUsed: 78500,
    };
    setRecentBlocks((prev) => [newBlock, ...prev]);
  };

  // Asset Transfer Handler
  const handleConfirmTransfer = (assetId: string, newOwner: Department) => {
    const newBlockNum = currentBlock + 1;
    setCurrentBlock(newBlockNum);

    setAssets((prev) =>
      prev.map((a) => {
        if (a.id === assetId) {
          const newProvenance = {
            id: `p-${Date.now()}`,
            event: `Ownership Assigned to ${newOwner}`,
            blockNumber: newBlockNum,
            txHash: '0x' + Math.random().toString(16).slice(2, 18),
            operator: selectedIdentity.name,
            details: `Custodian reassigned • Smart contract escrow signed`,
            timestamp: 'Just now',
          };
          return {
            ...a,
            owner: newOwner,
            blockFinality: `CONFIRMED (Block #${newBlockNum})`,
            provenance: [newProvenance, ...a.provenance],
          };
        }
        return a;
      })
    );

    if (assetId === 'BEL-SRV-001') {
      setActiveDepartment(newOwner);
    }

    // Add block event
    const newBlock: BlockchainBlock = {
      blockNumber: newBlockNum,
      txHash: '0x' + Math.random().toString(16).slice(2, 18),
      action: 'Ownership Transferred',
      originatingDid: selectedIdentity.did,
      targetIdentifier: `${assetId} -> ${newOwner}`,
      timestamp: 'Just now',
      status: 'FINALIZED',
      gasUsed: 54200,
    };
    setRecentBlocks((prev) => [newBlock, ...prev]);
  };

  // Reconcile DB with Blockchain Truth
  const handleReconcile = () => {
    setIsReconciled(true);
    setAlerts((prev) =>
      prev.map((alt) =>
        alt.id === 'alt-01' ? { ...alt, resolved: true } : alt
      )
    );
  };

  // Revoke credentials handler
  const handleRevokeCredentials = (identityId: string) => {
    setIdentities((prev) =>
      prev.map((id) =>
        id.id === identityId ? { ...id, status: 'SUSPENDED' } : id
      )
    );
    if (selectedIdentity.id === identityId) {
      setSelectedIdentity((prev) => ({ ...prev, status: 'SUSPENDED' }));
    }
    alert('Credentials suspended across sovereign subnet enclaves. Zero-trust gate engaged.');
  };

  // Global Search Handler
  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    const matchedAsset = assets.find(
      (a) => a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
    );
    if (matchedAsset) {
      setSelectedAsset(matchedAsset);
      setCurrentView('asset-details');
      return;
    }

    const matchedId = identities.find(
      (i) => i.name.toLowerCase().includes(q) || i.did.toLowerCase().includes(q)
    );
    if (matchedId) {
      setSelectedIdentity(matchedId);
      setCurrentView('identity-details');
      return;
    }

    if (q.includes('tamper') || q.includes('audit') || q.includes('block')) {
      setCurrentView('audit');
      return;
    }

    if (q.includes('role') || q.includes('rbac') || q.includes('tier')) {
      setCurrentView('rbac');
      return;
    }

    setCurrentView('dashboard');
  };

  const unreadAlertsCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="bg-[#0a1422] text-[#d9e3f7] min-h-screen flex antialiased select-none font-sans">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onDeployNode={() => setIsDeployNodeOpen(true)}
      />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-[#0a1422]">
        {/* Fixed Top Bar */}
        <TopBar
          currentBlock={currentBlock}
          isSyncing={isSyncing}
          onSyncLedger={handleSyncLedger}
          onEmergencyFreeze={() => setIsEmergencyFreezeOpen(true)}
          onOpenWalletModal={() => setIsWalletModalOpen(true)}
          onOpenHelpModal={() => setIsHelpModalOpen(true)}
          onNavigate={(view) => setCurrentView(view)}
          walletLabel={walletLabel}
          unreadAlertsCount={unreadAlertsCount}
          onSearch={handleSearch}
        />

        {/* Dynamic View Canvas */}
        <main className="mt-16 p-6 flex-1 bg-[#0a1422] custom-scrollbar overflow-y-auto">
          {/* View 1: Overview & KPIs */}
          {currentView === 'dashboard' && (
            <DashboardView
              currentBlock={currentBlock}
              isSyncing={isSyncing}
              onSyncLedger={handleSyncLedger}
              onNavigate={(view) => setCurrentView(view)}
              onOpenCreateIdentity={() => setIsCreateIdentityOpen(true)}
              onOpenRegisterAsset={() => setIsRegisterAssetOpen(true)}
              identitiesCount={identities.length}
              activeAssetsCount={846 + (assets.length - 5)}
              nftAssetsCount={792 + (assets.length - 5)}
              pendingTransfersCount={12 + assets.filter((a) => a.status === 'Escrow').length - 1}
              eventsCount={5921 + (currentBlock - 26125)}
              securityScore={isFrozen ? 72 : 96}
              recentBlocks={recentBlocks}
            />
          )}

          {/* View 2: Identity Management */}
          {currentView === 'identities' && (
            <IdentitiesView
              identities={identities}
              onSelectIdentity={(identity) => {
                setSelectedIdentity(identity);
                setCurrentView('identity-details');
              }}
              onOpenCreateIdentity={() => setIsCreateIdentityOpen(true)}
            />
          )}

          {/* View 3: Identity Details */}
          {currentView === 'identity-details' && (
            <IdentityDetailView
              identity={selectedIdentity}
              onBack={() => setCurrentView('identities')}
              onInspectAsset={(assetId) => {
                const ast = assets.find((a) => a.id === assetId) || assets[0];
                setSelectedAsset(ast);
                setCurrentView('asset-details');
              }}
              onRevokeCredentials={handleRevokeCredentials}
              assets={assets}
            />
          )}

          {/* View 4: Access Control (RBAC Matrix) */}
          {currentView === 'rbac' && <RBACView />}

          {/* View 5: Digital Asset Registry */}
          {currentView === 'assets' && (
            <AssetsView
              assets={assets}
              onInspectAsset={(assetId) => {
                const ast = assets.find((a) => a.id === assetId) || assets[0];
                setSelectedAsset(ast);
                setCurrentView('asset-details');
              }}
              onInitiateTransfer={(asset) => {
                setSelectedAsset(asset);
                setIsTransferOpen(true);
              }}
              onOpenRegisterAsset={() => setIsRegisterAssetOpen(true)}
            />
          )}

          {/* View 6: Asset Details & Escrow Workflow */}
          {currentView === 'asset-details' && (
            <AssetDetailView
              asset={selectedAsset}
              onBack={() => setCurrentView('assets')}
              onInitiateTransfer={(asset) => {
                setSelectedAsset(asset);
                setIsTransferOpen(true);
              }}
              onVerifyInScanner={(assetId) => {
                setScannerTargetAssetId(assetId);
                setCurrentView('scanner');
              }}
            />
          )}

          {/* View 7: Verification Scanner */}
          {currentView === 'scanner' && (
            <ScannerView
              assets={assets}
              initialAssetId={scannerTargetAssetId}
            />
          )}

          {/* View 8: Immutable Audit Trail & Tamper Detection */}
          {currentView === 'audit' && (
            <AuditView
              recentBlocks={recentBlocks}
              activeDepartment={activeDepartment}
              onReconcile={handleReconcile}
              isReconciled={isReconciled}
            />
          )}

          {/* View 9: SOC Alerts & Notifications */}
          {currentView === 'notifications' && (
            <NotificationsView
              alerts={alerts}
              onAcknowledgeAll={() =>
                setAlerts((prev) => prev.map((a) => ({ ...a, resolved: true })))
              }
              onNavigate={(view) => setCurrentView(view)}
            />
          )}

          {/* View 10: Node Settings */}
          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Modals */}
      <CreateIdentityModal
        isOpen={isCreateIdentityOpen}
        onClose={() => setIsCreateIdentityOpen(false)}
        onSubmit={handleCreateIdentity}
        currentBlock={currentBlock}
      />

      <RegisterAssetModal
        isOpen={isRegisterAssetOpen}
        onClose={() => setIsRegisterAssetOpen(false)}
        onSubmit={handleRegisterAsset}
        currentBlock={currentBlock}
      />

      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        asset={selectedAsset}
        onConfirmTransfer={handleConfirmTransfer}
        currentBlock={currentBlock}
      />

      <DeployNodeModal
        isOpen={isDeployNodeOpen}
        onClose={() => setIsDeployNodeOpen(false)}
        onDeploy={(name, subnet) => {
          alert(`Sovereign Validator [${name}] deployed on ${subnet}. Genesis attestation complete.`);
        }}
      />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnectWallet={(label) => setWalletLabel(label)}
        currentWalletLabel={walletLabel}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <EmergencyFreezeModal
        isOpen={isEmergencyFreezeOpen}
        onClose={() => setIsEmergencyFreezeOpen(false)}
        onFreezeExecuted={() => {
          setIsFrozen(true);
          const newAlert: SOCAlert = {
            id: `alt-${Date.now()}`,
            severity: 'HIGH',
            title: 'EMERGENCY PERIMETER DEFENSE FREEZE ACTIVE',
            description: 'All smart contract state modifications are suspended across 127.0.0.1:8545.',
            timestamp: 'Just now',
            targetView: 'dashboard',
            resolved: false,
          };
          setAlerts((prev) => [newAlert, ...prev]);
        }}
        isFrozen={isFrozen}
        onUnfreeze={() => {
          setIsFrozen(false);
        }}
      />
    </div>
  );
}
