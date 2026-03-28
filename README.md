# Personal website (React + Vite)

Personal homepage built with **React** and **Vite**, deployable to **GitHub Pages**.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (with `base: '/Personal_Website/'`, use  
`http://localhost:5173/Personal_Website/`).

## Production build (local check)

```bash
npm run build
npm run preview
```

Then open the preview URL **including** the `/Personal_Website/` path.

## Deploy to GitHub Pages

1. **`vite.config.js`** — `base` is set to `/Personal_Website/` so asset paths match  
   `https://<username>.github.io/Personal_Website/`.  
   If you rename the repository, change `base` to `/<new-repo-name>/`.

2. **Repository Settings → Pages**  
   - **Source**: **GitHub Actions** (not “Deploy from a branch”).  
   - Push to `main`; the workflow **Deploy site to GitHub Pages** builds `dist` and publishes it.

3. After the workflow succeeds, the site URL is:

   `https://<your-github-username>.github.io/Personal_Website/`

## Files

- `src/App.jsx` — page content  
- `src/App.css` — styles  
- `.github/workflows/deploy-pages.yml` — CI build + Pages deploy  
