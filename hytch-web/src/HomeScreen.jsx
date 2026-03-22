import { useState } from 'react'
import { motion } from 'framer-motion'

// ── Card SVG components ─────────────────────────────────────────────────────
const _svgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }

function BlueSVG() {
  return (
    <svg viewBox="0 0 240 300" fill="none" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="300" rx="24" fill="#7A92FB"/>
      <ellipse cx="120" cy="154" rx="185" ry="189" fill="#2E54F9"/>
      <circle cx="120" cy="150" r="149" fill="#4769FA"/>
      <circle cx="120" cy="150" r="111" fill="#5B79FB"/>
      <circle cx="120" cy="150" r="78" fill="#6A85FB"/>
      <circle cx="120" cy="150" r="47" fill="#7A92FB"/>
      <circle cx="120" cy="150" r="26" fill="#92A6FC"/>
    </svg>
  )
}

function RedSVG() {
  const radii = [32, 72, 116, 163, 213, 265]
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {radii.map((r, i) => <circle key={i} cx="120" cy="310" r={r} fill="none" stroke="white" strokeOpacity={0.20 - i * 0.015} strokeWidth={1.5} />)}
    </svg>
  )
}

function TealSVG() {
  const cs = [
    { cx: 90, cy: 140, r: 85 }, { cx: 150, cy: 140, r: 85 },
    { cx: 120, cy: 85, r: 85 }, { cx: 120, cy: 195, r: 85 },
    { cx: 80, cy: 195, r: 68 }, { cx: 160, cy: 195, r: 68 },
  ]
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {cs.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />)}
    </svg>
  )
}

function OrangeSVG() {
  const cs = [
    { cx: 57, cy: 150, r: 50 }, { cx: 57, cy: 150, r: 50 },
    { cx: 57, cy: 117, r: 50 }, { cx: 57, cy: 183, r: 50 },
    { cx: 80, cy: 117, r: 50 }, { cx: 80, cy: 183, r: 50 },
  ]
  return (
    <svg viewBox="0 0 114 240" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {cs.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke="white" strokeWidth="3.7" />)}
    </svg>
  )
}

// ── Category config ─────────────────────────────────────────────────────────
const CATEGORIES = {
  future:  { id: 'future',  label: 'Future\n& goals',      color: '#7A92FB', Card: BlueSVG },
  love:    { id: 'love',    label: 'Relations',             color: '#C45A52', Card: RedSVG },
  youme:   { id: 'youme',   label: 'You\n& me',            color: '#1F8077', Card: TealSVG },
}

// ── Mock data ───────────────────────────────────────────────────────────────
const MOCK_HYTCHES = [
  {
    id: 'h1',
    partnerName: 'Jane Doe',
    partnerAvatar: 'https://i.pravatar.cc/48?img=5',
    time: 'Yesterday',
    step1: { categoryId: 'future' },
    step3: { categoryId: 'youme' },
  },
  {
    id: 'h2',
    partnerName: 'Hytch',
    partnerAvatar: null,
    avatarColor: '#1F8077',
    time: 'Yesterday',
    step1: { categoryId: 'love' },
    step3: { categoryId: 'love' },
  },
]

