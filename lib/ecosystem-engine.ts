export interface ArchitectureChapter {
  number: string;
  id: string;
  shortNav: string;
  title: string;
  questionAnswered: string;
  summary: string;
}

export interface DisciplineNode {
  id: string;
  title: string;
  shortLabel: string;
  pillar: 'Tecnología' | 'Administración' | 'Ingeniería Aplicada' | 'Creatividad Visual';
  summary: string;
  businessValue: string;
  connectedTo: string[];
  tools: string[];
}

export type ProficiencyLevel =
  | 'Utilizo activamente'
  | 'Con experiencia'
  | 'En desarrollo'
  | 'Explorando';

export type KnowledgeRole =
  | 'Conocimiento actual'
  | 'Herramienta de trabajo'
  | 'En exploración';

export interface KnowledgeItem {
  id: string;
  name: string;
  domainId:
    | 'web-dev'
    | 'frameworks-services'
    | 'ui-design'
    | '3d-visual'
    | 'maps-geo'
    | 'hardware-iot'
    | 'artificial-intelligence';
  subGroup?: string;
  level: ProficiencyLevel;
  role: KnowledgeRole;
  practicalUse: string;
}

export interface KnowledgeDomain {
  id:
    | 'web-dev'
    | 'frameworks-services'
    | 'ui-design'
    | '3d-visual'
    | 'maps-geo'
    | 'hardware-iot'
    | 'artificial-intelligence';
  code: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CapabilityCategory {
  id: string;
  index: string;
  letterCode: string;
  title: string;
  subtitle: string;
  coreStatement: string;
  items: string[];
  subSections?: {
    title: string;
    description: string;
    points: string[];
  }[];
  complianceNotice?: string;
  modalities?: string[];
  deliverables: string[];
  interactiveDemoType?:
    | 'organization'
    | 'iot'
    | 'nfc'
    | 'visual'
    | 'support-modes'
    | 'virtual-3d'
    | 'import-advisory';
}

export type DeliverableClassification =
  | 'Producto digital'
  | 'Producto físico'
  | 'Licencia / recurso legítimo'
  | 'Servicio personalizado';

export interface DeliverableSolution {
  id: string;
  title: string;
  classification: DeliverableClassification;
  categoryGroup: 'Productos digitales' | 'Productos tecnológicos' | 'Productos y licencias digitales' | 'Servicios a medida';
  shortDescription: string;
  whatClientReceives: string[];
  typicalFormat: string;
  complianceNote?: string;
}

export interface MessyFileItem {
  id: string;
  rawName: string;
  rawLocation: string;
  sizeKb: number;
  structuredFolder: string;
  structuredName: string;
  category:
    | 'Finanzas y Contabilidad'
    | 'Operaciones y Clientes'
    | 'Activos y Media'
    | 'Sistemas y Backups';
  searchableTags: string;
}

export interface OrganizationSimulationResult {
  totalFiles: number;
  organizedCount: number;
  duplicatesRemoved: number;
  estimatedSearchSecondsBefore: number;
  estimatedSearchSecondsAfter: number;
  efficiencyGainPercent: number;
  groupedFolders: Record<string, MessyFileItem[]>;
}

export interface Esp32TelemetryState {
  temperatureC: number;
  humidityPct: number;
  voltageV: number;
  motionDetected: boolean;
  relayVentilationOn: boolean;
  relayLightingOn: boolean;
  alertLevel: 'Normal' | 'Preventivo' | 'Crítico';
  automatedActionLog: string;
}

export interface ProblemScenario {
  id: string;
  prompt: string;
  category: string;
  rootCauseAnalysis: string;
  proposedSolutionTitle: string;
  proposedSolutionSummary: string;
  relatedCapabilityIds: string[];
  actionSteps: string[];
  estimatedTimeline: string;
  recommendedDeliverables: string[];
}

export interface WorkspaceNode {
  id: string;
  name: string;
  category:
    | 'Cómputo Principal'
    | 'Procesamiento Gráfico e IA'
    | 'Almacenamiento Veloz'
    | 'Hardware e IoT'
    | 'Producción Visual 360°';
  specLabel: string;
  purposeTitle: string;
  whatIUseItFor: string;
  realCapabilities: string[];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organizationOrContext: string;
  category: 'Formación' | 'Experiencia' | 'Especialización' | 'Proyectos Clave';
  description: string;
  disciplines: string[];
  impactHighlight: string;
  isPlaceholderNote?: string;
}

export interface WorkProcessStep {
  number: string;
  verb: string;
  title: string;
  summary: string;
  whatHappensHere: string;
  concreteOutput: string;
}

export interface LabProject {
  id: string;
  code: string;
  title: string;
  shortSummary: string;
  domain: string;
  featured: boolean;
  format:
    | 'terminal'
    | 'iot-dashboard'
    | 'topology-map'
    | 'architecture-diff'
    | 'web-system'
    | 'visual-360';
  problemSolved: string;
  solutionBuilt: string;
  stack: string[];
  metrics: string;
}

export type DemoModality =
  | 'En vivo'
  | 'Mediante video'
  | 'Mediante acceso temporal'
  | 'Mediante presentación';

export const ARCHITECTURE_CHAPTERS: ArchitectureChapter[] = [
  {
    number: '01',
    id: 'inicio',
    shortNav: 'Inicio',
    title: 'Presentación e Impacto Inicial',
    questionAnswered: '¿Quién es y qué resuelve?',
    summary: 'Síntesis visual de identidad, áreas combinadas y valor diferencial.',
  },
  {
    number: '02',
    id: 'sobre-mi',
    shortNav: 'Perfil',
    title: 'Sobre Mí y Filosofía de Trabajo',
    questionAnswered: '¿Quién es y cómo piensa?',
    summary: 'Enfoque multidisciplinario entre computación, administración e ingeniería aplicada.',
  },
  {
    number: '03',
    id: 'conocimientos',
    shortNav: 'Capacidades',
    title: 'Capacidades y Conocimientos Tecnológicos',
    questionAnswered: '¿Qué sabe y qué domina?',
    summary: 'Mapa honesto de tecnologías que utilizo activamente, con experiencia o en exploración.',
  },
  {
    number: '04',
    id: 'servicios',
    shortNav: 'Servicios',
    title: 'Servicios Organizados por Categorías (A–I)',
    questionAnswered: '¿Qué puede hacer por mí?',
    summary: '9 líneas de servicio estructuradas con demostraciones interactivas antes/después.',
  },
  {
    number: '05',
    id: 'soluciones',
    shortNav: 'Soluciones',
    title: 'Productos y Soluciones Entregables',
    questionAnswered: '¿Qué puedo recibir o adquirir?',
    summary: 'Diferenciación clara entre Producto Digital, Producto Físico, Licencias Legítimas y Servicio.',
  },
  {
    number: '06',
    id: 'proyectos',
    shortNav: 'Proyectos',
    title: 'Proyectos y Portafolio Seleccionado',
    questionAnswered: '¿Qué ha creado?',
    summary: 'Trabajos, prototipos y soluciones con opción de solicitar demostración guiada.',
  },
  {
    number: '07',
    id: 'laboratorio',
    shortNav: 'Lab',
    title: 'Herramientas, Workspace 3D y Forma de Trabajo',
    questionAnswered: '¿Con qué trabaja y cómo nos coordinamos?',
    summary: 'PC 64 GB RAM + RX 470 8 GB + NVMe, cámara Insta360 X5, banco ESP32 y disponibilidad.',
  },
  {
    number: '08',
    id: 'cv',
    shortNav: 'CV',
    title: 'Currículum y Experiencia Interactiva',
    questionAnswered: '¿Cuál es su trayectoria?',
    summary: 'Perfil, formación en Administración y Computación, experiencia, conocimientos y descarga de CV.',
  },
  {
    number: '09',
    id: 'contacto',
    shortNav: 'Contacto',
    title: 'Solicitar una Solución o Diagnóstico',
    questionAnswered: '¿Cómo puedo trabajar con él?',
    summary: 'Diagnóstico interactivo por tipo de problema y contacto directo.',
  },
];

export const DISCIPLINE_NODES: DisciplineNode[] = [
  {
    id: 'computacion',
    title: 'Computación e Informática',
    shortLabel: 'Sistemas & Software',
    pillar: 'Tecnología',
    summary:
      'Arquitectura de sistemas, diagnóstico profundo de hardware/software, redes y desarrollo web full-stack.',
    businessValue:
      'Garantiza que la infraestructura funcione con estabilidad, seguridad y velocidad real.',
    connectedTo: ['administracion', 'iot', 'ia', 'organizacion'],
    tools: [
      'Next.js / React',
      'TypeScript',
      'Linux / Windows Admin',
      'Diagnóstico de Sistemas',
      'Redes TCP/IP',
    ],
  },
  {
    id: 'administracion',
    title: 'Administración de Empresas',
    shortLabel: 'Gestión & Procesos',
    pillar: 'Administración',
    summary:
      'Visión organizacional, optimización de recursos, control operativo, rentabilidad y estructuración de flujos de trabajo.',
    businessValue:
      'Evita construir tecnología por moda; cada solución responde a una necesidad operativa o comercial medible.',
    connectedTo: ['computacion', 'organizacion', 'iot', 'visual'],
    tools: [
      'Análisis de Procesos',
      'Estructuración Documental',
      'KPIs Operativos',
      'Gestión de Proyectos',
      'Atención B2B',
    ],
  },
  {
    id: 'iot',
    title: 'IoT, Electrónica y Mecatrónica Aplicada',
    shortLabel: 'ESP32 & Sensores',
    pillar: 'Ingeniería Aplicada',
    summary:
      'Integración del mundo físico con sistemas digitales mediante microcontroladores ESP32, sensores, relés y telemetría.',
    businessValue:
      'Permite monitorear ambientes, automatizar equipos físicos y capturar datos en tiempo real desde cualquier lugar.',
    connectedTo: ['computacion', 'administracion', 'ia'],
    tools: [
      'ESP32 / Arduino',
      'Sensores Ambientales',
      'Control por Relés',
      'Wi-Fi / HTTP / JSON',
      'Prototipado Electrónico',
    ],
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial y Procesamiento Local',
    shortLabel: 'IA Aplicada & Datos',
    pillar: 'Tecnología',
    summary:
      'Ejecución de modelos de IA locales y generativos, procesamiento inteligente de información, imágenes y automatización asistida.',
    businessValue:
      'Acelera tareas repetitivas de clasificación, análisis de texto e imagen manteniendo privacidad y control técnico.',
    connectedTo: ['computacion', 'iot', 'visual'],
    tools: [
      'IA Generativa',
      'Modelos Locales',
      'Procesamiento de Imágenes',
      'Automatización Asistida',
      'GPU Compute 8GB',
    ],
  },
  {
    id: 'organizacion',
    title: 'Organización y Seguridad Digital',
    shortLabel: 'Orden & Respaldo',
    pillar: 'Administración',
    summary:
      'Reingeniería de archivos caóticos, taxonomías de carpetas, copias de seguridad y recuperación técnica de información.',
    businessValue:
      'Transforma el caos digital en un sistema estructurado donde cualquier documento o activo se encuentra en segundos.',
    connectedTo: ['administracion', 'computacion', 'ia'],
    tools: [
      'Taxonomía Digital',
      'Copias de Seguridad',
      'Migración Segura',
      'Recuperación de Archivos',
      'Estandarización',
    ],
  },
  {
    id: 'visual',
    title: 'Fotografía, Video 360° (Insta360 X5) y Entornos 3D',
    shortLabel: 'Imagen, 360° & 3D',
    pillar: 'Creatividad Visual',
    summary:
      'Producción visual, revelado digital, recorridos virtuales con Insta360 X5, Gaussian Splatting y tarjetas inteligentes NFC.',
    businessValue:
      'Comunica profesionalismo inmediato y conecta el espacio físico del negocio con experiencias digitales inmersivas.',
    connectedTo: ['administracion', 'ia', 'computacion'],
    tools: [
      'Insta360 X5',
      'Fotografía & Video 360°',
      'Gaussian Splatting / 3D',
      'Edición & Color',
      'Tecnología NFC',
    ],
  },
];

export const KNOWLEDGE_DOMAINS: KnowledgeDomain[] = [
  {
    id: 'web-dev',
    code: '01 · DESARROLLO WEB',
    title: 'Desarrollo Web y Arquitectura de Aplicaciones',
    subtitle: 'Estándares modernos de la web, rendimiento, SEO técnico y aplicaciones adaptables',
    description:
      'Base sólida en el ecosistema web actual, desde el marcado semántico y estilos avanzados hasta el consumo de APIs REST, control de versiones y optimización de velocidad.',
  },
  {
    id: 'frameworks-services',
    code: '02 · FRAMEWORKS Y SERVICIOS',
    title: 'Frameworks Frontend, Backend y Servicios Cloud',
    subtitle: 'Herramientas modernas separadas por capa de interfaz y capa de servicios',
    description:
      'Selección estructurada de frameworks de producción para construir interfaces reactivas, servidores ligeros, APIs y funciones en el borde (Edge).',
  },
  {
    id: 'ui-design',
    code: '03 · UI, DISEÑO Y ANIMACIÓN',
    title: 'Sistemas de Interfaz, Microinteracciones y Movimiento',
    subtitle: 'Diseño orientado a experiencia de usuario, fluidez visual y componentes accesibles',
    description:
      'Combinación de utilidades CSS modernas, bibliotecas de componentes accesibles y motores de animación física y coreografiada.',
  },
  {
    id: '3d-visual',
    code: '04 · 3D Y EXPERIENCIAS VISUALES',
    title: 'Entornos 3D Web, Escenas Interactivas y Reconstrucción Espacial',
    subtitle: 'Visualización tridimensional en navegador y captura volumétrica moderna',
    description:
      'Tecnologías para integrar objetos 3D interactivos, escenas WebGL y reconstrucciones espaciales como Gaussian Splatting de forma comprensible y optimizada.',
  },
  {
    id: 'maps-geo',
    code: '05 · MAPAS Y GEOLOCALIZACIÓN',
    title: 'Cartografía Digital, Rutas GPX y Visualización Geoespacial',
    subtitle: 'Mapas interactivos, trazado de recorridos y ubicación de nodos o negocios',
    description:
      'Implementación de mapas abiertos, procesamiento de trazas GPX y representación visual de rutas o cobertura territorial.',
  },
  {
    id: 'hardware-iot',
    code: '06 · HARDWARE E IOT',
    title: 'Microcontroladores ESP32, Sensórica y Dispositivos Conectados',
    subtitle: 'Electrónica aplicada y comunicación entre el entorno físico y paneles web',
    description:
      'Integración de microcontroladores con conectividad Wi-Fi, lectura de sensores ambientales, activación por relés y prototipado de soluciones IoT.',
  },
  {
    id: 'artificial-intelligence',
    code: '07 · INTELIGENCIA ARTIFICIAL',
    title: 'IA Generativa, Modelos Locales y Automatización Asistida',
    subtitle: 'Aplicación práctica de IA en flujos de trabajo, texto, código e imagen',
    description:
      'Uso estratégico de inteligencia artificial tanto en nube como ejecutada localmente en estación de trabajo propia (64 GB RAM + GPU 8 GB) para privacidad y eficiencia.',
  },
];

export const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  // 1. DESARROLLO WEB
  {
    id: 'kw-html5',
    name: 'HTML5 Semántico & Accesibilidad',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Estructuración limpia de portales, formularios accesibles y SEO on-page.',
  },
  {
    id: 'kw-css3',
    name: 'CSS3 Moderno (Grid, Flexbox, Variables, Animaciones)',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Maquetación adaptable de alta precisión para escritorio y dispositivos móviles.',
  },
  {
    id: 'kw-js',
    name: 'JavaScript (ES6+)',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Lógica interactiva en cliente, manipulación del DOM e integración de eventos.',
  },
  {
    id: 'kw-ts',
    name: 'TypeScript',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Desarrollo robusto con tipado estático para prevenir errores en sistemas web.',
  },
  {
    id: 'kw-react',
    name: 'React',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Creación de interfaces modulares, simuladores interactivos y paneles dinámicos.',
  },
  {
    id: 'kw-nextjs',
    name: 'Next.js (App Router)',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Arquitectura full-stack para portales rápidos, rutas API y optimización SEO.',
  },
  {
    id: 'kw-nodejs',
    name: 'Node.js',
    domainId: 'web-dev',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Ejecución de scripts de automatización, servidores y procesamiento de archivos.',
  },
  {
    id: 'kw-apis-rest',
    name: 'APIs & Arquitectura REST',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Comunicación de datos entre interfaces web, servicios externos y nodos IoT.',
  },
  {
    id: 'kw-git-github',
    name: 'Git & GitHub',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Control de versiones, respaldo de código y flujo de despliegue ordenado.',
  },
  {
    id: 'kw-responsive',
    name: 'Desarrollo Responsive (Mobile & Desktop First)',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Adaptación ergonómica de controles táctiles en móvil y vistas expandidas en PC.',
  },
  {
    id: 'kw-pwa',
    name: 'Progressive Web Apps (PWA)',
    domainId: 'web-dev',
    level: 'Con experiencia',
    role: 'Conocimiento actual',
    practicalUse: 'Configuración de aplicaciones web instalables en dispositivos móviles cuando el proyecto lo requiere.',
  },
  {
    id: 'kw-seo-opt',
    name: 'SEO Técnico Básico & Optimización Web',
    domainId: 'web-dev',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Metadatos estructurados, tiempos de carga rápidos y compresión de activos visuales.',
  },

