import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { format } from "date-fns";
import { Tag } from "./tag";
import { cn } from "~/lib/utils";

export interface PostCardProps {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  path: string;
  className?: string;
}

export function PostCard({
  title,
  date,
  description,
  tags = [],
  path,
  className,
}: PostCardProps) {
  const formattedDate = format(new Date(date), "MMMM d, yyyy");
  
  return (
    <Card className={cn("h-full transition-all hover:-translate-y-1", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold tracking-tight hover:text-primary">
          <Link to={`/blog${path}`}>
            {title}
          </Link>
        </CardTitle>
        <CardDescription>
          <time dateTime={date} className="text-sm text-muted-foreground">
            {formattedDate}
          </time>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {description && (
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        )}
      </CardContent>
      {tags.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Tag key={tag} name={tag} />
          ))}
        </CardFooter>
      )}
    </Card>
  );
}