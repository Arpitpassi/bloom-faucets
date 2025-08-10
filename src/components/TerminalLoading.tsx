"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TerminalLoadingProps {
  isActive: boolean
  status: string
  actionType: "sponsor" | "revoke" | null
  selectedPool: { name: string; addresses: string[] } | null
  result: string | null
  error: string | null
  rawOutput: any[] | null
  onComplete: () => void
}

const TerminalLoading: React.FC<TerminalLoadingProps> = ({
  isActive,
  status,
  actionType,
  selectedPool,
  result,
  error,
  rawOutput,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("")
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isOutputExpanded, setIsOutputExpanded] = useState<boolean>(false)

  // Animate terminal text
  useEffect(() => {
    if (isActive && status) {
      setIsAnimating(true)
      setDisplayedText("")
      for (let i = 0; i <= status.length; i++) {
        setTimeout(() => {
          setDisplayedText(status.slice(0, i))
          if (i === status.length) {
            setIsAnimating(false)
          }
        }, i * 20)
      }
    }
  }, [status, isActive])

  const hasRawOutput = rawOutput && rawOutput.length > 0

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
        !isActive && !result && !error && "hidden",
      )}
    >
      <div className="bg-background shadow-2xl max-w-2xl w-full rounded-2xl border border-border overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-muted px-6 py-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-foreground font-mono font-medium text-sm">
              {actionType === "sponsor" ? "sponsor-credits" : actionType === "revoke" ? "revoke-access" : "terminal"}
            </span>
          </div>
          <button
            onClick={onComplete}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="bg-background p-6">
          {isActive && (
            <div className="mb-4">
              <div className="flex items-start space-x-2">
                <span className="text-muted-foreground font-mono text-sm">$</span>
                <div className="flex-1">
                  <pre className="text-foreground text-sm font-mono whitespace-pre-wrap">
                    {displayedText}
                    {isAnimating && <span className="animate-pulse bg-foreground w-2 h-4 inline-block ml-1"></span>}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {!isActive && (result || error) && (
            <div className="space-y-4">
              {/* Status Line */}
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground font-mono text-sm">$</span>
                <span className="text-foreground font-mono text-sm">status:</span>
                <span className={cn("font-mono text-sm font-medium", error ? "text-red-500" : "text-green-500")}>
                  {error ? "FAILED" : "SUCCESS"}
                </span>
              </div>

              {/* Pool Info */}
              {selectedPool && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground font-mono text-sm">$</span>
                    <span className="text-foreground font-mono text-sm">pool:</span>
                    <span className="text-foreground font-mono text-sm">{selectedPool.name}</span>
                  </div>
                  
                  {actionType === "sponsor" && (
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground font-mono text-sm">$</span>
                      <span className="text-foreground font-mono text-sm">addresses:</span>
                      <span className="text-foreground font-mono text-sm">{selectedPool.addresses.length}</span>
                    </div>
                  )}
                  
                  {actionType === "revoke" && result && (
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground font-mono text-sm">$</span>
                      <span className="text-foreground font-mono text-sm">revoked:</span>
                      <span className="text-foreground font-mono text-sm break-all">{result}</span>
                    </div>
                  )}
                </>
              )}

              {/* Success Result */}
              {result && !error && actionType === "sponsor" && (
                <div className="flex items-start space-x-2">
                  <span className="text-muted-foreground font-mono text-sm">$</span>
                  <span className="text-foreground font-mono text-sm">result:</span>
                  <span className="text-foreground font-mono text-sm break-all">{result}</span>
                </div>
              )}

              {/* Expandable Raw Output */}
              {hasRawOutput && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsOutputExpanded(!isOutputExpanded)}
                    className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground font-mono text-sm">$</span>
                      <span className="text-foreground font-mono text-sm">output</span>
                      <span className="text-muted-foreground text-xs">({rawOutput.length} items)</span>
                    </div>
                    {isOutputExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  
                  {isOutputExpanded && (
                    <div className="p-4 bg-background border-t border-border">
                      <div className="max-h-64 overflow-auto">
                        <pre className="text-muted-foreground text-xs font-mono whitespace-pre-wrap">
                          {rawOutput.map((output, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                              <div className="text-foreground font-medium mb-1">
                                address: {output.address}
                              </div>
                              <div className="text-muted-foreground pl-2 border-l-2 border-border">
                                {JSON.stringify(output.response || output.error, null, 2)}
                              </div>
                            </div>
                          ))}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={onComplete}
                  className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Processing State */}
          {isActive && status && (
            <div className="mt-6 flex items-center justify-center space-x-3 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
              <span className="font-mono text-sm">processing</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TerminalLoading