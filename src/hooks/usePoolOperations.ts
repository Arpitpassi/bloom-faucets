import { useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { Pool } from "../types/types"
import { formatDateTime, isValidArweaveAddress } from "../utils/utils"
import { savePools, loadPools, fetchBalance } from "./poolUtils"

export const usePoolOperations = (
  pools: Pool[],
  setPools: (pools: Pool[]) => void,
  selectedPool: Pool | null,
  setSelectedPool: (pool: Pool | null) => void,
  setTotalPools: (total: number) => void,
  setActivePools: (active: number) => void,
  connected: boolean,
  address: string | undefined,
  setShowCreateModal: (value: boolean) => void,
  setShowEditModal: (value: boolean) => void,
  setShowPoolActions: (value: boolean) => void,
  showError: (title: string, message: string) => void,
  showSuccess: (title: string, message: string) => void
) => {
  const generateEditDetails = (oldPool: Pool, newPool: Pool) => {
    const changes: string[] = []
    if (oldPool.name !== newPool.name) {
      changes.push(`Name changed from '${oldPool.name}' to '${newPool.name}'`)
    }
    if (oldPool.startTime !== newPool.startTime) {
      changes.push(`Start time changed from '${formatDateTime(oldPool.startTime)}' to '${formatDateTime(newPool.startTime)}'`)
    }
    if (oldPool.endTime !== newPool.endTime) {
      changes.push(`End time changed from '${formatDateTime(oldPool.endTime)}' to '${formatDateTime(newPool.endTime)}'`)
    }
    if (oldPool.usageCap !== newPool.usageCap) {
      changes.push(`Usage cap changed from ${oldPool.usageCap} to ${newPool.usageCap}`)
    }
    const oldAddresses = new Set(oldPool.addresses)
    const newAddresses = new Set(newPool.addresses)
    const added = [...newAddresses].filter(addr => !oldAddresses.has(addr))
    const removed = [...oldAddresses].filter(addr => !newAddresses.has(addr))
    if (added.length > 0) {
      changes.push(`Added addresses: ${added.join(", ")}`)
    }
    if (removed.length > 0) {
      changes.push(`Removed addresses: ${removed.join(", ")}`)
    }
    return changes.length > 0 ? changes.join("; ") : "No changes made"
  }

  const handleCreatePool = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!connected || !address) return showError("Wallet Error", "Please connect your wallet first")
      const formData = new FormData(e.target as HTMLFormElement)
      const addressesInput = formData.get("addresses") as string
      const addresses = addressesInput.split("\n").map((a) => a.trim()).filter((a) => a)
      const uniqueAddresses = new Set(addresses)
      if (uniqueAddresses.size !== addresses.length) {
        showError("Duplicate Addresses", "Please remove duplicate addresses from the list.")
        return
      }

      const newPool: Pool = {
        sponsorInfo: address,
        id: uuidv4(),
        name: formData.get("poolName") as string,
        status: "Active",
        balance: null,
        usageCap: Number.parseFloat(formData.get("usageCap") as string),
        startTime: new Date(formData.get("startTime") as string).toISOString(),
        endTime: new Date(formData.get("endTime") as string).toISOString(),
        addresses: addresses,
        poolId: `${address}-${uuidv4()}`,
        sponsoredAddresses: [],
        expireBySeconds: Math.floor((new Date(formData.get("endTime") as string).getTime() - Date.now()) / 1000),
        history: [],
      }

      if (!newPool.name.trim()) return showError("Invalid Pool Name", "Please enter a valid pool name")
      if (Number.isNaN(newPool.usageCap) || newPool.usageCap < 0)
        return showError("Invalid Usage Cap", "Please enter a valid usage cap")
      const invalidAddresses = newPool.addresses.filter((a) => !isValidArweaveAddress(a))
      if (invalidAddresses.length > 0)
        return showError("Invalid Addresses", `Please fix invalid addresses: ${invalidAddresses.join(", ")}`)
      if (new Date(newPool.startTime) >= new Date(newPool.endTime))
        return showError("Invalid Dates", "Start time must be before end time")

      const updatedPools = [...pools, {
        ...newPool,
        history: [{
          timestamp: new Date().toISOString(),
          action: "Created",
          details: `Pool "${newPool.name}" was created`,
        }],
      }]
      savePools(updatedPools, setPools, setTotalPools, setActivePools)
      await loadPools(connected, address, setPools, setTotalPools, setActivePools, setSelectedPool, null, showError)
      setShowCreateModal(false)
      showSuccess("Pool Created", `Pool "${newPool.name}" has been created successfully`)
    },
    [pools, connected, address, showError, showSuccess, setShowCreateModal]
  )

  const handleEditPool = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!selectedPool) return showError("No Pool Selected", "Please select a pool to edit")
      const formData = new FormData(e.target as HTMLFormElement)
      const addressesInput = formData.get("addresses") as string
      const addresses = addressesInput.split("\n").map((a) => a.trim()).filter((a) => a)

      const uniqueAddresses = new Set(addresses)
      if (uniqueAddresses.size !== addresses.length) {
        showError("Duplicate Addresses", "Please remove duplicate addresses from the list.")
        return
      }

      const newPoolData = {
        name: formData.get("poolName") as string,
        startTime: new Date(formData.get("startTime") as string).toISOString(),
        endTime: new Date(formData.get("endTime") as string).toISOString(),
        usageCap: Number.parseFloat(formData.get("usageCap") as string),
        addresses: addresses,
      }

      const editDetails = generateEditDetails(selectedPool, { ...selectedPool, ...newPoolData })

      const updatedPool: Pool = {
        ...selectedPool,
        ...newPoolData,
        balance: await fetchBalance(connected, showError),
        status: new Date() < new Date(newPoolData.endTime) ? "Active" : "Ended",
        expireBySeconds: Math.floor((new Date(newPoolData.endTime).getTime() - Date.now()) / 1000),
        history: [
          ...(selectedPool.history || []),
          {
            timestamp: new Date().toISOString(),
            action: "Edited",
            details: editDetails,
          },
        ],
      }

      if (!updatedPool.name.trim()) return showError("Invalid Pool Name", "Please enter a valid pool name")
      if (Number.isNaN(updatedPool.usageCap) || updatedPool.usageCap < 0)
        return showError("Invalid Usage Cap", "Please enter a valid usage cap")
      const invalidAddresses = updatedPool.addresses.filter((a) => !isValidArweaveAddress(a))
      if (invalidAddresses.length > 0)
        return showError("Invalid Addresses", `Please fix invalid addresses: ${invalidAddresses.join(", ")}`)
      if (new Date(updatedPool.startTime) >= new Date(updatedPool.endTime))
        return showError("Invalid Dates", "Start time must be before end time")

      const updatedPools = pools.map((pool) => (pool.id === selectedPool.id ? updatedPool : pool))
      savePools(updatedPools, setPools, setTotalPools, setActivePools)
      setSelectedPool(updatedPool)
      showSuccess("Pool Updated", `Pool "${updatedPool.name}" has been updated successfully`)
      setShowEditModal(false)
    },
    [pools, selectedPool, connected, showError, showSuccess, setShowEditModal]
  )

  const handleDeletePool = useCallback(async () => {
    if (!selectedPool) return showError("No Pool", "Please select a pool to delete")
    const confirmDelete = window.confirm("Are you sure you want to delete this pool? This action cannot be undone.")
    if (!confirmDelete) return

    const updatedPools = pools.filter((pool) => pool.id !== selectedPool.id)
    savePools(updatedPools, setPools, setTotalPools, setActivePools)
    setSelectedPool(null)
    setShowPoolActions(false)
    showSuccess("Pool Deleted", `Pool "${selectedPool.name}" has been deleted successfully`)
  }, [pools, selectedPool, showError, showSuccess, setShowPoolActions])

  return { handleCreatePool, handleEditPool, handleDeletePool }
}