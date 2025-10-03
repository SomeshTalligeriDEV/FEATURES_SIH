"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, Moon, Sun } from "lucide-react"

const menuItems = ["Home", "Features", "About", "Contact"]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [language, setLanguage] = useState("EN")
  const [isDark, setIsDark] = useState(true)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm comic-panel border-foreground shadow-lg">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 relative">
            <div className="absolute -top-1 left-0 w-1 h-3 bg-foreground animate-ink-drip" />
            <div className="w-14 h-14 bg-foreground rounded-full flex items-center justify-center sketch-border border-foreground relative">
              <span className="text-3xl">🪷</span>
            </div>
            <span className="font-[family-name:var(--font-comic)] text-4xl comic-text">SARATHI</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                className="text-sm font-bold hover:bg-foreground/10 transition-all hover:scale-105 sketch-border border-transparent hover:border-foreground"
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="sketch-border border-foreground font-bold bg-transparent hover:bg-foreground hover:text-background transition-all"
              onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="sketch-border border-foreground font-bold bg-transparent hover:bg-foreground hover:text-background transition-all"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              className="sketch-border border-foreground font-bold bg-transparent hover:bg-foreground hover:text-background transition-all"
            >
              Sign In
            </Button>
            <Button className="bg-foreground text-background comic-panel border-foreground font-bold hover:scale-105 transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:scale-110 transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t-2 border-foreground">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  className="justify-start font-bold hover:bg-foreground/10 transition-all"
                >
                  {item}
                </Button>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t-2 border-foreground">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="sketch-border border-foreground font-bold bg-transparent flex-1"
                    onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    {language}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="sketch-border border-foreground font-bold bg-transparent"
                    onClick={() => setIsDark(!isDark)}
                  >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" className="sketch-border border-foreground font-bold bg-transparent">
                  Sign In
                </Button>
                <Button className="bg-foreground text-background comic-panel border-foreground font-bold">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
