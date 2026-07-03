import {
  Code,
  User,
  Download,
  Award,
  Heart,
  BookOpen,
  Gamepad2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import resumePdf from "@/assets/Curriculo_Luan_Menezes.pdf";
import Stats from "./ui/stats";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    months: 0,
    projects: 0,
    technologies: 0,
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setAnimatedStats({ months: 28, projects: 30, technologies: 12 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setAnimatedStats({ months: 28, projects: 30, technologies: 12 });
          }, 500);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="py-24 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="text-primary">mim</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça minha jornada na tecnologia e minha paixão por criar
            soluções digitais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div
            className={cn(
              "space-y-8 transition-all duration-1000 delay-200",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8",
            )}
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Luan Menezes</h3>
                  <p className="text-primary font-medium">
                    Desenvolvedor FullStack
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                Olá! Sou Luan, um desenvolvedor fullstack de 23 anos, embarcando
                em uma empolgante transição de carreira para o dinâmico mundo da
                tecnologia. Com{" "}
                <span className="text-primary font-semibold">
                  {animatedStats.months} meses
                </span>{" "}
                de trabalho dedicado , já possuo um sólido domínio em
                JavaScript, React para o desenvolvimento web, e C# para soluções
                robustas de backend.
              </p>

              <Stats
                months={animatedStats.months}
                projects={animatedStats.projects}
                technologies={animatedStats.technologies}
                visible={isVisible}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="cosmic-button group flex items-center gap-2 justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Ir para seção de contato"
              >
                <Heart
                  className="h-4 w-4 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                  focusable="false"
                />
                Entre em contato
              </a>
              <a
                href={resumePdf}
                download="Curriculo_Luan_Menezes.pdf"
                className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-2 justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Baixar currículo, PDF"
              >
                <Download
                  className="h-4 w-4 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                  focusable="false"
                />
                Baixar currículo
              </a>
            </div>
          </div>

          <div
            className={cn(
              "space-y-6 transition-all duration-1000 delay-400",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8",
            )}
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Especialidades
              </h3>

              <div className="gradient-border p-6 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg mb-2">
                      Desenvolvedor FullStack
                    </h4>
                    <p className="text-muted-foreground">
                      Transformando ideias em realidade digital, construo
                      aplicações web completas e robustas, atuando do backend ao
                      frontend com tecnologias modernas.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        React
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        JavaScript
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        C#
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Node.js
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gradient-border p-6 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg mb-2">
                      Estudante de ADS
                    </h4>
                    <p className="text-muted-foreground">
                      Estudante de Análise e Desenvolvimento de Sistemas, onde
                      construo uma base sólida sobre o mundo da programação e
                      desenvolvimento de software.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                        ADS
                      </span>
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                        Algoritmos
                      </span>
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                        Estruturas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gradient-border p-6 card-hover group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                    <Gamepad2 className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg mb-2">
                      Desenvolvedor de Jogos
                    </h4>
                    <p className="text-muted-foreground">
                      Com paixão por criar mundos imersivos e experiências
                      interativas, sou um desenvolvedor de jogos focado em
                      Unity.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full">
                        Unity
                      </span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full">
                        C#
                      </span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-xs rounded-full">
                        Game Design
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
