"use client"

import { X, ClipboardPenIcon } from "lucide-react"
import { Button } from "./ui/button"
import type { Pool } from "../types/types"

interface AddressesModalProps {
  isOpen: boolean
  pool: Pool | null
  onClose: () => void
  onCopyAddress: (address: string) => void
}

export default function AddressesModal({ isOpen, pool, onClose, onCopyAddress }: AddressesModalProps) {
  if (!isOpen || !pool) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xs border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Whitelisted Addresses ({pool.addresses.length})</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {pool.addresses.map((address, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-background p-4 rounded-xs border border-border"
            >
              <span className="text-sm break-all text-foreground">{address}</span>
              <Button
                onClick={() => onCopyAddress(address)}
                className="flex items-center gap-2 bg-muted hover:bg-accent text-muted-foreground px-3 py-1 text-sm font-medium transition-colors ml-4 flex-shrink-0"
              >
                <ClipboardPenIcon className="w-4 h-4" />
                Copy
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
