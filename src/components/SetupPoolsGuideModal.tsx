"use client"

import { X } from "lucide-react"

interface SetupPoolsGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SetupPoolsGuideModal({ isOpen, onClose }: SetupPoolsGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 relative rounded-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 hover:bg-gray-100 transition-colors rounded-xs"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold mb-6">Bloom Faucet Manager: Simple Guide to Create and Use a Faucet</h1>
        <p className="mb-6 text-gray-600">
          This guide provides straightforward instructions for creating and using a sponsored credit Faucet in the
          Arweave ecosystem using the Bloom Faucet Manager.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Prerequisites</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>An Arweave-compatible wallet (Beacon or Wander) installed in your browser.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Access the Dashboard</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>Open the Bloom Faucet Manager in your browser.</li>
          <li>
            On the homepage, click <strong>Get Started</strong> to go to the <strong>Dashboard</strong>.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Connect Your Wallet</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>
            On the dashboard, click <strong>Connect Wallet</strong> if not already connected.
          </li>
          <li>
            Choose <strong>Wander Wallet</strong> or <strong>Beacon</strong>.
          </li>
          <li>Follow your wallet’s prompts to connect.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">3. Create a Faucet</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>
            On the dashboard, in the left sidebar, click <strong>+ New Faucet</strong>.
          </li>
          <li>
            Fill out the <strong>Create New Faucet</strong> form:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Faucet Name</strong>: Enter a name (e.g., "My Faucet").
              </li>
              <li>
                <strong>Start Time</strong>: Pick a start date and time (UTC).
              </li>
              <li>
                <strong>End Time</strong>: Pick an end date and time.
              </li>
              <li>
                <strong>Max Credits Per Wallet (Usage Cap)</strong>: Enter the maximum Turbo credits per wallet (e.g.,
                0.01).
              </li>
              <li>
                <strong>Whitelisted Addresses</strong>: Enter one Arweave address per line (43 characters each).
              </li>
            </ul>
          </li>
          <li>
            Click <strong>Create Faucet</strong> to save. A success message will appear.
          </li>
          <li>
            To cancel, click <strong>Cancel</strong> or the <strong>X</strong> button.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">4. Use a Faucet</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>
            <strong>View Faucet</strong>:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                In the sidebar, click your Faucet to see details (name, status, balance, usage cap, duration,
                addresses).
              </li>
              <li>
                <strong>Time Dial</strong> shows you the remaining time.
              </li>
            </ul>
          </li>
          <li>
            <strong>Manage Addresses</strong>:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Click <strong>View Addresses</strong> to see whitelisted addresses.
              </li>
              <li>
                Copy an address by clicking <strong>Copy</strong> next to it.
              </li>
              <li>
                Use <strong>Edit Faucet</strong> to add or remove addresses.
              </li>
            </ul>
          </li>
          <li>
            <strong>Sponsor Credits</strong>:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Select the Faucet, then click <strong>Sponsor Credits</strong>.
              </li>
              <li>Credits will be distributed to whitelisted addresses (up to the usage cap).</li>
              <li>A success or error message will show.</li>
            </ul>
          </li>
          <li>
            <strong>Revoke Access</strong>:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Select the Faucet, click <strong>Faucet Actions</strong>, then enter an address under{" "}
                <strong>Revoke Access</strong>.
              </li>
              <li>
                Click <strong>Revoke Access</strong> to remove it.
              </li>
            </ul>
          </li>
          <li>
            <strong>Edit Faucet</strong>:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Select the Faucet, click <strong>Edit Faucet</strong>.
              </li>
              <li>
                Update name, times, usage cap, or addresses, then click <strong>Save Changes</strong>.
              </li>
            </ul>
          </li>
          <li>
            <strong>Delete Faucet</strong>:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                In <strong>Faucet Actions</strong>, click <strong>Delete Faucet</strong>, confirm, and the Faucet will
                be removed.
              </li>
            </ul>
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-4">5. Need Help?</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>
            Email{" "}
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSqVsmVCqFrJFNLRZsrWQMfmVkQdrKWJfLwJkfkpmtcBzFMsBqGWGFRhXrDqLqXtsfBpTm"
              className="text-blue-600 underline hover:text-blue-800"
            >
              nityaprotocol@gmail.com
            </a>{" "}
            via <strong>Mail Us</strong> on the homepage.
          </li>
          <li>
            Join the{" "}
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Discord
            </a>{" "}
            for support.
          </li>
        </ul>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-8 rounded-xs">
          <p className="font-semibold text-red-800">Note: This is a beta application. Read the Disclaimer.</p>
        </div>
      </div>
    </div>
  )
}
