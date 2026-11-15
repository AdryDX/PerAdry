'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TIMELINE_ENTRIES,
  KNOWLEDGE_DOMAINS,
  KNOWLEDGE_ITEMS,
  LAB_PROJECTS,
  filterTimelineEntries,
} from '@/lib/ecosystem-engine';
import {
  Download,
  Search,
  FileText,
  UserCheck,
  GraduationCap,
  Briefcase,
  Cpu,
  FolderGit2,
  ArrowUpRight,
  Info,
} from 'lucide-react';

type CvSectionTab = 'perfil' | 'formacion' | 'experiencia' | 'conocimientos' | 'proyectos';

export default function InteractiveCVAndProcess() {
  const [activeCvTab, setActiveCvTab] = useState<CvSectionTab>('perfil');
  const [timelineCategory, setTimelineCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cvModalOpen, setCvModalOpen] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const filteredTimeline = filterTimelineEntries(
    TIMELINE_ENTRIES,
    timelineCategory,
    searchQuery
  );

  const handleDownloadFormalCV = () => {
    const cvText = [
      '====================================================================',
      'CURRÍCULUM VITAE — ADRIÁN DEXTRE CARRANZA',
      'Perfil Multidisciplinario: Computación e Informática + Administración de Empresas',
      'Correo de contacto: dextrecarranza@gmail.com',
      '====================================================================',
      '',
      '1. PERFIL PROFESIONAL',
      'Profesional multidisciplinario enfocado en analizar problemas reales, estructurar procesos y construir soluciones que combinan tecnología, administración, creatividad y ejecución práctica.',
      '',
      '2. FORMACIÓN ACADÉMICA Y COMPLEMENTARIA',
      '- Computación e Informática · [Espacio reservado para institución oficial y periodo]',
      '- Administración de Empresas · [Espacio reservado para institución oficial y periodo]',
      '- Formación Complementaria y Posgrado · [Espacio reservado para actualizar cursos/posgrado]',
      '',
      '3. EXPERIENCIA PROFESIONAL (RESUMEN)',
      '- Desarrollo de Soluciones Digitales, Páginas Web, Presencia Digital y Automatización',
      '- Soporte Técnico Informático (Mantenimiento Físico y Optimización Digital), Organización y Seguridad de Datos',
      '- Laboratorio Aplicado: Prototipado IoT (ESP32), Producción Visual 360° (Insta360 X5) y Tecnología NFC',
      '',
      '4. CONOCIMIENTOS Y TECNOLOGÍAS CLAVE',
      '- Desarrollo Web: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Node.js, APIs REST, Git/GitHub',
      '- UI y 3D: Tailwind CSS, Framer Motion, Three.js, Visores 360°, Exploración en Gaussian Splatting',
      '- Hardware e IoT: ESP32, Sensores, Relés, Redes Wi-Fi, Etiquetas Inteligentes NFC',
      '- Inteligencia Artificial: IA Generativa, Modelos Locales (64 GB RAM + GPU 8 GB), Automatización',
      '',
      'Nota: Documento generado desde el portal oficial de Adrián Dextre Carranza.',
    ].join('\n');

    try {
      const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV_Adrian_Dextre_Carranza.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch {
      setCvModalOpen(true);
    }
  };

  const cvTabs: { id: CvSectionTab; label: string; icon: React.ReactNode }[] = [
    { id: 'perfil', label: '1. Perfil', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'formacion', label: '2. Formación', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'experiencia', label: '3. Experiencia', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'conocimientos', label: '4. Conocimientos', icon: <Cpu className="w-4 h-4" /> },
    { id: 'proyectos', label: '5. Proyectos', icon: <FolderGit2 className="w-4 h-4" /> },
  ];

  return (
    <section
      id="cv"
      className="py-20 md:py-28 bg-white border-b border-stone-200/80"
    >
      <div className="max-w-[1380px] mx-auto px-6 space-y-12">
        {/* Header + Download CV Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
              08 — CURRÍCULUM Y EXPERIENCIA INTERACTIVA · ¿Cuál es su trayectoria?
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-950"
              style={{ textWrap: 'balance' }}
            >
              Currículum navegable: formación en Administración e Informática, experiencia y
              proyectos conectados
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadFormalCV}
              className="px-4 py-2.5 rounded-xl bg-stone-950 text-white text-xs sm:text-sm font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'CV Descargado ✓' : 'Descargar CV'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCvModalOpen((prev) => !prev)}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-900 border border-stone-300 text-xs sm:text-sm font-semibold hover:border-stone-900 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>{cvModalOpen ? 'Ocultar Vista Formal' : 'Ver Versión Formal Imprimible'}</span>
            </button>
          </div>
        </div>

        {/* Printable / Formal CV Summary Preview Box */}
        {cvModalOpen && (
          <div
            data-testid="cv-executive-summary"
            className="bg-stone-950 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div>
                <div className="text-xs font-mono text-amber-400">
                  VERSIÓN FORMAL RESUMIDA — CURRÍCULUM VITAE
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Adrián Dextre Carranza
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-400">
                Computación e Informática · Administración de Empresas
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-300">
              <div className="space-y-2">
                <div className="font-mono text-xs text-amber-400 uppercase">
                  Formación Principal
                </div>
                <p>
                  • <strong>Computación e Informática</strong>{' '}
                  <span className="text-stone-400">
                    [Institución y fechas exactas en espacio editable]
                  </span>
                </p>
                <p>
                  • <strong>Administración de Empresas</strong>{' '}
                  <span className="text-stone-400">
                    [Institución y fechas exactas en espacio editable]
                  </span>
                </p>
                <p>
                  • Formación complementaria y actualización continua en desarrollo web, IoT e IA.
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-xs text-amber-400 uppercase">
                  Líneas de Experiencia
                </div>
                <p>
                  • Desarrollo web (React, Next.js, TypeScript), portales y presencia digital para
                  empresas.
                </p>
                <p>
                  • Soporte técnico informático (físico y digital), organización y seguridad de
                  archivos.
                </p>
                <p>
                  • Prototipado IoT (ESP32), tarjetas NFC y producción visual 360° (Insta360 X5).
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-xs text-amber-400 uppercase">
                  Transparencia de Datos
                </div>
                <p>
                  Los nombres específicos de instituciones, empresas clientes o fechas contractuales
                  se mantienen en espacios editables identificados para proteger privacidad y
                  exactitud documental.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5-Tab Interactive CV Navigation (PERFIL | FORMACIÓN | EXPERIENCIA | CONOCIMIENTOS | PROYECTOS) */}
        <div
          role="tablist"
          aria-label="Secciones del currículum interactivo"
          className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-2xl border border-stone-200"
        >
          {cvTabs.map((tab) => {
            const isSelected = activeCvTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCvTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'bg-stone-950 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-white/70'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CV Tab Content */}
        <AnimatePresence mode="wait">
          {activeCvTab === 'perfil' && (
            <motion.div
              key="cv-perfil"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="text-xs font-mono uppercase text-amber-800 font-semibold">
                  RESUMEN PROFESIONAL
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-950">
                  Adrián Dextre Carranza · Profesional Multidisciplinario en Tecnología y Gestión
                </h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  Mi perfil une la base técnica de <strong>Computación e Informática</strong> con la
                  visión estructurada de <strong>Administración de Empresas</strong>. Esta
                  combinación me permite entender tanto el funcionamiento interno de un sistema, una
                  red o un equipo como el impacto que tiene en el tiempo, el orden y los objetivos
                  de una persona o negocio.
                </p>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Me desenvuelvo en el desarrollo web moderno, el soporte técnico físico y digital,
                  la organización de información, el prototipado electrónico con ESP32, el uso
                  práctico de inteligencia artificial y la creación de contenido visual inmersivo
                  360°.
                </p>
              </div>

              <div className="lg:col-span-5 bg-stone-950 text-white border border-stone-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase text-amber-400">
                    FORTALEZAS DIFERENCIALES
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-200">
                    <li>• Capacidad para analizar problemas complejos antes de ejecutar.</li>
                    <li>• Comunicación clara sin tecnicismos innecesarios.</li>
                    <li>• Aprendizaje constante y laboratorio propio de experimentación.</li>
                    <li>• Enfoque en soluciones prácticas, ordenadas y sostenibles.</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>Ubicación / Modalidad:</span>
                  <span className="text-amber-300">Trabajo digital, remoto y por proyectos</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeCvTab === 'formacion' && (
            <motion.div
              key="cv-formacion"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/90 flex items-start gap-3 text-xs text-stone-800">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota de rigor documental:</strong> No se inventan fechas, nombres de
                  instituciones ni certificaciones ficticias. Los campos específicos de fechas o
                  centros de estudio están marcados como espacios editables listos para completar.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 space-y-3">
                  <div className="text-xs font-mono text-amber-800 font-semibold uppercase">
                    FORMACIÓN PRINCIPAL 01
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-950">
                    Computación e Informática
                  </h3>
                  <p className="text-xs font-mono text-stone-500">
                    [Espacio reservado: Nombre de institución educativa y periodo exacto]
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Formación en desarrollo de software, páginas y sistemas web, arquitectura y
                    mantenimiento de computadoras, redes, sistemas operativos y estructuración de
                    datos.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 space-y-3">
                  <div className="text-xs font-mono text-sky-800 font-semibold uppercase">
                    FORMACIÓN PRINCIPAL 02
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-950">
                    Administración de Empresas
                  </h3>
                  <p className="text-xs font-mono text-stone-500">
                    [Espacio reservado: Nombre de institución educativa y periodo exacto]
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Formación en gestión organizacional, análisis y mejora de procesos,
                    administración de recursos, estructuración documental y orientación a resultados
                    comerciales.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 space-y-3">
                  <div className="text-xs font-mono text-emerald-800 font-semibold uppercase">
                    FORMACIÓN COMPLEMENTARIA
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-950">
                    Especialización en Tecnologías Web, IoT, IA y Producción 360°
                  </h3>
                  <p className="text-xs font-mono text-stone-500">
                    [Espacio reservado: Cursos específicos, talleres y certificaciones verificadas]
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Actualización constante en React, Next.js, TypeScript, microcontroladores ESP32,
                    modelos de IA locales, tecnología NFC y captura inmersiva con Insta360 X5.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 space-y-3">
                  <div className="text-xs font-mono text-violet-800 font-semibold uppercase">
                    ESTUDIOS DE POSGRADO / EXTENSIÓN (CUANDO CORRESPONDA)
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-950">
                    [Placeholder: Programa de Posgrado / Diplomado / Especialización]
                  </h3>
                  <p className="text-xs font-mono text-stone-500">
                    [Espacio reservado para institución, mención y estado actual]
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Bloque preparado para detallar estudios de posgrado o diplomados ejecutivos
                    según actualización curricular oficial.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeCvTab === 'experiencia' && (
            <motion.div
              key="cv-experiencia"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
                <div className="flex flex-wrap items-center gap-2">
                  {(['Todos', 'Experiencia', 'Formación', 'Especialización', 'Proyectos Clave'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setTimelineCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                          timelineCategory === cat
                            ? 'bg-stone-950 text-white'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    aria-label="Filtrar trayectoria por habilidad o área"
                    placeholder="Buscar área (ej. ESP32, Web...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              {/* Timeline Cards */}
              <div className="space-y-4">
                {filteredTimeline.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:border-amber-600/40 transition-colors"
                  >
                    <div className="lg:col-span-3 space-y-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-semibold block">
                        {entry.category}
                      </span>
                      <span className="font-display text-sm font-bold text-stone-900 block">
                        {entry.period}
                      </span>
                      <span className="text-xs text-stone-500 block">
                        {entry.organizationOrContext}
                      </span>
                    </div>

                    <div className="lg:col-span-6 space-y-2">
                      <h3 className="font-display text-lg font-bold text-stone-950">
                        {entry.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {entry.description}
                      </p>
                      <div className="pt-1 text-xs font-mono text-stone-500">
                        {entry.disciplines.join(' · ')}
                      </div>
                    </div>

                    <div className="lg:col-span-3 bg-white border border-stone-200/80 rounded-xl p-4 space-y-1">
                      <span className="text-[11px] font-mono uppercase text-stone-400 block">
                        Valor Aportado
                      </span>
                      <p className="text-xs font-medium text-stone-800 leading-relaxed">
                        {entry.impactHighlight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeCvTab === 'conocimientos' && (
            <motion.div
              key="cv-conocimientos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {KNOWLEDGE_DOMAINS.map((dom) => {
                  const items = KNOWLEDGE_ITEMS.filter((i) => i.domainId === dom.id);
                  return (
                    <div
                      key={dom.id}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-mono text-amber-800 font-semibold">
                          {dom.code}
                        </div>
                        <h4 className="font-display text-base font-bold text-stone-950">
                          {dom.title}
                        </h4>
                      </div>
                      <div className="text-xs text-stone-700 leading-relaxed">
                        {items.map((i) => i.name).join(' · ')}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-right">
                <a
                  href="#conocimientos"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline"
                >
                  <span>Ir a la matriz interactiva completa de Conocimientos (Sección 03)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          {activeCvTab === 'proyectos' && (
            <motion.div
              key="cv-proyectos"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {LAB_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono text-amber-800 font-semibold">
                        {proj.code}
                      </div>
                      <h4 className="font-display text-base font-bold text-stone-950">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{proj.shortSummary}</p>
                    </div>
                    <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                      <span className="font-mono text-stone-500 truncate">
                        {proj.stack.slice(0, 3).join(' · ')}
                      </span>
                      <a
                        href="#proyectos"
                        className="font-semibold text-stone-950 hover:text-amber-700 shrink-0"
                      >
                        Ver en Portafolio →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
