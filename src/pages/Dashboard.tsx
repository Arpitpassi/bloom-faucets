"use client"

import { useState } from "react"
import { X, Users, ClipboardPenIcon } from "lucide-react"
import { ToastContainer, useToast } from "../components/toast"
import { formatDateTime } from "../utils/utils"
import { TimeLeftDial } from "../components/TimeLeftDial"
import { Pool } from "../types/types"
import { usePoolManager } from "../hooks/usePoolManager"
import { ConnectButton } from "@arweave-wallet-kit/react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { useUser } from "@/hooks/useUser"
import TerminalLoading from "../components/TerminalLoading"

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

  const WalletStatus = () => {
    if (!connected) {
      return (
        <div className="flex flex-col items-center gap-2 p-2">
          <p className="text-gray-700 text-xs font-medium">
            Connect your Arweave wallet
          </p>
          <ConnectButton
            accent="rgb(0,0,0)"
            showBalance={false}
            className="bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-1"
          />
        </div>
      )
    }
    return (
      <div className="flex flex-col items-center gap-2 p-2">
        <div
          className="flex items-center text-gray-700 text-xs font-medium cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(address || '');
            showSuccess("Address Copied", `Address ${address?.slice(0, 10)}... copied to clipboard`);
          }}
        >
          {address?.slice(0, 6)}...{address?.slice(-6)}
          <ClipboardPenIcon className="w-3 h-3 ml-1" />
        </div>
        <Button
          onClick={async () => {
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
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          Disconnect
        </Button>
      </div>
    )
  }

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

  const toDateTimeLocal = (isoDate: string): string => {
    try {
      const date = new Date(isoDate)
      const offset = date.getTimezoneOffset()
      const adjustedDate = new Date(date.getTime() - offset * 60 * 1000)
      return adjustedDate.toISOString().slice(0, 16)
    } catch {
      return isoDate.slice(0, 16)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-inter antialiased flex">
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

      {/* Left Sidebar - Pools */}
      <div className="w-80 bg-white rounded-r-xl shadow-sm border-r border-gray-200 p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6 pb-3 border-b border-gray-200">POOLS</h2>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-white text-black border-2 border-black p-3 rounded-xl text-sm font-medium mb-6 hover:bg-black hover:text-white transition-colors"
        >
          + New Faucet
        </Button>
        <div className="space-y-4">
          {pools.map((pool: Pool) => (
            <div
              key={pool.id}
              onClick={() => handlePoolSelect(pool)}
              className={`bg-white border border-gray-200 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedPool?.id === pool.id ? "ring-2 ring-gray-900 bg-gray-50" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-base">{pool.name}</div>
                <Badge
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    pool.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {pool.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  Balance:{" "}
                  <span className="font-medium text-gray-900">
                    {pool.balance !== null ? pool.balance.toFixed(4) : "Loading..."}
                  </span>
                </div>
                <div>
                  Usage Cap: <span className="font-medium text-gray-900">{pool.usageCap}</span>
                </div>
                <div className="text-xs">
                  Duration: {formatDateTime(pool.startTime)} - {formatDateTime(pool.endTime)}
                </div>
                <div>
                  Addresses: <span className="font-medium text-gray-900">{pool.addresses.length}</span>
                </div>
              </div>
              {selectedPool?.id === pool.id && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePoolActions()
                  }}
                  className="w-full bg-white text-black border-2 border-black p-2 mt-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Faucet Actions
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-900">FAUCET MANAGER</h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalPools}</div>
              <div className="text-xs text-gray-500 font-medium">TOTAL FAUCETS</div>
            </div>
            <WalletStatus />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{activePools}</div>
              <div className="text-xs text-gray-500 font-medium">ACTIVE FAUCETS</div>
            </div>
          </div>
        </div>

        {connected && (
          <div>
            {showPoolActions && selectedPool ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">FAUCET ACTIONS - {selectedPool.name}</h3>
                  <button
                    onClick={() => setShowPoolActions(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-gray-700">REVOKE ACCESS</h4>
                      <button
                        onClick={() => setShowAddressesModal(true)}
                        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 py-1 rounded border border-gray-300 text-sm"
                      >
                        <Users className="w-3 h-3" />
                        View
                      </button>
                    </div>
                    <Input
                      type="text"
                      value={revokeAddress}
                      onChange={(e) => setRevokeAddress(e.target.value)}
                      placeholder="Enter wallet address to revoke"
                      className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                    />
                    <Button
                      onClick={() => handleRevokeAccess(revokeAddress)}
                      className="w-full bg-orange-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                      Revoke Access
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700">DELETE FAUCET</h4>
                    <Button
                      onClick={handleDeletePool}
                      className="w-full bg-red-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete Pool
                    </Button>
                  </div>
                </div>
              </div>
            ) : selectedPool ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900">FAUCET INFORMATION</h3>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Name:</span>
                        <span className="font-semibold text-gray-900">{selectedPool.name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">Status:</span>
                        <span
                          className={`font-semibold ${selectedPool.status === "Active" ? "text-green-600" : "text-red-600"}`}
                        >
                          {selectedPool.status}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">
                          Whitelisted Addresses ({selectedPool.addresses.length}):
                        </span>
                        <button
                          onClick={() => setShowAddressesModal(true)}
                          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 py-1 rounded border border-gray-300 text-sm"
                        >
                          <Users className="w-3 h-3" />
                          View
                        </button>
                      </div>
                      <div className="flex gap-4 pt-4">
                        <Button
                          onClick={() => setShowEditModal(true)}
                          className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                          Edit Pool
                        </Button>
                        <Button
                          onClick={handleSponsorCredits}
                          className="bg-yellow-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors"
                        >
                          Sponsor Credits
                        </Button>
                      </div>
                    </div>
                    <div className="ml-8 flex-shrink-0">
                      <div className="text-center">
                        <div className="text-gray-600 font-medium mb-2">Time Left:</div>
                        <TimeLeftDial startTime={selectedPool.startTime} endTime={selectedPool.endTime} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">YOUR FAUCETS</h3>
                <p className="text-gray-600">
                  Your pools will appear in the sidebar once loaded. Click on a pool to view its details.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Whitelisted Addresses Modal */}
      {showAddressesModal && selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border rounded-xl shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Whitelisted Addresses ({selectedPool.addresses.length})
              </h3>
              <button
                onClick={() => setShowAddressesModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {selectedPool.addresses.map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 border-2 border-gray-300 p-4 rounded-xl"
                >
                  <span className="text-sm break-all">{address}</span>
                  <Button
                    onClick={() => handleCopyAddress(address)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-xl text-sm font-medium transition-colors ml-4 flex-shrink-0"
                  >
                    <ClipboardPenIcon className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Pool Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-200 shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xl">
            <Button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </Button>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">CREATE NEW POOL</h3>
            <form onSubmit={handleCreatePool} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">POOL NAME</label>
                <Input
                  name="poolName"
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">START TIME</label>
                  <Input
                    name="startTime"
                    type="datetime-local"
                    className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">END TIME</label>
                  <Input
                    name="endTime"
                    type="datetime-local"
                    className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  MAX CREDITS PER WALLET (USAGE CAP)
                </label>
                <Input
                  name="usageCap"
                  type="number"
                  step="0.000001"
                  min="0"
                  pattern="^\d*(\.\d{0,6})?$"
                  className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">WHITELISTED ADDRESSES</label>
                <Textarea
                  name="addresses"
                  rows={4}
                  placeholder="Enter one Arweave address per line"
                  className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-white text-black border-2 border-black p-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Create Faucet
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-white text-gray-700 border-2 border-gray-300 p-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Pool Modal */}
      {showEditModal && selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-200 shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xl">
            <Button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </Button>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">EDIT FAUCET - {selectedPool.name}</h3>
            <form onSubmit={handleEditPool} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">FAUCET NAME</label>
                <Input
                  name="poolName"
                  type="text"
                  defaultValue={selectedPool.name}
                  className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">START TIME (UTC)</label>
                  <Input
                    name="startTime"
                    type="datetime-local"
                    defaultValue={toDateTimeLocal(selectedPool.startTime)}
                    className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">END TIME (UTC)</label>
                  <Input
                    name="endTime"
                    type="datetime-local"
                    defaultValue={toDateTimeLocal(selectedPool.endTime)}
                    className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  MAX CREDITS PER WALLET (USAGE CAP)
                </label>
                <Input
                  name="usageCap"
                  type="number"
                  step="0.000001"
                  min="0"
                  pattern="^\d*(\.\d{0,6})?$"
                  defaultValue={selectedPool.usageCap}
                  className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">WHITELISTED ADDRESSES</label>
                <Textarea
                  name="addresses"
                  rows={4}
                  defaultValue={selectedPool.addresses.join("\n")}
                  placeholder="Enter one Arweave address per line"
                  className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-white text-black border-2 border-black p-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-white text-gray-700 border-2 border-gray-300 p-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}