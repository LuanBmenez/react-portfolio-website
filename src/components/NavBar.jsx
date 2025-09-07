import { X, Menu, Home, User, Code, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Sobre", href: "#about", icon: User },
  { name: "Habilidades", href: "#skills", icon: Code },
  { name: "Projetos", href: "#projects", icon: Briefcase },
  { name: "Contato", href: "#contact", icon: Mail },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY > 10);

        const sections = navItems.map((item) => item.href.replace("#", ""));
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold flex items-center gap-2 ml-4 group transition-all duration-300 hover:scale-105"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#hero");
          }}
          aria-label="Ir para o início da página"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-primary-foreground font-bold text-sm">L</span>
          </div>
          <div className="flex flex-col">
            <span className="text-primary group-hover:text-primary/80 transition-colors">
              Luan Menezes
            </span>
            <span className="text-xs text-foreground/60 -mt-1">
              Desenvolvedor
            </span>
          </div>
        </a>

        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.href.replace("#", "");

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group relative",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                <IconComponent
                  size={16}
                  className={cn(
                    "transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            "md:hidden p-2 text-foreground z-50 transition-all duration-300 rounded-lg",
            isMenuOpen ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
          )}
          aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={cn(
                "absolute transition-all duration-300",
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              )}
            />
            <X
              size={24}
              className={cn(
                "absolute transition-all duration-300",
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              )}
            />
          </div>
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-6 text-xl">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.href.replace("#", "");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={cn(
                    "flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-300 group",
                    isActive
                      ? "text-primary bg-primary/10 scale-105"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5 hover:scale-105"
                  )}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    transform: isMenuOpen
                      ? "translateY(0)"
                      : "translateY(20px)",
                  }}
                >
                  <IconComponent
                    size={20}
                    className={cn(
                      "transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
