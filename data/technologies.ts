export type TechCategory =
  | 'ALL'
  | 'PROGRAMMING LANGUAGES'
  | 'FRONTEND'
  | 'BACKEND'
  | 'DATABASE'
  | 'TOOLS & PLATFORMS';

export interface TechItem {
  id: string;
  name: string;
  primaryCategory: Exclude<TechCategory, 'ALL'>;
  categories: Exclude<TechCategory, 'ALL'>[];
  roleLabel: string;
  description: string;
  accentHex: string;
  svgPaths: string[];
  viewBox?: string;
}

export const TECH_CATEGORIES: { id: TechCategory; label: string; shortLabel: string }[] = [
  { id: 'ALL', label: 'ALL TECHNOLOGIES', shortLabel: 'ALL' },
  { id: 'PROGRAMMING LANGUAGES', label: 'PROGRAMMING LANGUAGES', shortLabel: 'LANGUAGES' },
  { id: 'FRONTEND', label: 'FRONTEND', shortLabel: 'FRONTEND' },
  { id: 'BACKEND', label: 'BACKEND', shortLabel: 'BACKEND' },
  { id: 'DATABASE', label: 'DATABASE', shortLabel: 'DATABASE' },
  { id: 'TOOLS & PLATFORMS', label: 'TOOLS & PLATFORMS', shortLabel: 'TOOLS' },
];

