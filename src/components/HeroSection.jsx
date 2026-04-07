import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Desenvolvedor FullStack";
  const typingSpeed = 80;
  const pauseDuration = 2500;

  useEffect(() => {
    let timeout;

    if (isTyping) {
      if (currentText.length < fullText.length) {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium opacity-0 animate-fade-in backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Disponivel para novos projetos
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <span className="opacity-0 animate-fade-in block text-muted-foreground text-2xl sm:text-3xl font-normal mb-4">
              Ola, eu sou
            </span>
            <span className="opacity-0 animate-fade-in-delay-1 block">
              Luan{" "}
              <span className="text-gradient">
                Menezes
              </span>
            </span>
          </h1>

          {/* Typing effect */}
          <div className="h-12 flex items-center justify-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground opacity-0 animate-fade-in-delay-2">
              {currentText}
              <span
                className={cn(
                  "ml-0.5 inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-primary align-middle",
                  showCursor ? "opacity-100" : "opacity-0"
                )}
              />
            </span>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-delay-3">
            Transformo ideias em experiencias web completas. Construo desde o
            backend ate o frontend, criando solucoes digitais inovadoras e
            funcionais.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto opacity-0 animate-fade-in-delay-4">
            {[
              { value: "2+", label: "Anos de estudo" },
              { value: "10+", label: "Tecnologias" },
              { value: "3+", label: "Projetos" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 opacity-0 animate-fade-in-delay-5">
            <a
              href="#projects"
              className="cosmic-button group inline-flex items-center justify-center gap-2"
              aria-label="Ver meus projetos"
            >
              <Briefcase className="h-4 w-4 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
              Ver Projetos
              <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-foreground hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
              aria-label="Entrar em contato"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Contato
            </a>
            <a
              href="/curriculo-luan-menezes.pdf"
              download="Curriculo_Luan_Menezes.pdf"
              className="px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-foreground hover:bg-secondary/80 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
              aria-label="Baixar curriculo, PDF"
            >
              <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" aria-hidden="true" />
              Curriculo
            </a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-3 pt-4 opacity-0 animate-fade-in-delay-6">
            <a
              href="https://github.com/LuanBmenez"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/luan-menezes/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center group opacity-0 animate-fade-in-delay-7"
        aria-label="Rolar para baixo"
      >
        <span className="text-xs text-muted-foreground mb-2 group-hover:text-primary transition-colors duration-300 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 flex justify-center pt-2 transition-colors duration-300">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
};
