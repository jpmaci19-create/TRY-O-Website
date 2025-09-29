# TRY-O Website

Static marketing site for the TRY-O rechargeable charger brand. All public assets live inside the `docs/` directory so the project can be deployed directly with GitHub Pages (configured to serve from `/docs`).

## Local development

Open `docs/index.html` in your browser or serve the directory with any static file server, e.g.

```bash
python -m http.server --directory docs 3000
```

## Deployment

Ensure the `/docs` folder remains the publishing source. A `.nojekyll` file is included so GitHub Pages ships the raw HTML/CSS/JS without running the Jekyll pipeline that previously triggered build errors.
