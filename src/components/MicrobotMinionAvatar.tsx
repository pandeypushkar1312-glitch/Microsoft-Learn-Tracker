import React, { useEffect, useState, useRef } from 'react';

export interface MicrobotMinionAvatarProps {
  state?: 'idle' | 'thinking' | 'speaking' | 'happy';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  trackCursor?: boolean;
}

export const MicrobotMinionAvatar: React.FC<MicrobotMinionAvatarProps> = ({
  state = 'idle',
  size = 'md',
  className = '',
  onClick,
  trackCursor = true,
}) => {
  const [blink, setBlink] = useState(false);
  const [antennaPulse, setAntennaPulse] = useState(false);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState<number>(0);
  
  const avatarRef = useRef<HTMLDivElement>(null);
  const targetOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetTiltRef = useRef<number>(0);
  const currentTiltRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Periodic natural robotic blinking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3500 + Math.random() * 3000;
      timeoutId = setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();

    const pulseInterval = setInterval(() => {
      setAntennaPulse(prev => !prev);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(pulseInterval);
    };
  }, []);

  // Silky smooth 60fps/120fps physics-interpolated (LERP) eye gaze tracking
  useEffect(() => {
    if (!trackCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height * 0.35;

      const deltaX = e.clientX - avatarCenterX;
      const deltaY = e.clientY - avatarCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 1) {
        targetOffsetRef.current = { x: 0, y: 0 };
        targetTiltRef.current = 0;
        return;
      }

      // Max eye travel limit inside magnified chrome sockets
      const maxOffset = 2.0;
      // Exponential falloff curve for organic response
      const normalizedFactor = Math.min(distance / 220, 1.0);
      const angle = Math.atan2(deltaY, deltaX);

      targetOffsetRef.current = {
        x: Math.cos(angle) * maxOffset * normalizedFactor,
        y: Math.sin(angle) * maxOffset * normalizedFactor,
      };

      // Slight organic head tilt towards cursor
      const clampedX = Math.max(-1, Math.min(1, deltaX / 300));
      targetTiltRef.current = clampedX * 4; // degrees
    };

    // Smooth RAF physics loop with damping
    const updateLoop = () => {
      const lerpSpeed = 0.16; // Perfectly tuned responsiveness vs fluidity
      const tiltLerpSpeed = 0.10;

      const diffX = targetOffsetRef.current.x - currentOffsetRef.current.x;
      const diffY = targetOffsetRef.current.y - currentOffsetRef.current.y;
      const diffTilt = targetTiltRef.current - currentTiltRef.current;

      currentOffsetRef.current.x += diffX * lerpSpeed;
      currentOffsetRef.current.y += diffY * lerpSpeed;
      currentTiltRef.current += diffTilt * tiltLerpSpeed;

      setEyeOffset({
        x: currentOffsetRef.current.x,
        y: currentOffsetRef.current.y,
      });
      setHeadTilt(currentTiltRef.current);

      rafIdRef.current = requestAnimationFrame(updateLoop);
    };

    rafIdRef.current = requestAnimationFrame(updateLoop);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [trackCursor]);

  // Click handler: trigger responsive double-blink
  const handleClick = (e: React.MouseEvent) => {
    setBlink(true);
    setTimeout(() => {
      setBlink(false);
      setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
      }, 70);
    }, 140);

    if (onClick) {
      onClick();
    }
  };

  const sizeDimensions = {
    sm: 'w-12 h-14',
    md: 'w-16 h-[74px] sm:w-20 sm:h-[88px]',
    lg: 'w-24 h-28',
    xl: 'w-32 h-36',
  }[size];

  const isThinking = state === 'thinking';
  const isSpeaking = state === 'speaking';
  const isHappy = state === 'happy';

  // Base eye center coordinates in SVG
  const leftEyeBaseX = 12;
  const leftEyeBaseY = 14.5;
  const rightEyeBaseX = 24;
  const rightEyeBaseY = 14.5;

  // Real-time smoothed eye pupil positions
  const leftPupilX = leftEyeBaseX + eyeOffset.x;
  const leftPupilY = leftEyeBaseY + eyeOffset.y;
  const rightPupilX = rightEyeBaseX + eyeOffset.x;
  const rightPupilY = rightEyeBaseY + eyeOffset.y;

  return (
    <div
      ref={avatarRef}
      onClick={handleClick}
      style={{
        transform: `rotate(${headTilt}deg)`,
        transformOrigin: 'center bottom',
      }}
      className={`relative flex items-center justify-center select-none cursor-pointer ${sizeDimensions} ${className}`}
      title="Microbot — Click to make me blink!"
    >
      <svg
        viewBox="0 0 36 42"
        className={`w-full h-full overflow-visible filter drop-shadow-xl ${
          isThinking
            ? 'animate-bounce'
            : isSpeaking
            ? 'animate-pulse'
            : isHappy
            ? 'scale-110 -rotate-3 transition-transform duration-200'
            : 'hover:scale-105 active:scale-95 transition-transform duration-200'
        }`}
      >
        <defs>
          {/* Cyber Metallic Purple Body Gradient */}
          <linearGradient id="microbotPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="25%" stopColor="#D8B4FE" />
            <stop offset="60%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>

          {/* Chrome Robotic Armor Goggles */}
          <linearGradient id="microbotChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Deep Indigo/Purple Chassis Suit */}
          <linearGradient id="microbotChassis" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4C1D95" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          {/* Glowing Visor Neon Violet / Fuchsia Iris Glow */}
          <radialGradient id="microbotIrisGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF5FF" />
            <stop offset="35%" stopColor="#E879F9" />
            <stop offset="75%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#581C87" />
          </radialGradient>

          {/* Eye Socket Shadow */}
          <radialGradient id="microbotEyeSocket" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="75%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Titanium Metal */}
          <linearGradient id="microbotMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 1. Robotic Top Antenna with Glowing Status Orb */}
        <g id="antenna">
          <line x1="18" y1="5.5" x2="18" y2="1.2" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="15.8" y="4.8" width="4.4" height="2" rx="1" fill="#334155" />
          <circle
            cx="18"
            cy="1.2"
            r={isThinking ? 2.6 : 2.1}
            fill={isThinking ? '#F59E0B' : isSpeaking ? '#10B981' : '#C084FC'}
            className="transition-colors duration-300"
          />
          <circle
            cx="18"
            cy="1.2"
            r="4.2"
            fill={isThinking ? '#F59E0B' : '#C084FC'}
            opacity={antennaPulse || isThinking ? 0.65 : 0.3}
            className="transition-opacity duration-300"
          />
        </g>

        {/* 2. Side Robotic Ear Bolts */}
        <g id="ear-bolts">
          <rect x="4.2" y="13.5" width="2.4" height="4.5" rx="1.2" fill="#64748B" stroke="#1E293B" strokeWidth="0.5" />
          <circle cx="4.6" cy="15.7" r="1" fill="#C084FC" />
          <rect x="29.4" y="13.5" width="2.4" height="4.5" rx="1.2" fill="#64748B" stroke="#1E293B" strokeWidth="0.5" />
          <circle cx="31.4" cy="15.7" r="1" fill="#C084FC" />
        </g>

        {/* 3. Main Robot Minion Body Capsule */}
        <rect
          x="5.5"
          y="5.5"
          width="25"
          height="31"
          rx="12.5"
          ry="12.5"
          fill="url(#microbotPurple)"
          stroke="#7E22CE"
          strokeWidth="0.9"
        />

        {/* 4. Robotic Armor Belt & Microsoft Azure Chassis Suit */}
        <path
          d="M 5.5 24 C 5.5 24 5.5 34.5 10.5 36 C 13.5 36.5 22.5 36.5 25.5 36 C 30.5 34.5 30.5 24 30.5 24 L 26.8 24 L 26.8 20.8 L 9.2 20.8 L 9.2 24 Z"
          fill="url(#microbotChassis)"
          stroke="#1E1B4B"
          strokeWidth="0.7"
        />

        {/* Suit Straps with Metallic Rivets */}
        <path d="M 7 19.8 L 10.8 22.5" stroke="#581C87" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="7.6" cy="20.3" r="0.8" fill="#E9D5FF" />

        <path d="M 29 19.8 L 25.2 22.5" stroke="#581C87" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="28.4" cy="20.3" r="0.8" fill="#E9D5FF" />

        {/* 5. Center Chest Panel: Microsoft 4-Color Power Reactor */}
        <g id="power-reactor">
          <rect x="13.2" y="25" width="9.6" height="7.2" rx="2" fill="#0F172A" stroke="#475569" strokeWidth="0.6" />
          <rect x="14.3" y="26" width="3.2" height="2.3" rx="0.5" fill="#F25022" />
          <rect x="18.5" y="26" width="3.2" height="2.3" rx="0.5" fill="#7FBA00" />
          <rect x="14.3" y="28.9" width="3.2" height="2.3" rx="0.5" fill="#00A4EF" />
          <rect x="18.5" y="28.9" width="3.2" height="2.3" rx="0.5" fill="#FFB900" />
        </g>

        {/* 6. MAGNIFIED CYBER VISOR GOGGLES & FLUID CURSOR-TRACKING EYES */}
        <g id="magnified-cyber-goggles">
          <rect x="4.8" y="12.2" width="26.4" height="4.8" fill="#1E1B4B" rx="1.2" />
          <line x1="5.2" y1="14.6" x2="30.8" y2="14.6" stroke="#C084FC" strokeWidth="0.6" opacity="0.85" />

          {/* Left Goggle Bezel (Magnified) */}
          <circle cx={leftEyeBaseX} cy={leftEyeBaseY} r="6.6" fill="url(#microbotChrome)" stroke="#1E293B" strokeWidth="0.9" />
          <circle cx={leftEyeBaseX} cy={leftEyeBaseY} r="5.6" fill="url(#microbotEyeSocket)" stroke="#0F172A" strokeWidth="0.6" />

          {/* Right Goggle Bezel (Magnified) */}
          <circle cx={rightEyeBaseX} cy={rightEyeBaseY} r="6.6" fill="url(#microbotChrome)" stroke="#1E293B" strokeWidth="0.9" />
          <circle cx={rightEyeBaseX} cy={rightEyeBaseY} r="5.6" fill="url(#microbotEyeSocket)" stroke="#0F172A" strokeWidth="0.6" />

          {/* Goggle Bridge Center Lock */}
          <rect x="16.5" y="13.2" width="3" height="2.6" fill="#64748B" stroke="#334155" strokeWidth="0.5" rx="0.6" />
          <circle cx="18" cy="14.5" r="0.6" fill="#E2E8F0" />

          {/* EYE CONTENT / PUPILS / BLINKING / FLUID CURSOR TRACKING */}
          {blink ? (
            /* Robot Instant Eyelid Blink Animation & Cyber Scanlines */
            <g>
              <circle cx={leftEyeBaseX} cy={leftEyeBaseY} r="5.5" fill="#334155" opacity="0.92" />
              <circle cx={rightEyeBaseX} cy={rightEyeBaseY} r="5.5" fill="#334155" opacity="0.92" />

              <line
                x1={leftEyeBaseX - 4.2}
                y1={leftEyeBaseY}
                x2={leftEyeBaseX + 4.2}
                y2={leftEyeBaseY}
                stroke="#E879F9"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1={rightEyeBaseX - 4.2}
                y1={rightEyeBaseY}
                x2={rightEyeBaseX + 4.2}
                y2={rightEyeBaseY}
                stroke="#E879F9"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          ) : isThinking ? (
            /* Thinking Scanning Radar Reticle */
            <g className="animate-spin origin-[18px_14.5px]">
              <circle cx={leftEyeBaseX} cy={leftEyeBaseY} r="3.6" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,2" />
              <circle cx={leftEyeBaseX} cy={leftEyeBaseY} r="1.4" fill="#F59E0B" />

              <circle cx={rightEyeBaseX} cy={rightEyeBaseY} r="3.6" fill="none" stroke="#F59E0B" strokeWidth="1.4" strokeDasharray="3,2" />
              <circle cx={rightEyeBaseX} cy={rightEyeBaseY} r="1.4" fill="#F59E0B" />
            </g>
          ) : (
            /* SMOOTH LERP INTERPOLATED PUPILS (Zero Jitter, Fluid Gaze) */
            <g>
              {/* ===== LEFT EYE ===== */}
              <circle cx={leftPupilX} cy={leftPupilY} r="3.6" fill="url(#microbotIrisGlow)" />
              <circle cx={leftPupilX} cy={leftPupilY} r="2.7" fill="none" stroke="#E879F9" strokeWidth="0.4" opacity="0.85" />
              <circle cx={leftPupilX} cy={leftPupilY} r="1.7" fill="#0B132B" />
              <circle cx={leftPupilX - 0.9} cy={leftPupilY - 0.9} r="1.0" fill="#FFFFFF" opacity="0.95" />
              <circle cx={leftPupilX + 0.9} cy={leftPupilY + 0.8} r="0.5" fill="#FAF5FF" opacity="0.85" />

              {/* ===== RIGHT EYE ===== */}
              <circle cx={rightPupilX} cy={rightPupilY} r="3.6" fill="url(#microbotIrisGlow)" />
              <circle cx={rightPupilX} cy={rightPupilY} r="2.7" fill="none" stroke="#E879F9" strokeWidth="0.4" opacity="0.85" />
              <circle cx={rightPupilX} cy={rightPupilY} r="1.7" fill="#0B132B" />
              <circle cx={rightPupilX - 0.9} cy={rightPupilY - 0.9} r="1.0" fill="#FFFFFF" opacity="0.95" />
              <circle cx={rightPupilX + 0.9} cy={rightPupilY + 0.8} r="0.5" fill="#FAF5FF" opacity="0.85" />
            </g>
          )}

          {/* Chrome Rim Highlights */}
          <path
            d={`M ${leftEyeBaseX - 4.5} ${leftEyeBaseY - 4.5} A 6.6 6.6 0 0 1 ${leftEyeBaseX + 4.5} ${leftEyeBaseY - 4.5}`}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.6"
            opacity="0.8"
          />
          <path
            d={`M ${rightEyeBaseX - 4.5} ${rightEyeBaseY - 4.5} A 6.6 6.6 0 0 1 ${rightEyeBaseX + 4.5} ${rightEyeBaseY - 4.5}`}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.6"
            opacity="0.8"
          />
        </g>

        {/* 7. Cute Robot Digital LED Mouth */}
        <g id="robot-mouth">
          {isSpeaking ? (
            <g fill="#E879F9">
              <rect x="13.5" y="19" width="1.2" height="2.8" rx="0.6" />
              <rect x="15.8" y="18.3" width="1.2" height="4.2" rx="0.6" />
              <rect x="18" y="17.8" width="1.2" height="5.2" rx="0.6" />
              <rect x="20.2" y="18.3" width="1.2" height="4.2" rx="0.6" />
              <rect x="22.5" y="19" width="1.2" height="2.8" rx="0.6" />
            </g>
          ) : isHappy ? (
            <path d="M 14 19.2 Q 18 22.8 22 19.2" stroke="#A855F7" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M 14.8 19.5 Q 18 21.2 21.2 19.5" stroke="#581C87" strokeWidth="1.3" strokeLinecap="round" fill="none" />
          )}
        </g>

        {/* 8. Articulated Robotic Arms */}
        <g id="robot-arms">
          <path d="M 5.5 21 Q 3 24.5 4 27.5" stroke="url(#microbotPurple)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx="4" cy="28.5" r="2.2" fill="url(#microbotMetal)" stroke="#64748B" strokeWidth="0.5" />

          {isHappy ? (
            <g className="animate-bounce">
              <path d="M 30.5 20 Q 34 16 33 12.5" stroke="url(#microbotPurple)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <circle cx="33" cy="11.5" r="2.2" fill="url(#microbotMetal)" stroke="#64748B" strokeWidth="0.5" />
            </g>
          ) : (
            <g>
              <path d="M 30.5 21 Q 33 24.5 32 27.5" stroke="url(#microbotPurple)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <circle cx="32" cy="28.5" r="2.2" fill="url(#microbotMetal)" stroke="#64748B" strokeWidth="0.5" />
            </g>
          )}
        </g>

        {/* 9. Magnetic Hover Thruster Base */}
        <g id="hover-base">
          <ellipse cx="18" cy="37.5" rx="8.5" ry="1.6" fill="#A855F7" opacity={antennaPulse ? 0.75 : 0.35} />
          <rect x="9.5" y="35.5" width="6" height="3.2" rx="1.4" fill="url(#microbotMetal)" />
          <rect x="20.5" y="35.5" width="6" height="3.2" rx="1.4" fill="url(#microbotMetal)" />
        </g>
      </svg>
    </div>
  );
};
