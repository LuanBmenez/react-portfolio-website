import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Olá, eu sou </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              Luan
            </span>
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ml-2 opacity-0 animate-fade-in-delay-2">
              Menezes
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Como desenvolvedor fullstack, transformo ideias em experiências web completas. 
            Construo desde o backend até o frontend, criando soluções digitais inovadoras e funcionais.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a 
              href="#projects" 
              className="cosmic-button"
              aria-label="Ver meus projetos"
            >
              Ver Meus Projetos
            </a>
          </div>
        </div>
      </div>

      <a 
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce hover:text-primary transition-colors duration-300"
        aria-label="Rolar para baixo para ver mais conteúdo"
      >
        <span className="text-sm text-muted-foreground">Role para baixo</span>
        <ArrowDown className="h-5 w-5 text-primary mt-1"/>
      </a>
    </section>
  );
};
