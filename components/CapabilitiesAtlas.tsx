'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CAPABILITY_CATEGORIES,
  INITIAL_MESSY_FILES,
  calculateOrganizationImpact,
  simulateEsp32Telemetry,
} from '@/lib/ecosystem-engine';
import {
  Check,
  FolderTree,
  FolderOpen,
  Thermometer,
  Droplets,
  Smartphone,
  Compass,
  SlidersHorizontal,
  ArrowRight,
  Wrench,
  ShieldAlert,
  Box,
  Cpu,
  Wifi,
  Activity,
} from 'lucide-react';

import beforePhotoAsset from '@/src/assets/images/photo_before_raw_1794574241832.jpg';
import afterPhotoAsset from '@/src/assets/images/photo_after_graded_1794574242549.jpg';
import panorama360Asset from '@/src/assets/images/panorama_360_studio_1794574243458.jpg';
import webSystemsImg from '@/src/assets/images/web_systems_architecture_1794577284500.jpg';
import networkServerImg from '@/src/assets/images/network_server_infrastructure_1794577285987.jpg';
import iotMacroImg from '@/src/assets/images/iot_esp32_circuit_macro_1794577283242.jpg';
import nfcCardImg from '@/src/assets/images/nfc_smart_business_card_1794577289014.jpg';
import insta360Img from '@/src/assets/images/insta360_x5_camera_studio_1794584493843.jpg';
import gaussian3dImg from '@/src/assets/images/gaussian_splatting_3d_space_1794584496130.jpg';
import pcMaintenanceImg from '@/src/assets/images/pc_hardware_maintenance_lab_1794584498749.jpg';
import deliverablesImg from '@/src/assets/images/digital_deliverables_showcase_1794584500055.jpg';

const getImgSrc = (asset: string | { src: string }): string =>
  typeof asset === 'string' ? asset : asset.src;

const SERVICE_VISUALS: Record<
  string,
  {
    src: string;
    alt: string;
    activeTabClass: string;
    accentColor: string;
    quoteBoxClass: string;
    ambientBg: string;
  }
> = {
  'desarrollo-web': {
    src: getImgSrc(webSystemsImg),
    alt: 'Desarrollo de Páginas Web, Landing Pages, Portafolios y Sistemas Personalizados',
    activeTabClass: 'bg-amber-600 text-white border-amber-600',
    accentColor: 'text-amber-700',
    quoteBoxClass: 'bg-amber-50/80 border-amber-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(217, 119, 6, 0.10), transparent 55%)',
  },
  'soporte-sistemas': {
    src: getImgSrc(pcMaintenanceImg),
    alt: 'Mantenimiento Físico de Hardware y Optimización Digital de PC y Laptops',
    activeTabClass: 'bg-sky-700 text-white border-sky-700',
    accentColor: 'text-sky-700',
    quoteBoxClass: 'bg-sky-50/80 border-sky-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(3, 105, 161, 0.10), transparent 55%)',
  },
  'organizacion-digital': {
    src: getImgSrc(networkServerImg),
    alt: 'Organización y Seguridad Digital: Del Caos de Archivos al Sistema Estructurado',
    activeTabClass: 'bg-teal-700 text-white border-teal-700',
    accentColor: 'text-teal-700',
    quoteBoxClass: 'bg-teal-50/80 border-teal-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(15, 118, 110, 0.10), transparent 55%)',
  },
  'presencia-digital': {
    src: getImgSrc(deliverablesImg),
    alt: 'Presencia Digital para Empresas: Web, Google Maps y WhatsApp Business',
    activeTabClass: 'bg-orange-600 text-white border-orange-600',
    accentColor: 'text-orange-700',
    quoteBoxClass: 'bg-orange-50/80 border-orange-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(234, 88, 12, 0.10), transparent 55%)',
  },
  'fotografia-video-360': {
    src: getImgSrc(insta360Img),
    alt: 'Fotografía, Video, Edición Antes/Después y Recorridos 360 con Insta360 X5',
    activeTabClass: 'bg-rose-700 text-white border-rose-700',
    accentColor: 'text-rose-700',
    quoteBoxClass: 'bg-rose-50/80 border-rose-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(190, 18, 60, 0.10), transparent 55%)',
  },
  'entornos-virtuales-3d': {
    src: getImgSrc(gaussian3dImg),
    alt: 'Entornos Virtuales, Procesamiento 3D y Gaussian Splatting',
    activeTabClass: 'bg-violet-700 text-white border-violet-700',
    accentColor: 'text-violet-700',
    quoteBoxClass: 'bg-violet-50/80 border-violet-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(109, 40, 217, 0.10), transparent 55%)',
  },
  'iot-electronica': {
    src: getImgSrc(iotMacroImg),
    alt: 'IoT, Electrónica y Mecatrónica con Microcontroladores ESP32 y Sensores',
    activeTabClass: 'bg-emerald-700 text-white border-emerald-700',
    accentColor: 'text-emerald-700',
    quoteBoxClass: 'bg-emerald-50/80 border-emerald-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(4, 120, 87, 0.10), transparent 55%)',
  },
  'nfc-negocios': {
    src: getImgSrc(nfcCardImg),
    alt: 'Tarjetas Inteligentes NFC, Menús Digitales y Acceso Instantáneo',
    activeTabClass: 'bg-indigo-700 text-white border-indigo-700',
    accentColor: 'text-indigo-700',
    quoteBoxClass: 'bg-indigo-50/80 border-indigo-200/90',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(67, 56, 202, 0.10), transparent 55%)',
  },
  'importacion-gestion-tec': {
    src: getImgSrc(webSystemsImg),
    alt: 'Búsqueda Técnica, Evaluación de Compatibilidad y Gestión de Importación Tecnológica',
    activeTabClass: 'bg-stone-900 text-white border-stone-900',
    accentColor: 'text-stone-800',
    quoteBoxClass: 'bg-stone-100 border-stone-300',
    ambientBg: 'radial-gradient(circle at 85% 15%, rgba(41, 37, 36, 0.08), transparent 55%)',
  },
};

