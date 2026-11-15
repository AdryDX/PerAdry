'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DISCIPLINE_NODES, WORK_PROCESS_STEPS, DisciplineNode } from '@/lib/ecosystem-engine';
import { ArrowUpRight, Compass, Workflow, Lightbulb } from 'lucide-react';

import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import networkServerImg from '@/src/assets/images/network_server_infrastructure_1794577285987.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import localAiImg from '@/src/assets/images/local_ai_gpu_compute_1794577287804.jpg';
import nfcCardImg from '@/src/assets/images/nfc_smart_business_card_1794577289014.jpg';
import insta360Img from '@/src/assets/images/insta360_x5_camera_studio_1794584493843.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const NODE_VISUAL_ASSETS: Record<
  string,
  { src: string; alt: string; accentColor: string; glowBg: string }
> = {
  computacion: {
    src: getImgSrc(webSystemsImg),
    alt: 'Arquitectura Web Full-Stack, Sistemas Operativos y Diagnóstico Profundo',
    accentColor: 'text-amber-400',
    glowBg: 'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.16), transparent 60%)',
  },
  administracion: {
    src: getImgSrc(networkServerImg),
    alt: 'Gestión de Procesos, Infraestructura Ordenada y Control Operativo',
    accentColor: 'text-sky-400',
    glowBg: 'radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.16), transparent 60%)',
  },
  iot: {
    src: getImgSrc(iotMacroImg),
    alt: 'Prototipado Electrónico con Microcontrolador ESP32 y Sensores Ambientales',
    accentColor: 'text-emerald-400',
    glowBg: 'radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.16), transparent 60%)',
  },
  ia: {
    src: getImgSrc(localAiImg),
    alt: 'Cómputo Local con GPU Dedicada para Modelos de Inteligencia Artificial',
    accentColor: 'text-purple-400',
    glowBg: 'radial-gradient(circle at 80% 20%, rgba(192, 132, 252, 0.16), transparent 60%)',
  },
  organizacion: {
    src: getImgSrc(nfcCardImg),
    alt: 'Sistemas de Organización Digital, Seguridad de Datos y Tarjetas NFC',
    accentColor: 'text-amber-300',
    glowBg: 'radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.16), transparent 60%)',
  },
  visual: {
    src: getImgSrc(insta360Img),
    alt: 'Producción Visual, Cámara 360 Insta360 X5 y Experiencias Inmersivas 3D',
    accentColor: 'text-rose-400',
    glowBg: 'radial-gradient(circle at 80% 20%, rgba(251, 113, 133, 0.16), transparent 60%)',
  },
};

const PROCESS_COLORS = [
  { activeBg: 'bg-amber-600 text-white border-amber-600', accentText: 'text-amber-700' },
  { activeBg: 'bg-sky-700 text-white border-sky-700', accentText: 'text-sky-700' },
  { activeBg: 'bg-emerald-700 text-white border-emerald-700', accentText: 'text-emerald-700' },
  { activeBg: 'bg-indigo-700 text-white border-indigo-700', accentText: 'text-indigo-700' },
  { activeBg: 'bg-rose-700 text-white border-rose-700', accentText: 'text-rose-700' },
  { activeBg: 'bg-stone-900 text-white border-stone-900', accentText: 'text-stone-900' },
];

