'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ARCHITECTURE_CHAPTERS } from '@/lib/ecosystem-engine';

interface TopNavbarProps {
  onNavigateToContact: () => void;
}

export default function TopNavbar({ onNavigateToContact }: TopNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Strict 3-zone Top Bar Contract: 5 concise single-line links in Zone 2
  const desktopNavItems = [
    { label: 'Perfil', href: '#sobre-mi' },
    { label: 'Capacidades', href: '#conocimientos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Soluciones', href: '#soluciones' },
    { label: 'Proyectos', href: '#proyectos' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-stone-950 whitespace-nowrap shrink-0"
        >
          Adrián Dextre
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {desktopNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-stone-950 transition-colors duration-150 whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNavigateToContact}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-950 rounded-lg hover:bg-amber-600 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Solicitar Solución
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 rounded-lg border border-stone-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer: All 9 Logical Chapters */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil completa"
          className="md:hidden bg-[#FAF8F5] border-b border-stone-200 px-6 py-4 space-y-2 max-h-[75vh] overflow-y-auto"
        >
          {ARCHITECTURE_CHAPTERS.map((chap) => (
            <a
              key={chap.id}
              href={`#${chap.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 text-sm font-medium text-stone-800 hover:text-amber-700 border-b border-stone-200/60 last:border-none"
            >
              <span>
                <span className="font-mono text-xs text-amber-700 mr-2">{chap.number}</span>
                {chap.shortNav}
              </span>
              <span className="text-xs text-stone-500">{chap.questionAnswered}</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
