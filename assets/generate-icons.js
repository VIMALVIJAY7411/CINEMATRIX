const sharp = require('sharp');
const fs = require('fs');

if (!fs.existsSync('assets')) fs.mkdirSync('assets');

// 1024x1024 App Icon ('C' Emblem on #0D0D0D)
const iconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#0D0D0D"/>
  <rect x="212" y="212" width="600" height="600" rx="120" fill="#E50914"/>
  <text x="512" y="655" font-family="Arial Black, sans-serif" font-weight="900" font-size="430" fill="#FFFFFF" text-anchor="middle">C</text>
</svg>`;

// 2732x2732 Splash Screen (Straight-Line CINEMATRIX + 'C' Emblem)
const splashSvg = `
<svg width="2732" height="2732" viewBox="0 0 2732 2732" xmlns="http://www.w3.org/2000/svg">
  <rect width="2732" height="2732" fill="#0D0D0D"/>
  <g transform="translate(886, 1286)">
    <rect x="0" y="0" width="160" height="160" rx="28" fill="#E50914"/>
    <text x="80" y="122" font-family="Arial Black, sans-serif" font-weight="900" font-size="115" fill="#FFFFFF" text-anchor="middle">C</text>
    <text x="205" y="118" font-family="Arial Black, sans-serif" font-weight="900" font-size="108" letter-spacing="12" fill="#E50914">CINEMATRIX</text>
  </g>
</svg>`;

async function buildAssets() {
  await sharp(Buffer.from(iconSvg)).png().toFile('assets/icon-only.png');
  await sharp(Buffer.from(iconSvg)).png().toFile('assets/icon-foreground.png');
  await sharp({
    create: { width: 1024, height: 1024, channels: 4, background: '#0D0D0D' }
  }).png().toFile('assets/icon-background.png');
  await sharp(Buffer.from(splashSvg)).png().toFile('assets/splash.png');
  await sharp(Buffer.from(splashSvg)).png().toFile('assets/splash-dark.png');
  console.log('Generated CINEMATRIX Android icons and splash screens.');
}

buildAssets();
