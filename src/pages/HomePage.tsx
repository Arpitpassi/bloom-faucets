"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, ExternalLink, Calculator, FileText, Database, Shield, BarChart3, ClipboardPen } from "lucide-react"
import SplitText from "../components/SplitText"
import Logo from "../assets/logo.svg"

export default function HomePage() {
  const [showHowToModal, setShowHowToModal] = useState(false)
  const [showPoolsGuide, setShowPoolsGuide] = useState(false)
  const [showCreditsGuide, setShowCreditsGuide] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/dashboard")
  }

  const handleAnimationComplete = () => {
    console.log("Bloomfaucets.beta animation completed!")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Code copied to clipboard!")
    }).catch((err) => {
      console.error("Failed to copy: ", err)
    })
  }

  return (
    <div className="min-h-screen bg-brand-snow-drift text-brand-night font-mono relative overflow-hidden">
      {/* Geometric Decorations */}
      <div className="fixed top-0 right-0 w-48 h-48 border-2 border-gray-300 bg-black/5 rounded-bl-full -z-10" />
      <div className="fixed bottom-0 left-0 w-48 h-48 border-2 border-gray-300 bg-black/5 rounded-tr-full -z-10" />

      {/* Header */}
      <header className="bg spring-wood shadow-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Bloom Faucets Logo"
                className="h-5 w-auto"
              />
            </div>
            <button
              onClick={() => setShowContactModal(true)}
              className="text-brand-night hover:underline font-semibold transition-all duration-200 cursor-pointer"
            >
              Mail Us
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <SplitText
            text="faucets.beta"
            className="text-3xl md:text-6xl font-inter-tight-bold mb-6 inline-block text-faucets-beta"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, transform: "translateY(40px)" }}
            to={{ opacity: 1, transform: "translateY(0)" }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Creating and managing sponsored credit faucets for the Arweave ecosystem made easy.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={handleGetStarted}
              className="bg-white text-brand-night border-2 border-brand-night px-8 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xl"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowHowToModal(true)}
              className="bg-white text-brand-night border-2 border-brand-night px-8 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xl"
            >
              Guides
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-brand spring-wood">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pool Management */}
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Faucet Management</h3>
              <p className="text-gray-600">
                Create multiple sponsor faucets to fund them with turbo credits.
              </p>
            </div>

            {/* Access Control */}
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Control</h3>
              <p className="text-gray-600">
                Whitelist specific addresses and manage user access.
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">
                Monitor faucet usage and complete control over faucet activites
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Support Section */}
      <section className="py-16 bg-brand-spring-wood">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Resources & Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-snow-drift border-2 border-gray-300 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 border-2 border-indigo-300 flex items-center justify-center mx-auto mb-4 rounded-2xl">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                Join Discord
                <ExternalLink className="w-4 h-4 ml-1" />
              </h3>
              <p className="text-gray-600 text-sm">Get community support and stay updated</p>
            </a>

            <a
              href="https://prices.ardrive.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-snow-drift border-2 border-gray-300 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300 flex items-center justify-center mx-auto mb-4 rounded-2xl">
                <Calculator className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                Price Calculator
                <ExternalLink className="w-4 h-4 ml-1" />
              </h3>
              <p className="text-gray-600 text-sm">Calculate Turbo credit costs</p>
            </a>

            <a
              href="https://github.com/Arpitpassi/bloom-frontendv4"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-snow-drift border-2 border-gray-300 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 border-2 border-teal-300 flex items-center justify-center mx-auto mb-4 rounded-2xl">
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                Documentation
                <ExternalLink className="w-4 h-4 ml-1" />
              </h3>
              <p className="text-gray-600 text-sm">Look at the code behind Bloom faucets</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">© 2025 Bloom. All rights reserved. Version 0.0.25</p>
        </div>
      </footer>

      {/* How To Modal */}
      {showHowToModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-300 max-w-lg w-full p-8 relative rounded-2xl">
            <button
              onClick={() => setShowHowToModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold mb-6 text-center">How To</h1>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowPoolsGuide(true)
                }}
                className="bg-white text-brand-night border-2 border-brand-night px-10 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xl flex-1"
              >
                Setup Faucets
              </button>
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowCreditsGuide(true)
                }}
                className="bg-white text-brand-night border-2 border-brand-night px-10 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xl flex-1"
              >
                Use Shared Credits
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Setup Pools Guide Modal */}
      {showPoolsGuide && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-300 max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 relative rounded-2xl">
            <button
              onClick={() => setShowPoolsGuide(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 hover:bg-gray-100 transition-colors rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>

            <h1 className="text-3xl font-bold mb-6">Bloom Faucet Manager: Simple Guide to Create and Use a Faucet</h1>
            <p className="mb-6 text-gray-600">This guide provides straightforward instructions for creating and using a sponsored credit Faucet in the Arweave ecosystem using the Bloom Faucet Manager.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Prerequisites</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>An Arweave-compatible wallet (Beacon or Wander) installed in your browser.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Access the Dashboard</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Open the Bloom Faucet Manager in your browser.</li>
              <li>On the homepage, click <strong>Get Started</strong> to go to the <strong>Dashboard</strong>.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Connect Your Wallet</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>On the dashboard, click <strong>Connect Wallet</strong> if not already connected.</li>
              <li>Choose <strong>Wander Wallet</strong> or <strong>Beacon</strong>.</li>
              <li>Follow your wallet’s prompts to connect.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Create a Faucet</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>On the dashboard, in the left sidebar, click <strong>+ New Faucet</strong>.</li>
              <li>Fill out the <strong>Create New Faucet</strong> form:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Faucet Name</strong>: Enter a name (e.g., "My Faucet").</li>
                  <li><strong>Start Time</strong>: Pick a start date and time (UTC).</li>
                  <li><strong>End Time</strong>: Pick an end date and time.</li>
                  <li><strong>Max Credits Per Wallet (Usage Cap)</strong>: Enter the maximum Turbo credits per wallet (e.g., 0.01).</li>
                  <li><strong>Whitelisted Addresses</strong>: Enter one Arweave address per line (43 characters each).</li>
                </ul>
              </li>
              <li>Click <strong>Create Faucet</strong> to save. A success message will appear.</li>
              <li>To cancel, click <strong>Cancel</strong> or the <strong>X</strong> button.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Use a Faucet</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong>View Faucet</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>In the sidebar, click your Faucet to see details (name, status, balance, usage cap, duration, addresses).</li>
                  <li><strong>Time Dial</strong> shows you the remaining time.</li>
                </ul>
              </li>
              <li><strong>Manage Addresses</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Click <strong>View Addresses</strong> to see whitelisted addresses.</li>
                  <li>Copy an address by clicking <strong>Copy</strong> next to it.</li>
                  <li>Use <strong>Edit Faucet</strong> to add or remove addresses.</li>
                </ul>
              </li>
              <li><strong>Sponsor Credits</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Select the Faucet, then click <strong>Sponsor Credits</strong>.</li>
                  <li>Credits will be distributed to whitelisted addresses (up to the usage cap).</li>
                  <li>A success or error message will show.</li>
                </ul>
              </li>
              <li><strong>Revoke Access</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Select the Faucet, click <strong>Faucet Actions</strong>, then enter an address under <strong>Revoke Access</strong>.</li>
                  <li>Click <strong>Revoke Access</strong> to remove it.</li>
                </ul>
              </li>
              <li><strong>Edit Faucet</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Select the Faucet, click <strong>Edit Faucet</strong>.</li>
                  <li>Update name, times, usage cap, or addresses, then click <strong>Save Changes</strong>.</li>
                </ul>
              </li>
              <li><strong>Delete Faucet</strong>:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>In <strong>Faucet Actions</strong>, click <strong>Delete Faucet</strong>, confirm, and the Faucet will be removed.</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Need Help?</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Email <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSqVsmVCqFrJFNLRZsrWQMfmVkQdrKWJfLwJkfkpmtcBzFMsBqGWGFRhXrDqLqXtsfBpTm" className="text-blue-600 underline hover:text-blue-800">nityaprotocol@gmail.com</a> via <strong>Mail Us</strong> on the homepage.</li>
              <li>Join the <a href="https://discord.gg/9cJyqrJUHh" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Discord</a> for support.</li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-8 rounded-xl">
              <p className="font-semibold text-red-800">
                Note: This is a beta application. Read the Disclaimer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Use Shared Credits Guide Modal */}
      {showCreditsGuide && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-300 max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 relative rounded-2xl">
            <button
              onClick={() => setShowCreditsGuide(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 hover:bg-gray-100 transition-colors rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>

            <h1 className="text-3xl font-bold mb-6">Bloom Faucets: Upload to Arweave Using Sponsored Credits</h1>
            <p className="mb-6 text-gray-600">Easily upload your data to Arweave without paying from your own wallet, using shared credits from a Bloom Faucet.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-xl">
              <p className="font-semibold text-red-800">
                Note: To use sponsored credits, your wallet address must be whitelisted by the sponsor.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Quick Start</h2>
            <p className="mb-4 text-gray-600">Here’s how to upload with Bloom Faucet credits based on how you're uploading:</p>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left text-sm font-semibold">Method</th>
                  <th className="border border-gray-300 p-3 text-left text-sm font-semibold">How to use Faucet credits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 text-gray-600">Turbo CLI</td>
                  <td className="border border-gray-300 p-3 text-gray-600">No extra steps. CLI will auto-use any Faucet credits.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-gray-600">Bloom Uploads</td>
                  <td className="border border-gray-300 p-3 text-gray-600">Create profile to generate a new wallet, or connect a wallet with sponsored credits then simply add the sponsors wallet address and upload easily after the quick setup</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-gray-600">Turbo SDK</td>
                  <td className="border border-gray-300 p-3 text-gray-600">Use the <code className="bg-gray-200 px-1 rounded">paidBy</code> option with the sponsor’s wallet address. See info below</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 text-gray-600">HTTP API</td>
                  <td className="border border-gray-300 p-3 text-gray-600">Set <code className="bg-gray-200 px-1 rounded">x-paid-by</code> header to the sponsor’s wallet address. See info below</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mt-8 mb-4">Step-by-Step Guide</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3">Option 1: Using Turbo CLI</h3>
            <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-600">
              <li>
                <strong>Install Turbo CLI</strong>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto">
                    <code>npm install -g @ardrive/turbo-sdk</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard("npm install -g @ardrive/turbo-sdk")}
                    className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                    title="Copy to clipboard"
                  >
                    <ClipboardPen className="w-5 h-5" />
                  </button>
                </div>
              </li>
              <li>
                <strong>Get Your Arweave Wallet</strong>
                <p className="my-2">Download and save your wallet key file (e.g., <code className="bg-gray-200 px-1 rounded">wallet.json</code>) securely.</p>
              </li>
              <li>
                <strong>Upload a File</strong>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto">
                    <code>turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard("turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json")}
                    className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                    title="Copy to clipboard"
                  >
                    <ClipboardPen className="w-5 h-5" />
                  </button>
                </div>
                <p className="my-2">This will automatically use any available sponsored credits without needing extra setup.</p>
              </li>
            </ol>

            <h3 className="text-lg font-semibold mt-6 mb-3">Option 2: Using Turbo SDK (Node.js)</h3>
            <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-600">
              <li>
                <strong>Install SDK</strong>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto">
                    <code>npm install @ardrive/turbo-sdk</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard("npm install @ardrive/turbo-sdk")}
                    className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                    title="Copy to clipboard"
                  >
                    <ClipboardPen className="w-5 h-5" />
                  </button>
                </div>
              </li>
              <li>
                <strong>Example Upload Script</strong>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto">
                    <code>{`import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
  const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
  const signer = new ArweaveSigner(jwk);
  const turbo = TurboFactory.authenticated({ signer });
  const filePath = path.join(process.cwd(), "./public/stock.jpeg");
  const fileSize = fs.statSync(filePath).size;
  const { id } = await turbo.uploadFile({
    fileStreamFactory: () => fs.createReadStream(filePath),
    fileSizeFactory: () => fileSize,
    dataItemOpts: {
      tags: [{ name: "Content-Type", value: "image/jpeg" }],
      paidBy: "SPONSOR_WALLET_ADDRESS",
    },
  });
  console.log("Upload successful! ID:", id);
})();
`}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
  const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
  const signer = new ArweaveSigner(jwk);
  const turbo = TurboFactory.authenticated({ signer });
  const filePath = path.join(process.cwd(), "./public/stock.jpeg");
  const fileSize = fs.statSync(filePath).size;
  const { id } = await turbo.uploadFile({
    fileStreamFactory: () => fs.createReadStream(filePath),
    fileSizeFactory: () => fileSize,
    dataItemOpts: {
      tags: [{ name: "Content-Type", value: "image/jpeg" }],
      paidBy: "SPONSOR_WALLET_ADDRESS",
    },
  });
  console.log("Upload successful! ID:", id);
})();
`)}
                    className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                    title="Copy to clipboard"
                  >
                    <ClipboardPen className="w-5 h-5" />
                  </button>
                </div>
                <p className="my-2">Replace <code className="bg-gray-200 px-1 rounded">"SPONSOR_WALLET_ADDRESS"</code> with your sponsor’s actual wallet address.</p>
              </li>
            </ol>

            <h3 className="text-lg font-semibold mt-6 mb-3">Option 3: Using HTTP API</h3>
            <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-600">
              <li>
                <strong>Prepare Your Data Item</strong>
                <p className="my-2">Use <code className="bg-gray-200 px-1 rounded">@dha-team/arbundles</code> and Turbo’s signer to create and sign your data.</p>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto">
                    <code>{`import { ArweaveSigner } from "@ardrive/turbo-sdk/node";
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const data = createData(new Uint8Array(fs.readFileSync(filePath)), signer, {
  tags: [{ name: "Content-Type", value: "image/jpeg" }],
});
await sign(data, signer);
`}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`import { ArweaveSigner } from "@ardrive/turbo-sdk/node";
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const data = createData(new Uint8Array(fs.readFileSync(filePath)), signer, {
  tags: [{ name: "Content-Type", value: "image/jpeg" }],
});
await sign(data, signer);
`)}
                    className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                    title="Copy to clipboard"
                  >
                    <ClipboardPen className="w-5 h-5" />
                  </button>
                </div>
              </li>
              <li>
                <strong>Make the Upload Request</strong>
                <div className="relative">
                  <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto">
                    <code>{`const response = await fetch("https://upload.ardrive.io/v1/tx", {
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    Accept: "application/json",
    "x-paid-by": "SPONSOR_WALLET_ADDRESS",
  },
  body: data.getRaw(),
});
const result = await response.json();
console.log("Upload result:", result);
`}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`const response = await fetch("https://upload.ardrive.io/v1/tx", {
  method: "POST",
  headers: {
    "Content-Type": "application/octet-stream",
    Accept: "application/json",
    "x-paid-by": "SPONSOR_WALLET_ADDRESS",
  },
  body: data.getRaw(),
});
const result = await response.json();
console.log("Upload result:", result);
`)}
                    className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                    title="Copy to clipboard"
                  >
                    <ClipboardPen className="w-5 h-5" />
                  </button>
                </div>
                <p className="my-2">Adding the <code className="bg-gray-200 px-1 rounded">x-paid-by</code> header tells ArDrive to use sponsored credits.</p>
              </li>
            </ol>

            <h2 className="text-xl font-semibold mt-8 mb-4">Resources</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong>Full Turbo CLI / SDK / API Docs</strong>: Check <a href="https://docs.ardrive.io/docs/turbo/turbo-sdk/" className="text-blue-600 underline hover:text-blue-800">Turbo Documentation</a></li>
              <li><strong>Email support</strong>: <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSqVsmVCqFrJFNLRZsrWQMfmVkQdrKWJfLwJkfkpmtcBzFMsBqGWGFRhXrDqLqXtsfBpTm" className="text-blue-600 underline hover:text-blue-800">nityaprotocol@gmail.com</a></li>
              <li><strong>Join our Discord Community</strong> for help</li>
              <li><strong>Beta Notice</strong>: This is a beta tool. Expect updates.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-300 max-w-md w-full p-8 relative rounded-2xl">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="mb-6 text-gray-600">For any inquiries or support mail us at.</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@bloomfaucets.com" className="text-blue-600 underline hover:text-blue-800">
                nityaprotocol@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}