import { useState, useEffect } from "react"
import { TurboFactory, ArconnectSigner } from "@ardrive/turbo-sdk/web"
import { Pool } from "../types/types"
import { isValidArweaveAddress } from "../utils/utils"
import { useUser } from "./useUser"

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
      loadPools()
    } else {
      setPools([])
      setTotalPools(0)
      setActivePools(0)
      setSelectedPool(null)
      setShowPoolActions(false)
    }
  }, [connected, address])

  const loadPools = async () => {
    const storedPools = localStorage.getItem("pools")
    const poolData: { [key: string]: Omit<Pool, "id" | "status" | "poolId" | "balance"> } = storedPools ? JSON.parse(storedPools) : {}
    let poolArray: Pool[] = Object.entries(poolData).map(([id, pool]) => ({
      ...pool,
      id,
      status: new Date() < new Date(pool.endTime) ? "Active" : "Ended",
      balance: null,
      poolId: id,
      sponsoredAddresses: pool.sponsoredAddresses || [],
      expireBySeconds: pool.expireBySeconds ?? null,
    }))

    if (connected && address && window.arweaveWallet) {
      try {
        const signer = new ArconnectSigner(window.arweaveWallet)
        const turbo = TurboFactory.authenticated({
          signer,
          token: "arweave",
        })
        const balanceResult = await turbo.getBalance()
        const balance = Number(balanceResult.winc) / 1e12
        poolArray = poolArray.map(pool => ({ ...pool, balance }))
      } catch (error) {
        showError("Balance Check Failed", `Failed to fetch balance: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    setPools(poolArray)
    setTotalPools(poolArray.length)
    setActivePools(poolArray.filter((pool) => pool.status === "Active").length)
    if (selectedPool) {
      const updatedSelectedPool = poolArray.find((pool) => pool.id === selectedPool.id)
      if (updatedSelectedPool) {
        setSelectedPool(updatedSelectedPool)
      }
    }
  }

  const savePools = (updatedPools: Pool[]) => {
    localStorage.removeItem("pools")
    const poolObject = updatedPools.reduce((acc, pool) => {
      acc[pool.id] = {
        name: pool.name,
        startTime: pool.startTime,
        endTime: pool.endTime,
        usageCap: pool.usageCap,
        addresses: pool.addresses,
        sponsoredAddresses: pool.sponsoredAddresses,
        sponsorInfo: pool.sponsorInfo,
        expireBySeconds: pool.expireBySeconds,
      }
      return acc
    }, {} as { [key: string]: Omit<Pool, "id" | "status" | "poolId" | "balance"> })
    localStorage.setItem("pools", JSON.stringify(poolObject))
    setPools(updatedPools)
    setTotalPools(updatedPools.length)
    setActivePools(updatedPools.filter((pool) => pool.status === "Active").length)
  }

  const fetchBalance = async (): Promise<number | null> => {
    if (!connected || !window.arweaveWallet) {
      showError("Wallet Error", "Please connect your wallet first")
      return null
    }
    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({
        signer,
        token: "arweave",
      })
      const balanceResult = await turbo.getBalance()
      return Number(balanceResult.winc) / 1e12
    } catch (error) {
      showError("Balance Check Failed", `Failed to fetch balance: ${error instanceof Error ? error.message : String(error)}`)
      return null
    }
  }

  const handleRefreshBalance = async () => {
    if (!selectedPool) {
      showError("No Pool Selected", "Please select a pool first")
      return null
    }
    const balance = await fetchBalance()
    if (balance !== null) {
      const updatedPool = { ...selectedPool, balance }
      const updatedPools = pools.map((p) => (p.id === selectedPool.id ? updatedPool : p))
      setPools(updatedPools)
      setSelectedPool(updatedPool)
      showSuccess("Balance Refreshed", `Balance for pool "${selectedPool.name}" has been updated`)
      return balance
    }
    return null
  }

  const handleCreatePool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!connected || !address) {
      showError("Wallet Error", "Please connect your wallet first")
      return
    }
    const formData = new FormData(e.target as HTMLFormElement)
    const poolName = formData.get("poolName") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const usageCap = Number.parseFloat(formData.get("usageCap") as string)
    const addresses = (formData.get("addresses") as string)
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a)

    if (!poolName.trim()) return showError("Invalid Pool Name", "Please enter a valid pool name")
    const invalidAddresses = addresses.filter((a) => !isValidArweaveAddress(a))
    if (invalidAddresses.length > 0)
      return showError("Invalid Addresses", `Please fix invalid addresses: ${invalidAddresses.join(", ")}`)
    const startDateTime = new Date(startTime)
    const endDateTime = new Date(endTime)
    if (startDateTime >= endDateTime) return showError("Invalid Dates", "Start time must be before end time")

    const poolId = crypto.randomUUID()
    const newPool: Pool = {
      id: poolId,
      name: poolName,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      usageCap,
      addresses,
      sponsoredAddresses: [],
      balance: await fetchBalance(),
      status: "Active",
      poolId: poolId,
      sponsorInfo: "",
      expireBySeconds: Math.floor((new Date(endTime).getTime() - Date.now()) / 1000),
    }

    const updatedPools = [...pools, newPool]
    savePools(updatedPools)
    setShowCreateModal(false)
    showSuccess("Pool Created", `Pool "${poolName}" has been created successfully`)
  }

  const handleEditPool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPool) return showError("No Pool Selected", "Please select a pool to edit")
    const formData = new FormData(e.target as HTMLFormElement)
    const poolName = formData.get("poolName") as string
    const startTime = formData.get("startTime") as string
    const endTime = formData.get("endTime") as string
    const usageCap = Number.parseFloat(formData.get("usageCap") as string)
    const addresses = (formData.get("addresses") as string)
      .split("\n")
      .map((a) => a.trim())
      .filter((a) => a)

    if (!poolName.trim()) return showError("Invalid Pool Name", "Please enter a valid pool name")
    if (Number.isNaN(usageCap) || usageCap < 0) return showError("Invalid Usage Cap", "Please enter a valid usage cap")
    const invalidAddresses = addresses.filter((a) => !isValidArweaveAddress(a))
    if (invalidAddresses.length > 0)
      return showError("Invalid Addresses", `Please fix invalid addresses: ${invalidAddresses.join(", ")}`)
    const startDateTime = new Date(startTime)
    const endDateTime = new Date(endTime)
    if (startDateTime >= endDateTime) return showError("Invalid Dates", "Start time must be before end time")

    try {
      const balance = await fetchBalance()
      const updatedPool: Pool = {
        ...selectedPool,
        name: poolName,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        usageCap,
        addresses,
        sponsoredAddresses: selectedPool.sponsoredAddresses,
        balance,
        expireBySeconds: Math.floor((new Date(endTime).getTime() - Date.now()) / 1000),
      }

      const updatedPools = pools.map((pool) => (pool.id === selectedPool.id ? updatedPool : pool))
      savePools(updatedPools)
      setSelectedPool(updatedPool)
      showSuccess("Pool Updated", `Pool "${poolName}" has been updated successfully`)
      setShowEditModal(false)
    } catch (error) {
      showError("Edit Failed", `Failed to update pool: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleDeletePool = async () => {
    if (!selectedPool) return showError("No Pool Selected", "Please select a pool to delete")
    const confirmDelete = window.confirm("Are you sure you want to delete this pool? This action cannot be undone.")
    if (!confirmDelete) return

    const updatedPools = pools.filter((pool) => pool.id !== selectedPool.id)
    savePools(updatedPools)
    setSelectedPool(null)
    setShowPoolActions(false)
    showSuccess("Pool Deleted", `Pool "${selectedPool.name}" has been deleted successfully`)
  }

  const handleRevokeAccess = async (revokeAddress: string) => {
    if (!revokeAddress.trim()) return showError("Invalid Address", "Please enter a valid wallet address")
    if (!isValidArweaveAddress(revokeAddress))
      return showError("Invalid Address", "Please enter a valid Arweave address")
    if (!selectedPool) return showError("No Pool Selected", "Please select a pool first")
    if (!connected || !window.arweaveWallet) {
      showError("Wallet Error", "Please connect your wallet first")
      return
    }

    setShowTerminal(true)
    setTerminalActionType('revoke')
    setTerminalStatus(`Revoking access for ${revokeAddress.slice(0, 10)}...`)
    setTerminalRawOutput([])

    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({
        signer,
        token: "arweave",
      })
      const response = await turbo.revokeCredits({ revokedAddress: revokeAddress })
      setTerminalRawOutput([{ address: revokeAddress, response }])

      const updatedPool: Pool = {
        ...selectedPool,
        addresses: selectedPool.addresses.filter((addr) => addr !== revokeAddress),
        sponsoredAddresses: selectedPool.sponsoredAddresses.filter((addr) => addr !== revokeAddress),
      }

      if (updatedPool.addresses.includes(revokeAddress)) {
        throw new Error(`Failed to remove ${revokeAddress} from whitelisted addresses`)
      }
      if (updatedPool.sponsoredAddresses.includes(revokeAddress)) {
        throw new Error(`Failed to remove ${revokeAddress} from sponsored addresses`)
      }

      const updatedPools = pools.map((pool) => (pool.id === selectedPool.id ? updatedPool : pool))
      savePools(updatedPools)
      setSelectedPool(updatedPool)
      await loadPools()
      setTerminalResult(revokeAddress)
      setTerminalError(null)
      showSuccess("Access Revoked", `Successfully revoked access for ${revokeAddress.slice(0, 10)}...`)
    } catch (error) {
      const errorMessage = `Error revoking access: ${error instanceof Error ? error.message : String(error)}`
      setTerminalError(errorMessage)
      setTerminalResult(null)
      setTerminalRawOutput([])
      showError("Revoke Failed", errorMessage)
    } finally {
      setTerminalStatus('')
      setShowTerminal(true)
    }
  }

  const sponsorAddresses = async (addresses: string[]) => {
    setShowTerminal(true)
    setTerminalActionType('sponsor')
    setTerminalStatus(`Sponsoring credits for ${addresses.length} addresses...`)
    setTerminalRawOutput([])

    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({
        signer,
        token: "arweave",
      })
      const creditsPerAddressWinston = BigInt(Math.floor(selectedPool!.usageCap * 1e12))
      const endTime = new Date(selectedPool!.endTime)
      const currentTime = new Date()
      const secondsUntilEnd = Math.floor((endTime.getTime() - currentTime.getTime()) / 1000)

      let successfulShares = 0
      const errors: string[] = []
      const rawOutputs: any[] = []

      for (const addr of addresses) {
        setTerminalStatus(`Sponsoring credits for ${addr.slice(0, 10)}...`)
        try {
          const response = await turbo.shareCredits({
            approvedAddress: addr,
            approvedWincAmount: creditsPerAddressWinston.toString(),
            expiresBySeconds: secondsUntilEnd,
          })
          rawOutputs.push({ address: addr, response })
          successfulShares++
        } catch (error) {
          const errorMsg = `Failed to sponsor credits for ${addr.slice(0, 10)}...: ${error instanceof Error ? error.message : String(error)}`
          console.error(errorMsg)
          errors.push(errorMsg)
        }
      }
      setTerminalRawOutput(rawOutputs)

      if (successfulShares > 0) {
        const message = `Successfully sponsored up to ${selectedPool!.usageCap.toFixed(4)} credits to ${successfulShares} of ${addresses.length} addresses`
        setTerminalResult(message)
        setTerminalError(null)
        if (errors.length > 0) {
          setTerminalError(errors.join("; "))
          showWarning("Partial Success", `${message}. Errors: ${errors.join("; ")}`)
        } else {
          showSuccess("Credits Sponsored", message)
        }

        const updatedPool = {
          ...selectedPool!,
          sponsoredAddresses: [...selectedPool!.sponsoredAddresses, ...addresses],
        }
        const updatedPools = pools.map((p) => (p.id === selectedPool!.id ? updatedPool : p))
        savePools(updatedPools)
        setSelectedPool(updatedPool)
        await loadPools()
      } else {
        setTerminalError(errors.length > 0 ? `Errors: ${errors.join("; ")}` : "No credits sponsored.")
        setTerminalResult(null)
        showError("Sponsor Failed", errors.length > 0 ? `Errors: ${errors.join("; ")}` : "No credits sponsored.")
      }
    } catch (error) {
      const errorMessage = `Error sponsoring credits: ${error instanceof Error ? error.message : String(error)}`
      setTerminalError(errorMessage)
      setTerminalResult(null)
      showError("Sponsor Failed", errorMessage)
    } finally {
      setTerminalStatus('')
      setShowTerminal(true)
    }
  }

  const handleSponsorCredits = async () => {
    if (!selectedPool) {
      showError("No Pool Selected", "Please select a pool first")
      return
    }
    if (!connected || !window.arweaveWallet) {
      showError("Wallet Error", "Please connect your wallet first")
      return
    }

    let unsponsoredAddresses = selectedPool.addresses.filter(
      (addr) => !selectedPool.sponsoredAddresses.includes(addr)
    )
    if (unsponsoredAddresses.length === 0) {
      showError("No Addresses", "All whitelisted addresses have already been sponsored")
      return
    }

    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({
        signer,
        token: "arweave",
      })
      const balanceResp = await turbo.getBalance()
      const availableCredits = Number(balanceResp.winc) / 1e12
      const totalRequiredCredits = unsponsoredAddresses.length * selectedPool.usageCap

      if (availableCredits < totalRequiredCredits) {
        const maxFundable = Math.floor(availableCredits / selectedPool.usageCap)
        setInsufficientCredits({
          show: true,
          maxFundable,
          addresses: unsponsoredAddresses,
          availableCredits,
          totalRequiredCredits,
        })
        return
      }

      await sponsorAddresses(unsponsoredAddresses)
    } catch (error) {
      showError("Sponsor Failed", `Error initiating sponsorship: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const proceedWithPartialSponsorship = async () => {
    if (insufficientCredits.show) {
      const addressesToSponsor = insufficientCredits.addresses.slice(0, insufficientCredits.maxFundable)
      await sponsorAddresses(addressesToSponsor)
      setInsufficientCredits({ show: false, maxFundable: 0, addresses: [], availableCredits: 0, totalRequiredCredits: 0 })
    }
  }

  const cancelSponsorship = () => {
    setInsufficientCredits({ show: false, maxFundable: 0, addresses: [], availableCredits: 0, totalRequiredCredits: 0 })
    showInfo("Operation Cancelled", "Sponsorship operation has been cancelled")
  }

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
    fetchBalance,
    loadPools,
    handleCreatePool,
    handleEditPool,
    handleDeletePool,
    handleRevokeAccess,
    handleSponsorCredits,
    handleRefreshBalance,
    showTerminal,
    terminalStatus,
    terminalActionType,
    terminalResult,
    terminalError,
    terminalRawOutput,
    handleTerminalClose,
    insufficientCredits,
    proceedWithPartialSponsorship,
    cancelSponsorship,
  }
}