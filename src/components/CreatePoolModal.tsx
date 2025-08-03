"use client"

import type React from "react"

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface CreatePoolModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePool: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function CreatePoolModal({ isOpen, onClose, onCreatePool }: CreatePoolModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xs border border-border">
        <Button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </Button>
        <h3 className="text-xl font-semibold mb-6 text-foreground">CREATE NEW FAUCET</h3>
        <form onSubmit={onCreatePool} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">FAUCET NAME</label>
            <Input
              name="poolName"
              type="text"
              className="w-full p-3 border border-input bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">START TIME</label>
              <Input
                name="startTime"
                type="datetime-local"
                className="w-full p-3 border border-input bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">END TIME</label>
              <Input
                name="endTime"
                type="datetime-local"
                className="w-full p-3 border border-input bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
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
              className="w-full p-3 border border-input bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-muted-foreground">WHITELISTED ADDRESSES</label>
            <Textarea
              name="addresses"
              rows={4}
              placeholder="Enter one Arweave address per line"
              className="w-full p-3 border border-input bg-input text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground border-2 border-primary p-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Create Faucet
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
