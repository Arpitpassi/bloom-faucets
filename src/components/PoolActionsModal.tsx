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
    <div className="bg-card shadow-sm p-8 rounded-xs border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">FAUCET ACTIONS - {pool.name}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground rounded-xs">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-muted-foreground">REVOKE ACCESS</h4>
            <button
              onClick={onViewAddresses}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-2 py-1 text-sm rounded-xs bg-muted hover:bg-accent"
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
            className="w-full p-3 bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <Button
            onClick={() => onRevokeAccess(revokeAddress)}
            className="w-full bg-destructive text-destructive-foreground p-3 text-sm font-medium hover:bg-destructive/90 transition-colors"
          >
            Revoke Access
          </Button>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">DELETE FAUCET</h4>
          <Button
            onClick={onDeletePool}
            className="w-full bg-destructive text-destructive-foreground p-3 text-sm font-medium hover:bg-destructive/90 transition-colors"
          >
            Delete Faucet
          </Button>
        </div>
      </div>
    </div>
  )
}