  // 2. FRAMEWORKS Y TECNOLOGÍAS
  {
    id: 'kf-react-fe',
    name: 'React (Frontend)',
    domainId: 'frameworks-services',
    subGroup: 'Frontend',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Biblioteca central para componentes interactivos y gestión de estado.',
  },
  {
    id: 'kf-nextjs-fe',
    name: 'Next.js (Frontend / Full-Stack)',
    domainId: 'frameworks-services',
    subGroup: 'Frontend',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Framework principal para sitios empresariales, portafolios avanzados y portales.',
  },
  {
    id: 'kf-vite',
    name: 'Vite (Frontend)',
    domainId: 'frameworks-services',
    subGroup: 'Frontend',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Entorno ágil para aplicaciones SPA ligeras, herramientas internas y prototipos.',
  },
  {
    id: 'kf-tailwind-fe',
    name: 'Tailwind CSS (Frontend)',
    domainId: 'frameworks-services',
    subGroup: 'Frontend',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Estilizado consistente, sistemas de diseño a medida y alto rendimiento CSS.',
  },
  {
    id: 'kf-node-be',
    name: 'Node.js (Backend / Servicios)',
    domainId: 'frameworks-services',
    subGroup: 'Backend / Servicios',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Entorno de servidor para automatizaciones, lectura de datos y servicios locales.',
  },
  {
    id: 'kf-express',
    name: 'Express (Backend / Servicios)',
    domainId: 'frameworks-services',
    subGroup: 'Backend / Servicios',
    level: 'Con experiencia',
    role: 'Conocimiento actual',
    practicalUse: 'Creación de endpoints REST ligeros y pasarelas de recepción para sensores ESP32.',
  },
  {
    id: 'kf-rest-be',
    name: 'APIs REST (Integración de Servicios)',
    domainId: 'frameworks-services',
    subGroup: 'Backend / Servicios',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Integración de formularios, notificaciones y servicios de terceros.',
  },
  {
    id: 'kf-cloudflare',
    name: 'Cloudflare Workers (Serverless / Edge)',
    domainId: 'frameworks-services',
    subGroup: 'Backend / Servicios',
    level: 'En desarrollo',
    role: 'En exploración',
    practicalUse: 'Despliegue de funciones rápidas en el borde y enrutamiento ligero.',
  },

  // 3. UI Y DISEÑO
  {
    id: 'ku-tailwind',
    name: 'Tailwind CSS',
    domainId: 'ui-design',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Construcción de layouts editoriales, grillas asimétricas y temas personalizados.',
  },
  {
    id: 'ku-framer',
    name: 'Framer Motion (Motion)',
    domainId: 'ui-design',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Transiciones de estado, animaciones de entrada y microinteracciones fluidas.',
  },
  {
    id: 'ku-gsap',
    name: 'GSAP (GreenSock Animation Platform)',
    domainId: 'ui-design',
    level: 'En desarrollo',
    role: 'En exploración',
    practicalUse: 'Coreografías de scroll storytelling y líneas de tiempo de animación avanzadas.',
  },
  {
    id: 'ku-lucide',
    name: 'Lucide Icons',
    domainId: 'ui-design',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Iconografía vectorial limpia y consistente para controles interactivos.',
  },
  {
    id: 'ku-shadcn',
    name: 'shadcn/ui & Primitivas Accesibles',
    domainId: 'ui-design',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Componentes de interfaz accesibles por teclado y lectores de pantalla.',
  },

