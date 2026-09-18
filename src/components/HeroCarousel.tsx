import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    id: 1,
    url: "https://ielqn9vwwubgwx6h.public.blob.vercel-storage.com/foto1.jpg",
    tag: "Consultório 1",
    title: "Consultório Clínico Completo",
    desc: "Mesa executiva de vidro, maca de exames privativa e armários planejados",
  },
  {
    id: 2,
    url: "https://ielqn9vwwubgwx6h.public.blob.vercel-storage.com/foto2.jpg",
    tag: "Consultório 2",
    title: "Consultório Executivo com Iluminação Natural",
    desc: "Mobiliário nobre, poltronas confortáveis e vista arborizada do Pacaembu",
  },
  {
    id: 3,
    url: "https://ielqn9vwwubgwx6h.public.blob.vercel-storage.com/foto3.jpg",
    tag: "Consultório 3",
    title: "Espaço Amplo e Climatizado",
    desc: "Mesa ampla em madeira, ambiente silencioso e maca com lençol descartável",
  },
  {
    id: 4,
    url: "https://ielqn9vwwubgwx6h.public.blob.vercel-storage.com/foto4.jpg",
    tag: "Consultório 4",
    title: "Consultório Moderno e Equipado",
    desc: "Lavatório interno, maca clínica e acabamento de alto padrão",
  },
  {
    id: 5,
    url: "https://ielqn9vwwubgwx6h.public.blob.vercel-storage.com/foto5.jpg",
    tag: "Consultório 5",
    title: "Sala de Consulta com Estofados Sofisticados",
    desc: "Ambiente acolhedor para consultas humanizadas e atendimento de alto nível",
  },
];

export function HeroCarousel({ className = "" }: { className?: string }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  // Sync current slide index
  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  // Autoplay functionality with pause on hover
  React.useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  const activeSlide = HERO_SLIDES[current] ?? HERO_SLIDES[0];

  return (
    <div
      className={cn("w-full flex flex-col gap-3", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-[var(--shadow-elegant)] bg-card group">
        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {HERO_SLIDES.map((slide, index) => (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] overflow-hidden bg-muted">
                  <img
                    src={slide.url}
                    alt={`${slide.title} - Coworking CEMIP`}
                    className="w-full h-full object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  {/* Elegant Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/15 shadow-sm">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      Fotos Reais do Espaço
                    </span>
                  </div>

                  {/* Top Right Counter */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className="inline-flex items-center rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white/90 border border-white/15">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(HERO_SLIDES.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-3 inset-x-3 sm:bottom-5 sm:inset-x-5 text-left text-white pointer-events-none">
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-emerald-300 mb-1">
                      {slide.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-2xl font-semibold leading-tight text-white drop-shadow-sm line-clamp-1">
                      {slide.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/85 line-clamp-1 sm:line-clamp-2 max-w-xl">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons (Frosted glass hover) */}
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 group-hover:opacity-100 hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Carousel>
      </div>

      {/* Interactive Thumbnails Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 px-1">
        <div className="grid grid-cols-5 gap-2 sm:gap-2.5 w-full">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => api?.scrollTo(idx)}
                className={cn(
                  "relative aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all cursor-pointer group/thumb",
                  isActive
                    ? "border-[var(--sage)] ring-2 ring-[var(--sage)]/40 scale-[1.03] shadow-md"
                    : "border-border/80 opacity-60 hover:opacity-100 hover:border-border",
                )}
                aria-label={`Ver foto ${idx + 1}: ${slide.title}`}
              >
                <img
                  src={slide.url}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform"
                />
                <span className="sr-only">{slide.title}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-[var(--sage)]/10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Value Highlights below Carousel */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-1 px-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--sage-dark)]" />
          Consultórios 100% mobiliados
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--sage-dark)]" />
          Recepção e secretária inclusas
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-[var(--sage-dark)]" />
          Estacionamento com manobrista
        </span>
      </div>
    </div>
  );
}
