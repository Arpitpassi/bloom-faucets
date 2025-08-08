"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, ExternalLink } from 'lucide-react'
import SetupPoolsGuideModal from "../components/SetupPoolsGuideModal"
import UseSharedCreditsGuideModal from "../components/UseSharedCreditsGuideModal"
import Logo from "../assets/logo.svg"

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
  const navigate = useNavigate()

  // Guides flow
  const [showGuidesPicker, setShowGuidesPicker] = useState(false)
  const [showPoolsGuide, setShowPoolsGuide] = useState(false)
  const [showCreditsGuide, setShowCreditsGuide] = useState(false)

  // Contact modal
  const [showContactModal, setShowContactModal] = useState(false)
  const [copied, setCopied] = useState(false)

  // Video toggle
  const [activeVideo, setActiveVideo] = useState<"credits" | "setup">("credits")
  const videos = {
    credits: "https://www.youtube.com/embed/CrL-lNtN140",
    setup: "https://www.youtube.com/embed/8Uw_eL7-XtI",
  }

  const handleGetStarted = () => navigate("/dashboard")

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("nityaprotocol@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Background image + gradient overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://unsplash.com/s/photos/background-image')", // placeholder per instructions
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Top Navigation */}
      <header className="relative z-10">
        <div className="mx-auto w-full max-w-7xl px-6 pt-6 flex items-center justify-between">
          {/* Left: Logo + left-side links cluster */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              {/* Per instruction, logo must be an image using the provided placeholder URL.
                 Fallback to local logo if the placeholder fails to load. */}
              <img
                src="https://www.youtube.com/watch?v=AoosTei0ZsE"
                alt="Bloom Logo"
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = Logo
                }}
              />
            </a>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a
                href="https://bloom-uploads.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                Uploads
              </a>
              <a
                href="https://prices.ardrive.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                Price Calculator
              </a>
              <button
                onClick={() => setShowContactModal(true)}
                className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                Contact Us <ExternalLink className="w-4 h-4" />
              </button>
            </nav>
          </div>

          {/* Right: social icons + Guides */}
          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/9cJyqrJUHh"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-white/80 hover:text-white transition-colors"
            >
              <DiscordIcon className="w-5 h-5" />
              <span className="sr-only">Discord</span>
            </a>
            <a
              href="https://x.com/usebloom_x"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-white/80 hover:text-white transition-colors"
            >
              <XIcon className="w-5 h-5" />
              <span className="sr-only">X/Twitter</span>
            </a>

            <button
              onClick={() => setShowGuidesPicker(true)}
              className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Guides
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="pt-16 md:pt-24 lg:pt-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="block">Onboarding Onto</span>
              <span className="block text-blue-300">Arweave Made Easy</span>
            </h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              Creating and managing sponsored credit faucets for the Arweave ecosystem made easy.
            </p>
            <div className="mt-8">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center rounded-full bg-black/90 text-white px-6 py-3 font-semibold shadow-lg hover:bg-black transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* Video Player Card (bottom-middle) */}
        <section className="mt-12 md:mt-16 lg:mt-20 pb-16">
          <div className="mx-auto w-full max-w-4xl px-6">
            {/* Toggle */}
            <div className="mx-auto mb-4 flex w-fit items-center rounded-full bg-white/10 p-1 backdrop-blur-sm">
              <button
                onClick={() => setActiveVideo("credits")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeVideo === "credits" ? "bg-white text-black" : "text-white/80 hover:text-white"
                }`}
              >
                Credits
              </button>
              <button
                onClick={() => setActiveVideo("setup")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeVideo === "setup" ? "bg-white text-black" : "text-white/80 hover:text-white"
                }`}
              >
                Setup Faucets
              </button>
            </div>

            {/* Player */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={videos[activeVideo]}
                  title={activeVideo === "credits" ? "Credits Video" : "Setup Faucets Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Guides Picker Modal (single popup) */}
      {showGuidesPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-lg w-full rounded-md shadow-xl p-8 relative">
            <button
              onClick={() => setShowGuidesPicker(false)}
              className="absolute top-3 right-3 text-black/60 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Guides</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowGuidesPicker(false)
                  setShowCreditsGuide(true)
                }}
                className="flex-1 rounded-full bg-black text-white px-6 py-4 font-semibold hover:bg-black/85 transition-colors"
              >
                Use Shared Credits
              </button>
              <button
                onClick={() => {
                  setShowGuidesPicker(false)
                  setShowPoolsGuide(true)
                }}
                className="flex-1 rounded-full bg-gray-100 text-black px-6 py-4 font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
              >
                Setup Faucets
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-md w-full rounded-md shadow-xl p-8 relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-3 right-3 text-black/60 hover:text-black"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-black/70 mb-4">For any inquiries or support, contact us at:</p>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <a href="mailto:nityaprotocol@gmail.com" className="underline font-medium">
                nityaprotocol@gmail.com
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-black/60 hover:text-black transition-colors"
                aria-label="Copy email address"
              >
                Copy
              </button>
            </div>
            {copied && <p className="mt-3 text-sm text-green-600">Email copied!</p>}
          </div>
        </div>
      )}

      {/* Keep original guides content; opened from Guides picker */}
      <SetupPoolsGuideModal isOpen={showPoolsGuide} onClose={() => setShowPoolsGuide(false)} />
      <UseSharedCreditsGuideModal isOpen={showCreditsGuide} onClose={() => setShowCreditsGuide(false)} />
    </div>
  )
}
