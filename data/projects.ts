export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  shortTitle: string;
  description: string;
  features: string[];
  category: string;
  url: string;
  cta: string;
  architectureNotes: string;
  highlights: { label: string; value: string }[];
}

export const LEOVAN_PROJECTS: ProjectItem[] = [
  {
    id: 'leovan-tools',
    number: '001',
    name: 'LEOVAN | TOOLS',
    shortTitle: 'DIGITAL UTILITY PLATFORM',
    description: 'Platform digital tools yang menghadirkan berbagai kebutuhan dalam satu tempat.',
    features: ['React Tools', 'AM Premium', 'Preset Finder'],
    category: 'WEB / DIGITAL TOOLS',
    url: 'https://leovan.my.id',
    cta: 'EXPLORE PROJECT',
    architectureNotes:
      'Dirancang untuk menyatukan berbagai kebutuhan kreator dan pengguna digital dalam satu ekosistem web yang cepat, responsif, dan praktis.',
    highlights: [
      { label: 'CORE MODULE 01', value: 'React Tools' },
      { label: 'CORE MODULE 02', value: 'AM Premium' },
      { label: 'CORE MODULE 03', value: 'Preset Finder' },
    ],
  },
  {
    id: 'leovan-ai',
    number: '002',
    name: 'LEOVAN | AI',
    shortTitle: 'INTELLIGENT PROBLEM SOLVER',
    description:
      'Platform AI untuk membantu pengguna menjawab pertanyaan, memahami masalah, mencari informasi, dan menemukan solusi.',
    features: [
      'Interactive Q&A Workspace',
      'Problem Breakdown & Analysis',
      'Information Discovery & Solutions',
    ],
    category: 'AI / WEB APPLICATION',
    url: 'https://leovandyz.web.id',
    cta: 'EXPLORE PROJECT',
    architectureNotes:
      'Fokus pada antarmuka percakapan yang bersih dan responsif agar pengguna bisa mencari informasi serta mengurai masalah secara langsung.',
    highlights: [
      { label: 'PRIMARY FOCUS', value: 'Question & Answer' },
      { label: 'REASONING FLOW', value: 'Problem Understanding' },
      { label: 'UTILITY GOAL', value: 'Solution Discovery' },
    ],
  },
];
