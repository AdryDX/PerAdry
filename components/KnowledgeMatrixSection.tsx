'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KNOWLEDGE_DOMAINS,
  KNOWLEDGE_ITEMS,
  ProficiencyLevel,
  filterKnowledgeItems,
} from '@/lib/ecosystem-engine';
import { Code2, Layers, Sparkles, Compass, Cpu, BrainCircuit, CheckCircle2 } from 'lucide-react';

import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import networkServerImg from '@/src/assets/images/network_server_infrastructure_1794577285987.jpg';
import gaussian3dImg from '@/src/assets/images/gaussian_splatting_3d_space_1794584496130.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import localAiImg from '@/src/assets/images/local_ai_gpu_compute_1794577287804.jpg';
import heroEcosystemImg from '@/src/assets/images/hero_tech_ecosystem_1794574240796.jpg';
import drone360Img from '@/src/assets/images/visual_drone_360_production_1794577289632.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const DOMAIN_VISUALS: Record<
  string,
  { src: string; alt: string; accentClass: string; activeTabClass: string; ambientBg: string }
> = {
  'web-dev': {
    src: getImgSrc(webSystemsImg),
    alt: 'Desarrollo Web Moderno con HTML5, CSS3, TypeScript, React y Next.js',
    accentClass: 'text-amber-800',
    activeTabClass: 'bg-amber-600 text-white border-amber-600',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(217, 119, 6, 0.10), transparent 55%)',
  },
  'frameworks-services': {
    src: getImgSrc(networkServerImg),
    alt: 'Frameworks Frontend (React, Next.js, Vite) y Servicios Backend (Node.js, Express, Cloudflare Workers)',
    accentClass: 'text-sky-800',
    activeTabClass: 'bg-sky-700 text-white border-sky-700',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(3, 105, 161, 0.10), transparent 55%)',
  },
  'ui-design': {
    src: getImgSrc(heroEcosystemImg),
    alt: 'UI, Diseño de Interfaces y Animación Web con Tailwind CSS, Framer Motion y GSAP',
    accentClass: 'text-rose-800',
    activeTabClass: 'bg-rose-700 text-white border-rose-700',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(190, 18, 60, 0.10), transparent 55%)',
  },
  '3d-visual': {
    src: getImgSrc(gaussian3dImg),
    alt: 'Reconstrucción 3D Gaussian Splatting, Three.js, React Three Fiber y Entornos 3D Web',
    accentClass: 'text-violet-800',
    activeTabClass: 'bg-violet-700 text-white border-violet-700',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(109, 40, 217, 0.10), transparent 55%)',
  },
  'maps-geo': {
    src: getImgSrc(drone360Img),
    alt: 'Mapas Interactivos con OpenStreetMap, MapLibre y Visualización de Rutas GPX',
    accentClass: 'text-teal-800',
    activeTabClass: 'bg-teal-700 text-white border-teal-700',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(15, 118, 110, 0.10), transparent 55%)',
  },
  'hardware-iot': {
    src: getImgSrc(iotMacroImg),
    alt: 'Hardware e IoT con Microcontroladores ESP32, Sensores, Relés y Redes Wi-Fi',
    accentClass: 'text-emerald-800',
    activeTabClass: 'bg-emerald-700 text-white border-emerald-700',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(4, 120, 87, 0.10), transparent 55%)',
  },
  'artificial-intelligence': {
    src: getImgSrc(localAiImg),
    alt: 'Inteligencia Artificial Generativa, Modelos Locales en GPU y Automatización Asistida',
    accentClass: 'text-indigo-800',
    activeTabClass: 'bg-indigo-700 text-white border-indigo-700',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(67, 56, 202, 0.10), transparent 55%)',
  },
};

const LEVEL_STYLES: Record<
  ProficiencyLevel,
  { indicatorColor: string; textColor: string; description: string }
