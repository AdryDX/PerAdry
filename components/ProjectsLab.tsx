'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LAB_PROJECTS,
  LabProject,
  DemoModality,
  getVisiblePortfolioProjects,
  buildDemoRequestSummary,
} from '@/lib/ecosystem-engine';
import {
  Maximize2,
  X,
  Play,
  Video,
  CheckCircle2,
  AlertCircle,
  Layers,
  Eye,
  ShieldCheck,
} from 'lucide-react';

import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import localAiImg from '@/src/assets/images/local_ai_gpu_compute_1794577287804.jpg';
import networkServerImg from '@/src/assets/images/network_server_infrastructure_1794577285987.jpg';
import nfcCardImg from '@/src/assets/images/nfc_smart_business_card_1794577289014.jpg';
import insta360Img from '@/src/assets/images/insta360_x5_camera_studio_1794584493843.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const PROJECT_IMAGES: Record<
  string,
  { src: string; alt: string; accentBorder: string; badgeText: string }
> = {
  'proj-iot-telemetry': {
    src: getImgSrc(iotMacroImg),
    alt: 'Prototipo ESP32 con pantalla OLED y sensores de temperatura y humedad',
    accentBorder: 'hover:border-emerald-500/60',
    badgeText: 'text-emerald-400',
  },
  'proj-digital-order': {
    src: getImgSrc(webSystemsImg),
    alt: 'Sistema de reorganización documental y estructura jerárquica de archivos',
    accentBorder: 'hover:border-amber-500/60',
    badgeText: 'text-amber-400',
  },
  'proj-web-ecosystem': {
    src: getImgSrc(nfcCardImg),
    alt: 'Portal empresarial interactivo conectado con tarjetas inteligentes NFC',
    accentBorder: 'hover:border-amber-400/60',
    badgeText: 'text-amber-300',
  },
  'proj-visual-360': {
    src: getImgSrc(insta360Img),
    alt: 'Cámara 360 Insta360 X5 y monitor con recorrido virtual interactivo',
    accentBorder: 'hover:border-rose-500/60',
    badgeText: 'text-rose-400',
  },
  'proj-local-ai': {
    src: getImgSrc(localAiImg),
    alt: 'Estación de trabajo con 64 GB RAM y GPU dedicada ejecutando IA local',
    accentBorder: 'hover:border-violet-500/60',
    badgeText: 'text-violet-400',
  },
  'proj-spatial-routes': {
    src: getImgSrc(networkServerImg),
    alt: 'Visualizador de rutas GPX, mapas y topología de conectividad',
    accentBorder: 'hover:border-sky-500/60',
    badgeText: 'text-sky-400',
  },
};

const DEMO_MODALITIES: {
  id: DemoModality;
  label: string;
  description: string;
}[] = [
  {
    id: 'En vivo',
    label: 'En vivo (Videollamada breve)',
    description: 'Te muestro el sistema funcionando en tiempo real y respondo tus preguntas.',
  },
  {
    id: 'Mediante video',
    label: 'Mediante video demostrativo',
    description: 'Te envío una grabación guiada mostrando el flujo completo de la solución.',
  },
  {
    id: 'Mediante acceso temporal',
    label: 'Mediante acceso temporal',
    description: 'Habilito un entorno de prueba seguro con datos ficticios para que lo explores.',
  },
  {
    id: 'Mediante presentación',
    label: 'Mediante presentación aplicada',
    description: 'Presentación enfocada en cómo adaptar esta solución a tu caso o negocio.',
  },
];

