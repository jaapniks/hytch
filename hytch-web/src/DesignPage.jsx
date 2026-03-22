import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Agentation } from 'agentation'
import { DialRoot, useDialKit } from 'dialkit'
import 'dialkit/styles.css'

const CARDS = [
  { label: 'Future\n& goals',     color: '#7B8CEB', wifi: true,      question: 'Where do you see yourself in 5 years?' },
  { label: 'Values &\nbeliefs',   color: '#6B4E9A', compass: true,   question: 'What values guide your decisions?' },
  { label: 'Live &\nhealth',      color: '#4A8A63', dna: true,       question: 'How do you take care of yourself?' },
  { label: 'Love &\nrelationship',color: '#C45550', heartbeat: true, question: 'What are you looking for in a partner?' },
  { label: 'Friends &\nfamily',   color: '#C49A40', flower: true,    question: 'How important is family to you?' },
  { label: 'Spicy',               color: '#8F4A6E',                  question: "What's your guilty pleasure?" },
  { label: 'You &\nme',           color: '#387878',                  question: 'What would our first date look like?' },
]

// 3 rings always visible — stagger controls how fast they fire after each other,
// duration controls how slowly each ring grows (independent of stagger)
function HeartbeatRings({ p }) {
  // Total cycle = grow duration + pause. Keyframe only grows for the first
  // `growPct`% of the cycle, then holds at opacity:0 for the pause.
  const total = p.duration + p.groupDelay
  const growPct = Math.round((p.duration / total) * 100)
  const css = `
    @keyframes hb-ring {
      0%        { transform: translateX(-50%) scale(0.1); opacity: ${p.startOpacity}; }
      ${growPct * 0.7}% { opacity: ${p.startOpacity * 0.35}; }
      ${growPct}%  { transform: translateX(-50%) scale(${p.maxScale}); opacity: 0; }
      100%      { transform: translateX(-50%) scale(${p.maxScale}); opacity: 0; }
    }
  `
  return (
    <>
      <style>{css}</style>
      {[0, 1, 2].map(i => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: -200,
            left: '50%',
            width: p.ringSize,
            height: p.ringSize,
            borderRadius: '50%',
            backgroundColor: `rgba(255,255,255,${p.ringOpacity})`,
            animation: `hb-ring ${total}s cubic-bezier(0.2, 0, 0.8, 1) -${i * p.stagger}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}

// 6 dots → arches draw left→top→right (one continuous stroke), then continue bottom.
// Staggered starts: outer arches begin sooner, all finish each phase at the same time.
function WiFiRings({ p }) {
  const cx = 120
  const cy = p.centerY
  const count = Math.round(p.count)
  const radii = Array.from({ length: count }, (_, i) => (i + 1) * p.ringGap)
  const rMax = radii[radii.length - 1]

  // Cycle phase boundaries (% of total duration):
  const DOTS_END  = 10   // dots hold until here, then fade
  const TOP_END   = 48   // all top arches finish (left→top→right) at this %
  const BOT_START = 52   // outer ring starts bottom arc here
  const BOT_END   = 88   // all bottom arcs finish (right→bottom→left) at this %
  const FADE_END  = 94   // opacity reaches 0

  const arcCss = radii.map((r, i) => {
    const C     = 2 * Math.PI * r  // full circumference
    const halfC = Math.PI * r      // half = top arch done

    // Each ring's draw duration is proportional to its circumference,
    // so all finish the top arch at TOP_END% and bottom at BOT_END%.
    const topDrawDur = (TOP_END - DOTS_END) * (r / rMax)
    const topStart   = TOP_END - topDrawDur

    const botDrawDur = (BOT_END - BOT_START) * (r / rMax)
    const botStart   = BOT_END - botDrawDur

    return `@keyframes wa-${i} {
      0%, ${topStart.toFixed(1)}% { stroke-dashoffset: ${C.toFixed(2)}; opacity: ${p.opacity}; }
      ${TOP_END}%                 { stroke-dashoffset: ${halfC.toFixed(2)}; opacity: ${p.opacity}; }
      ${botStart.toFixed(1)}%     { stroke-dashoffset: ${halfC.toFixed(2)}; opacity: ${p.opacity}; }
      ${BOT_END}%                 { stroke-dashoffset: 0; opacity: ${p.opacity}; }
      ${FADE_END}%                { stroke-dashoffset: 0; opacity: 0; }
      100%                        { stroke-dashoffset: ${C.toFixed(2)}; opacity: 0; }
    }`
  }).join('\n')

  // Dots visible at start, fade as top arches grow
  const dotCss = `@keyframes wa-dot {
    0%, ${DOTS_END}%  { opacity: 1; }
    ${TOP_END}%       { opacity: 0; }
    ${FADE_END}%      { opacity: 0; }
    100%              { opacity: 1; }
  }`

  const color = `rgba(255,255,255,${p.opacity})`

  return (
    <>
      <style>{arcCss + '\n' + dotCss}</style>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 240 320"
      >
        {radii.map((r, i) => {
          const C = 2 * Math.PI * r
          // 4 quarter-arcs forming a full circle, starting at left endpoint (cx-r, cy)
          // going clockwise: left → top → right → bottom → left
          const d = [
            `M ${cx - r} ${cy}`,
            `A ${r} ${r} 0 0 1 ${cx} ${cy - r}`,      // left → top
            `A ${r} ${r} 0 0 1 ${cx + r} ${cy}`,      // top → right
            `A ${r} ${r} 0 0 1 ${cx} ${cy + r}`,      // right → bottom
            `A ${r} ${r} 0 0 1 ${cx - r} ${cy}`,      // bottom → left
          ].join(' ')

          return (
            <g key={i}>
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={p.strokeWidth}
                strokeLinecap="round"
                strokeDasharray={C}
                style={{ animation: `wa-${i} ${p.duration}s ease-in-out infinite` }}
              />
              <circle cx={cx - r} cy={cy} r={p.dotSize} fill={color}
                style={{ animation: `wa-dot ${p.duration}s ease-in-out infinite` }} />
              <circle cx={cx + r} cy={cy} r={p.dotSize} fill={color}
                style={{ animation: `wa-dot ${p.duration}s ease-in-out infinite` }} />
            </g>
          )
        })}
      </svg>
    </>
  )
}

// 6 circles pulse between minRadius and maxRadius while the whole group rotates 360°
function FlowerCircles({ p }) {
  const angles = [0, 60, 120, 180, 240, 300]
  const toRad = d => d * Math.PI / 180
  const half = p.circleSize / 2

  // Wrapper rotates the whole flower once per cycle (linear, continuous)
  const rotateCss = `@keyframes flower-rotate {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`

  // Each circle pulses in/out radially — minRadius keeps the flower visible at rest
  const circleCss = angles.map((angle, i) => {
    const minTx = p.minRadius * Math.sin(toRad(angle))
    const minTy = -p.minRadius * Math.cos(toRad(angle))
    const maxTx = p.radius * Math.sin(toRad(angle))
    const maxTy = -p.radius * Math.cos(toRad(angle))
    return `@keyframes fl-${i} {
      0%, 100% { transform: translate(${minTx - half}px, ${minTy - half}px); }
      50%       { transform: translate(${maxTx - half}px, ${maxTy - half}px); }
    }`
  }).join('\n')

  return (
    <>
      <style>{rotateCss + '\n' + circleCss}</style>
      {/* 0×0 anchor positioned at card center + offsetY, rotates the whole group */}
      <div style={{
        position: 'absolute',
        top: `calc(50% + ${p.offsetY}px)`,
        left: '50%',
        width: 0,
        height: 0,
        animation: `flower-rotate ${p.duration}s linear infinite`,
        pointerEvents: 'none',
      }}>
        {angles.map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: p.circleSize,
              height: p.circleSize,
              borderRadius: '50%',
              backgroundColor: `rgba(255,255,255,${p.opacity})`,
              animation: `fl-${i} ${p.duration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}

// True 3D DNA double helix — perspective-projected, rotates around vertical axis via rAF.
// Front/back depth sorted per segment: front = z < 0 (closer to viewer).
function DNAHelix({ p }) {
  const W = 240, CARD_H = 320, cx = W / 2
  const refs = {
    backA:  useRef(null), backB:  useRef(null),
    links:  useRef(null),
    frontA: useRef(null), frontB: useRef(null),
  }
  const rafRef   = useRef(null)
  const angleRef = useRef(0)
  const lastTRef = useRef(null)

  useEffect(() => {
    const tick = (ts) => {
      if (lastTRef.current !== null) {
        const dt = (ts - lastTRef.current) / 1000
        angleRef.current += (Math.PI * 2 / p.rotateDuration) * dt
      }
      lastTRef.current = ts

      const angle = angleRef.current
      const H     = p.period
      const R     = p.amplitude
      const D     = p.perspective   // larger = less distortion
      const nLink = Math.max(2, Math.round(p.linkCount))
      const N     = Math.ceil(CARD_H / H) + 1
      const STEPS = 40

      // Compute strand points with perspective projection.
      // Strand A phase = α, Strand B = α + π (opposite side)
      // z > 0 → behind viewer (back), z < 0 → in front (front)
      const ptA = [], ptB = []
      for (let period = 0; period <= N; period++) {
        for (let s = 0; s <= STEPS; s++) {
          if (period > 0 && s === 0) continue
          const y = (period + s / STEPS) * H
          const α  = 2 * Math.PI * y / H + angle
          const zA = R * Math.sin(α)                        // strand A depth
          const xA = cx + R * Math.cos(α) * (D / (D + zA)) // perspective x
          const zB = -zA                                     // strand B is opposite
          const xB = cx - R * Math.cos(α) * (D / (D + zB))
          ptA.push([xA, y, zA < 0])   // [x, y, isFront]
          ptB.push([xB, y, zB < 0])
        }
      }

      // Build separate front/back path strings, inserting M when depth flips
      const makePath = (pts, wantFront) => {
        let d = '', pen = true
        for (const [x, y, front] of pts) {
          if (front === wantFront) {
            d += pen
              ? `M${x.toFixed(1)},${y.toFixed(1)}`
              : `L${x.toFixed(1)},${y.toFixed(1)}`
            pen = false
          } else { pen = true }
        }
        return d
      }

      // Cross-links between strands at each link position
      let linkD = ''
      for (let period = 0; period <= N; period++) {
        for (let k = 1; k < nLink; k++) {
          const y  = (period + k / nLink) * H
          const α  = 2 * Math.PI * y / H + angle
          const zA = R * Math.sin(α)
          const xA = cx + R * Math.cos(α) * (D / (D + zA))
          const zB = -zA
          const xB = cx - R * Math.cos(α) * (D / (D + zB))
          if (Math.abs(xA - xB) > 2) {   // skip near-crossing dots
            linkD += `M${xA.toFixed(1)},${y.toFixed(1)}L${xB.toFixed(1)},${y.toFixed(1)}`
          }
        }
      }

      refs.backA.current?.setAttribute('d',  makePath(ptA, false))
      refs.backB.current?.setAttribute('d',  makePath(ptB, false))
      refs.links.current?.setAttribute('d',  linkD)
      refs.frontA.current?.setAttribute('d', makePath(ptA, true))
      refs.frontB.current?.setAttribute('d', makePath(ptB, true))

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); lastTRef.current = null }
  }, [p.rotateDuration, p.period, p.amplitude, p.perspective, p.linkCount])

  const sw = p.strandWidth, lw = p.linkWidth
  const bk = `rgba(255,255,255,${p.backOpacity})`
  const ft = `rgba(255,255,255,${p.frontOpacity})`
  const lk = `rgba(255,255,255,${p.linkOpacity})`

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox={`0 0 ${W} ${CARD_H}`}
    >
      <path ref={refs.backA}  fill="none" stroke={bk} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path ref={refs.backB}  fill="none" stroke={bk} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path ref={refs.links}  fill="none" stroke={lk} strokeWidth={lw} strokeLinecap="round" />
      <path ref={refs.frontA} fill="none" stroke={ft} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path ref={refs.frontB} fill="none" stroke={ft} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Compass rose: outer ring with tick marks + cardinal labels rotates continuously.
// A fixed triangle at 12 o'clock acts as the reading mark.
function CompassRing({ p }) {
  const W = 240, cx = W / 2, cy = p.centerY
  const R = p.radius
  const step = Math.max(1, Math.round(p.tickStep))
  const color = o => `rgba(255,255,255,${o})`

  // Build tick marks
  const ticks = []
  for (let deg = 0; deg < 360; deg += step) {
    const isCardinal = deg % 90 === 0
    const isOrdinal  = deg % 45 === 0
    const len  = isCardinal ? p.tickLong : (isOrdinal ? p.tickLong * 0.6 : p.tickShort)
    const rad  = (deg - 90) * Math.PI / 180
    const cos  = Math.cos(rad), sin = Math.sin(rad)
    ticks.push({
      x1: cx + R * cos,            y1: cy + R * sin,
      x2: cx + (R - len) * cos,    y2: cy + (R - len) * sin,
      isCardinal, isOrdinal,
    })
  }

  // Cardinal labels sit just inside the long ticks
  const cardinals = [
    { label: 'N', deg: 0 }, { label: 'E', deg: 90 },
    { label: 'S', deg: 180 }, { label: 'W', deg: 270 },
  ]
  const labelR = R - p.tickLong - 13

  // holdPct = % of each half-swing held at the extreme before moving
  const holdPct = Math.round(p.pauseFraction * 100)
  const swingCss = `@keyframes compass-swing {
    0%, ${holdPct}% { transform: rotate(${-p.swingAngle}deg); }
    100%            { transform: rotate(${p.swingAngle}deg); }
  }`

  return (
    <>
      <style>{swingCss}</style>
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        viewBox="0 0 240 320"
      >
        {/* Swinging group */}
        <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: `compass-swing ${p.swingDuration}s ease-in-out alternate infinite` }}>
          {/* Outer ring — thick */}
          <circle cx={cx} cy={cy} r={R} fill="none"
            stroke={color(p.opacity)} strokeWidth={p.ringWidth} />

          {/* Inner accent ring */}
          <circle cx={cx} cy={cy} r={R * p.innerRingRatio} fill="none"
            stroke={color(p.opacity * 0.35)} strokeWidth={p.ringWidth * 0.6} />

          {/* Cross-axis lines through center */}
          <line x1={cx} y1={cy - R * 0.58} x2={cx} y2={cy + R * 0.58}
            stroke={color(p.opacity * 0.2)} strokeWidth={1} />
          <line x1={cx - R * 0.58} y1={cy} x2={cx + R * 0.58} y2={cy}
            stroke={color(p.opacity * 0.2)} strokeWidth={1} />

          {/* Tick marks */}
          {ticks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={color(p.opacity * (t.isCardinal ? 1 : t.isOrdinal ? 0.65 : 0.4))}
              strokeWidth={t.isCardinal ? 1.5 : 0.8}
              strokeLinecap="round" />
          ))}

          {/* Cardinal labels */}
          {cardinals.map(({ label, deg }) => {
            const rad = (deg - 90) * Math.PI / 180
            return (
              <text key={label}
                x={cx + labelR * Math.cos(rad)}
                y={cy + labelR * Math.sin(rad)}
                textAnchor="middle" dominantBaseline="central"
                fontSize={11} fontWeight="700"
                fontFamily="-apple-system, 'SF Pro Rounded', sans-serif"
                fill={color(p.opacity)}
                style={{ userSelect: 'none' }}
              >{label}</text>
            )
          })}

          {/* Center dot */}
          <circle cx={cx} cy={cy} r={3} fill={color(p.opacity * 0.8)} />
        </g>

        {/* Fixed center pin (doesn't swing) */}
        <circle cx={cx} cy={cy} r={2.5} fill={color(p.opacity)} />
      </svg>
    </>
  )
}

function IPhoneFrame({ color, question, heartbeat, heartbeatParams, flower, flowerParams, wifi, wifiParams, dna, dnaParams, compass, compassParams }) {
  return (
    <div style={{
      width: 393, height: 852,
      borderRadius: 54,
      background: '#1a1a1e',
      padding: 9,
      boxShadow: '0 0 0 1.5px rgba(255,255,255,0.08), 0 32px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25)',
      flexShrink: 0,
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: 46,
        backgroundColor: color,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "-apple-system, 'SF Pro Rounded', BlinkMacSystemFont, sans-serif",
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 12, left: '50%',
          transform: 'translateX(-50%)',
          width: 126, height: 37,
          backgroundColor: '#000', borderRadius: 20, zIndex: 20,
        }} />

        {/* Card animation in the background — matches the card above */}
        {heartbeat && <HeartbeatRings p={heartbeatParams} />}
        {flower && <FlowerCircles p={flowerParams} />}
        {wifi && <WiFiRings p={wifiParams} />}
        {dna && <DNAHelix p={dnaParams} />}
        {compass && <CompassRing p={compassParams} />}

        {/* App UI overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column',
          padding: '62px 28px 36px',
        }}>

          {/* Header: progress dots + label + X */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {[0.35, 0.9, 0.35].map((o, i) => (
                  <div key={i} style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: `rgba(255,255,255,${o})` }} />
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.01em' }}>Jane's card</span>
            </div>
            {/* X button */}
            <div style={{
              position: 'absolute', right: 0, top: -4,
              width: 38, height: 38, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* Question text */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingBottom: 16 }}>
            <p style={{
              fontSize: 30, fontWeight: 700, color: '#fff',
              lineHeight: 1.25, letterSpacing: '-0.02em', margin: 0,
            }}>
              {question}
            </p>
          </div>

          {/* Answer buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            {['Yes', 'No'].map(ans => (
              <div key={ans} style={{
                backgroundColor: 'rgba(255,255,255,0.17)',
                borderRadius: 18, height: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>{ans}</span>
              </div>
            ))}
          </div>

          {/* Bottom nav: shuffle + Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 50, height: 50, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 6h10.5M2 14h10.5M10 3l5 3-5 3M10 11l5 3-5 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{
              flex: 1, height: 50, borderRadius: 25,
              backgroundColor: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>Next</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Per-card mesh gradient palettes: background + 4 blob colors
const MESH_PALETTES = {
  '#7B8CEB': { bg: '#0d1260', blobs: ['#3355ff', '#1122dd', '#5577ff', '#2244ee'] },
  '#6B4E9A': { bg: '#2a1855', blobs: ['#9966ee', '#cc44aa', '#ccaaff', '#4422bb'] },
  '#4A8A63': { bg: '#1a4030', blobs: ['#55bb88', '#33aa66', '#99ddbb', '#22aaaa'] },
  '#C45550': { bg: '#420a10', blobs: ['#dd1122', '#ff2233', '#cc0011', '#ee3322'] },
  '#C49A40': { bg: '#7a4a0a', blobs: ['#eebb44', '#dd8822', '#ffdd88', '#ee9933'] },
  '#8F4A6E': { bg: '#3a0a3a', blobs: ['#cc5599', '#ee44aa', '#ddaacc', '#882288'] },
  '#387878': { bg: '#0a3030', blobs: ['#44aaaa', '#33cccc', '#88dddd', '#226688'] },
}

// Blob drift paths — 4 blobs, each takes a different wandering route
const BLOB_DRIFTS = [
  { left: '-20%', top: '-25%', w: 320, blur: 70, dur: 20, t1: ['35%','25%'],  t2: ['-5%', '60%'],  t3: ['55%', '10%'] },
  { left:  '55%', top: '-15%', w: 280, blur: 60, dur: 26, t1: ['-40%','40%'], t2: ['20%','70%'],   t3: ['-20%','20%'] },
  { left: '-15%', top:  '55%', w: 300, blur: 65, dur: 22, t1: ['60%','-30%'], t2: ['10%','-60%'],  t3: ['40%','10%'] },
  { left:  '45%', top:  '55%', w: 260, blur: 55, dur: 28, t1: ['-50%','-40%'],t2: ['15%','-70%'],  t3: ['-30%','-10%'] },
]

function MeshGradientCard({ label, color, meshIndex }) {
  const palette = MESH_PALETTES[color] ?? { bg: color, blobs: ['#fff', '#fff', '#fff', '#fff'] }
  const id = `mg${meshIndex}`

  const css = BLOB_DRIFTS.map((b, i) => `
    @keyframes ${id}-${i} {
      0%   { transform: translate(0,0); }
      25%  { transform: translate(${b.t1[0]},${b.t1[1]}); }
      50%  { transform: translate(${b.t2[0]},${b.t2[1]}); }
      75%  { transform: translate(${b.t3[0]},${b.t3[1]}); }
      100% { transform: translate(0,0); }
    }
  `).join('\n')

  return (
    <>
      <style>{css}</style>
      <div style={{
        width: 240, height: 320, borderRadius: 24,
        backgroundColor: palette.bg,
        position: 'relative', flexShrink: 0, overflow: 'hidden',
      }}>
        {BLOB_DRIFTS.map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: b.w, height: b.w,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${palette.blobs[i]} 0%, transparent 70%)`,
            filter: `blur(${b.blur}px)`,
            left: b.left, top: b.top,
            animation: `${id}-${i} ${b.dur}s ease-in-out infinite`,
            willChange: 'transform',
          }} />
        ))}
        <span style={{
          position: 'absolute', top: 24, left: 0, right: 0,
          textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#fff',
          lineHeight: 1.3, letterSpacing: '-0.02em', whiteSpace: 'pre-line', zIndex: 1,
        }}>
          {label}
        </span>
      </div>
    </>
  )
}

function CardTile({ label, color, heartbeat, heartbeatParams, flower, flowerParams, wifi, wifiParams, dna, dnaParams, compass, compassParams }) {
  return (
    <div style={{
      width: 240, height: 320,
      borderRadius: 24,
      backgroundColor: color,
      position: 'relative',
      flexShrink: 0,
      overflow: 'hidden',
    }}>
      {heartbeat && <HeartbeatRings p={heartbeatParams} />}
      {flower && <FlowerCircles p={flowerParams} />}
      {wifi && <WiFiRings p={wifiParams} />}
      {dna && <DNAHelix p={dnaParams} />}
      {compass && <CompassRing p={compassParams} />}
      <span style={{
        position: 'absolute',
        top: 24,
        left: 0, right: 0,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
        whiteSpace: 'pre-line',
        zIndex: 1,
      }}>
        {label}
      </span>
    </div>
  )
}

function DragRow({ children, gap = 20, leftConstraint }) {
  const rowRef = useRef(null)
  const left = leftConstraint ?? -(CARDS.length * (240 + gap) - gap - 1200)
  return (
    <div style={{ overflow: 'hidden', paddingBottom: 32, paddingTop: 20, marginTop: -20 }}>
      <motion.div
        ref={rowRef}
        drag="x"
        dragConstraints={{ right: 0, left }}
        dragElastic={0.1}
        dragMomentum={true}
        style={{
          display: 'flex',
          gap,
          alignItems: 'center',
          cursor: 'grab',
          width: 'max-content',
          paddingLeft: 2,
          paddingRight: 40,
        }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function DesignPage() {
  const p = useDialKit('Heartbeat', {
    duration:    [7.0,  0.5, 20],  // how slowly each ring grows
    stagger:     [0.8,  0.05, 4],  // gap between rings firing
    groupDelay:  [4.0,  0,   12],  // pause after all 3 rings before next group
    ringSize:    [480,  100, 800],
    maxScale:    [1.6,  0.5, 3],
    ringOpacity: [0.13, 0.05, 0.6],
    startOpacity:[0.30, 0.1, 1],
  })

  const w = useDialKit('WiFi', {
    duration:    [10.0, 1,   30],   // full cycle
    count:       [3,    2,   6],    // number of arches
    ringGap:     [26,   10,  60],   // radius increment per arch (px) — smaller = more edge padding
    centerY:     [288,  180, 320],  // pivot y in the 320px card
    strokeWidth: [10,   3,   24],   // arch stroke thickness
    dotSize:     [5,    2,   12],   // endpoint dot radius
    opacity:     [0.22, 0.1, 0.7],
  })

  const d = useDialKit('DNA', {
    rotateDuration: [8.0,  0.5, 30],   // seconds per full 3D rotation
    period:         [85,   40,  200],  // height of one full twist (px)
    amplitude:      [82,   30,  110],  // horizontal spread from center (px) — fills card
    perspective:    [280,  100, 800],  // perspective depth (smaller = more distortion)
    strandWidth:    [5,    1,   14],   // strand line thickness
    linkCount:      [8,    3,   20],   // base-pair links per period
    linkWidth:      [4,    1,   10],   // cross-link thickness
    frontOpacity:   [0.40, 0.1, 1],   // front strand opacity
    backOpacity:    [0.12, 0.05, 0.6],// back strand opacity
    linkOpacity:    [0.20, 0.05, 0.7],// cross-link opacity
  })

  const c = useDialKit('Compass', {
    swingDuration:  [5.0,  0.5, 20],  // seconds for one half-swing (left→right)
    swingAngle:     [55,   5,   180], // degrees each side swings from center
    pauseFraction:  [0.30, 0,   0.5], // fraction of half-swing held at each extreme
    radius:         [88,   50,  115], // ring radius (px)
    centerY:        [188,  80,  280], // vertical center in the 320px card
    tickStep:       [10,   5,   30],  // degrees between ticks
    tickLong:       [14,   5,   25],  // cardinal tick length
    tickShort:      [6,    2,   14],  // minor tick length
    ringWidth:      [3.5,  1,   8],   // outer ring stroke width — thicker
    innerRingRatio: [0.6,  0.2, 0.95],
    opacity:        [0.35, 0.1, 0.9],
  })

  const f = useDialKit('Flower', {
    duration:   [10.0, 1,   40],  // full rotate + pulse cycle
    radius:     [72,   20,  150], // max spread from center (px)
    minRadius:  [28,   0,   80],  // min spread — keeps flower visible at rest
    circleSize: [110,  40,  200], // diameter of each circle (px)
    offsetY:    [60,   0,   160], // push flower down from card center (px)
    opacity:    [0.18, 0.05, 0.7],// circle fill opacity
  })

  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f0f0f2',
        fontFamily: "-apple-system, 'SF Pro Rounded', BlinkMacSystemFont, sans-serif",
        padding: '60px 60px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 72,
      }}>

        {/* Cards row — drag to scroll, shadows not clipped */}
        <section>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            Cards — 240 × 320 · r24
          </p>
          <DragRow gap={20}>
            {CARDS.map((card, i) => <CardTile key={i} {...card} heartbeatParams={p} flowerParams={f} wifiParams={w} dnaParams={d} compassParams={c} />)}
          </DragRow>
        </section>

        {/* Mesh gradient variant — same cards, no shapes, slow-moving blob gradients */}
        <section>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            Cards — mesh gradient variant
          </p>
          <DragRow gap={20}>
            {CARDS.map((card, i) => <MeshGradientCard key={i} label={card.label} color={card.color} meshIndex={i} />)}
          </DragRow>
        </section>

        {/* iPhone screens row — drag to scroll */}
        <section>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            iPhone 17 screens
          </p>
          <DragRow gap={24} leftConstraint={-(CARDS.length * (393 + 24) - 24 - 1116)}>
            {CARDS.map((card, i) => <IPhoneFrame key={i} {...card} heartbeatParams={p} flowerParams={f} wifiParams={w} dnaParams={d} compassParams={c} />)}
          </DragRow>
        </section>

      </div>
      <DialRoot />
      <Agentation />
    </>
  )
}
