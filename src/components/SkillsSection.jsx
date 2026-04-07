import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Layers, Database, Wrench, Sparkles } from "lucide-react";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 99, category: "frontend", icon: "html" },
  { name: "Javascript", level: 99, category: "frontend", icon: "js" },
  { name: "React", level: 98, category: "frontend", icon: "react" },
  { name: "Tailwind CSS", level: 96, category: "frontend", icon: "tailwind" },
  { name: "Typescript", level: 41, category: "frontend", icon: "ts" },
  { name: "React Native", level: 62, category: "frontend", icon: "react" },
  // Backend
  { name: "C#", level: 44, category: "backend", icon: "csharp" },
  { name: "PostgreSQL", level: 36, category: "backend", icon: "postgres" },
  { name: "Node.js", level: 88, category: "backend", icon: "node" },
  { name: "MongoDB", level: 60, category: "backend", icon: "mongo" },
  // Tools
  { name: "Git/Github", level: 93, category: "tools", icon: "git" },
];

const categories = [
  { id: "all", name: "Todas", icon: Sparkles },
  { id: "frontend", name: "Frontend", icon: Layers },
  { id: "backend", name: "Backend", icon: Database },
  { id: "tools", name: "Ferramentas", icon: Wrench },
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory,
  );

  const getLevelLabel = (level) => {
    if (level >= 90) return "Avancado";
    if (level >= 70) return "Intermediario";
    if (level >= 50) return "Competente";
    return "Aprendendo";
  };

  const getLevelColor = (level) => {
    if (level >= 90) return "from-primary to-teal-400";
    if (level >= 70) return "from-primary/80 to-teal-500/80";
    if (level >= 50) return "from-primary/60 to-teal-600/60";
    return "from-primary/40 to-teal-700/40";
  };

  return (
    <section 
      id="skills" 
      className="py-28 px-4 relative bg-secondary/30"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Competencias
          </span>
          <h2 className="section-title">
            Minhas <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Tecnologias e ferramentas que utilizo no dia a dia
          </p>
        </div>

        {/* Category filters */}
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-card/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30",
                )}
              >
                <IconComponent className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={cn(
                "glass-card p-6 card-hover group transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>
                <span className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded-full",
                  skill.level >= 90 
                    ? "bg-primary/10 text-primary" 
                    : skill.level >= 70 
                      ? "bg-teal-500/10 text-teal-500"
                      : skill.level >= 50
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-muted text-muted-foreground"
                )}>
                  {getLevelLabel(skill.level)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="relative">
                <div className="w-full h-2 bg-secondary/80 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r transition-all duration-1000 ease-out",
                      getLevelColor(skill.level),
                      isVisible ? "" : "!w-0"
                    )}
                    style={{ width: isVisible ? `${skill.level}%` : "0%" }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground capitalize">
                    {skill.category}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className={cn(
          "mt-12 text-center transition-all duration-1000 delay-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredSkills.length}</span> tecnologias{" "}
              {activeCategory !== "all" && (
                <span>
                  em <span className="text-primary font-medium">{categories.find(c => c.id === activeCategory)?.name}</span>
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
