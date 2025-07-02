// src/pages/Dashboard.tsx
"use client"

import { useState } from "react"
import { X, Users, ClipboardPenIcon } from "lucide-react"
import { ToastContainer, useToast } from "../components/toast"
import { formatDateTime } from "../utils/utils"
import { TimeLeftDial } from "../components/TimeLeftDial"
import { Pool } from "../types/types"
import { usePoolManager } from "../hooks/usePoolManager"
import { ConnectButton } from "@arweave-wallet-kit/react"
import { useUser } from "../hooks/useUser"
import TurboUploadModal from "../components/TurboUploadModal"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPoolActions, setShowPoolActions] = useState(false)
  const [showAddressesModal, setShowAddressesModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
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
    handleDownloadWallet,
    handleTopUp,
    handleSponsorCredits,
    handleRefreshBalance,
  } = usePoolManager(
    address || "",
    connected,
    setShowPoolActions,
    setShowCreateModal,
    setShowEditModal,
    { showSuccess, showError, showWarning, showInfo }
  )

  const WalletStatus = () => {
    if (!connected) {
      return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <p className="text-gray-700 text-sm font-medium">
            Connect your Arweave wallet to continue
          </p>
          <ConnectButton
            accent="rgb(0,0,0)"
            showBalance={false}
            className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          />
        </div>
      )
    }
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <p className="text-gray-700 text-sm font-medium">
          Connected: {address?.slice(0, 8)}...{address?.slice(-8)}
        </p>
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
          className="bg-red-500 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
      const balance = await fetchBalance(pool.id)
      if (balance !== null) {
        setPools((prev: Pool[]) => prev.map((p: Pool) => (p.id === pool.id ? { ...p, balance } : p)))
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
      console.error("Copy address error:", error)
      showError("Copy Failed", `Failed to copy address: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Left Sidebar - Pools */}
      <div className="w-full lg:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-6">POOLS</h2>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-white text-black border-2 border-black p-3 rounded-xl text-sm font-medium mb-6 hover:bg-black hover:text-white transition-colors"
        >
          + New Pool
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
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold">{pool.name}</h3>
                <Badge variant={pool.status === "Active" ? "default" : "destructive"}>
                  {pool.status}
                </Badge>
              </div>
              <div className="text-xs text-gray-600 mt-2 space-y-1">
                <p>
                  Balance:{" "}
                  <span className="font-medium">
                    {pool.balance !== null ? pool.balance.toFixed(4) : "Loading..."}
                  </span>
                </p>
                <p>
                  Usage Cap: <span className="font-medium">{pool.usageCap.toFixed(4)}</span>
                </p>
                <p>
                  Duration: {formatDateTime(pool.startTime)} - {formatDateTime(pool.endTime)}
                </p>
                <p>
                  Addresses: <span className="font-medium">{pool.addresses.length}</span>
                </p>
              </div>
              {selectedPool?.id === pool.id && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePoolActions()
                  }}
                  className="w-full bg-white text-black border-2 border-black p-2 mt-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors"
                >
                  Pool Actions
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10">
        <h1 className="text-2xl font-semibold mb-6">FAUCET MANAGER</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold">{totalPools}</p>
            <p className="text-sm text-gray-600">TOTAL POOLS</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-semibold">{activePools}</p>
            <p className="text-sm text-gray-600">ACTIVE POOLS</p>
          </div>
        </div>
        <WalletStatus />
        {connected && (
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-white text-black border-2 border-black px-8 py-3 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-colors mb-6"
          >
            Upload File with Turbo
          </Button>
        )}
        {connected && (
          <div className="mt-6">
            {showPoolActions && selectedPool ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">POOL ACTIONS - {selectedPool.name}</h2>
                  <button
                    onClick={() => setShowPoolActions(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">REVOKE ACCESS</h3>
                    <div className="flex gap-2">
                      <Input
                        value={revokeAddress}
                        onChange={(e) => setRevokeAddress(e.target.value)}
                        placeholder="Enter wallet address to revoke"
                        className="w-full p-3 border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                      />
                      <Button
                        onClick={() => handleRevokeAccess(revokeAddress)}
                        className="bg-orange-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        Revoke Access
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">REFRESH BALANCE</h3>
                    <Button
                      onClick={handleRefreshBalance}
                      className="w-full bg-blue-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Refresh Balance
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">DOWNLOAD WALLET</h3>
                    <Button
                      onClick={handleDownloadWallet}
                      className="w-full bg-green-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      Download Wallet
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">DELETE POOL</h3>
                    <Button
                      onClick={handleDeletePool}
                      className="w-full bg-red-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete Pool
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">TOP UP POOL</h3>
                    <Button
                      onClick={handleTopUp}
                      className="w-full bg-purple-500 text-white p-3 rounded-xl text-sm font-medium hover:bg-purple-600 transition-colors"
                    >
                      Top Up
                    </Button>
                  </div>
                </div>
              </div>
            ) : selectedPool ? (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">FAUCET INFORMATION</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold">Name:</p>
                      <p className="text-sm">{selectedPool.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Status:</p>
                      <Badge variant={selectedPool.status === "Active" ? "default" : "destructive"}>
                        {selectedPool.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Whitelisted Addresses ({selectedPool.addresses.length}):
                      </p>
                      <Button
                        onClick={() => setShowAddressesModal(true)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-xl text-sm font-medium transition-colors"
                      >
                        <Users className="h-4 w-4" />
                        View Addresses
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => setShowEditModal(true)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Edit Pool
                      </Button>
                      <Button
                        onClick={handleSponsorCredits}
                        className="bg-green-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors ml-2"
                      >
                        Sponsor Credits
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Time Left:</p>
                    <TimeLeftDial startTime={selectedPool.startTime} endTime={selectedPool.endTime} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">YOUR FAUCET POOLS</h2>
                <p className="text-sm text-gray-600">
                  Your pools will appear in the sidebar once loaded. Click on a pool to view its details.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Whitelisted Addresses Modal */}
      {showAddressesModal && selectedPool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Whitelisted Addresses ({selectedPool.addresses.length})
              </h2>
              <button
                onClick={() => setShowAddressesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto modal-content">
              {selectedPool.addresses.map((address, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="text-sm text-gray-700">{address}</p>
                  <Button
                    onClick={() => handleCopyAddress(address)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-xl text-sm font-medium transition-colors ml-4 flex-shrink-0"
                  >
                    <ClipboardPenIcon className="h-4 w-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">CREATE NEW POOL</h2>
            <form onSubmit={handleCreatePool} className="space-y-4">
              <div>
                <label className="text-sm font-semibold">POOL NAME</label>
                <Input name="poolName" className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold">POOL PASSWORD</label>
                <Input
                  name="poolPassword"
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">CONFIRM PASSWORD</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">START TIME</label>
                  <Input
                    name="startTime"
                    type="datetime-local"
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">END TIME</label>
                  <Input
                    name="endTime"
                    type="datetime-local"
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold">MAX CREDITS PER WALLET (USAGE CAP)</label>
                <Input
                  name="usageCap"
                  type="number"
                  step="0.0001"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">WHITELISTED ADDRESSES</label>
                <Textarea
                  name="addresses"
                  placeholder="Enter one address per line"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-black text-white p-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Create Pool
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">EDIT POOL - {selectedPool.name}</h2>
            <form onSubmit={handleEditPool} className="space-y-4">
              <div>
                <label className="text-sm font-semibold">POOL NAME</label>
                <Input
                  name="poolName"
                  defaultValue={selectedPool.name}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">START TIME (UTC)</label>
                  <Input
                    name="startTime"
                    type="datetime-local"
                    defaultValue={selectedPool.startTime.slice(0, 16)}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">END TIME (UTC)</label>
                  <Input
                    name="endTime"
                    type="datetime-local"
                    defaultValue={selectedPool.endTime.slice(0, 16)}
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold">MAX CREDITS PER WALLET (USAGE CAP)</label>
                <Input
                  name="usageCap"
                  type="number"
                  step="0.0001"
                  defaultValue={selectedPool.usageCap}
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">WHITELISTED ADDRESSES</label>
                <Textarea
                  name="addresses"
                  defaultValue={selectedPool.addresses.join("\n")}
                  placeholder="Enter one address per line"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-black text-white p-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
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

      {/* Turbo Upload Modal */}
      {showUploadModal && (
        <TurboUploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  )
}

function setPools(_arg0: (prev: Pool[]) => Pool[]) {
  throw new Error("Function not implemented.")
}
