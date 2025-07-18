import { useState, useEffect } from "react"
import { Pool } from "../types/types"
import { useUser } from "./useUser"
import { loadPools } from "./poolUtils"
import { usePoolOperations } from "./usePoolOperations"
import { useBalance } from "./useBalance"
import { useSponsorship } from "./useSponsorship"
import { useRevocation } from "./useRevocation"

export function usePoolManager(
  setShowPoolActions: (value: boolean) => void,
  setShowCreateModal: (value: boolean) => void,
  setShowEditModal: (value: boolean) => void,
  toastFunctions: {
    showSuccess: (title: string, message: string) => void
    showError: (title: string, message: string) => void
    showWarning: (title: string, message: string) => void
    showInfo: (title: string, message: string) => void
  }
) {
  const [pools, setPools] = useState<Pool[]>([])
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)
  const [totalPools, setTotalPools] = useState(0)
  const [activePools, setActivePools] = useState(0)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalStatus, setTerminalStatus] = useState<string>('')
  const [terminalActionType, setTerminalActionType] = useState<'sponsor' | 'revoke' | null>(null)
  const [terminalResult, setTerminalResult] = useState<string | null>(null)
  const [terminalError, setTerminalError] = useState<string | null>(null)
  const [terminalRawOutput, setTerminalRawOutput] = useState<any[]>([])
  const [insufficientCredits, setInsufficientCredits] = useState<{
    show: boolean
    maxFundable: number
    addresses: string[]
    availableCredits: number
    totalRequiredCredits: number
  }>({ show: false, maxFundable: 0, addresses: [], availableCredits: 0, totalRequiredCredits: 0 })

  const { connected, address } = useUser()
  const { showSuccess, showError, showWarning, showInfo } = toastFunctions

  useEffect(() => {
    if (connected && address) {
      loadPools(connected, address, setPools, setTotalPools, setActivePools, setSelectedPool, selectedPool, showError)
    } else {
      setPools([])
      setTotalPools(0)
      setActivePools(0)
      setSelectedPool(null)
      setShowPoolActions(false)
    }
  }, [connected, address])

  const poolOps = usePoolOperations(
    pools, setPools, selectedPool, setSelectedPool, setTotalPools, setActivePools,
    connected, address, showError, showSuccess, setShowCreateModal, setShowEditModal, setShowPoolActions
  )

  const balanceOps = useBalance(
    pools, setPools, selectedPool, setSelectedPool, connected, showError, showSuccess
  )

  const sponsorOps = useSponsorship(
    pools, setPools, selectedPool, setSelectedPool, setTotalPools, setActivePools,
    connected, setShowTerminal, setTerminalActionType, setTerminalStatus, setTerminalResult,
    setTerminalError, setTerminalRawOutput, insufficientCredits, setInsufficientCredits, 
    showError, showSuccess, showWarning, showInfo
  )

  const revokeOps = useRevocation(
    pools, setPools, selectedPool, setSelectedPool, setTotalPools, setActivePools,
    connected, address, setShowTerminal, setTerminalActionType, setTerminalStatus,
    setTerminalResult, setTerminalError, setTerminalRawOutput, showError, showSuccess
  )

  const handleTerminalClose = () => {
    setShowTerminal(false)
    setTerminalActionType(null)
    setTerminalResult(null)
    setTerminalError(null)
    setTerminalRawOutput([])
  }

  return {
    pools,
    selectedPool,
    setSelectedPool,
    totalPools,
    setTotalPools,
    activePools,
    setActivePools,
    fetchBalance: balanceOps.fetchBalance,
    loadPools: () => loadPools(connected, address, setPools, setTotalPools, setActivePools, setSelectedPool, selectedPool, showError),
    handleCreatePool: poolOps.handleCreatePool,
    handleEditPool: poolOps.handleEditPool,
    handleDeletePool: poolOps.handleDeletePool,
    handleRevokeAccess: revokeOps.handleRevokeAccess,
    handleSponsorCredits: sponsorOps.handleSponsorCredits,
    handleRefreshBalance: balanceOps.handleRefreshBalance,
    showTerminal,
    terminalStatus,
    terminalActionType,
    terminalResult,
    terminalError,
    terminalRawOutput,
    handleTerminalClose,
    insufficientCredits,
    proceedWithPartialSponsorship: sponsorOps.proceedWithPartialSponsorship,
    cancelSponsorship: sponsorOps.cancelSponsorship,
  }
}