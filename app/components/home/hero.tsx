import { Github, Linkedin, Twitter } from "lucide-react"
import { cn } from "~/lib/utils"

interface HeroProps {
  image: string
}

export function Hero({ image }: HeroProps) {
  return (
    <section
      className={cn(
        "min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-12"
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {image && (
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-primary/40">
              <img
                src={image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-4 text-center md:text-left",
            image ? "order-2 md:order-1" : ""
          )}
        >
          <div className="terminal p-4 mb-2">
            <div className="terminal-header">$ uname -a</div>
            <div className="command-output">
              <span className="highlight-text">
                Principal Engineer @ Bold.org | Based in Cyprus
              </span>
            </div>
            <div className="terminal-header py-1">
              $ alias me="tech + coffee + good vibes"
            </div>
            <div className="terminal-header py-1">$ coffee --status</div>
            <div className="command-output">
              <span className="highlight-text">☕️ brewing...</span>
            </div>
            <div className="terminal-header py-1">$ cat ~/now</div>
            <div className="command-output">
              <span className="highlight-text">
                Refining architecture. Reviewing PRs. Sipping coffee.
              </span>
            </div>

            <div className="terminal-header py-1">$ find --me</div>
            <div className="command-output">
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://github.com/oorestisime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight-text"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com/oorestisime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight-text"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/oorestisime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="highlight-text"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
