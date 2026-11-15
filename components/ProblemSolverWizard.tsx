'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PROBLEM_SCENARIOS,
  ARCHITECTURE_CHAPTERS,
  diagnoseProblem,
  buildProjectProposalSummary,
} from '@/lib/ecosystem-engine';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';

import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import networkServerImg from '@/src/assets/images/network_server_infrastructure_1794577285987.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import nfcCardImg from '@/src/assets/images/nfc_smart_business_card_1794577289014.jpg';
import insta360Img from '@/src/assets/images/insta360_x5_camera_studio_1794584493843.jpg';
import pcMaintenanceImg from '@/src/assets/images/pc_hardware_maintenance_lab_1794584498749.jpg';
import deliverablesImg from '@/src/assets/images/digital_deliverables_showcase_1794584500055.jpg';
import heroEcosystemImg from '@/src/assets/images/hero_tech_ecosystem_1794574240796.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const SCENARIO_VISUALS: Record<
  string,
  {
    src: string;
    accentColor: string;
    activeBtnClass: string;
    ambientBg: string;
    borderHighlight: string;
  }
> = {
  'presencia-negocio': {
    src: getImgSrc(deliverablesImg),
    accentColor: 'text-amber-400',
    activeBtnClass: 'bg-amber-500 text-stone-950 border-amber-400',
    ambientBg:
      'radial-gradient(circle at 18% 22%, rgba(245, 158, 11, 0.14), transparent 55%)',
    borderHighlight: 'border-amber-500/40',
  },
  'necesito-web': {
    src: getImgSrc(webSystemsImg),
    accentColor: 'text-sky-400',
    activeBtnClass: 'bg-sky-500 text-stone-950 border-sky-400',
    ambientBg:
      'radial-gradient(circle at 80% 25%, rgba(56, 189, 248, 0.14), transparent 55%)',
    borderHighlight: 'border-sky-500/40',
  },
  'problemas-equipos': {
    src: getImgSrc(pcMaintenanceImg),
    accentColor: 'text-cyan-400',
    activeBtnClass: 'bg-cyan-500 text-stone-950 border-cyan-400',
    ambientBg:
      'radial-gradient(circle at 25% 75%, rgba(34, 211, 238, 0.14), transparent 55%)',
    borderHighlight: 'border-cyan-500/40',
  },
  'archivos-caos': {
    src: getImgSrc(networkServerImg),
    accentColor: 'text-emerald-400',
    activeBtnClass: 'bg-emerald-500 text-stone-950 border-emerald-400',
    ambientBg:
      'radial-gradient(circle at 75% 70%, rgba(16, 185, 129, 0.14), transparent 55%)',
    borderHighlight: 'border-emerald-500/40',
  },
  'automatizar-iot': {
    src: getImgSrc(iotMacroImg),
    accentColor: 'text-orange-400',
    activeBtnClass: 'bg-orange-500 text-stone-950 border-orange-400',
    ambientBg:
      'radial-gradient(circle at 30% 30%, rgba(251, 146, 60, 0.14), transparent 55%)',
    borderHighlight: 'border-orange-500/40',
  },
  'contenido-360-3d': {
    src: getImgSrc(insta360Img),
    accentColor: 'text-rose-400',
    activeBtnClass: 'bg-rose-500 text-stone-950 border-rose-400',
    ambientBg:
      'radial-gradient(circle at 70% 30%, rgba(251, 113, 133, 0.14), transparent 55%)',
    borderHighlight: 'border-rose-500/40',
  },
  'compra-importacion': {
    src: getImgSrc(nfcCardImg),
    accentColor: 'text-violet-400',
    activeBtnClass: 'bg-violet-500 text-stone-950 border-violet-400',
    ambientBg:
      'radial-gradient(circle at 40% 60%, rgba(167, 139, 250, 0.14), transparent 55%)',
    borderHighlight: 'border-violet-500/40',
  },
  'idea-personalizada': {
    src: getImgSrc(heroEcosystemImg),
    accentColor: 'text-amber-300',
    activeBtnClass: 'bg-amber-400 text-stone-950 border-amber-300',
    ambientBg:
      'radial-gradient(circle at 60% 40%, rgba(251, 191, 36, 0.14), transparent 55%)',
    borderHighlight: 'border-amber-400/40',
  },
};

