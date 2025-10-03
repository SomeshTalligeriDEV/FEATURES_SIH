import { Github, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-background py-16 px-4 border-t-4 border-foreground">
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full h-12">
          <path
            fill="currentColor"
            className="text-background"
            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,42.7C672,43,768,53,864,53.3C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            strokeWidth="3"
            stroke="currentColor"
            className="text-foreground"
          />
        </svg>
      </div>

      <div className="container mx-auto pt-8 relative z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4 relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-foreground animate-ink-drip" />
              <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center sketch-border border-foreground relative">
                <span className="text-2xl">🪷</span>
              </div>
              <span className="font-[family-name:var(--font-comic)] text-3xl comic-text">SARATHI</span>
            </div>
            <p className="text-base font-bold italic max-w-md mb-2">"Na hi jñānena sadṛśaṃ pavitram iha vidyate"</p>
            <p className="text-sm text-muted-foreground font-semibold">There is nothing as pure as knowledge</p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Youtube, label: "YouTube" },
            ].map((social) => {
              const Icon = social.icon
              return (
                <button
                  key={social.label}
                  className="w-12 h-12 rounded-full bg-card hover:bg-foreground hover:text-background transition-all sketch-border border-foreground flex items-center justify-center font-bold hover:scale-110 hover:animate-ink-splash group"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              )
            })}
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground font-bold transition-colors hover:scale-110 inline-block"
            >
              About
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground font-bold transition-colors hover:scale-110 inline-block"
            >
              Features
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground font-bold transition-colors hover:scale-110 inline-block"
            >
              Privacy
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground font-bold transition-colors hover:scale-110 inline-block"
            >
              Terms
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground font-bold transition-colors hover:scale-110 inline-block"
            >
              Contact
            </a>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-6 border-t-2 border-foreground w-full max-w-2xl">
            <p className="font-semibold mb-3">© 2025 SARATHI. All rights reserved. Made with ❤️ for Indian Students.</p>
            <div className="inline-flex items-center gap-2 sketch-border border-foreground px-4 py-2 bg-card">
              <span className="text-xs font-bold">⚡ Powered by Mistral AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
