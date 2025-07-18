import { useCallback } from "react"
import { Pool } from "../types/types"
import { fetchBalance } from "./poolUtils"

export const useBalance = (
  pools: Pool[],
  setPools: (pools: Pool[]) => void,
  selectedPool: Pool | null,
  setSelectedPool: (pool: Pool | null) => void,
  connected: boolean,
  showError: (title: string, message: string) => void,
  showSuccess: (title: string, message: string) => void
) => {
  const handleRefreshBalance = useCallback(async () => {
    if (!selectedPool) {
      showError("No Pool Selected", "Please select a pool first")
      return null
    }
    const balance = await fetchBalance(connected, showError)
    if (balance !== null) {
      const updatedPool = { ...selectedPool, balance }
      const updatedPools = pools.map(p => p.id === selectedPool.id ? updatedPool : p)
      setPools(updatedPools)
      setSelectedPool(updatedPool)
      showSuccess("Balance Refreshed", `Balance for pool "${selectedPool.name}" has been updated`)
      return balance
    }
    return null
  }, [pools, selectedPool, connected, showError, showSuccess])

  return { fetchBalance, handleRefreshBalance }
}