> = {
  'Utilizo activamente': {
    indicatorColor: 'bg-emerald-600',
    textColor: 'text-emerald-800',
    description: 'Tecnología presente en mi flujo de trabajo cotidiano y proyectos actuales.',
  },
  'Con experiencia': {
    indicatorColor: 'bg-sky-600',
    textColor: 'text-sky-800',
    description: 'Tecnología implementada en soluciones reales cuando el proyecto lo requiere.',
  },
  'En desarrollo': {
    indicatorColor: 'bg-amber-600',
    textColor: 'text-amber-800',
    description: 'Ampliando implementación práctica y casos de uso avanzados.',
  },
  Explorando: {
    indicatorColor: 'bg-violet-600',
    textColor: 'text-violet-800',
    description: 'Investigación activa y pruebas de concepto en laboratorio personal.',
  },
};

export default function KnowledgeMatrixSection() {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(KNOWLEDGE_DOMAINS[0].id);
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');

  const activeDomain =
    KNOWLEDGE_DOMAINS.find((d) => d.id === selectedDomainId) || KNOWLEDGE_DOMAINS[0];
  const activeVisual = DOMAIN_VISUALS[activeDomain.id] || DOMAIN_VISUALS['web-dev'];

  const visibleItems = filterKnowledgeItems(KNOWLEDGE_ITEMS, selectedDomainId, selectedLevel);

  const levelsList: ('Todos' | ProficiencyLevel)[] = [
    'Todos',
    'Utilizo activamente',
    'Con experiencia',
    'En desarrollo',
    'Explorando',
  ];

  return (
    <section
      id="conocimientos"
      className="relative py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80 overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Ambient Color Wash */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{ background: activeVisual.ambientBg }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p
              className={`text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-500 ${activeVisual.accentClass}`}
            >
              03 — CAPACIDADES Y CONOCIMIENTOS · ¿Qué sabe y qué tecnologías domina o explora?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              Mapa transparente de conocimientos, frameworks, herramientas de trabajo y exploración
              tecnológica
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Separo con total honestidad las tecnologías que{' '}
              <strong className="text-stone-900">utilizo activamente</strong> y en las que tengo{' '}
              <strong className="text-stone-900">experiencia práctica</strong> de aquellas que están{' '}
              <strong className="text-stone-900">en desarrollo o exploración</strong> dentro de mi
              laboratorio.
            </p>
          </div>
        </div>

        {/* Honesty & Transparency Legend Bar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
              Filtro de Nivel de Dominio y Uso Real
            </div>
            <p className="text-xs text-stone-600">
              Filtra las tecnologías según mi relación actual con cada herramienta:
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar conocimientos por nivel de uso"
            className="flex flex-wrap items-center gap-2"
          >
            {levelsList.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              const count =
                lvl === 'Todos'
                  ? filterKnowledgeItems(KNOWLEDGE_ITEMS, selectedDomainId, 'Todos').length
                  : filterKnowledgeItems(KNOWLEDGE_ITEMS, selectedDomainId, lvl).length;

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-stone-950 text-white border-stone-950 shadow-xs'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{lvl}</span>
                  <span
                    className={`font-mono text-[11px] ${
                      isSelected ? 'text-amber-300' : 'text-stone-500'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 7 Domain Selector + Visual Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 4 Columns: 7 Technology Categories */}
          <div
            role="tablist"
            aria-label="Categorías de conocimientos tecnológicos"
            className="lg:col-span-4 space-y-2.5"
          >
            {KNOWLEDGE_DOMAINS.map((domain) => {
              const isSelected = domain.id === selectedDomainId;
              const domTheme = DOMAIN_VISUALS[domain.id] || DOMAIN_VISUALS['web-dev'];
              const itemCount = KNOWLEDGE_ITEMS.filter((i) => i.domainId === domain.id).length;

              return (
                <motion.button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    setSelectedDomainId(domain.id);
                    setSelectedLevel('Todos');
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? `${domTheme.activeTabClass} shadow-md`
                      : 'bg-white text-stone-800 border-stone-200/90 hover:border-stone-400'
                  }`}
                >
                  <div className="min-w-0">
                    <div
                      className={`font-mono text-[11px] uppercase ${
                        isSelected ? 'text-white/80' : 'text-stone-500'
                      }`}
                    >
                      {domain.code}
                    </div>
                    <div className="font-display text-sm font-bold truncate mt-0.5">
                      {domain.title}
                    </div>
                  </div>
                  <span
                    className={`font-mono text-xs shrink-0 ${
                      isSelected ? 'text-white font-bold' : 'text-stone-400'
                    }`}
                  >
                    {itemCount} tec.
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right 8 Columns: Active Domain Visual Banner + Structured Knowledge Cards */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Domain Visual Header */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-950 border-b border-stone-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVisual.src}
                  src={activeVisual.src}
                  alt={activeVisual.alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 space-y-1 text-white">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  {activeDomain.code} · MATRIZ DE CONOCIMIENTOS
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">{activeDomain.title}</h3>
                <p className="text-xs text-stone-300 max-w-2xl">{activeDomain.description}</p>
              </div>
            </div>

            {/* Knowledge Items Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              {visibleItems.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <p className="text-sm font-semibold text-stone-800">
                    No hay tecnologías con el filtro «{selectedLevel}» en esta categoría.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedLevel('Todos')}
                    className="text-xs font-semibold text-amber-700 underline cursor-pointer"
                  >
                    Mostrar todos los niveles de esta categoría
                  </button>
                </div>
              ) : activeDomain.id === 'frameworks-services' && selectedLevel === 'Todos' ? (
                /* Special Grouped View for Frameworks & Technologies: Frontend vs Backend / Servicios */
                <div className="space-y-8">
                  {(['Frontend', 'Backend / Servicios'] as const).map((groupName) => {
                    const groupItems = visibleItems.filter((item) => item.subGroup === groupName);
                    return (
                      <div key={groupName} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                          <h4 className="font-display text-base font-bold text-stone-900">
                            {groupName === 'Frontend'
                              ? 'Capa Frontend (Interfaces y Aplicaciones Web)'
                              : 'Capa Backend / Servicios / Edge'}
                          </h4>
                          <span className="text-xs font-mono text-stone-500">
                            {groupItems.length} tecnologías
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {groupItems.map((item) => {
                            const lvlStyle = LEVEL_STYLES[item.level];
                            return (
                              <div
                                key={item.id}
                                className="p-4 rounded-xl bg-stone-50/90 border border-stone-200/90 flex flex-col justify-between gap-2.5 hover:border-stone-400 transition-colors"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                                    <span className={`font-semibold ${lvlStyle.textColor}`}>
                                      {item.level}
                                    </span>
                                    <span className="text-stone-500">{item.role}</span>
                                  </div>
                                  <div className="font-display text-base font-bold text-stone-950">
                                    {item.name}
                                  </div>
                                </div>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                  {item.practicalUse}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedDomainId}-${selectedLevel}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                  >
                    {visibleItems.map((item) => {
                      const lvlStyle = LEVEL_STYLES[item.level];
                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-stone-50/90 border border-stone-200/90 flex flex-col justify-between gap-2.5 hover:border-stone-400 transition-colors"
                        >
                          <div className="space-y-1">
                            {/* Unboxed clean metadata with typographic separator */}
                            <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                              <span className={`font-semibold ${lvlStyle.textColor}`}>
                                {item.level}
                              </span>
                              <span className="text-stone-500">{item.role}</span>
                            </div>
                            <div className="font-display text-base font-bold text-stone-950">
                              {item.name}
                            </div>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {item.practicalUse}
                          </p>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Bottom Transparency Summary */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
                <div>
                  <strong className="text-stone-800">Criterio profesional:</strong> Indico con
                  claridad qué tecnologías son parte de mi trabajo diario y cuáles exploro en
                  laboratorio.
                </div>
                <a
                  href="#servicios"
                  className="font-semibold text-amber-800 hover:underline whitespace-nowrap"
                >
                  Ver cómo aplico esto en mis Servicios (04) →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
