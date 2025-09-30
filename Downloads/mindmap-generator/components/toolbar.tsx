"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2, Download } from "lucide-react"

interface ToolbarProps {
  onAddNode: () => void
  onClear: () => void
  onExport: () => void
}

export function Toolbar({ onAddNode, onClear, onExport }: ToolbarProps) {
  return (
    <div className="flex gap-2 rounded-lg border border-border bg-card p-2 shadow-lg">
      <Button onClick={onAddNode} size="sm" variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add Node
      </Button>
      <Button onClick={onExport} size="sm" variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button onClick={onClear} size="sm" variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Clear
      </Button>
    </div>
  )
}
