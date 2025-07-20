import { useState } from "react"
import { Users, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "./ui/button"
import { TimeLeftDial } from "./TimeLeftDial"
import { Pool } from "../types/types"
import { formatDateTime } from "../utils/utils"

interface PoolInfoProps {
  pool: Pool
  onEditPool: () => void
  onSponsorCredits: () => void
  onViewAddresses: () => void
}

export default function PoolInfo({ pool, onEditPool, onSponsorCredits, onViewAddresses }: PoolInfoProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [expandedHistoryIndices, setExpandedHistoryIndices] = useState<number[]>([])

  return (
    <div className="bg-brand-snow-drift rounded-xl shadow-sm border border-gray-200 p-8">
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
              <span
                className={`font-semibold ${pool.status === "Active" ? "text-green-600" : "text-red-600"}`}
              >
                {pool.status}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">
                Whitelisted Addresses ({pool.addresses.length}):
              </span>
              <button
                onClick={onViewAddresses}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 py-1 rounded border border-gray-300 text-sm"
              >
                <Users className="w-3 h-3" />
                View
              </button>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                onClick={onEditPool}
                className="bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Edit Faucet
              </Button>
              <Button
                onClick={onSponsorCredits}
                className="bg-yellow-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                Sponsor Credits
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
      <div className="mt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 px-2 py-1 rounded border border-gray-300 text-sm"
        >
          {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          Faucet History
        </button>
        {showHistory && (
          <div className="mt-4 space-y-2">
            {pool.history && pool.history.length > 0 ? (
              [...pool.history]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((entry, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium">{formatDateTime(entry.timestamp)}:</span> {entry.action} - {entry.details}
                      {entry.outputs && entry.outputs.length > 0 && (
                        <button
                          onClick={() => {
                            if (expandedHistoryIndices.includes(index)) {
                              setExpandedHistoryIndices(expandedHistoryIndices.filter(i => i !== index))
                            } else {
                              setExpandedHistoryIndices([...expandedHistoryIndices, index])
                            }
                          }}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          {expandedHistoryIndices.includes(index) ? "Collapse" : "Expand"}
                        </button>
                      )}
                    </div>
                    {expandedHistoryIndices.includes(index) && entry.outputs && (
                      <div className="mt-2 pl-4">
                        {entry.outputs.map((output, idx) => (
                          <div key={idx} className="mb-2">
                            <div>Address: {output.address}</div>
                            <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(output.response, null, 2)}</pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <div className="text-sm text-gray-600">No history available</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}