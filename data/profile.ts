export interface ProfileAttribute {
  label: string;
  value: string;
}

export interface FavoriteItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  svgType: 'noodle-bowl' | 'iced-tea' | 'spider-web' | 'mlbb-crest';
}

export const LEOVAN_PROFILE = {
  brandName: 'LEOVAN',
  brandIdentity: 'INDEPENDENT DEVELOPER',
  mainSlogan: 'CREATING BEYOND THE SCREEN.',
  secondarySlogan: 'FROM CURIOSITY TO CREATION.',
  heroTopLabel: 'INDEPENDENT DEVELOPER / INDONESIA',
  heroDescription:
    'Web & App Developer berusia 14 tahun dari Sukagumiwang, Indonesia. Berawal dari gabut, berkembang melalui eksperimen, coding, dan berbagai project digital.',
  statusIndicators: ['DEV', 'APP & WEB', 'INDONESIA'] as const,
  name: 'LEOVAN',
  realName: 'Mohammad Sofandi',
  knownAs: 'LEOVAN — Who knows as Mohammad Sofandi',
  age: 14,
  status: 'DEV',
  focus: 'APP & WEB',
  location: 'Sukagumiwang, Indramayu, Jawa Barat, Indonesia',
  shortLocation: 'SUKAGUMIWANG, INDRAMAYU',
  country: 'INDONESIA',
  game: 'MOBILE LEGENDS: BANG BANG',
  rank: 'IMMORTAL',
  characterAssetPath: '/images/leovan-main-character.png',
  biographyParagraphs: [
    'Halo, gue LEOVAN — Who knows as Mohammad Sofandi.',
    'Gue developer web dan app berusia 14 tahun asal Sukagumiwang, Indramayu, Jawa Barat.',
    'Awalnya cuma gabut, penasaran sama dunia coding, dan mulai mencoba vibe coding.',
    'Dari eksperimen kecil, akhirnya mulai membangun berbagai project digital sendiri.',
    'Sekarang gue terus belajar, bereksperimen, dan mengembangkan aplikasi, website, tools, serta pengalaman digital.',
    'Buat gue, coding bukan sekadar menulis kode. Tapi tentang menciptakan sesuatu yang bisa digunakan orang lain.',
  ],
  personalDataPanel: [
    { label: 'NAME', value: 'LEOVAN' },
    { label: 'KNOWN AS', value: 'MOHAMMAD SOFANDI' },
    { label: 'AGE', value: '14' },
    { label: 'STATUS', value: 'DEV' },
    { label: 'FOCUS', value: 'APP & WEB' },
    { label: 'LOCATION', value: 'SUKAGUMIWANG, INDRAMAYU' },
    { label: 'COUNTRY', value: 'INDONESIA' },
  ] satisfies ProfileAttribute[],
  favorites: [
    {
      id: 'fav-food',
      category: 'FAVORITE FOOD',
      title: 'MIE AYAM',
      subtitle: 'COMFORT FUEL',
      description: 'Seporsi mie ayam hangat jadi bahan bakar terbaik saat lagi ngulik kode dan eksperimen project baru.',
      svgType: 'noodle-bowl',
    },
    {
      id: 'fav-drink',
      category: 'FAVORITE DRINK',
      title: 'ES TEH',
      subtitle: 'DAILY REFRESH',
      description: 'Es teh dingin pendamping wajib di meja kerja waktu bangun web dan debugging tengah hari.',
      svgType: 'iced-tea',
    },
    {
      id: 'fav-character',
      category: 'FAVORITE CHARACTER',
      title: 'SPIDER-MAN',
      subtitle: 'ICONIC INSPIRATION',
      description: 'Karakter favorit karena kreativitas, kecepatan berpikir, dan semangat pantang menyerah.',
      svgType: 'spider-web',
    },
    {
      id: 'fav-game',
      category: 'GAME',
      title: 'MOBILE LEGENDS',
      subtitle: 'COMPETITIVE ARENA',
      description: 'Tempat mengasah strategi cepat, refleks tajam, dan fokus kompetitif hingga mencapai rank IMMORTAL.',
      svgType: 'mlbb-crest',
    },
  ] satisfies FavoriteItem[],
  journeyPhases: [
    {
      index: '01',
      title: 'BERAWAL DARI GABUT',
      subtitle: 'THE SPARK OF CURIOSITY',
      detail: 'Rasa penasaran tentang bagaimana website dan aplikasi bekerja memicu langkah pertama membuka editor dan mencoba vibe coding.',
    },
    {
      index: '02',
      title: 'EKSPERIMEN KECIL',
      subtitle: 'ITERATION & EXPLORATION',
      detail: 'Mencoba berbagai bahasa pemrograman, framework web, dan logika interaktif untuk memahami fondasi pengembangan digital.',
    },
    {
      index: '03',
      title: 'MEMBANGUN PROJECT DIGITAL',
      subtitle: 'REAL DEPLOYMENTS',
      detail: 'Melahirkan LEOVAN | TOOLS dan LEOVAN | AI sebagai platform nyata yang bisa langsung diakses dan digunakan orang lain.',
    },
  ],
};
