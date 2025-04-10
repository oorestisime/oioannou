import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { Tag } from "./tag";

interface PostContentProps {
  title: string;
  date: string;
  content: string;
  tags?: string[];
  className?: string;
}

export function PostContent({
  title,
  date,
  content,
  tags = [],
  className,
}: PostContentProps) {
  const formattedDate = format(new Date(date), "MMMM d, yyyy");
  
  return (
    <article className={cn("max-w-none", className)}>
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={date}>{formattedDate}</time>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
        </div>
      </header>

      
      <div 
        className="prose prose-invert max-w-none prose-headings:text-foreground prose-headings:font-bold
                 prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6
                 prose-strong:text-primary prose-em:text-foreground/80
                 prose-code:text-accent prose-code:bg-secondary/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-normal
                 prose-pre:bg-secondary/20 prose-pre:border prose-pre:border-border prose-pre:rounded-md
                 prose-blockquote:text-muted-foreground prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:italic
                 prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                 prose-img:rounded-md prose-img:border prose-img:border-border
                 prose-hr:border-border
                 prose-li:text-foreground/90 prose-li:my-2
                 prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:mt-10 prose-h1:mb-6
                 prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-4
                 prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:mb-3"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}