import { useState } from "react";
import { Play, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";

import fachadaMp4 from "@/assets/videos/Fachada.mp4.asset.json";
import fachadaJpg from "@/assets/videos/Fachada.jpg.asset.json";
import recepcaoMp4 from "@/assets/videos/Recepcao.mp4.asset.json";
import recepcaoJpg from "@/assets/videos/Recepcao.jpg.asset.json";
import salaPrincipalMp4 from "@/assets/videos/Sala_principal.mp4.asset.json";
import salaPrincipalJpg from "@/assets/videos/Sala_principal.jpg.asset.json";
import sala1Mp4 from "@/assets/videos/Sala_1.mp4.asset.json";
import sala1Jpg from "@/assets/videos/Sala_1.jpg.asset.json";
import sala2Mp4 from "@/assets/videos/Sala_2.mp4.asset.json";
import sala2Jpg from "@/assets/videos/Sala_2.jpg.asset.json";
import sala3Mp4 from "@/assets/videos/Sala_3.mp4.asset.json";
import sala3Jpg from "@/assets/videos/Sala_3.jpg.asset.json";
import sala4Mp4 from "@/assets/videos/Sala_4.mp4.asset.json";
import sala4Jpg from "@/assets/videos/Sala_4.jpg.asset.json";
import sala5Mp4 from "@/assets/videos/Sala_5.mp4.asset.json";
import sala5Jpg from "@/assets/videos/Sala_5.jpg.asset.json";
import sala7Mp4 from "@/assets/videos/Sala_7.mp4.asset.json";
import sala7Jpg from "@/assets/videos/Sala_7.jpg.asset.json";

type Item = {
  title: string;
  subtitle: string;
  video: string;
  poster: string;
  featured?: boolean;
};

const items: Item[] = [
  {
    title: "Fachada",
    subtitle: "Casa clássica no Pacaembu",
    video: fachadaMp4.url,
    poster: fachadaJpg.url,
    featured: true,
  },
  {
    title: "Recepção",
    subtitle: "Acolhimento e atendimento",
    video: recepcaoMp4.url,
    poster: recepcaoJpg.url,
    featured: true,
  },
  {
    title: "Sala Principal",
    subtitle: "Consultório amplo e iluminado",
    video: salaPrincipalMp4.url,
    poster: salaPrincipalJpg.url,
    featured: true,
  },
  { title: "Sala 1", subtitle: "Consultório privativo", video: sala1Mp4.url, poster: sala1Jpg.url },
  { title: "Sala 2", subtitle: "Consultório privativo", video: sala2Mp4.url, poster: sala2Jpg.url },
  { title: "Sala 3", subtitle: "Consultório privativo", video: sala3Mp4.url, poster: sala3Jpg.url },
  { title: "Sala 4", subtitle: "Consultório privativo", video: sala4Mp4.url, poster: sala4Jpg.url },
  { title: "Sala 5", subtitle: "Consultório privativo", video: sala5Mp4.url, poster: sala5Jpg.url },
  { title: "Sala 7", subtitle: "Consultório privativo", video: sala7Mp4.url, poster: sala7Jpg.url },
];

function Card({ item, onOpen }: { item: Item; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-[var(--sage)]/40"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white shadow-[var(--shadow-elegant)] transition-transform group-hover:scale-110"
          style={{ background: "var(--gradient-sage)" }}
        >
          <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="font-serif text-xl">{item.title}</p>
          <p className="text-xs text-white/80">{item.subtitle}</p>
        </div>
      </div>
    </button>
  );
}

export function VideoTour() {
  const [active, setActive] = useState<Item | null>(null);
  const featured = items.filter((i) => i.featured);
  const rooms = items.filter((i) => !i.featured);

  return (
    <section id="tour" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--sage-dark)]">
              Tour em vídeo
            </p>
            <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
              Conheça o espaço em vídeo
            </h2>
            <p className="mt-5 text-muted-foreground">
              Fachada, recepção e cada consultório. Toque em qualquer vídeo para ver em tela cheia.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <Card item={it} onOpen={() => setActive(it)} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-16 font-serif text-2xl text-foreground sm:text-3xl">
            Consultórios disponíveis
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Todas as salas privativas prontas para uso.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {rooms.map((it, i) => (
            <Reveal key={it.title} delay={i * 50}>
              <Card item={it} onOpen={() => setActive(it)} />
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Fechar"
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-elegant)]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={active.video}
              poster={active.poster}
              controls
              autoPlay
              playsInline
              className="h-auto max-h-[85vh] w-full"
            />
            <div className="absolute left-0 top-0 p-4 text-white">
              <p className="font-serif text-lg drop-shadow">{active.title}</p>
              <p className="text-xs text-white/80 drop-shadow">{active.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
