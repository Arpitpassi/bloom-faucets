"use client"

import { X, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import type { Pool } from "../types/types"

interface PoolActionsModalProps {
  pool: Pool
  revokeAddress: string
  setRevokeAddress: (address: string) => void
  onRevokeAccess: (address: string) => void
  onDeletePool: () => void
  onClose: () => void
  onViewAddresses: () => void
}

export default function PoolActionsModal({
  pool,
  revokeAddress,
  setRevokeAddress,
  onRevokeAccess,
  onDeletePool,
  onClose,
  onViewAddresses,
}: PoolActionsModalProps) {
  return (
    <div className="bg-brand-snow-drift shadow-sm p-8 rounded-xs">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">FAUCET ACTIONS - {pool.name}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-xs">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-gray-700">REVOKE ACCESS</h4>
            <button
              onClick={onViewAddresses}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 py-1 text-sm rounded-xs bg-gray-200 hover:bg-gray-300"
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
            className="w-full p-3 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <Button
            onClick={() => onRevokeAccess(revokeAddress)}
            className="w-full bg-orange-500 text-white p-3 text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Revoke Access
          </Button>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">DELETE FAUCET</h4>
          <Button
            onClick={onDeletePool}
            className="w-full bg-red-500 text-white p-3 text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete Faucet
          </Button>
        </div>
      </div>
    </div>
  )
}
