"""SIMSUN Technologies - registration API (FastAPI).

POST /api/register  -> validates the enquiry, stores it in SQLite, emails it to NOTIFY_EMAIL
                       and sends an acknowledgement to the person who registered.
Run:  pip install -r requirements.txt  &&  uvicorn main:app --host 0.0.0.0 --port 8000
"""
import os, sqlite3, smtplib, ssl, html
from datetime import datetime, timezone
from email.message import EmailMessage
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USER = os.getenv("SMTP_USER", "")          # Gmail address that sends the mail
SMTP_PASS = os.getenv("SMTP_PASS", "")          # Gmail App Password (not your normal password)
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "mandalasrikanthinfo@gmail.com")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
DB = os.getenv("DB_PATH", "enquiries.db")

app = FastAPI(title="SIMSUN Registration API")
app.add_middleware(CORSMiddleware, allow_origins=ALLOWED_ORIGINS, allow_methods=["POST", "GET"], allow_headers=["*"])


class Enquiry(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    org: str = Field("", max_length=160)
    industry: str = Field(min_length=2, max_length=80)
    service: str = Field(min_length=2, max_length=80)
    budget: str = Field("", max_length=60)
    message: str = Field("", max_length=4000)


def init_db():
    with sqlite3.connect(DB) as c:
        c.execute("""CREATE TABLE IF NOT EXISTS enquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT, name TEXT, email TEXT, phone TEXT,
            org TEXT, industry TEXT, service TEXT, budget TEXT, message TEXT)""")


def send_mail(to: str, subject: str, body_html: str, reply_to: str | None = None):
    if not (SMTP_USER and SMTP_PASS):
        print("SMTP not configured; skipping email to", to)
        return
    msg = EmailMessage()
    msg["From"] = f"SIMSUN Technologies <{SMTP_USER}>"
    msg["To"] = to
    msg["Subject"] = subject
    if reply_to:
        msg["Reply-To"] = reply_to
    msg.set_content("Please view this message in an HTML-capable email client.")
    msg.add_alternative(body_html, subtype="html")
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=ssl.create_default_context()) as s:
        s.login(SMTP_USER, SMTP_PASS)
        s.send_message(msg)


def notify(e: Enquiry):
    rows = "".join(
        f"<tr><td style='padding:6px 12px;color:#55657C'>{k}</td><td style='padding:6px 12px'><b>{html.escape(v or '-')}</b></td></tr>"
        for k, v in [("Name", e.name), ("Email", e.email), ("Phone", e.phone), ("Organisation", e.org),
                     ("Industry", e.industry), ("Service", e.service), ("Budget", e.budget), ("Details", e.message)])
    send_mail(NOTIFY_EMAIL, f"New SIMSUN enquiry: {e.name} ({e.industry})",
              f"<h2 style='color:#0B2D5B'>New registration</h2><table>{rows}</table>", reply_to=e.email)
    send_mail(e.email, "We received your request - SIMSUN Technologies",
              f"<p>Hi {html.escape(e.name)},</p><p>Thank you for contacting SIMSUN Technologies about "
              f"<b>{html.escape(e.service)}</b>. Our team will reply within one business day.</p>"
              f"<p>Regards,<br>SIMSUN Technologies</p>")


@app.on_event("startup")
def startup():
    init_db()


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/register")
def register(e: Enquiry, tasks: BackgroundTasks):
    try:
        with sqlite3.connect(DB) as c:
            c.execute("INSERT INTO enquiries (created_at,name,email,phone,org,industry,service,budget,message) VALUES (?,?,?,?,?,?,?,?,?)",
                      (datetime.now(timezone.utc).isoformat(), e.name, e.email, e.phone, e.org, e.industry, e.service, e.budget, e.message))
    except sqlite3.Error as err:
        raise HTTPException(500, "Could not save your request") from err
    tasks.add_task(notify, e)
    return {"status": "received"}
