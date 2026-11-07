export interface ContactChannel {
  id: 'email' | 'github' | 'whatsapp-channel';
  label: string;
  title: string;
  value: string;
  href: string;
  ctaLabel: string;
  description: string;
  isExternal: boolean;
}

export const LEOVAN_CONTACTS = {
  headline: "LET'S CREATE SOMETHING.",
  description: "Got an idea? Let's turn it into something real.",
  email: 'vannn626@gmail.com',
  githubUrl: 'https://github.com/vannn626-afk',
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VbEFmPM6buMLQgdlie1J',
  channels: [
    {
      id: 'email',
      label: 'DIRECT ELECTRONIC MAIL',
      title: 'EMAIL',
      value: 'vannn626@gmail.com',
      href: 'mailto:vannn626@gmail.com',
      ctaLabel: 'SEND EMAIL',
      description: 'Hubungi langsung lewat email untuk diskusi ide, kolaborasi, atau feedback project.',
      isExternal: false,
    },
    {
      id: 'github',
      label: 'SOURCE REPOSITORY & CODE',
      title: 'GITHUB',
      value: 'github.com/vannn626-afk',
      href: 'https://github.com/vannn626-afk',
      ctaLabel: 'VIEW GITHUB PROFILE',
      description: 'Lihat repositori kode, eksperimen pengembangan, dan jejak eksplorasi open-source LEOVAN.',
      isExternal: true,
    },
    {
      id: 'whatsapp-channel',
      label: 'PUBLIC BROADCAST FEED',
      title: 'WHATSAPP CHANNEL',
      value: 'LEOVAN Official Channel',
      href: 'https://whatsapp.com/channel/0029VbEFmPM6buMLQgdlie1J',
      ctaLabel: 'JOIN MY CHANNEL',
      description: 'Ikuti saluran resmi WhatsApp untuk update rilis project, tools baru, dan eksperimen digital terbaru.',
      isExternal: true,
    },
  ] satisfies ContactChannel[],
};
