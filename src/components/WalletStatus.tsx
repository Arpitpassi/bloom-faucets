"use client"

import { ConnectButton } from "@arweave-wallet-kit/react"
import { Button } from "./ui/button"
import { ClipboardPenIcon } from "lucide-react"

interface WalletStatusProps {
  connected: boolean
  address?: string
  onCopyAddress: () => void
  onDisconnect: () => void
}

export default function WalletStatus({ connected, address, onCopyAddress, onDisconnect }: WalletStatusProps) {
  if (!connected) {
    return (
      <div className="flex flex-col items-center gap-2 p-2">
        <ConnectButton
          accent="rgb(0,0,0)"
          showBalance={false}
          className="bg-brand-night text-white px-4 py-2 text-xs font-semibold hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-1"
        />
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <div className="flex items-center text-gray-700 text-xs font-medium cursor-pointer" onClick={onCopyAddress}>
        {address?.slice(0, 6)}...{address?.slice(-6)}
        <ClipboardPenIcon className="w-3 h-3 ml-1" />
      </div>
      <Button
        onClick={onDisconnect}
        className="bg-red-500 text-white px-4 py-2 text-xs font-semibold hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
      >
        Disconnect
      </Button>
    </div>
  )
}
