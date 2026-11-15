'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Layers, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import heroImageAsset from '@/src/assets/images/hero_tech_ecosystem_1794574240796.jpg';
import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import insta360Img from '@/src/assets/images/insta360_x5_camera_studio_1794584493843.jpg';

interface HeroEcosystemProps {
  onSelectSection: (sectionId: string) => void;
}

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const EVOLUTION_STAGES = [
  {
    id: 'tecnologia',
    step: '01',
    word: 'Tecnología',
    headline: 'Sistemas Web, Hardware, Redes, IoT e Inteligencia Artificial',
    detail:
      'Domino herramientas técnicas reales: desde el desarrollo web con React/Next.js y mantenimiento de equipos hasta microcontroladores ESP32, IA local y captura 360°.',
    domains: 'Desarrollo Web · Soporte · Redes · ESP32 · IA · Insta360 X5',
    imageSrc: getImgSrc(heroImageAsset),
    imageAlt:
      'Estación de ingeniería multidisciplinaria con microcontroladores ESP32, óptica fotográfica y arquitectura de sistemas',
    imageCaption: 'Convergencia de Hardware, Software y Creación Visual',
    imageSub: 'Desde el circuito electrónico y soporte de equipos hasta la arquitectura web moderna',
    ambientGradient:
      'radial-gradient(circle at 18% 22%, rgba(217, 119, 6, 0.14), transparent 55%), radial-gradient(circle at 82% 75%, rgba(120, 53, 15, 0.10), transparent 50%)',
    accentBg: 'bg-amber-600 text-white',
    accentText: 'text-amber-800',
    accentBorder: 'border-amber-500/40',
  },
  {
    id: 'analisis',
    step: '02',
    word: 'Análisis',
    headline: 'Mirada técnica combinada con Administración de Empresas',
    detail:
      'No ejecuto tareas a ciegas. Analizo cómo funciona tu flujo de trabajo, qué causa el desorden o la lentitud y qué solución aporta mayor valor práctico.',
    domains: 'Diagnóstico · Administración · Procesos · Viabilidad · Orden',
    imageSrc: getImgSrc(webSystemsImg),
    imageAlt: 'Estación de arquitectura de software, análisis de datos y estructuración de procesos',
    imageCaption: 'Análisis Técnico + Visión Organizacional',
    imageSub: 'Comprender el problema operativo antes de elegir la herramienta',
    ambientGradient:
      'radial-gradient(circle at 22% 28%, rgba(37, 99, 235, 0.13), transparent 55%), radial-gradient(circle at 80% 70%, rgba(15, 23, 42, 0.09), transparent 50%)',
    accentBg: 'bg-sky-700 text-white',
    accentText: 'text-sky-800',
    accentBorder: 'border-sky-500/40',
  },
  {
    id: 'soluciones',
    step: '03',
    word: 'Soluciones',
    headline: 'Servicios personalizados y productos entregables concretos',
    detail:
      'Diseño e implemento la alternativa exacta: una página web terminada, un sistema de archivos organizado, un prototipo IoT con ESP32, tarjetas NFC o un recorrido 360°.',
    domains: 'Web a Medida · Caos → Orden · Prototipos ESP32 · NFC · 360° / 3D',
    imageSrc: getImgSrc(iotMacroImg),
    imageAlt: 'Prototipo electrónico ESP32 con pantalla OLED y sensores ambientales en funcionamiento',
    imageCaption: 'Soluciones Digitales y Físicas Conectadas',
    imageSub: 'Código, sensores ESP32, tarjetas inteligentes NFC y sistemas organizados',
    ambientGradient:
      'radial-gradient(circle at 20% 25%, rgba(5, 150, 105, 0.14), transparent 55%), radial-gradient(circle at 82% 72%, rgba(6, 78, 59, 0.10), transparent 50%)',
    accentBg: 'bg-emerald-600 text-white',
    accentText: 'text-emerald-800',
    accentBorder: 'border-emerald-500/40',
  },
  {
    id: 'resultados',
    step: '04',
    word: 'Resultados',
    headline: 'Entornos ordenados, presencia profesional y ahorro de tiempo',
    detail:
      'Entrego sistemas funcionando, equipos rápidos, información respaldada y canales digitales listos para que personas o empresas trabajen sin fricción.',
    domains: 'Continuidad Operativa · Ahorro de Tiempo · Confianza Comercial',
    imageSrc: getImgSrc(insta360Img),
    imageAlt: 'Cámara 360 Insta360 X5 junto a monitor calibrado mostrando recorrido virtual interactivo',
    imageCaption: 'Impacto Visual, Técnico y Operativo Real',
    imageSub: 'Soluciones verificadas en laboratorio y listas para tu día a día',
    ambientGradient:
      'radial-gradient(circle at 20% 25%, rgba(225, 29, 72, 0.12), transparent 55%), radial-gradient(circle at 80% 75%, rgba(217, 119, 6, 0.12), transparent 50%)',
    accentBg: 'bg-rose-600 text-white',
    accentText: 'text-rose-800',
    accentBorder: 'border-rose-500/40',
  },
];

