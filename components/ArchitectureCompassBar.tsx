'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ARCHITECTURE_CHAPTERS } from '@/lib/ecosystem-engine';
import { Compass, ArrowDownRight } from 'lucide-react';

interface ArchitectureCompassBarProps {
  onSelectSection: (sectionId: string) => void;
}

export default function ArchitectureCompassBar({
  onSelectSection,
}: ArchitectureCompassBarProps) {
  const [activeHoverId, setActiveHoverId] = useState<string>('inicio');

  return (
    <section
      aria-label="Mapa de arquitectura de información del portal"
      className="bg-stone-950 text-stone-100 border-b border-stone-800 py-8"
    >
      <div className="max-w-[1380px] mx-auto px-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-amber-400">
            <Compass className="w-4 h-4 shrink-0" />
            <span>Arquitectura de Navegación · 9 Capítulos con Propósito Claro</span>
          </div>
          <p className="text-xs text-stone-400">
            Selecciona cualquier etapa para ir directamente a la respuesta que buscas:
          </p>
        </div>

        {/* 9-Step Interactive Journey Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2.5">
          {ARCHITECTURE_CHAPTERS.map((chap) => {
            const isHovered = activeHoverId === chap.id;
            return (
              <motion.button
                key={chap.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setActiveHoverId(chap.id)}
                onClick={() => onSelectSection(chap.id)}
                className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${
                  isHovered
                    ? 'bg-stone-900 border-amber-500/70 text-white shadow-md'
                    : 'bg-stone-900/50 border-stone-800/90 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {chap.number}
                  </span>
                  <ArrowDownRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isHovered ? 'text-amber-400 translate-x-0.5 translate-y-0.5' : 'text-stone-600'
                    }`}
                  />
                </div>
                <div>
                  <div className="font-display text-xs sm:text-sm font-bold text-white whitespace-nowrap truncate">
                    {chap.shortNav}
                  </div>
                  <div className="text-[11px] text-stone-400 leading-tight line-clamp-2 mt-0.5">
                    {chap.questionAnswered}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
