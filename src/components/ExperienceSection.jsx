import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: 1,
    role: "Estagiário de Desenvolvimento de jogos",
    company: "Alchemy games (antigo Flux Games)",
    period: "Outubro de 2022 - Outubro de 2023",
    location: "Brasil",
    description:
      "Estágio com foco no desenvolvimento de jogos. Auxiliei na criação de mecânicas, implementação de interfaces e correção de bugs, trabalhando com metodologias ágeis em equipe.",
    technologies: ["C#", "Game Development", "Unity"],
    url: "https://www.alchemy.games/",
  },
  {
    id: 2,
    role: "Desenvolvedor Frontend",
    company: "Wicomm",
    period: "Outubro de 2023 - Presente",
    location: "Brasil",
    description:
      "Atuação no desenvolvimento e manutenção de aplicações B2C e B2B para grandes Empresas do varejo nacional, como Shoulder, Toymania, Montreal e Drogarias Venancio. Foco na criação de interfaces responsivas de alta performance e excelente experiência do usuário.",
    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Vtex",
      "Wake",
      "Eitri",
    ],
    url: "https://wicomm.com.br",
  },
];

export const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="py-24 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experiência <span className="text-primary">Profissional</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minha trajetória no mercado de tecnologia, construindo produtos
            reais e impactando usuários.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={cn(
                "relative pl-8 md:pl-0 transition-all duration-1000",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline Line (Mobile: left, Desktop: hidden or left) */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border"></div>

              <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative">
                {/* Timeline Dot (Mobile) */}
                <div className="md:hidden absolute -left-10 top-8 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-primary font-medium mt-1">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                      {exp.url && (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
