import { ArrowRight, ExternalLink, Github, Calendar, X, Eye, Star, Folder } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "12Weeks",
    description:
      "Uma das minhas primeiras aplicacoes fullstack onde fiz um site de metas para ajudar a criar habitos, em breve atualizacoes",
    longDescription: "12Weeks e uma aplicacao completa de gerenciamento de metas e habitos. Desenvolvida com foco na experiencia do usuario, permite criar metas de 12 semanas com acompanhamento diario, visualizacao de progresso e gamificacao para manter a motivacao.",
    image: "/projects/12weeksPagina.png",
    tags: ["React", "Node.js", "MongoDB", "Styled"],
    demoUrl: "https://12-weeks.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/12Weeks",
    date: "2025",
    status: "Em desenvolvimento",
    features: ["Autenticacao de usuarios", "Dashboard de metas", "Acompanhamento de progresso", "Hasheamento de senhas"],
    category: "FullStack"
  },
  {
    id: 2,
    title: "InstagramCopy",
    description:
      "Copiei uma das mais famosas redes sociais, Instagram, somente com o frontend por enquanto, mas ja com algumas funcionalidades",
    longDescription: "Uma replica do Instagram desenvolvida em React, focada na interface e experiencia do usuario. Implementa funcionalidades como feed de posts, stories, sistema de curtidas e comentarios, demonstrando habilidades em UI/UX design.",
    image: "/projects/InstagramReact.png",
    tags: ["React", "JavaScript", "Styled"],
    demoUrl: "https://instagram-react-xi.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/InstagramReact",
    date: "2025",
    status: "Concluido",
    features: ["Interface responsiva", "Feed de posts", "Sistema de stories", "Interacoes sociais"],
    category: "Frontend"
  },
  {
    id: 3,
    title: "Portfolio",
    description:
      "O meu primeiro portfolio em React com ajuda do Tailwind CSS, um projeto um pouco maior e desafiador",
    longDescription: "Meu portfolio pessoal desenvolvido com React e Tailwind CSS. Apresenta uma interface moderna e responsiva, com animacoes suaves, tema escuro/claro, formulario de contato funcional e design focado na experiencia do usuario.",
    image: "/projects/PortifolioReact.png",
    tags: ["React", "JavaScript", "Tailwind"],
    demoUrl: "https://react-portfolio-website-gilt-nine.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/react-portfolio-website",
    date: "2025",
    status: "Em desenvolvimento",
    features: ["Design responsivo", "Tema escuro/claro", "Formulario de contato", "Animacoes suaves"],
    category: "Frontend"
  },
];

export const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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

  // Close modal on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Concluido": 
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Em desenvolvimento": 
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Pausado": 
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default: 
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <section id="projects" className="py-28 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="section-title">
            Projetos <span className="text-gradient">Recentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4 leading-relaxed">
            Cada projeto foi cuidadosamente elaborado com atencao aos detalhes,
            desempenho e experiencia do usuario.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group glass-card overflow-hidden card-hover transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-60" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <span className={cn(
                    "px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-sm",
                    getStatusStyles(project.status)
                  )}>
                    {project.status}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm text-foreground border border-border/50">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-xs">{project.date}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={`${project.id}-${tag}-${tagIndex}`}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    Detalhes
                  </button>
                  <div className="flex gap-2">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver demo do projeto ${project.title}`}
                      className="p-2 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver codigo do projeto ${project.title} no GitHub`}
                      className="p-2 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <a
            className="cosmic-button inline-flex items-center gap-2 group"
            href="https://github.com/LuanBmenez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver todos os projetos no GitHub"
          >
            <Folder className="h-4 w-4" />
            Ver mais no GitHub
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
        >
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="p-6 md:p-8">
              {/* Modal header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{selectedProject.category}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal image */}
              <div className="relative h-56 md:h-72 overflow-hidden rounded-xl mb-6">
                <img
                  src={selectedProject.image}
                  alt={`Screenshot do projeto ${selectedProject.title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal content */}
              <div className="space-y-6">
                {/* Status & Date */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-full border",
                    getStatusStyles(selectedProject.status)
                  )}>
                    {selectedProject.status}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {selectedProject.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Funcionalidades
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3">Tecnologias</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cosmic-button inline-flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-border bg-card/50 text-foreground hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Ver Codigo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
