"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Loader2, Trash2, Sparkles } from "lucide-react"
import type { Message } from "./compliance-chatbot"
import { cn } from "@/lib/utils"
import { TypewriterText } from "./typewriter-text"

type ChatInterfaceProps = {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading: boolean
  onSelectMessage: (message: Message) => void
}

export function ChatInterface({ messages, onSendMessage, isLoading, onSelectMessage }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex h-full flex-col glass-panel">
      {/* Chat Header */}
      <div className="glossy-border flex items-center justify-between border-b bg-gradient-to-r from-white to-gray-50/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-800 shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">AI Assistant</h2>
            <p className="text-xs font-semibold text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-black/5">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-6" ref={scrollRef}>
        <div className="space-y-6 py-6">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center py-16">
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-gray-800 shadow-2xl">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-foreground">Start Your Investigation</h3>
                <p className="text-sm font-semibold text-muted-foreground">
                  Ask about cases, alerts, or compliance reports
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={cn("flex gap-4", message.role === "user" ? "justify-end" : "justify-start")}
            >
              {message.role === "assistant" && (
                <Avatar className="h-10 w-10 border-2 border-black/10 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-black to-gray-800 text-white text-sm font-bold">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}

              <button
                onClick={() => message.role === "assistant" && onSelectMessage(message)}
                className={cn(
                  "max-w-[80%] rounded-2xl px-5 py-3.5 text-left text-sm transition-all",
                  message.role === "user"
                    ? "chat-message-user text-primary-foreground font-semibold"
                    : "chat-message-assistant text-foreground hover:shadow-xl",
                )}
              >
                {message.role === "assistant" && index === messages.length - 1 && !isLoading ? (
                  <p className="leading-relaxed">
                    <TypewriterText text={message.content} speed={20} />
                  </p>
                ) : (
                  <p className="leading-relaxed font-medium">{message.content}</p>
                )}
                <p
                  className={cn(
                    "mt-2 text-xs font-semibold",
                    message.role === "user" ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </button>

              {message.role === "user" && (
                <Avatar className="h-10 w-10 border-2 border-black/10 shadow-lg">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-sm font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 border-2 border-black/10 shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-black to-gray-800 text-white text-sm font-bold">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="chat-message-assistant flex items-center gap-3 rounded-2xl px-5 py-3.5">
                <Loader2 className="h-5 w-5 animate-spin text-black" />
                <span className="text-sm font-semibold text-foreground">Analyzing your request...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="glossy-border border-t bg-gradient-to-r from-white to-gray-50/50 p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about cases, alerts, or compliance..."
            className="min-h-[70px] resize-none bg-white/80 backdrop-blur-sm font-semibold text-base border-black/10 shadow-sm focus:shadow-md transition-all"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-[70px] w-[70px] flex-shrink-0 bg-gradient-to-br from-black to-gray-800 hover:from-gray-900 hover:to-black shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
