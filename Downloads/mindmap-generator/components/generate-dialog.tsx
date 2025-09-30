"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, Loader2 } from "lucide-react"
import type { MindMapNodeData, MindMapEdge } from "./mind-map-canvas"
import { useToast } from "@/hooks/use-toast"

interface GenerateDialogProps {
  onGenerate: (nodes: MindMapNodeData[], edges: MindMapEdge[]) => void
}

export function GenerateDialog({ onGenerate }: GenerateDialogProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    const apiKey = localStorage.getItem("groq_api_key")

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please configure your Groq API key in settings.",
        variant: "destructive",
      })
      return
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a topic for your mind map.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-mindmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, apiKey }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate mind map")
      }

      const data = await response.json()
      onGenerate(data.nodes, data.edges)
      setIsOpen(false)
      setPrompt("")

      toast({
        title: "Mind Map Generated",
        description: "Your AI-powered mind map is ready!",
      })
    } catch (error) {
      console.error("[v0] Error generating mind map:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate mind map. Please check your API key and try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-lg">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">Generate Mind Map with AI</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Describe your topic and let AI create a comprehensive mind map for you.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="E.g., 'Create a mind map about machine learning concepts' or 'Plan a marketing strategy for a new product'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="bg-secondary text-foreground"
          />
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Mind Map
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
