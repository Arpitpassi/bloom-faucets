
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, ExternalLink, Calculator, FileText, Database, Shield, BarChart3 } from "lucide-react"
import SplitText from "../components/SplitText"

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

  return (
    <div className="min-h-screen bg-white text-black font-mono relative overflow-hidden">
      {/* Geometric Decorations */}
      <div className="fixed top-0 right-0 w-48 h-48 border-2 border-gray-300 bg-black/5 rounded-bl-full -z-10" />
      <div className="fixed bottom-0 left-0 w-48 h-48 border-2 border-gray-300 bg-black/5 rounded-tr-full -z-10" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center"></div>
            <button
              onClick={() => setShowContactModal(true)}
              className="text-black hover:underline font-semibold transition-all duration-200 cursor-pointer"
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
            className="text-4xl md:text-6xl font-bold mb-6 inline-block"
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
              className="bg-white text-black border-2 border-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors rounded-xl"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowHowToModal(true)}
              className="bg-white text-black border-2 border-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors rounded-xl"
            >
              Guides
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
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
                Create and manage multiple sponsor faucets with custom configurations and access controls.
              </p>
            </div>

            {/* Access Control */}
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Control</h3>
              <p className="text-gray-600">
                Whitelist specific addresses and manage user access with granular permission controls.
              </p>
            </div>

            {/* Real-time Analytics */}
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">
                Monitor faucet usage and detailed insights into your faucet activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Support Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Resources & Support</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-gray-300 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
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
              className="bg-white border-2 border-gray-300 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
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
              className="bg-white border-2 border-gray-300 p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
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
          <p className="text-gray-600">© 2025 Bloom. All rights reserved. Version 0.0.23</p>
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
                className="bg-white text-black border-2 border-black px-10 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors rounded-xl flex-1"
              >
                Setup Faucets
              </button>
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowCreditsGuide(true)
                }}
                className="bg-white text-black border-2 border-black px-10 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors rounded-xl flex-1"
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
          <div className="bg-white border-2 border-gray-300 max-w-5xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setShowPoolsGuide(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h1 className="text-3xl font-bold mb-6">Bloom Faucet Manager: Simple Guide to Create and Use a Faucet</h1>
            <p className="mb-6">This guide provides straightforward instructions for creating and using a sponsored credit Faucet in the Arweave ecosystem using the Bloom Faucet Manager.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Prerequisites</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>An Arweave-compatible wallet (Beacon or Wander) installed in your browser.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Access the Dashboard</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Open the Bloom Faucet Manager in your browser.</li>
              <li>On the homepage, click <strong>Get Started</strong> to go to the <strong>Dashboard</strong>.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Connect Your Wallet</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>On the dashboard, click <strong>Connect Wallet</strong> if not already connected.</li>
              <li>Choose <strong>Wander Wallet</strong> or <strong>Beacon</strong>.</li>
              <li>Follow your wallet’s prompts to connect.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Create a Faucet</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
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
            <ul className="list-disc pl-6 mb-4 space-y-2">
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
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email <a href="mailto:nityaprotocol@gmail.com" className="text-blue-600 underline hover:text-blue-800">nityaprotocol@gmail.com</a> via <strong>Mail Us</strong> on the homepage.</li>
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
          <div className="bg-white border-2 border-gray-300 max-w-5xl w-full max-h-[80vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setShowCreditsGuide(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h1 className="text-3xl font-bold mb-6">Bloom Faucets: Upload Data to Arweave with Sponsored Credits</h1>
            <p className="mb-6">This guide explains how to use shared credits to upload data to Arweave.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-xl">
              <p className="font-semibold text-red-800">
                Note: Your wallet address must be whitelisted by the Sponsor in order for you to be able to use credits from the shared Faucet.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Quick Start: Using Sponsored Credits</h2>
            <p className="mb-4">Here are the simplest ways to use Bloom Faucets credits depending on your method:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Turbo CLI</strong>: By default, the CLI will automatically check if you have credits in a sponsor's Faucet first. You do not need to do anything extra.</li>
              <li><strong>Turbo SDK (Node/Web)</strong>: When uploading, pass the <code>paidBy</code> option specifying the sponsor's wallet address.</li>
              <li><strong>HTTP API (Turbo Endpoint)</strong>: When making your upload request, add the <code>x-paid-by</code> header, again specifying the sponsor's wallet address.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Detailed Guide</h2>
            <p className="mb-4">Below is a more detailed breakdown of each method.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Using the CLI to Upload Files</h3>
            <p className="mb-4">By default, the CLI is configured to prioritize using credits from any available sponsor Faucets you are part of. If credits are available in a Bloom Faucets Faucet, they will be used before attempting to use any credits from your personal wallet. This makes it easy for participants in sponsored events to upload data without incurring personal costs.</p>

            <h4 className="text-base font-semibold mt-4 mb-2">1. Installation</h4>
            <p className="mb-4">First, you need to install the <code>@ardrive/turbo-sdk</code> globally on your system. Open your terminal and run the following command:</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
              npm install -g @ardrive/turbo-sdk
            </pre>

            <h4 className="text-base font-semibold mt-4 mb-2">2. Wallet Setup</h4>
            <p className="mb-4">You will need an Arweave wallet key file. Ensure you have your key file saved securely on your computer. This file is necessary for the CLI to interact with the Arweave network and Bloom Faucets.</p>
            <p className="mb-4">For example, you might save your wallet as <code>wallet.json</code> in your project directory or a designated secure location.</p>

            <h4 className="text-base font-semibold mt-4 mb-2">3. Uploading Files</h4>
            <p className="mb-4">Once the SDK is installed and you have your wallet file ready, you can upload files using the <code>turbo upload-file</code> command.</p>
            <p className="mb-4">Here's an example command:</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
              turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json
            </pre>
            <p className="mb-4">Explanation of the command:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><code>turbo upload-file</code>: The base command to initiate a file upload.</li>
              <li><code>--file-path ./public/stock.jpeg</code>: Specifies the path to the file you want to upload. Replace <code>./public/stock.jpeg</code> with the actual path to your file.</li>
              <li><code>--wallet-file ./wallet.json</code>: Specifies the path to your Arweave wallet key file. Replace <code>./wallet.json</code> with the actual path to your wallet file.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3">Using the Node.js SDK to Upload Files</h3>
            <p className="mb-4">You can also programmatically upload files to Arweave using Bloom Faucets credits via the <code>@ardrive/turbo-sdk</code> in a Node.js environment.</p>

            <h4 className="text-base font-semibold mt-4 mb-2">1. Setup and Initialization</h4>
            <p className="mb-4">First, ensure you have the <code>@ardrive/turbo-sdk</code> installed in your project:</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
              npm install @ardrive/turbo-sdk
            </pre>
            <p className="mb-4">Then, you can import the necessary modules and initialize the Turbo SDK with your Arweave wallet:</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
{`// src/index-node.js (Simplified Example)
import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
  const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
  const signer = new ArweaveSigner(jwk);
  const turbo = TurboFactory.authenticated({
    signer,
  });

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "./public/stock.jpeg");
  const fileSize = fs.statSync(filePath).size;

  // Details for balance checking and cost estimation can be found in src/index-node.js

  try {
    const { id } = await turbo.uploadFile({
      fileStreamFactory: () => fs.createReadStream(filePath),
      fileSizeFactory: () => fileSize,
      dataItemOpts: {
        tags: [
          {
            name: "Content-Type",
            value: "image/jpeg",
          },
        ],
        // Specify the sponsor's wallet address to use their Bloom Faucets credits
        paidBy: "1-5C9_RbavjM4fG5nwLK9EOlpmTDmffb72WGQ5tvfgc", // Replace with actual sponsor wallet address
      },
    });
    console.log("Successfully uploaded data item with ID:", id);
  } catch (error) {
    console.error("Failed to upload data item:", error);
  }
})();`}
            </pre>

            <h4 className="text-base font-semibold mt-4 mb-2">2. Using Sponsored Credits with paidBy</h4>
            <p className="mb-4">To utilize credits from a Bloom Faucets Faucet, you must specify the sponsor's Arweave wallet address in the <code>paidBy</code> field within the <code>dataItemOpts</code> when calling <code>turbo.uploadFile()</code>.</p>
            <p className="mb-4">As shown in the example above (and in <code>src/index-node.js</code>):</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
{`// ...
dataItemOpts: {
  // ... other tags
  paidBy: "SPONSOR_WALLET_ADDRESS", // Replace with the actual sponsor's wallet address
}
// ...`}
            </pre>
            <p className="mb-4">This tells the ArDrive Turbo SDK to attempt to use the sponsor's Bloom Faucets credits for the upload transaction.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Using the HTTP API to Upload Files</h3>
            <p className="mb-4">For environments where you might not use the SDK directly, or for more direct control, you can interact with the Bloom Faucets / ArDrive upload endpoint via an HTTP POST request.</p>

            <h4 className="text-base font-semibold mt-4 mb-2">1. Prepare Data for Upload</h4>
            <p className="mb-4">Before making the HTTP request, you'll need to prepare your file data as a data item and sign it. The <code>@dha-team/arbundles</code> library can be helpful here, as shown in <code>src/index-http.js</code>.</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
{`// src/index-http.js (Simplified Example)
import { ArweaveSigner } from "@ardrive/turbo-sdk/node"; // Signer can be from turbo-sdk
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

(async () => {
  const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
  const signer = new ArweaveSigner(jwk);

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "./public/stock.jpeg");
  const fileAsUint8Array = new Uint8Array(fs.readFileSync(filePath));

  const data = createData(fileAsUint8Array, signer, {
    tags: [
      {
        name: "Content-Type",
        value: "image/jpeg",
      },
    ],
  });

  const signedData = await sign(data, signer);

  // ... (rest of the HTTP call)
})();`}
            </pre>

            <h4 className="text-base font-semibold mt-4 mb-2">2. Making the HTTP POST Request</h4>
            <p className="mb-4">You will send the raw binary data of the signed data item in the body of a POST request to <code>https://upload.ardrive.io/v1/tx</code>.</p>

            <h4 className="text-base font-semibold mt-4 mb-2">3. Using Sponsored Credits with x-paid-by Header</h4>
            <p className="mb-4">To use credits from a Bloom Faucets Faucet via the HTTP API, include the <code>x-paid-by</code> header in your request, with its value set to the sponsor's Arweave wallet address.</p>
            <pre className="bg-gray-100 p-4 rounded-xl mb-4">
{`// src/index-http.js (Relevant Part)
// ...
try {
  const response = await fetch(\`https://upload.ardrive.io/v1/tx\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      Accept: "application/json",
      // Specify the sponsor's wallet address to use their Bloom Faucets credits
      "x-paid-by": "1-5C9_RbavjM4fG5nwLK9EOlpmTDmffb72WGQ5tvfgc", // Replace with actual sponsor wallet address
    },
    body: data.getRaw(), // Send the raw data item
  });

  if (!response.ok) {
    throw new Error(\`Upload failed: \${response.statusText}\`);
  }
  const result = await response.json();
  console.dir(result);
} catch (error) {
  console.error("Failed to upload image:", error);
}
// ...`}
            </pre>
            <p className="mb-4">When the <code>x-paid-by</code> header is present and valid, the ArDrive service will attempt to use the specified sponsor's Bloom Faucets credits for the upload.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Additional Resources</h3>
            <p className="mb-4">Check out <a href="https://docs.ardrive.io/turbo" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Turbo docs</a> for more information on using the Turbo CLI, SDK, or API.</p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Need Help?</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email <a href="mailto:nityaprotocol@gmail.com" className="text-blue-600 underline hover:text-blue-800">nityaprotocol@gmail.com</a> via <strong>Mail Us</strong> on the homepage.</li>
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

            <p className="mb-6">For any inquiries or support mail us at.</p>
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
