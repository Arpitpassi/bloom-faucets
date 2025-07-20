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
  expireBySeconds: number | null
  history: { timestamp: string; action: string; details: string; outputs?: any[] }[]
}

export interface Strategy {
  connect: (permissions: string[]) => Promise<void>
  disconnect: () => Promise<void>
  getActiveAddress: () => Promise<string>
}