export default function ProblemSolverWizard() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    PROBLEM_SCENARIOS[0].id
  );
  const [clientName, setClientName] = useState<string>('');
  const [contactChannel, setContactChannel] = useState<string>('');
  const [customContext, setCustomContext] = useState<string>('');
  const [urgency, setUrgency] = useState<'Exploratorio' | 'Próximas semanas' | 'Prioritario'>(
    'Próximas semanas'
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);

  const { scenario, matchedCapabilities } = diagnoseProblem(selectedScenarioId);
  const activeVisual =
    SCENARIO_VISUALS[selectedScenarioId] || SCENARIO_VISUALS['presencia-negocio'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = buildProjectProposalSummary({
      clientName,
      contactChannel,
      scenarioId: selectedScenarioId,
      customContext,
      urgency,
    });
    if (!res.valid) {
      setFormError(res.error || 'Revisa los campos del formulario.');
      setSubmittedSummary(null);
      return;
    }
    setFormError(null);
    setSubmittedSummary(res.summaryText || '');
  };

  return (
    <section
      id="contacto"
      className="relative py-20 md:py-28 bg-stone-950 text-stone-100 overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Ambient Color Wash per Scenario */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{ background: activeVisual.ambientBg }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1380px] mx-auto px-6 space-y-14">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p
              className={`text-xs font-mono uppercase tracking-wider transition-colors duration-500 ${activeVisual.accentColor}`}
            >
              09 — CONTACTO / SOLICITAR UNA SOLUCIÓN · ¿Cómo puedo trabajar con él?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Selecciona tu problema o idea y conversemos sobre qué solución podemos plantear
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Elige la situación que mejor describa lo que necesitas para ver mi lectura preliminar
              del problema, las áreas que combinaremos y enviarme directamente tu solicitud.
            </p>
          </div>
        </div>

        {/* 8 Interactive Problem Scenario Buttons */}
        <div
          role="radiogroup"
          aria-label="Situaciones o problemas a resolver"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {PROBLEM_SCENARIOS.map((item, index) => {
            const isSelected = item.id === selectedScenarioId;
            const itemTheme = SCENARIO_VISUALS[item.id] || SCENARIO_VISUALS['presencia-negocio'];
            return (
              <motion.button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedScenarioId(item.id);
                  setSubmittedSummary(null);
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? `${itemTheme.activeBtnClass} font-semibold shadow-lg`
                    : 'bg-stone-900/90 text-stone-200 border-stone-800 hover:border-stone-600'
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    isSelected ? 'text-stone-950/80' : itemTheme.accentColor
                  }`}
                >
                  Situación 0{index + 1}
                </span>
                <span className="font-display text-sm sm:text-base font-bold leading-snug">
                  “{item.prompt}”
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Diagnostic Result + Interactive Brief Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Dynamic Roadmap for Selected Problem */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className={`lg:col-span-7 bg-stone-900 border ${activeVisual.borderHighlight} rounded-2xl overflow-hidden shadow-xl transition-colors duration-500`}
            >
              {/* Visual Scenario Header Banner */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden border-b border-stone-800">
                <img
                  src={activeVisual.src}
                  alt={scenario.proposedSolutionTitle}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 space-y-1">
                  <div
                    className={`text-xs font-mono uppercase tracking-wider ${activeVisual.accentColor}`}
                  >
                    RUTA DE SOLUCIÓN PARA: “{scenario.prompt}”
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    {scenario.proposedSolutionTitle}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-sm text-stone-300 leading-relaxed">
                  {scenario.proposedSolutionSummary}
                </p>

                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                  <div className="text-xs font-mono text-stone-400 uppercase">
                    1. Mi lectura del problema (Análisis Técnico + Administrativo)
                  </div>
                  <p className="text-sm text-stone-200 leading-relaxed">
                    {scenario.rootCauseAnalysis}
                  </p>
                </div>

                {/* Step-by-Step Action Plan */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-stone-400 uppercase">
                    2. Pasos concretos que seguiremos
                  </div>
                  <div className="space-y-2.5">
                    {scenario.actionSteps.map((step, idx) => (
                      <div
                        key={step}
                        className="flex items-start gap-3 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs sm:text-sm text-stone-200"
                      >
                        <span
                          className={`font-mono ${activeVisual.accentColor} font-bold shrink-0`}
                        >
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Capabilities & Deliverables */}
                <div className="pt-4 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-mono text-stone-400 uppercase block">
                      Servicios que integraremos:
                    </span>
                    <span className="text-stone-200 font-medium leading-relaxed block">
                      {matchedCapabilities.map((c) => c.title).join(' · ')}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-stone-400 uppercase block">
                      Entregables y Tiempo Estimado ({scenario.estimatedTimeline}):
                    </span>
                    <span
                      className={`${activeVisual.accentColor} font-medium leading-relaxed block`}
                    >
                      {scenario.recommendedDeliverables.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right 5 Cols: Interactive Proposal & Contact Form */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5">
              <div
                className={`text-xs font-mono uppercase transition-colors duration-500 ${activeVisual.accentColor}`}
              >
                Iniciar Conversación Directa
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Solicitar diagnóstico o propuesta de solución
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Completa tus datos para estructurar el análisis inicial de{' '}
                <strong className="text-stone-200">“{scenario.prompt}”</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label
                  htmlFor="client-name-input"
                  className="block text-xs font-mono text-stone-300 mb-1.5"
                >
                  Tu nombre o empresa
                </label>
                <input
                  id="client-name-input"
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Ej. Andrea Torres / Estudio Norte"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-channel-input"
                  className="block text-xs font-mono text-stone-300 mb-1.5"
                >
                  Correo electrónico o WhatsApp de contacto
                </label>
                <input
                  id="contact-channel-input"
                  type="text"
                  value={contactChannel}
                  onChange={(e) => setContactChannel(e.target.value)}
                  placeholder="Ej. andrea@empresa.com o +51 999..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-300 mb-1.5">
                  Prioridad o etapa actual
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Exploratorio', 'Próximas semanas', 'Prioritario'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap truncate ${
                        urgency === level
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-semibold'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-context-input"
                  className="block text-xs font-mono text-stone-300 mb-1.5"
                >
                  Cuéntame brevemente tu caso o necesidad
                </label>
                <textarea
                  id="project-context-input"
                  rows={3}
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  placeholder="Ej. Tenemos varios equipos en oficina con archivos desordenados y necesitamos organizar la información y lanzar nuestra web..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {formError && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-rose-950/80 border border-rose-700 text-xs text-rose-200 flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-display text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Generar Diagnóstico y Enviar Solicitud</span>
              </button>
            </form>

            {submittedSummary && (
              <div
                data-testid="proposal-summary-output"
                className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/80 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SOLICITUD Y FICHA TÉCNICA LISTA</span>
                </div>
                <pre className="text-xs font-mono text-stone-200 whitespace-pre-wrap leading-relaxed">
                  {submittedSummary}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Clean Editorial Footer with Full 9-Chapter Navigation */}
        <footer className="pt-14 border-t border-stone-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs text-stone-400">
          <div className="space-y-1">
            <div className="font-display text-sm font-bold text-white">
              Adrián Dextre Carranza
            </div>
            <p>
              Tecnología · Creatividad · Análisis · Administración de Empresas · Soluciones Prácticas
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            {ARCHITECTURE_CHAPTERS.map((chap) => (
              <a
                key={chap.id}
                href={`#${chap.id}`}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                <span className="font-mono text-amber-400 mr-1">{chap.number}</span>
                {chap.shortNav}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
