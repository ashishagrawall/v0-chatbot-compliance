"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings, Shield } from "lucide-react"

export function Header() {
  return (
    <header className="glass-panel flex h-20 items-center justify-between border-b-2 border-black/5 px-8 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black via-gray-800 to-gray-900 shadow-2xl animate-logo-pulse">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-logo-glow" />
          <Shield className="relative h-7 w-7 text-white animate-logo-float" />
        </div>
        <div>
          <h1 className="text-2xl font-bold leading-none text-foreground">Compliance Intelligence</h1>
          <p className="text-sm font-semibold text-muted-foreground mt-1">Case & Alert Management</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-12 w-12 hover:bg-black/5 rounded-xl transition-all hover:scale-105"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600 shadow-lg ring-2 ring-white animate-pulse" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 hover:bg-black/5 rounded-xl transition-all hover:scale-105"
        >
          <Settings className="h-6 w-6" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-12 w-12 rounded-full hover:bg-transparent transition-transform hover:scale-105"
            >
              <Avatar className="h-12 w-12 border-2 border-black/10 shadow-xl">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-base">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 glossy-card border-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal py-3">
              <div className="flex flex-col space-y-2">
                <p className="text-base font-bold leading-none">John Doe</p>
                <p className="text-sm leading-none text-muted-foreground font-semibold">john.doe@company.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-semibold py-2.5">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="font-semibold py-2.5">Team Management</DropdownMenuItem>
            <DropdownMenuItem className="font-semibold py-2.5">Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-semibold py-2.5 text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
