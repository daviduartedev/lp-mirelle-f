"use client";
// LP Mirelle J. Francisco — landing page

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight, Instagram, Menu, X } from "lucide-react";

/*
 * Animação padrão do site — estilo Webflow.
 * Apenas ENTRADA ao rolar: fade + leve subida, uma única vez (once: true).
 * Não há movimento de saída e os elementos não reanimam ao rolar de volta.
 * Centralizado aqui para manter tudo coerente entre as seções.
 */
const EASE = [0.16, 1, 0.3, 1] as const;
const REVEAL_RISE = 40;

const reveal: Variants = {
  hidden: { opacity: 0, y: REVEAL_RISE },
  show: { opacity: 1, y: 0 },
};

/** Props padronizadas de entrada-no-scroll para qualquer motion.* */
const revealProps = (delay = 0, duration = 0.8) => ({
  variants: reveal,
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, amount: 0.2 },
  transition: { duration, delay, ease: EASE },
});

const WHATSAPP_LINK = "https://wa.me/message/37XWRUDV5XBGD1";
const INSTAGRAM_LINK = "https://www.instagram.com/psicologamirellejf/";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=R.%20Anita%20Garibaldi%2C%2048%20-%20Centro%2C%20Laguna%20-%20SC%2C%2088790-000";
const MAPS_EMBED =
  "https://www.google.com/maps?q=R.%20Anita%20Garibaldi%2C%2048%20-%20Centro%2C%20Laguna%20-%20SC%2C%2088790-000&output=embed";

const SECTION_IMAGES = {
  psychodrama: "/ER-57.jpg",
  couples: "/ER-31.jpg",
  program: "/ER-50.jpg",
  about: "/images/mirelle-about.webp",
};

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
  >
    <path d="M16.01 3.2c-7.06 0-12.8 5.66-12.8 12.62 0 2.25.61 4.45 1.76 6.38L3.1 28.8l6.8-1.78a12.96 12.96 0 0 0 6.11 1.53c7.06 0 12.8-5.66 12.8-12.63S23.07 3.2 16.01 3.2Zm0 23.2c-1.9 0-3.77-.5-5.4-1.45l-.39-.23-4.03 1.06 1.08-3.87-.25-.4a10.28 10.28 0 0 1-1.62-5.69c0-5.78 4.76-10.48 10.61-10.48s10.61 4.7 10.61 10.48S21.86 26.4 16.01 26.4Zm5.82-7.84c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.83-1.59-1.86-1.78-2.17-.18-.32-.02-.49.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.69-.97-2.32-.26-.6-.52-.52-.71-.53h-.61c-.21 0-.55.08-.84.39-.29.32-1.1 1.07-1.1 2.6 0 1.53 1.13 3.01 1.29 3.22.16.21 2.23 3.36 5.4 4.71.75.32 1.34.51 1.8.65.76.24 1.45.21 1.99.13.61-.09 1.88-.76 2.15-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37Z" />
  </svg>
);

