import type { Metadata } from 'next';
import './globals.css';
import { PortfolioShell } from '../components/navigation/PortfolioShell';

const siteUrl = process.env.APP_URL || 'https://leovan.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LEOVAN — 3D Cinematic Developer Portfolio',
    template: '%s | LEOVAN',
  },
  description:
    'LEOVAN — Independent Web & App Developer from Sukagumiwang, Indramayu, Indonesia. Explore projects, technologies, and digital experiences.',
  icons: {
    icon: '/icons/lv.svg',
    shortcut: '/icons/lv.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LEOVAN — 3D Cinematic Developer Portfolio',
    description:
      'LEOVAN — Independent Web & App Developer from Sukagumiwang, Indramayu, Indonesia. Explore projects, technologies, and digital experiences.',
    url: siteUrl,
    siteName: 'LEOVAN',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/leovan-main-character.png',
        width: 1200,
        height: 630,
        alt: 'LEOVAN — Creating Beyond The Screen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEOVAN — 3D Cinematic Developer Portfolio',
    description:
      'LEOVAN — Independent Web & App Developer from Sukagumiwang, Indramayu, Indonesia. Explore projects, technologies, and digital experiences.',
    images: ['/images/leovan-main-character.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'LEOVAN',
    jobTitle: 'Independent Web & App Developer',
    description:
      'Independent Web & App Developer from Sukagumiwang, Indramayu, Jawa Barat, Indonesia. Creating Beyond The Screen.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sukagumiwang, Indramayu',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    email: 'mailto:vannn626@gmail.com',
    url: siteUrl,
    sameAs: [
      'https://github.com/vannn626-afk',
      'https://leovan.my.id',
      'https://leovandyz.web.id',
    ],
  };

  return (
    <html lang="id" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-body bg-[#080808] text-white antialiased">
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
