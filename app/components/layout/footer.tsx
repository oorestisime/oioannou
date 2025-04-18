import { Link } from "react-router";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border bg-card py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Orestis Ioannou. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/oorestisime"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <div className="text-xs text-muted-foreground">
              <span>Built with </span>
              <a 
                href="https://react.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary underline"
              >
                React
              </a>
              <span> + </span>
              <span role="img" aria-label="coffee">☕</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}