// ── Daily calendar card ─────────────────────────────────────────────────────
function DailyCard() {
  // 7x5 grid of dots representing a month calendar
  const totalDots = 35
  const filledDots = 8 // first 8 are filled (completed days)
  const currentDot = 8 // today (outlined)

  return (
    <div style={{
      backgroundColor: '#1F8077',
      borderRadius: 16,
      width: 228,
      height: 151,
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: 'flex-start',
      }}>
        {/* Month header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '100%',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 500, letterSpacing: '0.48px' }}>March</span>
          <span style={{ color: '#fff', fontSize: 12, fontWeight: 500, opacity: 0.6, letterSpacing: '0.36px' }}>6/9</span>
        </div>
        {/* Dot grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 12px)',
          gridTemplateRows: 'repeat(5, 12px)',
          gap: '8px 16px',
        }}>
          {Array.from({ length: totalDots }, (_, i) => {
            const dotNum = i + 1
            if (dotNum < filledDots) {
              return <div key={i} style={{ width: 12, height: 12, borderRadius: 16, backgroundColor: '#fff' }} />
            }
            if (dotNum === currentDot) {
              return (
                <div key={i} style={{
                  width: 12, height: 12, borderRadius: 16,
                  border: '2px solid #fff',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  boxSizing: 'border-box',
                }} />
              )
            }
            if (dotNum === filledDots) {
              return (
                <div key={i} style={{
                  width: 12, height: 12, borderRadius: 8,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: 16, backgroundColor: '#fff', opacity: 0.5 }} />
                </div>
              )
            }
            return <div key={i} style={{ width: 12, height: 12, borderRadius: 16, backgroundColor: '#fff', opacity: 0.3 }} />
          })}
        </div>
      </div>
    </div>
  )
}

// ── In-person card ──────────────────────────────────────────────────────────
function InPersonCard() {
  return (
    <div style={{
      backgroundColor: '#C25A2A',
      borderRadius: 16,
      width: 289,
      height: 151,
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      <OrangeSVG />
    </div>
  )
}

// ── Hytch card row (person's hytch with stacked cards) ──────────────────────
function HytchRow({ hytch }) {
  const step1Cat = CATEGORIES[hytch.step1.categoryId]
  const step3Cat = CATEGORIES[hytch.step3.categoryId]

  return (
    <motion.div
      style={{
        backgroundColor: '#F2F3F3',
        borderRadius: 16,
        height: 203,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Avatar + name */}
      <div style={{
        position: 'absolute',
        top: 24,
        left: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        {hytch.partnerAvatar ? (
          <img
            src={hytch.partnerAvatar}
            alt=""
            style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            backgroundColor: hytch.avatarColor || '#1F8077',
          }} />
        )}
        <span style={{
          fontSize: 17,
          fontWeight: 400,
          color: '#333',
          whiteSpace: 'nowrap',
        }}>
          {hytch.partnerName}
        </span>
      </div>

      {/* Time label */}
      <span style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        fontSize: 17,
        color: '#333',
        opacity: 0.4,
      }}>
        {hytch.time}
      </span>

      {/* Step 3 card (behind, peeking right) */}
      <div style={{
        position: 'absolute',
        right: -32,
        top: '50%',
        transform: 'translateY(-42%) rotate(0deg)',
        width: 138,
        height: 172,
        borderRadius: 14,
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${step3Cat.color}, ${step3Cat.color}dd)`,
        zIndex: 1,
      }}>
        <step3Cat.Card />
        <span style={{
          position: 'absolute',
          top: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 600,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          lineHeight: 1.1,
        }}>
          {step3Cat.label}
        </span>
      </div>

      {/* Step 1 card (front, overlapping) */}
      <div style={{
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-40%) rotate(-6deg)',
        width: 150,
        height: 187,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: step1Cat.color,
        zIndex: 2,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.03)',
      }}>
        <step1Cat.Card />
        <span style={{
          position: 'absolute',
          top: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontSize: 15,
          fontWeight: 600,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          lineHeight: 1.1,
        }}>
          {step1Cat.label}
        </span>
      </div>
    </motion.div>
  )
}

// ── Bottom nav bar ──────────────────────────────────────────────────────────
function BottomNav() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#fff',
      borderRadius: 9999,
      padding: '8px 24px',
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.03)',
      border: '1px solid #F5F2F0',
      zIndex: 10,
    }}>
      {/* People icon */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="#333" strokeWidth="1.8"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>

      {/* Briefcase icon (active) */}
      <div style={{
        width: 40, height: 40, borderRadius: 999,
        backgroundColor: '#FAF8F7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
          <path d="M20 7H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM16 7V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2"/>
        </svg>
      </div>

      {/* Profile avatar */}
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        border: '1px solid rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
        <img
          src="https://i.pravatar.cc/52?img=12"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

// ── Home Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  return (
    <div style={S.root}>
      <div style={S.phone}>
        {/* Status bar */}
        <div style={{ height: 54, padding: '21px 16px 19px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 17, fontWeight: 590, color: '#121110' }}>9:41</span>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#121110' }}>&#9679;&#9679;&#9679;&#9679;</span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 40,
          fontWeight: 500,
          color: '#333',
          margin: 0,
          padding: '0 16px 16px',
          letterSpacing: '1.2px',
          lineHeight: 1,
        }}>
          Hytches
        </h1>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {/* Daily + In-Person cards row */}
          <div style={{
            display: 'flex',
            gap: 32,
            padding: '0 16px',
            marginBottom: 24,
          }}>
            {/* Daily card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <DailyCard />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 24, fontWeight: 500, color: '#333', letterSpacing: '0.72px' }}>Daily</span>
                <div style={{
                  backgroundColor: '#E2F8F6',
                  borderRadius: 999,
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#1F8077" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="#1F8077" strokeWidth="2"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="#1F8077" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#1F8077" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#1F8077', letterSpacing: '0.48px' }}>20</span>
                </div>
              </div>
            </div>

            {/* In-Person card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <InPersonCard />
              <span style={{ fontSize: 24, fontWeight: 500, color: '#333', letterSpacing: '0.72px' }}>In-person</span>
            </div>
          </div>

          {/* Hytch rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 16px', paddingBottom: 80 }}>
            {MOCK_HYTCHES.map(hytch => (
              <HytchRow key={hytch.id} hytch={hytch} />
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <BottomNav />
      </div>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const FONT = "-apple-system, 'SF Pro Rounded', BlinkMacSystemFont, sans-serif"

const S = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dde2ef',
    fontFamily: FONT,
  },
  phone: {
    width: 402,
    height: 874,
    backgroundColor: '#FBFAF8',
    borderRadius: 52,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 40px 100px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
}
