import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/config/emailjs";
import { useToast } from "@/hooks/use-toast";

export const useContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

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

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};