export default function AboutMultidisciplinary() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(DISCIPLINE_NODES[0].id);
  const [activeProcessIdx, setActiveProcessIdx] = useState<number>(0);

  const activeNode: DisciplineNode =
    DISCIPLINE_NODES.find((n) => n.id === selectedNodeId) || DISCIPLINE_NODES[0];
  const activeVisual = NODE_VISUAL_ASSETS[activeNode.id] || NODE_VISUAL_ASSETS.computacion;
  const activeStep = WORK_PROCESS_STEPS[activeProcessIdx];
  const activeStepTheme = PROCESS_COLORS[activeProcessIdx] || PROCESS_COLORS[0];

  return (
    <section
      id="sobre-mi"
      className="relative py-20 md:py-28 bg-stone-950 text-stone-100 border-b border-stone-800 overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Ambient Color Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{ background: activeVisual.glowBg }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1380px] mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p
              className={`text-xs font-mono uppercase tracking-wider transition-colors duration-500 ${activeVisual.accentColor}`}
            >
              02 — SOBRE MÍ · ¿Quién es, cuál es su filosofía y cómo piensa?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Perfil multidisciplinario: donde la ingeniería informática, la administración y la
              creatividad se conectan
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Un problema en una empresa o proyecto rara vez pertenece a una sola área. A veces un
              flujo lento parece un problema de software, pero nace de archivos desorganizados o de
              equipos saturados. Mi fortaleza es analizar el panorama completo.
            </p>
          </div>
        </div>

        {/* Interactive Ecosystem Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Columns: 6 Interactive Discipline Cores */}
          <div className="lg:col-span-7 bg-stone-900/90 backdrop-blur-sm border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Los 6 Pilares de Mi Perfil Profesional
                </h3>
                <p className="text-xs text-stone-400">
                  Haz clic en cada pilar para explorar cómo aporta valor práctico y con qué otras
                  áreas se conecta
                </p>
              </div>
              <span className={`text-xs font-mono ${activeVisual.accentColor} hidden sm:inline`}>
                6 Áreas Integradas
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DISCIPLINE_NODES.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                const isConnected = activeNode.connectedTo.includes(node.id);

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg'
                        : isConnected
                        ? 'bg-stone-800/80 border-stone-600 text-stone-200 hover:border-amber-400/60'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-amber-400">
                        0{index + 1} · {node.pillar}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {isSelected ? 'Seleccionado ●' : isConnected ? 'Sinergia ↔' : 'Ver detalle'}
                      </span>
                    </div>

                    <div>
                      <div className="font-display text-base font-bold text-white leading-snug">
                        {node.title}
                      </div>
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2">{node.summary}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Connection Legend */}
            <div className="pt-2 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400">
              <span>
                FÓRMULA CENTRAL:{' '}
                <strong className="text-stone-200">
                  Tecnología + Creatividad + Análisis + Administración = Soluciones Prácticas
                </strong>
              </span>
            </div>
          </div>

          {/* Right 5 Columns: Selected Discipline Deep-Dive with Contextual Image */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-stone-950 border-b border-stone-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVisual.src}
                  src={activeVisual.src}
                  alt={activeVisual.alt}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
              <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  PILAR ACTIVO · {activeNode.pillar.toUpperCase()}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl font-bold text-white leading-tight">
                      {activeNode.title}
                    </h3>
                    <p className="text-sm text-stone-300 leading-relaxed">{activeNode.summary}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                    <div className={`text-xs font-mono uppercase ${activeVisual.accentColor}`}>
                      ¿Cómo beneficia esto a tu proyecto o negocio?
                    </div>
                    <p className="text-sm text-stone-200 leading-relaxed">
                      {activeNode.businessValue}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 space-y-2">
                  <div className="text-xs font-mono text-stone-400 uppercase">
                    Conectado directamente con (Haz clic para saltar):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.connectedTo.map((connId) => {
                      const target = DISCIPLINE_NODES.find((n) => n.id === connId);
                      if (!target) return null;
                      return (
                        <button
                          key={connId}
                          type="button"
                          onClick={() => setSelectedNodeId(connId)}
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-xs font-medium text-stone-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>{target.shortLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Philosophy & 6-Step Way of Thinking (Escucho -> Analizo -> Propongo -> Construyo -> Optimizo -> Acompaño) */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-800 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <Workflow className="w-4 h-4" />
                <span>Mi Filosofía y Metodología de Trabajo en 6 Etapas</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Cómo pienso y abordo cada problema de principio a fin
              </h3>
            </div>
            <p className="text-xs text-stone-400 max-w-md">
              Selecciona cada etapa para ver qué ocurre en la práctica y qué resultado concreto
              obtienes:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {WORK_PROCESS_STEPS.map((step, index) => {
              const isSelected = index === activeProcessIdx;
              const stepColor = PROCESS_COLORS[index] || PROCESS_COLORS[0];
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveProcessIdx(index)}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${
                    isSelected
                      ? `${stepColor.activeBg} shadow-md`
                      : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-white/90' : 'text-amber-400'
                    }`}
                  >
                    {step.number} — {step.verb}
                  </span>
                  <span className="text-xs leading-snug line-clamp-2 opacity-90">{step.title}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.number}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-stone-950 border border-stone-800 rounded-xl p-5 sm:p-6"
            >
              <div className="lg:col-span-7 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  ETAPA {activeStep.number} — {activeStep.verb}
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                  {activeStep.title}
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activeStep.whatHappensHere}
                </p>
              </div>
              <div className="lg:col-span-5 p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase">
                  <Lightbulb className="w-4 h-4" />
                  <span>Resultado concreto de esta etapa</span>
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {activeStep.concreteOutput}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
