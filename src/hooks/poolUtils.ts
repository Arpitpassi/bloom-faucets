import { TurboFactory, ArconnectSigner } from "@ardrive/turbo-sdk/web"
import { Pool } from "../types/types"

export const loadPools = async (
  connected: boolean,
  address: string | undefined,
  setPools: (pools: Pool[]) => void,
  setTotalPools: (total: number) => void,
  setActivePools: (active: number) => void,
  setSelectedPool: (pool: Pool | null) => void,
  selectedPool: Pool | null,
  showError: (title: string, message: string) => void
) => {
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
    history: pool.history || [], // Ensure history field exists
  }))

  if (connected && address && window.arweaveWallet) {
    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({ signer, token: "arweave" })
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
    if (updatedSelectedPool) setSelectedPool(updatedSelectedPool)
  }
}

export const savePools = (
  updatedPools: Pool[],
  setPools: (pools: Pool[]) => void,
  setTotalPools: (total: number) => void,
  setActivePools: (active: number) => void
) => {
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
      history: pool.history, // Include history field
    }
    return acc
  }, {} as { [key: string]: Omit<Pool, "id" | "status" | "poolId" | "balance"> })
  localStorage.setItem("pools", JSON.stringify(poolObject))
  setPools(updatedPools)
  setTotalPools(updatedPools.length)
  setActivePools(updatedPools.filter((pool) => pool.status === "Active").length)
}

export const fetchBalance = async (
  connected: boolean,
  showError: (title: string, message: string) => void
): Promise<number | null> => {
  if (!connected || !window.arweaveWallet) {
    showError("Wallet Error", "Please connect your wallet first")
    return null
  }
  try {
    const signer = new ArconnectSigner(window.arweaveWallet)
    const turbo = TurboFactory.authenticated({ signer, token: "arweave" })
    const balanceResult = await turbo.getBalance()
    return Number(balanceResult.winc) / 1e12
  } catch (error) {
    showError("Balance Check Failed", `Failed to fetch balance: ${error instanceof Error ? error.message : String(error)}`)
    return null
  }
}