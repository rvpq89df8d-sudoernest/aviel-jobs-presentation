# Aviel Jobs — Presentation Context

## Mission

High-end **13-slide** presentation for Aviel Jobs.
Default language: **Hebrew, RTL**. Optional English via a Translate toggle.
Shareable as a static `dist/` ZIP or Vercel/Netlify host (`npm run build`).

Keep the installed engine intact: Vite, Tailwind, Framer Motion, GSAP, Lenis, Pixi.js, pixi-filters, Remotion, `python-vision/`.
Do **not** uninstall those libraries. Do **not** create a second deck file. Refactor `Presentation.tsx` / `slides.tsx` in place.

---

## Absolute prohibitions

1. **Zero uninstalls.** Refactor only.
2. **No duplicate routers or decks** (`SlideDeckV2.tsx`, `NewPresentation.tsx`, etc.).
3. **No RTL clipping.** Logical padding (`ps/pe/ms/me`), `min-w-0`, `overflow-x-visible` on text/UI, no cutoff at either edge.
4. **Ban on "זכוכית אחת"** and any "single pane of glass" calque. Use **מרכז שליטה ובקרה אחוד** or **מערכת ניהול מרכזית**.
5. **No generic empty boxes** on workflow slides. Real Hebrew UI text, table rows, candidate cards, action buttons.
6. **Recordly simulation:** fake mouse cursor → click a real control → Pixi.js motion-blur zoom into that target.
7. **Manual navigation only.** No auto-advance timers. Progress by canvas click, Space / Left / Right, or bottom nav. Slide 1 badge: `נווט באמצעות לחיצת עכבר, מקלדת, או כפתורי הניווט`.

## Deployment

- Vite `base: './'`
- Live URL: `https://avieljobs.co.il`
- CTA: **למערכת הלייב** / **Live System**

## Legal / compliance

### LOCAL — Israel (בארץ)

Hebrew: **ראיונות/ייעוץ וידאו** and **ראיונות עבודה דיגיטליים** where the split slide is explicit.

### GLOBAL — Abroad and any English toggle

NEVER: "Job Interviews".
Business: **Business Consulting connecting to the business** / **ייעוץ מחבר לבית העסק**
Candidate: **ייעוץ מקצועי למועמדים לחיבורים בין מועמד למעסיק על דעת המועמד בעצמו בפלטפורמה**

## Privacy

Blur counts, phones, emails, user IDs, client names. Admin panel in Hebrew only (**ניהול פלטפורמה**). Slide 2 may include the official Russian tagline because it is company copy, not leaked CRM data.

---

## 13-slide specification

1. **Hero** — Title: `אביאל ג׳ובס — שליטת סניפים גלובלית`. Subtitle: `פלטפורמת הניהול המתקדמת למעסיקים ולסניפים ברחבי העולם`. Parallax HUD + nav badge.
2. **About א.ו אביאל בע״מ** — exact official copy. Asia and Europe only; no city list.
3. **Shauli journey** — header only in code. Images `public/journey/image_ab0fb8.jpg` (right, 0s), `image_ab0fdb.jpg` (center, 3s), `image_ab0ffa.jpg` (left, 6s). No captions under images. Framer arrows between them.
4. **Thinking** — `רגע... אז איך זה בעצם עובד?`
5. **Main dashboard Recordly** — real Hebrew UI, cursor clicks `משרות סניפים`, Pixi zoom into branch table, live CTA.
6. **Global intake** — London candidate on mobile → assign to branch in real time.
7. **Video consulting** — HE `ראיונות/ייעוץ וידאו`; EN consulting phrase. Cursor clicks a row → Pixi zoom.
8. **Dark TTNT CRM** — Kanban + WhatsApp. Click lead → webhook into Smart Warehouse.
9. **AI workforce** — exact המחסניה copy. Agents: אברהם, יחזקאל, שרה.
10. **Training Hub** — 14 NASA safety controls, hover/step highlight.
11. **Admin** — ניהול פלטפורמה, blurred metrics.
12. **Geo legal split** — Israel vs abroad language.
13. **Close** — `פלטפורמה אחת. סניפים אנושיים + עובדי AI. שליטה מלאה למעסיק.` + live CTA.

## Motion split

- Framer: slide enter/exit, 3s reveals, cursor, arrows, HUD, mouse-parallax
- GSAP: Recordly zoom progress
- Pixi: zoom-blur + motion-blur on click targets
- Remotion: live CTA composition (kept)
- Lenis: installed, unused for this UX
