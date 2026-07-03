import { cn } from "@/lib/utils";

export const SocialLink = ({ href, icon: Icon, ariaLabel, className, iconClassName }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "p-3 rounded-full bg-secondary/50 hover:bg-primary/10 transition-all duration-300 group",
        className
      )}
    >
      <Icon 
        className={cn(
          "h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all",
          iconClassName
        )} 
      />
    </a>
  );
};
