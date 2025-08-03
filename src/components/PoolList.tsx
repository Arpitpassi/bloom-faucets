"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Pool } from "../types/types"
import { formatDateTime } from "../utils/utils"

interface PoolListProps {
  pools: Pool[]
  selectedPool: Pool | null
  onPoolSelect: (pool: Pool) => void
  onCreatePool: () => void
  onPoolActions: () => void
}

export default function PoolList({ pools, selectedPool, onPoolSelect, onCreatePool, onPoolActions }: PoolListProps) {
  return (
    <div className="w-80 bg-card shadow-lg p-6 overflow-y-auto rounded-xs border border-border">
      <h2 className="text-lg font-semibold mb-6 pb-3 border-b border-border text-foreground">FAUCETS</h2>
      <Button
        onClick={onCreatePool}
        className="w-full bg-primary text-primary-foreground border-2 border-primary p-3 text-sm font-medium mb-6 hover:bg-primary/90 hover:text-primary-foreground transition-colors"
      >
        + New Faucet
      </Button>
      <div className="space-y-4">
        {pools.map((pool) => (
          <div
            key={pool.id}
            onClick={() => onPoolSelect(pool)}
            className={`bg-background border border-border rounded-xs p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedPool?.id === pool.id ? "ring-2 ring-primary bg-muted shadow-lg" : "shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold text-base text-foreground">{pool.name}</div>
              <Badge
                className={`text-xs font-medium px-2 py-1 ${
                  pool.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                } rounded-xs`}
              >
                {pool.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                Balance:{" "}
                <span className="font-medium text-foreground">
                  {pool.balance !== null ? pool.balance.toFixed(4) : "Loading..."}
                </span>
              </div>
              <div>
                Usage Cap: <span className="font-medium text-foreground">{pool.usageCap}</span>
              </div>
              <div className="text-xs">
                Duration: {formatDateTime(pool.startTime)} - {formatDateTime(pool.endTime)}
              </div>
              <div>
                Addresses: <span className="font-medium text-foreground">{pool.addresses.length}</span>
              </div>
            </div>
            {selectedPool?.id === pool.id && (
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onPoolActions()
                }}
                className="w-full bg-primary text-primary-foreground border-2 border-primary p-2 mt-3 text-sm font-medium hover:bg-primary/90 hover:text-primary-foreground transition-colors"
              >
                Faucet Actions
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
