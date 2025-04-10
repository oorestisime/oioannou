import { cn } from "~/lib/utils";
import { ExternalLink, Github, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export interface ProjectCardProps {
  name: string;
  url: string;
  description: string;
  language?: string;
  stars?: number;
  homepage?: string;
  className?: string;
}

export function ProjectCard({
  name,
  url,
  description,
  language,
  stars,
  homepage,
  className,
}: ProjectCardProps) {
  // Generate a color based on language
  const getLanguageColor = (lang?: string) => {
    if (!lang) return "bg-muted";
    
    const languageColors: Record<string, string> = {
      JavaScript: "bg-[#f6c90e]", // Gold
      TypeScript: "bg-[#00c896]", // Teal
      Python: "bg-[#d81b9c]",     // Magenta
      Java: "bg-orange-500",
      Rust: "bg-red-500",
      Go: "bg-cyan-500",
      Ruby: "bg-pink-500",
      PHP: "bg-purple-500",
      HTML: "bg-amber-500",
      CSS: "bg-indigo-500",
    };
    
    return languageColors[lang] || "bg-[#00c896]";
  };

  return (
    <Card className={cn("h-full transition-transform hover:-translate-y-1", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-primary">{name}</CardTitle>
          <div className="flex gap-2">
            {homepage && (
              <a
                href={homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent"
                aria-label="Visit project homepage"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
              aria-label="GitHub repository"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Terminal-inspired details */}
        <div className="terminal text-sm">
          <div className="terminal-header">$ git info</div>
          <div className="command-output">
            <span className="text-[#f6c90e]">Repository:</span> {name}<br />
            {language && (<><span className="text-[#00c896]">Language:</span> {language}<br /></>)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        {language && (
          <div className="flex items-center gap-2">
            <span className={cn("w-3 h-3 rounded-full", getLanguageColor(language))}></span>
            <span className="text-xs text-muted-foreground">{language}</span>
          </div>
        )}
        
        {stars !== undefined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 text-[#f6c90e]" />
            <span>{stars}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}