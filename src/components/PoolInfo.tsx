"use client"

import { Users } from "lucide-react"
import { Button } from "./ui/button"
import { TimeLeftDial } from "./TimeLeftDial"
import type { Pool } from "../types/types"

interface PoolInfoProps {
  pool: Pool
  onEditPool: () => void
  onSponsorCredits: () => void
  onViewAddresses: () => void
  onViewHistory: () => void
  showTerminal: boolean // Added prop
}

export default function PoolInfo({
  pool,
  onEditPool,
  onSponsorCredits,
  onViewAddresses,
  onViewHistory,
  showTerminal, // Destructure prop
}: PoolInfoProps) {
  return (
    <div className="bg-card shadow-md p-8 rounded-xs border border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-6 text-foreground">FAUCET INFORMATION</h3>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-medium">Name:</span>
              <span className="font-semibold text-foreground">{pool.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-medium">Status:</span>
              <span className={`font-semibold ${pool.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                {pool.status}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground font-medium">
                Whitelisted Addresses ({pool.addresses.length}):
              </span>
              <button
                onClick={onViewAddresses}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-2 py-1 text-sm rounded-xs bg-muted hover:bg-accent"
              >
                <Users className="w-3 h-3" />
                View
              </button>
            </div>
            <div className="flex gap-4 pt-4 flex-wrap">
              <Button
                onClick={onEditPool}
                className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Edit Faucet
              </Button>
              <Button
                onClick={onSponsorCredits}
                className="bg-secondary text-secondary-foreground px-6 py-2 text-sm font-medium hover:bg-accent transition-colors"
                disabled={showTerminal} // Disable when terminal is active
              >
                Sponsor Credits
              </Button>
              <Button
                onClick={onViewHistory}
                className="bg-background text-primary border-2 border-primary px-6 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Faucet History
              </Button>
            </div>
          </div>
          <div className="ml-8 flex-shrink-0">
            <div className="text-center">
              <div className="text-muted-foreground font-medium mb-2">Time Left:</div>
              <TimeLeftDial startTime={pool.startTime} endTime={pool.endTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
