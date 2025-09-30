"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MindMapNodeData } from "./mind-map-canvas"

interface MindMapNodeProps {
  node: MindMapNodeData
  isSelected: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onLabelChange: (label: string) => void
  onDelete: () => void
}

export function MindMapNode({ node, isSelected, onMouseDown, onLabelChange, onDelete }: MindMapNodeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(node.label)

  const colors = [
    "bg-primary/20 border-primary text-foreground",
    "bg-chart-1/20 border-chart-1 text-foreground",
    "bg-chart-2/20 border-chart-2 text-foreground",
    "bg-chart-3/20 border-chart-3 text-foreground",
  ]

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onLabelChange(label)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur()
    }
    e.stopPropagation()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <div
      className={cn(
        "group absolute rounded-lg border-2 px-4 py-3 shadow-lg transition-all",
        colors[node.level % colors.length],
        isSelected && "ring-2 ring-ring ring-offset-2 ring-offset-background",
      )}
      style={{
        left: node.x,
        top: node.y,
        cursor: "move",
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          autoFocus
          className="h-auto min-w-[120px] border-0 bg-transparent p-0 text-center font-medium focus-visible:ring-0"
        />
      ) : (
        <div className="min-w-[120px] text-center font-medium">{label}</div>
      )}

      {isSelected && (
        <Button
          size="icon"
          variant="ghost"
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleDeleteClick}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
