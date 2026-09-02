# Aishu's Birthday Portal

Build a personal, one-off interactive birthday card website called "For Aishu" — a fantasy-themed, 3D interactive experience (not a generic template, not a clone of any existing product). Use React Three Fiber / Three.js for real 3D elements layered into an otherwise 2D scrolling page.

CONCEPT: A magical "access pass" through five fandom worlds (Football ⚽, F1 🏎️, Anime ⚔️, K-pop 🎙️, K-drama 🎬, plus Hindi songs 🎵), built as a gift for one specific person, Aishu. Tone: warm, celebratory, a little mystical/fantasy — think holographic portals and glowing gateways between "worlds," not a corporate SaaS landing page.

VISUAL DIRECTION:
- Deep night-sky navy/indigo base (#0A0F1E) with drifting nebula-like gradients that slowly shift hue
- Each "world" section has its own 3D floating object made of glowing particles/wireframe: a low-poly F1 car, a spinning anime katana/emblem, a holographic mic stand, a k-drama rose, a football
- Typography: one bold condensed display face for headlines, one clean sans for body, one handwritten script for the personal letter — avoid generic SaaS type treatment (no all-caps eyebrow labels everywhere, no cliché gradient text)
- 3D tilt/parallax on scroll for these floating objects (react-three-fiber + drei), performant on mobile

SECTIONS (in order):
1. PIN lock gate — full-screen 3D portal/gate visual, "A little surprise awaits", "For Aishu", enter 4-digit PIN 0704 to unlock, hint text "the day this story secretly started ❤️", playful error message on wrong PIN ("That's not it — try once more 🌷")
2. Hero — after unlock, camera/scene transitions like a gate opening, headline "Happy Birthday Aishu"
3. 3D floating photo wall — polaroid-style photo planes floating in 3D space with slight rotation/drift, placeholder frames (I'll swap in real photos later), captions per photo
4. Song section — Spotify embed placeholder with a glowing 3D vinyl/record or soundwave visual behind it
5. Photo gallery — grid with lightbox, each tile badged by which "world" it belongs to
6. 3D interactive cake — a real 3D cake model (react-three-fiber), drag/swipe gesture to "cut" it, triggers a particle confetti explosion in mixed fandom colors, candle flame extinguishes
7. Love letter — handwritten script font, opens like an envelope, line-by-line reveal
8. Six flip cards, one per world (Football, F1, Anime, K-pop, K-drama, Mixed), 3D flip animation
9. Make-a-wish finale — 3D candle, blow-out interaction triggers a burst of glowing particles/stars
10. Closing screen — thank you note, share button, "text me back" message

TECHNICAL:
- React + TypeScript + Tailwind + react-three-fiber + drei for 3D, framer-motion for 2D transitions
- Mobile-first, must run smoothly on phones — keep 3D scenes lightweight (low-poly, particle-based rather than heavy meshes/textures)
- No backend/auth needed — PIN check is purely client-side, no real data storage required
- All copy is placeholder/editable — mark clearly where to swap in real photos, the real letter text, and a real Spotify link
- Respect prefers-reduced-motion by disabling continuous 3D drift/parallax

This is being built for one person as a personal gift, not as a multi-tenant product or public template.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f781ca70-14e7-4933-8392-8e6fe49732b0).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
