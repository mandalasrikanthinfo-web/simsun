# SIMSUN Technologies website

React (Vite) frontend · Python FastAPI registration API · GitHub Pages + Cloudflare hosting.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
```
Edit phone, address and email in `config.js`. Text for services and industries lives in `data.js`. All source files sit in the repository root so they can be edited directly on GitHub.

## Registration emails
The form emails every request to **mandalasrikanthinfo@gmail.com**.

* **Default (`formMode: 'formsubmit'`)** – no server needed, works on GitHub Pages. The *first* request sends an
  activation email from FormSubmit to that inbox: click **Activate Form** once, and every later request arrives as a table email.
* **Python API (`formMode: 'api'`)** – `backend_main.py` stores each enquiry in SQLite and sends two emails
  (to you, and an acknowledgement to the visitor) through Gmail SMTP.
  ```bash
  pip install -r backend_requirements.txt
  # set SMTP_USER / SMTP_PASS (Gmail App Password) and NOTIFY_EMAIL as environment variables
  uvicorn backend_main:app --host 0.0.0.0 --port 8000
  ```
  Host it on Render / Railway / an Azure or AWS VM, then set `apiUrl` in `config.js`.

## Live hosting (Cloudflare, synced with GitHub)
`wrangler.jsonc` tells Cloudflare to run `npm run build` and serve `./dist`.
The Cloudflare project **simsun** is connected to this repo, so every commit to `main` rebuilds and redeploys the site
at `https://simsun.<your-subdomain>.workers.dev` (add a custom domain under the project's **Domains** tab).

## Publish on GitHub Pages
1. Create a GitHub repo (e.g. `simsun-website`) and push this folder to the `main` branch.
2. Repo **Settings → Pages → Source: GitHub Actions**. The included workflow builds and deploys on every push.
3. Site appears at `https://<username>.github.io/simsun-website/`.

## Custom domain through Cloudflare
1. Buy a domain (e.g. `simsuntech.com`) and add it to Cloudflare (free plan); change the registrar's nameservers to Cloudflare's.
2. In Cloudflare **DNS** add:
   * `CNAME  www  <username>.github.io` (proxied)
   * `A  @  185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. GitHub repo **Settings → Pages → Custom domain**: `www.simsuntech.com`, tick **Enforce HTTPS**.
4. Cloudflare **SSL/TLS → Full**.

*Alternative:* Cloudflare **Workers & Pages → Create → Pages → Connect to Git**, build command `npm run build`, output `dist`.

## ASP.NET option
The API contract is one endpoint (`POST /api/register` with the JSON fields in `backend/main.py`).
An ASP.NET Core minimal API with the same contract can replace the Python backend without frontend changes.
