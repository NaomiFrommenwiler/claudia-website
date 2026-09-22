# Claudia Meier — Lebensbegleiterin

One-page site. Static HTML, CSS and vanilla JavaScript — no build step for the
site itself, no dependencies. Open `index.html`, or upload the folder to any host.

```
index.html          the site
css/style.css
js/main.js
images/             the real photographs
build-preview.py    reshapes the site for the hosted Artifact preview
build-standalone.py bundles everything into one openable .html
```

## The photographs

All real, from the repository. `detail-begegnung.jpg` is a tall crop of the
same frame as the hero — two crops of one picture read as a sequence; the same
crop twice would read as a mistake. `texture-quote.jpg` is built from two tiles
of the mood board, pampas on the left flowing into silk on the right, blended
across a wide feather so they meet without a seam.

Re-cut any of them by re-running the crops in the project history; the originals
sit in the repository root.

## Colours

Ivory `#FCFAF6` · Cream `#F6F1E9` · Sand `#EDE4D7` · Almond `#DDD0BE` ·
Stone `#A8968A` · Clay `#8C7A6C` · Umber `#6B5B50` · Espresso `#4A3E36`

**Two of these have a ceiling.** Clay measures 3.7:1 on Cream — fine for a
heading or an oversized numeral, never a caption. Stone measures 2.5:1 and is
decorative only: hairlines and borders. Tinting a label with either is the
mistake this palette invites.

The three headline lines step lighter on purpose: `#5E4A42`, `#776257`,
`#8C7A6C` — measured at 6.3:1, 4.4:1 and 3.2:1 against the wall in the
photograph. The third is as pale as the ladder can go and stay readable.

## Type

Cormorant (300) for the three hero words, Cormorant Garamond for every other
heading, Karla for navigation and body copy, Beau Rivage for her name — which
appears once, in the header, and nowhere else.

## The hero

A sticky stage of 190vh. **At rest the photograph is completely untouched** —
no blur, no veil, no fade. Everything is tied to `--p` (0 → 1), so the
softening only begins once the page is actually moving: the image scales to
1.05, blurs to 9px, loses a little opacity, a warm wash rises, and the bottom
edge dissolves so the next section emerges from the photograph rather than
cutting it off.

On phones the headline sits low, over the photograph rather than over open
wall, so it keeps a quiet backing even at rest — the scroll-driven fade is not
there yet at that point. Measured at rest on a 390px screen: 6.9, 4.8 and
3.4:1.

Every block of text arrives on a short soft motion, nine pixels over 0.62s.
It is scoped to `html.js`, so a document whose script never runs shows all of
its text.

## Contact — WhatsApp, and the phone number

There is no contact form and no e-mail address. The contact panel is a single
button that opens WhatsApp with an opening line already written, which is a
much lower barrier than a blank box for someone writing about something
difficult. The line is editable before sending, as WhatsApp always allows.

**The phone number appears in exactly four places, all in `index.html`.**
Search for `41790000000` — the current value is a placeholder:

| Where | Format |
|---|---|
| Kontakt, running text | `tel:+41790000000` and the visible `+41 79 000 00 00` |
| "Nachricht senden" button | `https://wa.me/41790000000?text=…` |
| Below the button | `tel:+41790000000` |
| Footer | `tel:+41790000000` and `https://wa.me/41790000000` |

Two formats, and they differ on purpose:

- `tel:` keeps the leading `+` → `tel:+41791234567`
- `wa.me/` takes **no** `+`, no spaces, no leading zero → `wa.me/41791234567`

A `+` or a space in a `wa.me` link gives the visitor an error page instead of
a chat, so it is worth checking that one by eye after changing it.

The `?text=` part is URL-encoded. To change the opening line, encode it first
(spaces become `%20`, `ö` becomes `%C3%B6`) or the link breaks at the first space.

## Contact form

`js/main.js` starts with two lines. `CONTACT_EMAIL` is where messages go.
`FORM_ENDPOINT` is empty, so the form opens the visitor's mail programme with
everything filled in — works on static hosting with no backend. Paste a
Formspree / Getform / Basin URL there and it posts straight to the inbox
instead; nothing else changes. A hidden honeypot catches the common bots.

## Still to fill in

The phone number is a placeholder — see the table above for all four places.

The hero tagline says *Deine*, the body copy says *Sie*. One of them should move.
