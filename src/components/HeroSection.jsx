import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Code,
  Briefcase,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Desenvolvedor FullStack";
  const typingSpeed = 100;
  const pauseDuration = 2000;

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
  }, [currentText, isTyping, fullText, typingSpeed, pauseDuration]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium opacity-0 animate-fade-in">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Disponível para novos projetos
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="opacity-0 animate-fade-in block sm:inline">
              Olá, eu sou{" "}
            </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1 block sm:inline">
              Luan
            </span>
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent sm:ml-2 opacity-0 animate-fade-in-delay-2 block sm:inline">
              Menezes
            </span>
          </h1>

          <div className="h-16 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground opacity-0 animate-fade-in-delay-3">
              {currentText}
              <span
                className={cn(
                  "ml-1 text-primary",
                  showCursor ? "opacity-100" : "opacity-0"
                )}
              >
                |
              </span>
            </span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-delay-4">
            Transformo ideias em experiências web completas. Construo desde o
            backend até o frontend, criando soluções digitais inovadoras e
            funcionais.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto opacity-0 animate-fade-in-delay-5">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground">
                Anos de estudo
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Tecnologias</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">Projetos</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0 animate-fade-in-delay-6">
            <a
              href="#projects"
              className="cosmic-button group flex items-center gap-2"
              aria-label="Ver meus projetos"
            >
              <Briefcase className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              Ver Projetos
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 group"
              aria-label="Entrar em contato"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Contato
            </a>
            <a
              href="/Curriculo Luan Menezes.pdf"
              download="Curriculo-Luan-Menezes.pdf"
              className="px-6 py-3 rounded-full border border-border text-foreground hover:bg-secondary transition-all duration-300 flex items-center gap-2 group"
              aria-label="Baixar currículo"
            >
              <Download className="h-4 w-4 group-hover:scale-110 transition-transform" />
              CV
            </a>
          </div>

          {/* Redes sociais */}
          <div className="flex justify-center gap-4 pt-4 opacity-0 animate-fade-in-delay-7">
            <a
              href="https://github.com/LuanBmenez"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary/10 transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
            </a>
            <a
              href="https://www.linkedin.com/in/luan-menezes/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 hover:bg-primary/10 transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center group animate-bounce hover:text-primary transition-all duration-300"
        aria-label="Rolar para baixo para ver mais conteúdo"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
            Role para baixo
          </span>
          <div className="relative">
            <ArrowDown className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 h-5 w-5 border border-primary/30 rounded-full animate-ping" />
          </div>
        </div>
      </a>
    </section>
  );
};
