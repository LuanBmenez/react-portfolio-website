import { X, Menu, Home, User, Code, Briefcase, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Sobre", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projetos", href: "#projects", icon: Briefcase },
  { name: "Contato", href: "#contact", icon: Mail },
];

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed w-full z-40 transition-all duration-500",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "py-5 bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a
          className="flex items-center gap-3 ml-4 group transition-all duration-300"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#hero");
          }}
          aria-label="Ir para o inicio da pagina"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-teal-400 rounded-xl flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
            <span className="text-primary-foreground font-bold text-lg">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              Luan Menezes
            </span>
            <span className="text-xs text-muted-foreground -mt-0.5">
              Desenvolvedor
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
          {navItems.map((item) => {
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
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  isActive
                    ? "text-primary-foreground bg-primary shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={cn(
            "md:hidden p-2.5 rounded-xl z-50 transition-all duration-300",
            isMenuOpen 
              ? "bg-primary text-primary-foreground" 
              : "bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-secondary/50",
          )}
          aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          aria-expanded={isMenuOpen}
        >
          <div className="relative w-5 h-5">
            <Menu
              size={20}
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100",
              )}
            />
            <X
              size={20}
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0",
              )}
            />
          </div>
        </button>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center",
            "transition-all duration-500 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          ref={menuRef}
        >
          <div className="flex flex-col items-center gap-2">
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
                    "flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 min-w-[200px]",
                    isActive
                      ? "text-primary-foreground bg-primary shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                >
                  <IconComponent size={20} />
                  <span className="font-medium text-lg">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
