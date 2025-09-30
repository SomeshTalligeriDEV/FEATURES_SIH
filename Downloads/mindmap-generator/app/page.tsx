"use client"

import { MindMapCanvas } from "@/components/mind-map-canvas"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">
        <MindMapCanvas />
      </main>
    </div>
  )
}
