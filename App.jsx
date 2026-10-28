import { useEffect, useRef, useState } from 'react'
import logoFull from './logo-full.webp'
import logoMark from './logo-mark.webp'
import Icon from './Icon.jsx'
import HeroCanvas from './HeroCanvas.jsx'
import { SITE } from './config.js'
import { NAV, SERVICES, INDUSTRIES, PROCESS, STACK, PROMISES } from './data.js'

const IS_PREVIEW = import.meta.env.MODE === 'single'
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Scroll reveal: only elements that start below the fold animate in, so the first screen is complete at rest. */
function useReveal() {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { rootMargin: '0px 0px -8% 0px' })
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('pre'); io.observe(el) }
    })
    return () => io.disconnect()
  }, [])
}

function Logo({ className = '' }) {
  return (
    <a href="#top" className={`logo ${className}`} aria-label="SIMSUN Technologies home">
      <img src={logoFull} alt="SIMSUN Technologies" width="826" height="246" />
    </a>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const close = () => setOpen(false)
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Main">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`} onClick={close}>{n.label}</a>)}
          <a href="#register" className="nav-mobile-cta" onClick={close}>Register</a>
        </nav>
        <a href="#register" className="btn btn-navy sm nav-cta">Register <Icon name="arrow" size={16} /></a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}><Icon name={open ? 'close' : 'menu'} size={22} /></button>
      </div>
    </header>
  )
}

