# Farhan Amin — portfolio

Source for <https://crazycatz67.github.io/>: a home page plus one case study per project.
This is a GitHub Pages *user site* (repo `Crazycatz67.github.io`), so it is served from the root of
that domain and the live apps sit beside it at `/asl-recognizer/` and `/hologram-workshop/`.
The live apps keep their own URLs ([ASL Recognizer](https://crazycatz67.github.io/asl-recognizer/),
[Hologram Workshop](https://crazycatz67.github.io/hologram-workshop/)); this site only links to them
and never opens the camera itself.

Plain HTML, CSS and a few lines of JavaScript. No framework, no build step, no external scripts or fonts.

## Preview locally

```sh
cd ~/Developer/portfolio
python3 -m http.server 8095
# open http://localhost:8095/
```

All links are relative, so the same files work at `localhost:8095/` and at the GitHub Pages root.
The one exception is `404.html`, which uses root paths (`/css/site.css`) because GitHub Pages serves
it at whatever URL was missing.

## Layout

| Path | What |
| --- | --- |
| `index.html` | Home: hero, 3 project cards, about, contact |
| `projects/{asl,hologram,neurotech}/index.html` | Case studies |
| `404.html` | Not-found page, links back to Projects |
| `css/site.css` | All styles (dark tokens shared with the apps) |
| `js/site.js` | Owner settings (LinkedIn, photo) + demo-video start |
| `assets/` | Resume PDF, hologram images, social card (`og.svg` source → `og.png`, 1200×630) |
| `docs/` | Copy drafts and team notes. **Git-ignored** (listed in `.gitignore`), so it is never pushed or published |

## Owner to-dos

- **Photo:** add `assets/photo.jpg` (square, ~600 px), then set `PHOTO_URL = 'assets/photo.jpg'`
  at the top of `js/site.js`. Until then the About section shows an "FA" monogram.
- **LinkedIn:** set `LINKEDIN_URL` at the top of `js/site.js`; the links stay hidden while it's empty.
- **Screenshots / demo videos:** each media box (`<div class="media" data-media-slot="...">`; slots:
  `asl-card`, `asl-demo`, `hologram-card`, `hologram-demo`, `neurotech-card`, `neurotech-diagram`)
  keeps its wrapper div. Replace what is inside it (the placeholder poster or image) with an `<img>` (give it `width`, `height` and `alt`), or with a muted loop:

  ```html
  <video data-demo muted loop playsinline preload="metadata" poster="../../assets/asl-poster.webp" width="1280" height="720">
    <source src="../../assets/asl-demo.webm" type="video/webm">
    <source src="../../assets/asl-demo.mp4" type="video/mp4">
  </video>
  ```

  Leave out `autoplay`: `js/site.js` starts the video unless the visitor prefers reduced motion,
  in which case it shows the poster with controls. Use MP4/WebM, never GIF.
- **Social card:** after editing `assets/og.svg`, re-render `og.png` at 1200×630 (any headless
  browser screenshot works).

## Deploy

GitHub repo `Crazycatz67/Crazycatz67.github.io`, Settings → Pages → deploy from `main` / root.
