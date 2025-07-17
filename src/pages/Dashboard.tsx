"use client"

import { useState } from "react"
import { ToastContainer, useToast } from "../components/toast"
import { usePoolManager } from "../hooks/usePoolManager"
import { useUser } from "@/hooks/useUser"
import TerminalLoading from "../components/TerminalLoading"
import WalletStatus from "../components/WalletStatus"
import PoolList from "../components/PoolList"
import PoolActionsModal from "../components/PoolActionsModal"
import PoolInfo from "../components/PoolInfo"
import AddressesModal from "../components/AddressesModal"
import CreatePoolModal from "../components/CreatePoolModal"
import EditPoolModal from "../components/EditPoolModal"
import { Pool } from "../types/types"

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPoolActions, setShowPoolActions] = useState(false)
  const [showAddressesModal, setShowAddressesModal] = useState(false)
  const [revokeAddress, setRevokeAddress] = useState("")
  const { toasts, removeToast, showSuccess, showError, showWarning, showInfo } = useToast()
  const { connected, address } = useUser()
  const {
    pools,
    selectedPool,
    setSelectedPool,
    totalPools,
    activePools,
    fetchBalance,
    handleCreatePool,
    handleEditPool,
    handleDeletePool,
    handleRevokeAccess,
    handleSponsorCredits,
    showTerminal,
    terminalStatus,
    terminalActionType,
    terminalResult,
    terminalError,
    terminalRawOutput,
    handleTerminalClose,
  } = usePoolManager(setShowPoolActions, setShowCreateModal, setShowEditModal, {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  })

  const handlePoolSelect = async (pool: Pool) => {
    setSelectedPool({ ...pool, balance: pool.balance ?? null })
    setShowPoolActions(false)
    if (pool.balance === null) {
      const balance = await fetchBalance()
      if (balance !== null) {
        setSelectedPool((prev) => (prev ? { ...prev, balance } : prev))
      }
    }
  }

  const handlePoolActions = () => {
    setShowPoolActions(true)
  }

  const handleCopyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      showSuccess("Address Copied", `Address ${address.slice(0, 10)}... copied to clipboard`)
    } catch (error) {
      showError("Copy Failed", `Failed to copy address: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="min-h-screen bg-brand-spring-wood text-gray-900 font-inter antialiased flex">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <TerminalLoading
        isActive={showTerminal && !!terminalStatus}
        status={terminalStatus}
        actionType={terminalActionType}
        selectedPool={selectedPool ? { name: selectedPool.name, addresses: selectedPool.addresses } : null}
        result={terminalResult}
        error={terminalError}
        rawOutput={terminalRawOutput}
        onComplete={handleTerminalClose}
      />

      <PoolList
        pools={pools}
        selectedPool={selectedPool}
        onPoolSelect={handlePoolSelect}
        onCreatePool={() => setShowCreateModal(true)}
        onPoolActions={handlePoolActions}
      />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-brand-snow-drift rounded-xl shadow-sm border border-gray-200 p-4 text-center mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900">FAUCET MANAGER</h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalPools}</div>
              <div className="text-xs text-gray-500 font-medium">TOTAL FAUCETS</div>
            </div>
            <WalletStatus
              connected={connected}
              address={address}
              onCopyAddress={() => {
                navigator.clipboard.writeText(address || '')
                showSuccess("Address Copied", `Address ${address?.slice(0, 10)}... copied to clipboard`)
              }}
              onDisconnect={async () => {
                try {
                  await window.arweaveWallet.disconnect()
                  showSuccess("Disconnected", "Wallet disconnected successfully")
                } catch (error) {
                  showError(
                    "Disconnect Failed",
                    `Failed to disconnect wallet: ${error instanceof Error ? error.message : String(error)}`
                  )
                }
              }}
            />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{activePools}</div>
              <div className="text-xs text-gray-500 font-medium">ACTIVE FAUCETS</div>
            </div>
          </div>
        </div>

        {connected && (
          <div>
            {showPoolActions && selectedPool ? (
              <PoolActionsModal
                pool={selectedPool}
                revokeAddress={revokeAddress}
                setRevokeAddress={setRevokeAddress}
                onRevokeAccess={handleRevokeAccess}
                onDeletePool={handleDeletePool}
                onClose={() => setShowPoolActions(false)}
                onViewAddresses={() => setShowAddressesModal(true)}
              />
            ) : selectedPool ? (
              <PoolInfo
                pool={selectedPool}
                onEditPool={() => setShowEditModal(true)}
                onSponsorCredits={handleSponsorCredits}
                onViewAddresses={() => setShowAddressesModal(true)}
              />
            ) : (
              <div className="bg-brand-snow-drift rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">YOUR FAUCETS</h3>
                <p className="text-gray-600">
                  Already created faucets will appear in the sidebar once loaded. Click on a faucet to view its details.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <AddressesModal
        isOpen={showAddressesModal}
        pool={selectedPool}
        onClose={() => setShowAddressesModal(false)}
        onCopyAddress={handleCopyAddress}
      />
      <CreatePoolModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreatePool={handleCreatePool}
      />
      <EditPoolModal
        isOpen={showEditModal}
        pool={selectedPool}
        onClose={() => setShowEditModal(false)}
        onEditPool={handleEditPool}
      />
    </div>
  )
}