function Rotator({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced()) return
    const id = setInterval(() => setI((x) => (x + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])
  return <span className="rotator" aria-live="polite"><span key={i} className="rot-word">{words[i]}</span></span>
}

const FLOATS = [
  { icon: 'building', k: 'Payroll processed', v: '248 employees', cls: 'f1' },
  { icon: 'cap', k: 'Exam results', v: 'Published', cls: 'f2' },
  { icon: 'heart', k: 'Appointments today', v: '164 booked', cls: 'f3' },
  { icon: 'cart', k: 'Online orders', v: '+38 this hour', cls: 'f4' },
]

function Hero() {
  const vis = useRef(null)
  const onMove = (e) => {
    if (!vis.current) return
    const r = vis.current.getBoundingClientRect()
    vis.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    vis.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  return (
    <section className="hero" id="top" onPointerMove={onMove}>
      <HeroCanvas />
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="chip"><span className="chip-dot" /> IT development · Consulting · Training · Digital marketing</p>
          <h1>Technology that rises with your <Rotator words={['business', 'college', 'school', 'hospital', 'store', 'startup']} /></h1>
          <p className="hero-lede">
            SIMSUN Technologies designs and builds ERP, academic, healthcare and retail software, websites and mobile apps,
            then helps you market them and train your people to use them well.
          </p>
          <div className="hero-ctas">
            <a href="#register" className="btn btn-sun">Start your project <Icon name="arrow" size={18} /></a>
            <a href="#industries" className="btn btn-light">Explore industries</a>
          </div>
          <ul className="hero-ticks">
            <li><Icon name="check" size={16} stroke={2.4} /> Free consultation</li>
            <li><Icon name="check" size={16} stroke={2.4} /> Fixed-scope quotes</li>
            <li><Icon name="check" size={16} stroke={2.4} /> You own the code</li>
          </ul>
        </div>
        <div className="hero-visual" ref={vis} aria-hidden="true">
          <div className="halo" />
          <div className="rays" />
          <div className="orbit o1"><i /></div>
          <div className="orbit o2"><i /></div>
          <div className="plate" />
          <img src={logoMark} alt="" className="hero-mark" />
          {FLOATS.map((f) => (
            <div key={f.k} className={`float-card ${f.cls}`}>
              <span className="fc-ic"><Icon name={f.icon} size={18} /></span>
              <span><small>{f.k}</small><b>{f.v}</b></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const items = ['React', 'Angular', 'Python', 'FastAPI', 'ASP.NET Core', 'SQL Server', 'PostgreSQL', 'AWS', 'Azure', 'Cloudflare', 'Flutter', 'Power BI', 'Docker', 'Node.js', 'Django', 'Next.js']
  return (
    <div className="marquee" aria-label="Technologies we use">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => <span key={i} className="mq-item" aria-hidden={i >= items.length}>{t}<i className="mq-sq" /></span>)}
      </div>
    </div>
  )
}

function SectionHead({ eyebrow, title, text, center }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lede">{text}</p>}
    </div>
  )
}

/* --- small animated visuals for the service bento --- */
const CODE = ['const school = await erp.connect("Sunrise Public School")', 'school.modules.enable(["admissions", "exams", "fees"])', 'await school.publish("results", { semester: 5 })', '// ✓ 1,240 parents notified by SMS & email']
function VisCode() {
  return (
    <div className="vis-code">
      <div className="vc-bar"><i /><i /><i /><span>simsun-erp.js</span></div>
      {CODE.map((l, i) => <code key={i} style={{ '--i': i }}><em>{i + 1}</em>{l}</code>)}
    </div>
  )
}
function VisCloud() {
  return (
    <div className="vis-cloud">
      <span className="vc-core"><Icon name="cloud" size={30} /></span>
      {['AWS', 'Azure', 'CDN'].map((t, i) => <span key={t} className="vc-node" style={{ '--i': i }}>{t}</span>)}
    </div>
  )
}
function VisChart() {
  return (
    <svg className="vis-chart" viewBox="0 0 200 90" preserveAspectRatio="none">
      <defs><linearGradient id="vcg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F36B16" stopOpacity=".35" /><stop offset="1" stopColor="#F36B16" stopOpacity="0" /></linearGradient></defs>
      <path d="M0 75 L30 62 L60 66 L90 44 L120 50 L150 28 L200 12 L200 90 L0 90 Z" fill="url(#vcg)" />
      <path className="vc-line" d="M0 75 L30 62 L60 66 L90 44 L120 50 L150 28 L200 12" fill="none" stroke="#F36B16" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="200" cy="12" r="4" fill="#0B2D5B" />
    </svg>
  )
}
function VisDevices() {
  return (
    <div className="vis-devices">
      <div className="vd-laptop"><div className="vd-screen"><span className="vd-hero" /><span className="vd-line" /><span className="vd-line s" /><div className="vd-cards"><i /><i /><i /></div></div></div>
      <div className="vd-phone"><span className="vd-notch" /><span className="vd-hero" /><span className="vd-line" /><span className="vd-btn" /></div>
    </div>
  )
}
function VisFunnel() {
  return (
    <div className="vis-funnel">
      {[['Impressions', '48,200', 100], ['Clicks', '3,140', 62], ['Enquiries', '486', 34]].map(([k, v, w], i) => (
        <div key={k} className="vf-row" style={{ '--w': `${w}%`, '--i': i }}><span>{k}</span><b>{v}</b></div>
      ))}
    </div>
  )
}
function VisRing() {
  return (
    <div className="vis-ring">
      <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" className="vr-bg" /><circle cx="40" cy="40" r="32" className="vr-fg" /></svg>
      <span><b>86%</b><small>course complete</small></span>
    </div>
  )
}
const VIS = [VisCode, VisCloud, VisChart, VisDevices, VisFunnel, VisRing]

function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <SectionHead eyebrow="What we do" title="Six practices. One accountable team." text="Whether you need a single website or a complete ERP, the same team scopes it, builds it, launches it and supports it." />
        <div className="bento">
          {SERVICES.map((s, i) => {
            const V = VIS[i]
            return (
              <article key={s.title} className={`tile t${i + 1}`} data-reveal style={{ '--i': i % 3 }}>
                <div className="tile-copy">
                  <span className="tile-ic"><Icon name={s.icon} size={22} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
                <div className="tile-vis"><V /></div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function MockScreen({ ind }) {
  const m = ind.mock
  const max = Math.max(...m.bars)
  return (
    <div className="mock">
      <div className="mock-bar"><i /><i /><i /><span>{m.title}</span><em>Sample screen</em></div>
      <div className="mock-body">
        <div className="mock-kpis">
          {m.kpis.map(([k, v], i) => <div key={k} className="kpi" style={{ '--i': i }}><span>{k}</span><b>{v}</b></div>)}
        </div>
        <div className="mock-chart">
          {m.bars.map((b, i) => (
            <div key={i} className="bar-col"><div className="bar" style={{ '--h': `${(b / max) * 100}%`, '--i': i }} /><span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</span></div>
          ))}
        </div>
        <ul className="mock-rows">
          {m.rows.map(([a, b, s], i) => <li key={a} style={{ '--i': i }}><span className={`pill ${s}`} />{a}<b>{b}</b></li>)}
        </ul>
      </div>
    </div>
  )
}

function Industries() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || reduced()) return
    const id = setInterval(() => setActive((a) => (a + 1) % INDUSTRIES.length), 6000)
    return () => clearInterval(id)
  }, [auto])
  const ind = INDUSTRIES[active]
  const pick = (i) => { setActive(i); setAuto(false) }
  const prefill = () => { const sel = document.getElementById('f-industry'); if (sel) sel.value = ind.name }
  return (
    <section className="section soft" id="industries">
      <div className="wrap">
        <SectionHead eyebrow="Industries we serve" title="Built for the way your sector works" text="Choose an industry to see the kind of system we deliver for it." center />
        <div className="ind-tabs" role="tablist" aria-label="Industries" data-reveal>
          {INDUSTRIES.map((x, i) => (
            <button key={x.key} role="tab" aria-selected={i === active} className={`ind-tab ${i === active ? 'on' : ''}`} onClick={() => pick(i)}>
              <Icon name={x.icon} size={18} />
              <span>{x.name}</span>
              {i === active && auto && <span className="ind-timer" />}
            </button>
          ))}
        </div>
        <div className="ind-panel" role="tabpanel" key={ind.key} data-reveal>
          <div className="ind-info">
            <p className="ind-short">{ind.short}</p>
            <h3>{ind.lead}</h3>
            <ul className="ind-points">
              {ind.points.map((p, i) => <li key={p} style={{ '--i': i }}><span className="tick"><Icon name="check" size={14} stroke={2.6} /></span>{p}</li>)}
            </ul>
            <a href="#register" className="btn btn-navy sm" onClick={prefill}>Discuss your project <Icon name="arrow" size={16} /></a>
          </div>
          <MockScreen ind={ind} />
        </div>
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section className="section statement">
      <div className="wrap">
        <h2 className="big-line" data-reveal>One partner for every screen your organisation runs on, <span className="sun-text">from the front desk to the boardroom.</span></h2>
        <div className="promises">
          {PROMISES.map((p, i) => <div key={p.text} className="promise" data-reveal style={{ '--i': i }}><b>{p.big}</b><span>{p.text}</span></div>)}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section soft" id="process">
      <div className="wrap">
        <SectionHead eyebrow="How we work" title="From first call to go-live in five steps" center />
        <ol className="steps">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="step" data-reveal style={{ '--i': i }}>
              <span className="step-num">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="section" id="stack">
      <div className="wrap stack-layout">
        <SectionHead eyebrow="Technology" title="Proven tools, chosen for your project" text="We pick the stack that fits your team, budget and hosting. React or Angular on the front end, Python or ASP.NET Core behind it, on the cloud you prefer." />
        <div className="stack-cards">
          {STACK.map((g, i) => (
            <div key={g.group} className="stack-card" data-reveal style={{ '--i': i }}>
              <h4>{g.group}</h4>
              <div className="chips">{g.items.map((it) => <span key={it}>{it}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const INITIAL = { name: '', email: '', phone: '', org: '', industry: '', service: '', budget: '', message: '' }

function Register() {
  const [f, setF] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | done | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (ev) => {
    ev.preventDefault()
    const data = { ...f, industry: document.getElementById('f-industry').value }
    const e = {}
    if (data.name.trim().length < 2) e.name = 'Enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address'
    if (!/^[+\d][\d\s-]{7,}$/.test(data.phone)) e.phone = 'Enter a phone number with at least 8 digits'
    if (!data.industry) e.industry = 'Choose your industry'
    if (!data.service) e.service = 'Choose a service'
    setErrors(e); if (Object.keys(e).length) return
    setState('sending')
    try {
      const res = SITE.formMode === 'api'
        ? await fetch(SITE.apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        : await fetch(`https://formsubmit.co/ajax/${SITE.notifyEmail}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ _subject: `New SIMSUN enquiry: ${data.name} (${data.industry})`, _template: 'table', _captcha: 'false', ...data }),
        })
      if (!res.ok) throw new Error('bad status')
      setState('done'); setF(INITIAL)
    } catch {
      setState('error')
    }
  }

  const field = (id, label, input, err) => (
    <label className={`field ${err ? 'has-err' : ''}`} htmlFor={id}>
      <span>{label}</span>{input}{err && <em className="err">{err}</em>}
    </label>
  )

  return (
    <section className="section register soft" id="register">
      <div className="wrap reg-layout">
        <div className="reg-side" data-reveal>
          <p className="eyebrow">Registration</p>
          <h2>Tell us about your project</h2>
          <p className="section-lede">Your request reaches our team by email the moment you submit it. We reply within one business day with next steps and a call slot.</p>
          <ol className="reg-steps">
            <li><span>1</span>You submit this form</li>
            <li><span>2</span>We email you to confirm</li>
            <li><span>3</span>Free 30-minute consultation</li>
            <li><span>4</span>Written scope and quote</li>
          </ol>
          <div className="reg-mail"><Icon name="mail" size={18} /><span>{SITE.notifyEmail}</span></div>
        </div>
        <form className="reg-form" onSubmit={submit} noValidate data-reveal>
          {state === 'done' ? (
            <div className="reg-done">
              <div className="done-ic"><Icon name="check" size={36} stroke={2.6} /></div>
              <h3>Request received</h3>
              <p>Thank you. Your details were emailed to the SIMSUN team, and we will contact you within one business day.</p>
              <button type="button" className="btn btn-navy sm" onClick={() => setState('idle')}>Send another request</button>
            </div>
          ) : (
            <>
              <div className="form-head"><img src={logoMark} alt="" /><div><b>Project registration</b><small>Fields marked * are required</small></div></div>
              <div className="form-grid">
                {field('f-name', 'Full name *', <input id="f-name" value={f.name} onChange={set('name')} autoComplete="name" placeholder="e.g. Ravi Kumar" />, errors.name)}
                {field('f-email', 'Email *', <input id="f-email" type="email" value={f.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" />, errors.email)}
                {field('f-phone', 'Phone / WhatsApp *', <input id="f-phone" type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="+91 98765 43210" />, errors.phone)}
                {field('f-org', 'Organisation', <input id="f-org" value={f.org} onChange={set('org')} autoComplete="organization" placeholder="Company, college or store" />)}
                {field('f-industry', 'Industry *',
                  <select id="f-industry" defaultValue="" onChange={set('industry')}>
                    <option value="" disabled>Select industry</option>
                    {INDUSTRIES.map((i) => <option key={i.key}>{i.name}</option>)}
                    <option>Other</option>
                  </select>, errors.industry)}
                {field('f-service', 'Service needed *',
                  <select id="f-service" value={f.service} onChange={set('service')}>
                    <option value="" disabled>Select service</option>
                    {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                    <option>Not sure yet</option>
                  </select>, errors.service)}
                {field('f-budget', 'Budget range',
                  <select id="f-budget" value={f.budget} onChange={set('budget')}>
                    <option value="">Prefer not to say</option>
                    <option>Under ₹50,000</option><option>₹50,000 – ₹2 lakh</option><option>₹2 – ₹10 lakh</option><option>Above ₹10 lakh</option>
                  </select>)}
                {field('f-message', 'Project details', <textarea id="f-message" rows="4" value={f.message} onChange={set('message')} placeholder="What should the system do? Any deadline?" />)}
              </div>
              {state === 'error' && (
                <p className="form-alert" role="alert">
                  {IS_PREVIEW
                    ? 'This preview cannot send email. On the live website this button emails your request to the SIMSUN team.'
                    : `We could not send your request just now. Please try again, or email us at ${SITE.notifyEmail}.`}
                </p>
              )}
              <button className="btn btn-sun wide" disabled={state === 'sending'}>
                {state === 'sending' ? <><span className="spinner" /> Sending…</> : <>Submit registration <Icon name="arrow" size={18} /></>}
              </button>
              <p className="form-note">We use your details only to respond to this enquiry.</p>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="cta-band" data-reveal>
          <span className="cta-mark"><img src={logoMark} alt="" /></span>
          <div className="cta-copy">
            <h2>Ready when you are.</h2>
            <p>Book a free consultation for your business, campus, hospital or store.</p>
          </div>
          <a href="#register" className="btn btn-sun">Register now <Icon name="arrow" size={18} /></a>
        </div>
        <div className="foot-grid">
          <div className="foot-brand">
            <Logo className="foot-logo" />
            <p>Software development, cloud, AI & data, web and mobile apps, digital marketing, training and consultancy.</p>
          </div>
          <div><h4>Industries</h4><ul>{INDUSTRIES.map((i) => <li key={i.key}><a href="#industries">{i.name}</a></li>)}</ul></div>
          <div><h4>Services</h4><ul>{SERVICES.map((s) => <li key={s.title}><a href="#services">{s.title}</a></li>)}</ul></div>
          <div>
            <h4>Contact</h4>
            <ul className="contact-list">
              <li><Icon name="mail" size={16} /><span>{SITE.notifyEmail}</span></li>
              <li><Icon name="phone" size={16} /><span>{SITE.phone}</span></li>
              <li><Icon name="pin" size={16} /><span>{SITE.city}</span></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} SIMSUN Technologies. All rights reserved.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Industries />
        <Statement />
        <Process />
        <Stack />
        <Register />
      </main>
      <Footer />
    </>
  )
}