export const LEOVAN_TECHNOLOGIES: TechItem[] = [
  // PROGRAMMING LANGUAGES (16)
  {
    id: 'html5',
    name: 'HTML5',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Markup Architecture',
    description: 'Fondasi struktur semantik halaman web modern, aksesibilitas DOM, dan tata letak dokumen.',
    accentHex: '#E34F26',
    svgPaths: [
      'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
    ],
  },
  {
    id: 'css3',
    name: 'CSS3',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Visual Styling & Layout',
    description: 'Sistem styling responsif, animasi keyframe, clip-path geometris, dan tata letak Grid/Flexbox.',
    accentHex: '#1572B6',
    svgPaths: [
      'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Interactive Logic',
    description: 'Bahasa inti untuk interaktivitas web, manipulasi DOM dinamis, dan logika aplikasi berbasis event.',
    accentHex: '#F7DF1E',
    svgPaths: [
      'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
    ],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Type-Safe Engineering',
    description: 'Superset JavaScript dengan sistem tipe statis untuk membangun aplikasi web dan komponen yang terstruktur.',
    accentHex: '#3178C6',
    svgPaths: [
      'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
    ],
  },
  {
    id: 'python',
    name: 'Python',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES', 'BACKEND'],
    roleLabel: 'Scripting, Automation & Backend',
    description: 'Eksplorasi pembuatan skrip, pemrosesan data, integrasi API, dan layanan backend modern.',
    accentHex: '#3776AB',
    svgPaths: [
      'M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.148V3.199S18.28 0 11.914 0zm-3.2 1.85c.578 0 1.046.47 1.046 1.052 0 .581-.468 1.051-1.046 1.051-.579 0-1.046-.47-1.046-1.051 0-.582.467-1.052 1.046-1.052z',
      'M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.148v5.316S5.72 24 12.086 24zm3.2-1.85c-.578 0-1.046-.47-1.046-1.052 0-.581.468-1.051 1.046-1.051.579 0 1.046.47 1.046 1.051 0 .582-.467 1.052-1.046 1.052z',
    ],
  },
  {
    id: 'java',
    name: 'Java',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Object-Oriented Programming',
    description: 'Eksplorasi konsep pemrograman berorientasi objek (OOP) dan fondasi pengembangan aplikasi.',
    accentHex: '#ED8B00',
    svgPaths: [
      'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.189-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639',
    ],
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Modern Android & JVM',
    description: 'Bahasa modern yang ringkas dan ekspresif untuk pengembangan aplikasi Android dan lintas platform.',
    accentHex: '#7F52FF',
    svgPaths: ['M24 24H0V0h24L12 12Z'],
  },
  {
    id: 'php',
    name: 'PHP',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES', 'BACKEND'],
    roleLabel: 'Server-Side Web Scripting',
    description: 'Pemrosesan server-side dinamis dan pengelolaan logika aplikasi web klasik maupun modern.',
    accentHex: '#777BB4',
    svgPaths: [
      'M12 5C5.373 5 0 8.134 0 12s5.373 7 12 7 12-3.134 12-7-5.373-7-12-7zm-4.5 9.2h-1.8l-.4 2H3.6l1.4-7.2h3.2c1.4 0 2.3.7 2.1 2.1-.2 1.6-1.3 3.1-2.8 3.1zm5.8 2h-1.7l.6-3.2h-1.8l-.6 3.2H8.1l1.4-7.2h1.7l-.5 2.6h1.8l.5-2.6h1.7l-1.4 7.2zm6.1-2h-1.8l-.4 2h-1.7l1.4-7.2h3.2c1.4 0 2.3.7 2.1 2.1-.2 1.6-1.3 3.1-2.8 3.1z',
    ],
  },
  {
    id: 'c-lang',
    name: 'C',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Systems & Memory Fundamentals',
    description: 'Eksplorasi dasar algoritma, struktur data, dan cara kerja pemrograman tingkat rendah.',
    accentHex: '#A8B9CC',
    svgPaths: [
      'M16.59 14.86c-.83 1.42-2.36 2.34-4.19 2.34-2.76 0-5-2.24-5-5s2.24-5 5-5c1.83 0 3.36.92 4.19 2.34l3.05-1.76C18.18 5.25 15.42 3.6 12.4 3.6c-4.75 0-8.6 3.85-8.6 8.6s3.85 8.6 8.6 8.6c3.02 0 5.78-1.65 7.24-4.18l-3.05-1.76z',
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'High-Performance Computing',
    description: 'Pemrograman performa tinggi, logika kompetitif, dan aritektur perangkat lunak sistem.',
    accentHex: '#00599C',
    svgPaths: [
      'M13.5 14.8c-.75 1.3-2.15 2.2-3.8 2.2-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.65 0 3.05.9 3.8 2.2l2.6-1.5C14.8 6.4 12.4 5 9.7 5 5.45 5 2 8.45 2 12.5S5.45 20 9.7 20c2.7 0 5.1-1.4 6.4-3.7l-2.6-1.5zm4.5-3.3h-1.2V10.3h-1.2v1.2h-1.2v1.2h1.2v1.2h1.2v-1.2H18v-1.2zm4.8 0h-1.2V10.3h-1.2v1.2h-1.2v1.2h1.2v1.2h1.2v-1.2h1.2v-1.2z',
    ],
  },
  {
    id: 'csharp',
    name: 'C#',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Application & Game Logic',
    description: 'Bahasa berorientasi objek populer untuk aplikasi desktop, layanan web, dan eksperimen game engine.',
    accentHex: '#512BD4',
    svgPaths: [
      'M12.5 15.2c-.8 1.3-2.2 2.1-3.9 2.1-2.6 0-4.6-2.1-4.6-4.7S6 7.9 8.6 7.9c1.7 0 3.1.8 3.9 2.1l2.7-1.6C13.8 6.1 11.4 4.7 8.6 4.7 4.2 4.7.7 8.2.7 12.6s3.5 7.9 7.9 7.9c2.8 0 5.2-1.4 6.6-3.7l-2.7-1.6zm5.7-4.8h1.3v-1.8h1.3v1.8h1.4v1.3h-1.4v1.8h1.4v1.3h-1.4v1.8h-1.3v-1.8h-1.3v1.8h-1.3v-1.8h-1.4v-1.3h1.4v-1.8h-1.4v-1.3h1.4V8.6h1.3v1.8zm0 3.1h1.3v-1.8h-1.3v1.8z',
    ],
  },
  {
    id: 'go',
    name: 'Go',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Concurrent Network Services',
    description: 'Bahasa kompilasi cepat dengan dukungan konkurensi ringan untuk layanan backend dan CLI.',
    accentHex: '#00ADD8',
    svgPaths: [
      'M1.8 10.2h4.5v1.4H1.8v-1.4zm1.2 2.6h3.3v1.4H3v-1.4zm8.4-5.4c-3.1 0-5.6 2.3-5.6 5.2s2.5 5.2 5.6 5.2c2.6 0 4.8-1.6 5.4-3.9h-5v-2.2h7.6v.9c0 4.2-3.4 7.6-8 7.6-4.6 0-8.2-3.3-8.2-7.6S7 5 11.4 5c2.4 0 4.6.9 6.1 2.4l-1.8 1.7c-1.1-1.1-2.6-1.7-4.3-1.7zm10.1 2.6c-1.5 0-2.7 1.2-2.7 2.6s1.2 2.6 2.7 2.6 2.7-1.2 2.7-2.6-1.2-2.6-2.7-2.6z',
    ],
  },
  {
    id: 'rust',
    name: 'Rust',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Memory-Safe Systems',
    description: 'Eksplorasi keamanan memori tanpa garbage collector dan tooling CLI berperforma tinggi.',
    accentHex: '#DEA584',
    svgPaths: [
      'M12 2L14.2 4.6L17.5 3.8L18.1 7.1L21.3 8.3L20.1 11.5L22.3 14.1L19.5 16L19.9 19.4L16.5 19.6L15.1 22.7L12 21.1L8.9 22.7L7.5 19.6L4.1 19.4L4.5 16L1.7 14.1L3.9 11.5L2.7 8.3L5.9 7.1L6.5 3.8L9.8 4.6L12 2ZM8.5 8.5V15.5H10.8V12.8H12.2L14 15.5H16.5L14.4 12.5C15.4 12.1 16 11.2 16 10.2C16 8.9 15 8.5 13.2 8.5H8.5ZM10.8 10.2H12.9C13.5 10.2 13.8 10.5 13.8 10.9C13.8 11.3 13.5 11.6 12.9 11.6H10.8V10.2Z',
    ],
  },
  {
    id: 'dart',
    name: 'Dart',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Cross-Platform UI Language',
    description: 'Bahasa di balik ekosistem multi-platform untuk membangun antarmuka mobile dan web yang responsif.',
    accentHex: '#0175C2',
    svgPaths: [
      'M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9.473-9.473C-.106 14.07-.09 13.295 0 12.632c.253-1.825 1.421-3.79 1.421-3.79l2.684-4.737zm1.895 1.895v11.368l3.789 3.79h7.579v-3.79H9.789L6 13.579V6z',
    ],
  },
  {
    id: 'swift',
    name: 'Swift',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Apple Ecosystem Language',
    description: 'Eksplorasi sintaks ekspresif dan cepat untuk pengembangan aplikasi modern.',
    accentHex: '#F05138',
    svgPaths: [
      'M15.9 2.4c3.2 2.4 5.2 6.4 4.5 10.7-.2 1.2-.7 2.4-1.3 3.4.9.8 1.9 1.8 2.1 2.9.2 1-.6 1.5-1.6 1.2-1.2-.4-2.5-1.1-3.7-1.9-1.5.7-3.2 1.1-5 1.1-4.8 0-8.9-2.8-10.9-7.1 2.5 2 5.7 3.2 9.1 2.9-2.8-1.9-5.3-4.6-6.9-7.6 2.1 1.9 4.7 3.6 7.4 4.7-2-2.1-3.9-4.7-4.8-7.4 3.1 2.9 6.6 5.3 9.7 6.5-.8-2.9-1.8-6.3-3.6-9.4h5z',
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    primaryCategory: 'PROGRAMMING LANGUAGES',
    categories: ['PROGRAMMING LANGUAGES'],
    roleLabel: 'Relational Data Querying',
    description: 'Bahasa standar untuk merancang skema tabel, relasi data, dan query basis data terstruktur.',
    accentHex: '#E60023',
    svgPaths: [
      'M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2.5c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm8 13c0 .66-3.58 2-8 2s-8-1.34-8-2v-2.7c1.96 1.05 4.82 1.7 8 1.7s6.04-.65 8-1.7v2.7zm0-5.5c0 .66-3.58 2-8 2s-8-1.34-8-2V9.3c1.96 1.05 4.82 1.7 8 1.7s6.04-.65 8-1.7V12z',
    ],
  },

  // FRONTEND (6)
  {
    id: 'react',
    name: 'React',
    primaryCategory: 'FRONTEND',
    categories: ['FRONTEND'],
    roleLabel: 'Component UI Library',
    description: 'Library utama untuk membangun antarmuka pengguna deklaratif, state interaktif, dan ekosistem LEOVAN | TOOLS.',
    accentHex: '#61DAFB',
    svgPaths: [
      'M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z',
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    primaryCategory: 'FRONTEND',
    categories: ['FRONTEND'],
    roleLabel: 'Full-Stack React Framework',
    description: 'Framework produksi dengan App Router, Server Components, optimasi SEO, dan performa tinggi.',
    accentHex: '#FFFFFF',
    svgPaths: [
      'M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z',
    ],
  },
  {
    id: 'vite',
    name: 'Vite',
    primaryCategory: 'FRONTEND',
    categories: ['FRONTEND'],
    roleLabel: 'Next-Gen Frontend Tooling',
    description: 'Build tool super cepat untuk prototyping aplikasi web modern dan bundling aset yang efisien.',
    accentHex: '#646CFF',
    svgPaths: [
      'M23.5 2.1L12.6 21.9c-.3.5-1 .5-1.3 0L.5 2.1c-.3-.6.2-1.3.9-1.1l10.6 2.3 10.6-2.3c.7-.2 1.2.5.9 1.1zM15.8 4.4l-5.2 1.1 1.6 5.2 3.6-1.1-1.1 5.6 4.7-8.4-3.4.8-.2-3.2z',
    ],
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    primaryCategory: 'FRONTEND',
    categories: ['FRONTEND'],
    roleLabel: 'Utility-First Design System',
    description: 'Styling presisi dengan utility class untuk membangun layout agresif, responsif, dan konsisten.',
    accentHex: '#06B6D4',
    svgPaths: [
      'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z',
    ],
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    primaryCategory: 'FRONTEND',
    categories: ['FRONTEND'],
    roleLabel: 'Responsive UI Grid Toolkit',
    description: 'Framework komponen UI dan grid responsif untuk pembuatan antarmuka web cepat.',
    accentHex: '#7952B3',
    svgPaths: [
      'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4.5 4v10h4.8c2.1 0 3.5-1.1 3.5-2.9 0-1.3-.9-2.2-2.2-2.4v-.1c1-.3 1.7-1.1 1.7-2.2 0-1.6-1.2-2.4-3.2-2.4H8.5zm2.2 1.7h1.9c1 0 1.6.4 1.6 1.2 0 .8-.6 1.2-1.7 1.2h-1.8V8.7zm0 4.1h2.1c1.2 0 1.8.5 1.8 1.4 0 .9-.6 1.4-1.8 1.4h-2.1v-2.8z',
    ],
  },
  {
    id: 'sass',
    name: 'Sass',
    primaryCategory: 'FRONTEND',
    categories: ['FRONTEND'],
    roleLabel: 'CSS Preprocessor',
    description: 'Penulisan stylesheet modular dengan variabel, mixin, dan fungsi arsitektur CSS tingkat lanjut.',
    accentHex: '#CC6699',
    svgPaths: [
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 13.5c-.8.9-2.1 1.3-3.5 1.1-1.3-.2-2.3-.9-2.6-1.8-.3-.9.3-1.9 1.4-2.2.8-.2 1.8.1 2.2.7.3.5.1 1.1-.4 1.3-.4.2-.9 0-1-.4-.1-.2 0-.5.2-.6-.3-.2-.8-.2-1.2 0-.6.3-.9.9-.7 1.4.2.6 1 1 1.9 1.1 1.1.1 2.1-.2 2.7-.9.7-.8.8-2 .2-3-.7-1.1-2.2-1.8-3.8-1.7-2 .1-3.6 1.4-3.9 3.1-.2 1.2.3 2.4 1.3 3.2-.4.1-.9.1-1.3-.1-1.4-.6-2.2-2.2-1.9-3.9.4-2.4 2.7-4.2 5.4-4.3 2.3-.1 4.4 1 5.3 2.7.8 1.5.6 3.2-.3 4.3z',
    ],
  },

  // BACKEND (7: Node.js, Express.js, PHP [shared], Laravel, Python [shared], FastAPI, REST API)
  {
    id: 'nodejs',
    name: 'Node.js',
    primaryCategory: 'BACKEND',
    categories: ['BACKEND'],
    roleLabel: 'JavaScript Server Runtime',
    description: 'Runtime JavaScript asynchronous berbasis event untuk menjalankan server API dan build pipeline.',
    accentHex: '#339933',
    svgPaths: [
      'M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.46.26 1.04.26 1.5 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2zm0 2.31l5.94 3.43v6.86L12 17.88l-5.94-3.43V7.59L12 4.16z',
    ],
  },
  {
    id: 'expressjs',
    name: 'Express.js',
    primaryCategory: 'BACKEND',
    categories: ['BACKEND'],
    roleLabel: 'Minimalist Web Routing',
    description: 'Framework web minimalis di atas Node.js untuk merancang endpoint HTTP, middleware, dan REST API.',
    accentHex: '#FFFFFF',
    svgPaths: [
      'M2 7h8v2H4v2h5v2H4v2h6v2H2V7zm11 2l2.5 3.5L18 9h2.2l-3.6 5 3.6 5H18l-2.5-3.5L13 19h-2.2l3.6-5-3.6-5H13z',
    ],
  },
  {
    id: 'laravel',
    name: 'Laravel',
    primaryCategory: 'BACKEND',
    categories: ['BACKEND'],
    roleLabel: 'Full-Stack PHP Framework',
    description: 'Framework PHP ekspresif untuk arsitektur MVC, autentikasi, routing, dan pengelolaan database.',
    accentHex: '#FF2D20',
    svgPaths: [
      'M23.6 8.3l-4.2-2.4c-.3-.2-.7-.2-1 0l-4.2 2.4c-.3.2-.5.5-.5.9v4.6l-3.2 1.8V4.9c0-.4-.2-.7-.5-.9L5.8 1.6c-.3-.2-.7-.2-1 0L.6 4c-.3.2-.5.5-.5.9v10.8c0 .4.2.7.5.9l8.9 5.1c.3.2.7.2 1 0l8.9-5.1c.3-.2.5-.5.5-.9v-4.6l3.7-2.1c.3-.2.5-.5.5-.9V9.2c0-.4-.2-.7-.5-.9zM5.3 3.4l3.2 1.8-3.2 1.8-3.2-1.8 3.2-1.8zm4.2 15.8l-7.4-4.3V6.9l3.2 1.8v7.1c0 .4.2.7.5.9l3.7 2.1v.4zm8.9-4.3l-7.4 4.3v-2l3.7-2.1c.3-.2.5-.5.5-.9v-3.7l3.2 1.8v2.6zm4.2-4.8l-3.2 1.8-3.2-1.8 3.2-1.8 3.2 1.8z',
    ],
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    primaryCategory: 'BACKEND',
    categories: ['BACKEND'],
    roleLabel: 'High-Speed Python APIs',
    description: 'Framework Python modern untuk membangun endpoint API cepat dengan validasi skema otomatis.',
    accentHex: '#009688',
    svgPaths: [
      'M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12 6.626 0 12-5.373 12-12 0-6.625-5.374-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z',
    ],
  },
  {
    id: 'rest-api',
    name: 'REST API',
    primaryCategory: 'BACKEND',
    categories: ['BACKEND'],
    roleLabel: 'Client-Server Communication',
    description: 'Arsitektur pertukaran data JSON antara client dan server melalui protokol HTTP standar.',
    accentHex: '#E60023',
    svgPaths: [
      'M4 6h16v3H4V6zm0 5h10v3H4v-3zm0 5h16v3H4v-3zm13-5l3 1.5-3 1.5v-3z',
    ],
  },

  // DATABASE (6)
  {
    id: 'mysql',
    name: 'MySQL',
    primaryCategory: 'DATABASE',
    categories: ['DATABASE'],
    roleLabel: 'Relational SQL Engine',
    description: 'Sistem manajemen basis data relasional populer untuk aplikasi web dan penyimpanan terstruktur.',
    accentHex: '#4479A1',
    svgPaths: [
      'M12 3C6.5 3 2 4.8 2 7v10c0 2.2 4.5 4 10 4s10-1.8 10-4V7c0-2.2-4.5-4-10-4zm0 2c4.4 0 8 1.1 8 2s-3.6 2-8 2-8-1.1-8-2 3.6-2 8-2zm0 14c-4.4 0-8-1.1-8-2v-2.6c1.8 1 4.7 1.6 8 1.6s6.2-.6 8-1.6V17c0 .9-3.6 2-8 2zm0-5c-4.4 0-8-1.1-8-2V9.4c1.8 1 4.7 1.6 8 1.6s6.2-.6 8-1.6V12c0 .9-3.6 2-8 2z',
    ],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    primaryCategory: 'DATABASE',
    categories: ['DATABASE'],
    roleLabel: 'Advanced Relational Database',
    description: 'Database relasional open-source tangguh dengan dukungan tipe data JSONB dan integritas transaksi.',
    accentHex: '#4169E1',
    svgPaths: [
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4H8V7h5c2.21 0 4 1.79 4 4s-1.79 4-4 4v2zm0-6c1.1 0 2-.9 2-2s-.9-2-2-2h-3v4h3z',
    ],
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    primaryCategory: 'DATABASE',
    categories: ['DATABASE'],
    roleLabel: 'NoSQL Document Store',
    description: 'Basis data dokumen fleksibel berbasis JSON untuk skema aplikasi web yang berkembang dinamis.',
    accentHex: '#47A248',
    svgPaths: [
      'M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z',
    ],
  },
  {
    id: 'firebase',
    name: 'Firebase',
    primaryCategory: 'DATABASE',
    categories: ['DATABASE'],
    roleLabel: 'Realtime App Platform',
    description: 'Layanan autentikasi, penyimpanan realtime, dan infrastruktur backend tanpa server dari Google.',
    accentHex: '#FFCA28',
    svgPaths: [
      'M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z',
    ],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    primaryCategory: 'DATABASE',
    categories: ['DATABASE'],
    roleLabel: 'Open-Source Postgres BaaS',
    description: 'Platform database PostgreSQL instan dengan dukungan realtime, storage, dan autentikasi modern.',
    accentHex: '#3ECF8E',
    svgPaths: [
      'M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z',
    ],
  },
  {
    id: 'redis',
    name: 'Redis',
    primaryCategory: 'DATABASE',
    categories: ['DATABASE'],
    roleLabel: 'In-Memory Data Store',
    description: 'Penyimpanan key-value di dalam memori untuk caching super cepat dan manajemen sesi.',
    accentHex: '#DC382D',
    svgPaths: [
      'M12 2L2 7l10 5 10-5-10-5zm0 7.5L6 7l6-2.5L18 7l-6 2.5zm0 2.5l-10-5v4l10 5 10-5V7l-10 5zm0 6l-10-5v4l10 5 10-5v-4l-10 5z',
    ],
  },

  // TOOLS & PLATFORMS (8)
  {
    id: 'git',
    name: 'Git',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Distributed Version Control',
    description: 'Sistem kontrol versi untuk melacak perubahan kode, branching, dan riwayat pengembangan.',
    accentHex: '#F05032',
    svgPaths: [
      'M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187',
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Code Hosting & Collaboration',
    description: 'Rumah repositori project LEOVAN (@vannn626-afk), manajemen rilis, dan kolaborasi kode.',
    accentHex: '#FFFFFF',
    svgPaths: [
      'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    ],
  },
  {
    id: 'vscode',
    name: 'VS Code',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Primary Code Editor',
    description: 'Editor utama untuk menulis kode TypeScript, React, dan melakukan debugging harian.',
    accentHex: '#007ACC',
    svgPaths: [
      'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z',
    ],
  },
  {
    id: 'android-studio',
    name: 'Android Studio',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Mobile App IDE',
    description: 'Lingkungan pengembangan terpadu untuk eksperimen pembuatan dan pengujian aplikasi Android.',
    accentHex: '#3DDC84',
    svgPaths: [
      'M12 2a3 3 0 0 0-3 3c0 1.1.6 2.1 1.5 2.6L8.2 12H5v2h2.1l-3.6 7.1 1.8.9L8.9 14h6.2l3.6 8 1.8-.9L16.9 14H19v-2h-3.2l-2.3-4.4c.9-.5 1.5-1.5 1.5-2.6a3 3 0 0 0-3-3zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-1.6 8L12 8.9 13.6 12h-3.2z',
    ],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Edge Cloud Deployment',
    description: 'Platform deployment utama untuk mempublikasikan aplikasi Next.js dan project web secara global.',
    accentHex: '#FFFFFF',
    svgPaths: ['M24 22.525H0l12-21.05 12 21.05z'],
  },
  {
    id: 'netlify',
    name: 'Netlify',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Automated Web Hosting',
    description: 'Hosting cepat dan integrasi CI/CD otomatis untuk project web statis maupun jamstack.',
    accentHex: '#00C7B7',
    svgPaths: [
      'M16.9 8.5h-2.4l-1.9-4.8-1.2 1.2 1.8 4.4H8.8l1.8-4.4-1.2-1.2-1.9 4.8H5.1L3.9 9.7h3.1l-1.9 4.6H2l1.2 1.2h1.4l-1.5 3.6 1.2 1.2 2-4.8h5.4l2 4.8 1.2-1.2-1.5-3.6h1.4l1.2-1.2h-3.1l-1.9-4.6h3.1l-1.2-1.2zm-6.1 5.8l1.2-3 1.2 3h-2.4z',
    ],
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'DNS, CDN & Edge Security',
    description: 'Pengelolaan domain kustom (.my.id & .web.id), akselerasi CDN global, dan proteksi jaringan.',
    accentHex: '#F38020',
    svgPaths: [
      'M16.5 16.5h-11c-2.2 0-4-1.8-4-4 0-1.9 1.4-3.6 3.2-3.9C5.4 5.9 7.8 4 10.6 4c3.1 0 5.7 2.3 6.1 5.4.3-.1.6-.1.9-.1 2.1 0 3.9 1.7 3.9 3.8 0 1.9-1.5 3.4-3.5 3.4h-1.5z',
    ],
  },
  {
    id: 'figma',
    name: 'Figma',
    primaryCategory: 'TOOLS & PLATFORMS',
    categories: ['TOOLS & PLATFORMS'],
    roleLabel: 'Interface & Vector Design',
    description: 'Eksplorasi tata letak UI/UX, penyusunan sistem tipografi, dan pembuatan aset vektor.',
    accentHex: '#F24E1E',
    svgPaths: [
      'M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zM4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4zm0-8c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4zm8-4h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0zm4 16c2.208 0 4-1.792 4-4s-1.792-4-4-4-4 1.792-4 4 1.792 4 4 4z',
    ],
  },
];
