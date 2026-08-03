import { createFileRoute } from "@tanstack/react-router";
import {
  DoorOpen,
  Clock,
  Users,
  Car,
  Check,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { VideoTour } from "@/components/VideoTour";
import cemipFachada from "@/assets/cemip-fachada.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coworking Médico no Pacaembu | Clínica com 50 anos" },
      {
        name: "description",
        content:
          "Coworking para profissionais da saúde no Pacaembu. Consultórios prontos, recepção inclusa, estacionamento e 50 anos de tradição. Agende uma visita.",
      },
      { property: "og:title", content: "Coworking Médico no Pacaembu" },
      {
        property: "og:description",
        content:
          "Estrutura completa em clínica tradicional do Pacaembu. Atenda sem os custos de um consultório próprio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const WHATSAPP_URL =
  "https://wa.me/5511999633509?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20visita%20ao%20coworking.";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885zM20.52 3.449C18.24 1.245 15.24.03 12.045.03 5.463.03.104 5.389.101 11.971c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.447h.005c6.581 0 11.94-5.358 11.943-11.94 0-3.192-1.253-6.19-3.473-8.406z" />
    </svg>
  );
}

function CTAButton({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-medium text-white shadow-[var(--shadow-elegant)] transition-all hover:scale-[1.02] hover:shadow-[0_24px_60px_-20px_oklch(0.42_0.045_150/0.4)] ${large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
        }`}
      style={{ background: "var(--gradient-sage)" }}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {children}
    </a>
  );
}

function Landing() {
  const services = [
    {
      icon: DoorOpen,
      title: "Salas privativas prontas para uso",
      desc: "Consultórios modernos e bem equipados, prontos para receber seus pacientes com conforto e privacidade.",
    },
    {
      icon: Clock,
      title: "Flexibilidade de horários",
      desc: "Disponibilidade de períodos de 4 horas, pela manhã ou à tarde, para se adaptar à sua rotina.",
    },
    {
      icon: Users,
      title: "Recepção inclusa",
      desc: "Equipe de secretaria dedicada ao agendamento e à recepção dos seus pacientes.",
    },
    {
      icon: Car,
      title: "Estacionamento no local",
      desc: "Comodidade e tranquilidade para você e para os seus pacientes, com vagas disponíveis no local.",
    },
  ];

  const differentials = [
    "Localização privilegiada no Pacaembu.",
    "Clínica consolidada há 50 anos.",
    "Estrutura completa sem necessidade de investimento inicial.",
    "Preço altamente competitivo em relação ao mercado.",
    "Atendimento prático voltado para profissionais de qualquer especialidade.",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
      />

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#top" className="font-serif text-lg text-foreground sm:text-xl">
            CEMIP - Clínica Pacaembu
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#sobre" className="hover:text-foreground">Sobre</a>
            <a href="#servicos" className="hover:text-foreground">Serviços</a>
            <a href="#tour" className="hover:text-foreground">Tour</a>
            <a href="#diferenciais" className="hover:text-foreground">Diferenciais</a>
            <a href="#contato" className="hover:text-foreground">Contato</a>
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-foreground backdrop-blur transition-colors hover:border-[var(--sage)] sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4 text-[var(--whatsapp)]" />
            (11) 99963-3509
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24 lg:pt-44">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text Content) */}
            <div className="lg:col-span-7 text-left">
              <Reveal>
                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--sage)]/30 bg-[var(--sage-soft)]/50 px-3 py-1 text-xs font-medium tracking-wide text-[var(--sage-dark)] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" />
                  50 anos de tradição no Pacaembu
                </p>
                <h1 className="font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
                  Coworking para profissionais da saúde no Pacaembu
                </h1>
                <p className="mt-6 text-base text-muted-foreground sm:text-lg max-w-xl">
                  Estrutura completa em clínica com 50 anos de tradição. Espaço
                  profissional pronto para atender, sem os custos de manter um
                  consultório próprio.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <CTAButton large>Agendar uma Visita</CTAButton>
                  <a
                    href="#servicos"
                    className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    Conhecer o espaço →
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column (Image) */}
            <div className="lg:col-span-5 relative w-full">
              <Reveal delay={200}>
                <div className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-elegant)] bg-muted aspect-4/3 lg:aspect-[5/6]">
                  <img
                    src={cemipFachada}
                    alt="CEMIP - Clínica Pacaembu"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  {/* Subtle premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="border-t border-border/60 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">

          <Reveal delay={120}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--sage-dark)]">
              Sobre a clínica
            </p>
            <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
              Tradição e Excelência
            </h2>
            <p className="mt-6 text-muted-foreground sm:text-lg">
              A Clínica e Cirurgia do Aparelho Digestivo é uma empresa em
              atividade no mesmo endereço há 50 anos, na região do Pacaembu.
              Projetada em uma das clássicas casas da região, oferecemos um
              ambiente acolhedor, com infraestrutura modernizada para
              proporcionar a melhor experiência tanto para o profissional
              quanto para o paciente.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Casa tradicional no Pacaembu com estrutura modernizada.",
                "Ambiente acolhedor para profissionais e pacientes.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--sage-soft)" }}
                  >
                    <Check className="h-3.5 w-3.5 text-[var(--sage-dark)]" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="border-t border-border/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--sage-dark)]">
                O que oferecemos
              </p>
              <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
                Tudo pronto para o seu atendimento
              </h2>
              <p className="mt-5 text-muted-foreground">
                Uma estrutura pensada para você focar apenas no que importa: o
                cuidado com o seu paciente.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--sage)]/40 hover:shadow-[var(--shadow-soft)]">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl transition-transform group-hover:scale-105"
                    style={{ background: "var(--sage-soft)" }}
                  >
                    <s.icon className="h-6 w-6 text-[var(--sage-dark)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <VideoTour />

      {/* Diferenciais */}
      <section
        id="diferenciais"
        className="py-20 sm:py-28"
        style={{ background: "var(--sage-soft)" }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--sage-dark)]">
                Diferenciais
              </p>
              <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
                Por que escolher nosso espaço?
              </h2>
            </div>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {differentials.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <li className="flex items-start gap-4 rounded-2xl bg-card/70 p-5 backdrop-blur">
                  <span
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: "var(--gradient-sage)" }}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA secundário */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Atenda em um espaço profissional, sem os custos e preocupações
              de manter um consultório próprio.
            </h2>
            <p className="mt-6 text-muted-foreground sm:text-lg">
              Será um grande prazer recebê-lo para uma visita.
            </p>
            <div className="mt-10 flex justify-center">
              <CTAButton large>Falar com a equipe</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer / Contato */}
      <footer
        id="contato"
        className="border-t border-border/60 py-20 sm:py-24"
        style={{ backgroundColor: "oklch(0.955 0.008 100)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--sage-dark)]">
                Contato
              </p>
              <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
                Agende uma visita e venha conhecer
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--sage-soft)" }}
                  >
                    <Phone className="h-5 w-5 text-[var(--sage-dark)]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Telefone fixo
                    </p>
                    <a href="tel:+551138252126" className="mt-1 block text-lg text-foreground hover:text-[var(--sage-dark)]">
                      (11) 3825-2126
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--sage-soft)" }}
                  >
                    <MessageCircle className="h-5 w-5 text-[var(--sage-dark)]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      WhatsApp
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-lg text-foreground hover:text-[var(--sage-dark)]"
                    >
                      (11) 99963-3509
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                    style={{ background: "var(--sage-soft)" }}
                  >
                    <MapPin className="h-5 w-5 text-[var(--sage-dark)]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Endereço
                    </p>
                    <p className="mt-1 text-lg text-foreground">
                      Av. Arnolfo Azevedo, 208
                      <br />
                      Pacaembu — São Paulo, SP
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--sage-dark)]">
                      <Car className="h-4 w-4" /> Estacionamento no local
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <CTAButton>Agendar pelo WhatsApp</CTAButton>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
                <iframe
                  title="Mapa da clínica no Pacaembu"
                  src="https://www.google.com/maps?q=Av.%20Arnolfo%20Azevedo%2C%20208%20-%20Pacaembu%2C%20S%C3%A3o%20Paulo&output=embed"
                  className="h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p>© 2026 Clínica e Cirurgia do Aparelho Digestivo. Todos os direitos reservados.</p>
            <p className="font-serif text-foreground">Pacaembu · São Paulo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
