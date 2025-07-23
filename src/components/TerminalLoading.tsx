"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Terminal } from "lucide-react"
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
      <div className="bg-white border-2 border-gray-300 shadow-xl max-w-xl w-full p-8 rounded-none">
        <div className="flex items-center space-x-2 mb-4">
          <Terminal className="w-5 h-5 text-gray-900" />
          <span className="text-gray-900 font-mono font-semibold">
            {actionType === "sponsor" ? "sponsor-credits" : "revoke-access"}
          </span>
        </div>
        {isActive && (
          <pre className="text-gray-700 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-auto">
            {displayedText}
            {isAnimating && <span className="animate-pulse">_</span>}
          </pre>
        )}
        {!isActive && (result || error) && (
          <div className="space-y-3">
            <div className="text-gray-700 font-mono text-sm">
              <span className="text-gray-900">$</span> Status:{" "}
              <span className={cn("font-semibold", error ? "text-red-500" : "text-green-500")}>
                {error ? "FAILED" : "SUCCESS"}
              </span>
            </div>
            {selectedPool && (
              <>
                <div className="text-gray-700 font-mono text-sm">
                  <span className="text-gray-900">$</span> Pool:{" "}
                  <span className="text-gray-900">{selectedPool.name}</span>
                </div>
                {actionType === "sponsor" && (
                  <div className="text-gray-700 font-mono text-sm">
                    <span className="text-gray-900">$</span> Addresses:{" "}
                    <span className="text-gray-900">{selectedPool.addresses.length}</span>
                  </div>
                )}
                {actionType === "revoke" && result && (
                  <div className="text-gray-700 font-mono text-sm">
                    <span className="text-gray-900">$</span> Revoked Address:{" "}
                    <span className="text-gray-900">{result}</span>
                  </div>
                )}
              </>
            )}
            {error && (
              <div className="text-red-500 font-mono text-sm">
                <span className="text-red-600">$</span> Error: <span className="text-red-500">{error}</span>
              </div>
            )}
            {result && !error && actionType === "sponsor" && (
              <div className="text-gray-700 font-mono text-sm">
                <span className="text-gray-900">$</span> Result: <span className="text-gray-900">{result}</span>
              </div>
            )}
            {(actionType === "sponsor" || actionType === "revoke") && rawOutput && rawOutput.length > 0 && (
              <div className="mt-4">
                <pre className="text-gray-700 text-sm font-mono whitespace-pre-wrap max-h-64 overflow-auto bg-gray-50 border-2 border-gray-200 p-4 rounded-none">
                  {rawOutput.map((output, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-gray-900">Address: {output.address}</span>
                      <br />
                      <span className="text-gray-900">{JSON.stringify(output.response, null, 2)}</span>
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={onComplete}
            className="bg-white text-black border-2 border-black px-6 py-3 rounded-none text-sm font-semibold hover:bg-black hover:text-white transition-colors"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  )
}

export default TerminalLoading
