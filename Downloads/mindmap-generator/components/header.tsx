"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function Header() {
  const [apiKey, setApiKey] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("groq_api_key", apiKey)
      setIsOpen(false)
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">MindFlow</h1>
        </div>
        <span className="text-sm text-muted-foreground">AI Mind Map Generator</span>
      </div>

      <div className="flex items-center gap-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle className="text-foreground">Groq API Configuration</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter your Groq API key to enable AI-powered mind map generation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-foreground">
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="gsk_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-secondary text-foreground"
                />
              </div>
              <Button onClick={handleSaveApiKey} className="w-full">
                Save API Key
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
