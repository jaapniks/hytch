import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { Agentation } from 'agentation'

// ── Card SVG components ────────────────────────────────────────────────────────
const _svgStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }

// Blue — uploaded design (concentric filled circles + label)
function BlueSVG() {
  return (
    <svg width="240" height="300" viewBox="0 0 240 300" fill="none" style={_svgStyle} preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#blue-clip)">
        <rect width="240" height="300" rx="24" fill="#7A92FB"/>
        <ellipse cx="120" cy="154" rx="185" ry="189" fill="#2E54F9"/>
        <circle cx="120" cy="150" r="149" fill="#4769FA"/>
        <circle cx="120" cy="150" r="111" fill="#5B79FB"/>
        <circle cx="120" cy="150" r="78" fill="#6A85FB"/>
        <circle cx="120" cy="150" r="47" fill="#7A92FB"/>
        <circle cx="120" cy="150" r="26" fill="#92A6FC"/>
        <path d="M85.7975 57.199C84.86 57.1991 84.2858 56.6249 84.2858 55.6288L84.2853 41.66C84.2853 40.6757 84.8595 40.0897 85.797 40.0897L93.8829 40.0894C94.715 40.0894 95.2658 40.5816 95.2658 41.3667C95.2658 42.1519 94.7033 42.6441 93.883 42.6441L87.3088 42.6443L87.3089 47.6365L93.2738 47.6363C94.0707 47.6363 94.598 48.105 94.598 48.8667C94.5981 49.6285 94.0707 50.0972 93.2739 50.0973L87.309 50.0974L87.3092 55.6287C87.3092 56.6248 86.7467 57.199 85.7975 57.199ZM101.325 57.222C98.6296 57.2221 96.9186 55.476 96.9185 52.605L96.9183 45.8667C96.9182 44.894 97.5159 44.3315 98.3713 44.3315C99.2268 44.3314 99.8362 44.8939 99.8362 45.8783L99.8364 52.0189C99.8365 53.8002 100.704 54.7611 102.344 54.761C104.032 54.761 105.075 53.5656 105.075 51.761L105.075 45.8664C105.074 44.8938 105.684 44.3312 106.539 44.3312C107.383 44.3312 107.992 44.8937 107.992 45.8781L107.993 55.757C107.993 56.6945 107.43 57.2335 106.598 57.2336C105.755 57.2336 105.18 56.6945 105.18 55.757L105.18 54.843L105.122 54.843C104.465 56.3547 103.212 57.2219 101.325 57.222ZM111.192 53.9287L111.192 46.8272L110.407 46.8272C109.68 46.8272 109.235 46.3936 109.235 45.6905C109.235 44.9991 109.68 44.5772 110.407 44.5772L111.192 44.5772L111.192 42.9248C111.192 41.9873 111.754 41.4014 112.656 41.4013C113.547 41.4013 114.11 41.9872 114.11 42.9247L114.11 44.5771L115.457 44.577C116.184 44.577 116.629 44.9989 116.629 45.6903C116.629 46.3934 116.184 46.827 115.457 46.827L114.11 46.8271L114.11 53.2958C114.11 54.2333 114.438 54.6435 115.282 54.7138L115.493 54.7372C116.266 54.8075 116.665 55.1356 116.665 55.8153C116.665 56.6708 115.915 57.1278 114.579 57.1279L114.462 57.1279C112.294 57.1279 111.192 56.0498 111.192 53.9287ZM122.794 57.2214C120.098 57.2214 118.387 55.4754 118.387 52.6043L118.387 45.866C118.387 44.8934 118.985 44.3308 119.84 44.3308C120.696 44.3308 121.305 44.8933 121.305 45.8776L121.305 52.0183C121.305 53.7995 122.172 54.7604 123.813 54.7604C125.501 54.7603 126.544 53.565 126.543 51.7603L126.543 45.8658C126.543 44.8931 127.153 44.3306 128.008 44.3306C128.852 44.3305 129.461 44.893 129.461 45.8774L129.462 55.7563C129.462 56.6938 128.899 57.2329 128.067 57.2329C127.223 57.2329 126.649 56.6939 126.649 55.7564L126.649 54.8423L126.59 54.8423C125.934 56.3541 124.68 57.2213 122.794 57.2214ZM133.305 57.2328C132.426 57.2328 131.852 56.6586 131.852 55.6976L131.852 45.807C131.852 44.893 132.414 44.3304 133.246 44.3304C134.055 44.3304 134.629 44.8929 134.629 45.8069L134.629 46.7561L134.688 46.7561C135.028 45.303 136.106 44.3655 137.348 44.3654C137.805 44.3654 138.157 44.4826 138.379 44.6818C138.649 44.9045 138.789 45.256 138.789 45.7365C138.789 46.1935 138.649 46.5334 138.356 46.7678C138.075 47.0139 137.641 47.1428 137.067 47.1545C135.403 47.1663 134.77 48.2093 134.77 49.721L134.77 55.6976C134.77 56.6585 134.184 57.2327 133.305 57.2328ZM145.153 57.2441C141.356 57.2442 139.118 54.8654 139.118 50.8341C139.118 46.8732 141.403 44.3184 144.989 44.3183C148.387 44.3182 150.707 46.7322 150.707 50.1072C150.707 50.9744 150.215 51.49 149.348 51.4901L142.024 51.4903L142.024 51.584C142.024 53.6583 143.231 54.9942 145.129 54.9941C146.442 54.9941 147.297 54.537 148.235 53.3417C148.54 53.0018 148.809 52.8729 149.219 52.8729C149.876 52.8729 150.391 53.2947 150.391 53.9979C150.391 54.2205 150.321 54.4783 150.192 54.7361C149.372 56.3182 147.52 57.244 145.153 57.2441ZM142.047 49.5684L147.848 49.5682C147.789 47.7636 146.641 46.58 145 46.5801C143.36 46.5801 142.164 47.7872 142.047 49.5684ZM94.3529 81.2339C93.8725 81.234 93.5912 81.1051 93.1928 80.6832L92.0794 79.4879C90.7553 80.6364 88.8217 81.2927 86.7826 81.2928C83.2904 81.2929 80.9701 79.3945 80.97 76.5468C80.9699 74.6015 81.9777 73.1601 84.1691 71.9764C84.4034 71.8592 84.8253 71.6249 84.8839 71.6014C83.3604 70.0077 82.7862 68.9413 82.7861 67.7109C82.7861 65.496 84.743 63.8436 87.3915 63.8435C90.0516 63.8434 91.9384 65.4371 91.9385 67.6754C91.9385 69.4098 90.8722 70.7458 88.4464 72.0466L92.009 75.902C92.4426 75.1402 92.7355 74.1324 92.7472 72.527C92.7589 71.6949 93.1808 71.1793 93.9776 71.1793C94.7745 71.1792 95.2198 71.73 95.2199 72.5386C95.2199 74.6597 94.7395 76.441 93.8021 77.7535L95.056 79.0659C95.431 79.4761 95.5365 79.7105 95.5365 80.0972C95.5365 80.73 95.0443 81.2339 94.3529 81.2339ZM87.0284 70.6053C88.7393 69.7263 89.419 68.9411 89.4189 67.8513C89.4189 66.7028 88.5986 65.8943 87.4033 65.8943C86.2197 65.8943 85.3759 66.7264 85.376 67.8631C85.376 68.6951 85.8213 69.4217 87.0284 70.6053ZM87.0755 79.0779C88.3997 79.0779 89.7474 78.5622 90.4856 77.7536L86.2902 73.1951C86.1496 73.2537 85.8918 73.3944 85.798 73.4647C84.3449 74.3671 83.759 75.1874 83.759 76.3241C83.7591 77.9647 85.0951 79.078 87.0755 79.0779ZM108.041 85.6749C105.662 85.6633 103.834 84.7493 103.001 83.4134C102.826 83.1204 102.755 82.8392 102.755 82.5345C102.755 81.8899 103.236 81.4094 103.974 81.4094C104.384 81.4094 104.677 81.55 105.04 81.9016C106.013 82.8742 106.88 83.3429 108.064 83.3546C110.044 83.378 111.228 82.2647 111.228 80.6123L111.228 78.6319L111.169 78.6319C110.525 79.9678 109.06 80.8702 107.279 80.8703C104.162 80.8704 102.169 78.4564 102.169 74.636C102.169 70.7454 104.138 68.3665 107.337 68.3664C109.106 68.3663 110.478 69.2803 111.192 70.6866L111.239 70.6865L111.239 69.8194C111.239 68.8584 111.872 68.3311 112.704 68.331C113.548 68.331 114.157 68.8583 114.157 69.8193L114.158 80.6005C114.158 83.7294 111.873 85.6982 108.041 85.6749ZM108.169 78.5968C110.033 78.5967 111.251 77.085 111.251 74.6592C111.251 72.2451 110.032 70.6749 108.169 70.6749C106.329 70.675 105.157 72.2219 105.157 74.6594C105.158 77.1203 106.329 78.5969 108.169 78.5968ZM122.033 81.2448C118.388 81.2449 116.021 78.8192 116.021 74.788C116.021 70.7802 118.411 68.3191 122.032 68.319C125.653 68.3189 128.044 70.7681 128.044 74.7876C128.044 78.8188 125.677 81.2447 122.033 81.2448ZM122.033 78.9362C123.884 78.9362 125.079 77.4361 125.079 74.7877C125.079 72.151 123.884 70.6393 122.032 70.6393C120.192 70.6394 118.985 72.1512 118.986 74.7879C118.986 77.4363 120.181 78.9363 122.033 78.9362ZM133.564 81.1976C131.162 81.1977 129.415 79.686 129.415 77.4477C129.415 75.2446 131.114 73.9203 134.138 73.7327L137.431 73.5451L137.431 72.6545C137.431 71.3537 136.552 70.6037 135.11 70.6038C133.974 70.6038 133.235 70.9906 132.509 72.057C132.204 72.4554 131.818 72.643 131.325 72.643C130.61 72.643 130.095 72.1743 130.095 71.4711C130.095 71.2016 130.165 70.9438 130.294 70.6743C130.927 69.2328 132.849 68.3187 135.228 68.3186C138.31 68.3185 140.314 69.9474 140.314 72.4435L140.314 79.7677C140.314 80.7052 139.716 81.2326 138.896 81.2326C138.099 81.2326 137.548 80.7522 137.501 79.885L137.501 79.0178L137.443 79.0178C136.728 80.3655 135.169 81.1975 133.564 81.1976ZM134.454 78.9944C136.095 78.9944 137.431 77.8928 137.431 76.3928L137.431 75.4436L134.548 75.6194C133.142 75.7132 132.333 76.3461 132.333 77.3304C132.333 78.35 133.189 78.9945 134.454 78.9944ZM144.216 81.2324C143.361 81.2324 142.751 80.6817 142.751 79.6973L142.751 65.3887C142.751 64.4043 143.36 63.8535 144.216 63.8535C145.071 63.8535 145.669 64.4043 145.669 65.3886L145.669 79.6972C145.669 80.6816 145.072 81.2324 144.216 81.2324ZM152.947 81.2439C150.322 81.244 148.482 80.2362 147.884 78.7479C147.802 78.537 147.767 78.3495 147.767 78.1737C147.767 77.4706 148.282 77.0253 148.986 77.0252C149.466 77.0252 149.876 77.2479 150.251 77.74C150.908 78.6892 151.658 79.1111 153.052 79.1111C154.411 79.111 155.314 78.5368 155.314 77.5993C155.314 76.8493 154.845 76.4391 153.568 76.1462L151.552 75.6892C149.126 75.1385 147.931 73.9432 147.931 72.1386C147.931 69.83 149.923 68.3182 152.993 68.3181C155.384 68.318 157.235 69.4898 157.622 70.9195C157.657 71.0719 157.681 71.2125 157.681 71.3531C157.681 71.9625 157.294 72.3961 156.556 72.3961C156.134 72.3961 155.712 72.2438 155.442 71.8571C154.868 71.0016 154.153 70.4626 152.923 70.4626C151.646 70.4627 150.767 71.0838 150.767 71.9744C150.767 72.701 151.306 73.1931 152.595 73.4861L154.575 73.9196C157.2 74.5172 158.243 75.4664 158.243 77.3062C158.244 79.6851 156.111 81.2438 152.947 81.2439Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="blue-clip">
          <rect width="240" height="300" rx="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

// Purple — repeating chevron / arrow shapes
function PurpleSVG() {
  const paths = []
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 7; col++) {
      const x = col * 36 - 6, y = row * 28 + 4
      paths.push(`M${x} ${y + 14} L${x + 18} ${y} L${x + 36} ${y + 14}`)
    }
  }
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />)}
    </svg>
  )
}

