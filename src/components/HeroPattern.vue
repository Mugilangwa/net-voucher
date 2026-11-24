<template>
    <!-- Pattern ya mapambo: msalaba, mwali wa moto (Roho Mtakatifu), kitabu wazi (Neno) na nyota.
         SVG tupu, ni KB chache, hakuna picha inayopakiwa. -->
    <svg
        class="position-absolute top-0 start-0 w-100 h-100"
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <defs>
            <pattern id="hp-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.4" fill="#ffffff" fill-opacity="0.12" />
            </pattern>
            <radialGradient id="hp-glow" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stop-color="#ffc107" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#ffc107" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="hp-base" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#7f1d1d" />
                <stop offset="100%" stop-color="#3b0a0a" />
            </linearGradient>
        </defs>

        <!-- Base + dots + glow -->
        <rect width="600" height="420" fill="url(#hp-base)" />
        <rect width="600" height="420" fill="url(#hp-dots)" />
        <circle cx="300" cy="190" r="230" fill="url(#hp-glow)" />

        <!-- Duara zinazotanuka kutoka kwenye msalaba -->
        <g fill="none" stroke="#ffc107" stroke-opacity="0.25">
            <circle cx="300" cy="190" r="90" />
            <circle cx="300" cy="190" r="140" stroke-dasharray="3 7" />
            <circle cx="300" cy="190" r="190" stroke-opacity="0.12" />
        </g>

        <!-- Msalaba -->
        <g fill="#ffc107">
            <rect x="288" y="88" width="24" height="210" rx="5" />
            <rect x="236" y="140" width="128" height="24" rx="5" />
        </g>

        <!-- Mwali wa moto (Roho Mtakatifu) -->
        <g transform="translate(110 285)">
            <path d="M40 0 C8 36 12 84 40 98 C68 84 72 36 40 0 Z" fill="#ffffff" fill-opacity="0.9" />
            <path d="M40 38 C26 58 28 80 40 88 C52 80 54 58 40 38 Z" fill="#dc3545" />
        </g>

        <!-- Kitabu wazi (Neno la Mungu) -->
        <g transform="translate(405 300)" fill="#ffffff" fill-opacity="0.9">
            <path d="M0 10 Q40 -8 80 10 L80 70 Q40 52 0 70 Z" />
            <path d="M160 10 Q120 -8 80 10 L80 70 Q120 52 160 70 Z" fill-opacity="0.75" />
            <path d="M80 10 L80 70" stroke="#7f1d1d" stroke-width="2" fill="none" />
        </g>

        <!-- Nyota ndogo -->
        <g fill="#ffc107" fill-opacity="0.8">
            <path d="M80 70 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4 z" />
            <path d="M520 60 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" />
            <path d="M540 230 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" />
            <path d="M60 200 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" />
        </g>
    </svg>
</template>