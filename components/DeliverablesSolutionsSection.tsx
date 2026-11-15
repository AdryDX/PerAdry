'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DELIVERABLE_SOLUTIONS,
  DeliverableClassification,
  filterDeliverableSolutions,
} from '@/lib/ecosystem-engine';
import { PackageCheck, Wrench, ShieldCheck, Check, ArrowRight } from 'lucide-react';

import deliverablesShowcaseImg from '@/src/assets/images/digital_deliverables_showcase_1794584500055.jpg';
import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import nfcCardImg from '@/src/assets/images/nfc_smart_business_card_1794577289014.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const DELIVERABLE_IMAGES: Record<string, string> = {
  'deliv-web-complete': getImgSrc(webSystemsImg),
  'deliv-landing-portfolio': getImgSrc(deliverablesShowcaseImg),
  'deliv-custom-tools': getImgSrc(webSystemsImg),
  'deliv-iot-esp32': getImgSrc(iotMacroImg),
  'deliv-nfc-cards': getImgSrc(nfcCardImg),
  'deliv-legit-licenses': getImgSrc(deliverablesShowcaseImg),
  'deliv-custom-service': getImgSrc(deliverablesShowcaseImg),
};

const CLASSIFICATION_STYLES: Record<
  DeliverableClassification,
  { accentText: string; borderClass: string }
> = {
  'Producto digital': {
    accentText: 'text-amber-700',
    borderClass: 'border-amber-300/90',
  },
  'Producto físico': {
    accentText: 'text-emerald-700',
    borderClass: 'border-emerald-300/90',
  },
  'Licencia / recurso legítimo': {
    accentText: 'text-sky-700',
    borderClass: 'border-sky-300/90',
  },
  'Servicio personalizado': {
    accentText: 'text-violet-700',
    borderClass: 'border-violet-300/90',
  },
};

export default function DeliverablesSolutionsSection() {
  const [selectedClassification, setSelectedClassification] = useState<string>('Todos');

  const visibleSolutions = filterDeliverableSolutions(
    DELIVERABLE_SOLUTIONS,
    selectedClassification
  );

  const filterOptions: ('Todos' | DeliverableClassification)[] = [
    'Todos',
    'Producto digital',
    'Producto físico',
    'Licencia / recurso legítimo',
    'Servicio personalizado',
  ];

  return (
    <section
      id="soluciones"
      className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80"
    >
      <div className="max-w-[1380px] mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
              05 — PRODUCTOS Y SOLUCIONES ENTREGABLES · ¿Qué puedo recibir o adquirir?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              Soluciones que puedo entregar: diferenciando claramente entre Servicio y Producto
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Para que tengas claridad total antes de iniciar, separo el{' '}
              <strong className="text-stone-900">trabajo profesional de servicio</strong> de los{' '}
              <strong className="text-stone-900">
                productos digitales, tecnológicos o licencias legítimas
              </strong>{' '}
              que recibes listos para usar.
            </p>
          </div>
        </div>

        {/* Conceptual Comparison Banner: SERVICIO vs PRODUCTO + Studio Showcase Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-violet-700 font-semibold uppercase">
                  <Wrench className="w-4 h-4" />
                  <span>CONCEPTO 01 · SERVICIO</span>
                </div>
                <h3 className="font-display text-xl font-bold text-stone-950">
                  Trabajo realizado para resolver una necesidad
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Es el proceso donde analizo, diagnostico, reparo, configuro, organizo archivos o
                  produzco contenido visual adaptado exactamente a tu situación particular.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100 text-xs font-mono text-stone-500">
                Ejemplos: Mantenimiento PC · Organización digital · Consultoría · Sesión 360°
              </div>
            </div>

            <div className="bg-stone-950 text-white border border-stone-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-md">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase">
                  <PackageCheck className="w-4 h-4" />
                  <span>CONCEPTO 02 · PRODUCTO</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Algo concreto que puedes recibir o adquirir
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Es un entregable definido, tangible o digital, que recibes terminado y listo para
                  funcionar: una web publicada, una tarjeta NFC codificada o un dispositivo ESP32.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-800 text-xs font-mono text-amber-300">
                Ejemplos: Página web terminada · Dispositivo IoT ESP32 · Tarjeta NFC · Licencia
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[240px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-950">
            <img
              src={getImgSrc(deliverablesShowcaseImg)}
              alt="Muestra de entregables: tarjeta inteligente NFC, nodo sensor ESP32 y portal web en tablet"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
              <div className="text-xs font-mono uppercase text-amber-300">
                ECOSISTEMA DE ENTREGABLES
              </div>
              <p className="font-display text-base font-bold">
                Producto Digital + Producto Físico Configurado + Servicio Personalizado
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Classification Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-2xl p-4">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Filtrar por tipo de entregable:
          </div>
          <div
            role="group"
            aria-label="Filtrar soluciones entregables por tipo"
            className="flex flex-wrap items-center gap-2"
          >
            {filterOptions.map((opt) => {
              const isSelected = selectedClassification === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedClassification(opt)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-stone-950 text-white border-stone-950'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deliverables Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedClassification}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visibleSolutions.map((sol) => {
              const style = CLASSIFICATION_STYLES[sol.classification];
              const imgSrc =
                DELIVERABLE_IMAGES[sol.id] || getImgSrc(deliverablesShowcaseImg);

              return (
                <article
                  key={sol.id}
                  className={`bg-white border ${style.borderClass} rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all`}
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-stone-950 border-b border-stone-100">
                      <img
                        src={imgSrc}
                        alt={sol.title}
                        className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                        <span className="text-amber-300 uppercase">{sol.classification}</span>
                        <span className="text-stone-300 text-[11px]">{sol.categoryGroup}</span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="font-display text-lg font-bold text-stone-950 leading-snug">
                          {sol.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                          {sol.shortDescription}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-100">
                        <div className="text-[11px] font-mono uppercase text-stone-500">
                          ¿Qué recibes exactamente?
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-800">
                          {sol.whatClientReceives.map((rec) => (
                            <li key={rec} className="flex items-start gap-2">
                              <Check className={`w-3.5 h-3.5 ${style.accentText} shrink-0 mt-0.5`} />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {sol.complianceNote && (
                        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200/80 flex items-start gap-2 text-[11px] text-sky-950">
                          <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                          <span>{sol.complianceNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 py-4 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between gap-2 text-xs">
                    <span className="text-stone-500 truncate">{sol.typicalFormat}</span>
                    <a
                      href="#contacto"
                      className="font-semibold text-stone-950 hover:text-amber-700 flex items-center gap-1 shrink-0"
                    >
                      <span>Solicitar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