// Red — concentric circles from bottom
function RedSVG() {
  const radii = [32, 72, 116, 163, 213, 265]
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {radii.map((r, i) => (
        <circle key={i} cx="120" cy="310" r={r} fill="none" stroke="white" strokeOpacity={0.20 - i * 0.015} strokeWidth={1.5} />
      ))}
    </svg>
  )
}

// Spicy — scattered dots (deterministic via sin/cos)
function SpicySVG() {
  const dots = Array.from({ length: 55 }, (_, i) => ({
    cx: ((Math.sin(i * 2.3 + 0.7) + 1) / 2) * 220 + 10,
    cy: ((Math.cos(i * 1.9 + 1.2) + 1) / 2) * 275 + 12,
    r:  2 + ((Math.sin(i * 3.7) + 1) / 2) * 5,
    op: 0.08 + ((Math.cos(i * 2.1) + 1) / 2) * 0.18,
  }))
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {dots.map((d, i) => <circle key={i} cx={d.cx.toFixed(1)} cy={d.cy.toFixed(1)} r={d.r.toFixed(1)} fill="white" fillOpacity={d.op.toFixed(2)} />)}
    </svg>
  )
}

// Teal — vesica piscis / overlapping circle rings
function TealSVG() {
  const cs = [
    { cx: 90,  cy: 140, r: 85 }, { cx: 150, cy: 140, r: 85 },
    { cx: 120, cy: 85,  r: 85 }, { cx: 120, cy: 195, r: 85 },
    { cx: 80,  cy: 195, r: 68 }, { cx: 160, cy: 195, r: 68 },
  ]
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {cs.map((c, i) => <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />)}
    </svg>
  )
}

