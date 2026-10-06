import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { submitLead } from "@/lib/sendLead";
import { trackGoogleAdsConversion } from "@/lib/gtm";
import { CheckCircle2, Loader2, Lock, ArrowRight, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export interface WhatsAppLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  defaultWhatsappUrl?: string;
}

const DEFAULT_BASE_WHATSAPP_URL = "https://wa.me/5511917726297";

function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function WhatsAppLeadModal({
  open,
  onOpenChange,
  source = "Botão WhatsApp",
  defaultWhatsappUrl = DEFAULT_BASE_WHATSAPP_URL,
}: WhatsAppLeadModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [generatedWhatsappUrl, setGeneratedWhatsappUrl] = React.useState("");

  // Reset state when modal is closed
  React.useEffect(() => {
    if (!open) {
      // Delay reset slightly so exit animation finishes smoothly
      const timer = setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setIsSubmitting(false);
        setIsSuccess(false);
        setGeneratedWhatsappUrl("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatBrazilianPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanDigits = phone.replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      toast.error("Por favor, digite um número de celular válido com DDD.");
      return;
    }

    if (!name.trim()) {
      toast.error("Por favor, digite seu nome completo.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      toast.error("Por favor, informe um e-mail válido.");
      return;
    }

    setIsSubmitting(true);

    // Build personalized WhatsApp text
    const message = `Olá! Meu nome é ${name.trim()}. Gostaria de informações sobre o coworking médico no Pacaembu.`;
    const targetUrl = `${defaultWhatsappUrl}?text=${encodeURIComponent(message)}`;
    setGeneratedWhatsappUrl(targetUrl);

    try {
      await submitLead({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          source,
        },
      });
      toast.success("Dados enviados com sucesso!");
    } catch (err) {
      console.warn("Could not send lead email, but proceeding to WhatsApp:", err);
      // Still allow conversion
    } finally {
      // Dispara evento de conversão do Google Ads
      trackGoogleAdsConversion();

      setIsSubmitting(false);
      setIsSuccess(true);

      // Attempt to open WhatsApp directly in a new tab
      try {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } catch {
        // If popup was blocked, user still has the big direct button on stage 2
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-border/80 shadow-[var(--shadow-elegant)] bg-card">
        {/* Header Banner */}
        <div
          className="px-6 py-6 text-white relative"
          style={{ background: "var(--gradient-sage)" }}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm mb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            Atendimento Rápido CEMIP
          </div>
          <DialogTitle className="font-serif text-2xl font-normal text-white">
            {isSuccess ? "Tudo Pronto!" : "Fale Conosco pelo WhatsApp"}
          </DialogTitle>
          <DialogDescription className="text-white/85 text-sm mt-1.5 leading-relaxed">
            {isSuccess
              ? "Seus dados foram registrados. Clique abaixo para iniciar a conversa no WhatsApp."
              : "Preencha seus dados para receber o atendimento personalizado da nossa equipe."}
          </DialogDescription>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="lead-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                >
                  Nome completo *
                </label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ex: Dr. Alexandre Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--sage)] focus:outline-none focus:ring-2 focus:ring-[var(--sage)]/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                >
                  E-mail profissional *
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="doutor@exemplo.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--sage)] focus:outline-none focus:ring-2 focus:ring-[var(--sage)]/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                >
                  Celular / WhatsApp *
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[var(--sage)] focus:outline-none focus:ring-2 focus:ring-[var(--sage)]/20 transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full py-3.5 px-6 font-medium text-white shadow-[var(--shadow-elegant)] transition-all hover:scale-[1.01] hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  style={{ background: "var(--gradient-sage)" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Enviando dados...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      <span>Continuar para o WhatsApp</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
                <Lock className="h-3.5 w-3.5 text-[var(--sage-dark)]" />
                <span>Seus dados estão protegidos. Não enviamos spam.</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-2 space-y-5">
              <div
                className="mx-auto grid h-16 w-16 place-items-center rounded-full"
                style={{ background: "var(--sage-soft)" }}
              >
                <CheckCircle2 className="h-9 w-9 text-[var(--sage-dark)]" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-medium text-foreground">
                  Obrigado, {name.split(" ")[0]}!
                </h4>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                  Sua solicitação foi registrada. Clique no botão abaixo para conversar diretamente
                  com nossa equipe de atendimento no WhatsApp:
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={generatedWhatsappUrl || defaultWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full py-4 px-6 font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] text-base"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>Abrir Conversa no WhatsApp</span>
                </a>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>Número oficial: (11) 91772-6297</p>
                <p className="mt-1">Atendimento de Segunda a Sexta, das 8h às 19h.</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
