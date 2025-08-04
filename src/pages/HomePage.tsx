"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { X, ExternalLink, Calculator, Github, Database, Shield, BarChart3, Upload, ChevronDown, Mail, ClipboardPenIcon } from "lucide-react"
import Logo from "../assets/logo.svg"
import SetupPoolsGuideModal from "../components/SetupPoolsGuideModal"
import UseSharedCreditsGuideModal from "../components/UseSharedCreditsGuideModal"

// Custom X.com Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 462.799" fill="currentColor">
    <path
      fillRule="nonzero"
      d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
    />
  </svg>
)

// Custom Discord Icon Component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 512 388.049" fill="currentColor">
    <path
      fillRule="nonzero"
      d="M433.713 32.491A424.231 424.231 0 00328.061.005c-4.953 8.873-9.488 18.156-13.492 27.509a393.937 393.937 0 00-58.629-4.408c-19.594 0-39.284 1.489-58.637 4.37-3.952-9.33-8.543-18.581-13.525-27.476-36.435 6.212-72.045 17.196-105.676 32.555-66.867 98.92-84.988 195.368-75.928 290.446a425.967 425.967 0 00129.563 65.03c10.447-14.103 19.806-29.116 27.752-44.74a273.827 273.827 0 01-43.716-20.862c3.665-2.658 7.249-5.396 10.712-8.055 40.496 19.019 84.745 28.94 129.514 28.94 44.77 0 89.019-9.921 129.517-28.943 3.504 2.86 7.088 5.598 10.712 8.055a275.576 275.576 0 01-43.796 20.918 311.49 311.49 0 0027.752 44.705 424.235 424.235 0 00129.65-65.019l-.011.011c10.632-110.26-18.162-205.822-76.11-290.55zM170.948 264.529c-25.249 0-46.11-22.914-46.11-51.104 0-28.189 20.135-51.304 46.029-51.304 25.895 0 46.592 23.115 46.15 51.304-.443 28.19-20.336 51.104-46.069 51.104zm170.102 0c-25.29 0-46.069-22.914-46.069-51.104 0-28.189 20.135-51.304 46.069-51.304s46.472 23.115 46.029 51.304c-.443 28.19-20.296 51.104-20.336 51.104z"
    />
  </svg>
)

