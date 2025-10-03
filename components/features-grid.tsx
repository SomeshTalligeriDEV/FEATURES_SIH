"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Brain, Timer, Users, BookText, Heart, Calendar, Video, CreditCard, Trophy } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: MessageSquare,
    title: "AI Chatbot",
    description: "Your guide in any language – always ready!",
    details: "Powered by advanced AI, get instant answers to your questions in any Indian language, 24/7.",
    sketch: "Speech bubble with smiling student",
  },
  {
    icon: Brain,
    title: "Mind Map Generator",
    description: "Sketch your ideas into clarity.",
    details: "Transform complex topics into visual mind maps that make learning fun and memorable.",
    sketch: "Brain with connected nodes",
  },
  {
    icon: Timer,
    title: "Pomodoro App",
    description: "Focus sprints to beat the clock.",
    details: "Stay focused with scientifically-proven time management technique. Work smart, not hard!",
    sketch: "Clock with lightning bolts",
  },
  {
    icon: Users,
    title: "Study Camp",
    description: "AI-moderated group study – distraction-free.",
    details: "Join virtual study rooms with AI moderation to keep everyone focused and productive.",
    sketch: "Students in circle with AI moderator",
  },
  {
    icon: BookText,
    title: "Notebook LLM",
    description: "Smart notes powered by Mistral AI.",
    details: "Your notes become intelligent with AI-powered summaries, insights, and connections.",
    sketch: "Notebook with glowing pages",
  },
  {
    icon: Heart,
    title: "Community",
    description: "Connect with fellow learners.",
    details: "Join thousands of students sharing resources, tips, and motivation on your journey.",
    sketch: "Hearts connecting students",
  },
  {
    icon: Calendar,
    title: "Study Timetable Generator",
    description: "Custom plans with WhatsApp updates.",
    details: "AI creates optimal study schedules based on your goals and sends reminders via WhatsApp.",
    sketch: "Calendar with checkmarks",
  },
  {
    icon: Video,
    title: "Text-to-Video Generator",
    description: "Turn notes into video stories.",
    details: "Convert your study notes into dynamic video content for better retention and understanding.",
    sketch: "Film strip with notes",
  },
  {
    icon: CreditCard,
    title: "Flashcards Generator",
    description: "Quick prep for exam wins.",
    details: "AI-generated flashcards for rapid revision. Perfect for last-minute exam preparation!",
    sketch: "Stack of cards with stars",
  },
  {
    icon: Trophy,
    title: "Exam Companion Mode",
    description: "5-year paper insights via Mistral AI.",
    details: "Analyze past papers, identify patterns, and get AI-powered predictions for upcoming exams.",
    sketch: "Trophy with exam papers",
  },
]

export function FeaturesGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const linkByTitle: Record<string, string> = {
    "AI Chatbot": "https://saarathi-bot.vercel.app/",
    "Mind Map Generator": "https://mindmap-generator-two.vercel.app/",
    "Flashcards Generator": "https://flash-notes-omega.vercel.app/",
  }

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden cross-hatch">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Twinkling stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
        {/* Shooting stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto mb-20 text-center relative z-10">
        <div className="inline-block comic-panel-jagged border-foreground bg-card p-8 mb-8">
          <h2 className="font-[family-name:var(--font-comic)] text-6xl md:text-8xl comic-text">
            Your Arsenal of Tools
          </h2>
        </div>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-semibold">
          Everything you need to conquer the exam battlefield
        </p>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hoveredCard === index

            return (
              <div
                key={index}
                className="flip-card h-80"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  const link = linkByTitle[feature.title]
                  if (link) window.open(link, "_blank", "noopener,noreferrer")
                }}
              >
                <div className="flip-card-inner h-full">
                  <Card
                    className={`flip-card-front sketch-border border-foreground transition-all duration-300 cursor-pointer bg-card h-full relative overflow-hidden ${
                      isHovered ? "animate-panel-zoom" : ""
                    }`}
                  >
                    <div className="absolute inset-0 ink-texture opacity-50" />

                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`bg-background p-5 rounded-full sketch-border border-foreground ${
                            isHovered ? "animate-float-gentle" : ""
                          } relative`}
                        >
                          <Icon className="h-10 w-10" />
                          {isHovered && (
                            <div className="absolute inset-0 text-4xl opacity-30 animate-ink-splash">●</div>
                          )}
                        </div>
                        <div className="text-xs font-bold opacity-50">#{String(index + 1).padStart(2, "0")}</div>
                      </div>
                      <CardTitle className="text-3xl font-bold text-card-foreground comic-text-outline">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-lg text-muted-foreground font-medium">
                        {feature.description}
                      </CardDescription>
                      <p className="text-sm text-muted-foreground/70 mt-4 italic">
                        {isHovered ? "Flipping..." : "Hover to learn more..."}
                      </p>
                    </CardContent>

                    {isHovered && (
                      <div className="absolute top-2 right-2 text-4xl font-bold opacity-30 animate-shake">POW!</div>
                    )}
                  </Card>

                  <Card className="flip-card-back comic-panel-jagged border-foreground bg-card h-full flex items-center justify-center p-8">
                    <div className="text-center relative">
                      <div className="absolute inset-0 cross-hatch opacity-30" />
                      <div className="relative z-10">
                        <Icon className="h-16 w-16 mx-auto mb-6 animate-float-gentle" />
                        <h3 className="text-2xl font-bold mb-4 text-card-foreground comic-text">{feature.title}</h3>
                        <p className="text-base text-card-foreground/90 font-medium leading-relaxed">
                          {feature.details}
                        </p>
                        <div className="mt-6 text-xs text-muted-foreground italic">Illustration: {feature.sketch}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
