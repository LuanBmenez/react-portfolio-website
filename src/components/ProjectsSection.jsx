import { ArrowRight, ExternalLink, Github, Calendar, X, Eye, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "12Weeks",
    description:
      "Uma das minhas primeiras aplicações fullstack onde fiz um site de metas para ajudar a criar hábitos, em breve atualizações ",
    longDescription: "12Weeks é uma aplicação completa de gerenciamento de metas e hábitos. Desenvolvida com foco na experiência do usuário, permite criar metas de 12 semanas com acompanhamento diário, visualização de progresso e gamificação para manter a motivação.",
    image: "/projects/12weeksPagina.png",
    tags: ["React", "Nodejs", "mongodb", "StyledComponents"],
    demoUrl: "https://12-weeks.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/12Weeks",
    date: "2025",
    status: "Em desenvolvimento",
    features: ["Autenticação de usuários", "Dashboard de metas", "Acompanhamento de progresso", "Hasheamento de senhas"],
    category: "FullStack"
  },
  {
    id: 2,
    title: "InstagramCopy",
    description:
      "Copiei uma das mais famosas redes sociais, Instagram, somente com o frontend por enquanto, mas já com algumas funcionalidades",
    longDescription: "Uma réplica do Instagram desenvolvida em React, focada na interface e experiência do usuário. Implementa funcionalidades como feed de posts, stories, sistema de curtidas e comentários, demonstrando habilidades em UI/UX design.",
    image: "/projects/InstagramReact.png",
    tags: ["React", "Javascript", "StyledComponents"],
    demoUrl: "https://instagram-react-xi.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/InstagramReact",
    date: "2025",
    status: "Concluído",
    features: ["Interface responsiva", "Feed de posts", "Sistema de stories", "Interações sociais"],
    category: "Frontend"
  },
  {
    id: 3,
    title: "Portfólio",
    description:
      "O meu primeiro portfólio em React com ajuda do Tailwind CSS, um projeto um pouco maior e desafiador",
    longDescription: "Meu portfólio pessoal desenvolvido com React e Tailwind CSS. Apresenta uma interface moderna e responsiva, com animações suaves, tema escuro/claro, formulário de contato funcional e design focado na experiência do usuário.",
    image: "/projects/PortifolioReact.png",
    tags: ["React", "Javascript", "Tailwind CSS"],
    demoUrl: "https://react-portfolio-website-gilt-nine.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/react-portfolio-website",
    date: "2025",
    status: "Em desenvolvimento",
    features: ["Design responsivo", "Tema escuro/claro", "Formulário de contato", "Animações suaves"],
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


  const getStatusColor = (status) => {
    switch (status) {
      case "Concluído": return "bg-green-500/20 text-green-500";
      case "Em desenvolvimento": return "bg-yellow-500/20 text-yellow-500";
      case "Pausado": return "bg-red-500/20 text-red-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };


  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={cn(
          "text-center mb-16 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Projetos <span className="text-primary"> Recentes </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aqui estão alguns dos meus projetos recentes. Cada projeto foi
            cuidadosamente elaborado com atenção aos detalhes, desempenho e
            experiência do usuário.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group bg-card rounded-lg overflow-hidden shadow-lg card-hover transition-all duration-1000",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full",
                    getStatusColor(project.status)
                  )}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/50 text-white">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{project.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={`${project.id}-${tag}-${tagIndex}`}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    Ver detalhes
                  </button>
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver demo do projeto ${project.title}`}
                      className="p-2 rounded-full bg-secondary/50 hover:bg-primary/10 text-foreground/80 hover:text-primary transition-all duration-300 group"
                    >
                      <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver código do projeto ${project.title} no GitHub`}
                      className="p-2 rounded-full bg-secondary/50 hover:bg-primary/10 text-foreground/80 hover:text-primary transition-all duration-300 group"
                    >
                      <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2 group"
            href="https://github.com/LuanBmenez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver todos os projetos no GitHub"
          >
            <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
            Meu GitHub 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                <img
                  src={selectedProject.image}
                  alt={`Screenshot do projeto ${selectedProject.title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "px-3 py-1 text-sm font-medium rounded-full",
                    getStatusColor(selectedProject.status)
                  )}>
                    {selectedProject.status}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                    {selectedProject.category}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedProject.date}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Funcionalidades:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tecnologias:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cosmic-button flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Código
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
