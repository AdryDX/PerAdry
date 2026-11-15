import type {Metadata} from 'next';
import {Outfit, Plus_Jakarta_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adrián Dextre Carranza — Ecosistema Tecnológico y Soluciones Digitales',
  description:
    'Portal profesional, laboratorio interactivo y arquitectura de soluciones multidisciplinarias de Adrián Dextre Carranza: tecnología, análisis, administración, desarrollo web, IoT, IA aplicada y transformación digital.',
  openGraph: {
    title: 'Adrián Dextre Carranza — Ecosistema Tecnológico y Soluciones Digitales',
    description:
      'Portal profesional, laboratorio interactivo y arquitectura de soluciones multidisciplinarias de Adrián Dextre Carranza: tecnología, análisis, administración, desarrollo web, IoT, IA aplicada y transformación digital.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrián Dextre Carranza — Ecosistema Tecnológico y Soluciones Digitales',
    description:
      'Portal profesional, laboratorio interactivo y arquitectura de soluciones multidisciplinarias de Adrián Dextre Carranza: tecnología, análisis, administración, desarrollo web, IoT, IA aplicada y transformación digital.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${jakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#FAF8F5] text-stone-900 antialiased selection:bg-amber-500/20 selection:text-stone-950 font-sans"
      >
        {children}
      </body>
    </html>
  );
}