  // 4. 3D Y EXPERIENCIAS VISUALES
  {
    id: 'k3d-threejs',
    name: 'Three.js',
    domainId: '3d-visual',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Escenas 3D interactivas en navegador, cámaras orbitales e iluminación en tiempo real.',
  },
  {
    id: 'k3d-r3f',
    name: 'React Three Fiber',
    domainId: '3d-visual',
    level: 'En desarrollo',
    role: 'Conocimiento actual',
    practicalUse: 'Integración declarativa de escenas Three.js dentro del ecosistema React.',
  },
  {
    id: 'k3d-spline',
    name: 'Spline',
    domainId: '3d-visual',
    level: 'Explorando',
    role: 'En exploración',
    practicalUse: 'Prototipado rápido de objetos 3D interactivos para cabeceras y presentaciones web.',
  },
  {
    id: 'k3d-gsplat',
    name: 'Gaussian Splatting (Reconstrucción 3D)',
    domainId: '3d-visual',
    level: 'Explorando',
    role: 'En exploración',
    practicalUse: 'Digitalización fotorrealista de espacios y objetos reales a partir de captura visual.',
  },
  {
    id: 'k3d-web-spaces',
    name: 'Entornos 3D Web & Visores 360°',
    domainId: '3d-visual',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Recorridos virtuales interactivos y presentación espacial para negocios.',
  },

  // 5. MAPAS Y GEOLOCALIZACIÓN
  {
    id: 'kmap-osm',
    name: 'OpenStreetMap',
    domainId: 'maps-geo',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Integración de cartografía abierta para ubicar sedes comerciales y cobertura.',
  },
  {
    id: 'kmap-maplibre',
    name: 'MapLibre GL',
    domainId: 'maps-geo',
    level: 'En desarrollo',
    role: 'En exploración',
    practicalUse: 'Renderizado vectorial fluido de mapas personalizados en aplicaciones web.',
  },
  {
    id: 'kmap-gpx',
    name: 'Procesamiento de Archivos GPX',
    domainId: 'maps-geo',
    level: 'Con experiencia',
    role: 'Conocimiento actual',
    practicalUse: 'Lectura y estructuración de coordenadas, altimetría y trazas de recorridos.',
  },
  {
    id: 'kmap-routes',
    name: 'Visualización de Rutas y Nodos',
    domainId: 'maps-geo',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Representación clara de puntos de atención, recorridos y topologías locales.',
  },

  // 6. HARDWARE E IOT
  {
    id: 'kiot-esp32',
    name: 'Microcontroladores ESP32',
    domainId: 'hardware-iot',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Desarrollo de nodos conectados por Wi-Fi/BLE para lectura y control físico.',
  },
  {
    id: 'kiot-sensors',
    name: 'Sensores (Temperatura, Humedad, Presencia, Energía)',
    domainId: 'hardware-iot',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Captura de variables del mundo real para alertas preventivas y telemetría.',
  },
  {
    id: 'kiot-automation',
    name: 'Automatización por Relés y Actuadores',
    domainId: 'hardware-iot',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Encendido/apagado automático o remoto de ventilación, iluminación o equipos.',
  },
  {
    id: 'kiot-wifi-net',
    name: 'Conectividad Wi-Fi & Redes Locales IoT',
    domainId: 'hardware-iot',
    level: 'Utilizo activamente',
    role: 'Conocimiento actual',
    practicalUse: 'Enlace estable de dispositivos conectados dentro de redes domésticas o comerciales.',
  },
  {
    id: 'kiot-connected',
    name: 'Dispositivos Conectados & Etiquetas NFC',
    domainId: 'hardware-iot',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Configuración de tarjetas inteligentes NFC y puentes entre objetos físicos y web.',
  },

  // 7. INTELIGENCIA ARTIFICIAL
  {
    id: 'kai-generative',
    name: 'IA Generativa Aplicada a Flujos de Trabajo',
    domainId: 'artificial-intelligence',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Estructuración de información, redacción técnica asistida y aceleración de desarrollo.',
  },
  {
    id: 'kai-local',
    name: 'Modelos Locales (Ejecución en Hardware Propio)',
    domainId: 'artificial-intelligence',
    level: 'Con experiencia',
    role: 'Herramienta de trabajo',
    practicalUse: 'Pruebas e inferencia local aprovechando 64 GB RAM y GPU de 8 GB con privacidad total.',
  },
  {
    id: 'kai-automation',
    name: 'Automatización Asistida por IA',
    domainId: 'artificial-intelligence',
    level: 'Con experiencia',
    role: 'Conocimiento actual',
    practicalUse: 'Clasificación inteligente de documentos, extracción de datos y organización digital.',
  },
  {
    id: 'kai-image-proc',
    name: 'Procesamiento y Mejora de Imágenes con IA',
    domainId: 'artificial-intelligence',
    level: 'Utilizo activamente',
    role: 'Herramienta de trabajo',
    practicalUse: 'Optimización de nitidez, limpieza visual y preparación de activos para portales web.',
  },
  {
    id: 'kai-experimentation',
    name: 'Experimentación con Nuevas Herramientas de IA',
    domainId: 'artificial-intelligence',
    level: 'Explorando',
    role: 'En exploración',
    practicalUse: 'Evaluación constante de nuevos modelos multimodales, audio, visión y agentes.',
  },
];

