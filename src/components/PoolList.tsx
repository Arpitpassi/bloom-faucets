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
    <div className="w-80 bg-brand-snow-drift shadow-lg p-6 overflow-y-auto rounded-xs">
      <h2 className="text-lg font-semibold mb-6 pb-3 border-b border-gray-200">FAUCETS</h2>
      <Button
        onClick={onCreatePool}
        className="w-full bg-white text-brand-night border-2 border-brand-night p-3 text-sm font-medium mb-6 hover:bg-brand-night hover:text-white transition-colors"
      >
        + New Faucet
      </Button>
      <div className="space-y-4">
        {pools.map((pool) => (
          <div
            key={pool.id}
            onClick={() => onPoolSelect(pool)}
            className={`bg-brand-snow-drift border border-gray-200 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedPool?.id === pool.id ? "ring-2 ring-gray-900 bg-gray-50 shadow-lg" : "shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold text-base">{pool.name}</div>
              <Badge
                className={`text-xs font-medium px-2 py-1 ${
                  pool.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                } rounded-xs`}
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
                  onPoolActions()
                }}
                className="w-full bg-white text-brand-night border-2 border-brand-night p-2 mt-3 text-sm font-medium hover:bg-brand-night hover:text-white transition-colors"
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
