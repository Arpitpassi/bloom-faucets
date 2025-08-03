import { useCallback } from "react"
import { TurboFactory, ArconnectSigner } from "@ardrive/turbo-sdk/web"
import { Pool } from "../types/types"
import { savePools, loadPools } from "./poolUtils"
import { useErrorHandler } from "./useErrorHandler"
import { isValidArweaveAddress } from "../utils/utils"

export const useRevocation = (
  pools: Pool[],
  setPools: (pools: Pool[]) => void,
  selectedPool: Pool | null,
  setSelectedPool: (pool: Pool | null) => void,
  setTotalPools: (total: number) => void,
  setActivePools: (active: number) => void,
  connected: boolean,
  address: string | undefined,
  setShowTerminal: (value: boolean) => void,
  setTerminalActionType: (type: 'sponsor' | 'revoke' | null) => void,
  setTerminalStatus: (status: string) => void,
  setTerminalResult: (result: string | null) => void,
  setTerminalError: (error: string | null) => void,
  setTerminalRawOutput: (output: any[]) => void,
  showError: (title: string, message: string) => void,
  showSuccess: (title: string, message: string) => void
) => {
  const { handleError } = useErrorHandler()

  const handleRevokeAccess = useCallback(async (revokeAddress: string) => {
    if (!revokeAddress.trim()) return handleError(null, "Please enter a valid wallet address")
    if (!isValidArweaveAddress(revokeAddress)) return handleError(null, "Please enter a valid Arweave address")
    if (!selectedPool) return handleError(null, "Please select a pool first")
    if (!connected || !window.arweaveWallet) return handleError(null, "Please connect your wallet first")

    setShowTerminal(true)
    setTerminalActionType('revoke')
    setTerminalStatus(`Revoking access for ${revokeAddress.slice(0, 10)}...`)
    setTerminalRawOutput([])

    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({ signer, token: "arweave" })
      const response = await turbo.revokeCredits({ revokedAddress: revokeAddress })
      setTerminalRawOutput([{ address: revokeAddress, response }])

      const updatedPool: Pool = {
        ...selectedPool,
        addresses: selectedPool.addresses.filter(addr => addr !== revokeAddress),
        sponsoredAddresses: selectedPool.sponsoredAddresses.filter(addr => addr !== revokeAddress),
        history: [
          ...(selectedPool.history || []),
          {
            timestamp: new Date().toISOString(),
            action: "Revoked Access",
            details: `Access to credits has been revoked for ${revokeAddress}`,
            outputs: [{ address: revokeAddress, response }],
          },
        ],
      }

      if (updatedPool.addresses.includes(revokeAddress) || updatedPool.sponsoredAddresses.includes(revokeAddress)) {
        throw new Error(`Failed to remove ${revokeAddress} from pool`)
      }

      const updatedPools = pools.map(pool => pool.id === selectedPool.id ? updatedPool : pool)
      savePools(updatedPools, setPools, setTotalPools, setActivePools)
      setSelectedPool(updatedPool)
      await loadPools(connected, address, setPools, setTotalPools, setActivePools, setSelectedPool, selectedPool, showError)
      setTerminalResult(revokeAddress)
      setTerminalError(null)
      showSuccess("Access Revoked", `Successfully revoked access for ${revokeAddress.slice(0, 10)}...`)
    } catch (error) {
      const errorMessage = `Error revoking access: ${error instanceof Error ? error.stack || error.message : String(error)}`
      setTerminalError(errorMessage)
      setTerminalResult(null)
      setTerminalRawOutput([{ address: revokeAddress, error: error instanceof Error ? error.stack || error.message : String(error) }])

      if (selectedPool) {
        const updatedPool = {
          ...selectedPool,
          history: [
            ...(selectedPool.history || []),
            {
              timestamp: new Date().toISOString(),
              action: "Revoke Access Failed",
              details: `Failed to revoke access for ${revokeAddress}: ${errorMessage}`,
              errors: [errorMessage],
            },
          ],
        }
        const updatedPools = pools.map(pool => pool.id === selectedPool.id ? updatedPool : pool)
        savePools(updatedPools, setPools, setTotalPools, setActivePools)
        setSelectedPool(updatedPool)
      }

      handleError(error, "Failed to revoke access")
    } finally {
      setTerminalStatus('')
      setShowTerminal(true)
    }
  }, [pools, selectedPool, connected, address, showError, showSuccess, handleError])

  return { handleRevokeAccess }
}