export const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  {
    id: 'desarrollo-web',
    index: '01',
    letterCode: 'A',
    title: 'Desarrollo y Soluciones Digitales',
    subtitle: 'Páginas web, landing pages, portafolios, sistemas a medida y automatización de procesos',
    coreStatement:
      'No vendo únicamente páginas web estáticas. Analizo la necesidad real de tu negocio o actividad y construyo la herramienta digital exacta para resolverla.',
    items: [
      'Desarrollo de páginas web profesionales y modernas',
      'Landing pages orientadas a explicar y convertir con claridad',
      'Portafolios digitales interactivos para profesionales y creativos',
      'Páginas empresariales con arquitectura de información sólida',
      'Sistemas o herramientas web personalizadas según necesidad',
      'Automatización de procesos operativos y administrativos',
      'Integración de herramientas, formularios inteligentes y paneles',
    ],
    deliverables: [
      'Sitio o sistema web responsive listo para producción',
      'Arquitectura optimizada para velocidad y dispositivos móviles',
      'Integración directa con tus canales de atención',
    ],
  },
  {
    id: 'soporte-sistemas',
    index: '02',
    letterCode: 'B',
    title: 'Soporte y Servicios Informáticos',
    subtitle: 'Diagnóstico técnico, mantenimiento físico y optimización digital para PC y laptops',
    coreStatement:
      'Separo claramente la intervención física del hardware de la optimización lógica del sistema para devolver estabilidad, orden y velocidad a tus equipos.',
    items: [
      'Mantenimiento técnico preventivo y correctivo de PC y laptops',
      'Diagnóstico preciso de problemas de lentitud, temperatura o arranque',
      'Optimización integral del sistema operativo y recursos',
      'Configuración inicial y puesta a punto de equipos nuevos o existentes',
      'Instalación y configuración de software legítimo y herramientas de trabajo',
      'Migración segura de información entre unidades o computadoras',
    ],
    subSections: [
      {
        title: '1. Mantenimiento Físico (Hardware)',
        description:
          'Atención directa sobre los componentes físicos cuando el equipo presenta sobrecalentamiento, polvo acumulado o requiere actualización.',
        points: [
          'Limpieza interna cuidadosa de ventiladores, disipadores y chasis',
          'Revisión térmica y evaluación física de componentes (RAM, unidades SSD/NVMe, fuentes)',
          'Mantenimiento técnico preventivo para extender la vida útil del equipo',
        ],
      },
      {
        title: '2. Optimización Digital (Software y Sistema)',
        description:
          'Intervención lógica para que el sistema operativo, los programas y el almacenamiento trabajen sin cuellos de botella.',
        points: [
          'Optimización de arranque, servicios en segundo plano y estabilidad del sistema operativo',
          'Instalación y configuración limpia de programas y suites de trabajo',
          'Gestión de almacenamiento, particiones, migración de datos y orden digital',
        ],
      },
    ],
    modalities: [
      'Atención por equipo individual',
      'Para hogares y profesionales',
      'Para pequeños negocios y oficinas',
      'Soporte puntual o seguimiento periódico',
    ],
    deliverables: [
      'Equipo diagnosticado, limpio y optimizado',
      'Información migrada o respaldada con seguridad',
      'Recomendaciones claras de cuidado y actualización',
    ],
    interactiveDemoType: 'support-modes',
  },
  {
    id: 'organizacion-digital',
    index: '03',
    letterCode: 'C',
    title: 'Organización y Seguridad Digital',
    subtitle: 'Transformación del caos de archivos en un sistema estructurado, respaldado y seguro',
    coreStatement:
      'Combino criterio administrativo e informático para convertir carpetas desordenadas en una estructura clara, con copias de seguridad para evitar futuras pérdidas de información.',
    items: [
      'Organización integral de archivos dispersos en PC, discos externos o nube',
      'Clasificación de información por áreas (administrativa, contable, comercial, personal)',
      'Estructuración jerárquica de carpetas con nombres claros y predecibles',
      'Configuración e implementación de copias de seguridad (Backups)',
      'Migración ordenada de información hacia nuevas estructuras o dispositivos',
      'Recuperación de archivos eliminados cuando sea técnicamente posible',
      'Limpieza digital de archivos duplicados, temporales o innecesarios',
      'Propuestas prácticas para evitar futuras pérdidas de información',
    ],
    deliverables: [
      'Sistema de carpetas organizado (Antes → Después verificable)',
      'Esquema de copias de seguridad configurado',
      'Guía breve para mantener el orden digital sin esfuerzo',
    ],
    interactiveDemoType: 'organization',
  },
  {
    id: 'presencia-digital',
    index: '04',
    letterCode: 'D',
    title: 'Presencia Digital para Empresas',
    subtitle: 'Ayudar a que un negocio sea más fácil de encontrar, comprender y contactar',
    coreStatement:
      '«Ayudar a que un negocio sea más fácil de encontrar, comprender y contactar.» Unifico tus canales digitales para que tus clientes te ubiquen rápido y confíen en tu propuesta.',
    items: [
      'Creación de páginas web comerciales claras y orientadas al cliente',
      'Estructuración de presencia digital coherente para negocios y profesionales',
      'Configuración y optimización de perfiles empresariales digitales',
      'Configuración de ubicación y ficha en Google Maps / Google Business Profile cuando corresponda',
      'Implementación y organización de WhatsApp Business (catálogo, respuestas y enlaces)',
      'Estructuración de información digital para clientes (horarios, servicios, precios, preguntas frecuentes)',
      'Estrategias básicas de presencia online e integración de canales digitales',
    ],
    deliverables: [
      'Ecosistema de presencia online conectado (Web + Mapa + Contacto)',
      'Canales de atención digital listos para recibir consultas',
      'Presentación clara de servicios y catálogo comercial',
    ],
  },
  {
    id: 'fotografia-video-360',
    index: '05',
    letterCode: 'E',
    title: 'Fotografía, Video y Contenido Visual',
    subtitle: 'Captura visual, edición profesional, fotografía/video 360° y recorridos virtuales',
    coreStatement:
      'Una buena imagen explica en un segundo lo que un texto tarda minutos. Produzco y edito contenido visual real, incluyendo captura inmersiva 360° con Insta360 X5.',
    items: [
      'Fotografía para negocios, espacios comerciales, productos y proyectos',
      'Producción de video informativo, demostrativo y comercial',
      'Edición fotográfica profesional (corrección de color, exposición, encuadre y nitidez)',
      'Edición de video dinámica adaptada a sitios web y plataformas digitales',
      'Creación de contenido visual estratégico para negocios',
      'Fotografía y video 360° en alta resolución (Insta360 X5)',
      'Desarrollo e integración de recorridos virtuales interactivos',
    ],
    deliverables: [
      'Paquete de fotografías y videos editados (Antes → Después)',
      'Recorrido virtual 360° listo para explorar en web o móvil',
      'Activos visuales optimizados para carga rápida',
    ],
    interactiveDemoType: 'visual',
  },
  {
    id: 'entornos-virtuales-3d',
    index: '06',
    letterCode: 'F',
    title: 'Entornos Virtuales y 3D',
    subtitle: 'Procesamiento 3D, Gaussian Splatting y visualización interactiva explicada con sencillez',
    coreStatement:
      'Llevo espacios y objetos reales a la pantalla mediante reconstrucción 3D moderna y visores interactivos, para que tus clientes exploren un lugar o producto como si estuvieran allí.',
    items: [
      'Procesamiento y reconstrucción 3D a partir de captura visual',
      'Exploración e implementación de Gaussian Splatting para espacios fotorrealistas',
      'Visualización interactiva de espacios comerciales, talleres o inmuebles',
      'Creación de entornos virtuales navegables desde el navegador web',
      'Recorridos digitales inmersivos con puntos de información interactivos',
      'Experiencias visuales 3D optimizadas para rendimiento real',
    ],
    deliverables: [
      'Visor 3D o entorno virtual interactivo integrable en web',
      'Representación espacial clara para clientes no técnicos',
      'Guía de navegación y presentación del entorno',
    ],
    interactiveDemoType: 'virtual-3d',
  },
  {
    id: 'iot-electronica',
    index: '07',
    letterCode: 'G',
    title: 'IoT, Electrónica y Mecatrónica',
    subtitle: 'ESP32, sensores, automatización, dispositivos conectados y prototipos personalizados',
    coreStatement:
      'Diseño sistemas que conectan el mundo físico con el digital: sensores que miden variables reales, microcontroladores ESP32 que procesan la señal y paneles web que permiten actuar a tiempo.',
    items: [
      'Desarrollo de soluciones y nodos con microcontroladores ESP32',
      'Automatización de equipos, iluminación, ventilación o alertas físicas',
      'Integración de sensores (temperatura, humedad, presencia, apertura, consumo)',
      'Configuración de dispositivos conectados por Wi-Fi a paneles de control',
      'Construcción de prototipos electrónicos funcionales a medida',
      'Sistemas personalizados de monitoreo y soluciones IoT prácticas',
    ],
    deliverables: [
      'Prototipo o nodo IoT ESP32 configurado y probado',
      'Flujo completo: Sensor → ESP32 → Panel Web / Alerta',
      'Documentación de conexión y operación',
    ],
    interactiveDemoType: 'iot',
  },
  {
    id: 'nfc-negocios',
    index: '08',
    letterCode: 'H',
    title: 'NFC para Negocios y Personas',
    subtitle: 'Tarjetas inteligentes, etiquetas NFC, menús digitales y acceso instantáneo con un toque',
    coreStatement:
      'Convierto el contacto presencial en una experiencia digital inmediata: basta acercar el celular a una tarjeta o etiqueta NFC para abrir tu perfil, catálogo, menú o WhatsApp.',
    items: [
      'Tarjetas NFC personalizadas para profesionales y empresas',
      'Etiquetas NFC programadas para mostradores, mesas, vitrinas o equipos',
      'Tarjetas de presentación inteligentes con ficha de contacto descargable (vCard)',
      'Acceso rápido a información comercial, portafolios o formularios',
      'Menús digitales y catálogos interactivos activados por acercamiento',
      'Configuración personalizada y vinculación con páginas web a medida',
    ],
    deliverables: [
      'Tarjetas o etiquetas NFC listas para usar',
      'Página o perfil digital de destino optimizado para móvil',
      'Flexibilidad para actualizar la información sin cambiar la tarjeta física',
    ],
    interactiveDemoType: 'nfc',
  },
  {
    id: 'importacion-gestion-tec',
    index: '09',
    letterCode: 'I',
    title: 'Servicios de Importación y Gestión Tecnológica',
    subtitle: 'Búsqueda técnica, evaluación de especificaciones, compatibilidad y gestión de compras tecnológicas',
    coreStatement:
      'Te asesoro técnicamente antes de adquirir equipamiento o componentes en el país o el exterior, evaluando especificaciones reales, compatibilidad y requisitos normativos.',
    items: [
      'Búsqueda especializada de productos, componentes y herramientas tecnológicas',
      'Evaluación objetiva de especificaciones técnicas (rendimiento real vs marketing)',
      'Orientación detallada sobre compatibilidad entre piezas, periféricos y sistemas',
      'Evaluación técnica previa a una compra para hogares, profesionales o empresas',
      'Gestión y coordinación de importación de productos tecnológicos cuando corresponda',
    ],
    complianceNotice:
      'Nota de transparencia y cumplimiento: Todas las gestiones de búsqueda, adquisición e importación se realizan respetando estrictamente la normativa aduanera, tributaria y de telecomunicaciones vigente (como permisos u homologaciones cuando la ley lo exige). No se ofrecen ni garantizan trámites al margen de los requisitos legales aplicables.',
    deliverables: [
      'Informe comparativo de especificaciones y compatibilidad técnica',
      'Recomendación de compra ajustada a presupuesto y necesidad real',
      'Seguimiento transparente del proceso de adquisición o importación legal',
    ],
    interactiveDemoType: 'import-advisory',
  },
];

export const DELIVERABLE_SOLUTIONS: DeliverableSolution[] = [
  // Productos digitales
  {
    id: 'deliv-web-complete',
    title: 'Páginas Web Terminadas y Portales Empresariales',
    classification: 'Producto digital',
    categoryGroup: 'Productos digitales',
    shortDescription:
      'Sitio web completo, moderno y adaptable a celulares y computadoras, entregado listo para operar y representar a tu negocio.',
    whatClientReceives: [
      'Portal web desplegado y optimizado en velocidad',
      'Secciones estructuradas de servicios, catálogo y contacto directo',
      'Guía de uso y administración básica',
    ],
    typicalFormat: 'Entrega web en producción + código/configuración documentada',
  },
  {
    id: 'deliv-landing-portfolio',
    title: 'Landing Pages y Portafolios Digitales Interactivos',
    classification: 'Producto digital',
    categoryGroup: 'Productos digitales',
    shortDescription:
      'Página de aterrizaje enfocada en un producto/servicio específico o portafolio profesional de alto impacto visual.',
    whatClientReceives: [
      'Interfaz interactiva con animaciones fluidas y diseño a medida',
      'Integración con WhatsApp, formulario de solicitud o agenda',
      'SEO técnico base configurado',
    ],
    typicalFormat: 'Aplicación web lista para compartir por enlace o tarjeta NFC',
  },
  {
    id: 'deliv-custom-tools',
    title: 'Herramientas Digitales Personalizadas y Configuraciones',
    classification: 'Producto digital',
    categoryGroup: 'Productos digitales',
    shortDescription:
      'Calculadoras operativas, paneles de control internos, estructuras de carpetas estandarizadas y recursos digitales autorizados.',
    whatClientReceives: [
      'Herramienta o plantilla funcional adaptada al flujo del cliente',
      'Estructura documental o configuración lista para usar',
      'Documentación clara paso a paso',
    ],
    typicalFormat: 'Aplicación web interna / Paquete de configuración digital',
  },

  // Productos tecnológicos (físicos / hardware configurado)
  {
    id: 'deliv-iot-esp32',
    title: 'Dispositivos IoT Personalizados y Soluciones con ESP32',
    classification: 'Producto físico',
    categoryGroup: 'Productos tecnológicos',
    shortDescription:
      'Módulos y prototipos electrónicos basados en ESP32 con sensores integrados para monitoreo ambiental, alertas o automatización.',
    whatClientReceives: [
      'Dispositivo o prototipo ESP32 programado y probado en laboratorio',
      'Sensores conectados y calibrados según el caso de uso',
      'Interfaz web de lectura o control en tiempo real',
    ],
    typicalFormat: 'Hardware configurado + Panel de visualización',
  },
  {
    id: 'deliv-nfc-cards',
    title: 'Tarjetas y Etiquetas NFC Configuradas según Necesidad',
    classification: 'Producto físico',
    categoryGroup: 'Productos tecnológicos',
    shortDescription:
      'Tarjetas de presentación inteligentes y tags NFC codificados para abrir tu catálogo, menú digital, perfil profesional o contacto con un toque.',
    whatClientReceives: [
      'Tarjeta o lote de etiquetas NFC grabadas y verificadas',
      'Enlace conectado a tu portal web, vCard o WhatsApp Business',
      'Configuración lista para usar en Android y iPhone compatibles',
    ],
    typicalFormat: 'Tarjeta/Etiqueta física NFC + Perfil digital vinculado',
  },

  // Productos y licencias digitales legítimas
  {
    id: 'deliv-legit-licenses',
    title: 'Productos, Recursos y Licencias Digitales Legítimas',
    classification: 'Licencia / recurso legítimo',
    categoryGroup: 'Productos y licencias digitales',
    shortDescription:
      'Suministro y configuración únicamente de software, licencias, claves o recursos digitales obtenidos y comercializados por canales legítimos y autorizados.',
    whatClientReceives: [
      'Licencia o producto digital 100% original y verificable',
      'Acompañamiento en la instalación y activación oficial en tu equipo',
      'Seguridad informática sin riesgos de software alterado',
    ],
    typicalFormat: 'Clave / Suscripción oficial + Instalación técnica opcional',
    complianceNote:
      'Política estricta: Solo se gestionan y configuran licencias o recursos digitales adquiridos de manera legítima y autorizada.',
  },

  // Servicio personalizado (contraste claro)
  {
    id: 'deliv-custom-service',
    title: 'Servicio de Consultoría, Soporte, Reorganización o Producción 360°',
    classification: 'Servicio personalizado',
    categoryGroup: 'Servicios a medida',
    shortDescription:
      'Cuando no necesitas comprar un objeto estándar, sino que analice tu caso, optimice tus equipos, organice tus archivos o produzca un recorrido 360°.',
    whatClientReceives: [
      'Diagnóstico previo y plan de trabajo transparente',
      'Ejecución profesional (remota o coordinada según el servicio)',
      'Informe de resultados y seguimiento post-atención',
    ],
    typicalFormat: 'Trabajo profesional por proyecto o sesión acordada',
  },
];

