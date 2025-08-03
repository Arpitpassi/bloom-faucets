"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Terminal, Loader } from "lucide-react"
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

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
        !isActive && !result && !error && "hidden",
      )}
    >
      <div className="bg-card shadow-xl max-w-xl w-full p-8 rounded-xs border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Terminal className="w-5 h-5 text-foreground" />
          <span className="text-foreground font-mono font-semibold">
            {actionType === "sponsor" ? "sponsor-credits" : actionType === "revoke" ? "revoke-access" : "processing"}
          </span>
        </div>
        {isActive && (
          <div className="flex items-center space-x-2">
            <pre className="text-muted-foreground text-sm font-mono whitespace-pre-wrap max-h-64 overflow-auto">
              {displayedText}
              {isAnimating && <span className="animate-pulse">_</span>}
            </pre>
          </div>
        )}
        {!isActive && (result || error) && (
          <div className="space-y-3">
            <div className="text-muted-foreground font-mono text-sm">
              <span className="text-foreground">$</span> Status:{" "}
              <span className={cn("font-semibold", error ? "text-destructive" : "text-green-500")}>
                {error ? "FAILED" : "SUCCESS"}
              </span>
            </div>
            {selectedPool && (
              <>
                <div className="text-muted-foreground font-mono text-sm">
                  <span className="text-foreground">$</span> Pool:{" "}
                  <span className="text-foreground">{selectedPool.name}</span>
                </div>
                {actionType === "sponsor" && (
                  <div className="text-muted-foreground font-mono text-sm">
                    <span className="text-foreground">$</span> Addresses:{" "}
                    <span className="text-foreground">{selectedPool.addresses.length}</span>
                  </div>
                )}
                {actionType === "revoke" && result && (
                  <div className="text-muted-foreground font-mono text-sm">
                    <span className="text-foreground">$</span> Revoked Address:{" "}
                    <span className="text-foreground">{result}</span>
                  </div>
                )}
              </>
            )}
            {error && (
              <div className="text-destructive font-mono text-sm">
                <span className="text-destructive">$</span> Error: <span className="text-destructive">{error}</span>
              </div>
            )}
            {result && !error && actionType === "sponsor" && (
              <div className="text-muted-foreground font-mono text-sm">
                <span className="text-foreground">$</span> Result: <span className="text-foreground">{result}</span>
              </div>
            )}
            {(actionType === "sponsor" || actionType === "revoke") && rawOutput && rawOutput.length > 0 && (
              <div className="mt-4">
                <pre className="text-muted-foreground text-sm font-mono whitespace-pre-wrap max-h-64 overflow-auto bg-muted p-4 rounded-xs border border-border">
                  {rawOutput.map((output, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-foreground">Address: {output.address}</span>
                      <br />
                      <span className="text-foreground">
                        {JSON.stringify(output.response || output.error, null, 2)}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        )}
        {isActive && status && (
          <div className="mt-4 text-center text-muted-foreground font-mono text-sm flex items-center justify-center gap-2">
            <Loader className="w-4 h-4 text-muted-foreground animate-spin" />
            <span>Processing, please wait...</span>
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={onComplete}
            className="bg-primary text-primary-foreground border-2 border-primary px-6 py-3 text-sm font-semibold hover:bg-primary/90 hover:text-primary-foreground transition-colors rounded-xs"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  )
}

export default TerminalLoading
