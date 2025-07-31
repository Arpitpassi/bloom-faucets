"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { X, ExternalLink, Calculator, FileText, Database, Shield, BarChart3 } from "lucide-react"
import SplitText from "../components/SplitText"
import Logo from "../assets/logo.svg"
import SetupPoolsGuideModal from "../components/SetupPoolsGuideModal"
import UseSharedCreditsGuideModal from "../components/UseSharedCreditsGuideModal"

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
    <div className="min-h-screen bg-brand-snow-drift text-brand-night font-mono relative overflow-hidden">
      {/* Header */}
      <header className="bg-brand-snow-drift shadow-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={Logo || "/placeholder.svg"} alt="Bloom Faucets Logo" className="h-5 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://x.com/usebloom_x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-night hover:underline font-semibold"
              >
                X
              </a>
              <a
                href="https://bloom-uploads.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-night hover:underline font-semibold"
              >
                Bloom Uploads
              </a>
              <button
                onClick={() => setShowContactModal(true)}
                className="text-brand-night hover:underline font-semibold transition-all duration-200 cursor-pointer"
              >
                Mail Us
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-brand-snow-drift">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <SplitText
            text="faucets.beta"
            className="text-3xl md:text-6xl font-inter-tight-bold mb-6 inline-block text-faucets-beta"
            delay={0.1}
            duration={0.6}
            splitType="chars"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Creating and managing sponsored credit faucets for the Arweave ecosystem made easy.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={handleGetStarted}
              className="bg-white text-brand-night border-2 border-brand-night px-8 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xs"
            >
              Get Started
            </button>
            <button
              onClick={() => setShowHowToModal(true)}
              className="bg-white text-brand-night border-2 border-brand-night px-8 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xs"
            >
              Guides
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-brand-spring-wood">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-none">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Faucet Management</h3>
              <p className="text-gray-600">Create multiple sponsor faucets to fund them with turbo credits.</p>
            </div>
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-none">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Control</h3>
              <p className="text-gray-600">Whitelist specific addresses and manage user access.</p>
            </div>
            <div className="p-6 text-center hover:bg-gray-100 transition-colors rounded-none">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 flex items-center justify-center mb-4 mx-auto rounded-2xl">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-gray-600">Monitor faucet usage and complete control over faucet activites</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tour Section */}
      <section className="py-16 bg-brand-spring-wood">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Product Tour</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative w-full pb-[56.25%] h-0 shadow-lg border-2 border-gray-300 rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3cKWv34cd94"
                title="Guide to setup Bloom faucets"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="relative w-full pb-[56.25%] h-0 shadow-lg border-2 border-gray-300 rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/OBVfwiCWVpQ"
                title="How to use shared credits"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
              href="https://github.com/Arpitpassi/bloom-faucets"
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
          <div className="bg-white border-2 border-gray-300 max-w-lg w-full p-8 relative rounded-none">
            <button
              onClick={() => setShowHowToModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 rounded-none hover:bg-gray-100 transition-colors"
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
                className="bg-white text-brand-night border-2 border-brand-night px-10 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xs flex-1"
              >
                Setup Faucets
              </button>
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowCreditsGuide(true)
                }}
                className="bg-white text-brand-night border-2 border-brand-night px-10 py-4 text-lg font-semibold hover:bg-brand-night hover:text-white transition-colors rounded-xs flex-1"
              >
                Use Shared Credits
              </button>
            </div>
          </div>
        </div>
      )}

      <SetupPoolsGuideModal isOpen={showPoolsGuide} onClose={() => setShowPoolsGuide(false)} />
      <UseSharedCreditsGuideModal isOpen={showCreditsGuide} onClose={() => setShowCreditsGuide(false)} />

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-300 max-w-md w-full p-8 relative rounded-none">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 rounded-none hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="mb-6 text-gray-600">For any inquiries or support mail us at.</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:nityaprotocol@gmail.com" className="text-blue-600 underline hover:text-blue-800">
                nityaprotocol@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}