export const INITIAL_MESSY_FILES: MessyFileItem[] = [
  {
    id: 'f1',
    rawName: 'factura_final_v2_copia(1).pdf',
    rawLocation: 'Escritorio / Descargas',
    sizeKb: 420,
    structuredFolder: '01_Finanzas_Tributario / 2026_Comprobantes',
    structuredName: '2026-03_FAC-00412_Proveedor-Sistemas.pdf',
    category: 'Finanzas y Contabilidad',
    searchableTags: 'Factura · Marzo 2026 · Contabilidad',
  },
  {
    id: 'f2',
    rawName: 'WhatsApp Image 2026-02-14 at 18.32.10.jpeg',
    rawLocation: 'Descargas / Sin clasificar',
    sizeKb: 1850,
    structuredFolder: '03_Activos_Comerciales / Catalogo_Productos',
    structuredName: 'PROD-018_Modulo-Control-ESP32_Vista-Frontal.jpg',
    category: 'Activos y Media',
    searchableTags: 'Producto · Fotografía · Catálogo',
  },
  {
    id: 'f3',
    rawName: 'Nuevo hoja de cálculo de Microsoft Excel (3).xlsx',
    rawLocation: 'Escritorio / Carpeta nueva (2)',
    sizeKb: 940,
    structuredFolder: '02_Operaciones_Clientes / Inventario_General',
    structuredName: '2026-Q1_Control-Stock-Equipos-Y-Repuestos.xlsx',
    category: 'Operaciones y Clientes',
    searchableTags: 'Inventario · Operaciones · 2026',
  },
  {
    id: 'f4',
    rawName: 'cotizacion_cliente_urgente_corregida_SI.docx',
    rawLocation: 'Documentos / Varios',
    sizeKb: 310,
    structuredFolder: '02_Operaciones_Clientes / Propuestas_Comerciales',
    structuredName: '2026-03_PROP-089_Implementacion-Red-Oficina.docx',
    category: 'Operaciones y Clientes',
    searchableTags: 'Propuesta · Cliente · Redes',
  },
  {
    id: 'f5',
    rawName: 'backup_bd_antiguo_no_borrar_creo.zip',
    rawLocation: 'Disco C: / temp',
    sizeKb: 14200,
    structuredFolder: '04_Sistemas_Respaldos / Snapshots_Verificados',
    structuredName: '2026-03-01_BKP-Sistema-Gestion_SHA256-OK.zip',
    category: 'Sistemas y Backups',
    searchableTags: 'Respaldo · Integridad · Sistemas',
  },
  {
    id: 'f6',
    rawName: 'IMG_9921_recorrido_local_bruto.mp4',
    rawLocation: 'Tarjeta SD / DCIM',
    sizeKb: 28400,
    structuredFolder: '03_Activos_Comerciales / Recorridos_360',
    structuredName: '2026-03_TOUR360_Showroom-Principal_Master4K.mp4',
    category: 'Activos y Media',
    searchableTags: 'Video 360° · Showroom · Master',
  },
];

export const PROBLEM_SCENARIOS: ProblemScenario[] = [
  {
    id: 'presencia-negocio',
    prompt: 'Mi negocio necesita presencia digital',
    category: 'Crecimiento Comercial & Digitalización',
    rootCauseAnalysis:
      'Muchos negocios ofrecen un excelente servicio físico pero carecen de una estructura digital clara que permita encontrarlos en Google Maps, comprender su propuesta y contactarlos por WhatsApp o web sin fricciones.',
    proposedSolutionTitle: 'Ecosistema de Presencia Digital + Identidad Visual + Contacto Directo',
    proposedSolutionSummary:
      'Diseño una plataforma web clara y rápida, acompañada de configuración de perfiles comerciales, fotografía o recorrido 360° (Insta360 X5) y tarjetas NFC adaptadas al negocio.',
    relatedCapabilityIds: [
      'presencia-digital',
      'desarrollo-web',
      'fotografia-video-360',
      'nfc-negocios',
    ],
    actionSteps: [
      'Diagnóstico comercial de qué busca realmente tu cliente al encontrarte en internet.',
      'Estructuración de arquitectura web, ficha de negocio y canales de WhatsApp Business.',
      'Captura o edición visual (fotografía Antes/Después, video o recorrido virtual 360°).',
      'Lanzamiento del portal optimizado para móviles y buscadores.',
    ],
    estimatedTimeline: '2 a 4 semanas según alcance',
    recommendedDeliverables: [
      'Sitio web comercial completo y adaptable a móvil',
      'Canales digitales y mapas configurados',
      'Tarjetas o puntos NFC para atención presencial',
    ],
  },
  {
    id: 'necesito-web',
    prompt: 'Necesito una página web o portafolio',
    category: 'Desarrollo Web & Sistemas',
    rootCauseAnalysis:
      'Una página web efectiva no es una plantilla decorativa: debe explicar qué haces, mostrar tus proyectos o productos con claridad y convertir visitas en contactos reales.',
    proposedSolutionTitle: 'Desarrollo Web a Medida (Landing Page, Sitio Empresarial o Sistema)',
    proposedSolutionSummary:
      'Construyo desde landing pages y portafolios interactivos hasta portales empresariales o herramientas personalizadas con React, Next.js y Tailwind CSS.',
    relatedCapabilityIds: ['desarrollo-web', 'presencia-digital'],
    actionSteps: [
      'Definición del objetivo central (informativo, portafolio, captación o herramienta interna).',
      'Diseño de interfaz moderna y jerarquía de información clara.',
      'Programación con tecnologías actuales (Next.js / React / TypeScript) y SEO técnico.',
      'Pruebas en computadoras y móviles reales antes de la entrega.',
    ],
    estimatedTimeline: '1 a 3 semanas',
    recommendedDeliverables: [
      'Portal web responsive terminado (Producto digital)',
      'Formularios o módulos interactivos configurados',
      'Guía práctica de uso y actualización',
    ],
  },
  {
    id: 'problemas-equipos',
    prompt: 'Tengo problemas con mis equipos (PC o laptop)',
    category: 'Soporte Técnico: Físico y Digital',
    rootCauseAnalysis:
      'Lentitud, sobrecalentamiento, errores de sistema o almacenamiento lleno generan pérdida diaria de tiempo y ponen en riesgo tus archivos de trabajo.',
    proposedSolutionTitle: 'Diagnóstico Técnico, Mantenimiento Físico y Optimización Digital',
    proposedSolutionSummary:
      'Evalúo el equipo separando el mantenimiento físico (limpieza térmica y revisión de hardware) de la optimización digital (sistema operativo, software legítimo y almacenamiento NVMe/SSD).',
    relatedCapabilityIds: ['soporte-sistemas', 'organizacion-digital', 'importacion-gestion-tec'],
    actionSteps: [
      'Diagnóstico de estado de disco, memoria, temperaturas y procesos del sistema.',
      'Respaldo preventivo de información importante antes de intervenir.',
      'Mantenimiento físico cuando corresponda y optimización completa del sistema operativo.',
      'Configuración de programas y entrega del equipo probado y estable.',
    ],
    estimatedTimeline: '24 a 72 horas según requerimiento',
    recommendedDeliverables: [
      'Equipo limpio, rápido y estable',
      'Datos respaldados o migrados con seguridad',
      'Informe claro del diagnóstico realizado',
    ],
  },
  {
    id: 'archivos-caos',
    prompt: 'Mis archivos son un caos y temo perder información',
    category: 'Organización y Seguridad Digital',
    rootCauseAnalysis:
      'Documentos, fotos, hojas de cálculo y copias repetidas terminan dispersos en múltiples carpetas sin respaldo, provocando estrés y pérdida de horas buscando información.',
    proposedSolutionTitle: 'Transición de Caos Digital → Sistema Organizado + Copias de Seguridad',
    proposedSolutionSummary:
      'Clasifico tu información, diseño una estructura lógica de carpetas, elimino duplicados, configuro copias de seguridad y aplico recuperación técnica de archivos cuando es posible.',
    relatedCapabilityIds: ['organizacion-digital', 'soporte-sistemas'],
    actionSteps: [
      'Revisión de las carpetas actuales en PC, discos externos o nube.',
      'Diseño de estructura clara de carpetas adaptada a tu forma de trabajar.',
      'Clasificación, limpieza digital y migración ordenada de archivos.',
      'Implementación de esquema de copias de seguridad para evitar futuras pérdidas.',
    ],
    estimatedTimeline: '3 a 7 días según volumen de información',
    recommendedDeliverables: [
      'Sistema de carpetas organizado y limpio',
      'Copias de seguridad configuradas',
      'Pautas simples para conservar el orden',
    ],
  },
  {
    id: 'automatizar-iot',
    prompt: 'Quiero automatizar un proceso o conectar sensores (IoT)',
    category: 'Automatización, ESP32 & IA Aplicada',
    rootCauseAnalysis:
      'Tanto las tareas digitales repetitivas como el monitoreo manual de ambientes o equipos consumen tiempo que puede automatizarse con código o microcontroladores ESP32.',
    proposedSolutionTitle: 'Automatización Digital o Prototipo IoT con ESP32 y Sensores',
    proposedSolutionSummary:
      'Diseño flujos automatizados mediante software/IA o construyo dispositivos conectados con ESP32 y sensores para monitorear y controlar variables en tiempo real.',
    relatedCapabilityIds: ['iot-electronica', 'desarrollo-web', 'nfc-negocios'],
    actionSteps: [
      'Análisis del proceso o variable física que necesitas medir o automatizar.',
      'Selección de herramientas (scripts web, IA local o sensores + ESP32).',
      'Desarrollo del prototipo funcional y panel de visualización.',
      'Pruebas de estabilidad y entrega documentada.',
    ],
    estimatedTimeline: '1 a 3 semanas según complejidad',
    recommendedDeliverables: [
      'Prototipo IoT ESP32 o herramienta de automatización funcional',
      'Panel web de monitoreo o control',
      'Guía de operación',
    ],
  },
  {
    id: 'contenido-360-3d',
    prompt: 'Quiero mostrar mi local o proyecto con foto, video 360° o 3D',
    category: 'Fotografía, Video 360° (Insta360 X5) & Entornos 3D',
    rootCauseAnalysis:
      'Las fotos convencionales no siempre logran transmitir la amplitud y el valor real de un local comercial, inmueble, taller o proyecto técnico.',
    proposedSolutionTitle: 'Producción Visual, Recorrido Virtual 360° y Visualización 3D',
    proposedSolutionSummary:
      'Utilizo captura fotográfica, edición Antes/Después, cámara 360° Insta360 X5 y técnicas de reconstrucción espacial (Gaussian Splatting / 3D web) para crear experiencias inmersivas.',
    relatedCapabilityIds: ['fotografia-video-360', 'entornos-virtuales-3d', 'presencia-digital'],
    actionSteps: [
      'Planificación de las áreas, productos o espacios clave a destacar.',
      'Sesión de captura fotográfica, video o registro esférico 360° con Insta360 X5.',
      'Edición profesional de color, cosido 360° y montaje del recorrido interactivo.',
      'Entrega de archivos optimizados e integración en tu página web.',
    ],
    estimatedTimeline: '3 a 10 días',
    recommendedDeliverables: [
      'Galería fotográfica y video editado profesionalmente',
      'Recorrido virtual 360° o visor espacial interactivo',
      'Material listo para web y redes comerciales',
    ],
  },
  {
    id: 'compra-importacion',
    prompt: 'Necesito asesoría para comprar o importar tecnología',
    category: 'Evaluación Técnica & Gestión de Importación',
    rootCauseAnalysis:
      'Comprar una computadora, componente, sensor o equipo especializado sin revisar compatibilidad y especificaciones reales suele llevar a gastos innecesarios o compras incompatibles.',
    proposedSolutionTitle: 'Evaluación Técnica Previa, Compatibilidad y Gestión de Importación Legal',
    proposedSolutionSummary:
      'Analizo qué equipo o componente necesitas realmente, verifico compatibilidad técnica y coordino la búsqueda o importación cumpliendo siempre la normativa vigente.',
    relatedCapabilityIds: ['importacion-gestion-tec', 'soporte-sistemas'],
    actionSteps: [
      'Definición del uso real que le darás al equipo o componente y presupuesto objetivo.',
      'Búsqueda y comparación técnica de especificaciones y compatibilidad.',
      'Verificación de requisitos legales y costos reales de adquisición o importación.',
      'Puesta en marcha y configuración del equipo una vez recibido.',
    ],
    estimatedTimeline: ' Evaluación en 24–48h · Importación según tránsito legal',
    recommendedDeliverables: [
      'Ficha comparativa de opciones recomendadas y compatibles',
      'Orientación transparente de compra o importación normativa',
      'Configuración técnica del producto al llegar',
    ],
  },
  {
    id: 'idea-personalizada',
    prompt: 'Tengo una idea o problema y quiero ver qué solución planteas',
    category: 'Consultoría Multidisciplinaria Integral',
    rootCauseAnalysis:
      'Muchas veces sabes qué resultado quieres lograr, pero no estás seguro de si requiere una web, una tarjeta NFC, un prototipo electrónico, reorganizar datos o combinar varias áreas.',
    proposedSolutionTitle: 'Diagnóstico Personalizado y Diseño de Solución a Medida',
    proposedSolutionSummary:
      'Escucho tu idea o problema, analizo las alternativas desde la tecnología y la administración de empresas, y te propongo un camino realista, claro y paso a paso.',
    relatedCapabilityIds: [
      'desarrollo-web',
      'organizacion-digital',
      'iot-electronica',
      'presencia-digital',
      'nfc-negocios',
    ],
    actionSteps: [
      'Conversación inicial para comprender tu necesidad u objetivo real.',
      'Análisis de alternativas técnicas y administrativas viables.',
      'Presentación de propuesta clara (alcance, entregables y etapas).',
      'Construcción de la solución o demostración funcional.',
    ],
    estimatedTimeline: 'Definido por etapas claras',
    recommendedDeliverables: [
      'Propuesta de arquitectura y solución adaptada',
      'Prototipo o entregable funcional según el caso',
      'Acompañamiento directo durante todo el proceso',
    ],
  },
];

