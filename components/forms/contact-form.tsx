"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/**
 * Formulário de contacto — interface pronta, sem integração de backend
 * nesta etapa. Estrutura preparada para ligação futura a uma API/CRM.
 */
export function ContactForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="contact-name" name="name" label="Nome" placeholder="O seu nome" required />
        <Input id="contact-email" name="email" type="email" label="Email" placeholder="nome@empresa.com" required />
      </div>
      <Input id="contact-company" name="company" label="Empresa" placeholder="Nome da empresa" />
      <Textarea
        id="contact-message"
        name="message"
        label="Mensagem"
        placeholder="Conte-nos brevemente o que procura"
        required
      />
      <Button type="submit" size="lg" className="self-start">
        Enviar pedido
      </Button>
      <p className="text-xs text-foreground-subtle">
        Formulário provisório: ainda não está ligado a um sistema de envio.
      </p>
    </form>
  );
}