export default function HomePage() {
  const [showHowToModal, setShowHowToModal] = useState(false)
  const [showPoolsGuide, setShowPoolsGuide] = useState(false)
  const [showCreditsGuide, setShowCreditsGuide] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const textBackgroundImage =
    "https://gylvphy2l2vnfykcptlygxl44yu6z6e4lcldtpbkc5mqbvux4f2a.arweave.net/NhdXnxpeqtLhQnzXg1185ins-JxYljm8KhdZANaX4XQ"

  const handleGetStarted = () => {
    navigate("/dashboard")
  }

  const scrollToGuides = () => {
    const guidesSection = document.getElementById('guides-section')
    if (guidesSection) {
      const yOffset = -40;
      const y = guidesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("nityaprotocol@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      {/* Floating Dock Navigation */}
      <nav className="fixed top-4 left-[15%] w-[70%] z-50 bg-card border border-border shadow-lg rounded-full px-8 py-[0.8rem] flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo || "/placeholder.svg"} alt="Bloom Faucets Logo" className="h-7 w-auto" />
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
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
            className="text-muted-foreground hover:text-foreground transition-colors rounded-full p-2"
            aria-label="Contact us via email"
          >
            <Mail className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-20 lg:py-24 bg-background overflow-hidden mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center lg:justify-start transform translate-x-[20%]">
              <a
                href="https://bloom-uploads.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-sm rounded-2xl overflow-hidden"
              >
                <img
                  src="https://arweave.net/6yCfoHv1Ksulkz6z7etmyqyTDRb9_Xo3hLMreKQ4C3g"
                  alt="Bloom Faucets"
                  className="w-full h-auto object-cover"
                />
              </a>
            </div>
            <div className="flex flex-col items-start space-y-6 text-left">
              <h1
                className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter"
                style={{
                  backgroundImage: `url(${textBackgroundImage})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                BLOOM
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                Creating and managing Turbo credit faucets for Arweave ecosystem made easy.
              </p>
              <div className="flex items-center gap-4 justify-start mt-2">
                <button
                  onClick={handleGetStarted}
                  className="btn-primary px-12 py-5 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.0375]"
                >
                  Get Started
                </button>
                <button
                  onClick={scrollToGuides}
                  className="w-16 h-16 bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 hover:border-primary/50 text-primary rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label="Scroll to guides section"
                >
                  <ChevronDown className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-heading font-extrabold text-center mb-8">FEATURES</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-start text-left p-6 border border-border rounded-2xl shadow-sm bg-background hover:shadow-md transition-shadow duration-300">
              <div className="p-3 mb-4 rounded-xl bg-muted/50 text-foreground">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Faucet Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create multiple sponsor faucets to fund them with turbo credits.
              </p>
            </div>
            <div className="flex flex-col items-start text-left p-6 border border-border rounded-2xl shadow-sm bg-background hover:shadow-md transition-shadow duration-300">
              <div className="p-3 mb-4 rounded-xl bg-muted/50 text-foreground">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Access Control</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whitelist specific addresses and manage user access.
              </p>
            </div>
            <div className="flex flex-col items-start text-left p-6 border border-border rounded-2xl shadow-sm bg-background hover:shadow-md transition-shadow duration-300">
              <div className="p-3 mb-4 rounded-xl bg-muted/50 text-foreground">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor faucet usage and complete control over faucet activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides-section" className="w-full py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-4xl font-heading font-extrabold text-center mb-12">GUIDES</h2>

          {/* First Guide: Video on left, text on right on large screens; video then text on mobile */}
          <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
            <div className="relative w-full shadow-2xl border border-border rounded-2xl overflow-hidden bg-foreground">
              <div className="flex items-center p-3 bg-muted border-b border-border">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
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
            <div className="flex flex-col justify-center space-y-4 w-full">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Setup Bloom Faucets</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Learn how to create and configure your own sponsored credit faucets with ease. This comprehensive guide
                walks you through the entire setup process, from initial configuration to sponsoring credits.
              </p>
              <button
                onClick={() => setShowPoolsGuide(true)}
                className="bg-primary text-primary-foreground px-7 py-5 text-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.0375] shadow-md hover:shadow-lg w-fit rounded-full"
              >
                Setup Guide
              </button>
            </div>
          </div>

          {/* Second Guide: Text on left, video on right on large screens; video then text on mobile */}
          <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
            <div className="relative w-full shadow-2xl border border-border rounded-2xl overflow-hidden bg-foreground">
              <div className="flex items-center p-3 bg-muted border-b border-border">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
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
            <div className="flex flex-col justify-center space-y-4 w-full">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Use Shared Credits</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover how users can leverage shared credits for their Arweave uploads. This tutorial demonstrates the
                seamless integration process with various tools and methods.
              </p>
              <button
                onClick={() => setShowCreditsGuide(true)}
                className="bg-primary text-primary-foreground px-7 py-5 text-xl font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.0375] shadow-md hover:shadow-lg w-fit rounded-full"
              >
                Credits Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Support Section */}
      <section className="w-full py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-heading font-extrabold mb-8">RESOURCES & SUPPORT</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start text-left p-6 border border-border rounded-2xl shadow-sm bg-background hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="p-3 mb-4 rounded-xl bg-muted/50 text-foreground">
                <DiscordIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center">
                Join Discord
                <ExternalLink className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">Get community support and stay updated.</p>
            </a>
            <a
              href="https://prices.ardrive.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start text-left p-6 border border-border rounded-2xl shadow-sm bg-background hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="p-3 mb-4 rounded-xl bg-muted/50 text-foreground">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center">
                Price Calculator
                <ExternalLink className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">Calculate Turbo credit costs.</p>
            </a>
            <a
              href="https://github.com/Arpitpassi/bloom-faucets"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start text-left p-6 border border-border rounded-2xl shadow-sm bg-background hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="p-3 mb-4 rounded-xl bg-muted/50 text-foreground">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground flex items-center">
                Documentation
                <ExternalLink className="w-4 h-4 ml-2 text-muted-foreground group-hover:text-foreground transition-colors" />
              </h3>
              <p className="text-muted-foreground leading-relaxed">Look at the code behind Bloom faucets.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex justify-center space-x-6">
            <a
              href="https://x.com/usebloom_x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              <XIcon className="w-6 h-6" />
              <span className="sr-only">X</span>
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
              <DiscordIcon className="w-6 h-6" />
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
              className="absolute top-4 right-4 text-foreground hover:text-muted-foreground p-1 rounded-full transition-colors"
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
                className="bg-primary text-primary-foreground border border-primary px-10 py-4 text-lg font-semibold hover:bg-primary/90 transition-colors rounded-full flex-1"
              >
                Setup Faucets
              </button>
              <button
                onClick={() => {
                  setShowHowToModal(false)
                  setShowCreditsGuide(true)
                }}
                className="bg-secondary text-secondary-foreground border border-border px-10 py-4 text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors rounded-full flex-1"
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
              className="absolute top-4 right-4 text-foreground hover:text-muted-foreground p-1 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="mb-6 text-muted-foreground">For any inquiries or support, contact us at:</p>
            <div className="flex items-center justify-start gap-2">
              <p className="text-foreground">
                <strong>Email:</strong>{" "}
                <a href="mailto:nityaprotocol@gmail.com" className="text-foreground hover:underline">
                  nityaprotocol@gmail.com
                </a>
              </p>
              <button
                onClick={handleCopyEmail}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Copy email address"
              >
                <ClipboardPenIcon className="w-5 h-5" />
              </button>
            </div>
            {copied && (
              <p className="mt-4 text-sm text-primary animate-fade-in">Email copied!</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}