export const WORKSPACE_NODES: WorkspaceNode[] = [
  {
    id: 'workstation-ram',
    name: 'PC de Trabajo · 64 GB de RAM',
    category: 'Cómputo Principal',
    specLabel: 'Estación Multitarea · 64 GB RAM + NVMe',
    purposeTitle: 'Entorno orientado a multitarea intensiva, desarrollo web y procesamiento de datos',
    whatIUseItFor:
      'Los 64 GB de RAM me permiten trabajar simultáneamente con entornos de desarrollo Next.js/React, servidores locales, procesamiento de grandes lotes de archivos y edición visual sin cuellos de botella.',
    realCapabilities: [
      'Desarrollo y pruebas simultáneas de aplicaciones web, APIs y simuladores',
      'Clasificación y auditoría ágil de grandes volúmenes de información',
      'Multitarea fluida entre herramientas de código, diseño y análisis administrativo',
    ],
    cameraTarget: [0, 1.05, -0.2],
    cameraPosition: [0.2, 1.75, 2.8],
  },
  {
    id: 'gpu-rx470',
    name: 'GPU AMD Radeon RX 470 · 8 GB VRAM',
    category: 'Procesamiento Gráfico e IA',
    specLabel: '8 GB GDDR5 Dedicados · Gráficos & IA Local',
    purposeTitle: 'Procesamiento visual, entornos 3D WebGL y experimentación con modelos de IA locales',
    whatIUseItFor:
      'Aprovecho los 8 GB de memoria de video dedicada para acelerar la edición fotográfica y de video 360°, probar escenas Three.js / Gaussian Splatting y ejecutar modelos de IA locales.',
    realCapabilities: [
      'Ejecución local de modelos de IA e inferencia privada sin depender siempre de terceros',
      'Aceleración gráfica para revelado digital, edición de video y cosido panorámico 360°',
      'Desarrollo y validación de experiencias interactivas 3D para la web',
    ],
    cameraTarget: [1.35, 0.95, 0.1],
    cameraPosition: [2.4, 1.65, 2.3],
  },
  {
    id: 'nvme-storage',
    name: 'Almacenamiento NVMe de Alta Velocidad',
    category: 'Almacenamiento Veloz',
    specLabel: 'Unidades NVMe M.2 · Flujo de Datos Rápido',
    purposeTitle: 'Carga instantánea de proyectos, edición multimedia fluida y migraciones rápidas',
    whatIUseItFor:
      'Garantiza lectura y escritura veloz al trabajar con videos 360° pesados, catálogos fotográficos RAW, compilación de proyectos web y reorganización de estructuras de archivos.',
    realCapabilities: [
      'Manejo fluido de archivos de video 360° y fotografías de alta resolución',
      'Compilación rápida de sistemas web y bases de datos de prueba',
      'Procesos de copia de seguridad y verificación de integridad en menor tiempo',
    ],
    cameraTarget: [1.35, 0.65, 0.1],
    cameraPosition: [2.2, 1.3, 2.1],
  },
  {
    id: 'optics-360-rig',
    name: 'Cámara 360° Insta360 X5 & Creación Visual',
    category: 'Producción Visual 360°',
    specLabel: 'Insta360 X5 · Fotografía 360° · Video 360°',
    purposeTitle: 'Creación de contenido inmersivo, fotografía/video 360° y recorridos virtuales',
    whatIUseItFor:
      'Con la cámara Insta360 X5 capturo espacios completos en 360 grados para crear recorridos virtuales interactivos, contenido visual inmersivo para negocios y capturas base para entornos 3D.',
    realCapabilities: [
      'Fotografía 360° y video 360° de alta nitidez para locales comerciales y proyectos',
      'Construcción de recorridos virtuales navegables desde celular o computadora',
      'Captura visual versátil para mostrar el antes y después de espacios e instalaciones',
    ],
    cameraTarget: [-1.8, 1.15, -0.4],
    cameraPosition: [-2.6, 1.75, 1.9],
  },
  {
    id: 'esp32-iot-bench',
    name: 'Dispositivos, ESP32 y Hardware de Pruebas',
    category: 'Hardware e IoT',
    specLabel: 'ESP32 · Sensores · NFC · Periféricos',
    purposeTitle: 'Prototipado electrónico, pruebas de dispositivos conectados y programación NFC',
    whatIUseItFor:
      'Banco de trabajo con microcontroladores ESP32, sensores ambientales, relés, etiquetas NFC y herramientas de diagnóstico para validar cada solución física antes de entregarla.',
    realCapabilities: [
      'Armado y programación de prototipos IoT con ESP32 y sensores',
      'Configuración y prueba de tarjetas y etiquetas inteligentes NFC',
      'Verificación de conectividad Wi-Fi, periféricos y hardware de soporte',
    ],
    cameraTarget: [-1.25, 0.85, 0.35],
    cameraPosition: [-2.1, 1.55, 2.2],
  },
];

