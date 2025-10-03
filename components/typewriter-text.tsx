"use client"

import { useTypewriter } from "@/hooks/use-typewriter"

type TypewriterTextProps = {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({ text, speed = 30, className = "", onComplete }: TypewriterTextProps) {
  const { displayedText, isComplete } = useTypewriter(text, speed)

  if (isComplete && onComplete) {
    onComplete()
  }

  return <span className={className}>{displayedText}</span>
}
