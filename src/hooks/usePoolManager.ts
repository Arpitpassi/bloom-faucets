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
  const { connected, address } = useUser()
  const { showSuccess, showError, showWarning } = toastFunctions

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

  const loadPools = () => {
    const storedPools = localStorage.getItem("pools")
    const poolData: { [key: string]: Pool } = storedPools ? JSON.parse(storedPools) : {}
    const poolArray: Pool[] = Object.entries(poolData).map(([id, pool]) => ({
      ...pool,
      id,
      status: new Date() < new Date(pool.endTime) ? "Active" : "Ended",
      balance: pool.balance ?? null,
      poolId: id,
    }))
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
    const poolObject = updatedPools.reduce((acc, pool) => {
      acc[pool.id] = {
        name: pool.name,
        startTime: pool.startTime,
        endTime: pool.endTime,
        usageCap: pool.usageCap,
        addresses: pool.addresses,
        balance: pool.balance,
        sponsorInfo: pool.sponsorInfo,
      }
      return acc
    }, {} as { [key: string]: Omit<Pool, "id" | "status" | "poolId"> })
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
       const signer = new ArconnectSigner(window.arweaveWallet);
            const turbo = TurboFactory.authenticated({
              signer,
              token: "arweave",
            });
      const balanceResult = await turbo.getBalance()
      return Number(balanceResult.winc) / 1e12 // Convert winston to Turbo Credits
    } catch (error) {
      showError("Balance Check Failed", `Failed to fetch balance: ${error instanceof Error ? error.message : String(error)}`)
      return null
    }
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
      balance: await fetchBalance(),
      status: "Active",
      poolId: poolId,
      sponsorInfo: "",
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
    const invalidAddresses = addresses.filter((a) => !isValidArweaveAddress(a))
    if (invalidAddresses.length > 0)
      return showError("Invalid Addresses", `Please fix invalid addresses: ${invalidAddresses.join(", ")}`)
    const startDateTime = new Date(startTime)
    const endDateTime = new Date(endTime)
    if (startDateTime >= endDateTime) return showError("Invalid Dates", "Start time must be before end time")

    const updatedPool: Pool = {
      ...selectedPool,
      name: poolName,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      usageCap,
      addresses,
    }

    const updatedPools = pools.map((pool) => (pool.id === selectedPool.id ? updatedPool : pool))
    savePools(updatedPools)
    setSelectedPool(updatedPool)
    setShowEditModal(false)
    showSuccess("Pool Updated", `Pool "${poolName}" has been updated successfully`)
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

    try {
       const signer = new ArconnectSigner(window.arweaveWallet);
            const turbo = TurboFactory.authenticated({
              signer,
              token: "arweave",
            });
      await turbo.revokeCredits({ revokedAddress: revokeAddress })

      const updatedPool = {
        ...selectedPool,
        addresses: selectedPool.addresses.filter((addr) => addr !== revokeAddress),
      }
      const updatedPools = pools.map((pool) => (pool.id === selectedPool.id ? updatedPool : pool))
      savePools(updatedPools)
      setSelectedPool(updatedPool)
      showSuccess("Access Revoked", `Successfully revoked access for ${revokeAddress.slice(0, 10)}...`)
    } catch (error) {
      showError("Revoke Failed", `Error revoking access: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleSponsorCredits = async () => {
    if (!selectedPool) return showError("No Pool Selected", "Please select a pool first")
    if (!connected || !window.arweaveWallet) {
      showError("Wallet Error", "Please connect your wallet first")
      return
    }
    if (selectedPool.addresses.length === 0)
      return showError("No Addresses", "No whitelisted addresses to sponsor credits for")

    try {
       const signer = new ArconnectSigner(window.arweaveWallet);
            const turbo = TurboFactory.authenticated({
              signer,
              token: "arweave",
            });
      const balanceResp = await turbo.getBalance()
      const availableCredits = BigInt(balanceResp.winc)
      const creditsPerAddress = BigInt(Math.floor(Number(availableCredits) / selectedPool.addresses.length))

      if (creditsPerAddress <= 0n) {
        showError("Insufficient Credits", "Not enough credits available to sponsor")
        return
      }

      let successfulShares = 0
      const errors: string[] = []
      for (const addr of selectedPool.addresses) {
        try {
          await turbo.shareCredits({
            approvedAddress: addr,
            approvedWincAmount: creditsPerAddress.toString(),
          })
          successfulShares++
        } catch (error) {
          const errorMsg = `Failed to sponsor credits for ${addr.slice(0, 10)}...: ${error instanceof Error ? error.message : String(error)}`
          console.error(errorMsg)
          errors.push(errorMsg)
        }
      }

      const newBalance = await fetchBalance()
      const updatedPool = { ...selectedPool, balance: newBalance }
      const updatedPools = pools.map((p) => (p.id === selectedPool.id ? updatedPool : p))
      savePools(updatedPools)
      setSelectedPool(updatedPool)

      if (successfulShares > 0) {
        const message = `Successfully sponsored credits to ${successfulShares} of ${selectedPool.addresses.length} addresses`
        if (errors.length > 0) {
          showWarning("Partial Success", `${message}. Errors: ${errors.join("; ")}`)
        } else {
          showSuccess("Credits Sponsored", message)
        }
      } else {
        showError("Sponsor Failed", errors.length > 0 ? `Errors: ${errors.join("; ")}` : "No credits sponsored.")
      }
    } catch (error) {
      showError("Sponsor Failed", `Error sponsoring créditos: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const handleRefreshBalance = async () => {
    if (!selectedPool) return showError("No Pool Selected", "Please select a pool first")
    const balance = await fetchBalance()
    if (balance !== null) {
      const updatedPool = { ...selectedPool, balance }
      const updatedPools = pools.map((p) => (p.id === selectedPool.id ? updatedPool : p))
      savePools(updatedPools)
      setSelectedPool(updatedPool)
      showSuccess("Balance Refreshed", `Balance for pool "${selectedPool.name}" has been updated`)
    }
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
  }
}