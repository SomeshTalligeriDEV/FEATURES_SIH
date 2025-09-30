"use client"

import type React from "react"

import { useCallback, useState, useRef, useEffect } from "react"
import { MindMapNode } from "./mind-map-node"
import { Toolbar } from "./toolbar"
import { GenerateDialog } from "./generate-dialog"
import { CanvasControls } from "./canvas-controls"

export interface MindMapNodeData {
  id: string
  label: string
  level: number
  x: number
  y: number
}

export interface MindMapEdge {
  source: string
  target: string
}

const initialNodes: MindMapNodeData[] = [
  {
    id: "1",
    label: "Central Idea",
    level: 0,
    x: 400,
    y: 300,
  },
]

const initialEdges: MindMapEdge[] = []

export function MindMapCanvas() {
  const [nodes, setNodes] = useState<MindMapNodeData[]>(initialNodes)
  const [edges, setEdges] = useState<MindMapEdge[]>(initialEdges)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggingNode, setDraggingNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const addNode = useCallback(() => {
    const parentNode = selectedNode ? nodes.find((n) => n.id === selectedNode) : null
    const level = parentNode ? parentNode.level + 1 : 0

    const newNode: MindMapNodeData = {
      id: `${Date.now()}`,
      label: "New Node",
      level,
      x: parentNode ? parentNode.x + 200 : 400 + Math.random() * 100,
      y: parentNode ? parentNode.y + 100 : 300 + Math.random() * 100,
    }

    setNodes((nds) => [...nds, newNode])

    if (parentNode) {
      const newEdge: MindMapEdge = {
        source: parentNode.id,
        target: newNode.id,
      }
      setEdges((eds) => [...eds, newEdge])
    }
  }, [nodes, selectedNode])

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId))
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
      if (selectedNode === nodeId) {
        setSelectedNode(null)
      }
    },
    [selectedNode],
  )

  const updateNodeLabel = useCallback((nodeId: string, label: string) => {
    setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, label } : node)))
  }, [])

  const clearCanvas = useCallback(() => {
    setNodes([])
    setEdges([])
    setSelectedNode(null)
  }, [])

  const exportAsJSON = useCallback(() => {
    const data = { nodes, edges }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mindmap.json"
    a.click()
    URL.revokeObjectURL(url)
  }, [nodes, edges])

  const generateMindMap = useCallback((generatedNodes: MindMapNodeData[], generatedEdges: MindMapEdge[]) => {
    setNodes(generatedNodes)
    setEdges(generatedEdges)
    setSelectedNode(null)
  }, [])

  const handleNodeMouseDown = useCallback(
    (nodeId: string, e: React.MouseEvent) => {
      e.stopPropagation()
      const node = nodes.find((n) => n.id === nodeId)
      if (node) {
        setDraggingNode(nodeId)
        setSelectedNode(nodeId)
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          setDragOffset({
            x: (e.clientX - rect.left - pan.x) / zoom - node.x,
            y: (e.clientY - rect.top - pan.y) / zoom - node.y,
          })
        }
      }
    },
    [nodes, zoom, pan],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingNode) {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          const x = (e.clientX - rect.left - pan.x) / zoom - dragOffset.x
          const y = (e.clientY - rect.top - pan.y) / zoom - dragOffset.y
          setNodes((nds) => nds.map((node) => (node.id === draggingNode ? { ...node, x, y } : node)))
        }
      } else if (isPanning) {
        setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        })
      }
    },
    [draggingNode, dragOffset, zoom, pan, isPanning, panStart],
  )

  const handleMouseUp = useCallback(() => {
    setDraggingNode(null)
    setIsPanning(false)
  }, [])

  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".canvas-background")) {
        setIsPanning(true)
        setPanStart({
          x: e.clientX - pan.x,
          y: e.clientY - pan.y,
        })
        setSelectedNode(null)
      }
    },
    [pan],
  )

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z * 1.2, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z / 1.2, 0.3))
  }, [])

  const handleResetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDraggingNode(null)
      setIsPanning(false)
    }
    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-background" ref={canvasRef}>
      {/* Background */}
      <div
        className="canvas-background absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(0.25 0 0) 1px, transparent 1px)`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      {/* Canvas Content */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          cursor: isPanning ? "grabbing" : draggingNode ? "grabbing" : "grab",
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Edges */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source)
            const targetNode = nodes.find((n) => n.id === edge.target)
            if (!sourceNode || !targetNode) return null

            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={sourceNode.x + 80}
                y1={sourceNode.y + 25}
                x2={targetNode.x + 80}
                y2={targetNode.y + 25}
                stroke="oklch(0.5 0 0)"
                strokeWidth="2"
                className="transition-all"
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <MindMapNode
            key={node.id}
            node={node}
            isSelected={selectedNode === node.id}
            onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
            onLabelChange={(label) => updateNodeLabel(node.id, label)}
            onDelete={() => deleteNode(node.id)}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute left-4 top-4 z-10">
        <Toolbar onAddNode={addNode} onClear={clearCanvas} onExport={exportAsJSON} />
      </div>

      <div className="absolute right-4 top-4 z-10">
        <GenerateDialog onGenerate={generateMindMap} />
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <CanvasControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleResetView} zoom={zoom} />
      </div>
    </div>
  )
}
