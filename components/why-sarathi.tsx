"use client"

import { CheckCircle2, TrendingUp, Users, Zap } from "lucide-react"

const journeySteps = [
  {
    icon: "😰",
    title: "The Struggle",
    description: "Overwhelmed by syllabus, scattered resources, no clear direction",
  },
  {
    icon: "🤝",
    title: "Meet SARATHI",
    description: "Your AI companion arrives with personalized guidance and smart tools",
  },
  {
    icon: "📚",
    title: "Organized Learning",
    description: "Smart timetables, AI notes, mind maps - everything in one place",
  },
  {
    icon: "🚀",
    title: "Accelerated Growth",
    description: "Track progress, join study camps, master concepts faster",
  },
  {
    icon: "🏆",
    title: "Victory!",
    description: "Ace your exams with confidence, backed by AI-powered preparation",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    role: "NEET Aspirant",
    quote: "SARATHI transformed my preparation! The AI chatbot in Hindi helped me understand complex biology concepts.",
    avatar: "👩‍🎓",
    avatarSrc: "/girl.jpg",
  },
  {
    name: "Rahul Verma",
    role: "JEE Student",
    quote: "Mind maps and exam companion mode are game-changers. Scored 98 percentile!",
    avatar: "👨‍🎓",
    avatarSrc: "/boy1.jpg",
  },
  {
    name: "Ananya Patel",
    role: "UPSC Aspirant",
    quote: "Study camps keep me accountable. The community support is incredible!",
    avatar: "👩‍💼",
    avatarSrc: "/boy2.jpg",
  },
]

const stats = [
  { icon: Users, value: "50K+", label: "Active Students" },
  { icon: CheckCircle2, value: "1M+", label: "Questions Answered" },
  { icon: TrendingUp, value: "95%", label: "Success Rate" },
  { icon: Zap, value: "24/7", label: "AI Support" },
]

export function WhySarathi() {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden ink-texture">
      <div className="absolute inset-0 pointer-events-none cross-hatch opacity-20" />
      <div className="absolute top-20 left-10 text-9xl opacity-5 animate-float-gentle">●</div>
      <div
        className="absolute bottom-20 right-10 text-8xl opacity-5 animate-float-gentle"
        style={{ animationDelay: "1s" }}
      >
        ●
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block comic-panel-jagged border-foreground bg-card p-8 mb-6">
            <h2 className="font-[family-name:var(--font-comic)] text-6xl md:text-8xl comic-text">Why SARATHI?</h2>
          </div>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-semibold">
            Your journey from struggle to success
          </p>
        </div>

        <div className="mb-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative">
                {index < journeySteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-20 text-4xl -translate-y-1/2 animate-float-gentle">
                    ➜
                  </div>
                )}

                <div className="comic-panel border-foreground bg-card rounded-2xl p-6 text-center hover:scale-105 hover:animate-panel-zoom transition-all duration-300 cursor-pointer relative overflow-hidden h-full">
                  <div className="absolute inset-0 ink-texture opacity-30" />
                  <div className="relative z-10">
                    <div className="text-6xl mb-4 animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 comic-text-outline">{step.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{step.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-card sketch-border border-foreground rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 cross-hatch opacity-10" />
                  <Icon className="h-12 w-12 mx-auto mb-4 animate-float-gentle" />
                  <div className="text-4xl font-bold mb-2 comic-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block comic-panel border-foreground bg-card px-8 py-4">
              <h3 className="font-[family-name:var(--font-comic)] text-4xl md:text-5xl comic-text">
                Student Success Stories
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="speech-bubble hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 ink-texture opacity-20" />
                  <div className="relative z-10">
                    {testimonial.avatarSrc ? (
                      <img
                        src={testimonial.avatarSrc}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-black"
                      />
                    ) : (
                      <div className="text-6xl mb-4">{testimonial.avatar}</div>
                    )}
                    <p className="text-base text-black mb-6 italic leading-relaxed font-medium">
                      "{testimonial.quote}"
                    </p>
                    <div className="font-bold text-black">{testimonial.name}</div>
                    <div className="text-sm text-black">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
