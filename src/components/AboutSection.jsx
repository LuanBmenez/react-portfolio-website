import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Sobre <span className="text-primary"> Mim</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Dev FullStack</h3>
            <p className="text-muted-foreground">
              Olá! Sou Luan, um desenvolvedor fullstack de 22 anos, embarcando
              em uma empolgante transição de carreira para o dinâmico mundo da
              tecnologia. Com 9 meses de estudo dedicado e prático, já possuo um
              sólido domínio em JavaScript, React para o desenvolvimento web, e
              C# para soluções robustas de backend.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Entre em contato
              </a>
              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Dev FullStack{" "}
                  </h4>
                  <p className="text-muted-foreground">
                    Transformando ideias em realidade digital, construo
                    aplicações web completas e robustas, atuando do backend ao
                    frontend com tecnologias modernas.
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Estudante de ADS</h4>
                  <p className="text-muted-foreground">
                    Estudante de Analise e desenvolvimento de sistemas, onde
                    pego uma base solida sobre o mundo da programação
                  </p>
                </div>
              </div>
            </div>
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Desenvolvedor de jogos
                  </h4>
                  <p className="text-muted-foreground">
                    Com paixão por criar mundos imersivos e experiências
                    interativas, sou um desenvolvedor de jogos focado em Unity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
