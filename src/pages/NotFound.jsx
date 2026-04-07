import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="text-center relative z-10 max-w-md">
        {/* 404 number */}
        <div className="relative mb-8">
          <span className="text-[150px] sm:text-[200px] font-bold text-primary/10 select-none leading-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl font-bold text-gradient">
              Ops!
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Pagina nao encontrada
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          A pagina que voce esta procurando nao existe ou foi movida para outro lugar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="cosmic-button inline-flex items-center justify-center gap-2 group"
          >
            <Home className="h-4 w-4" />
            Voltar ao inicio
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm text-foreground hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 inline-flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
