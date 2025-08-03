"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import type { Pool } from "../types/types"

interface PoolManagementModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (poolData: Partial<Pool>) => void
  initialData?: Pool
}

export default function PoolManagementModal({ isOpen, onClose, onSave, initialData }: PoolManagementModalProps) {
  const [poolName, setPoolName] = useState(initialData?.name || "")
  const [startTime, setStartTime] = useState(initialData?.startTime || "")
  const [endTime, setEndTime] = useState(initialData?.endTime || "")
  const [usageCap, setUsageCap] = useState(initialData?.usageCap.toString() || "")
  const [addresses, setAddresses] = useState(initialData?.addresses.join("\n") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: poolName,
      startTime,
      endTime,
      usageCap: Number.parseFloat(usageCap),
      addresses: addresses.split("\n").filter((addr) => addr.trim() !== ""),
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xs border border-border">
        <Button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </Button>
        <h3 className="text-xl font-semibold mb-6 text-foreground">
          {initialData ? "EDIT FAUCET" : "CREATE NEW FAUCET"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">FAUCET NAME</label>
            <Input
              value={poolName}
              onChange={(e) => setPoolName(e.target.value)}
              className="w-full p-3 border border-input bg-input text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">START TIME</label>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-input bg-input text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">END TIME</label>
              <Input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-input bg-input text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">MAX CREDITS PER WALLET</label>
            <Input
              type="number"
              step="0.000001"
              value={usageCap}
              onChange={(e) => setUsageCap(e.target.value)}
              className="w-full p-3 border border-input bg-input text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">WHITELISTED ADDRESSES</label>
            <Textarea
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
              rows={4}
              placeholder="Enter one Arweave address per line"
              className="w-full p-3 border border-input bg-input text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground border-2 border-primary p-3 text-sm font-medium hover:bg-primary/90"
          >
            {initialData ? "Save Changes" : "Create Faucet"}
          </Button>
        </form>
      </div>
    </div>
  )
}