export default function ProjectsLab() {
  const [selectedDomain, setSelectedDomain] = useState<string>('Todos');
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

  // Project Detail Modal state
  const [detailProject, setDetailProject] = useState<LabProject | null>(null);

  // Demo Request Modal state
  const [demoProject, setDemoProject] = useState<LabProject | null>(null);
  const [requesterName, setRequesterName] = useState<string>('');
  const [requesterContact, setRequesterContact] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<DemoModality>('En vivo');
  const [demoNotes, setDemoNotes] = useState<string>('');
  const [demoError, setDemoError] = useState<string | null>(null);
  const [demoConfirmation, setDemoConfirmation] = useState<string | null>(null);

  const domains = ['Todos', ...Array.from(new Set(LAB_PROJECTS.map((p) => p.domain)))];

  const { visibleProjects, totalMatching, hasHiddenProjects } = getVisiblePortfolioProjects(
    LAB_PROJECTS,
    selectedDomain,
    showAllProjects
  );

  const openDemoModal = (project: LabProject) => {
    setDemoProject(project);
    setDemoError(null);
    setDemoConfirmation(null);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoProject) return;
    const res = buildDemoRequestSummary({
      projectTitle: demoProject.title,
      requesterName,
      requesterContact,
      modality: selectedModality,
      notes: demoNotes,
    });
    if (!res.valid) {
      setDemoError(res.error || 'Verifica tus datos de contacto.');
      setDemoConfirmation(null);
      return;
    }
    setDemoError(null);
    setDemoConfirmation(res.summaryText || '');
  };

  return (
    <section
      id="proyectos"
      className="py-20 md:py-28 bg-stone-950 text-stone-100 border-b border-stone-800"
    >
      <div className="max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400">
              06 — PROYECTOS / PORTAFOLIO · ¿Qué ha creado y experimentado?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Trabajos, prototipos y soluciones desarrolladas con opción de demostración guiada
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Explora una selección inicial de proyectos destacados. Puedes abrir la ficha técnica
              de cada uno o{' '}
              <strong className="text-amber-300">solicitar una demostración</strong> (en vivo, en
              video, acceso temporal o presentación) cuidando siempre la privacidad de datos.
            </p>
          </div>
        </div>

        {/* Filter Bar + Featured/All Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900/90 border border-stone-800 rounded-2xl p-4">
          <div
            role="group"
            aria-label="Filtrar proyectos por categoría"
            className="flex flex-wrap items-center gap-2"
          >
            {domains.map((domain) => {
              const isSelected = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-950 text-stone-300 border border-stone-800 hover:border-stone-600 hover:text-white'
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-stone-400 shrink-0">
            Mostrando {visibleProjects.length} de {totalMatching} proyectos
          </div>
        </div>

        {/* Clean Visual Project Cards Grid (IMAGE + NAME + SHORT DESCRIPTION + TECH + DEMO CTA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => {
              const visual =
                PROJECT_IMAGES[project.id] || PROJECT_IMAGES['proj-iot-telemetry'];

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`bg-stone-900 border border-stone-800 ${visual.accentBorder} rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg group`}
                >
                  <div>
                    {/* 1. IMAGEN DE PREVISUALIZACIÓN */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-stone-950 border-b border-stone-800">
                      <img
                        src={visual.src}
                        alt={visual.alt}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-950/35 to-transparent" />

                      <div className="absolute top-3 left-4 right-4 flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-mono font-semibold bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 ${visual.badgeText}`}
                        >
                          {project.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => setDetailProject(project)}
                          aria-label={`Ver detalles completos de ${project.title}`}
                          className="flex items-center gap-1.5 text-xs font-mono bg-stone-950/85 hover:bg-amber-500 text-stone-200 hover:text-stone-950 px-3 py-1.5 rounded-lg border border-white/15 transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Ver ficha</span>
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-5 right-5">
                        <span className="text-xs font-mono text-stone-300">
                          {project.domain}
                        </span>
                      </div>
                    </div>

                    {/* 2. NOMBRE + 3. DESCRIPCIÓN CORTA (Sin bloques gigantes de texto) */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-sm text-stone-300 leading-relaxed">
                        {project.shortSummary}
                      </p>

                      {/* Clean unboxed technology list */}
                      <div className="pt-2 text-xs font-mono text-stone-400">
                        {project.stack.join(' · ')}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer:Ver Detalles + SOLICITAR DEMOSTRACIÓN */}
                  <div className="px-6 py-4 bg-stone-950/70 border-t border-stone-800/90 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setDetailProject(project)}
                      className="text-xs font-semibold text-stone-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Explorar arquitectura</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openDemoModal(project)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-display text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 fill-stone-950" />
                      <span>Solicitar Demostración</span>
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* VER TODOS LOS PROYECTOS Button */}
        {selectedDomain === 'Todos' && (
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {hasHiddenProjects ? (
              <button
                type="button"
                onClick={() => setShowAllProjects(true)}
                className="px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-amber-500 text-white hover:text-stone-950 border border-stone-700 hover:border-amber-400 font-display text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 shadow-md"
              >
                <Layers className="w-4 h-4" />
                <span>Ver todos los proyectos ({LAB_PROJECTS.length})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowAllProjects(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Mostrar únicamente selección destacada (4)
              </button>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: PROJECT ARCHITECTURE & DETAILS */}
      <AnimatePresence>
        {detailProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setDetailProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Detalles del proyecto ${detailProject.title}`}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-stone-900 border border-stone-700 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-64 sm:h-80 w-full bg-stone-950">
                <img
                  src={
                    (
                      PROJECT_IMAGES[detailProject.id] ||
                      PROJECT_IMAGES['proj-iot-telemetry']
                    ).src
                  }
                  alt={detailProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-950/50" />
                <button
                  type="button"
                  onClick={() => setDetailProject(null)}
                  aria-label="Cerrar vista de proyecto"
                  className="absolute top-4 right-4 p-2 rounded-xl bg-stone-950/80 text-stone-200 hover:text-white border border-white/15 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-amber-400">
                    {detailProject.code} · {detailProject.domain}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {detailProject.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-300">
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="text-xs font-mono text-stone-400 uppercase">
                      Problema Analizado
                    </div>
                    <p className="leading-relaxed">{detailProject.problemSolved}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="text-xs font-mono text-amber-400 uppercase">
                      Solución Construida
                    </div>
                    <p className="leading-relaxed">{detailProject.solutionBuilt}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-stone-400">{detailProject.stack.join(' · ')}</div>
                    <div className="text-emerald-400">{detailProject.metrics}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const proj = detailProject;
                      setDetailProject(null);
                      openDemoModal(proj);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-display text-xs font-bold transition-colors cursor-pointer"
                  >
                    Solicitar Demostración de esta Solución
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: SOLICITAR DEMOSTRACIÓN (Live / Video / Temp Access / Presentation) */}
      <AnimatePresence>
        {demoProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setDemoProject(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Solicitar demostración de ${demoProject.title}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full bg-stone-900 border border-stone-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-auto"
            >
              <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-amber-400 uppercase">
                    SOLICITAR DEMOSTRACIÓN GUIADA
                  </div>
                  <h3 className="font-display text-xl font-bold text-white leading-snug">
                    {demoProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDemoProject(null)}
                  aria-label="Cerrar solicitud de demostración"
                  className="p-2 rounded-xl bg-stone-950 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Por privacidad y seguridad, no publico accesos sensibles ni datos reales de
                  terceros. Coordino cada demostración de forma personalizada.
                </span>
              </div>

              <form onSubmit={handleDemoSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-stone-300">
                    1. ¿Cómo prefieres ver la demostración?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {DEMO_MODALITIES.map((mod) => {
                      const isSelected = selectedModality === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setSelectedModality(mod.id)}
                          className={`text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-400 text-white'
                              : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-600'
                          }`}
                        >
                          <div className="font-display text-xs font-bold text-white">
                            {mod.label}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                            {mod.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="demo-requester-name"
                      className="block text-xs font-mono text-stone-300 mb-1"
                    >
                      Tu nombre o empresa
                    </label>
                    <input
                      id="demo-requester-name"
                      type="text"
                      value={requesterName}
                      onChange={(e) => setRequesterName(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="demo-requester-contact"
                      className="block text-xs font-mono text-stone-300 mb-1"
                    >
                      Correo o WhatsApp
                    </label>
                    <input
                      id="demo-requester-contact"
                      type="text"
                      value={requesterContact}
                      onChange={(e) => setRequesterContact(e.target.value)}
                      placeholder="Ej. carlos@empresa.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="demo-requester-notes"
                    className="block text-xs font-mono text-stone-300 mb-1"
                  >
                    Comentario opcional (qué te gustaría evaluar)
                  </label>
                  <input
                    id="demo-requester-notes"
                    type="text"
                    value={demoNotes}
                    onChange={(e) => setDemoNotes(e.target.value)}
                    placeholder="Ej. Quiero ver cómo funcionaría para nuestro almacén o negocio..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {demoError && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-rose-950/80 border border-rose-700 text-xs text-rose-200 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{demoError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-display text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Confirmar Solicitud de Demostración ({selectedModality})</span>
                </button>
              </form>

              {demoConfirmation && (
                <div
                  data-testid="demo-request-confirmation"
                  className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-700/80 space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SOLICITUD DE DEMOSTRACIÓN REGISTRADA</span>
                  </div>
                  <pre className="text-xs font-mono text-stone-200 whitespace-pre-wrap leading-relaxed">
                    {demoConfirmation}
                  </pre>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
