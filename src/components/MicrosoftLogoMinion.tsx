import React, { useEffect, useState } from 'react';

export interface MicrosoftLogoMinionProps {
  id: string;
  isEmailActive: boolean;
  isPasswordActive: boolean;
  isAuthenticating?: boolean;
  colorAccent?: string;
  variant?: 'one-eye' | 'two-eyes' | 'tall';
}

export const MicrosoftLogoMinion: React.FC<MicrosoftLogoMinionProps> = ({
  id,
  isEmailActive,
  isPasswordActive,
  isAuthenticating = false,
  colorAccent = '#00A4EF',
  variant = 'two-eyes',
}) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Eye gaze direction: looks downwards towards the email form below when typing email
  const eyeOffsetY = isEmailActive ? 2.5 : 0;
  const eyeOffsetX = isEmailActive ? -1.5 : 0;

  return (
    <div
      id={`minion-logo-${id}`}
      className="relative flex items-center justify-center select-none"
      title={isPasswordActive ? "Eyes covered / closed" : isEmailActive ? "Watching email input" : "Microsoft Minion"}
    >
      <svg
        viewBox="0 0 32 38"
        className="w-14 h-16 sm:w-16 sm:h-[72px] transition-all duration-300 filter drop-shadow-md overflow-visible"
        style={{
          transform: isPasswordActive
            ? 'scale(0.96) rotate(-2deg)'
            : isAuthenticating
            ? 'scale(1.08) translateY(-2px)'
            : isEmailActive
            ? 'scale(1.02) rotate(1deg)'
            : 'scale(1)',
        }}
      >
        <defs>
          {/* Yellow Minion Body Gradient */}
          <linearGradient id={`mYellow-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE033" />
            <stop offset="70%" stopColor="#FFCC00" />
            <stop offset="100%" stopColor="#E5A800" />
          </linearGradient>

          {/* Denim Blue Overall */}
          <linearGradient id={`mDenim-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A6AC7" />
            <stop offset="100%" stopColor="#173B7A" />
          </linearGradient>

          {/* Chrome Goggle */}
          <linearGradient id={`mChrome-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Glove / Shoe Leather */}
          <linearGradient id={`mLeather-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 1. Hair Strands */}
        <g stroke="#1E293B" strokeWidth="1" strokeLinecap="round" fill="none">
          <path d="M 15 5 L 14 1" />
          <path d="M 16 5 L 16 0.5" />
          <path d="M 17 5 L 18 1" />
        </g>

        {/* 2. Feet & Boots (Attached below) */}
        <g id={`feet-${id}`}>
          {/* Left Boot */}
          <rect x="9" y="32" width="5" height="4" rx="1.5" fill="url(#mLeather-${id})" />
          {/* Right Boot */}
          <rect x="18" y="32" width="5" height="4" rx="1.5" fill="url(#mLeather-${id})" />
        </g>

        {/* 3. Main Minion Body Capsule */}
        <rect
          x="6"
          y="4"
          width="20"
          height="29"
          rx="10"
          ry="10"
          fill={`url(#mYellow-${id})`}
          stroke="#D97706"
          strokeWidth="0.5"
        />

        {/* 4. Denim Overalls */}
        <path
          d="M 6 22 C 6 22 6 31 10 32 C 12 32.5 20 32.5 22 32 C 26 31 26 22 26 22 L 23 22 L 23 19 L 9 19 L 9 22 Z"
          fill={`url(#mDenim-${id})`}
        />

        {/* Overall Straps & Center Pocket */}
        <path d="M 7 18 L 10 20" stroke="#0F2D6B" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 25 18 L 22 20" stroke="#0F2D6B" strokeWidth="1.2" strokeLinecap="round" />
        {/* Microsoft Accent color dot on pocket */}
        <circle cx="16" cy="25" r="1.5" fill={colorAccent} />

        {/* 5. Goggle Strap */}
        <rect x="5.5" y="10.5" width="21" height="3" fill="#1E293B" rx="0.5" />

        {/* 6. Goggles & Eyes */}
        {variant === 'one-eye' ? (
          /* Single Cyclops Goggle */
          <g id={`goggle-single-${id}`}>
            <circle cx="16" cy="12" r="5.5" fill={`url(#mChrome-${id})`} stroke="#475569" strokeWidth="0.6" />
            <circle cx="16" cy="12" r="4.2" fill="#FFFFFF" />
            
            {/* Eye state: Closed when password is typed, otherwise open & tracking */}
            {isPasswordActive || blink ? (
              /* Closed eyelid / happy closed line */
              <path d="M 12.5 12 Q 16 14.5 19.5 12" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            ) : (
              <g style={{ transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`, transition: 'transform 0.15s ease-out' }}>
                <circle cx="16" cy="12" r="2.4" fill="#92400E" />
                <circle cx="16" cy="12" r="1.2" fill="#0F172A" />
                <circle cx="15.2" cy="11.2" r="0.6" fill="#FFFFFF" />
              </g>
            )}
          </g>
        ) : (
          /* Double Goggles */
          <g id={`goggles-dual-${id}`}>
            {/* Left Eye */}
            <circle cx="12.5" cy="12" r="4.2" fill={`url(#mChrome-${id})`} stroke="#475569" strokeWidth="0.5" />
            <circle cx="12.5" cy="12" r="3.2" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="19.5" cy="12" r="4.2" fill={`url(#mChrome-${id})`} stroke="#475569" strokeWidth="0.5" />
            <circle cx="19.5" cy="12" r="3.2" fill="#FFFFFF" />

            {/* Center Goggle Bridge */}
            <rect x="15.5" y="11" width="1" height="2" fill="#94A3B8" />

            {/* Eyes state: Closed when password is typed, otherwise open & looking at email */}
            {isPasswordActive || blink ? (
              <g stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none">
                <path d="M 10 12 Q 12.5 14 15 12" />
                <path d="M 17 12 Q 19.5 14 22 12" />
              </g>
            ) : (
              <g style={{ transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px)`, transition: 'transform 0.15s ease-out' }}>
                {/* Left Pupil */}
                <circle cx="12.5" cy="12" r="1.8" fill="#92400E" />
                <circle cx="12.5" cy="12" r="0.9" fill="#0F172A" />
                <circle cx="12" cy="11.4" r="0.5" fill="#FFFFFF" />

                {/* Right Pupil */}
                <circle cx="19.5" cy="12" r="1.8" fill="#92400E" />
                <circle cx="19.5" cy="12" r="0.9" fill="#0F172A" />
                <circle cx="19" cy="11.4" r="0.5" fill="#FFFFFF" />
              </g>
            )}
          </g>
        )}

        {/* 7. Cute Mouth */}
        {isPasswordActive ? (
          /* Shy "o" or sweet hidden expression when password entered */
          <ellipse cx="16" cy="17.5" rx="1.2" ry="1.4" fill="#78350F" />
        ) : isAuthenticating ? (
          /* Happy open smile */
          <path d="M 13.5 17 Q 16 20 18.5 17 Z" fill="#991B1B" stroke="#78350F" strokeWidth="0.5" />
        ) : (
          /* Subtle cute smile */
          <path d="M 13.5 17 Q 16 18.8 18.5 17" stroke="#78350F" strokeWidth="1" strokeLinecap="round" fill="none" />
        )}

        {/* 8. Hands & Arms (Attached on sides) */}
        {isPasswordActive ? (
          /* Hands covering face / raised to eyes */
          <g className="transition-all duration-300">
            {/* Left Hand over eye */}
            <path d="M 6 18 Q 6 13 11 11" stroke={`url(#mYellow-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="11.5" cy="11" r="2.2" fill="url(#mLeather-${id})" />
            {/* Right Hand over eye */}
            <path d="M 26 18 Q 26 13 21 11" stroke={`url(#mYellow-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="20.5" cy="11" r="2.2" fill="url(#mLeather-${id})" />
          </g>
        ) : (
          /* Normal arms at sides with gloves */
          <g className="transition-all duration-300">
            {/* Left Arm & Glove */}
            <path d="M 6 17 Q 4 21 5 24" stroke={`url(#mYellow-${id})`} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="5" cy="24.5" r="1.8" fill="url(#mLeather-${id})" />

            {/* Right Arm & Glove */}
            <path d="M 26 17 Q 28 21 27 24" stroke={`url(#mYellow-${id})`} strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="27" cy="24.5" r="1.8" fill="url(#mLeather-${id})" />
          </g>
        )}
      </svg>
    </div>
  );
};
