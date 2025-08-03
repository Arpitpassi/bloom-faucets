"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  X,
  ExternalLink,
  Calculator,
  Github,
  DiscIcon as Discord,
  Twitter,
  Database,
  Shield,
  BarChart3,
  Upload,
} from "lucide-react"
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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      {/* Floating Dock Navigation */}
      <nav className="fixed top-4 left-[15%] w-[70%] z-50 bg-card border border-border shadow-lg rounded-full px-12 py-[0.8rem] flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo || "/placeholder.svg"} alt="Bloom Faucets Logo" className="h-7 w-auto" />
        </div>
        <div className="flex items-center space-x-8">
          <a
            href="https://bloom-uploads.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-2"
          >
            <Upload className="w-6 h-6" />
            <span className="sr-only">Bloom Uploads</span>
          </a>
          <button
            onClick={() => setShowContactModal(true)}
            className="text-muted-foreground hover:text-foreground transition-colors text-xl font-medium rounded-full px-4 py-2"
          >
            Mail Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative grid grid-cols-3 gap-4 p-4 bg-card border border-border shadow-sm rounded-xs">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-xs border border-border">
                <img
                  src={`/placeholder.svg?height=150&width=150&query=floral+pattern+${i + 1}`}
                  width={150}
                  height={150}
                  alt={`Floral image ${i + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start space-y-6 text-left">
            <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-foreground tracking-tighter">BLOOM</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Creating and managing sponsored credit faucets for the Arweave ecosystem made easy.
            </p>
            <div className="flex justify-start mt-2">
              <button onClick={handleGetStarted} className="btn-primary px-12 py-5 text-xl font-semibold rounded-xs shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.0375]">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-heading font-extrabold text-center mb-16">FEATURES</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-6 border border-border rounded-xs shadow-sm bg-background">
              <div className="p-4 mb-4 rounded-full border-2 border-foreground text-foreground">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Faucet Management</h3>
              <p className="text-muted-foreground">Create multiple sponsor faucets to fund them with turbo credits.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-border rounded-xs shadow-sm bg-background">
              <div className="p-4 mb-4 rounded-full border-2 border-foreground text-foreground">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Control</h3>
              <p className="text-muted-foreground">Whitelist specific addresses and manage user access.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border border-border rounded-xs shadow-sm bg-background">
              <div className="p-4 mb-4 rounded-full border-2 border-foreground text-foreground">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
              <p className="text-muted-foreground">Monitor faucet usage and complete control over faucet activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-4xl font-heading font-extrabold text-center mb-20">GUIDES</h2>
          
          {/* Video 1: Video on left, text on right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative w-full shadow-2xl border border-border rounded-lg overflow-hidden bg-foreground">
              {/* Terminal Title Bar */}
              <div className="flex items-center p-3 bg-muted border-b border-border">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <span className="flex-1 text-center text-sm text-muted-foreground font-mono">setup-faucets.mp4</span>
              </div>
              {/* Video Container */}
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/3cKWv34cd94"
                  title="Guide to setup Bloom faucets"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Setup Bloom Faucets</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Learn how to create and configure your own sponsored credit faucets with ease. This comprehensive guide walks you through the entire setup process, from initial configuration to advanced customization options.
              </p>
              <button
                onClick={() => setShowPoolsGuide(true)}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xs font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.0375] shadow-md hover:shadow-lg w-fit"
              >
                View Setup Guide
              </button>
            </div>
          </div>

          {/* Video 2: Text on left, video on right */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Use Shared Credits</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover how users can leverage shared credits from your faucets for their Arweave uploads. This tutorial demonstrates the seamless integration process and shows how to maximize the benefits of shared credit systems.
              </p>
              <button
                onClick={() => setShowCreditsGuide(true)}
                className="bg-secondary text-secondary-foreground border border-border px-6 py-3 rounded-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-[1.0375] shadow-md hover:shadow-lg w-fit"
              >
                View Credits Guide
              </button>
            </div>
            <div className="relative w-full shadow-2xl border border-border rounded-lg overflow-hidden bg-foreground lg:order-2">
              {/* Terminal Title Bar */}
              <div className="flex items-center p-3 bg-muted border-b border-border">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <span className="flex-1 text-center text-sm text-muted-foreground font-mono">
                  use-shared-credits.mp4
                </span>
              </div>
              {/* Video Container */}
              <div className="relative pb-[56.25%] h-0">
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
        </div>
      </section>

      {/* Resources & Support Section */}
      <section className="w-full py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-heading font-extrabold mb-16">Resources & Support</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card flex flex-col items-center justify-center group"
            >
              <div className="p-4 mb-4 rounded-full border-2 border-foreground text-foreground">
                <Discord className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                Join Discord
                <ExternalLink className="w-4 h-4 ml-1 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>
              <p className="text-muted-foreground text-sm">Get community support and stay updated.</p>
            </a>
            <a
              href="https://prices.ardrive.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card flex flex-col items-center justify-center group"
            >
              <div className="p-4 mb-4 rounded-full border-2 border-foreground text-foreground">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                Price Calculator
                <ExternalLink className="w-4 h-4 ml-1 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>
              <p className="text-muted-foreground text-sm">Calculate Turbo credit costs.</p>
            </a>
            <a
              href="https://github.com/Arpitpassi/bloom-faucets"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card flex flex-col items-center justify-center group"
            >
              <div className="p-4 mb-4 rounded-full border-2 border-foreground text-foreground">
                <Github className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center">
                Documentation
                <ExternalLink className="w-4 h-4 ml-1 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>
              <p className="text-muted-foreground text-sm">Look at the code behind Bloom faucets.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex justify-center space-x-6">
            <a
              href="https://x.com/usebloom_x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://github.com/Arpitpassi/bloom-faucets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <Discord className="w-6 h-6" />
              <span className="sr-only">Discord</span>
            </a>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Bloom. All rights reserved. Version 0.0.26
          </p>
        </div>
      </footer>

      {/* How To Modal */}
      {showHowToModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border max-w-lg w-full p-8 relative rounded-xs shadow-lg">
            <button
              onClick={() => setShowHowToModal(false)}
              className="absolute top-4 right-4 text-foreground hover:text-muted-foreground p-1 rounded-xs transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-heading font-extrabold mb-6 text-center">How To</h1>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowPoolsGuide(true)
                }}
                className="bg-primary text-primary-foreground border border-primary px-10 py-4 text-lg font-semibold hover:bg-primary/90 transition-colors rounded-xs flex-1"
              >
                Setup Faucets
              </button>
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowCreditsGuide(true)
                }}
                className="bg-secondary text-secondary-foreground border border-border px-10 py-4 text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors rounded-xs flex-1"
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
          <div className="bg-card border border-border max-w-md w-full p-8 relative rounded-xs shadow-lg">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-foreground hover:text-muted-foreground p-1 rounded-xs transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="mb-6 text-muted-foreground">For any inquiries or support mail us at:</p>
            <p className="text-foreground">
              <strong>Email:</strong>{" "}
              <a href="mailto:nityaprotocol@gmail.com" className="text-foreground hover:underline">
                nityaprotocol@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}