"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, BookOpen, Zap } from "lucide-react"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!starsRef.current) return

    const createStars = () => {
      const container = starsRef.current
      if (!container) return

      container.innerHTML = ""

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div")
        star.className = "star"
        star.style.width = `${Math.random() * 3}px`
        star.style.height = star.style.width
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        star.style.animationDuration = `${Math.random() * 3 + 2}s`
        star.style.animationDelay = `${Math.random() * 3}s`
        container.appendChild(star)
      }

      for (let i = 0; i < 3; i++) {
        const shootingStar = document.createElement("div")
        shootingStar.className = "shooting-star"
        shootingStar.style.width = `${Math.random() * 100 + 50}px`
        shootingStar.style.left = `${Math.random() * 50}%`
        shootingStar.style.top = `${Math.random() * 50}%`
        shootingStar.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(shootingStar)
      }
    }

    createStars()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden space-background">
      <div ref={starsRef} className="stars" />

      <div className="absolute inset-0 wave-pattern opacity-30 pointer-events-none" />

      <div className="absolute top-20 left-10 text-9xl opacity-10 animate-float-gentle">●</div>
      <div
        className="absolute top-40 right-20 text-7xl opacity-10 animate-float-gentle"
        style={{ animationDelay: "1s" }}
      >
        ●
      </div>
      <div
        className="absolute bottom-40 left-1/4 text-8xl opacity-10 animate-float-gentle"
        style={{ animationDelay: "2s" }}
      >
        ●
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center lg:text-left">
          <div className="mb-12 relative flex justify-center items-center lg:float-left lg:w-1/2 lg:pr-8 lg:mb-0 lg:justify-start">
            <div className="relative">
              <div className="absolute inset-0 w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-float-gentle" />
                <div
                  className="absolute inset-8 border-3 border-white/20 rounded-full animate-float-gentle"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute inset-16 border-2 border-white/10 rounded-full animate-float-gentle"
                  style={{ animationDelay: "1s" }}
                />
              </div>

              <div className="w-full max-w-[40rem] h-[28rem] lg:h-[42rem] xl:h-[48rem] overflow-hidden mx-auto mb-6 relative sketch-border border-white shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                <img
                  src="/stress.jpg"
                  alt="SARATHI - Students as Warriors with Digital Krishna"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-white/30 rounded-lg -z-10 animate-wave-ripple" />
              </div>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-comic)] text-7xl md:text-9xl lg:text-[10rem] mb-8 comic-text text-white leading-tight animate-bounce-in lg:ml-auto lg:w-1/2 lg:text-left">
            SARATHI
          </h1>

          <div className="mb-8 relative inline-block max-w-4xl lg:ml-auto lg:w-1/2 lg:block">
            <div className="speech-bubble bg-gradient-to-br from-white to-gray-100">
              <p
                className="sanskrit-text text-3xl md:text-4xl lg:text-5xl"
                data-text="Na hi jñānena sadṛśaṃ pavitram iha vidyate"
              >
                Na hi jñānena sadṛśaṃ pavitram iha vidyate
              </p>
              <p className="text-lg md:text-xl text-gray-800 mt-4 font-semibold italic">
                "There is nothing as pure as knowledge"
              </p>
            </div>
          </div>

          <div className="relative inline-block mb-8 max-w-4xl lg:ml-auto lg:w-1/2 lg:block">
            <div className="comic-panel-jagged border-white bg-black/80 backdrop-blur-sm p-8 md:p-12 transform hover:scale-105 transition-transform duration-300">
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance comic-text">
                The Digital Krishna for Students
              </p>
              <p className="text-lg md:text-2xl text-gray-300 mt-4 font-semibold">
                Guiding you through the battlefield of exams and beyond
              </p>
              <p className="text-base md:text-lg text-gray-400 mt-2 font-medium">
                In every Indian language • Online & Offline
              </p>
            </div>
          </div>

          <div className="mb-12 flex justify-center lg:ml-auto lg:w-1/2 lg:justify-start">
            <div className="testimonial-card max-w-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-3xl border-4 border-black overflow-hidden">
                  <img src="/girl.jpg" alt="Priya Sharma" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-base md:text-lg text-black font-medium italic mb-3">
                    "SARATHI transformed my preparation! The AI chatbot in Hindi helped me understand complex biology
                    concepts."
                  </p>
                  <div>
                    <p className="font-bold text-black text-lg">Priya Sharma</p>
                    <p className="text-sm text-black font-semibold">NEET Aspirant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center items-center mb-12 lg:ml-auto lg:w-1/2 lg:justify-start">
            <Button
              size="lg"
              className="bg-foreground text-background comic-panel border-foreground text-xl px-10 py-7 font-bold transition-all hover:scale-110 hover:animate-ink-splash group relative"
            >
              <Sparkles className="mr-2 h-6 w-6 group-hover:animate-spin" />
              <span>Explore Features</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background text-foreground comic-panel border-foreground text-xl px-10 py-7 font-bold transition-all hover:scale-110 hover:animate-wave-ripple relative"
            >
              <BookOpen className="mr-2 h-6 w-6" />
              <span>Join Community</span>
            </Button>
            <Button
              size="lg"
              className="bg-foreground text-background comic-panel border-foreground text-xl px-10 py-7 font-bold transition-all hover:scale-110 animate-float-gentle relative"
            >
              <Zap className="mr-2 h-6 w-6" />
              <span>Start Your Journey</span>
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 sketch-border border-white px-8 py-4 bg-black/60 backdrop-blur-sm relative lg:ml-auto lg:w-1/2">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-white animate-ink-drip" />
            <span className="text-base font-bold text-white">🇮🇳 Available in Every Indian Language</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24">
          <path
            fill="currentColor"
            className="text-foreground"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            strokeWidth="3"
            stroke="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
