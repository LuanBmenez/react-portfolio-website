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
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/config/emailjs";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (value.length < 2) {
          newErrors.name = "Nome deve ter pelo menos 2 caracteres";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        if (value && !validateEmail(value)) {
          newErrors.email = "Email inválido";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (value.length < 10) {
          newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalErrors = {};
    if (formData.name.length < 2)
      finalErrors.name = "Nome deve ter pelo menos 2 caracteres";
    if (!validateEmail(formData.email)) finalErrors.email = "Email inválido";
    if (formData.message.length < 10)
      finalErrors.message = "Mensagem deve ter pelo menos 10 caracteres";

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      toast({
        title: "Erro de validação",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (EMAILJS_CONFIG.serviceId === "service_your_service_id") {
        throw new Error("EmailJS não configurado");
      }

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to_name: "Luan Menezes",
        },
        EMAILJS_CONFIG.publicKey
      );

      toast({
        title: "Mensagem enviada com sucesso!",
        description:
          "Obrigado pela sua mensagem. Entrarei em contato com você em breve.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      const subject = encodeURIComponent("Contato do Portfólio");
      const body = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`
      );
      const mailtoLink = `mailto:Menezluan120@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink);

      toast({
        title: "Redirecionando para email",
        description: "Abriremos seu cliente de email para enviar a mensagem.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
                <a
                  href="https://www.linkedin.com/in/luan-menezes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil do LinkedIn"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
                <a
                  href="https://www.instagram.com/luanbmenez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil do Instagram"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-primary" />
                </a>
                <a
                  href="https://github.com/LuanBmenez"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Perfil do GitHub"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Github className="h-6 w-6 text-primary" />
                </a>
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
