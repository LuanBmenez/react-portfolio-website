import { ArrowUp, Github, Linkedin, Instagram, Code, Coffee } from "lucide-react";
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
    {
      name: "GitHub",
      href: "https://github.com/LuanBmenez",
      icon: Github,
      color: "hover:text-gray-400"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/luan-menezes/",
      icon: Linkedin,
      color: "hover:text-blue-500"
    },
    {
      name: "Email",
      href: "https://www.instagram.com/luanbmenez/",
      icon: Instagram,
      color: "hover:text-purple-500"
    }
  ];

  const technologies = ["React", "JavaScript", "C#", "Node.js", "Tailwind CSS","typescript"];

  return (
    <footer className="py-16 px-4 bg-card border-t border-border mt-12 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={cn(
          "transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Luan Menezes</h3>
                  <p className="text-sm text-muted-foreground">Desenvolvedor FullStack</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transformando ideias em realidade digital através de código limpo e soluções inovadoras.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-center">Conecte-se</h4>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target={link.name !== "Email" ? "_blank" : undefined}
                    rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                    className={cn(
                      "p-3 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-all duration-300 group",
                      link.color
                    )}
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                <p>menezluan120@gmail.com</p>
                <p>Disponível para novos projetos</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Coffee className="h-4 w-4" />
                <span>Feito com muito café e dedicação</span>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>&copy; {currentYear} Luan Menezes.</span>
              <span className="hidden sm:inline">Todos os direitos reservados.</span>
              <span className="sm:hidden">Todos os direitos reservados.</span>
            </div>

            <a 
              href="#hero" 
              className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 group hover:scale-110"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
