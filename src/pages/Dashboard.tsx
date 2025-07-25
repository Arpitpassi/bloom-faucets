"use client"

import { useState } from "react"
import { ToastContainer, useToast } from "../components/toast"
import { usePoolManager } from "../hooks/usePoolManager"
import { useUser } from "../hooks/useUser"
import TerminalLoading from "../components/TerminalLoading"
import WalletStatus from "../components/WalletStatus"
import PoolList from "../components/PoolList"
import PoolActionsModal from "../components/PoolActionsModal"
import PoolInfo from "../components/PoolInfo"
import AddressesModal from "../components/AddressesModal"
import CreatePoolModal from "../components/CreatePoolModal"
import EditPoolModal from "../components/EditPoolModal"
import type { Pool } from "../types/types"
import { Button } from "../components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import FaucetHistoryModal from "../components/FaucetHistroyModal"

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPoolActions, setShowPoolActions] = useState(false)
  const [showAddressesModal, setShowAddressesModal] = useState(false)
  const [revokeAddress, setRevokeAddress] = useState("")
  const [showPendingAddresses, setShowPendingAddresses] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
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
    insufficientCredits,
    proceedWithPartialSponsorship,
    cancelSponsorship,
    retryPendingSponsorship,
    pendingAddresses,
  } = usePoolManager(setShowPoolActions, setShowCreateModal, setShowEditModal, {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  })

  const handlePoolSelect = async (pool: Pool) => {
    setSelectedPool({ ...pool, balance: pool.balance ?? null })
    setShowPoolActions(false)
    if (pool.balance === null && connected) {
      const balance = await fetchBalance(connected, showError)
      if (balance !== null) {
        setSelectedPool((prev) => (prev ? { ...prev, balance } : prev))
      }
    } else if (!connected) {
      showError("Wallet Error", "Please connect your wallet to fetch balance")
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
      <ToastContainer toasts={toasts} onRemove={removeToast} className="z-[100]" />
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
        <div className="bg-brand-snow-drift shadow-md p-4 text-center mb-6 rounded-xs">
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
                navigator.clipboard.writeText(address || "")
                showSuccess("Address Copied", `Address ${address?.slice(0, 10)}... copied to clipboard`)
              }}
              onDisconnect={async () => {
                try {
                  await window.arweaveWallet.disconnect()
                  showSuccess("Disconnected", "Wallet disconnected successfully")
                } catch (error) {
                  showError(
                    "Disconnect Failed",
                    `Failed to disconnect wallet: ${error instanceof Error ? error.message : String(error)}`,
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
              <>
                <PoolInfo
                  pool={selectedPool}
                  onEditPool={() => setShowEditModal(true)}
                  onSponsorCredits={handleSponsorCredits}
                  onViewAddresses={() => setShowAddressesModal(true)}
                  onViewHistory={() => setShowHistoryModal(true)}
                  showTerminal={showTerminal} // Pass showTerminal prop
                />
                {pendingAddresses.length > 0 && (
                  <div className="bg-yellow-100 border-2 border-yellow-300 p-4 mt-4 shadow-md rounded-xs">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-yellow-800">
                        Pending Sponsorships ({pendingAddresses.length})
                      </h3>
                      <Button
                        onClick={() => setShowPendingAddresses(!showPendingAddresses)}
                        className="bg-yellow-500 text-white px-2 py-1"
                      >
                        {showPendingAddresses ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-yellow-800 mb-2">
                      {pendingAddresses.length} addresses are still pending sponsorship. Add more credits to continue.
                    </p>
                    {showPendingAddresses && (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {pendingAddresses.map((address, index) => (
                          <div key={index} className="text-sm text-yellow-800 break-all">
                            {address}
                          </div>
                        ))}
                      </div>
                    )}
                    <Button onClick={retryPendingSponsorship} className="mt-2 bg-yellow-500 text-white px-4 py-2">
                      Retry Sponsorship for {pendingAddresses.length} Addresses
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-brand-snow-drift shadow-md border border-gray-200 p-8 rounded-xs">
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
      {insufficientCredits.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xs">
            <h3 className="text-lg font-semibold mb-4">Insufficient Credits</h3>
            <p className="mb-4">
              You have {insufficientCredits.availableCredits.toFixed(4)} credits available, but{" "}
              {insufficientCredits.totalRequiredCredits.toFixed(4)} credits are needed to fund all{" "}
              {insufficientCredits.addresses.length} wallets. <br />
              You can fully fund {insufficientCredits.maxFundable} wallets with the available credits.
            </p>
            <div className="flex gap-4">
              <Button onClick={proceedWithPartialSponsorship} className="bg-green-500 text-white px-4 py-2">
                Proceed with {insufficientCredits.maxFundable} wallets
              </Button>
              <Button onClick={cancelSponsorship} className="bg-red-500 text-white px-4 py-2">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <FaucetHistoryModal isOpen={showHistoryModal} pool={selectedPool} onClose={() => setShowHistoryModal(false)} />
    </div>
  )
}
