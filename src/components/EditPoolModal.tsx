"use client"

import type React from "react"

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import type { Pool } from "../types/types"

interface EditPoolModalProps {
  isOpen: boolean
  pool: Pool | null
  onClose: () => void
  onEditPool: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function EditPoolModal({ isOpen, pool, onClose, onEditPool }: EditPoolModalProps) {
  if (!isOpen || !pool) return null

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xs border border-border">
        <Button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </Button>
        <h3 className="text-xl font-semibold mb-6 text-foreground">EDIT FAUCET - {pool.name}</h3>
        <form onSubmit={onEditPool} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">FAUCET NAME</label>
            <Input
              name="poolName"
              type="text"
              defaultValue={pool.name}
              className="w-full p-3 bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">START TIME (UTC)</label>
              <Input
                name="startTime"
                type="datetime-local"
                defaultValue={toDateTimeLocal(pool.startTime)}
                className="w-full p-3 bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">END TIME (UTC)</label>
              <Input
                name="endTime"
                type="datetime-local"
                defaultValue={toDateTimeLocal(pool.endTime)}
                className="w-full p-3 bg-input text-sm focus:ring-2 focus:ring-ring focus:focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">
              MAX CREDITS PER WALLET (USAGE CAP)
            </label>
            <Input
              name="usageCap"
              type="number"
              step="0.000001"
              min="0"
              pattern="^\d*(\.\d{0,6})?$"
              defaultValue={pool.usageCap}
              className="w-full p-3 bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">WHITELISTED ADDRESSES</label>
            <Textarea
              name="addresses"
              rows={4}
              defaultValue={pool.addresses.join("\n")}
              placeholder="Enter one Arweave address per line"
              className="w-full p-3 bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground border-2 border-primary p-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="bg-secondary text-secondary-foreground border-2 border-border p-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