// Yellow — overlapping rounded rect rings
function YellowSVG() {
  const rs = [
    { x: 15,  y: 35,  w: 210, h: 235, rx: 50 },
    { x: 35,  y: 15,  w: 210, h: 235, rx: 50 },
    { x: -10, y: 58,  w: 202, h: 202, rx: 45 },
    { x: 48,  y: 78,  w: 188, h: 188, rx: 45 },
    { x: 10,  y: 112, w: 218, h: 148, rx: 40 },
    { x: 58,  y: -4,  w: 148, h: 238, rx: 40 },
  ]
  return (
    <svg viewBox="0 0 240 300" style={_svgStyle} preserveAspectRatio="xMidYMid slice">
      {rs.map((r, i) => <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx} fill="none" stroke="white" strokeOpacity="0.16" strokeWidth="1.5" />)}
    </svg>
  )
}


// ── Progress dots ─────────────────────────────────────────────────────────────
function ProgressDots({ step, light = false, color = '#7A92FB' }) {
  const active = light ? 'rgba(255,255,255,0.9)' : color
  const inactive = light ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.12)'
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          style={{ height: 4, borderRadius: 9999, backgroundColor: i === step ? active : inactive }}
          animate={{ width: i === step ? 28 : 16 }}
          transition={{ type: 'spring', stiffness: 560, damping: 35 }}
        />
      ))}
    </div>
  )
}

// ── Combined header — flex row, properly centered ─────────────────────────────
function Header({ step, onClose, light = false, color = '#7A92FB' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 24px 0' }}>
      <div style={{ width: 40 }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <ProgressDots step={step} light={light} color={color} />
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: light ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)' }}>
          Jane's card
        </span>
      </div>
      <CloseBtn onClose={onClose} light={light} />
    </div>
  )
}

