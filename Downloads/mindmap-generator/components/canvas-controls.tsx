"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react"

interface CanvasControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  zoom: number
}

export function CanvasControls({ onZoomIn, onZoomOut, onReset, zoom }: CanvasControlsProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-2 shadow-lg">
      <Button onClick={onZoomIn} size="icon" variant="outline" title="Zoom In">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <div className="px-2 py-1 text-center text-xs text-muted-foreground">{Math.round(zoom * 100)}%</div>
      <Button onClick={onZoomOut} size="icon" variant="outline" title="Zoom Out">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <div className="my-1 h-px bg-border" />
      <Button onClick={onReset} size="icon" variant="outline" title="Reset View">
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
