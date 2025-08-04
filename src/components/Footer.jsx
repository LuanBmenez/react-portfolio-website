import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card border-t border-border mt-12">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} Luan Menezes. Todos os direitos reservados.
          </p>

          <a 
            href="#hero" 
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300"
            aria-label="Voltar ao topo da página"
          >
            <ArrowUp size={20}/>
          </a>
        </div>
      </div>
    </footer>
  );
};
