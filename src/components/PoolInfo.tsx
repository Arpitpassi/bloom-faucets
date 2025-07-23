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
}

export default function PoolInfo({
  pool,
  onEditPool,
  onSponsorCredits,
  onViewAddresses,
  onViewHistory,
}: PoolInfoProps) {
  return (
    <div className="bg-brand-snow-drift shadow-md p-8 rounded-xs">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-6 text-gray-900">FAUCET INFORMATION</h3>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="font-semibold text-gray-900">{pool.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Status:</span>
              <span className={`font-semibold ${pool.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                {pool.status}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Whitelisted Addresses ({pool.addresses.length}):</span>
              <button
                onClick={onViewAddresses}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 py-1 text-sm rounded-xs"
              >
                <Users className="w-3 h-3" />
                View
              </button>
            </div>
            <div className="flex gap-4 pt-4 flex-wrap">
              <Button
                onClick={onEditPool}
                className="bg-blue-500 text-white px-6 py-2 text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Edit Faucet
              </Button>
              <Button
                onClick={onSponsorCredits}
                className="bg-yellow-500 text-white px-6 py-2 text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                Sponsor Credits
              </Button>
              <Button
                onClick={onViewHistory}
                className="bg-white text-brand-night border-2 border-brand-night px-6 py-2 text-sm font-medium hover:bg-brand-night hover:text-white transition-colors"
              >
                Faucet History
              </Button>
            </div>
          </div>
          <div className="ml-8 flex-shrink-0">
            <div className="text-center">
              <div className="text-gray-600 font-medium mb-2">Time Left:</div>
              <TimeLeftDial startTime={pool.startTime} endTime={pool.endTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
