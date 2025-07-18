import { useCallback } from "react"
import { Pool } from "../types/types"
import { isValidArweaveAddress, localToZulu } from "../utils/utils"
import { savePools, fetchBalance, loadPools } from "./poolUtils"

export const usePoolOperations = (
  pools: Pool[],
  setPools: (pools: Pool[]) => void,
  selectedPool: Pool | null,
  setSelectedPool: (pool: Pool | null) => void,
  setTotalPools: (total: number) => void,
  setActivePools: (active: number) => void,
  connected: boolean,
  address: string | undefined,
  showError: (title: string, message: string) => void,
  showSuccess: (title: string, message: string) => void,
  setShowCreateModal: (value: boolean) => void,
  setShowEditModal: (value: boolean) => void,
  setShowPoolActions: (value: boolean) => void
) => {
  const handleCreatePool = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!connected || !address) return showError("Wallet Error", "Please connect your wallet first")
      const formData = new FormData(e.target as HTMLFormElement)
      const addressesInput = formData.get("addresses") as string
      const addresses = addressesInput.split("\n").map((a) => a.trim()).filter((a) => a)

      // Check for duplicate addresses
      const uniqueAddresses = new Set(addresses)
      if (uniqueAddresses.size !== addresses.length) {
        showError("Duplicate Addresses", "Please remove duplicate addresses from the list.")
        return
      }

      const newPool: Pool = {
        id: Date.now().toString(),
        name: formData.get("poolName") as string,
        startTime: localToZulu(formData.get("startTime") as string),
        endTime: localToZulu(formData.get("endTime") as string),
        usageCap: Number.parseFloat(formData.get("usageCap") as string),
        addresses: addresses,
        balance: await fetchBalance(connected, showError),
        status: new Date() < new Date(localToZulu(formData.get("endTime") as string)) ? "Active" : "Ended",
        sponsoredAddresses: [],
        expireBySeconds: Math.floor(
          (new Date(localToZulu(formData.get("endTime") as string)).getTime() - Date.now()) / 1000
        ),
        sponsorInfo: "",
        poolId: ""
      }

      if (!newPool.name.trim()) return showError("Invalid Pool Name", "Please enter a valid pool name")
      if (Number.isNaN(newPool.usageCap) || newPool.usageCap < 0)
        return showError("Invalid Usage Cap", "Please enter a valid usage cap")
      const invalidAddresses = newPool.addresses.filter((a) => !isValidArweaveAddress(a))
      if (invalidAddresses.length > 0)
        return showError("Invalid Addresses", `Please fix invalid addresses: ${invalidAddresses.join(", ")}`)
      if (new Date(newPool.startTime) >= new Date(newPool.endTime))
        return showError("Invalid Dates", "Start time must be before end time")

      const updatedPools = [...pools, newPool]
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

      // Check for duplicate addresses
      const uniqueAddresses = new Set(addresses)
      if (uniqueAddresses.size !== addresses.length) {
        showError("Duplicate Addresses", "Please remove duplicate addresses from the list.")
        return
      }

      const updatedPool: Pool = {
        ...selectedPool,
        name: formData.get("poolName") as string,
        startTime: new Date(formData.get("startTime") as string).toISOString(),
        endTime: new Date(formData.get("endTime") as string).toISOString(),
        usageCap: Number.parseFloat(formData.get("usageCap") as string),
        addresses: addresses,
        balance: await fetchBalance(connected, showError),
        status: new Date() < new Date(formData.get("endTime") as string) ? "Active" : "Ended",
        expireBySeconds: Math.floor((new Date(formData.get("endTime") as string).getTime() - Date.now()) / 1000),
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