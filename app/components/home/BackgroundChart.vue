<template>
  <div class="absolute inset-0 opacity-20">
    <svg
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-64"
      viewBox="0 0 800 200"
    >
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #10b981; stop-opacity: 0.8" />
          <stop offset="100%" style="stop-color: #10b981; stop-opacity: 0.1" />
        </linearGradient>
      </defs>
      <path
        d="M0,150 Q200,100 400,120 T800,80"
        stroke="#10B981"
        stroke-width="2"
        fill="none"
      />
      <path
        d="M0,150 Q200,100 400,120 T800,80 L800,200 L0,200 Z"
        fill="url(#chartGradient)"
      />
      <!-- Development progress bars -->
      <g class="opacity-60">
        <rect x="50" y="90" width="4" height="40" fill="#10B981" rx="2" />
        <rect x="100" y="110" width="4" height="30" fill="#3B82F6" rx="2" />
        <rect x="150" y="85" width="4" height="50" fill="#10B981" rx="2" />
        <rect x="200" y="95" width="4" height="35" fill="#8B5CF6" rx="2" />
        <rect x="250" y="105" width="4" height="25" fill="#3B82F6" rx="2" />
        <rect x="300" y="80" width="4" height="55" fill="#10B981" rx="2" />
        <rect x="350" y="100" width="4" height="40" fill="#8B5CF6" rx="2" />
        <rect x="400" y="75" width="4" height="60" fill="#10B981" rx="2" />
        <rect x="450" y="90" width="4" height="45" fill="#3B82F6" rx="2" />
        <rect x="500" y="110" width="4" height="25" fill="#8B5CF6" rx="2" />
        <rect x="550" y="85" width="4" height="50" fill="#10B981" rx="2" />
        <rect x="600" y="95" width="4" height="40" fill="#3B82F6" rx="2" />
        <rect x="650" y="100" width="4" height="35" fill="#8B5CF6" rx="2" />
        <rect x="700" y="80" width="4" height="55" fill="#10B981" rx="2" />
        <rect x="750" y="90" width="4" height="45" fill="#3B82F6" rx="2" />
      </g>
    </svg>
  </div>
</template>
