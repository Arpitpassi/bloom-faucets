import { useCallback, useState } from "react"
import { TurboFactory, ArconnectSigner } from "@ardrive/turbo-sdk/web"
import { Pool } from "../types/types"
import { savePools, fetchBalance } from "./poolUtils"

export const useSponsorship = (
  pools: Pool[],
  setPools: (pools: Pool[]) => void,
  selectedPool: Pool | null,
  setSelectedPool: (pool: Pool | null) => void,
  setTotalPools: (total: number) => void,
  setActivePools: (active: number) => void,
  connected: boolean,
  setShowTerminal: (value: boolean) => void,
  setTerminalActionType: (type: 'sponsor' | 'revoke' | null) => void,
  setTerminalStatus: (status: string) => void,
  setTerminalResult: (result: string | null) => void,
  setTerminalError: (error: string | null) => void,
  setTerminalRawOutput: (output: any[]) => void,
  insufficientCredits: {
    show: boolean;
    maxFundable: number;
    addresses: string[];
    availableCredits: number;
    totalRequiredCredits: number;
  },
  setInsufficientCredits: (credits: {
    show: boolean;
    maxFundable: number;
    addresses: string[];
    availableCredits: number;
    totalRequiredCredits: number;
  }) => void,
  showError: (title: string, message: string) => void,
  showSuccess: (title: string, message: string) => void,
  showWarning: (title: string, message: string) => void,
  showInfo: (title: string, message: string) => void
) => {
  const [pendingAddresses, setPendingAddresses] = useState<string[]>([])

  const sponsorAddresses = useCallback(async (addresses: string[]) => {
    setShowTerminal(true)
    setTerminalActionType('sponsor')
    setTerminalStatus(`Sponsoring credits for ${addresses.length} addresses...`)
    setTerminalRawOutput([])

    try {
      const signer = new ArconnectSigner(window.arweaveWallet)
      const turbo = TurboFactory.authenticated({ signer, token: "arweave" })
      const creditsPerAddressWinston = BigInt(Math.floor(selectedPool!.usageCap * 1e12))
      const secondsUntilEnd = Math.floor((new Date(selectedPool!.endTime).getTime() - Date.now()) / 1000)

      let successfulShares = 0
      const errors: string[] = []
      const rawOutputs: any[] = []
      const successfullySponsored: string[] = []

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
          successfullySponsored.push(addr)
        } catch (error) {
          const errorMsg = `Failed to sponsor credits for ${addr.slice(0, 10)}...: ${error instanceof Error ? error.message : String(error)}`
          console.error(errorMsg)
          errors.push(errorMsg)
        }
      }
      setTerminalRawOutput(rawOutputs)

      setPendingAddresses(prev => prev.filter(addr => !successfullySponsored.includes(addr)))

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

        // Fetch the updated balance after sponsoring credits
        const updatedBalance = await fetchBalance(connected, showError)

        // Update the selected pool with new sponsored addresses and history
        const updatedPool = {
          ...selectedPool!,
          sponsoredAddresses: [...new Set([...selectedPool!.sponsoredAddresses, ...successfullySponsored])],
          balance: updatedBalance ?? selectedPool!.balance,
          history: [
            ...(selectedPool!.history || []),
            {
              timestamp: new Date().toISOString(),
              action: "Sponsored Credits",
              details: `Sponsored credits to ${successfulShares} addresses`,
              outputs: rawOutputs,
            },
          ],
        }

        // Update all pools with the new balance, applying selectedPool updates only to the matching pool
        const updatedPools = pools.map(p => ({
          ...p,
          balance: updatedBalance ?? p.balance,
          ...(p.id === selectedPool!.id ? updatedPool : {})
        }))

        savePools(updatedPools, setPools, setTotalPools, setActivePools)
        setSelectedPool(updatedPool)
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
  }, [pools, selectedPool, connected, showError, showSuccess, showWarning])

  const handleSponsorCredits = useCallback(async () => {
    if (!selectedPool) return showError("No Pool Selected", "Please select a pool first")
    if (!connected || !window.arweaveWallet) return showError("Wallet Error", "Please connect your wallet first")

    const unsponsoredAddresses = selectedPool.addresses.filter(addr => !selectedPool.sponsoredAddresses.includes(addr))
    const alreadySponsoredAddresses = selectedPool.addresses.filter(addr => selectedPool.sponsoredAddresses.includes(addr))

    if (alreadySponsoredAddresses.length > 0) {
      showInfo(
        "Already Sponsored",
        `${alreadySponsoredAddresses.length} address${alreadySponsoredAddresses.length > 1 ? 'es' : ''} already sponsored, skipping credit sharing: ${alreadySponsoredAddresses.map(addr => addr.slice(0, 10) + '...').join(", ")}`
      )
    }

    if (unsponsoredAddresses.length === 0) {
      return showError("No Addresses", "All whitelisted addresses have already been sponsored")
    }

    setPendingAddresses(unsponsoredAddresses)

    const signer = new ArconnectSigner(window.arweaveWallet)
    const turbo = TurboFactory.authenticated({ signer, token: "arweave" })
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
  }, [pools, selectedPool, connected, sponsorAddresses, showError, showInfo])

  const proceedWithPartialSponsorship = useCallback(async () => {
    const { show, maxFundable, addresses } = insufficientCredits
    if (show) {
      const addressesToSponsor = addresses.slice(0, maxFundable)
      setPendingAddresses(addresses.slice(maxFundable))
      await sponsorAddresses(addressesToSponsor)
      setInsufficientCredits({ show: false, maxFundable: 0, addresses: [], availableCredits: 0, totalRequiredCredits: 0 })
      if (addresses.slice(maxFundable).length > 0) {
        showInfo("Pending Addresses", `There are ${addresses.slice(maxFundable).length} addresses still pending sponsorship. Please add more credits to continue.`)
      }
    }
  }, [insufficientCredits, sponsorAddresses, showInfo])

  const cancelSponsorship = useCallback(() => {
    setPendingAddresses([])
    setInsufficientCredits({ show: false, maxFundable: 0, addresses: [], availableCredits: 0, totalRequiredCredits: 0 })
    showInfo("Operation Cancelled", "Sponsorship operation has been cancelled")
  }, [showInfo])

  const retryPendingSponsorship = useCallback(async () => {
    if (pendingAddresses.length === 0) {
      showInfo("No Pending Addresses", "There are no addresses pending sponsorship")
      return
    }

    const alreadySponsoredAddresses = pendingAddresses.filter(addr => selectedPool!.sponsoredAddresses.includes(addr))
    const unsponsoredPendingAddresses = pendingAddresses.filter(addr => !selectedPool!.sponsoredAddresses.includes(addr))

    if (alreadySponsoredAddresses.length > 0) {
      showInfo(
        "Already Sponsored",
        `${alreadySponsoredAddresses.length} address${alreadySponsoredAddresses.length > 1 ? 'es' : ''} already sponsored, skipping credit sharing: ${alreadySponsoredAddresses.map(addr => addr.slice(0, 10) + '...').join(", ")}`
      )
    }

    if (unsponsoredPendingAddresses.length === 0) {
      showInfo("No Addresses to Sponsor", "All pending addresses have already been sponsored")
      return
    }

    const signer = new ArconnectSigner(window.arweaveWallet)
    const turbo = TurboFactory.authenticated({ signer, token: "arweave" })
    const balanceResp = await turbo.getBalance()
    const availableCredits = Number(balanceResp.winc) / 1e12
    const totalRequiredCredits = unsponsoredPendingAddresses.length * selectedPool!.usageCap

    if (availableCredits < totalRequiredCredits) {
      const maxFundable = Math.floor(availableCredits / selectedPool!.usageCap)
      setInsufficientCredits({
        show: true,
        maxFundable,
        addresses: unsponsoredPendingAddresses,
        availableCredits,
        totalRequiredCredits,
      })
      showWarning("Insufficient Credits", `You have ${availableCredits.toFixed(4)} credits, but ${totalRequiredCredits.toFixed(4)} credits are needed for ${unsponsoredPendingAddresses.length} addresses.`)
      return
    }

    await sponsorAddresses(unsponsoredPendingAddresses)
  }, [pendingAddresses, selectedPool, sponsorAddresses, showInfo, showWarning])

  return {
    handleSponsorCredits,
    proceedWithPartialSponsorship,
    cancelSponsorship,
    retryPendingSponsorship,
    pendingAddresses,
  }
}