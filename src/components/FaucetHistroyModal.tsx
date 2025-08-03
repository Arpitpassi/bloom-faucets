"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import type { Pool } from "../types/types"
import { formatDateTime } from "../utils/utils"

interface FaucetHistoryModalProps {
  isOpen: boolean
  pool: Pool | null
  onClose: () => void
}

export default function FaucetHistoryModal({ isOpen, pool, onClose }: FaucetHistoryModalProps) {
  const [expandedHistoryIndices, setExpandedHistoryIndices] = useState<number[]>([])

  if (!isOpen || !pool) return null

  const toggleHistoryEntry = (index: number) => {
    if (expandedHistoryIndices.includes(index)) {
      setExpandedHistoryIndices(expandedHistoryIndices.filter((i) => i !== index))
    } else {
      setExpandedHistoryIndices([...expandedHistoryIndices, index])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 relative rounded-xs border border-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-muted-foreground p-1 hover:bg-muted transition-colors rounded-xs"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold mb-6 text-foreground">Faucet History - {pool.name}</h1>
        <div className="mt-4 space-y-4">
          {pool.history && pool.history.length > 0 ? (
            [...pool.history]
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((entry, index) => (
                <div key={index} className="text-sm text-muted-foreground border-b border-border pb-2 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {formatDateTime(entry.timestamp)}: {entry.action} - {entry.details}
                    </span>
                    {entry.outputs && entry.outputs.length > 0 && (
                      <button
                        onClick={() => toggleHistoryEntry(index)}
                        className="ml-2 text-primary hover:text-primary/80 flex items-center gap-1 rounded-xs"
                      >
                        {expandedHistoryIndices.includes(index) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        {expandedHistoryIndices.includes(index) ? "Collapse" : "Expand"}
                      </button>
                    )}
                  </div>
                  {expandedHistoryIndices.includes(index) && entry.outputs && (
                    <div className="mt-2 pl-4 space-y-2">
                      {entry.outputs.map((output, idx) => (
                        <div key={idx} className="bg-muted p-3 text-xs border border-border rounded-xs">
                          <div className="font-semibold mb-1 text-foreground">Address: {output.address}</div>
                          <pre className="whitespace-pre-wrap text-muted-foreground">
                            {JSON.stringify(output.response, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
          ) : (
            <div className="text-base text-muted-foreground text-center py-8">
              No history available for this faucet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
