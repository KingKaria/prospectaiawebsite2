import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
      <Badge variant="accent">Erro 404</Badge>
      <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
        Esta página não foi encontrada
      </h1>
      <p className="max-w-md text-base leading-relaxed text-foreground-muted">
        O endereço que procura pode ter mudado ou já não existir. Volte à
        página inicial para continuar a navegar.
      </p>
      <Button href="/" size="lg">
        Voltar ao início
      </Button>
    </Container>
  );
}
