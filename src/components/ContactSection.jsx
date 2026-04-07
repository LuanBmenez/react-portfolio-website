import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
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
          newErrors.email = "Email invalido";
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
    if (!validateEmail(formData.email)) finalErrors.email = "Email invalido";
    if (formData.message.length < 10)
      finalErrors.message = "Mensagem deve ter pelo menos 10 caracteres";

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      toast({
        title: "Erro de validacao",
        description: "Por favor, corrija os erros no formulario.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (EMAILJS_CONFIG.serviceId === "service_your_service_id") {
        throw new Error("EmailJS nao configurado");
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
          "Obrigado pela sua mensagem. Entrarei em contato em breve.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      const subject = encodeURIComponent("Contato do Portfolio");
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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "Menezluan120@gmail.com",
      href: "mailto:Menezluan120@gmail.com",
    },
    {
      icon: Phone,
      title: "Telefone",
      value: "+55 (74) 99910-8336",
      href: "tel:+5574999108336",
    },
    {
      icon: MapPin,
      title: "Localizacao",
      value: "Jacobina, BA, Brasil",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/luan-menezes/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/luanbmenez/", label: "Instagram" },
    { icon: Github, href: "https://github.com/LuanBmenez", label: "GitHub" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 px-4 relative bg-secondary/30"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contato
          </span>
          <h2 className="section-title">
            Vamos <span className="text-gradient">conversar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Tem um projeto em mente? Estou sempre aberto a discutir novas oportunidades.
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Informacoes
            </h3>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={index} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">Redes sociais</p>
              <div className="flex gap-3">
                {socialLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="p-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                    >
                      <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Envie uma mensagem
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-left"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-background/50 focus:outline-none focus:ring-2 transition-all duration-300",
                        errors.name
                          ? "border-rose-500 focus:ring-rose-500/50"
                          : "border-border focus:ring-primary/50 focus:border-primary"
                      )}
                      placeholder="Seu nome"
                    />
                    {errors.name && (
                      <p className="text-rose-500 text-xs mt-1.5 text-left">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-left"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-background/50 focus:outline-none focus:ring-2 transition-all duration-300",
                        errors.email
                          ? "border-rose-500 focus:ring-rose-500/50"
                          : "border-border focus:ring-primary/50 focus:border-primary"
                      )}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-xs mt-1.5 text-left">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-left"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-background/50 focus:outline-none focus:ring-2 resize-none transition-all duration-300",
                      errors.message
                        ? "border-rose-500 focus:ring-rose-500/50"
                        : "border-border focus:ring-primary/50 focus:border-primary"
                    )}
                    placeholder="Ola Luan, gostaria de conversar sobre..."
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    {errors.message ? (
                      <p className="text-rose-500 text-xs">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formData.message.length}/10 min
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  className={cn(
                    "cosmic-button w-full inline-flex items-center justify-center gap-2 mt-2",
                    (isSubmitting || Object.keys(errors).length > 0) &&
                      "opacity-50 cursor-not-allowed hover:scale-100"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