// Moldura de imagem com ENTRADA suave (fade + leve subida), sem parallax
// contínuo nem efeito de saída ao rolar. Mantém apenas o zoom no hover.
const ScrollImageFrame = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  objectPosition = "50% 35%",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  /** Mantido por compatibilidade de chamada; não tem mais efeito. */
  intensity?: number;
}) => {
  return (
    <motion.div
      {...revealProps(0, 0.9)}
      className={`group relative overflow-hidden rounded-md shadow-2xl ${className}`}
    >
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className={`h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:contrast-105 ${imageClassName}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.22),transparent_34%,rgba(109,23,22,0.1)_78%,transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  );
};

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#terapia-casal", label: "Terapia de casal" },
  { href: "#programa", label: "Entre Nós" },
  { href: "#servicos", label: "Atendimentos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#localizacao", label: "Localização" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  // Bloqueia o scroll do body enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed left-1/2 top-4 z-[80] w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100%-2rem)]">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/35 bg-offwhite/55 px-4 py-3 shadow-2xl shadow-softblack/10 backdrop-blur-xl md:px-6">
        <a href="#inicio" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/brand/logo-wine-transparent.png"
            alt="Mirelle J. Francisco Psicóloga"
            className="h-9 w-9 object-contain"
          />
          <span className="hidden font-display text-[10px] uppercase tracking-[0.22em] text-softblack sm:block">
            Mirelle J. Francisco
          </span>
        </a>

        {/* Navegação completa — apenas desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-softblack/75 transition-colors hover:text-wine"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA WhatsApp — escondido no mobile bem estreito para dar espaço ao logo */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-wine px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-nude transition-all hover:-translate-y-0.5 hover:bg-softblack xs:inline-flex sm:flex"
          >
            WhatsApp
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          {/* Botão hambúrguer — mobile e tablet */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-softblack/15 bg-offwhite/60 text-softblack transition-colors hover:border-wine hover:text-wine lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Painel de navegação mobile/tablet */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 overflow-hidden rounded-2xl border border-white/35 bg-offwhite/95 p-3 shadow-2xl shadow-softblack/15 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-softblack/10 last:border-b-0">
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-softblack/80 transition-colors hover:text-wine"
                  >
                    {link.label}
                    <ArrowUpRight className="h-4 w-4 text-wine" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-full bg-wine px-6 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-nude transition-colors hover:bg-softblack"
            >
              Agendar pelo WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full overflow-hidden bg-offwhite lg:bg-nude"
    >
      <div className="flex min-h-[100svh] flex-col lg:contents">
        <div className="relative h-[44svh] min-h-[240px] w-full shrink-0 md:h-[42svh] md:min-h-[300px] lg:absolute lg:inset-0 lg:h-full lg:min-h-0">
          <img
            src="/images/mirelle-hero-spacious.png"
            alt="Mirelle J. Francisco em retrato editorial"
            className="h-full w-full object-cover object-[50%_18%] md:object-[50%_10%] lg:object-[50%_0%]"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-28 bg-gradient-to-t from-softblack/10 to-transparent lg:block" />

        <motion.div
          initial={{ opacity: 0, y: REVEAL_RISE }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          className="relative z-20 -mt-5 flex flex-1 flex-col justify-end rounded-t-[1.75rem] bg-offwhite px-6 pb-24 pt-7 shadow-[0_-18px_36px_rgba(26,25,24,0.07)] md:-mt-12 md:justify-start md:px-12 md:pb-20 md:pt-10 lg:absolute lg:right-[6vw] lg:top-[46%] lg:mt-0 lg:w-[min(31vw,32rem)] lg:-translate-y-1/2 lg:justify-end lg:rounded-none lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:shadow-none"
        >
          <p className="mb-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-wine md:mb-4 md:text-[0.68rem]">
            Mirelle J. Francisco • CRP 12/19485
          </p>
          <h1 className="max-w-[12ch] font-serif text-[clamp(2.35rem,10.5vw,3.4rem)] leading-[0.95] tracking-normal text-softblack/95 md:max-w-[13ch] md:text-[clamp(2.8rem,6.2vw,4rem)] md:leading-[0.92] lg:hero-copy-shadow lg:max-w-[11ch] lg:text-[clamp(3rem,5.4vw,6.4rem)] lg:leading-[0.9]">
            Terapia para <span className="hero-shine-text">relações</span> mais{" "}
            <span className="hero-shine-text italic">saudáveis.</span>
          </h1>
          <p className="mt-4 max-w-md font-sans text-[0.95rem] font-light leading-relaxed text-softblack/78 md:mt-5 md:text-base lg:text-lg">
            Atendimento <span className="hero-shine-text font-medium">presencial em Laguna</span>{" "}
            e <span className="hero-shine-text font-medium">online</span> para adultos,
            casais, mulheres e pessoas LGBT+.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-7">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-wine px-7 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-nude shadow-2xl shadow-wine/20 transition-all hover:-translate-y-0.5 hover:bg-softblack sm:w-auto"
            >
              Agendar conversa
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="text-center font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-softblack/55 sm:text-left md:text-[0.68rem]">
              Presencial e online
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-nude/20 bg-wine py-4 md:py-6">
      <motion.div
        className="flex items-center gap-8 md:gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="font-serif text-2xl italic text-nude md:text-4xl">
              Psicodrama
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-nude/50 md:h-2 md:w-2" />
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-nude md:text-base md:tracking-[0.2em]">
              Terapia de Casal
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-nude/50 md:h-2 md:w-2" />
            <span className="font-serif text-2xl italic text-nude md:text-4xl">
              Atendimento Online e Presencial
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-nude/50 md:h-2 md:w-2" />
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-nude md:text-base md:tracking-[0.2em]">
              CRP 12/19485
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-nude/50 md:h-2 md:w-2" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Manifesto = () => {
  return (
    <section id="cuidado" className="relative overflow-hidden bg-nude px-6 py-20 md:px-12 md:py-32 lg:px-24 lg:py-40">
      <div className="pointer-events-none absolute -right-16 top-8 font-serif text-[18vw] leading-none text-wine/10">
        escuta
      </div>

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-end lg:gap-12"
        {...revealProps(0, 1)}
      >
        <div className="lg:col-span-7">
          <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-wine md:mb-8 md:text-sm">
            Quando a relação pede cuidado
          </p>
          <h2 className="font-serif text-[clamp(2.15rem,8.5vw,3rem)] leading-[1.02] tracking-normal text-softblack md:text-5xl md:leading-[0.98] lg:text-[6rem] lg:leading-[0.95]">
            O problema não precisa virar crise para virar conversa.
          </h2>
        </div>

        <div className="lg:col-span-5">
          <p className="mb-6 font-sans text-lg font-light leading-relaxed text-softblack/75 md:mb-8 md:text-xl">
            Se as conversas terminam sempre no mesmo lugar, se o afastamento
            cresce em silêncio ou se os padrões se repetem apesar do amor, a
            terapia pode abrir um espaço seguro para compreender o que está
            acontecendo entre vocês.
          </p>
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full items-center justify-center gap-4 rounded-full bg-wine px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-nude shadow-xl shadow-wine/15 transition-all duration-500 hover:bg-softblack sm:w-auto"
          >
            Quero falar sobre meu relacionamento
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

const EmotionalSection = () => {
  const items = [
    {
      title: "Conflitos & Comunicação",
      desc: "Quando o diálogo vira disputa e a conexão parece inalcançável.",
    },
    {
      title: "Ansiedade & Angústia",
      desc: "O peso invisível do excesso de futuro e da autocobrança desmedida.",
    },
    {
      title: "Autoestima",
      desc: "A forma como nos enxergamos dita os limites das nossas relações e escolhas.",
    },
    {
      title: "Padrões Afetivos",
      desc: "Ciclos que se repetem. Escolhas que parecem obra do acaso, mas contam nossa história.",
    },
  ];

  return (
    <section className="bg-softblack px-6 py-20 text-nude md:px-12 md:py-28 lg:px-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:sticky lg:top-24 lg:col-span-5 lg:min-h-[calc(100svh-6rem)] lg:py-10">
          <motion.div
            {...revealProps(0, 0.9)}
            className="mb-8 overflow-hidden rounded-md lg:hidden"
          >
            <div className="aspect-[4/5] bg-nude/10 shadow-2xl shadow-black/40">
              <img
                src="/images/mirelle-portrait.webp"
                alt="Mirelle J. Francisco, psicóloga clínica"
                className="h-full w-full object-cover object-[50%_8%]"
              />
            </div>
          </motion.div>

          <motion.div
            {...revealProps()}
            className="relative max-w-md rounded-md border border-nude/10 bg-softblack p-6 shadow-2xl shadow-black/40 md:max-w-2xl md:p-8 lg:h-[calc(100svh-9rem)] lg:min-h-[560px] lg:max-w-none lg:overflow-hidden lg:border-0 lg:bg-[linear-gradient(to_top,rgba(24,23,21,0.96),rgba(24,23,21,0.54),rgba(24,23,21,0.08)),url('/images/mirelle-portrait.webp')] lg:bg-cover lg:bg-[position:50%_8%] lg:p-10 lg:pt-[32vh] lg:shadow-black/40"
          >
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-nude/55 md:mb-5">
              Temas que aparecem na clínica
            </p>
            <h2 className="font-serif text-[clamp(2.15rem,8vw,2.75rem)] leading-[0.95] tracking-normal text-nude md:text-5xl md:leading-[0.94] lg:text-[4.1rem] lg:leading-[0.92]">
              O que pode chegar junto com você.
            </h2>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-nude/70 md:mt-8 md:text-lg">
              Uma escuta cuidadosa para reconhecer padrões, conflitos e pesos
              emocionais que atravessam a vida e os relacionamentos.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 lg:col-span-6 lg:col-start-7 lg:gap-10 lg:py-[12vh]">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              className="group border-t border-nude/20 py-6 transition-transform duration-500 md:py-8 lg:min-h-[38vh] lg:hover:translate-x-3"
              {...revealProps(idx * 0.08)}
            >
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-nude/35 md:mb-6">
                0{idx + 1}
              </p>
              <h3 className="mb-4 font-serif text-[clamp(1.85rem,7vw,2.35rem)] text-nude transition-colors duration-500 md:mb-6 md:text-4xl lg:text-6xl lg:group-hover:text-[#E3D0C2]">
                {item.title}
              </h3>
              <p className="max-w-lg font-sans text-base font-light leading-relaxed text-nude/75 md:text-lg lg:text-xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        {...revealProps(0.1, 0.75)}
        className="-mx-6 mt-12 bg-wine py-8 md:-mx-12 md:mt-20 md:py-12 lg:-mx-24"
      >
        <div className="flex flex-col items-center gap-4 px-6 md:gap-5">
          <div className="h-px w-12 bg-nude/70" />
          <p className="max-w-3xl text-center font-serif text-base font-light leading-relaxed text-nude md:text-xl lg:text-[1.35rem]">
            Uma escuta cuidadosa para reconhecer o que atravessa a vida e os
            relacionamentos.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const PsychodramaSection = () => {
  return (
    <section className="bg-softblack px-6 py-20 text-nude md:px-12 md:py-32 lg:px-24 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="relative lg:col-span-5">
          <ScrollImageFrame
            src={SECTION_IMAGES.psychodrama}
            alt="Mirelle J. Francisco em dinâmica terapêutica"
            objectPosition="50% 34%"
            intensity={1.2}
            className="aspect-[4/5] bg-nude shadow-black/45"
          />
        </div>

        <div className="relative z-10 lg:col-span-6 lg:col-start-7">
          <motion.p
            {...revealProps(0, 0.75)}
            className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-nude/55 md:mb-5"
          >
            Método terapêutico
          </motion.p>
          <motion.h2
            {...revealProps(0.06, 1)}
            className="max-w-2xl font-serif text-[clamp(2.25rem,8.5vw,3rem)] leading-[0.98] tracking-normal md:text-5xl md:leading-[0.96] lg:text-[5.35rem] lg:leading-[0.95]"
          >
            A força do <span className="font-light italic text-wine">Psicodrama</span>
          </motion.h2>
          <div className="my-6 h-px w-20 bg-wine/50 md:my-8 md:w-24" />
          <div className="max-w-2xl space-y-5 font-sans text-base font-light leading-relaxed text-nude/78 md:space-y-6 md:text-lg lg:text-xl">
            <motion.p {...revealProps(0.12, 1)}>
              O Psicodrama ajuda a dar forma ao que, muitas vezes, fica preso
              apenas no pensamento. Em vez de falar sobre a vida como algo distante,
              a terapia convida você a olhar para as cenas, vínculos e papéis que
              atravessam sua história.
            </motion.p>
            <motion.p {...revealProps(0.18, 1)}>
              Com esse cuidado, torna-se possível reconhecer padrões, experimentar
              novas respostas e abrir espaço para relações mais espontâneas,
              conscientes e verdadeiras.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
const CouplesTherapy = () => {
  return (
    <section id="terapia-casal" className="relative overflow-hidden bg-wine px-6 py-20 text-nude md:px-12 md:py-32 lg:px-24 lg:py-40">
      <div className="pointer-events-none absolute bottom-0 right-0 font-serif text-[22vw] leading-none text-nude/10">
        casal
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          {...revealProps(0, 1)}
          className="mb-12 border-b border-nude/25 pb-8 md:mb-16 md:pb-10 lg:mb-24"
        >
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-nude/70 md:mb-6">
            Para casais que querem sair do ciclo
          </p>
          <h2 className="max-w-5xl font-serif text-[clamp(2.75rem,12vw,4.25rem)] leading-[0.92] tracking-normal md:text-[6rem] md:leading-[0.9] lg:text-[9rem]">
            Terapia de Casal
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="relative mb-4 pb-10 lg:col-span-5 lg:mb-0 lg:pb-0">
            <ScrollImageFrame
              src={SECTION_IMAGES.couples}
              alt="Mirelle J. Francisco em retrato para terapia de casal"
              objectPosition="52% 24%"
              intensity={1.35}
              className="aspect-[3/4] w-full bg-softblack shadow-black/40"
            />
            <div className="absolute bottom-2 right-2 flex h-24 w-24 items-center justify-center rounded-full bg-nude p-3 text-center shadow-xl shadow-black/20 md:h-32 md:w-32 md:p-4 lg:-bottom-8 lg:-left-10 lg:right-auto lg:h-44 lg:w-44">
              <span className="font-serif text-sm italic leading-tight text-wine md:text-lg lg:text-xl">
                Reencontre
                <br />o caminho
              </span>
            </div>
          </div>

          <motion.div
            {...revealProps(0.1, 1)}
            className="pb-4 lg:col-span-6 lg:col-start-7 lg:pb-12"
          >
            <div className="space-y-6 font-sans text-lg font-light leading-relaxed text-offwhite/90 md:space-y-7 md:text-xl lg:space-y-8 lg:text-2xl">
              <p>
                A relação amorosa é onde nossas maiores fragilidades encontram
                palco. Quando a comunicação falha, o que resta é o ruído do
                desentendimento constante.
              </p>
              <p>
                O espaço terapêutico não busca encontrar um culpado, mas
                traduzir o que o silêncio e as brigas estão tentando dizer. Um
                convite para construir novas pontes e olhar para a dinâmica a
                dois com responsabilidade.
              </p>
            </div>

            <div className="mt-10 md:mt-16">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-4 rounded-full bg-nude px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-wine transition-all hover:-translate-y-1 hover:bg-offwhite sm:w-auto"
              >
                Conversar pelo WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CouplesProgram = () => {
  const pillars = [
    {
      label: "EU",
      title: "Olhar para si",
      text: "Histórias, feridas e padrões pessoais que atravessam o vínculo.",
    },
    {
      label: "TU",
      title: "Olhar para o outro",
      text: "Reconhecer quem está ao lado com mais realidade, presença e escuta.",
    },
    {
      label: "NÓS",
      title: "Construir a relação",
      text: "Criar novas formas de diálogo, intimidade e responsabilidade afetiva.",
    },
  ];

  return (
    <section id="programa" className="bg-nude px-6 py-20 md:px-12 md:py-32 lg:px-24 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...revealProps(0, 1)}
          className="grid overflow-hidden bg-offwhite lg:grid-cols-12"
        >
          <div className="relative overflow-hidden bg-wine p-6 text-nude sm:p-8 md:p-12 lg:col-span-5 lg:p-16">
            <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-nude/70 md:mb-10">
              Programa de acompanhamento para casais
            </p>
            <h2 className="mb-6 font-serif text-[clamp(2.75rem,11vw,3.5rem)] leading-[0.92] md:mb-10 md:text-6xl md:leading-[0.9] lg:text-8xl">
              Entre Nós
            </h2>
            <p className="mb-8 font-sans text-base font-light leading-relaxed text-nude/80 md:mb-12 md:text-lg">
              Um percurso estruturado para casais que precisam de constância,
              profundidade e direção no processo terapêutico.
            </p>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-4 rounded-full bg-nude px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-wine transition-all hover:-translate-y-1 hover:bg-offwhite sm:w-auto"
            >
              Quero entrar no programa
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <ScrollImageFrame
              src={SECTION_IMAGES.program}
              alt="Mirelle J. Francisco em espaço terapêutico"
              objectPosition="50% 42%"
              intensity={1.15}
              className="mt-10 aspect-[4/5] bg-nude/10 shadow-black/30 sm:aspect-[4/3] md:mt-14"
            />
          </div>

          <div className="p-6 sm:p-8 md:p-12 lg:col-span-7 lg:p-16">
            <div className="mb-8 grid grid-cols-2 gap-5 md:mb-12 md:gap-6">
              <div className="border-t border-softblack/20 pt-4 md:pt-5">
                <span className="font-serif text-4xl italic text-wine md:text-5xl">
                  15
                </span>
                <p className="mt-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-softblack/60 md:text-xs md:tracking-[0.18em]">
                  encontros previstos
                </p>
              </div>
              <div className="border-t border-softblack/20 pt-4 md:pt-5">
                <span className="font-serif text-4xl italic text-wine md:text-5xl">
                  3 meses
                </span>
                <p className="mt-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-softblack/60 md:text-xs md:tracking-[0.18em]">
                  cronograma indicado
                </p>
              </div>
            </div>

            <div className="space-y-0 border-y border-softblack/15">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  {...revealProps(0)}
                  className="grid gap-4 border-b border-softblack/15 py-6 transition-colors duration-500 last:border-b-0 md:grid-cols-[7rem_1fr] md:gap-5 md:py-8 md:hover:translate-x-3 md:hover:bg-[rgba(109,23,22,0.055)]"
                >
                  <span className="font-serif text-4xl italic leading-none text-wine md:text-5xl">
                    {pillar.label}
                  </span>
                  <div>
                    <h3 className="mb-2 font-serif text-2xl text-softblack md:mb-3 md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm font-light leading-relaxed text-softblack/70 md:text-base">
                      {pillar.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 font-sans text-sm font-light leading-relaxed text-softblack/55">
              Valores e condições são apresentados apenas em conversa direta,
              respeitando a avaliação da demanda e os cuidados éticos da
              comunicação profissional.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      name: "Psicoterapia Individual",
      meta: "50 min",
      desc: "Um espaço seguro para explorar sua subjetividade, angústias e desejos mais profundos. Modalidade online ou presencial.",
    },
    {
      name: "Terapia de Casal",
      meta: "100 min",
      desc: "Sessões estendidas para mediação de conflitos e reconstrução do vínculo afetivo, com foco na dinâmica relacional.",
    },
    {
      name: "Atendimento Presencial",
      meta: "Laguna / SC",
      desc: "Espaço físico acolhedor e sigiloso localizado na Rua Anita Garibaldi, 48, Centro, Laguna.",
    },
    {
      name: "Atendimento Online",
      meta: "Brasil",
      desc: "Sessões por videochamada para pacientes em outras localidades, mantendo o mesmo rigor e ética do presencial.",
    },
    {
      name: "Programa Entre Nós",
      meta: "Acompanhamento para casais",
      desc: "Formato estruturado para casais, com encontros do casal e atendimentos individuais ao longo do processo.",
    },
  ];

  return (
    <section id="servicos" className="bg-offwhite px-6 py-20 md:px-12 md:py-28 lg:px-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-softblack pb-6 md:mb-14 md:flex-row md:items-end md:pb-8 lg:mb-16">
          <h2 className="font-serif text-[clamp(2rem,7.5vw,2.75rem)] text-softblack md:text-5xl lg:text-6xl">
            Formatos{" "}
            <span className="italic text-wine">de Atendimento</span>
          </h2>
          <span className="font-sans text-xs uppercase tracking-widest text-softblack/60">
            Clínica & Online
          </span>
        </div>

        <div className="space-y-0 md:space-y-8">
          {services.map((srv, i) => (
            <motion.div
              key={srv.name}
              className="group flex cursor-default flex-col gap-2 border-t border-softblack/10 py-5 md:flex-row md:gap-12 md:py-0 md:pt-4"
              {...revealProps(i * 0.06)}
            >
              <div className="w-full transition-colors duration-500 md:w-1/3 md:group-hover:border-wine">
                <h4 className="font-sans text-base font-medium text-softblack md:text-lg">
                  {srv.name}
                </h4>
                <span className="font-serif text-lg italic text-wine md:text-xl">
                  {srv.meta}
                </span>
              </div>
              <div className="w-full md:w-2/3">
                <p className="font-sans text-sm font-light leading-relaxed text-softblack/70 md:text-base">
                  {srv.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full max-w-sm items-center justify-center gap-4 rounded-full bg-wine px-10 py-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-nude shadow-2xl shadow-wine/20 transition-all hover:-translate-y-1 hover:bg-softblack sm:w-auto sm:max-w-none"
          >
            Tirar dúvidas pelo WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="relative overflow-hidden bg-nude px-6 py-20 md:px-12 md:py-28 lg:px-24 lg:py-32">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="order-2 w-full lg:order-1 lg:w-5/12">
          <motion.div
            initial={{ opacity: 0, x: -80, y: 90, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.025, rotate: -1.2 }}
            viewport={{ once: false, amount: 0.32 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-lg:mx-auto max-lg:max-w-md"
          >
            <div className="absolute -inset-3 -z-10 hidden rounded-[2rem] border border-wine/15 lg:block" />
            <ScrollImageFrame
              src={SECTION_IMAGES.about}
              alt="Retrato profissional de Mirelle J. Francisco"
              objectPosition="50% 25%"
              intensity={0.95}
              className="aspect-[4/5] bg-offwhite shadow-softblack/15"
            />
          </motion.div>
        </div>

        <div className="order-1 w-full lg:order-2 lg:w-7/12">
          <h2 className="mb-5 font-serif text-[clamp(2.5rem,9vw,3.25rem)] leading-none text-softblack md:mb-6 md:text-6xl lg:text-7xl">
            Mirelle J. <br />
            <span className="italic text-wine">Francisco</span>
          </h2>
          <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-softblack md:mb-8">
            CRP 12/19485
          </p>

          <div className="max-w-xl space-y-5 font-sans text-base font-light text-softblack/80 md:space-y-6 md:text-lg">
            <p>
              Especialista em Terapia de Casal e psicóloga clínica com atuação
              orientada pelo Psicodrama. Sua prática é focada na profundidade
              dos vínculos e na compreensão de como nos relacionamos com o mundo
              e com nós mesmos.
            </p>
            <p>
              O processo terapêutico oferece um contorno seguro para que as
              dores encontrem palavras e os padrões rígidos possam ser
              observados com mais consciência.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section id="localizacao" className="bg-offwhite px-6 py-16 md:px-12 md:py-24 lg:px-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 border-t border-softblack/10 pt-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-12">
        <div className="lg:col-span-5">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.3em] text-wine md:mb-5">
            Atendimento presencial em Laguna
          </p>
          <h2 className="font-serif text-[clamp(2.25rem,8vw,3rem)] leading-none text-softblack md:text-6xl lg:text-7xl">
            Localização
          </h2>
        </div>

        <div className="lg:col-span-3">
          <address className="font-sans text-sm font-light not-italic leading-relaxed text-softblack/75 md:text-base">
            Mirelle J. Francisco - Psicóloga Clínica
            <br />
            CRP 12/19485
            <br />
            R. Anita Garibaldi, 48 - Centro
            <br />
            Laguna - SC, 88790-000
          </address>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 border-b border-wine pb-2 font-sans text-xs uppercase tracking-[0.18em] text-wine transition-colors hover:border-softblack hover:text-softblack"
          >
            Ver no Google Maps
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="overflow-hidden bg-nude lg:col-span-4">
          <iframe
            title="Mapa do consultório de Mirelle J. Francisco em Laguna"
            src={MAPS_EMBED}
            className="h-64 w-full md:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-softblack px-6 pb-10 pt-20 text-offwhite md:px-12 md:pb-12 md:pt-28 lg:px-24 lg:pt-32">
      <div className="mx-auto mb-16 flex max-w-7xl flex-col items-center text-center md:mb-24">
        <h2 className="mb-8 font-serif text-[clamp(2.35rem,9vw,3rem)] md:mb-12 md:text-6xl lg:text-8xl">
          Vamos <span className="italic text-wine">conversar?</span>
        </h2>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="w-full max-w-xs rounded-full bg-offwhite px-10 py-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-softblack shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-wine hover:text-offwhite sm:w-auto sm:max-w-none sm:px-12"
        >
          Agendar pelo WhatsApp
        </a>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-t border-offwhite/20 pt-10 md:grid-cols-3 md:gap-12 md:pt-12">
        <div>
          <p className="mb-4 font-serif text-2xl italic">Contato</p>
          <ul className="space-y-2 font-sans text-sm font-light opacity-80">
            <li>
              <a href={WHATSAPP_LINK} className="hover:text-nude">
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:mirellejfpsi@gmail.com"
                className="hover:text-nude"
              >
                mirellejfpsi@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-serif text-2xl italic">Endereço</p>
          <ul className="space-y-2 font-sans text-sm font-light opacity-80">
            <li>Rua Anita Garibaldi, 48</li>
            <li>Centro, Laguna - SC</li>
            <li>CEP 88790-000</li>
            <li>Atendimento presencial e online</li>
          </ul>
        </div>

        <div className="md:text-right">
          <img
            src="/brand/logo-wine-transparent.png"
            alt="Mirelle J. Francisco Psicóloga"
            className="mb-6 ml-0 h-24 w-24 object-contain md:ml-auto"
          />
          <p className="mb-2 font-serif text-3xl">Mirelle J. Francisco</p>
          <p className="font-sans text-xs font-light uppercase tracking-widest opacity-60">
            Psicóloga Clínica • CRP 12/19485
          </p>
          <div className="mt-6 flex items-center gap-3 md:justify-end">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp de Mirelle J. Francisco"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-offwhite/20 text-offwhite transition-colors hover:border-nude hover:bg-nude hover:text-softblack"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Mirelle J. Francisco"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-offwhite/20 text-offwhite transition-colors hover:border-nude hover:bg-nude hover:text-softblack"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-12 font-sans text-xs opacity-40">
            As informações desta página têm caráter informativo e não
            substituem avaliação psicológica individual.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar Mirelle no WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-softblack/30 ring-4 ring-white/80 transition-all hover:-translate-y-1 hover:bg-[#1DA851] md:bottom-5 md:right-5 lg:h-20 lg:w-20"
    >
      <WhatsAppIcon className="h-8 w-8 lg:h-11 lg:w-11" />
    </a>
  );
};

export default function LandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mirelle J. Francisco - Psicóloga Clínica",
    description:
      "Psicóloga clínica especialista em Terapia de Casal. Atendimento presencial em Laguna, SC, e online.",
    email: "mirellejfpsi@gmail.com",
    telephone: "+55 48 98829-6393",
    image: "/images/mirelle-hero-spacious.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Anita Garibaldi, 48 - Centro",
      addressLocality: "Laguna",
      addressRegion: "SC",
      postalCode: "88790-000",
      addressCountry: "BR",
    },
    areaServed: ["Laguna", "Santa Catarina", "Brasil"],
    sameAs: [MAPS_LINK],
  };

  return (
    <div className="bg-offwhite font-sans text-softblack selection:bg-wine selection:text-nude">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <Hero />
      <Marquee />
      <Manifesto />
      <EmotionalSection />
      <PsychodramaSection />
      <CouplesTherapy />
      <CouplesProgram />
      <Services />
      <About />
      <Location />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
