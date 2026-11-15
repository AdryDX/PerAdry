'use client';

import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import HeroEcosystem from '@/components/HeroEcosystem';
import ArchitectureCompassBar from '@/components/ArchitectureCompassBar';
import AboutMultidisciplinary from '@/components/AboutMultidisciplinary';
import KnowledgeMatrixSection from '@/components/KnowledgeMatrixSection';
import CapabilitiesAtlas from '@/components/CapabilitiesAtlas';
import DeliverablesSolutionsSection from '@/components/DeliverablesSolutionsSection';
import ProjectsLab from '@/components/ProjectsLab';
import DigitalWorkspace3D from '@/components/DigitalWorkspace3D';
import InteractiveCVAndProcess from '@/components/InteractiveCVAndProcess';
import ProblemSolverWizard from '@/components/ProblemSolverWizard';

function KineticRibbon({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const repeated = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden py-3 border-b select-none ${
        dark
          ? 'bg-stone-950 text-stone-400 border-stone-800'
          : 'bg-stone-900 text-amber-400/90 border-stone-800'
      }`}
    >
      <div className="animate-marquee flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
        {repeated.map((text, idx) => (
          <span key={`${text}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
            <span>{text}</span>
            <span className="text-stone-600">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      <TopNavbar onNavigateToContact={() => scrollToSection('contacto')} />

      <main className="flex-1">
        {/* 01 — INICIO */}
        <HeroEcosystem onSelectSection={scrollToSection} />

        {/* MAPA DE ARQUITECTURA DE INFORMACIÓN EN 9 CAPÍTULOS */}
        <ArchitectureCompassBar onSelectSection={scrollToSection} />

        {/* 02 — SOBRE MÍ Y FILOSOFÍA DE TRABAJO */}
        <AboutMultidisciplinary />

        {/* 03 — CAPACIDADES Y CONOCIMIENTOS (Separado de Servicios) */}
        <KnowledgeMatrixSection />

        <KineticRibbon
          items={[
            'A. Desarrollo Web',
            'B. Soporte Físico y Digital',
            'C. Caos → Sistema Organizado',
            'D. Presencia Digital Empresas',
            'E. Fotografía & Video 360°',
            'F. Entornos Virtuales & 3D',
            'G. IoT, ESP32 & Sensores',
            'H. Tarjetas Inteligentes NFC',
            'I. Importación & Gestión Tecnológica',
          ]}
        />

        {/* 04 — SERVICIOS ORGANIZADOS POR CATEGORÍAS (A–I) */}
        <CapabilitiesAtlas />

        {/* 05 — PRODUCTOS Y SOLUCIONES ENTREGABLES (Servicio vs Producto) */}
        <DeliverablesSolutionsSection />

        <KineticRibbon
          dark
          items={[
            'Portafolio Seleccionado',
            'Demostración En Vivo / Video / Acceso Temporal',
            'PC 64 GB RAM · GPU RX 470 8 GB · NVMe',
            'Cámara 360° Insta360 X5',
            'Prototipado ESP32 & Sensórica',
            'Trabajo Remoto y Coordinación Digital',
          ]}
        />

        {/* 06 — PROYECTOS / PORTAFOLIO (Con Solicitar Demostración) */}
        <ProjectsLab />

        {/* 07 — HERRAMIENTAS, WORKSPACE 3D Y FORMA DE TRABAJO */}
        <DigitalWorkspace3D />

        {/* 08 — CURRÍCULUM Y EXPERIENCIA INTERACTIVA */}
        <InteractiveCVAndProcess />

        {/* 09 — CONTACTO / SOLICITAR UNA SOLUCIÓN */}
        <ProblemSolverWizard />
      </main>
    </div>
  );
}
