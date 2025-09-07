import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "12Weeks",
    description:
      "Uma das minhas primeiras aplicações usando fullstack onde fiz um site de metas para ajudar a criar hábitos, em breve atualizações ",
    image: "/projects/12weeksPagina.png",
    tags: ["React", "Nodejs","mongodb", "StyledComponents"],
    demoUrl: "https://12-weeks.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/12Weeks",
  },
  {
    id: 2,
    title: "InstagramCopy",
    description:
      "Copiei uma das mais famosas redes sociais, Instagram, somente com o frontend por enquanto, mas já com algumas funcionalidades",
    image: "/projects/InstagramReact.png",
    tags: ["React", "Javascript", "StyledComponents"],
    demoUrl: "https://instagram-react-xi.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/InstagramReact",
  },
  {
    id: 3,
    title: "Portfólio",
    description:
      "O meu primeiro portfólio em React com ajuda do Tailwind CSS, um projeto um pouco maior e desafiador",
    image: "/projects/PortifolioReact.png",
    tags: ["React", "Javascript", "Tailwind CSS"],
    demoUrl: "https://react-portfolio-website-gilt-nine.vercel.app/",
    githubUrl: "https://github.com/LuanBmenez/react-portfolio-website",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Projetos <span className="text-primary"> Recentes </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Aqui estão alguns dos meus projetos recentes. Cada projeto foi
          cuidadosamente elaborado com atenção aos detalhes, desempenho e
          experiência do usuário.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot do projeto ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={`${project.id}-${tag}-${index}`}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver demo do projeto ${project.title}`}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver código do projeto ${project.title} no GitHub`}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            href="https://github.com/LuanBmenez"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver todos os projetos no GitHub"
          >
            Meu GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
