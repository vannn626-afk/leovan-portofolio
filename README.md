# LEOVAN — THE DIGITAL PERSONA

**3D Cinematic Developer Portfolio** built with **Next.js (App Router)**, **TypeScript**, **Three.js**, **GSAP**, **Motion**, and **Tailwind CSS**.

- **Brand**: LEOVAN — Independent Developer
- **Slogan**: *CREATING BEYOND THE SCREEN. / FROM CURIOSITY TO CREATION.*
- **Location**: Sukagumiwang, Indramayu, Jawa Barat, Indonesia

---

## Key Features & Architecture

1. **Original Branding & Logo System**:
   - Custom vector SVG `LEOVAN` wordmark (`public/icons/leovan.svg`) and `LV` monogram (`public/icons/lv.svg`), plus `app/icon.svg` favicon.
   - Procedural 7-part 3D `LV` monogram (`components/three/GlobalThreeScene.tsx`) with metallic obsidian & brushed titanium materials, crimson razor slash, `RoomEnvironment` PBR reflections, and floating angular shard `InstancedMesh` field.
2. **2.5D Protagonist Showcase**:
   - Uses the exact supplied character artwork (`public/images/leovan-main-character.png`) with multi-layer 2.5D depth parallax, comic slash backing, and mouse-responsive tilt.
3. **Complete Multi-Route Experience**:
   - `/` — Complete cinematic homepage
   - `/about` — Behind the Code biography & Off the Grid personality showcase
   - `/stack` — The Arsenal interactive technology filter & search across 41 technologies
   - `/projects` — The Archive featuring **PROJECT 001: LEOVAN | TOOLS** (`https://leovan.my.id`) and **PROJECT 002: LEOVAN | AI** (`https://leovandyz.web.id`)
   - `/achievements` — Beyond Development: Mobile Legends: Bang Bang (`IMMORTAL` rank)
   - `/contact` — Direct email (`vannn626@gmail.com`), one-click email copy, GitHub (`https://github.com/vannn626-afk`), and official WhatsApp Channel.
4. **Procedural Web Audio Sound System**:
   - Optional UI sound effects (`SFX OFF` by default, toggleable in the header, persisted in `localStorage`).

---

## Local Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npx --yes tsx --test lib/portfolio-logic.test.ts

# 3. Start development server on port 3000
npm run dev

# 4. Build for production
npm run build
npm run start
```

---

## Deploying to Vercel

1. Push this repository to GitHub (`https://github.com/vannn626-afk`).
2. Open [Vercel](https://vercel.com/new) and import the repository.
3. Framework Preset will automatically detect **Next.js**.
4. Optionally set the environment variable `APP_URL` to your production domain (e.g., `https://leovan.my.id`).
5. Click **Deploy**.
