"use client"

import { useState, useCallback, useMemo } from "react"

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

// Reusable Modal Component
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = "max-w-lg" 
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  maxWidth?: string
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-slate-800/95 backdrop-blur-xl text-white ${maxWidth} w-full rounded-3xl shadow-2xl p-8 relative border border-slate-600/50`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl transition-colors duration-200"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        {children}
      </div>
    </div>
  )
}

// Contact Modal Content Component
const ContactModalContent = ({ 
  onCopyEmail, 
  copied 
}: { 
  onCopyEmail: () => void
  copied: boolean 
}) => (
  <>
    <p className="text-white/70 mb-4">For any inquiries or support, contact us at:</p>
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/50">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
      <a href="mailto:nityaprotocol@gmail.com" className="underline font-medium flex-1">
        nityaprotocol@gmail.com
      </a>
      <button
        onClick={onCopyEmail}
        className="text-white/60 hover:text-white transition-colors duration-200 px-2 py-1 rounded text-sm"
        aria-label="Copy email address"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
    {copied && <p className="mt-3 text-sm text-green-400 text-center">Email copied to clipboard!</p>}
  </>
)

// Guides Picker Content Component
const GuidesPickerContent = ({ 
  onCreditsGuide, 
  onPoolsGuide 
}: {
  onCreditsGuide: () => void
  onPoolsGuide: () => void
}) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <button
      onClick={onCreditsGuide}
      className="flex-1 rounded-2xl bg-blue-600 text-white px-6 py-4 font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
    >
      Use Shared Credits
    </button>
    <button
      onClick={onPoolsGuide}
      className="flex-1 rounded-2xl bg-slate-700 text-white px-6 py-4 font-semibold hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 border border-slate-600/50 shadow-lg"
    >
      Setup Faucets
    </button>
  </div>
)

// Video Toggle Component
const VideoToggle = ({ 
  activeVideo, 
  onVideoChange 
}: {
  activeVideo: "credits" | "setup"
  onVideoChange: (video: "credits" | "setup") => void
}) => (
  <div className="mx-auto mb-0 flex w-fit items-center rounded-full bg-white/15 backdrop-blur-md p-1.5 shadow-lg relative overflow-hidden">
    {/* Animated background slider */}
    <div 
      className={`absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-lg transition-all duration-500 ease-out ${
        activeVideo === "credits" 
          ? "left-1.5 w-[calc(50%-0.375rem)]" 
          : "left-1/2 w-[calc(50%-0.375rem)]"
      }`}
    />
    
    <button
      onClick={() => onVideoChange("credits")}
      className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform ${
        activeVideo === "credits" 
          ? "text-black scale-105" 
          : "text-white/80 hover:text-white hover:scale-102"
      }`}
    >
      Credits
    </button>
    <button
      onClick={() => onVideoChange("setup")}
      className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform ${
        activeVideo === "setup" 
          ? "text-black scale-105" 
          : "text-white/80 hover:text-white hover:scale-102"
      }`}
    >
      Faucet
    </button>
  </div>
)

type ModalType = 'guides' | 'contact' | 'credits' | 'pools' | null

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState<"credits" | "setup">("credits")
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [copied, setCopied] = useState(false)

  // Memoized video URLs
  const videos = useMemo(() => ({
    credits: "https://www.youtube.com/embed/CrL-lNtN140",
    setup: "https://www.youtube.com/embed/8Uw_eL7-XtI",
  }), [])

  // Memoized navigation links
  const navLinks = useMemo(() => [
    {
      href: "https://bloom-uploads.vercel.app/",
      text: "Uploads",
      external: true
    },
    {
      href: "https://prices.ardrive.io/",
      text: "Price Calculator", 
      external: true
    }
  ], [])

  // Memoized social links
  const socialLinks = useMemo(() => [
    {
      href: "https://discord.gg/9cJyqrJUHh",
      icon: DiscordIcon,
      label: "Discord"
    },
    {
      href: "https://x.com/usebloom_x", 
      icon: XIcon,
      label: "X/Twitter"
    }
  ], [])

  // Optimized event handlers with useCallback
  const handleGetStarted = useCallback(() => {
    window.location.href = "/dashboard"
  }, [])

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("nityaprotocol@gmail.com")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }, [])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  const handleGuidesNavigation = useCallback((guide: 'credits' | 'pools') => {
    setActiveModal(guide)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100;200;300;400;500;600;700;800;900&display=swap');
        * {
          font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="relative min-h-screen text-white overflow-x-hidden">
        {/* Background image */}
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://arweave.net/kHcegJ4QYY5df5V2J3tKz6WcbM7jI03JaZXtcUcGSCw')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        />

        {/* Header */}
        <header className="relative z-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
            <div className="grid grid-cols-3 items-center">
              {/* Logo */}
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-2">
                  <img
                    src="https://arweave.net/muAW35Xu2H1yHkJxfcLzjaL-_ONmy1k4og8AX_dfmT0"
                    alt="Bloom Logo"
                    className="h-6 sm:h-6 w-auto object-contain transform translate-y-[-8px]"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center justify-center">
                <div className="flex items-center gap-8 text-sm font-medium">
                  {navLinks.map((link) => (
                    <a
                      key={link.text}
                      href={link.href}
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  ))}
                  <button
                    onClick={() => setActiveModal('contact')}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    Contact Us
                  </button>
                </div>
              </nav>

              {/* Social Icons & Guides */}
              <div className="flex items-center justify-end gap-4 sm:gap-6">
                <div className="hidden sm:flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-white transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>

                <button
                  onClick={() => setActiveModal('guides')}
                  className="inline-flex items-center justify-center h-9 px-4 sm:px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200"
                >
                  Guides
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
              <div className="block">
                <img
                  src="https://arweave.net/FmsDNjiVuS-_VcfY98o_mvWiJ49Y1i9X63PWV2D7zPM"
                  alt="Onboarding Onto Arweave Made Easy"
                  className="mx-auto max-w-full h-auto w-full max-w-3xl"
                  style={{ transform: "scale(0.75)" }}
                />
              </div>
              <p className="mt-6 text-white/90 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                Create and manage Turbo credit faucets for the Arweave ecosystem.
              </p>
              <div className="mt-8 sm:mt-10">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center justify-center rounded-full bg-black/90 backdrop-blur-sm text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl hover:bg-black hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="mt-6 sm:mt-8 pb-12 sm:pb-16 lg:pb-20">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
              <VideoToggle activeVideo={activeVideo} onVideoChange={setActiveVideo} />

              {/* Video Player */}
              <div className="relative mt-4">
                <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-3xl transform scale-105"></div>
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                  <div className="bg-gradient-to-br from-black/30 to-black/60 p-2 sm:p-4">
                    <div className="relative w-full pb-[56.25%] bg-black rounded-xl sm:rounded-2xl overflow-hidden">
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
              </div>
            </div>
          </section>
        </main>

        {/* Modals */}
        <Modal
          isOpen={activeModal === 'guides'}
          onClose={closeModal}
          title="Choose Your Guide"
        >
          <GuidesPickerContent
            onCreditsGuide={() => handleGuidesNavigation('credits')}
            onPoolsGuide={() => handleGuidesNavigation('pools')}
          />
        </Modal>

        <Modal
          isOpen={activeModal === 'contact'}
          onClose={closeModal}
          title="Contact Us"
          maxWidth="max-w-md"
        >
          <ContactModalContent onCopyEmail={handleCopyEmail} copied={copied} />
        </Modal>

        <Modal
          isOpen={activeModal === 'credits'}
          onClose={closeModal}
          title="Use Shared Credits Guide"
          maxWidth="max-w-2xl"
        >
          <p className="text-white/80">Use Shared Credits Guide content would go here...</p>
        </Modal>

        <Modal
          isOpen={activeModal === 'pools'}
          onClose={closeModal}
          title="Setup Pools Guide"
          maxWidth="max-w-2xl"
        >
          <p className="text-white/80">Setup Pools Guide content would go here...</p>
        </Modal>
      </div>
    </>
  )
}