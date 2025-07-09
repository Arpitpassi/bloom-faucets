export interface Pool {
  sponsorInfo: string
  id: string
  name: string
  status: "Active" | "Ended"
  balance: number | null
  usageCap: number
  startTime: string
  endTime: string
  addresses: string[]
  poolId: string
  sponsoredAddresses: string[]
  expireBySeconds: number | null // New field for expiration in seconds
}

export interface Strategy {
  connect: (permissions: string[]) => Promise<void>
  disconnect: () => Promise<void>
  getActiveAddress: () => Promise<string>
}