export const WORK_PROCESS_STEPS: WorkProcessStep[] = [
  {
    number: '01',
    verb: 'ESCUCHO',
    title: 'Comprender el problema real detrás del pedido',
    summary:
      'Antes de hablar de código, cables o programas, entiendo qué está frenando tu trabajo o tu negocio.',
    whatHappensHere:
      'Conversamos sobre tu contexto actual, qué intentaste antes, qué recursos tienes disponibles y cuál es el resultado práctico que necesitas alcanzar.',
    concreteOutput:
      'Definición clara del problema y objetivos reales sin tecnicismos innecesarios.',
  },
  {
    number: '02',
    verb: 'ANALIZO',
    title: 'Revisar necesidades, datos y posibilidades técnicas',
    summary:
      'Cruzo la mirada técnica (sistemas, web, hardware) con la mirada administrativa (procesos, tiempos y costos).',
    whatHappensHere:
      'Evalúo el estado de tus equipos, la estructura de tu información, tu flujo operativo o los requerimientos técnicos de tu idea para detectar la raíz del problema.',
    concreteOutput:
      'Diagnóstico estructurado de cuellos de botella y oportunidades de mejora.',
  },
  {
    number: '03',
    verb: 'PROPONGO',
    title: 'Plantear alternativas claras y viables',
    summary:
      'No existe una única forma de resolver un problema; presento opciones escalables y transparentes.',
    whatHappensHere:
      'Diseño una propuesta con caminos claros (desde una solución inmediata y económica hasta una arquitectura completa a medida) explicando el porqué de cada herramienta.',
    concreteOutput: 'Hoja de ruta con alcance, entregables concretos y tiempos definidos.',
  },
  {
    number: '04',
    verb: 'CONSTRUYO',
    title: 'Desarrollar e implementar con precisión técnica',
    summary:
      'Convierto la propuesta en un sistema funcional: código limpio, equipos optimizados, red estable o prototipo IoT.',
    whatHappensHere:
      'Ejecuto el desarrollo web, la reorganización digital, la configuración de infraestructura o el armado electrónico manteniendo comunicación sobre cada avance.',
    concreteOutput:
      'Solución implementada, probada en escenarios reales y lista para operar.',
  },
  {
    number: '05',
    verb: 'OPTIMIZO',
    title: 'Pulir rendimiento, usabilidad y detalles',
    summary:
      'Verifico que la solución no solo funcione, sino que sea rápida, intuitiva y cómoda en el día a día.',
    whatHappensHere:
      'Ajusto tiempos de carga, reviso la experiencia en móviles, valido copias de seguridad y simplifico pasos para que cualquier usuario pueda utilizar el sistema sin fricción.',
    concreteOutput: 'Sistema depurado con métricas de rendimiento y orden verificadas.',
  },
  {
    number: '06',
    verb: 'ACOMPAÑO',
    title: 'Documentar, capacitar y brindar soporte continuo',
    summary: 'Una buena solución tecnológica debe poder sostenerse y evolucionar con el tiempo.',
    whatHappensHere:
      'Entrego guías claras de uso, explico cómo aprovechar la herramienta y quedo disponible para mantenimiento preventivo, nuevas etapas o soporte evolutivo.',
    concreteOutput:
      'Autonomía operativa para el cliente y respaldo profesional a largo plazo.',
  },
];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'tl-form-1',
    period: 'Formación Académica Principal',
    title: 'Computación e Informática',
    organizationOrContext: 'Institución Educativa / Superior · [Espacio reservado para nombre oficial de institución y año]',
    category: 'Formación',
    description:
      'Formación en lógica de programación, desarrollo de sistemas web, arquitectura y mantenimiento de computadoras, sistemas operativos, redes y gestión de la información.',
    disciplines: ['Computación e Informática', 'Desarrollo Web', 'Sistemas', 'Soporte y Redes'],
    impactHighlight:
      'Base técnica integral para comprender y resolver problemas tanto de software como de hardware.',
    isPlaceholderNote: 'Datos específicos de institución y fechas exactas reservadas para edición formal del titular.',
  },
  {
    id: 'tl-form-2',
    period: 'Formación Académica y de Gestión',
    title: 'Administración de Empresas',
    organizationOrContext: 'Institución Educativa / Superior · [Espacio reservado para nombre oficial de institución y año]',
    category: 'Formación',
    description:
      'Formación en organización empresarial, optimización de procesos, administración de recursos, atención al cliente, estructuración documental y visión comercial.',
    disciplines: ['Administración de Empresas', 'Organización', 'Procesos', 'Visión de Negocio'],
    impactHighlight:
      'Permite analizar cada proyecto tecnológico desde la eficiencia operativa y la utilidad real para el negocio.',
    isPlaceholderNote: 'Datos específicos de institución y fechas exactas reservadas para edición formal del titular.',
  },
  {
    id: 'tl-form-3',
    period: 'Actualización Continua',
    title: 'Formación Complementaria y Especialización Tecnológica',
    organizationOrContext: 'Autoaprendizaje Estructurado, Laboratorio Práctico y Estudios Complementarios · [Placeholder editable para cursos/posgrado]',
    category: 'Especialización',
    description:
      'Profundización práctica en frameworks web modernos (React, Next.js, Tailwind), microcontroladores ESP32 e IoT, herramientas de IA local, tecnología NFC y producción inmersiva con Insta360 X5.',
    disciplines: ['Next.js / TypeScript', 'ESP32 / IoT', 'IA Aplicada', 'Insta360 X5 & 3D'],
    impactHighlight:
      'Adaptación constante a tecnologías actuales mediante prototipos y experimentación real.',
    isPlaceholderNote: 'Espacio preparado para incorporar certificaciones o estudios de posgrado específicos cuando corresponda.',
  },
  {
    id: 'tl-exp-1',
    period: 'Práctica Profesional Actual',
    title: 'Desarrollo de Soluciones Digitales, Presencia Web y Automatización',
    organizationOrContext: 'Proyectos Independientes y Atención a Clientes · [Espacio reservado para clientes/empresas específicas]',
    category: 'Experiencia',
    description:
      'Diseño y desarrollo de páginas web, landing pages, portafolios, configuración de presencia digital para negocios, implementación de tarjetas NFC y herramientas personalizadas.',
    disciplines: ['Desarrollo Web', 'Presencia Digital', 'NFC', 'Automatización'],
    impactHighlight:
      'Soluciones digitales entregadas listas para operar, enfocadas en claridad y facilidad de contacto.',
    isPlaceholderNote: 'Sin nombres de empresas inventados: reservado para casos autorizados por cada cliente.',
  },
  {
    id: 'tl-exp-2',
    period: 'Práctica Profesional Consolidada',
    title: 'Soporte Técnico Informático, Organización Digital y Mantenimiento',
    organizationOrContext: 'Atención a Personas, Profesionales y Negocios · [Periodo y referencias específicas editables]',
    category: 'Experiencia',
    description:
      'Diagnóstico y mantenimiento físico/digital de PC y laptops, optimización de sistemas, migración a unidades NVMe/SSD, estructuración de carpetas, copias de seguridad y recuperación de archivos.',
    disciplines: ['Soporte Técnico', 'Organización Digital', 'Seguridad de Datos', 'Hardware'],
    impactHighlight:
      'Transición de equipos lentos o desordenados hacia entornos de trabajo rápidos, limpios y respaldados.',
  },
  {
    id: 'tl-proy-1',
    period: 'Laboratorio y Creación Aplicada',
    title: 'Prototipado IoT (ESP32), Contenido Visual 360° y Entornos 3D',
    organizationOrContext: 'Laboratorio Personal de Ingeniería y Producción Visual',
    category: 'Proyectos Clave',
    description:
      'Desarrollo de nodos de monitoreo con ESP32 y sensores, captura y edición de fotografía/video 360° con cámara Insta360 X5, recorridos virtuales y exploración de Gaussian Splatting.',
    disciplines: ['IoT / ESP32', 'Insta360 X5', 'Recorridos 360°', 'Entornos 3D'],
    impactHighlight:
      'Integración directa con las demostraciones interactivas del portafolio.',
  },
];

export const LAB_PROJECTS: LabProject[] = [
  {
    id: 'proj-iot-telemetry',
    code: 'PROY-01 · IOT & ESP32',
    title: 'Sistema de Monitoreo Ambiental y Automatización con ESP32',
    shortSummary:
      'Nodo físico con microcontrolador ESP32, sensores de temperatura/humedad y relés conectado en tiempo real a un panel web de alertas.',
    domain: 'IoT, Electrónica y Mecatrónica',
    featured: true,
    format: 'iot-dashboard',
    problemSolved:
      'Cuartos de equipos y pequeños almacenes sin supervisión sufrían variaciones térmicas sin alertas tempranas.',
    solutionBuilt:
      'Prototipo funcional con ESP32, lectura periódica de sensores, activación automática de ventilación por relé y visualización web.',
    stack: ['ESP32', 'Sensores Ambientales', 'Wi-Fi / JSON', 'React Dashboard'],
    metrics: 'Monitoreo continuo · Activación automática por umbral',
  },
  {
    id: 'proj-digital-order',
    code: 'PROY-02 · ORGANIZACIÓN DIGITAL',
    title: 'Sistema de Reorganización Documental (Caos → Estructura)',
    shortSummary:
      'Transformación de miles de archivos desordenados en una taxonomía clara de carpetas con copias de seguridad verificadas.',
    domain: 'Organización y Seguridad Digital',
    featured: true,
    format: 'architecture-diff',
    problemSolved:
      'Archivos comerciales, contables y multimedia dispersos en múltiples carpetas generaban pérdida de tiempo y riesgo de extravío.',
    solutionBuilt:
      'Estructura jerárquica estandarizada, limpieza de duplicados, nomenclatura clara y esquema de copias de seguridad.',
    stack: ['Taxonomía Digital', 'Clasificación Documental', 'Backups', 'Migración Segura'],
    metrics: 'Localización en segundos · Estructura libre de duplicados',
  },
  {
    id: 'proj-web-ecosystem',
    code: 'PROY-03 · WEB & NFC',
    title: 'Portal Empresarial Interactivo + Tarjetas Inteligentes NFC',
    shortSummary:
      'Sitio web moderno para negocio local integrado con tarjetas NFC de contacto instantáneo, catálogo digital y WhatsApp Business.',
    domain: 'Desarrollo Web y Presencia Digital',
    featured: true,
    format: 'web-system',
    problemSolved:
      'Dificultad para que los clientes encontraran el catálogo actualizado y guardaran el contacto del negocio de forma rápida.',
    solutionBuilt:
      'Plataforma web rápida en Next.js y Tailwind CSS vinculada a tarjetas y etiquetas NFC configuradas a medida.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NFC NDEF', 'WhatsApp Business'],
    metrics: 'Acceso en 1 toque · Diseño 100% adaptable a móvil',
  },
  {
    id: 'proj-visual-360',
    code: 'PROY-04 · INSTA360 X5 & 3D',
    title: 'Recorrido Virtual 360° y Revelado Digital Antes / Después',
    shortSummary:
      'Producción visual inmersiva con cámara Insta360 X5, edición de color profesional y visor interactivo para explorar espacios.',
    domain: 'Fotografía, Video 360° y Entornos 3D',
    featured: true,
    format: 'visual-360',
    problemSolved:
      'Las fotos estáticas tradicionales no mostraban la distribución real ni la calidad de las instalaciones.',
    solutionBuilt:
      'Captura esférica 360° con Insta360 X5, revelado comparativo Antes/Después e integración en visor web interactivo.',
    stack: ['Insta360 X5', 'Fotografía 360°', 'Edición de Color', 'Visor Web 3D/360°'],
    metrics: 'Exploración inmersiva · Comparativa visual interactiva',
  },
  {
    id: 'proj-local-ai',
    code: 'PROY-05 · IA LOCAL & PROCESAMIENTO',
    title: 'Flujo Local de Clasificación y Procesamiento Asistido por IA',
    shortSummary:
      'Entorno de procesamiento en estación de 64 GB RAM y GPU 8 GB para analizar lotes de documentos e imágenes con privacidad.',
    domain: 'Inteligencia Artificial Aplicada',
    featured: false,
    format: 'terminal',
    problemSolved:
      'Necesidad de organizar, resumir y optimizar archivos e imágenes sin exponer datos sensibles en servicios externos.',
    solutionBuilt:
      'Pipeline apoyado en modelos locales y scripts de automatización para catalogar información y optimizar activos visuales.',
    stack: ['Modelos Locales', 'GPU RX 470 8GB', 'Node.js / Scripts', 'Procesamiento de Imágenes'],
    metrics: 'Privacidad en equipo local · Ahorro de horas operativas',
  },
  {
    id: 'proj-spatial-routes',
    code: 'PROY-06 · MAPAS, GPX & REDES',
    title: 'Visualizador de Rutas GPX, Mapas y Topología de Conectividad',
    shortSummary:
      'Herramienta interactiva para representar trazas GPX, puntos de cobertura sobre OpenStreetMap y distribución de nodos.',
    domain: 'Mapas, Geolocalización y Redes',
    featured: false,
    format: 'topology-map',
    problemSolved:
      'Falta de claridad visual al planificar recorridos, ubicar puntos de atención o distribuir cobertura de red y sensores.',
    solutionBuilt:
      'Interfaz de visualización cartográfica y topológica basada en datos GPX, OpenStreetMap y esquemas vectoriales.',
    stack: ['OpenStreetMap', 'MapLibre', 'GPX', 'Visualización de Rutas'],
    metrics: 'Lectura geoespacial clara · Planificación visual',
  },
];

