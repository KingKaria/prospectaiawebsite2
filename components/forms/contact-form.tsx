"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/contacto/actions";
import type { ContactFieldName, ContactFormFieldErrors, ContactFormState } from "@/lib/validations/contact";

const initialState: ContactFormState = { status: "idle" };

const FIELD_ORDER: ContactFieldName[] = ["name", "email", "company", "phone", "website", "message"];

const FIELD_IDS: Record<ContactFieldName, string> = {
  name: "contact-name",
  email: "contact-email",
  company: "contact-company",
  phone: "contact-phone",
  website: "contact-website",
  message: "contact-message",
};

const FEEDBACK_ID = "contact-form-feedback";

type FieldValues = Record<ContactFieldName, string>;

const EMPTY_FIELD_VALUES: FieldValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  website: "",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="self-start" disabled={pending}>
      {pending ? "A enviar…" : "Enviar pedido"}
    </Button>
  );
}

/**
 * Formulário de contacto ligado a uma Server Action real (Etapa 2), mas
 * ainda sem envio externo — components/forms/contact-form.tsx chama
 * app/contacto/actions.ts, que usa um adaptador simulado
 * (lib/email/send-contact-message.ts). Nenhum email é enviado.
 *
 * Os 6 campos visíveis são controlados por estado local. Isto não é
 * apenas estilo — o React 19 repõe automaticamente os campos não
 * controlados de um <form action={...}> depois de qualquer conclusão
 * da action (sucesso OU erro), o que apagaria silenciosamente os
 * valores escritos pelo utilizador num erro de validação. Tornar os
 * campos controlados neutraliza esse comportamento, porque o valor
 * apresentado passa a vir sempre do estado do React, nunca do reset
 * nativo do formulário.
 *
 * `Input`/`Textarea` são componentes partilhados fora do âmbito desta
 * etapa e não suportam `ref` — por isso a gestão de foco usa
 * `document.getElementById` com os IDs já estáveis dos campos, em vez
 * de refs. O texto de erro reutiliza a prop `hint` já existente
 * (associa `aria-describedby` automaticamente); a cor do texto
 * permanece neutra porque alterá-la exigiria tocar nesses componentes
 * partilhados, fora do âmbito aprovado para esta etapa.
 *
 * `noValidate` mantém-se: a validação do servidor é a fonte única de
 * verdade das mensagens de erro nesta etapa, para nunca mostrar um
 * texto nativo do browser (inconsistente, possivelmente noutra língua)
 * a par das mensagens PT-PT do Zod. Os atributos HTML de validação
 * (required, minLength, maxLength, type, inputMode) ficam mesmo assim,
 * pelo valor semântico e de acessibilidade que têm por si só.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  // Valor inicial apenas — nunca atualizado via setState. Renovar após
  // sucesso é feito por manipulação direta do DOM (ver efeito abaixo),
  // não por um novo render, para não disparar setState dentro de um
  // efeito.
  const [formStartedAt] = useState(() => Date.now());
  const [fieldValues, setFieldValues] = useState<FieldValues>(EMPTY_FIELD_VALUES);
  const [lastHandledStatus, setLastHandledStatus] = useState(state.status);
  const formStartedAtInputRef = useRef<HTMLInputElement>(null);

  const fieldErrors: ContactFormFieldErrors =
    state.status === "validation_error" ? state.fieldErrors : {};

  // Ajuste de estado durante o render — reage à mudança de `state`
  // (vindo de useActionState) sem usar um efeito, seguindo o padrão já
  // estabelecido neste projeto (ver mobile-navigation.tsx) para evitar
  // a regra react-hooks/set-state-in-effect. Só limpa os campos
  // visíveis quando a submissão teve sucesso; em erro, mantém-se tudo.
  if (state.status !== lastHandledStatus) {
    setLastHandledStatus(state.status);
    if (state.status === "success") {
      setFieldValues(EMPTY_FIELD_VALUES);
    }
  }

  function handleFieldChange(field: ContactFieldName) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValues((previous) => ({ ...previous, [field]: event.target.value }));
    };
  }

  useEffect(() => {
    if (state.status === "success") {
      // Renovado por manipulação direta do DOM, não por setState, para
      // não disparar react-hooks/set-state-in-effect.
      if (formStartedAtInputRef.current) {
        formStartedAtInputRef.current.value = String(Date.now());
      }
      document.getElementById(FEEDBACK_ID)?.focus();
    } else if (state.status === "technical_error" || state.status === "rate_limited") {
      document.getElementById(FEEDBACK_ID)?.focus();
    } else if (state.status === "validation_error") {
      const firstInvalidField = FIELD_ORDER.find((field) => fieldErrors[field]);
      if (firstInvalidField) {
        document.getElementById(FIELD_IDS[firstInvalidField])?.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id={FIELD_IDS.name}
          name="name"
          label="Nome"
          placeholder="O seu nome"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          value={fieldValues.name}
          onChange={handleFieldChange("name")}
          aria-invalid={Boolean(fieldErrors.name)}
          hint={fieldErrors.name}
        />
        <Input
          id={FIELD_IDS.email}
          name="email"
          type="email"
          inputMode="email"
          label="Email profissional"
          placeholder="nome@empresa.com"
          required
          maxLength={254}
          autoComplete="email"
          value={fieldValues.email}
          onChange={handleFieldChange("email")}
          aria-invalid={Boolean(fieldErrors.email)}
          hint={fieldErrors.email}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id={FIELD_IDS.company}
          name="company"
          label="Empresa"
          placeholder="Nome da empresa"
          required
          minLength={2}
          maxLength={120}
          autoComplete="organization"
          value={fieldValues.company}
          onChange={handleFieldChange("company")}
          aria-invalid={Boolean(fieldErrors.company)}
          hint={fieldErrors.company}
        />
        <Input
          id={FIELD_IDS.phone}
          name="phone"
          type="tel"
          inputMode="tel"
          label="Telefone (opcional)"
          placeholder="+351 912 345 678"
          maxLength={30}
          autoComplete="tel"
          value={fieldValues.phone}
          onChange={handleFieldChange("phone")}
          aria-invalid={Boolean(fieldErrors.phone)}
          hint={fieldErrors.phone}
        />
      </div>

      <Input
        id={FIELD_IDS.website}
        name="website"
        type="url"
        inputMode="url"
        label="Website (opcional)"
        placeholder="empresa.pt"
        maxLength={2048}
        autoComplete="url"
        value={fieldValues.website}
        onChange={handleFieldChange("website")}
        aria-invalid={Boolean(fieldErrors.website)}
        hint={fieldErrors.website}
      />

      <Textarea
        id={FIELD_IDS.message}
        name="message"
        label="Mensagem"
        placeholder="Conte-nos brevemente o que procura"
        required
        minLength={20}
        maxLength={3000}
        value={fieldValues.message}
        onChange={handleFieldChange("message")}
        aria-invalid={Boolean(fieldErrors.message)}
        hint={fieldErrors.message}
      />

      {/* Honeypot — invisível para pessoas, apetecível para bots. Nome
          neutro ("url"/"Website" no HTML) que não revela a função.
          Deslocado do ecrã em vez de display:none (bots simples
          ignoram campos display:none), fora da navegação por teclado
          (tabIndex=-1) e não anunciado por leitores de ecrã
          (aria-hidden). Ainda não bloqueia nada nesta etapa — só a
          forma existe; a deteção fica para a etapa seguinte. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-url">Website</label>
        <input id="contact-url" name="url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input
        ref={formStartedAtInputRef}
        type="hidden"
        name="formStartedAt"
        defaultValue={formStartedAt}
      />

      <SubmitButton />

      {state.status === "success" ? (
        <p
          id={FEEDBACK_ID}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="text-sm text-success"
        >
          A sua mensagem foi enviada com sucesso.
        </p>
      ) : null}

      {state.status === "technical_error" || state.status === "rate_limited" ? (
        <p
          id={FEEDBACK_ID}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="text-sm text-danger"
        >
          {state.message}
        </p>
      ) : null}

      <p className="text-xs text-foreground-subtle">
        Os campos assinalados como opcionais não são obrigatórios — os restantes são.
      </p>
    </form>
  );
}
