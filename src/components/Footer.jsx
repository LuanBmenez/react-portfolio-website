import { ArrowUp, Github, Linkedin, Instagram, Code, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/LuanBmenez", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/luan-menezes/", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/luanbmenez/", icon: Instagram },
  ];

  const technologies = ["React", "JavaScript", "C#", "Node.js", "Tailwind CSS", "TypeScript"];

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Sobre", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projetos", href: "#projects" },
    { name: "Contato", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="py-16 px-4 bg-card/50 border-t border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Code className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Luan Menezes</h3>
                  <p className="text-xs text-muted-foreground">Desenvolvedor FullStack</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transformando ideias em realidade digital atraves de codigo limpo e solucoes inovadoras.
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Navegacao
              </h4>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300 w-fit"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Tecnologias
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Conecte-se
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                      aria-label={link.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                menezluan120@gmail.com
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 mb-8" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap justify-center">
              <span>&copy; {currentYear} Luan Menezes.</span>
              <span className="hidden sm:inline">Feito com</span>
              <Heart className="h-4 w-4 text-rose-500 inline" />
              <span className="hidden sm:inline">e muito codigo.</span>
            </p>

            <button 
              onClick={() => scrollToSection("#hero")}
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 group"
              aria-label="Voltar ao topo da pagina"
            >
              <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