export default function HeroEcosystem({ onSelectSection }: HeroEcosystemProps) {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0 });
  const activeStage = EVOLUTION_STAGES[activeStageIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({
      rotateX: Number((-yPct * 5).toFixed(2)),
      rotateY: Number((xPct * 5).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-stone-200/80 pt-8 pb-16 md:pt-14 md:pb-22 transition-colors duration-700"
    >
      {/* Dynamic Ambient Color Wash */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{ background: activeStage.ambientGradient }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1380px] mx-auto px-6">
        {/* 2-Column Asymmetric Split with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left 7 Columns: Editorial Narrative + Quick Answers + Interactive Sequence */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-7">
            <div className="space-y-4">
              {/* Quiet inline metadata kicker — Zero-Pill Discipline */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600">
                <span className="font-bold text-stone-900">01 — INICIO · Adrián Dextre Carranza</span>
                <span aria-hidden="true">·</span>
                <span
                  className={`font-semibold transition-colors duration-500 ${activeStage.accentText}`}
                >
                  Tecnología + Creatividad + Análisis + Administración
                </span>
              </div>

              <h1
                className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-stone-950 leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Analizo problemas reales, conecto disciplinas y construyo{' '}
                <span
                  className={`underline decoration-2 underline-offset-8 transition-colors duration-500 ${activeStage.accentText}`}
                >
                  soluciones prácticas
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                Soy <strong>Adrián Dextre Carranza</strong>, profesional multidisciplinario con
                formación en <strong>Computación e Informática</strong> y{' '}
                <strong>Administración de Empresas</strong>. Integro desarrollo web, soporte
                informático, organización digital, electrónica IoT (ESP32), inteligencia artificial y
                producción visual 360° para resolver necesidades de personas y negocios.
              </p>
            </div>

            {/* Interactive Evolution Sequence: TECNOLOGÍA -> ANÁLISIS -> SOLUCIONES -> RESULTADOS */}
            <div
              className={`bg-white/90 backdrop-blur-sm border ${activeStage.accentBorder} rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 transition-all duration-500`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                  Secuencia de Valor (Haz clic para cambiar atmósfera e imagen)
                </span>
                <span
                  className={`text-xs font-mono font-semibold transition-colors duration-500 ${activeStage.accentText}`}
                >
                  Etapa {activeStage.step} / 04
                </span>
              </div>

              {/* 4 Connected Interactive Stage Tabs */}
              <div
                role="tablist"
                aria-label="Etapas de evolución del enfoque"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-stone-100 rounded-xl"
              >
                {EVOLUTION_STAGES.map((stage, index) => {
                  const isSelected = index === activeStageIdx;
                  return (
                    <button
                      key={stage.id}
                      role="tab"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => setActiveStageIdx(index)}
                      className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                        isSelected
                          ? `${stage.accentBg} shadow-sm font-semibold scale-[1.02]`
                          : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/60'
                      }`}
                    >
                      <span className="font-mono text-[11px] opacity-75">{stage.step}.</span>
                      <span>{stage.word}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Details with Motion Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="pt-1 space-y-2"
                >
                  <div className="font-display text-base sm:text-lg font-bold text-stone-900">
                    {activeStage.headline}
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{activeStage.detail}</p>
                  <div className="pt-1 text-xs font-mono text-stone-500">{activeStage.domains}</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clear Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onSelectSection('contacto')}
                className="px-5 py-3 bg-stone-950 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
              >
                <span>Solicitar una solución</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectSection('conocimientos')}
                className="px-4 py-3 bg-white border border-stone-300 text-stone-900 text-sm font-semibold rounded-xl hover:border-stone-900 transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Ver conocimientos (03)
              </button>

              <button
                type="button"
                onClick={() => onSelectSection('servicios')}
                className="px-4 py-3 bg-white border border-stone-300 text-stone-900 text-sm font-semibold rounded-xl hover:border-stone-900 transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                Explorar servicios (04)
              </button>

              <button
                type="button"
                onClick={() => onSelectSection('proyectos')}
                className="px-3.5 py-3 text-stone-700 hover:text-stone-950 text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap underline-offset-4 hover:underline"
              >
                Portafolio y Demos (06)
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Interactive Multi-Image Showcase with 3D Mouse Tilt */}
          <div
            className="lg:col-span-5 flex flex-col"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              animate={{
                rotateX: mouseTilt.rotateX,
                rotateY: mouseTilt.rotateY,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              style={{ transformPerspective: 1100 }}
              className="relative flex-1 min-h-[420px] lg:h-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-950 flex flex-col justify-between p-6 text-white shadow-xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStage.imageSrc}
                  src={activeStage.imageSrc}
                  alt={activeStage.imageAlt}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Measured Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/20" />

              {/* Top Camera / Image Switcher Overlay */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                  VISTA {activeStage.step} · {activeStage.word.toUpperCase()}
                </span>
                <div className="flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md p-1 rounded-lg border border-white/15">
                  {EVOLUTION_STAGES.map((st, idx) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      aria-label={`Cambiar imagen principal a ${st.word}`}
                      className={`w-6 h-6 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                        idx === activeStageIdx
                          ? 'bg-amber-500 text-stone-950'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      {st.step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Overlay Content */}
              <div className="relative z-10 space-y-4 pt-12">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Ecosistema Multidisciplinario
                  </p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                    {activeStage.imageCaption}
                  </h2>
                  <p className="text-xs text-stone-300">{activeStage.imageSub}</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs text-stone-200 border-t border-white/15 pt-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
                    <span className="font-semibold text-white block">Desarrollo & Soporte</span>
                    Web · Sistemas · Equipos PC
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
                    <span className="font-semibold text-white block">Gestión & Seguridad</span>
                    Caos → Orden · Backups
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
                    <span className="font-semibold text-white block">Hardware & IA</span>
                    ESP32 · Sensores · IA Local
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10">
                    <span className="font-semibold text-white block">Visual 360° & NFC</span>
                    Insta360 X5 · 3D · Tags NFC
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick Synthesis Row: Answers Why Work With Me & What Problems I Solve */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1.5 p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-semibold">
              <Layers className="w-4 h-4" />
              <span>01 · ¿QUIÉN SOY Y QUÉ COMBINO?</span>
            </div>
            <p className="font-display text-base font-bold text-stone-900">
              Informática + Administración + Creatividad
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Uno el desarrollo técnico y soporte de sistemas con el orden administrativo y la
              producción visual.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1.5 p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>02 · ¿QUÉ PROBLEMAS RESUELVO?</span>
            </div>
            <p className="font-display text-base font-bold text-stone-900">
              Digitalización, orden, equipos y automatización
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Desde crear la web de tu negocio u ordenar miles de archivos hasta reparar equipos o
              conectar sensores ESP32.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1.5 p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>03 · ¿CON QUÉ INFRAESTRUCTURA?</span>
            </div>
            <p className="font-display text-base font-bold text-stone-900">
              64 GB RAM · RX 470 8 GB · NVMe · Insta360 X5
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Laboratorio propio equipado para desarrollo web, pruebas de IA local, electrónica
              ESP32 y recorridos 360°.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="space-y-1.5 p-4 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>04 · ¿POR QUÉ TRABAJAR CONMIGO?</span>
            </div>
            <p className="font-display text-base font-bold text-stone-900">
              Honestidad técnica y soluciones a medida
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Escucho tu necesidad, evalúo opciones reales y te entrego un servicio o producto claro
              y bien estructurado.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
