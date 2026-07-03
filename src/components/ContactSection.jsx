import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useContactForm } from "@/hooks/useContactForm";
import { SocialLink } from "./ui/SocialLink";

export const ContactSection = () => {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } = useContactForm();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 px-4 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl">
        <div
          className={cn(
            "transition-all duration-700 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Entre Em<span className="text-primary"> Contato</span>
          </h2>

          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Tem um projeto em mente? Entre em contato. Estou sempre aberto a
            discutir novas oportunidades.
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 transform delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              Informações de Contato
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:Menezluan120@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Menezluan120@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Telefone</h4>
                  <a
                    href="tel:+5574999108336"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +55 (74) 99910-8336
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Localização</h4>
                  <span className="text-muted-foreground">
                    Jacobina, BA, Brasil
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Redes Sociais</h4>
              <div className="flex space-x-4 justify-center">
                <SocialLink 
                  href="https://www.linkedin.com/in/luan-menezes/"
                  ariaLabel="Perfil do LinkedIn"
                  icon={Linkedin}
                />
                <SocialLink 
                  href="https://www.instagram.com/luanbmenez/"
                  ariaLabel="Perfil do Instagram"
                  icon={Instagram}
                />
                <SocialLink 
                  href="https://github.com/LuanBmenez"
                  ariaLabel="Perfil do GitHub"
                  icon={Github}
                />
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Envie uma mensagem</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 transition-all",
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  )}
                  placeholder="Digite seu nome completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Seu email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 transition-all",
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  )}
                  placeholder="seu.email@exemplo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Sua mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 resize-none transition-all",
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-input focus:ring-primary"
                  )}
                  placeholder="Olá Luan, gostaria de conversar sobre..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/10 caracteres mínimos
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || Object.keys(errors).length > 0}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 transition-all duration-300",
                  isSubmitting || Object.keys(errors).length > 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
