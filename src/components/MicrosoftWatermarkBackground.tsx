import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DomainId, AppTheme } from '../types';

export type WatermarkMode = 'hologram' | 'ambient' | 'subtle' | 'off';

const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

interface MicrosoftWatermarkBackgroundProps {
  selectedDomain?: DomainId;
  theme?: AppTheme;
  mode?: WatermarkMode;
}

interface MinionProps {
  id: number;
  name: string;
  role: string;
  primaryColor: string;
  secondaryColor: string;
  overallsColor: string;
  glowColor: string;
  eyeCount: 1 | 2;
  walkPhase: number;
  scrollProgress: number;
  dirX: number; // -1 for left, +1 for right
  dirY: number; // -1 for up, +1 for down
  isDomainActive: boolean;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number) => void;
  pupilOffset: { x: number; y: number }; // Pre-interpolated 60fps GPU smooth pupil coordinates
  blinkPhase: number; // 0 to 1 for smooth natural eyelid blink
  fightIntensity: number; // 0 (calm) to 1 (full comical brawl)
  fightTime: number; // continuous time in seconds for fight kinematics
}

/* =========================================================================
   CUTE VECTOR MINION COMPONENT WITH FLUID GAZE & 4-SEC IDLE BRAWL ANIMATIONS
   ========================================================================= */