// ── Animated word-by-word text ────────────────────────────────────────────────
function AnimatedWords({ text, color = '#1a1a2e', delay = 0 }) {
  const words = text.split(' ')
  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.28em', justifyContent: 'center' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 588, damping: 32, delay: delay + i * 0.07 }}
          style={{ color, display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ── Close button ──────────────────────────────────────────────────────────────
function CloseBtn({ onClose, light = false }) {
  return (
    <button
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(255,255,255,0.20)',
        border: 'none',
        borderRadius: '50%',
        width: 40, height: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18,
        color: light ? 'rgba(255,255,255,0.85)' : '#555',
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'inherit',
        flexShrink: 0,
      }}
    >✕</button>
  )
}

// ── Shuffle icon ──────────────────────────────────────────────────────────────
function ShuffleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5"/>
      <path d="M4 20 21 3"/>
      <path d="M21 16v5h-5"/>
      <path d="m4 4 5 5"/>
      <path d="m16 16 5 5"/>
    </svg>
  )
}

// ── Slide to open (iPhone-style — only circle drags) ─────────────────────────
function SlideToOpen({ onSlide, color = '#1a1a2e', textColor = color }) {
  const TRACK_H = 64
  const CIRCLE_D = 56
  const TRACK_PAD = 4
  // Track inner width = phone(390) - padding(24*2) = 342
  const MAX_DRAG = 342 - CIRCLE_D - TRACK_PAD * 2
  const dragX = useMotionValue(0)

  const handleDragEnd = (_, info) => {
    if (info.offset.x > MAX_DRAG * 0.65) {
      onSlide()
    } else {
      animate(dragX, 0, { type: 'spring', stiffness: 420, damping: 32 })
    }
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: TRACK_H,
      backgroundColor: 'rgba(0,0,0,0.06)',
      borderRadius: 9999,
      overflow: 'hidden',
      userSelect: 'none',
    }}>
      {/* Centered label — shimmer via CSS background-clip:text */}
      <style>{`@keyframes _sto_shimmer{0%{background-position:200% 0}100%{background-position:-100% 0}}`}</style>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
          backgroundImage: `linear-gradient(90deg, ${textColor} 30%, ${textColor}44 50%, ${textColor} 70%)`,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: '_sto_shimmer 2.4s linear 0.5s infinite',
        }}>
          Slide to open hytch
        </span>
      </div>

      {/* Draggable circle — only this element moves */}
      <motion.div
        style={{
          position: 'absolute',
          left: TRACK_PAD, top: TRACK_PAD,
          width: CIRCLE_D, height: CIRCLE_D,
          borderRadius: '50%',
          backgroundColor: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 20,
          cursor: 'grab',
          zIndex: 2,
          x: dragX,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: MAX_DRAG }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 0.93 }}
      >
        →
      </motion.div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  { text: 'What is your favorite workout?' },
  { text: 'What does your ideal morning look like?' },
  { text: "What's your go-to comfort meal?" },
  { text: 'Where would your dream trip take you?' },
  { text: 'What does your perfect weekend look like?' },
]

const CATEGORIES = [
  { id: 'future',  label: 'Future & goals',      color: '#7A92FB', lightColor: '#E5E9FC', CardComponent: BlueSVG,
    circleColors: ['#2E54F9','#4769FA','#5B79FB','#6A85FB','#7A92FB','#92A6FC'] },
  { id: 'values',  label: 'Values & beliefs',    color: '#6B4E9A', lightColor: '#EDE8F4', CardComponent: PurpleSVG,
    circleColors: ['#3A1D6A','#4E2C82','#623D98','#7552AB','#8768BD','#9B80CC'] },
  { id: 'love',    label: 'Love & relationship', color: '#C45A52', lightColor: '#F0E8E7', CardComponent: RedSVG,
    circleColors: ['#8B2F28','#A83F37','#BF5149','#CC6560','#D47C74','#DF9690'] },
  { id: 'spicy',   label: 'Spicy',               color: '#A04468', lightColor: '#F4EAF0', CardComponent: SpicySVG,
    circleColors: ['#6E1B40','#882B55','#9D3B6A','#B04F7D','#C06690','#CC7DA3'] },
  { id: 'friends', label: 'Friends & family',    color: '#C07A18', lightColor: '#F4EDD8', CardComponent: YellowSVG,
    circleColors: ['#8A5009','#A66414','#BC7822','#CC8E36','#D8A050','#E2B468'] },
  { id: 'youme',   label: 'You & me',            color: '#1F8077', lightColor: '#D8ECEA', CardComponent: TealSVG,
    circleColors: ['#0D4E48','#146159','#1B7569','#25897B','#329D8E','#44B0A2'] },
]



// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState('home')
  const [expandingCategory, setExpandingCategory] = useState(0)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [showCard, setShowCard] = useState(false)
  const [showWords, setShowWords] = useState(false)
  const [cardFlipped, setCardFlipped] = useState(false)
  const [answersKey, setAnswersKey] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [categoryIndex, setCategoryIndex] = useState(1)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(1)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sentQuestion, setSentQuestion] = useState('')
  const [receivedCardFlipped, setReceivedCardFlipped] = useState(false)

  const currentQuestion = QUESTIONS[questionIndex % QUESTIONS.length]
  const selectedCategory = CATEGORIES[selectedCategoryIndex]

  // Expanding → intro transition
  useEffect(() => {
    if (phase !== 'expanding') return
    const t = setTimeout(() => setPhase('intro'), 1500)
    return () => clearTimeout(t)
  }, [phase])

  // Intro sequence
  useEffect(() => {
    if (phase !== 'intro') return
    const t1 = setTimeout(() => setShowWords(true), 60)
    const t2 = setTimeout(() => setShowCard(true), 390)
    const t3 = setTimeout(() => setCardFlipped(true), 900)
    const t4 = setTimeout(() => { setPhase('answers'); setAnswersKey(k => k + 1) }, 1380)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [phase])

  // Sending — card flips back + flies up, then enter category selection from rightmost
  useEffect(() => {
    if (phase !== 'sending') return
    const t = setTimeout(() => {
      setCategoryIndex(CATEGORIES.length - 1)
      setPhase('select-category')
    }, 1050)
    return () => clearTimeout(t)
  }, [phase])

  // Select-category entrance — auto-scroll right → left so all cards are revealed
  useEffect(() => {
    if (phase !== 'select-category') return
    const timers = []
    for (let i = 1; i < CATEGORIES.length; i++) {
      const t = setTimeout(() => setCategoryIndex(CATEGORIES.length - 1 - i), 200 + i * 220)
      timers.push(t)
    }
    return () => timers.forEach(clearTimeout)
  }, [phase])

  // Sending category — selected card flies up, then show received
  useEffect(() => {
    if (phase !== 'sending-category') return
    const t = setTimeout(() => {
      setSelectedCategoryIndex(categoryIndex)
      setShowAnswer(false)
      setPhase('received')
    }, 750)
    return () => clearTimeout(t)
  }, [phase])

  // Received flipping — card flips then transitions to received-question
  useEffect(() => {
    if (phase !== 'received-flipping') return
    const t1 = setTimeout(() => setReceivedCardFlipped(true), 80)
    const t2 = setTimeout(() => {
      setPhase('received-question')
      setTimeout(() => setShowAnswer(true), 500)
    }, 860)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [phase])

  const handleNext = () => {
    if (!typedAnswer.trim()) return
    setSentQuestion(currentQuestion.text)
    setPhase('sending')
  }

  const handleShuffle = () => {
    setTypedAnswer('')
    setQuestionIndex(i => i + 1)
  }

  const handleNextCategory = () => {
    setPhase('sending-category')
  }

  const handleSlideOpen = () => {
    setReceivedCardFlipped(false)
    setPhase('received-flipping')
  }

  const handleReset = () => {
    setShowWords(false)
    setShowCard(false)
    setCardFlipped(false)
    setReceivedCardFlipped(false)
    setTypedAnswer('')
    setQuestionIndex(0)
    setCategoryIndex(1)
    setSelectedCategoryIndex(1)
    setShowAnswer(false)
    setSentQuestion('')
    setPhase('home')
  }

  const handleHytchClick = (catIndex) => {
    setExpandingCategory(catIndex)
    setPhase('expanding')
  }

  const handleClose = () => {
    setPhase('closed')
    setTypedAnswer('')
    setReceivedCardFlipped(false)
    setShowCard(false)
    setShowWords(false)
    setCardFlipped(false)
  }

  const CARD_W = 224
  const CARD_H = 280

  return (
    <div style={S.root}>
      <Agentation />
      <div style={S.phone}>

        {/* ── HOME ── */}
        <AnimatePresence>
          {phase === 'home' && (
            <motion.div key="home" style={{ ...S.screen, padding: '60px 20px 20px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <p style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.025em', margin: '0 0 24px 4px' }}>
                Your Hytches
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {CATEGORIES.map((cat, i) => {
                  const { CardComponent } = cat
                  return (
                    <motion.div
                      key={cat.id}
                      style={{
                        width: '100%', aspectRatio: '4/5',
                        borderRadius: 16, overflow: 'hidden',
                        backgroundColor: cat.color, cursor: 'pointer',
                        position: 'relative',
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleHytchClick(i)}
                    >
                      <CardComponent />
                      <div style={{
                        position: 'absolute', bottom: 8, left: 0, right: 0,
                        textAlign: 'center', fontSize: 11, fontWeight: 600,
                        color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em',
                      }}>
                        {cat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EXPANDING ── */}
        <AnimatePresence>
          {phase === 'expanding' && (() => {
            const frontCat = CATEGORIES[expandingCategory]
            const backCatIndex = (expandingCategory + 1) % CATEGORIES.length
            const backCat = CATEGORIES[backCatIndex]
            const FrontCard = frontCat.CardComponent
            const BackCard = backCat.CardComponent
            return (
              <motion.div key="expanding" style={{ ...S.screen, alignItems: 'center', justifyContent: 'center' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                <div style={{ position: 'relative', width: CARD_W, height: CARD_H + 40 }}>
                  {/* Back card — other person's card, peeking from behind */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: 0,
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: 28,
                      overflow: 'hidden',
                      backgroundColor: backCat.color,
                      transformOrigin: 'center bottom',
                    }}
                    initial={{ scale: 0, x: '-50%', opacity: 0 }}
                    animate={{ scale: 0.88, x: '-50%', y: -20, opacity: 0.7, rotate: -2 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 380, damping: 32 }}
                  >
                    <BackCard />
                  </motion.div>

                  {/* Front card — your card, biggest */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: 20,
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: 28,
                      overflow: 'hidden',
                      backgroundColor: frontCat.color,
                      boxShadow: `0 20px 60px ${frontCat.color}55`,
                      zIndex: 2,
                    }}
                    initial={{ scale: 0, x: '-50%', opacity: 0 }}
                    animate={{ scale: 1, x: '-50%', opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <FrontCard />
                  </motion.div>
                </div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        {/* ── CLOSED ── */}
        <AnimatePresence>
          {phase === 'closed' && (
            <motion.div key="closed" style={{ ...S.screen, alignItems: 'center', justifyContent: 'center', gap: 16 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ color: '#888', fontSize: 15, margin: 0 }}>Card dismissed</p>
              <button style={{ ...S.nextBtn, width: 'auto', padding: '14px 32px', borderRadius: 9999 }} onClick={handleReset}>Reopen</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── INTRO ── */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div key="intro" style={S.screen} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
              <Header step={1} onClose={handleClose} />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
                {showWords && (
                  <div style={{ textAlign: 'center', fontSize: 26, fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.025em', maxWidth: 230 }}>
                    <AnimatedWords text="Jane's question to you" color="#1a1a2e" delay={0} />
                  </div>
                )}

                {(() => {
                  const IntroCard = CATEGORIES[0].CardComponent
                  const introColor = CATEGORIES[0].color
                  return (
                    <AnimatePresence>
                      {showCard && (
                        <div key="intro-card-wrap" style={{ perspective: 700 }}>
                          <motion.div
                            style={{ position: 'relative', width: CARD_W, height: CARD_H, transformStyle: 'preserve-3d', borderRadius: 28 }}
                            initial={{ y: 70, scale: 0.72, opacity: 0, rotateY: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1, rotateY: cardFlipped ? 180 : 0 }}
                            transition={{
                              y:       { type: 'spring', stiffness: 336, damping: 30 },
                              scale:   { type: 'spring', stiffness: 336, damping: 30 },
                              opacity: { duration: 0.15 },
                              rotateY: { type: 'spring', stiffness: 196, damping: 25 },
                            }}
                          >
                            <div style={{ position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundColor: introColor }}>
                              <IntroCard />
                            </div>
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', borderRadius: 28, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CIRCLES BACKGROUND — fades in with answers, persists through sending ── */}
        <AnimatePresence>
          {(phase === 'answers' || phase === 'sending') && (
            <motion.div
              key="circles-bg"
              style={{ position: 'absolute', inset: 0, backgroundColor: CATEGORIES[0].color, overflow: 'hidden', zIndex: 10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              <style>{`@keyframes circle-breathe{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.07)}}`}</style>
              {[370, 298, 222, 156, 94, 52].map((r, i) => (
                <div key={i} style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: r * 2, height: r * 2, borderRadius: '50%',
                  backgroundColor: CATEGORIES[0].circleColors[i],
                  animation: `circle-breathe ${5 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
                  pointerEvents: 'none',
                }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ANSWERS ── */}
        <AnimatePresence>
          {phase === 'answers' && (
            <motion.div
              key={`answers-${answersKey}`}
              style={{ ...S.screen, backgroundColor: 'transparent', zIndex: 11 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* Category pill header */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 24px 0' }}>
                <div style={{ width: 40 }} />
                <motion.div
                  style={{ backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 9999, padding: '10px 22px' }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, type: 'spring', stiffness: 448, damping: 32 }}
                >
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>
                    {CATEGORIES[0].label}
                  </span>
                </motion.div>
                <CloseBtn onClose={handleClose} light />
              </div>

              {/* White card: question + textarea */}
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 24px 0' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={questionIndex}
                    style={{ backgroundColor: '#fff', borderRadius: 24, padding: '32px 28px 28px', width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}
                    initial={{ scale: 0.78, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  >
                    <p style={{ fontSize: 26, fontWeight: 700, color: CATEGORIES[0].color, letterSpacing: '-0.025em', lineHeight: 1.3, margin: 0 }}>
                      {currentQuestion.text}
                    </p>
                    <textarea
                      value={typedAnswer}
                      onChange={e => setTypedAnswer(e.target.value)}
                      placeholder="Type here..."
                      style={{
                        width: '100%', border: 'none', outline: 'none',
                        fontSize: 18, color: '#1a1a2e', resize: 'none', height: 180,
                        fontFamily: 'inherit', backgroundColor: 'transparent',
                        caretColor: CATEGORIES[0].color,
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom controls */}
              <motion.div
                style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 12, padding: '16px 24px 44px', alignItems: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                <motion.button style={S.shuffleBtn} whileTap={{ scale: 0.94 }} onClick={handleShuffle}>
                  <ShuffleIcon />
                </motion.button>
                <motion.button
                  style={{ ...S.nextBtn, flex: 1, borderRadius: 9999, color: CATEGORIES[0].color, opacity: typedAnswer.trim() ? 1 : 0.55, cursor: typedAnswer.trim() ? 'pointer' : 'default' }}
                  whileTap={typedAnswer.trim() ? { scale: 0.97 } : {}}
                  onClick={handleNext}
                >
                  Next
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SENDING — card flips blue then flies up ── */}
        <AnimatePresence>
          {phase === 'sending' && (
            <motion.div
              key="sending"
              style={{ ...S.screen, backgroundColor: 'transparent', zIndex: 12, alignItems: 'center', justifyContent: 'center' }}
              initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div style={{ perspective: 700 }}>
                {(() => {
                  const SendCard = CATEGORIES[0].CardComponent
                  return (
                    <motion.div
                      style={{ position: 'relative', width: CARD_W, height: CARD_H, transformStyle: 'preserve-3d', borderRadius: 28 }}
                      initial={{ rotateY: 180, y: 0 }}
                      animate={{ rotateY: 0, y: -900 }}
                      transition={{
                        rotateY: { type: 'spring', stiffness: 196, damping: 25 },
                        y: { delay: 0.52, type: 'spring', stiffness: 180, damping: 22 },
                      }}
                    >
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundColor: CATEGORIES[0].color }}>
                        <SendCard />
                      </div>
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', borderRadius: 28, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
                    </motion.div>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SELECT CATEGORY ── */}
        <AnimatePresence>
          {(phase === 'select-category' || phase === 'sending-category') && (
            <motion.div
              key="select-category"
              style={{ ...S.screen }}
              initial={{ opacity: 0, backgroundColor: CATEGORIES[categoryIndex].lightColor }}
              animate={{ opacity: 1, backgroundColor: CATEGORIES[categoryIndex].lightColor }}
              exit={{ opacity: 0 }}
              transition={{ backgroundColor: { duration: 0.24 }, opacity: { duration: 0.15 } }}
            >
              <Header step={2} onClose={handleClose} color={CATEGORIES[categoryIndex].color} />

              {/* Title + carousel — centered together as one unit */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>

                  {/* Title */}
                  <motion.p
                    style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.022em', lineHeight: 1.3, margin: 0, textAlign: 'center', padding: '0 32px' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06, type: 'spring', stiffness: 448, damping: 32 }}
                  >
                    What do you want to<br />ask Jane about?
                  </motion.p>

                  {/* Carousel */}
                  <motion.div
                    style={{ height: 310, position: 'relative', width: '100%', padding: '16px 0' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.17, type: 'spring', stiffness: 420, damping: 32 }}
                  >
                {CATEGORIES.map((cat, i) => {
                  const offsetX = (i - categoryIndex) * 216
                  const distance = Math.abs(i - categoryIndex)
                  const scale = distance === 0 ? 1 : 0.82
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.65 : 0.3
                  const { CardComponent } = cat
                  return (
                    <motion.div
                      key={cat.id}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: CARD_W,
                        height: CARD_H,
                        borderRadius: 28,
                        backgroundColor: cat.color,
                        overflow: 'hidden',
                        cursor: distance > 0 ? 'pointer' : 'default',
                        boxShadow: distance === 0 ? '0 16px 56px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.08)',
                      }}
                      animate={{ x: offsetX - CARD_W / 2, y: -CARD_H / 2, scale, opacity }}
                      transition={{ type: 'spring', stiffness: 448, damping: 37 }}
                      onClick={() => distance > 0 && setCategoryIndex(i)}
                    >
                      <CardComponent />
                    </motion.div>
                  )
                })}

                {/* Drag overlay */}
                <motion.div
                  style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60 && categoryIndex < CATEGORIES.length - 1) {
                      setCategoryIndex(i => i + 1)
                    } else if (info.offset.x > 60 && categoryIndex > 0) {
                      setCategoryIndex(i => i - 1)
                    }
                  }}
                />
                  </motion.div>
                </div>
              </div>

              {/* Category label */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${categoryIndex}`}
                  style={{ textAlign: 'center', paddingTop: 16, paddingBottom: 4 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: 'spring', stiffness: 532, damping: 32 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: CATEGORIES[categoryIndex].color, letterSpacing: '-0.01em' }}>
                    {CATEGORIES[categoryIndex].label}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Next button */}
              <div style={{ padding: '12px 24px 44px' }}>
                <motion.button
                  style={{ ...S.nextBtn, borderRadius: 9999, backgroundColor: CATEGORIES[categoryIndex].color, color: '#fff', boxShadow: 'none' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextCategory}
                  animate={{ backgroundColor: CATEGORIES[categoryIndex].color }}
                  transition={{ duration: 0.21 }}
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RECEIVED ── */}
        <AnimatePresence>
          {phase === 'received' && (
            <motion.div
              key="received"
              style={{ ...S.screen, backgroundColor: selectedCategory.lightColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.15 }}
            >
              <Header step={3} onClose={handleClose} color={selectedCategory.color} />

              {/* Avatar + title + card — centered together */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

                  {/* Avatar + title */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <motion.div
                      style={{
                        width: 48, height: 48, borderRadius: '50%',
                        backgroundColor: selectedCategory.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 18, fontWeight: 700,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.06, type: 'spring', stiffness: 504, damping: 30 }}
                    >
                      J
                    </motion.div>
                    <motion.p
                      style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', letterSpacing: '-0.02em', lineHeight: 1.3, margin: 0, textAlign: 'center' }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.11, type: 'spring', stiffness: 448, damping: 32 }}
                    >
                      Jane's answer<br />of your hytch
                    </motion.p>
                  </div>

                  {/* Card */}
                  <motion.div
                    style={{
                      position: 'relative',
                      width: CARD_W,
                      height: CARD_H,
                      backgroundColor: selectedCategory.color,
                      borderRadius: 28,
                      overflow: 'hidden',
                      boxShadow: `0 16px 56px ${selectedCategory.color}55`,
                    }}
                    initial={{ opacity: 0, scale: 0.88, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.17, type: 'spring', stiffness: 392, damping: 30 }}
                  >
                    <selectedCategory.CardComponent />
                  </motion.div>


                </div>
              </div>

              {/* Slide to open */}
              <div style={{ padding: '8px 24px 44px' }}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.27, type: 'spring', stiffness: 448, damping: 32 }}
                >
                  <SlideToOpen onSlide={handleSlideOpen} color={selectedCategory.color} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SENDING CATEGORY — selected card flies up ── */}
        <AnimatePresence>
          {phase === 'sending-category' && (
            <motion.div
              key="sending-category"
              style={{ ...S.screen, backgroundColor: 'transparent', zIndex: 15, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
              initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {(() => {
                const CatCard = CATEGORIES[categoryIndex].CardComponent
                return (
                  <motion.div
                    style={{ position: 'relative', width: CARD_W, height: CARD_H, borderRadius: 28, overflow: 'hidden', backgroundColor: CATEGORIES[categoryIndex].color, boxShadow: `0 16px 56px ${CATEGORIES[categoryIndex].color}55` }}
                    initial={{ y: 0, scale: 1, opacity: 1 }}
                    animate={{ y: -900, opacity: 0.85 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  >
                    <CatCard />
                  </motion.div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RECEIVED FLIPPING — card flips from color face to white ── */}
        <AnimatePresence>
          {phase === 'received-flipping' && (
            <motion.div
              key="received-flipping"
              style={{ ...S.screen, backgroundColor: selectedCategory.lightColor, zIndex: 20, alignItems: 'center', justifyContent: 'center' }}
              initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div style={{ perspective: 700 }}>
                {(() => {
                  const FlipCard = selectedCategory.CardComponent
                  return (
                    <motion.div
                      style={{ position: 'relative', width: CARD_W, height: CARD_H, transformStyle: 'preserve-3d', borderRadius: 28 }}
                      animate={{ rotateY: receivedCardFlipped ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 196, damping: 25 }}
                    >
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 28, overflow: 'hidden', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', backgroundColor: selectedCategory.color }}>
                        <FlipCard />
                      </div>
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#fff', borderRadius: 28, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} />
                    </motion.div>
                  )
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RECEIVED QUESTION CIRCLES BG ── */}
        <AnimatePresence>
          {phase === 'received-question' && (
            <motion.div
              key="received-circles-bg"
              style={{ position: 'absolute', inset: 0, backgroundColor: selectedCategory.color, overflow: 'hidden', zIndex: 21 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              <style>{`@keyframes circle-breathe{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.07)}}`}</style>
              {[370, 298, 222, 156, 94, 52].map((r, i) => (
                <div key={i} style={{
                  position: 'absolute', left: '50%', top: '50%',
                  width: r * 2, height: r * 2, borderRadius: '50%',
                  backgroundColor: selectedCategory.circleColors[i],
                  animation: `circle-breathe ${5 + i * 0.7}s ease-in-out ${i * 0.4}s infinite`,
                  pointerEvents: 'none',
                }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── RECEIVED QUESTION ── */}
        <AnimatePresence>
          {phase === 'received-question' && (
            <motion.div
              key="received-question"
              style={{ ...S.screen, backgroundColor: 'transparent', zIndex: 22 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* Category pill header */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 24px 0' }}>
                <div style={{ width: 40 }} />
                <motion.div
                  style={{ backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 9999, padding: '10px 22px' }}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, type: 'spring', stiffness: 448, damping: 32 }}
                >
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>
                    {selectedCategory.label}
                  </span>
                </motion.div>
                <CloseBtn onClose={handleReset} light />
              </div>

              {/* White card: question + Jane's answer */}
              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 24px 0' }}>
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      key="jane-answer-card"
                      style={{ backgroundColor: '#fff', borderRadius: 24, padding: '32px 28px 28px', width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}
                      initial={{ scale: 0.78, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    >
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
                        Jane answered
                      </p>
                      <p style={{ fontSize: 22, fontWeight: 700, color: selectedCategory.color, letterSpacing: '-0.025em', lineHeight: 1.3, margin: 0 }}>
                        {sentQuestion || currentQuestion.text}
                      </p>
                      <p style={{ fontSize: 18, color: '#1a1a2e', lineHeight: 1.55, margin: 0 }}>
                        Going on long hikes in the mountains with friends on the weekend.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close button */}
              <div style={{ position: 'relative', zIndex: 1, padding: '16px 24px 44px' }}>
                <AnimatePresence>
                  {showAnswer && (
                    <motion.button
                      style={{ ...S.nextBtn, borderRadius: 9999, color: selectedCategory.color }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28, type: 'spring', stiffness: 448, damping: 32 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReset}
                    >
                      Close
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
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
    width: 390,
    height: 844,
    backgroundColor: '#F5F7FF',
    borderRadius: 52,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 40px 100px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.08)',
  },
  screen: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F5F7FF',
  },
  answerBtn: {
    width: '100%',
    borderRadius: 20,
    border: 'none',
    fontSize: 20,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: FONT,
    letterSpacing: '-0.01em',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffleBtn: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.22)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    color: '#fff',
  },
  nextBtn: {
    width: '100%',
    padding: '18px 24px',
    borderRadius: 16,
    border: 'none',
    backgroundColor: '#fff',
    color: '#1a1a2e',
    fontSize: 17,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: FONT,
    letterSpacing: '-0.01em',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
}
