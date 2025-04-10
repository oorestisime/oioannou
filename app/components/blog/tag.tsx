import { Link } from "react-router";
import { cn } from "~/lib/utils";

interface TagProps {
  name: string;
  className?: string;
  count?: number;
  onClick?: () => void;
  isActive?: boolean;
}

export function Tag({ name, className, count, onClick, isActive }: TagProps) {
  const content = (
    <>
      {name}
      {count !== undefined && (
        <span className="ml-1 text-xs text-muted-foreground">({count})</span>
      )}
    </>
  );
  
  // Calculate tag color
  const tagColor = getTagColor(name);
  const activeStyle = isActive 
    ? { backgroundColor: tagColor.color, color: "#0F2419" }
    : { backgroundColor: tagColor.bgColor, color: tagColor.color };
  
  const baseClasses = cn(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
    onClick ? "cursor-pointer" : "",
    className
  );
  
  if (onClick) {
    return (
      <button 
        className={baseClasses}
        onClick={onClick}
        type="button"
        style={activeStyle}
      >
        {content}
      </button>
    );
  }
  
  return (
    <Link 
      to={`/tags/${name.toLowerCase()}`}
      className={baseClasses}
      style={{ backgroundColor: tagColor.bgColor, color: tagColor.color }}
    >
      {content}
    </Link>
  );
}

// Generate consistent but random-appearing colors for tags
function getTagColor(tag: string) {
  // Simple hash function for the tag name
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Adjust to fit the color theme
  const colors = [
    { color: "#00c896", bgColor: "rgba(0, 200, 150, 0.15)" },     // Teal (primary)
    { color: "#d81b9c", bgColor: "rgba(216, 27, 156, 0.15)" },    // Magenta (accent)
    { color: "#f6c90e", bgColor: "rgba(246, 201, 14, 0.15)" }     // Gold (highlight)
  ];
  
  // Choose a color based on the hash
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}