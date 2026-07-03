import { X, Menu, Home, User, Code, Briefcase, Mail, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, useCallback } from "react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Sobre", href: "#about", icon: User },
  { name: "Experiência", href: "#experience", icon: Building },
  { name: "Habilidades", href: "#skills", icon: Code },
  { name: "Projetos", href: "#projects", icon: Briefcase },
  { name: "Contato", href: "#contact", icon: Mail },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  // small scroll listener to toggle compact nav
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for scroll-spy (active section)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = navItems.map((i) => i.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: [0.25, 0.5, 0.75] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // focus trap and keyboard handling for mobile menu
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;
    const focusableSelector = 'a, button, [tabindex]:not([tabindex="-1"])';
    const nodes = Array.from(menuRef.current.querySelectorAll(focusableSelector)).filter(
      (n) => !n.hasAttribute("disabled"),
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    first?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Tab") {
        if (nodes.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      } else if (e.key === "Escape") {
        setIsMenuOpen(false);
        setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous || "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
    // return focus to menu button for accessibility
    setTimeout(() => menuButtonRef.current?.focus(), 0);
  };
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5",
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
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group relative",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5",
                )}
              >
                <IconComponent
                  size={16}
                  className={cn(
                    "transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110",
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
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            "md:hidden p-2 text-foreground z-50 transition-all duration-300 rounded-lg",
            isMenuOpen ? "bg-primary/10 text-primary" : "hover:bg-primary/5",
          )}
          aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={cn(
                "absolute transition-all duration-300",
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
              )}
            />
            <X
              size={24}
              className={cn(
                "absolute transition-all duration-300",
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
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
              : "opacity-0 pointer-events-none",
          )}
          ref={menuRef}
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
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-300 group",
                    isActive
                      ? "text-primary bg-primary/10 scale-105"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5 hover:scale-105",
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
                      isActive ? "scale-110" : "group-hover:scale-110",
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