/**
 * Pure logic: Filters knowledge items by domain and optional proficiency level.
 */
export function filterKnowledgeItems(
  items: KnowledgeItem[],
  domainId: string,
  levelFilter = 'Todos'
): KnowledgeItem[] {
  return items.filter((item) => {
    const matchesDomain = domainId === 'todos' || item.domainId === domainId;
    if (!matchesDomain) return false;
    const matchesLevel = levelFilter === 'Todos' || item.level === levelFilter;
    return matchesLevel;
  });
}

/**
 * Pure logic: Filters deliverable solutions by classification type.
 */
export function filterDeliverableSolutions(
  solutions: DeliverableSolution[],
  classificationFilter = 'Todos'
): DeliverableSolution[] {
  if (classificationFilter === 'Todos') return solutions;
  return solutions.filter((item) => item.classification === classificationFilter);
}

/**
 * Pure logic: Filters portfolio projects by domain and featured/showAll toggle.
 */
export function getVisiblePortfolioProjects(
  projects: LabProject[],
  selectedDomain = 'Todos',
  showAll = false
): { visibleProjects: LabProject[]; totalMatching: number; hasHiddenProjects: boolean } {
  const filtered =
    selectedDomain === 'Todos'
      ? projects
      : projects.filter((p) => p.domain === selectedDomain);

  if (showAll || selectedDomain !== 'Todos') {
    return {
      visibleProjects: filtered,
      totalMatching: filtered.length,
      hasHiddenProjects: false,
    };
  }

  const featuredSubset = filtered.filter((p) => p.featured);
  return {
    visibleProjects: featuredSubset,
    totalMatching: filtered.length,
    hasHiddenProjects: filtered.length > featuredSubset.length,
  };
}

/**
 * Pure logic: Validates and builds a structured Demo Request summary without exposing private data.
 */
export function buildDemoRequestSummary(input: {
  projectTitle: string;
  requesterName: string;
  requesterContact: string;
  modality: DemoModality;
  notes?: string;
}): { valid: boolean; error?: string; summaryText?: string } {
  const name = input.requesterName.trim();
  const contact = input.requesterContact.trim();

  if (name.length < 2) {
    return { valid: false, error: 'Por favor ingresa tu nombre o empresa para coordinar la demostración.' };
  }
  if (contact.length < 5) {
    return { valid: false, error: 'Ingresa un correo electrónico o WhatsApp válido para enviarte el enlace o video.' };
  }

  const cleanNotes = (input.notes || '').trim() || 'Interés general en conocer el funcionamiento de la solución.';

  const summaryText = [
    `SOLICITUD DE DEMOSTRACIÓN — ADRIÁN DEXTRE CARRANZA`,
    `Proyecto / Solución: ${input.projectTitle}`,
    `Modalidad elegida: ${input.modality}`,
    `Solicitante: ${name} (${contact})`,
    `Nota / Caso de uso: ${cleanNotes}`,
    `Seguridad: La demostración se coordina de forma personalizada sin exponer datos privados de terceros.`,
  ].join('\n');

  return {
    valid: true,
    summaryText,
  };
}

/**
 * Pure logic: Simulates the Before -> After digital organization transformation
 * and computes concrete efficiency metrics.
 */
export function calculateOrganizationImpact(
  files: MessyFileItem[],
  isOrganized: boolean
): OrganizationSimulationResult {
  const totalFiles = files.length;
  const duplicatesRemoved = isOrganized ? 4 : 0;
  const organizedCount = isOrganized ? totalFiles : 0;
  const estimatedSearchSecondsBefore = 195;
  const estimatedSearchSecondsAfter = isOrganized ? 8 : 195;
  const efficiencyGainPercent = isOrganized
    ? Math.round(
        ((estimatedSearchSecondsBefore - estimatedSearchSecondsAfter) /
          estimatedSearchSecondsBefore) *
          100
      )
    : 0;

  const groupedFolders: Record<string, MessyFileItem[]> = {};
  for (const file of files) {
    const key = isOrganized ? file.structuredFolder : file.rawLocation;
    if (!groupedFolders[key]) {
      groupedFolders[key] = [];
    }
    groupedFolders[key].push(file);
  }

  return {
    totalFiles,
    organizedCount,
    duplicatesRemoved,
    estimatedSearchSecondsBefore,
    estimatedSearchSecondsAfter,
    efficiencyGainPercent,
    groupedFolders,
  };
}

/**
 * Pure logic: Evaluates ESP32 sensor inputs and computes automated relay states & alert level.
 */
export function simulateEsp32Telemetry(
  temperatureC: number,
  humidityPct: number,
  motionDetected: boolean,
  autoMode: boolean,
  manualVentilation: boolean,
  manualLighting: boolean
): Esp32TelemetryState {
  const clampedTemp = Math.max(-10, Math.min(85, temperatureC));
  const clampedHum = Math.max(0, Math.min(100, humidityPct));

  let alertLevel: 'Normal' | 'Preventivo' | 'Crítico' = 'Normal';
  if (clampedTemp >= 34 || clampedHum >= 80) {
    alertLevel = 'Crítico';
  } else if (clampedTemp >= 28 || clampedHum >= 68) {
    alertLevel = 'Preventivo';
  }

  const relayVentilationOn = autoMode
    ? clampedTemp >= 28 || clampedHum >= 70
    : manualVentilation;
  const relayLightingOn = autoMode ? motionDetected : manualLighting;
  const voltageV = Number(
    (3.31 - (relayVentilationOn ? 0.03 : 0) - (relayLightingOn ? 0.02 : 0)).toFixed(2)
  );

  let automatedActionLog = 'Monitoreo estable · Sin anomalías térmicas';
  if (autoMode) {
    if (relayVentilationOn && relayLightingOn) {
      automatedActionLog =
        'ESP32 AUTO: Ventilación forzada activa + Iluminación por presencia activa';
    } else if (relayVentilationOn) {
      automatedActionLog = `ESP32 AUTO: Relé de extracción activado (${clampedTemp}°C / ${clampedHum}% HR)`;
    } else if (relayLightingOn) {
      automatedActionLog =
        'ESP32 AUTO: Sensor PIR detectó movimiento -> Iluminación de zona encendida';
    }
  } else {
    automatedActionLog = 'MODO MANUAL: Control directo de relés desde interfaz web';
  }

  return {
    temperatureC: clampedTemp,
    humidityPct: clampedHum,
    voltageV,
    motionDetected,
    relayVentilationOn,
    relayLightingOn,
    alertLevel,
    automatedActionLog,
  };
}

/**
 * Pure logic: Finds a problem scenario by ID and enriches it with full capability objects.
 */
export function diagnoseProblem(scenarioId: string): {
  scenario: ProblemScenario;
  matchedCapabilities: CapabilityCategory[];
} {
  const scenario =
    PROBLEM_SCENARIOS.find((item) => item.id === scenarioId) || PROBLEM_SCENARIOS[0];
  const matchedCapabilities = CAPABILITY_CATEGORIES.filter((cap) =>
    scenario.relatedCapabilityIds.includes(cap.id)
  );
  return {
    scenario,
    matchedCapabilities,
  };
}

/**
 * Pure logic: Filters CV timeline entries by category or search query.
 */
export function filterTimelineEntries(
  entries: TimelineEntry[],
  category: string,
  searchQuery = ''
): TimelineEntry[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesCategory = category === 'Todos' || entry.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      entry.title,
      entry.organizationOrContext,
      entry.description,
      entry.impactHighlight,
      ...entry.disciplines,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

/**
 * Pure logic: Validates and builds a structured inquiry summary for Adrián Dextre Carranza.
 */
export function buildProjectProposalSummary(input: {
  clientName: string;
  contactChannel: string;
  scenarioId: string;
  customContext: string;
  urgency: 'Exploratorio' | 'Próximas semanas' | 'Prioritario';
}): { valid: boolean; error?: string; summaryText?: string } {
  const name = input.clientName.trim();
  const contact = input.contactChannel.trim();
  const details = input.customContext.trim();

  if (name.length < 2) {
    return { valid: false, error: 'Por favor ingresa tu nombre o el de tu empresa.' };
  }
  if (contact.length < 5) {
    return {
      valid: false,
      error: 'Ingresa un correo o número de WhatsApp válido para responderte.',
    };
  }
  if (details.length < 10) {
    return {
      valid: false,
      error: 'Cuéntame brevemente qué necesitas resolver (mínimo 10 caracteres).',
    };
  }

  const { scenario, matchedCapabilities } = diagnoseProblem(input.scenarioId);
  const areasList = matchedCapabilities.map((c) => c.title).join(' + ');

  const summaryText = [
    `DIAGNÓSTICO PRELIMINAR — ADRIÁN DEXTRE CARRANZA`,
    `Solicitante: ${name} (${contact})`,
    `Situación seleccionada: ${scenario.prompt}`,
    `Prioridad: ${input.urgency}`,
    `Áreas integradas: ${areasList}`,
    `Enfoque propuesto: ${scenario.proposedSolutionTitle}`,
    `Contexto del proyecto: ${details}`,
  ].join('\n');

  return {
    valid: true,
    summaryText,
  };
}
