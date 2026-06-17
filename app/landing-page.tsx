"use client";
// LP Mirelle J. Francisco — landing page

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Instagram, Menu, X } from "lucide-react";

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

const ScrollImageFrame = ({
  src,
  alt,
  className = "",
  imageClassName = "",
  objectPosition = "50% 35%",
  intensity = 1,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  intensity?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 8%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.35 });
  const y = useTransform(smooth, [0, 1], [52 * intensity, -52 * intensity]);
  const rotate = useTransform(smooth, [0, 0.5, 1], [-3 * intensity, 0, 3 * intensity]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.94, 1.04, 0.96]);
  const opacity = useTransform(smooth, [0, 0.16, 0.88, 1], [0.72, 1, 1, 0.78]);
  const imageY = useTransform(smooth, [0, 1], ["-5%", "5%"]);
  const imageScale = useTransform(smooth, [0, 1], [1.16, 1.04]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, scale, opacity }}
      whileHover={{ scale: 1.045, rotate: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-md shadow-2xl ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y: imageY, scale: imageScale, objectPosition }}
        className={`h-[112%] w-full object-cover transition-[filter] duration-700 group-hover:contrast-105 ${imageClassName}`}
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
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroCopyY = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section ref={heroRef} id="inicio" className="relative min-h-[100svh] w-full overflow-hidden bg-nude">
      <div className="absolute inset-0 z-0 h-full w-full">
        <motion.img
          src="/images/mirelle-hero-spacious.png"
          alt="Mirelle J. Francisco em retrato editorial"
          style={{ y: heroImageY, scale: heroImageScale }}
          className="h-full w-full object-cover object-[50%_0%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-softblack/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[62%] bg-gradient-to-t from-offwhite/95 via-offwhite/55 to-transparent md:hidden" />

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: heroCopyY }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[6vw] top-[46%] z-20 w-[min(31vw,32rem)] -translate-y-1/2 max-lg:right-8 max-lg:w-[min(36vw,28rem)] max-md:inset-x-6 max-md:bottom-10 max-md:top-auto max-md:w-auto max-md:translate-y-0"
      >
        <p className="mb-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-wine">
          Mirelle J. Francisco • CRP 12/19485
        </p>
        <h1 className="hero-copy-shadow max-w-[11ch] font-serif text-[clamp(3rem,5.4vw,6.4rem)] leading-[0.9] tracking-normal text-softblack/95 max-lg:text-[clamp(2.6rem,4.6vw,5.2rem)] max-md:max-w-[10ch] max-md:text-[clamp(3rem,14vw,5.4rem)]">
          Terapia para relações mais saudáveis.
        </h1>
        <p className="mt-5 max-w-md font-sans text-base font-light leading-relaxed text-softblack/78 md:text-lg">
          Atendimento presencial em Laguna e online para adultos, casais, mulheres
          e pessoas LGBT+.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-wine px-7 py-4 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-nude shadow-2xl shadow-wine/20 transition-all hover:-translate-y-0.5 hover:bg-softblack"
          >
            Agendar conversa
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-softblack/55">
            Presencial e online
          </span>
        </div>
      </motion.div>

    </section>
  );
};