export default function CapabilitiesAtlas() {
  const [selectedCapId, setSelectedCapId] = useState<string>(CAPABILITY_CATEGORIES[0].id);

  // Simulator 1: Digital Organization (CAOS DIGITAL -> SISTEMA ORGANIZADO)
  const [isOrganized, setIsOrganized] = useState<boolean>(false);
  const orgImpact = calculateOrganizationImpact(INITIAL_MESSY_FILES, isOrganized);

  // Simulator 2: IoT & ESP32 Telemetry
  const [tempC, setTempC] = useState<number>(26);
  const [humidityPct, setHumidityPct] = useState<number>(58);
  const [motionDetected, setMotionDetected] = useState<boolean>(false);
  const [autoMode, setAutoMode] = useState<boolean>(true);
  const [manualVent, setManualVent] = useState<boolean>(false);
  const [manualLight, setManualLight] = useState<boolean>(false);

  const iotTelemetry = simulateEsp32Telemetry(
    tempC,
    humidityPct,
    motionDetected,
    autoMode,
    manualVent,
    manualLight
  );

  // Simulator 3: NFC Tap Experience
  const [nfcMode, setNfcMode] = useState<'vcard' | 'menu' | 'soporte'>('vcard');
  const [nfcTapped, setNfcTapped] = useState<boolean>(true);

  // Simulator 4: Visual Before/After & 360° Pan
  const [visualTab, setVisualTab] = useState<'grading' | '360' | '3d-explainer'>('grading');
  const [gradingSplitPct, setGradingSplitPct] = useState<number>(52);
  const [panoYawDeg, setPanoYawDeg] = useState<number>(180);

  const activeCapability =
    CAPABILITY_CATEGORIES.find((c) => c.id === selectedCapId) || CAPABILITY_CATEGORIES[0];
  const activeVisual = SERVICE_VISUALS[activeCapability.id] || SERVICE_VISUALS['desarrollo-web'];

  const beforeSrc = getImgSrc(beforePhotoAsset);
  const afterSrc = getImgSrc(afterPhotoAsset);
  const panoSrc = getImgSrc(panorama360Asset);

  return (
    <section
      id="servicios"
      className="relative py-20 md:py-28 bg-white border-b border-stone-200/80 overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Ambient Color Wash */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-700"
        style={{ background: activeVisual.ambientBg }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1380px] mx-auto px-6 space-y-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-3">
            <p
              className={`text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-500 ${activeVisual.accentColor}`}
            >
              04 — SERVICIOS · ¿Qué puede hacer por mí o por mi empresa?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              Nueve categorías de servicio organizadas con claridad (A–I) y demostraciones en vivo
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Explora cada línea de servicio sin mezclas confusas: desde{' '}
              <strong className="text-stone-900">Desarrollo Web (A)</strong> y{' '}
              <strong className="text-stone-900">Soporte Físico/Digital (B)</strong> hasta{' '}
              <strong className="text-stone-900">Caos → Sistema Organizado (C)</strong>,{' '}
              <strong className="text-stone-900">Contenido 360°/3D (E–F)</strong>,{' '}
              <strong className="text-stone-900">IoT/ESP32 (G)</strong>,{' '}
              <strong className="text-stone-900">NFC (H)</strong> e{' '}
              <strong className="text-stone-900">Importación y Gestión Tecnológica (I)</strong>.
            </p>
          </div>
        </div>

        {/* 9-Category Service Atlas (A through I) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 4 Columns: 9 Service Category Selector (A-I) */}
          <div
            role="tablist"
            aria-label="Categorías de servicios A a I"
            className="lg:col-span-4 space-y-2"
          >
            {CAPABILITY_CATEGORIES.map((cap) => {
              const isSelected = cap.id === selectedCapId;
              const capVisual = SERVICE_VISUALS[cap.id] || SERVICE_VISUALS['desarrollo-web'];
              return (
                <motion.button
                  key={cap.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedCapId(cap.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? `${capVisual.activeTabClass} shadow-md`
                      : 'bg-stone-50/90 text-stone-800 border-stone-200/90 hover:border-stone-400 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono text-xs font-bold shrink-0 px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-200/80 text-stone-700'
                      }`}
                    >
                      {cap.letterCode}
                    </span>
                    <span className="font-display text-sm font-bold truncate">{cap.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-white translate-x-0.5' : 'text-stone-400'
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right 8 Columns: Active Service Category Detail */}
          <div className="lg:col-span-8 bg-[#FAF8F5] border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Contextual High-Resolution Image Header */}
            <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-stone-950 border-b border-stone-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVisual.src + activeCapability.id}
                  src={activeVisual.src}
                  alt={activeVisual.alt}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3 text-white">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                    CATEGORÍA DE SERVICIO {activeCapability.letterCode} · ({activeCapability.index}{' '}
                    / 09)
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {activeCapability.title}
                  </h3>
                </div>
                <a
                  href="#contacto"
                  className="text-xs font-mono bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3.5 py-2 rounded-lg transition-colors"
                >
                  Consultar este servicio →
                </a>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCapability.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 space-y-6"
              >
                <p className="text-sm text-stone-600">{activeCapability.subtitle}</p>

                {/* Core Value Statement */}
                <div className={`p-4 rounded-xl border ${activeVisual.quoteBoxClass}`}>
                  <p className="text-sm font-medium text-stone-900 leading-relaxed">
                    «{activeCapability.coreStatement}»
                  </p>
                </div>

                {/* Special Separation for Category B: Mantenimiento Físico vs Optimización Digital */}
                {activeCapability.subSections && activeCapability.subSections.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    {activeCapability.subSections.map((sub, idx) => (
                      <div
                        key={sub.title}
                        className={`p-5 rounded-xl border space-y-3 ${
                          idx === 0
                            ? 'bg-white border-amber-300/80'
                            : 'bg-white border-sky-300/80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Wrench
                            className={`w-4 h-4 ${
                              idx === 0 ? 'text-amber-700' : 'text-sky-700'
                            }`}
                          />
                          <h4 className="font-display text-base font-bold text-stone-950">
                            {sub.title}
                          </h4>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{sub.description}</p>
                        <ul className="space-y-1.5 text-xs text-stone-800">
                          {sub.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Special Visual Diagram for Category F: Entornos Virtuales y 3D */}
                {activeCapability.id === 'entornos-virtuales-3d' && (
                  <div className="p-5 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-violet-300 uppercase">
                        Explicación Sencilla para Personas No Técnicas
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        Del Mundo Real a la Pantalla
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                        <div className="font-mono text-amber-400 font-bold">
                          1. Fotografía / Video 360°
                        </div>
                        <p className="text-stone-300 leading-relaxed">
                          Permite girar la vista en todas las direcciones desde un punto fijo (ideal
                          para mostrar salones, tiendas o talleres).
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                        <div className="font-mono text-violet-400 font-bold">
                          2. Gaussian Splatting
                        </div>
                        <p className="text-stone-300 leading-relaxed">
                          Técnica moderna que reconstruye un espacio u objeto en 3D con realismo
                          fotográfico a partir de capturas reales.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-lg bg-stone-950 border border-stone-800 space-y-1">
                        <div className="font-mono text-emerald-400 font-bold">
                          3. Entornos 3D Web
                        </div>
                        <p className="text-stone-300 leading-relaxed">
                          Escenas interactivas (Three.js) donde el visitante puede rotar piezas,
                          acercarse y tocar puntos de información.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special Visual Flow Diagram for Category G: IoT, Electrónica y Mecatrónica */}
                {activeCapability.id === 'iot-electronica' && (
                  <div className="p-5 rounded-xl bg-stone-950 text-stone-100 border border-stone-800 space-y-3">
                    <div className="text-xs font-mono text-emerald-400 uppercase">
                      Flujo de Información de una Solución IoT con ESP32
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 flex flex-col gap-1">
                        <span className="font-mono text-amber-400 font-bold">01 · SENSORES</span>
                        <span className="text-stone-300">
                          Miden temperatura, humedad, presencia o apertura en el lugar físico.
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 flex flex-col gap-1">
                        <span className="font-mono text-emerald-400 font-bold">02 · NODO ESP32</span>
                        <span className="text-stone-300">
                          Procesa las lecturas en milisegundos y evalúa reglas de seguridad.
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 flex flex-col gap-1">
                        <span className="font-mono text-sky-400 font-bold">03 · WI-FI / RED</span>
                        <span className="text-stone-300">
                          Envía los datos en formato ligero hacia el servidor o panel local.
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 flex flex-col gap-1">
                        <span className="font-mono text-rose-400 font-bold">
                          04 · PANEL / RELÉ
                        </span>
                        <span className="text-stone-300">
                          Muestra gráficas en vivo, envía alerta o enciende un equipo automáticamente.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Scope Bullet Items */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    Alcance Detallado de {activeCapability.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCapability.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/80 text-xs sm:text-sm text-stone-800"
                      >
                        <Check
                          className={`w-4 h-4 ${activeVisual.accentColor} shrink-0 mt-0.5`}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Notice for Category I: Importación y Gestión Tecnológica */}
                {activeCapability.complianceNotice && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-300/90 flex items-start gap-3 text-xs text-stone-800">
                    <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{activeCapability.complianceNotice}</p>
                  </div>
                )}

                {/* Typical Deliverables */}
                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
                  <div>
                    <span className="font-mono uppercase text-stone-500 mr-2">
                      Resultado / Entregables:
                    </span>
                    <span className="font-medium text-stone-900">
                      {activeCapability.deliverables.join(' · ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* LIVE INTERACTIVE DEMONSTRATION LABS FOR KEY SERVICES */}
        <div className="pt-6 space-y-12">
          <div className="border-t border-stone-200 pt-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold">
                Demostraciones Interactivas de Servicios (Prueba el Antes → Después)
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-950">
                Interactúa con cómo funcionan mis servicios en la práctica
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              4 simuladores interactivos: Caos → Orden Digital, IoT ESP32, NFC y Contenido Visual /
              360°
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* DEMO 1: CAOS DIGITAL -> SISTEMA ORGANIZADO (Category C) */}
            <div className="lg:col-span-6 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold">
                    DEMO SERVICIO C · CAOS DIGITAL → SISTEMA ORGANIZADO
                  </span>
                  <span className="text-xs font-mono text-stone-500 tabular-nums">
                    {isOrganized
                      ? `-${orgImpact.efficiencyGainPercent}% tiempo de búsqueda`
                      : 'Estado: Desordenado'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h4 className="font-display text-xl font-bold text-stone-950">
                    De archivos dispersos a estructura respaldada
                  </h4>

                  <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setIsOrganized(false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        !isOrganized
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-950'
                      }`}
                    >
                      Antes (Caos Digital)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOrganized(true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        isOrganized
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-950'
                      }`}
                    >
                      Después (Sistema Organizado)
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-stone-950 text-stone-100 rounded-xl p-4 space-y-3 font-mono text-xs min-h-[250px]">
                <div className="flex items-center justify-between text-stone-400 border-b border-stone-800 pb-2">
                  <span>
                    {isOrganized
                      ? 'REPOSITORIO_ESTRUCTURADO_Y_RESPALDADO/'
                      : 'CARPETAS_DISPERSAS_SIN_CRITERIO/'}
                  </span>
                  <span className="tabular-nums">
                    Búsqueda: {orgImpact.estimatedSearchSecondsAfter}s
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[210px] overflow-y-auto pr-1">
                  {Object.entries(orgImpact.groupedFolders).map(([folderName, files]) => (
                    <div key={folderName} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                        {isOrganized ? (
                          <FolderTree className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <FolderOpen className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                        )}
                        <span className="truncate">{folderName}</span>
                      </div>
                      <div className="pl-5 space-y-1">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between gap-2 text-stone-300 text-[11px]"
                          >
                            <span
                              className={`truncate ${
                                isOrganized ? 'text-emerald-300' : 'text-stone-300'
                              }`}
                            >
                              {isOrganized ? file.structuredName : file.rawName}
                            </span>
                            <span className="text-stone-500 shrink-0">{file.sizeKb} KB</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-stone-200 text-xs tabular-nums">
                <div>
                  <span className="text-stone-500 block">Tiempo hallazgo</span>
                  <span className="font-display text-base font-bold text-stone-900">
                    {isOrganized ? '8 seg' : '3 min 15s'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Duplicados limpiados</span>
                  <span className="font-display text-base font-bold text-stone-900">
                    {orgImpact.duplicatesRemoved} archivos
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Copia de seguridad</span>
                  <span className="font-display text-base font-bold text-emerald-700">
                    {isOrganized ? 'Verificada ✓' : 'Sin respaldo'}
                  </span>
                </div>
              </div>
            </div>

            {/* DEMO 2: IOT, ELECTRÓNICA Y ESP32 (Category G) */}
            <div className="lg:col-span-6 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                    DEMO SERVICIO G · TELEMETRÍA IOT ESP32 & RELÉS
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      iotTelemetry.alertLevel === 'Crítico'
                        ? 'text-rose-600'
                        : iotTelemetry.alertLevel === 'Preventivo'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    Estado: {iotTelemetry.alertLevel} · {iotTelemetry.voltageV}V
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h4 className="font-display text-xl font-bold text-stone-950">
                    Simulador de Sensores Conectados y Automatización
                  </h4>

                  <button
                    type="button"
                    onClick={() => setAutoMode((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      autoMode
                        ? 'bg-stone-950 text-white border-stone-950'
                        : 'bg-white text-stone-700 border-stone-300'
                    }`}
                  >
                    Modo: {autoMode ? 'Automático (Reglas ESP32)' : 'Control Manual'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-stone-950 rounded-xl p-3 border border-stone-800">
                <div className="sm:col-span-5 h-24 rounded-lg overflow-hidden relative">
                  <img
                    src={getImgSrc(iotMacroImg)}
                    alt="Módulo ESP32 con pantalla OLED y sensor ambiental"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-7 text-xs text-stone-300 space-y-1 px-1">
                  <div className="font-mono text-[11px] text-amber-400">
                    NODO: ESP32-WROOM-32 + SENSOR AMBIENTAL
                  </div>
                  <p className="text-stone-200 font-medium leading-snug">
                    Mueve los controles de temperatura o humedad para ver cómo el ESP32 activa el
                    relé de ventilación automáticamente.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-stone-200/80">
                <div className="space-y-2">
                  <label
                    htmlFor="iot-temp-slider"
                    className="flex items-center justify-between text-xs font-medium text-stone-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600" />
                      Temperatura Sensor
                    </span>
                    <span className="font-mono font-bold tabular-nums">{tempC}°C</span>
                  </label>
                  <input
                    id="iot-temp-slider"
                    type="range"
                    min={16}
                    max={42}
                    value={tempC}
                    onChange={(e) => setTempC(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="iot-hum-slider"
                    className="flex items-center justify-between text-xs font-medium text-stone-700"
                  >
                    <span className="flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-sky-600" />
                      Humedad Relativa
                    </span>
                    <span className="font-mono font-bold tabular-nums">{humidityPct}%</span>
                  </label>
                  <input
                    id="iot-hum-slider"
                    type="range"
                    min={25}
                    max={95}
                    value={humidityPct}
                    onChange={(e) => setHumidityPct(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              <div
                className={`rounded-xl p-4 text-xs font-mono transition-colors duration-500 ${
                  iotTelemetry.alertLevel === 'Crítico'
                    ? 'bg-rose-950 text-rose-100 border border-rose-700'
                    : iotTelemetry.alertLevel === 'Preventivo'
                    ? 'bg-amber-950 text-amber-100 border border-amber-700'
                    : 'bg-stone-950 text-stone-100 border border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    RELÉ EXTRACCIÓN:{' '}
                    <strong
                      className={
                        iotTelemetry.relayVentilationOn ? 'text-emerald-400' : 'text-stone-400'
                      }
                    >
                      {iotTelemetry.relayVentilationOn ? 'ENCENDIDO (ACTIVO)' : 'EN ESPERA'}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMotionDetected((p) => !p)}
                    className="underline text-amber-300 cursor-pointer"
                  >
                    {motionDetected ? 'Presencia: Detectada' : 'Simular Presencia PIR'}
                  </button>
                </div>
                <div className="mt-1.5 text-stone-300 truncate">
                  {iotTelemetry.automatedActionLog}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row of Interactive Simulators: NFC (Category H) + Visual Antes/Después & 360/3D (Categories E & F) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* DEMO 3: NFC PARA NEGOCIOS Y PERSONAS (Category H) */}
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-800 font-semibold">
                  DEMO SERVICIO H · TARJETAS Y ETIQUETAS NFC
                </span>
                <h4 className="font-display text-xl font-bold text-stone-950">
                  Simulador de Contacto Inteligente NFC
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Elige el uso de la tarjeta o etiqueta NFC para ver qué recibe el cliente en su
                  celular con un solo toque:
                </p>
              </div>

              <div className="relative h-32 rounded-xl overflow-hidden border border-stone-200 bg-stone-950">
                <img
                  src={getImgSrc(nfcCardImg)}
                  alt="Tarjeta de presentación inteligente NFC en negro mate"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent flex items-center p-4">
                  <div className="space-y-0.5 text-white">
                    <div className="text-[10px] font-mono text-amber-400 uppercase">
                      CHIP NDEF CONFIGURADO
                    </div>
                    <div className="font-display text-sm font-bold">
                      Sin aplicaciones intermedias
                    </div>
                    <div className="text-[11px] text-stone-300">
                      Compatible con iPhone y Android
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-200/80 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setNfcMode('vcard');
                    setNfcTapped(true);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap truncate ${
                    nfcMode === 'vcard'
                      ? 'bg-stone-950 text-white'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  Tarjeta Personal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNfcMode('menu');
                    setNfcTapped(true);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap truncate ${
                    nfcMode === 'menu'
                      ? 'bg-stone-950 text-white'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  Menú / Catálogo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNfcMode('soporte');
                    setNfcTapped(true);
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap truncate ${
                    nfcMode === 'soporte'
                      ? 'bg-stone-950 text-white'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  Tag en Equipo
                </button>
              </div>

              <div className="bg-stone-950 text-white rounded-xl p-5 space-y-3 border border-stone-800">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    LECTURA NFC INSTANTÁNEA
                  </span>
                  <span>13.56 MHz</span>
                </div>

                {nfcMode === 'vcard' && (
                  <div className="space-y-1.5">
                    <div className="font-display text-base font-bold">
                      Adrián Dextre · Perfil Profesional & Contacto
                    </div>
                    <p className="text-xs text-stone-300">
                      Abre tarjeta digital interactiva con botón para guardar contacto en agenda,
                      abrir WhatsApp y explorar portafolio.
                    </p>
                  </div>
                )}

                {nfcMode === 'menu' && (
                  <div className="space-y-1.5">
                    <div className="font-display text-base font-bold">
                      Menú Digital / Catálogo Comercial Interactivo
                    </div>
                    <p className="text-xs text-stone-300">
                      Ideal para restaurantes, tiendas o recepciones: muestra precios actualizados,
                      fotos y pedidos directos por WhatsApp.
                    </p>
                  </div>
                )}

                {nfcMode === 'soporte' && (
                  <div className="space-y-1.5">
                    <div className="font-display text-base font-bold">
                      Etiqueta Técnica Adherida a PC o Equipo
                    </div>
                    <p className="text-xs text-stone-300">
                      Muestra fecha del último mantenimiento físico/digital, especificaciones y
                      botón de soporte directo.
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>{nfcTapped ? 'Lectura verificada < 0.3s' : 'Acerca el dispositivo'}</span>
                  <button
                    type="button"
                    onClick={() => setNfcTapped((p) => !p)}
                    className="underline text-stone-300 hover:text-white cursor-pointer"
                  >
                    Probar lectura
                  </button>
                </div>
              </div>
            </div>

            {/* DEMO 4: FOTOGRAFÍA ANTES/DESPUÉS, VIDEO 360° (INSTA360 X5) Y ENTORNOS 3D (Categories E & F) */}
            <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-800 font-semibold">
                    DEMO SERVICIOS E & F · EDICIÓN ANTES/DESPUÉS, INSTA360 X5 & 3D
                  </span>
                  <h4 className="font-display text-xl font-bold text-stone-950">
                    Comparador Fotográfico, Visor 360° y Reconstrucción 3D
                  </h4>
                </div>

                <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setVisualTab('grading')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      visualTab === 'grading'
                        ? 'bg-stone-950 text-white'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Antes → Después</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualTab('360')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      visualTab === '360'
                        ? 'bg-stone-950 text-white'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Recorrido 360°</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisualTab('3d-explainer')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      visualTab === '3d-explainer'
                        ? 'bg-stone-950 text-white'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Gaussian Splatting 3D</span>
                  </button>
                </div>
              </div>

              {visualTab === 'grading' && (
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-stone-300 bg-stone-950 select-none">
                    <img
                      src={afterSrc}
                      alt="Después: Fotografía editada con iluminación y balance de color profesional"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400"
                      style={{ width: `${gradingSplitPct}%` }}
                    >
                      <img
                        src={beforeSrc}
                        alt="Antes: Captura original sin procesar"
                        className="h-full max-w-none object-cover"
                        style={{ width: '760px' }}
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-stone-950/80 text-stone-200 px-2.5 py-1 rounded text-[11px] font-mono">
                      ANTES (CAPTURA CRUDA)
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-600/90 text-white px-2.5 py-1 rounded text-[11px] font-mono">
                      DESPUÉS (EDICIÓN PROFESIONAL)
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="grading-split-slider"
                      className="flex items-center justify-between text-xs font-medium text-stone-700"
                    >
                      <span>Desliza para comparar Antes y Después del revelado</span>
                      <span className="font-mono font-bold tabular-nums">{gradingSplitPct}%</span>
                    </label>
                    <input
                      id="grading-split-slider"
                      type="range"
                      min={5}
                      max={95}
                      value={gradingSplitPct}
                      onChange={(e) => setGradingSplitPct(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {visualTab === '360' && (
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-stone-300 bg-stone-950">
                    <div
                      className="w-[220%] h-full transition-transform duration-150 ease-out"
                      style={{
                        transform: `translateX(-${((panoYawDeg / 360) * 50).toFixed(1)}%)`,
                      }}
                    >
                      <img
                        src={panoSrc}
                        alt="Vista panorámica 360 grados capturada para recorrido virtual"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-stone-950/85 text-amber-400 px-2.5 py-1 rounded text-[11px] font-mono">
                      VISOR 360° (INSTA360 X5) · ÁNGULO: {panoYawDeg}°
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="pano-yaw-slider"
                      className="flex items-center justify-between text-xs font-medium text-stone-700"
                    >
                      <span>Gira el ángulo horizontal de la cámara 360° (0° – 360°)</span>
                      <span className="font-mono font-bold tabular-nums">{panoYawDeg}°</span>
                    </label>
                    <input
                      id="pano-yaw-slider"
                      type="range"
                      min={0}
                      max={360}
                      value={panoYawDeg}
                      onChange={(e) => setPanoYawDeg(Number(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {visualTab === '3d-explainer' && (
                <div className="space-y-4">
                  <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden border border-stone-300 bg-stone-950">
                    <img
                      src={getImgSrc(gaussian3dImg)}
                      alt="Comparativa entre nube de puntos Gaussian Splatting y espacio comercial 3D reconstruido"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <div className="text-xs font-mono text-violet-300 uppercase">
                        PROCESAMIENTO 3D · GAUSSIAN SPLATTING & ENTORNOS WEB
                      </div>
                      <p className="text-xs text-stone-200 leading-relaxed">
                        A partir de fotografías y video (como los capturados con Insta360 X5), se
                        reconstruye el volumen tridimensional del espacio para explorarlo desde
                        cualquier perspectiva en la web.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
