import { Code, User, Download, Award, Heart, BookOpen, Gamepad2, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import resumePdf from "@/assets/Curriculo_Luan_Menezes.pdf";

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
      setAnimatedStats({ months: 22, projects: 25, technologies: 8 });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setAnimatedStats({ months: 22, projects: 25, technologies: 8 });
          }, 500);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const specialties = [
    {
      icon: Code,
      title: "Desenvolvedor FullStack",
      description: "Transformando ideias em realidade digital, construo aplicacoes web completas e robustas, atuando do backend ao frontend.",
      tags: ["React", "JavaScript", "C#", "Node.js"],
      color: "primary",
    },
    {
      icon: BookOpen,
      title: "Estudante de ADS",
      description: "Estudante de Analise e Desenvolvimento de Sistemas, construindo uma base solida sobre programacao e desenvolvimento.",
      tags: ["ADS", "Algoritmos", "Estruturas"],
      color: "emerald",
    },
    {
      icon: Gamepad2,
      title: "Desenvolvedor de Jogos",
      description: "Com paixao por criar mundos imersivos e experiencias interativas, sou um desenvolvedor de jogos focado em Unity.",
      tags: ["Unity", "C#", "Game Design"],
      color: "violet",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: "bg-primary/10",
        bgHover: "group-hover:bg-primary/20",
        text: "text-primary",
        tagBg: "bg-primary/10",
        tagText: "text-primary",
      },
      emerald: {
        bg: "bg-emerald-500/10",
        bgHover: "group-hover:bg-emerald-500/20",
        text: "text-emerald-500",
        tagBg: "bg-emerald-500/10",
        tagText: "text-emerald-500",
      },
      violet: {
        bg: "bg-violet-500/10",
        bgHover: "group-hover:bg-violet-500/20",
        text: "text-violet-500",
        tagBg: "bg-violet-500/10",
        tagText: "text-violet-500",
      },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section
      id="about"
      className="py-28 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-20 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Sobre mim
          </span>
          <h2 className="section-title">
            Conheca minha{" "}
            <span className="text-gradient">jornada</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Minha paixao por criar solucoes digitais e minha trajetoria na tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column - About text */}
          <div
            className={cn(
              "space-y-8 transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            {/* Profile card */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center shadow-lg shadow-primary/25">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Luan Menezes</h3>
                  <p className="text-primary font-medium">Desenvolvedor FullStack</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                Ola! Sou Luan, um desenvolvedor fullstack de 23 anos, embarcando
                em uma empolgante transicao de carreira para o dinamico mundo da
                tecnologia. Com{" "}
                <span className="text-primary font-semibold">
                  {animatedStats.months} meses
                </span>{" "}
                de estudo dedicado e pratico, ja possuo um solido dominio em
                JavaScript, React para o desenvolvimento web, e C# para solucoes
                robustas de backend.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{animatedStats.months}+</div>
                  <div className="text-xs text-muted-foreground">Meses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{animatedStats.projects}+</div>
                  <div className="text-xs text-muted-foreground">Projetos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{animatedStats.technologies}+</div>
                  <div className="text-xs text-muted-foreground">Techs</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="cosmic-button group inline-flex items-center justify-center gap-2"
                aria-label="Ir para secao de contato"
              >
                <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                Entre em contato
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
              <a
                href={resumePdf}
                download="Curriculo_Luan_Menezes.pdf"
                className="px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-foreground hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
                aria-label="Baixar curriculo, PDF"
              >
                <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
                Baixar curriculo
              </a>
            </div>
          </div>

          {/* Right column - Specialties */}
          <div
            className={cn(
              "space-y-4 transition-all duration-1000 delay-400",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            <div className="flex items-center gap-2 mb-6">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Especialidades</h3>
            </div>

            {specialties.map((specialty, index) => {
              const colors = getColorClasses(specialty.color);
              const IconComponent = specialty.icon;

              return (
                <div
                  key={index}
                  className="glass-card p-6 card-hover group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-colors duration-300",
                      colors.bg,
                      colors.bgHover
                    )}>
                      <IconComponent className={cn("h-6 w-6", colors.text)} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {specialty.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {specialty.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {specialty.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-full transition-colors duration-300",
                              colors.tagBg,
                              colors.tagText
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