const Marquee = () => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-nude/20 bg-wine py-6">
      <motion.div
        className="flex items-center gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="font-serif text-3xl italic text-nude md:text-4xl">
              Psicodrama
            </span>
            <span className="h-2 w-2 rounded-full bg-nude/50" />
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-nude md:text-base">
              Terapia de Casal
            </span>
            <span className="h-2 w-2 rounded-full bg-nude/50" />
            <span className="font-serif text-3xl italic text-nude md:text-4xl">
              Atendimento Online e Presencial
            </span>
            <span className="h-2 w-2 rounded-full bg-nude/50" />
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-nude md:text-base">
              CRP 12/19485
            </span>
            <span className="h-2 w-2 rounded-full bg-nude/50" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Manifesto = () => {
  return (
    <section id="cuidado" className="relative overflow-hidden bg-nude px-6 py-28 md:px-12 md:py-40 lg:px-24">
      <div className="pointer-events-none absolute -right-16 top-8 font-serif text-[18vw] leading-none text-wine/10">
        escuta
      </div>

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-end"
        initial={{ opacity: 0, y: 90, scale: 0.96, rotate: -1.6 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: false, margin: "-120px", amount: 0.32 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="md:col-span-7">
          <p className="mb-8 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-wine md:text-sm">
            Quando a relação pede cuidado
          </p>
          <h2 className="font-serif text-5xl leading-[0.95] tracking-normal text-softblack md:text-7xl lg:text-[6rem]">
            O problema não precisa virar crise para virar conversa.
          </h2>
        </div>

        <div className="md:col-span-5">
          <p className="mb-8 font-sans text-xl font-light leading-relaxed text-softblack/75">
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
            className="inline-flex items-center justify-center gap-4 rounded-full bg-wine px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-nude shadow-xl shadow-wine/15 transition-all duration-500 hover:bg-softblack"
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
    <section className="bg-softblack px-6 py-28 text-nude md:px-12 md:py-32 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10">
        <div className="relative md:sticky md:top-24 md:col-span-5 md:min-h-[calc(100svh-6rem)] md:py-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-md overflow-hidden rounded-md bg-[linear-gradient(to_top,rgba(24,23,21,0.96),rgba(24,23,21,0.54),rgba(24,23,21,0.08)),url('/images/mirelle-portrait.webp')] bg-cover bg-[position:50%_8%] p-8 pt-72 shadow-2xl shadow-black/40 md:h-[calc(100svh-9rem)] md:min-h-[560px] md:max-w-none md:p-10 md:pt-[32vh]"
          >
            <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-nude/55">
              Temas que aparecem na clínica
            </p>
            <h2 className="font-serif text-5xl leading-[0.92] tracking-normal text-nude md:text-[3.55rem] lg:text-[4.1rem]">
              O que pode chegar junto com você.
            </h2>
            <p className="mt-8 font-sans text-lg font-light leading-relaxed text-nude/70">
              Uma escuta cuidadosa para reconhecer padrões, conflitos e pesos
              emocionais que atravessam a vida e os relacionamentos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-sm md:hidden"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-md bg-nude/10 shadow-2xl shadow-black/40">
              <img
                src="/images/mirelle-portrait.webp"
                alt="Mirelle J. Francisco, psicóloga clínica"
                className="h-full w-full object-cover object-[50%_8%]"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-10 md:col-span-6 md:col-start-7 md:py-[12vh]">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              className="group border-t border-nude/20 py-8 md:min-h-[38vh]"
              initial={{ opacity: 0, x: 130, y: 80, rotate: 4, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              whileHover={{ x: 22, scale: 1.02, rotate: -0.8 }}
              viewport={{ once: false, amount: 0.34 }}
              transition={{ duration: 0.85, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-nude/35">
                0{idx + 1}
              </p>
              <h3 className="mb-6 font-serif text-4xl text-nude transition-colors duration-500 group-hover:text-[#E3D0C2] md:text-5xl lg:text-6xl">
                {item.title}
              </h3>
              <p className="max-w-lg font-sans text-lg font-light leading-relaxed text-nude/75 md:text-xl">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const PsychodramaSection = () => {
  return (
    <section className="bg-softblack px-6 py-28 text-nude md:px-12 md:py-40 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12 md:items-center md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -90, y: 90, scale: 0.88, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: false, margin: "-120px", amount: 0.38 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-5"
        >
          <ScrollImageFrame
            src={SECTION_IMAGES.psychodrama}
            alt="Mirelle J. Francisco em dinâmica terapêutica"
            objectPosition="50% 34%"
            intensity={1.2}
            className="aspect-[4/5] bg-nude shadow-black/45"
          />
        </motion.div>

        <div className="relative z-10 md:col-span-6 md:col-start-7">
          <motion.p
            initial={{ opacity: 0, y: 28, x: 34 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-nude/55"
          >
            Método terapêutico
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 70, x: 46, rotate: 1.4 }}
            whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.42 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl font-serif text-5xl leading-[0.95] tracking-normal md:text-7xl lg:text-[5.35rem]"
          >
            A força do <span className="font-light italic text-wine">Psicodrama</span>
          </motion.h2>
          <div className="my-8 h-px w-24 bg-wine/50" />
          <div className="max-w-2xl space-y-6 font-sans text-lg font-light leading-relaxed text-nude/78 md:text-xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              O Psicodrama ajuda a dar forma ao que, muitas vezes, fica preso
              apenas no pensamento. Em vez de falar sobre a vida como algo distante,
              a terapia convida você a olhar para as cenas, vínculos e papéis que
              atravessam sua história.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
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
    <section id="terapia-casal" className="relative overflow-hidden bg-wine px-6 py-28 text-nude md:px-12 md:py-40 lg:px-24">
      <div className="pointer-events-none absolute bottom-0 right-0 font-serif text-[22vw] leading-none text-nude/10">
        casal
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -90, y: 90, rotate: -2.4, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.34 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b border-nude/25 pb-10 md:mb-24"
        >
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-nude/70">
            Para casais que querem sair do ciclo
          </p>
          <h2 className="max-w-5xl font-serif text-6xl leading-[0.9] tracking-normal md:text-[8rem] lg:text-[9rem]">
            Terapia de Casal
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -80, y: 90, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.05, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10 md:col-span-5 md:mb-0"
          >
            <ScrollImageFrame
              src={SECTION_IMAGES.couples}
              alt="Mirelle J. Francisco em retrato para terapia de casal"
              objectPosition="52% 24%"
              intensity={1.35}
              className="aspect-[3/4] w-full bg-softblack shadow-black/40"
            />
            <div className="absolute -bottom-5 -right-3 flex h-28 w-28 items-center justify-center rounded-full bg-nude p-4 text-center shadow-xl shadow-black/20 md:-bottom-8 md:-left-10 md:right-auto md:h-44 md:w-44">
              <span className="font-serif text-base italic leading-tight text-wine md:text-xl">
                Reencontre
                <br />o caminho
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 110, y: 60, rotate: 1.8 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.34 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="pb-12 md:col-span-6 md:col-start-7"
          >
            <div className="space-y-8 font-sans text-xl font-light leading-relaxed text-offwhite/90 md:text-2xl">
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

            <div className="mt-16">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-nude px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-wine transition-all hover:-translate-y-1 hover:bg-offwhite"
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
    <section id="programa" className="bg-nude px-6 py-28 md:px-12 md:py-40 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 90, scale: 0.94, rotate: -1.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.24 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid overflow-hidden bg-offwhite md:grid-cols-12"
        >
          <div className="relative overflow-hidden bg-wine p-8 text-nude md:col-span-5 md:p-12 lg:p-16">
            <p className="mb-10 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-nude/70">
              Programa de acompanhamento para casais
            </p>
            <h2 className="mb-10 font-serif text-6xl leading-[0.9] md:text-8xl">
              Entre Nós
            </h2>
            <p className="mb-12 font-sans text-lg font-light leading-relaxed text-nude/80">
              Um percurso estruturado para casais que precisam de constância,
              profundidade e direção no processo terapêutico.
            </p>
            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-4 rounded-full bg-nude px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-wine transition-all hover:-translate-y-1 hover:bg-offwhite"
            >
              Quero entrar no programa
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>

            <ScrollImageFrame
              src={SECTION_IMAGES.program}
              alt="Mirelle J. Francisco em espaço terapêutico"
              objectPosition="50% 42%"
              intensity={1.15}
              className="mt-14 aspect-[4/5] bg-nude/10 shadow-black/30 sm:aspect-[4/3]"
            />
          </div>

          <div className="p-8 md:col-span-7 md:p-12 lg:p-16">
            <div className="mb-12 grid gap-6 md:grid-cols-2">
              <div className="border-t border-softblack/20 pt-5">
                <span className="font-serif text-5xl italic text-wine">
                  15
                </span>
                <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-softblack/60">
                  encontros previstos
                </p>
              </div>
              <div className="border-t border-softblack/20 pt-5">
                <span className="font-serif text-5xl italic text-wine">
                  3 meses
                </span>
                <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-softblack/60">
                  cronograma indicado
                </p>
              </div>
            </div>

            <div className="space-y-0 border-y border-softblack/15">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, x: 110, y: 34, rotate: 1.2 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  whileHover={{ x: 18, scale: 1.015, backgroundColor: "rgba(109,23,22,0.055)" }}
                  viewport={{ once: false, amount: 0.38 }}
                  transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-5 border-b border-softblack/15 py-8 last:border-b-0 md:grid-cols-[7rem_1fr]"
                >
                  <span className="font-serif text-5xl italic leading-none text-wine">
                    {pillar.label}
                  </span>
                  <div>
                    <h3 className="mb-3 font-serif text-3xl text-softblack">
                      {pillar.title}
                    </h3>
                    <p className="font-sans font-light leading-relaxed text-softblack/70">
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
    <section id="servicos" className="bg-offwhite px-6 py-24 md:px-12 md:py-32 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col items-end justify-between border-b border-softblack pb-8 md:flex-row">
          <h2 className="mb-4 font-serif text-4xl text-softblack md:mb-0 md:text-6xl">
            Formatos{" "}
            <span className="italic text-wine">de Atendimento</span>
          </h2>
          <span className="font-sans text-xs uppercase tracking-widest text-softblack/60">
            Clínica & Online
          </span>
        </div>

        <div className="space-y-8">
          {services.map((srv, i) => (
            <motion.div
              key={srv.name}
              className="group flex cursor-default flex-col gap-4 md:flex-row md:gap-12"
              initial={{ opacity: 0, x: i % 2 === 0 ? -110 : 110, y: 34, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              whileHover={{ x: 18, scale: 1.018 }}
              viewport={{ once: false, amount: 0.38 }}
              transition={{ duration: 0.78, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-full border-t border-softblack/10 pt-4 transition-colors duration-500 group-hover:border-wine md:w-1/3">
                <h4 className="font-sans text-lg font-medium text-softblack">
                  {srv.name}
                </h4>
                <span className="font-serif text-xl italic text-wine">
                  {srv.meta}
                </span>
              </div>
              <div className="w-full border-t border-transparent pt-0 md:w-2/3 md:border-softblack/10 md:pt-4">
                <p className="font-sans font-light leading-relaxed text-softblack/70">
                  {srv.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-4 rounded-full bg-wine px-10 py-5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-nude shadow-2xl shadow-wine/20 transition-all hover:-translate-y-1 hover:bg-softblack"
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
    <section id="sobre" className="relative overflow-hidden bg-nude px-6 py-24 md:px-12 md:py-32 lg:px-24">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">
        <div className="order-2 w-full md:order-1 md:w-5/12">
          <motion.div
            initial={{ opacity: 0, x: -80, y: 90, scale: 0.9, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.025, rotate: -1.2 }}
            viewport={{ once: false, amount: 0.32 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-3 -z-10 hidden rounded-[2rem] border border-wine/15 md:block" />
            <ScrollImageFrame
              src={SECTION_IMAGES.about}
              alt="Retrato profissional de Mirelle J. Francisco"
              objectPosition="50% 25%"
              intensity={0.95}
              className="aspect-[4/5] bg-offwhite shadow-softblack/15"
            />
          </motion.div>
        </div>

        <div className="order-1 w-full md:order-2 md:w-7/12">
          <h2 className="mb-6 font-serif text-5xl leading-none text-softblack md:text-7xl">
            Mirelle J. <br />
            <span className="italic text-wine">Francisco</span>
          </h2>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.2em] text-softblack">
            CRP 12/19485
          </p>

          <div className="max-w-xl space-y-6 font-sans text-lg font-light text-softblack/80">
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
    <section id="localizacao" className="bg-offwhite px-6 py-20 md:px-12 md:py-28 lg:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-softblack/10 pt-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.3em] text-wine">
            Atendimento presencial em Laguna
          </p>
          <h2 className="font-serif text-5xl leading-none text-softblack md:text-7xl">
            Localização
          </h2>
        </div>

        <div className="md:col-span-3">
          <address className="font-sans text-base font-light not-italic leading-relaxed text-softblack/75">
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

        <div className="overflow-hidden bg-nude md:col-span-4">
          <iframe
            title="Mapa do consultório de Mirelle J. Francisco em Laguna"
            src={MAPS_EMBED}
            className="h-64 w-full grayscale md:h-72"
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
    <footer className="bg-softblack px-6 pb-12 pt-32 text-offwhite md:px-12 lg:px-24">
      <div className="mx-auto mb-24 flex max-w-7xl flex-col items-center text-center">
        <h2 className="mb-12 font-serif text-5xl md:text-7xl lg:text-8xl">
          Vamos <span className="italic text-wine">conversar?</span>
        </h2>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-offwhite px-12 py-5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-softblack shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-wine hover:text-offwhite"
        >
          Agendar pelo WhatsApp
        </a>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 border-t border-offwhite/20 pt-12 md:grid-cols-3">
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
      className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-softblack/30 ring-4 ring-white/80 transition-all hover:-translate-y-1 hover:bg-[#1DA851] md:h-20 md:w-20"
    >
      <WhatsAppIcon className="h-9 w-9 md:h-11 md:w-11" />
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
