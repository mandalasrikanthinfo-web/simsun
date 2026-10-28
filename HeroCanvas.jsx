import { useEffect, useRef } from 'react'

// Light hero ambience: soft "data pixels" in the brand palette drifting upward like warm air at sunrise.
export default function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const COLORS = ['#F36B16', '#D4A017', '#F7B531', '#0B2D5B', '#7FA3D6']
    let w = 0, h = 0, raf = 0, pixels = []
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const spawn = (anywhere) => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 20,
      vy: -(0.12 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 0.12,
      size: 4 + Math.floor(Math.random() * 4) * 3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      a: 0.08 + Math.random() * 0.22,
      depth: 0.3 + Math.random(),
      spin: Math.random() * Math.PI,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      pixels = Array.from({ length: Math.round(Math.min(70, w / 18)) }, () => spawn(true))
    }

    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i]
        p.x += p.vx; p.y += p.vy * p.depth; p.spin += 0.002
        if (p.y < -30) { pixels[i] = spawn(false); continue }
        const edge = Math.min(1, p.y / (h * 0.25), (h - p.y) / (h * 0.15))
        ctx.globalAlpha = Math.max(0, p.a * edge)
        ctx.fillStyle = p.c
        const s = p.size * p.depth
        ctx.save()
        ctx.translate(p.x + mouse.x * 24 * p.depth, p.y + mouse.y * 16 * p.depth)
        ctx.rotate(Math.sin(p.spin) * 0.2)
        ctx.fillRect(-s / 2, -s / 2, s, s)
        ctx.restore()
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove) }
  }, [])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
