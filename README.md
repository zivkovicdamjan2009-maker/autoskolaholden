# Auto škola Holden

Sajt Auto škole Holden, Svetosavska 62, 22303 Novi Banovci.

## Struktura

- `index.html`: stranica (sav sadržaj, stilovi i logika)
- `js/support.js`: runtime koji prikazuje stranicu
- `js/ds-bundle.js`, `css/styles.css`: osnovni stilovi
- `assets/`: fotografije
- `.nojekyll`: da GitHub Pages servira fajlove bez obrade

## Objavljivanje na GitHub Pages

1. Napravi novi repozitorijum i uploaduj sadržaj ovog foldera u koren (root).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Sajt je dostupan za minut-dva na `https://<korisnik>.github.io/<repo>/`.

Za sopstveni domen (npr. holden.rs) dodaj ga u Settings → Pages → Custom domain.

## Napomene

- Sajt se otvara preko servera (GitHub Pages, Netlify, lokalno `npx serve`), ne duplim klikom na fajl.
- React, fontovi (Google Fonts) i mapa učitavaju se sa interneta.
- Kontakt forma trenutno nema backend.
