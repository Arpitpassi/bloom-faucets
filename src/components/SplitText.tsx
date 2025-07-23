"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: "chars" | "words"
  from?: React.CSSProperties
  to?: React.CSSProperties
  threshold?: number
  rootMargin?: string
  textAlign?: React.CSSProperties["textAlign"]
  onLetterAnimationComplete?: () => void
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  splitType = "chars",
  textAlign = "left",
  delay = 0,
  duration = 0.6,
  onLetterAnimationComplete,
}) => {
  const split = splitType === "words" ? text.split(" ") : text.split("")
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    spanRefs.current.forEach((span, index) => {
      if (span) {
        span.style.animationDelay = `${delay + index * 0.05}s` // Staggered delay
        span.style.animationDuration = `${duration}s`
        span.style.animationFillMode = "both" // Keep the end state
      }
    })

    // Trigger onLetterAnimationComplete after the last animation finishes
    const lastIndex = split.length - 1
    if (lastIndex >= 0 && spanRefs.current[lastIndex] && onLetterAnimationComplete) {
      const lastSpan = spanRefs.current[lastIndex]
      const handleAnimationEnd = () => {
        onLetterAnimationComplete()
        lastSpan?.removeEventListener("animationend", handleAnimationEnd)
      }
      lastSpan.addEventListener("animationend", handleAnimationEnd)
      return () => {
        lastSpan?.removeEventListener("animationend", handleAnimationEnd)
      }
    }
  }, [text, delay, duration, splitType, onLetterAnimationComplete, split.length])

  return (
    <span className={className} style={{ display: "inline-block", textAlign }}>
      {split.map((part, i) => (
        <span
          key={i}
          ref={(el) => (spanRefs.current[i] = el)}
          className={cn("inline-block opacity-0 animate-slide-in-left-fade-staggered")}
        >
          {part}
          {splitType === "words" ? " " : ""}
        </span>
      ))}
    </span>
  )
}

export default SplitText