const MinionCharacter: React.FC<MinionProps> = ({
  id,
  name,
  role,
  primaryColor,
  secondaryColor,
  overallsColor,
  glowColor,
  eyeCount,
  walkPhase,
  scrollProgress,
  dirX,
  dirY,
  isDomainActive,
  isHovered,
  onHover,
  onClick,
  pupilOffset,
  blinkPhase,
  fightIntensity,
  fightTime,
}) => {
  // Standard walking kinematics calculations
  const isWalking = scrollProgress > 0.005;
  const normalLegSwing = isWalking ? Math.sin(walkPhase) * 34 : 0;
  const normalArmSwing = isWalking ? Math.sin(walkPhase) * 40 : 0;
  const normalBodyBob = isWalking
    ? Math.abs(Math.sin(walkPhase * 2)) * 7
    : Math.sin(Date.now() / 800 + id * 1.5) * 2;
  const normalBodyTilt = isWalking ? Math.sin(walkPhase) * 5 + dirX * 6 : 0;

  // Base 2x2 grid spacing = 72px offset from dead center
  const baseOffset = 72;
  const travelDistance = scrollProgress * 230; // 0px -> 230px diagonally
  const baseNormalPosX = dirX * (baseOffset + travelDistance);
  const baseNormalPosY = dirY * (baseOffset + travelDistance);

  // =========================================================================
  // COMICAL 2-SECOND IDLE FIGHT CALCULATIONS (SLOW & SMOOTH KINEMATICS)
  // =========================================================================
  // Cycle through comical clash phases slowly (every 6 seconds per phase)
  const fightCycle = Math.floor(fightTime / 5.0) % 3;
  let targetFightOffsetX = 0;
  let targetFightOffsetY = 0;
  let fightArmLeft = 0;
  let fightArmRight = 0;
  let fightLegSwing = 0;
  let fightBodyTilt = 0;
  let fightJumpBob = 0;

  if (fightIntensity > 0.01) {
    // Slower, graceful fight time clock (slow-mo cartoon slapstick)
    const t = fightTime * 1.8;

    if (fightCycle === 0) {
      // Phase 1: Slow-motion Horizontal Lunge (Red vs Green, Blue vs Yellow)
      const chargeX = dirX < 0
        ? Math.sin(t + id * 0.8) * 26 + 22
        : -Math.sin(t + id * 0.8) * 26 - 22;
      const jiggleY = Math.cos(t * 0.9 + id) * 10;
      targetFightOffsetX = chargeX;
      targetFightOffsetY = jiggleY;
    } else if (fightCycle === 1) {
      // Phase 2: Slow-motion Vertical Bob & Pounce (Red drops toward Blue, Green toward Yellow)
      const chargeY = dirY < 0
        ? Math.sin(t + id * 0.8) * 26 + 22
        : -Math.sin(t + id * 0.8) * 26 - 22;
      const jiggleX = Math.cos(t * 0.9 + id) * 10;
      targetFightOffsetX = jiggleX;
      targetFightOffsetY = chargeY;
    } else {
      // Phase 3: Gentle Center Orbital Dance / Ring Brawl
      const angle = fightTime * 1.2 + (id * Math.PI) / 2;
      const radius = 28 + Math.sin(t * 0.8 + id) * 12;
      targetFightOffsetX = Math.cos(angle) * radius - baseNormalPosX * 0.45;
      targetFightOffsetY = Math.sin(angle) * radius - baseNormalPosY * 0.45;
    }

    // Smooth, slow-motion windmill / slap arm motions
    fightArmLeft = Math.sin(fightTime * 4.8 + id * 1.2) * 45;
    fightArmRight = Math.cos(fightTime * 5.2 + id * 1.2) * 50;

    // Gentle rhythmic bobbing and foot shifting
    fightLegSwing = Math.sin(fightTime * 4.5 + id) * 22;
    fightJumpBob = Math.abs(Math.sin(fightTime * 2.8 + id * 0.9)) * 12;
    fightBodyTilt = Math.sin(fightTime * 3.2 + id * 1.1) * 8 + (dirX * -5);
  }

  // Smoothly blend between normal resting/walking state and comical brawl state
  const posX = lerp(baseNormalPosX, baseNormalPosX + targetFightOffsetX, fightIntensity);
  const posY = lerp(baseNormalPosY, baseNormalPosY + targetFightOffsetY, fightIntensity);
  const bodyBob = lerp(normalBodyBob, fightJumpBob, fightIntensity);
  const bodyTilt = lerp(normalBodyTilt, fightBodyTilt, fightIntensity);
  const legSwing = lerp(normalLegSwing, fightLegSwing, fightIntensity);
  const armSwingLeft = lerp(-normalArmSwing, fightArmLeft, fightIntensity);
  const armSwingRight = lerp(normalArmSwing, fightArmRight, fightIntensity);

  // Eyelid blink scale (1 = fully open, 0 = closed eyelid)
  const eyeOpenScale = Math.max(0.05, 1 - blinkPhase);

  // Subtle smooth eye pupil drift during fight mode
  const fightPupilJitterX = fightIntensity > 0.05 ? Math.sin(fightTime * 4 + id) * 1.5 * fightIntensity : 0;
  const fightPupilJitterY = fightIntensity > 0.05 ? Math.cos(fightTime * 4 + id) * 1.2 * fightIntensity : 0;
  const finalPupilX = pupilOffset.x + fightPupilJitterX;
  const finalPupilY = pupilOffset.y + fightPupilJitterY;

  return (
    <div
      onClick={() => onClick(id)}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      className="absolute top-1/2 left-1/2 cursor-pointer pointer-events-auto select-none group will-change-transform"
      style={{
        transform: `translate3d(calc(-50% + ${posX}px), calc(-50% + ${posY - bodyBob}px), 0) scale(${
          isHovered ? 1.14 : isDomainActive ? 1.08 : 1.0
        })`,
        zIndex: isHovered || isDomainActive ? 30 : 10,
        transition: 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Dynamic Soft Ambient Footprint Dust / Glow Halo */}
      <div
        className="absolute -inset-6 rounded-full blur-xl transition-all duration-300 pointer-events-none"
        style={{
          background: glowColor,
          opacity: isDomainActive ? 0.6 : isHovered ? 0.5 : fightIntensity > 0.2 ? 0.45 : 0.22,
        }}
      />

      {/* Comic Fight Exclamation Sparkles / Sweat Drops */}
      {fightIntensity > 0.3 && (
        <div
          className="absolute -top-6 -right-3 text-xs font-black select-none pointer-events-none animate-bounce"
          style={{
            color: primaryColor,
            textShadow: '0 0 8px rgba(0,0,0,0.5)',
          }}
        >
          {id % 2 === 0 ? '💢' : '💦'}
        </div>
      )}

      {/* SVG Cartoon Minion Vector */}
      <div
        className="relative w-28 h-36 sm:w-32 sm:h-40"
        style={{
          transform: `rotate(${bodyTilt}deg)`,
          transformOrigin: '50% 85%',
        }}
      >
        <svg
          viewBox="0 0 120 160"
          className="w-full h-full drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Body Gradient */}
            <linearGradient id={`minion-body-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>

            {/* Overalls Gradient */}
            <linearGradient id={`minion-overalls-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={overallsColor} />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Metallic Goggle Rim Gradient */}
            <linearGradient id={`goggle-metal-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="45%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Clip path for single eye lens to keep pupil neatly inside */}
            <clipPath id={`single-lens-clip-${id}`}>
              <circle cx="60" cy="53" r="16" />
            </clipPath>

            {/* Clip paths for twin eye lenses */}
            <clipPath id={`twin-left-lens-clip-${id}`}>
              <circle cx="47" cy="53" r="11" />
            </clipPath>
            <clipPath id={`twin-right-lens-clip-${id}`}>
              <circle cx="73" cy="53" r="11" />
            </clipPath>
          </defs>

          {/* ====================================================
              FEET & BOOTS (Walking or Fighting animated on alternating cycles)
              ==================================================== */}
          <g id="minion-feet">
            {/* Left Leg & Boot (Foot) */}
            <g
              style={{
                transform: `rotate(${legSwing}deg)`,
                transformOrigin: '42px 125px',
                transition: 'transform 0.06s linear',
              }}
            >
              <rect x="36" y="125" width="12" height="15" rx="3" fill="#1e293b" />
              <path
                d="M 28 136 C 28 133 46 133 48 136 L 50 144 C 50 148 24 148 24 144 Z"
                fill="#0f172a"
              />
              <rect x="24" y="143" width="26" height="4" rx="2" fill="#020617" />
            </g>

            {/* Right Leg & Boot (Foot) */}
            <g
              style={{
                transform: `rotate(${-legSwing}deg)`,
                transformOrigin: '78px 125px',
                transition: 'transform 0.06s linear',
              }}
            >
              <rect x="72" y="125" width="12" height="15" rx="3" fill="#1e293b" />
              <path
                d="M 68 136 C 68 133 86 133 88 136 L 94 144 C 94 148 68 148 68 144 Z"
                fill="#0f172a"
              />
              <rect x="68" y="143" width="26" height="4" rx="2" fill="#020617" />
            </g>
          </g>

          {/* ====================================================
              LEFT HAND & ARM (Flails / punches in fight mode)
              ==================================================== */}
          <g
            id="left-arm"
            style={{
              transform: `rotate(${armSwingLeft}deg)`,
              transformOrigin: '22px 85px',
              transition: 'transform 0.06s linear',
            }}
          >
            <path
              d="M 24 82 Q 10 95 14 112"
              fill="none"
              stroke={`url(#minion-body-${id})`}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="14" cy="112" r="7" fill="#0f172a" />
            <circle cx="10" cy="114" r="3.5" fill="#1e293b" />
            <circle cx="18" cy="114" r="3.5" fill="#1e293b" />
          </g>

          {/* ====================================================
              MINION MAIN CAPSULE BODY
              ==================================================== */}
          <rect
            x="24"
            y="20"
            width="72"
            height="105"
            rx="36"
            fill={`url(#minion-body-${id})`}
          />

          {/* Top Hair Strands */}
          <path d="M 58 20 Q 56 10 52 8" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 60 20 Q 60 8 60 6" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 62 20 Q 64 10 68 8" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Goggle Strap (Black Band) */}
          <rect x="24" y="48" width="72" height="10" fill="#0f172a" />

          {/* ====================================================
              GOGGLE(S) & SILKY-SMOOTH GPU TRANSLATED PUPILS
              ==================================================== */}
          {eyeCount === 1 ? (
            /* Big Single Cyclops Eye */
            <g id="single-eye">
              {/* Metallic Goggle Rim */}
              <circle cx="60" cy="53" r="21" fill={`url(#goggle-metal-${id})`} stroke="#1e293b" strokeWidth="2" />
              {/* Goggle Lens White Background */}
              <circle cx="60" cy="53" r="16" fill="#f8fafc" />

              {/* Clipped Pupil & Iris for Smooth Motion without overflow */}
              <g clipPath={`url(#single-lens-clip-${id})`}>
                <g
                  style={{
                    transform: `translate3d(${finalPupilX}px, ${finalPupilY}px, 0)`,
                    willChange: 'transform',
                  }}
                >
                  {/* Outer Iris */}
                  <circle cx="60" cy="53" r="7.5" fill={primaryColor} />
                  {/* Inner Dark Pupil */}
                  <circle cx="60" cy="53" r="4.5" fill="#0f172a" />
                  {/* High-Reflective White Specular Glint */}
                  <circle cx="58" cy="50" r="2.3" fill="#ffffff" />
                  <circle cx="62" cy="55" r="1.1" fill="#ffffff" opacity="0.8" />
                </g>

                {/* Natural Eyelid Blink Cover / Determined Battle Squint */}
                {blinkPhase > 0.05 && (
                  <rect
                    x="40"
                    y="35"
                    width="40"
                    height={36 * (1 - eyeOpenScale)}
                    fill={`url(#minion-body-${id})`}
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                )}
              </g>

              {/* Comical Angry Eyebrow Overlay During Fight Mode */}
              {fightIntensity > 0.2 && (
                <path
                  d={dirX < 0 ? 'M 44 38 L 74 44' : 'M 46 44 L 76 38'}
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ opacity: fightIntensity }}
                />
              )}
            </g>
          ) : (
            /* Twin Goggle Eyes */
            <g id="twin-eyes">
              {/* --- Left Eye --- */}
              <circle cx="47" cy="53" r="15" fill={`url(#goggle-metal-${id})`} stroke="#1e293b" strokeWidth="1.5" />
              <circle cx="47" cy="53" r="11" fill="#f8fafc" />

              <g clipPath={`url(#twin-left-lens-clip-${id})`}>
                <g
                  style={{
                    transform: `translate3d(${finalPupilX}px, ${finalPupilY}px, 0)`,
                    willChange: 'transform',
                  }}
                >
                  <circle cx="47" cy="53" r="5.5" fill={primaryColor} />
                  <circle cx="47" cy="53" r="3.2" fill="#0f172a" />
                  <circle cx="45.5" cy="51" r="1.6" fill="#ffffff" />
                </g>
                {/* Blink Cover Left */}
                {blinkPhase > 0.05 && (
                  <rect
                    x="34"
                    y="40"
                    width="26"
                    height={26 * (1 - eyeOpenScale)}
                    fill={`url(#minion-body-${id})`}
                    stroke="#0f172a"
                    strokeWidth="1"
                  />
                )}
              </g>

              {/* --- Right Eye --- */}
              <circle cx="73" cy="53" r="15" fill={`url(#goggle-metal-${id})`} stroke="#1e293b" strokeWidth="1.5" />
              <circle cx="73" cy="53" r="11" fill="#f8fafc" />

              <g clipPath={`url(#twin-right-lens-clip-${id})`}>
                <g
                  style={{
                    transform: `translate3d(${finalPupilX}px, ${finalPupilY}px, 0)`,
                    willChange: 'transform',
                  }}
                >
                  <circle cx="73" cy="53" r="5.5" fill={primaryColor} />
                  <circle cx="73" cy="53" r="3.2" fill="#0f172a" />
                  <circle cx="71.5" cy="51" r="1.6" fill="#ffffff" />
                </g>
                {/* Blink Cover Right */}
                {blinkPhase > 0.05 && (
                  <rect
                    x="60"
                    y="40"
                    width="26"
                    height={26 * (1 - eyeOpenScale)}
                    fill={`url(#minion-body-${id})`}
                    stroke="#0f172a"
                    strokeWidth="1"
                  />
                )}
              </g>

              {/* Comical Angry Twin Eyebrows in Fight Mode */}
              {fightIntensity > 0.2 && (
                <g style={{ opacity: fightIntensity }}>
                  <path d="M 36 41 L 56 46" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 64 46 L 84 41" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}
            </g>
          )}

          {/* Cute Mouth (Smiling in normal mode / Battle Cry Roar in fight mode) */}
          {fightIntensity > 0.4 ? (
            /* Open Comical Battle Roar / Gritted Teeth */
            <g>
              <path
                d="M 47 75 Q 60 89 73 75 Q 60 83 47 75 Z"
                fill="#7f1d1d"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <path d="M 52 77 L 52 82 M 60 78 L 60 84 M 68 77 L 68 82" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          ) : (
            /* Happy cute smile / smirk */
            <path
              d={
                isHovered
                  ? 'M 48 76 Q 60 90 72 76 Z'
                  : 'M 50 77 Q 60 85 70 77'
              }
              fill={isHovered ? '#7f1d1d' : 'none'}
              stroke="#0f172a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          )}

          {/* ====================================================
              DENIM OVERALLS & POCKET WITH MICROSOFT DOMAIN BADGE
              ==================================================== */}
          <g id="overalls">
            {/* Overalls Pants / Bottom Body */}
            <path
              d="M 24 94 C 24 94 28 84 40 84 L 80 84 C 92 84 96 94 96 94 L 96 115 C 96 122 88 126 80 126 L 40 126 C 32 126 24 122 24 115 Z"
              fill={`url(#minion-overalls-${id})`}
            />

            {/* Overalls Shoulder Straps */}
            <path d="M 25 86 L 42 98" stroke={`url(#minion-overalls-${id})`} strokeWidth="7" strokeLinecap="round" />
            <path d="M 95 86 L 78 98" stroke={`url(#minion-overalls-${id})`} strokeWidth="7" strokeLinecap="round" />

            {/* Strap Metallic Fastener Buttons */}
            <circle cx="41" cy="98" r="2.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
            <circle cx="79" cy="98" r="2.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />

            {/* Overalls Front Pocket */}
            <path
              d="M 46 102 L 74 102 L 72 118 C 72 122 48 122 48 118 Z"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Microsoft Domain Pocket Emblem Icon */}
            <circle cx="60" cy="110" r="4.5" fill={primaryColor} />
            <circle cx="60" cy="110" r="2" fill="#ffffff" />
          </g>

          {/* ====================================================
              RIGHT HAND & ARM (Flails / punches in fight mode)
              ==================================================== */}
          <g
            id="right-arm"
            style={{
              transform: `rotate(${armSwingRight}deg)`,
              transformOrigin: '98px 85px',
              transition: 'transform 0.06s linear',
            }}
          >
            <path
              d="M 96 82 Q 110 95 106 112"
              fill="none"
              stroke={`url(#minion-body-${id})`}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="106" cy="112" r="7" fill="#0f172a" />
            <circle cx="102" cy="114" r="3.5" fill="#1e293b" />
            <circle cx="110" cy="114" r="3.5" fill="#1e293b" />
          </g>
        </svg>
      </div>
    </div>
  );
};

/* =========================================================================
   MAIN MICROSOFT WATERMARK BACKGROUND SYSTEM WITH CURSOR-MOTION BRAWL
   ========================================================================= */
export const MicrosoftWatermarkBackground: React.FC<MicrosoftWatermarkBackgroundProps> = ({
  selectedDomain = 'azure-fundamentals',
  theme = 'light',
  mode = 'hologram',
}) => {
  const targetScroll = useRef(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const rawMousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Cursor motion tracking
  const lastMouseMoveTime = useRef(0); // timestamp of latest cursor movement
  const fightStartTime = useRef(Date.now());

  // Physics-smoothed state values
  const [smoothScroll, setSmoothScroll] = useState(0);
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const [smoothFightIntensity, setSmoothFightIntensity] = useState(0);
  const [fightTimeSeconds, setFightTimeSeconds] = useState(0);

  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Individual smoothed pupil offsets for each minion
  const [pupilOffsets, setPupilOffsets] = useState<Array<{ x: number; y: number }>>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  // Organic blinking phase
  const [blinkPhase, setBlinkPhase] = useState(0);

  const [hoveredMinion, setHoveredMinion] = useState<number | null>(null);
  const [shockwaves, setShockwaves] = useState<{ id: number; color: string }[]>([]);

  const isLight = theme === 'light';

  // Domain reactivity
  const isRedActive = selectedDomain === 'security-identity';
  const isGreenActive = selectedDomain === 'ai-copilot';
  const isBlueActive = selectedDomain === 'azure-fundamentals';
  const isYellowActive = selectedDomain === 'app-innovation';

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Periodic organic natural blinking timer
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    const triggerBlink = () => {
      setBlinkPhase(1);
      setTimeout(() => {
        setBlinkPhase(0);
      }, 150);

      const nextBlinkDelay = 3000 + Math.random() * 4000;
      blinkTimer = setTimeout(triggerBlink, nextBlinkDelay);
    };

    blinkTimer = setTimeout(triggerBlink, 3500);
    return () => clearTimeout(blinkTimer);
  }, []);

  // The 4 Minions configuration matching the 4 Microsoft signature quadrants
  const minionsConfig = [
    {
      id: 0,
      name: 'RED DEFENDER',
      role: 'SC-900 SEC',
      primaryColor: '#F25022',
      secondaryColor: '#D83B01',
      overallsColor: '#991b1b',
      glowColor: 'rgba(242, 80, 34, 0.45)',
      eyeCount: 2 as const,
      dirX: -1, // Top-Left
      dirY: -1,
      isDomainActive: isRedActive,
    },
    {
      id: 1,
      name: 'GREEN COPILOT',
      role: 'AI-900 AGENT',
      primaryColor: '#7FBA00',
      secondaryColor: '#107C41',
      overallsColor: '#166534',
      glowColor: 'rgba(127, 186, 0, 0.45)',
      eyeCount: 1 as const,
      dirX: 1, // Top-Right
      dirY: -1,
      isDomainActive: isGreenActive,
    },
    {
      id: 2,
      name: 'AZURE CLOUD',
      role: 'AZ-900 INFRA',
      primaryColor: '#00A4EF',
      secondaryColor: '#0078D4',
      overallsColor: '#1e40af',
      glowColor: 'rgba(0, 164, 239, 0.45)',
      eyeCount: 1 as const,
      dirX: -1, // Bottom-Left
      dirY: 1,
      isDomainActive: isBlueActive,
    },
    {
      id: 3,
      name: 'AMBER BUILDER',
      role: 'PL-900 APPS',
      primaryColor: '#FFB900',
      secondaryColor: '#FF8C00',
      overallsColor: '#854d0e',
      glowColor: 'rgba(255, 185, 0, 0.45)',
      eyeCount: 2 as const,
      dirX: 1, // Bottom-Right
      dirY: 1,
      isDomainActive: isYellowActive,
    },
  ];

  // Super-smooth 60fps LERP physics loop
  // RULE: When moving cursor -> fight! When cursor stops moving -> stand still!
  useEffect(() => {
    let animId: number;

    let currentScroll = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let currentFight = 0;
    const currentPupils = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];

    const tick = () => {
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveTime.current;
      // Active fighting while mouse was moved within the last 400ms
      const isCursorMoving = lastMouseMoveTime.current > 0 && timeSinceLastMove < 400;

      if (isCursorMoving && currentFight < 0.05) {
        fightStartTime.current = now;
      }

      const targetFight = isCursorMoving ? 1 : 0;
      // Smooth, graceful lerp transition: quickly reacts to movement, smoothly eases to still
      currentFight = lerp(currentFight, targetFight, isCursorMoving ? 0.14 : 0.08);

      const elapsedFightSec = (now - fightStartTime.current) / 1000;

      // Smooth kinematics
      currentScroll = lerp(currentScroll, targetScroll.current, 0.08);
      currentMouseX = lerp(currentMouseX, targetMouse.current.x, 0.07);
      currentMouseY = lerp(currentMouseY, targetMouse.current.y, 0.07);

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const cursorX = rawMousePos.current.x;
      const cursorY = rawMousePos.current.y;

      const baseOffset = 72;
      const travelDistance = currentScroll * 230;

      const nextOffsets = minionsConfig.map((minion, i) => {
        const posX = minion.dirX * (baseOffset + travelDistance);
        const posY = minion.dirY * (baseOffset + travelDistance);

        const eyeScreenX = winW / 2 + posX;
        const eyeScreenY = winH / 2 + posY - 20;

        const deltaX = cursorX - eyeScreenX;
        const deltaY = cursorY - eyeScreenY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.hypot(deltaX, deltaY);

        const maxTravel = minion.eyeCount === 1 ? 6.5 : 5.0;
        const gazeIntensity = Math.min(distance / 240, 1.0) * maxTravel;

        const targetPupilX = Math.cos(angle) * gazeIntensity;
        const targetPupilY = Math.sin(angle) * gazeIntensity;

        currentPupils[i].x = lerp(currentPupils[i].x, targetPupilX, 0.12);
        currentPupils[i].y = lerp(currentPupils[i].y, targetPupilY, 0.12);

        return { x: currentPupils[i].x, y: currentPupils[i].y };
      });

      setSmoothScroll(currentScroll);
      setSmoothMouse({ x: currentMouseX, y: currentMouseY });
      setPupilOffsets(nextOffsets);
      setSmoothFightIntensity(currentFight);
      setFightTimeSeconds(elapsedFightSec);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScroll.current = Math.min(Math.max(currentY / maxScroll, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor and mouse move listener: sets movement timestamp to engage fighting
  useEffect(() => {
    if (mode === 'off') return;

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTime.current = Date.now();
      rawMousePos.current = { x: e.clientX, y: e.clientY };
      const { innerWidth, innerHeight } = window;
      targetMouse.current = {
        x: (e.clientX / innerWidth - 0.5) * 28,
        y: (e.clientY / innerHeight - 0.5) * 28,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        lastMouseMoveTime.current = Date.now();
        rawMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mode]);

  // Click shockwave trigger
  const triggerShockwave = useCallback((tileIndex: number) => {
    lastMouseMoveTime.current = Date.now();
    const colors = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'];
    const newWave = { id: Date.now(), color: colors[tileIndex] || '#00A4EF' };
    setShockwaves((prev) => [...prev.slice(-3), newWave]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== newWave.id));
    }, 1200);
  }, []);

  if (mode === 'off') return null;

  const s = smoothScroll;
  const walkPhase = s * 32 * Math.PI;
  const isBrawling = smoothFightIntensity > 0.3;

  // Comic fight speech bubble text cycles (slow, smooth display)
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 transition-opacity duration-700"
      aria-hidden="true"
    >
      {/* 1. Subtle Volumetric Ambient Backlight */}
      <div
        className={`absolute w-[800px] h-[800px] rounded-full blur-[100px] pointer-events-none transition-all duration-700 ${
          isLight ? 'opacity-25' : 'opacity-18'
        }`}
        style={{
          transform: `translate3d(calc(50vw - 400px + ${smoothMouse.x * 1.2}px), calc(50vh - 400px + ${
            smoothMouse.y * 1.2
          }px), 0)`,
          background: isBrawling
            ? 'radial-gradient(circle, rgba(245,158,11,0.45) 0%, rgba(239,68,68,0.2) 45%, transparent 70%)'
            : isBlueActive
            ? 'radial-gradient(circle, rgba(0,164,239,0.4) 0%, rgba(0,120,215,0.15) 45%, transparent 70%)'
            : isGreenActive
            ? 'radial-gradient(circle, rgba(127,186,0,0.4) 0%, rgba(16,124,65,0.15) 45%, transparent 70%)'
            : isRedActive
            ? 'radial-gradient(circle, rgba(242,80,34,0.4) 0%, rgba(216,59,1,0.15) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,185,0,0.4) 0%, rgba(255,140,0,0.15) 45%, transparent 70%)',
        }}
      />

      {/* 2. Interactive Shockwave Rings on Click */}
      {shockwaves.map((wave) => (
        <div
          key={wave.id}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full pointer-events-none animate-ping"
          style={{
            border: `2px solid ${wave.color}`,
            boxShadow: `0 0 35px ${wave.color}`,
            animationDuration: '1.2s',
          }}
        />
      ))}

      {/* 3. Centerpiece: 4 Microsoft Minions (Pure & Clean) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1200px',
        }}
      >
        <div
          className="relative w-0 h-0 flex items-center justify-center transition-opacity duration-500"
          style={{
            transform: `translate3d(${smoothMouse.x * 0.4}px, ${smoothMouse.y * 0.4}px, 0)`,
            opacity: mode === 'subtle' ? 0.3 : mode === 'ambient' ? 0.5 : 0.65,
          }}
        >
          {/* Central Logo Crosshair / Arena Anchor */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed flex items-center justify-center pointer-events-none transition-all duration-500 ${
              isBrawling
                ? 'w-24 h-24 border-amber-500/40 bg-amber-500/5 animate-spin'
                : 'w-14 h-14 border-slate-400/25'
            }`}
            style={{ animationDuration: '6s' }}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                isBrawling ? 'w-3 h-3 bg-red-500 animate-ping' : 'w-2 h-2 bg-blue-500/40 animate-pulse'
              }`}
            />
          </div>

          {/* Render the 4 Animated Minions with Silky-Smooth GPU Gaze & Brawl Animations */}
          {minionsConfig.map((minion, i) => (
            <MinionCharacter
              key={minion.id}
              {...minion}
              walkPhase={walkPhase}
              scrollProgress={s}
              isHovered={hoveredMinion === minion.id}
              onHover={setHoveredMinion}
              onClick={triggerShockwave}
              pupilOffset={pupilOffsets[i] || { x: 0, y: 0 }}
              blinkPhase={blinkPhase}
              fightIntensity={smoothFightIntensity}
              fightTime={fightTimeSeconds}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
