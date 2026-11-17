// Port of the accent solver in OpenGym/lib/theme/tones.dart and
// app_theme.dart. Keep ink and fill separate, as in the Flutter app.
type RGB = [number, number, number];
type LCh = [number, number, number];
const rgb = (hex: string): RGB =>
  hex.match(/[a-f\d]{2}/gi)!.map((v) => parseInt(v, 16) / 255) as RGB;
const linear = (v: number) =>
  v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
const gamma = (v: number) => {
  const c = Math.max(0, Math.min(1, v));
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
};
const luminance = (v: RGB) =>
  v.map(linear).reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a: RGB, b: RGB) =>
  (Math.max(luminance(a), luminance(b)) + 0.05) /
  (Math.min(luminance(a), luminance(b)) + 0.05);
function lch(v: RGB): LCh {
  const [r, g, b] = v.map(linear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    Math.hypot(A, B),
    Math.atan2(B, A),
  ];
}
/** OKLCh → unclamped linear sRGB; channels outside 0..1 are out of gamut. */
function linearFrom(lightness: number, chroma: number, hue: number): RGB {
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const color = (lightness: number, chroma: number, hue: number) =>
  linearFrom(lightness, chroma, hue).map(gamma) as RGB;
/** The most chroma sRGB can show at this lightness and hue. */
function maxChroma(lightness: number, hue: number) {
  let lo = 0, hi = 0.4;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (linearFrom(lightness, mid, hue).every((c) => c >= -1e-4 && c <= 1 + 1e-4)) lo = mid;
    else hi = mid;
  }
  return lo;
}
function solve(
  seed: RGB,
  ground: RGB,
  target: number,
  dark: boolean,
  preserve = false,
  chromaAt?: (lightness: number) => number,
): RGB {
  if (preserve && contrast(seed, ground) >= target) return seed;
  const [, c, h] = lch(seed);
  const tone = (lightness: number) => color(lightness, chromaAt?.(lightness) ?? c, h);
  const extreme = tone(dark ? 1 : 0);
  if (contrast(extreme, ground) < target) return extreme;
  let lo = dark ? lch(ground)[0] : 0;
  let hi = dark ? 1 : lch(ground)[0];
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2;
    if (contrast(tone(mid), ground) >= target) {
      if (dark) hi = mid;
      else lo = mid;
    } else {
      if (dark) lo = mid;
      else hi = mid;
    }
  }
  return tone(dark ? hi : lo);
}
const hex = (v: RGB) =>
  `#${v
    .map((c) =>
      Math.round(c * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
const worseGround = (v: RGB, background: RGB, surface: RGB) =>
  contrast(v, background) < contrast(v, surface) ? background : surface;
/** Traffic-light RPE ramp from semantic_colors.dart: [hue°, chroma] per step. */
const RPE_STEPS: readonly (readonly [number, number])[] = [
  [0, 0], [245, 0.13], [150, 0.15], [85, 0.15], [55, 0.16], [29, 0.17],
];
const rpeStep = (rpe: number) =>
  rpe <= 2 ? 0 : rpe <= 4 ? 1 : rpe <= 6 ? 2 : rpe <= 8 ? 3 : rpe === 9 ? 4 : 5;
export function previewPalette(seedHex: string, dark: boolean) {
  const seed = rgb(seedHex),
    neutral = rgb('#8a8a8a');
  const background = rgb(dark ? '#0d0d0d' : '#f2f2f1');
  const [, neutralC, neutralH] = lch(neutral);
  const neutralTone = (lightness: number) => color(lightness, neutralC, neutralH);
  // Elevation reads as light: a raised card is white on a slightly darker page in
  // light mode and a small perceptual lift off black in dark mode. Controls step
  // away from both, below the page in light mode and above the card in dark mode.
  const surface = dark ? neutralTone(lch(background)[0] + 0.045) : neutralTone(1);
  const control = neutralTone(dark ? lch(surface)[0] + 0.045 : lch(background)[0] - 0.028);
  const grounds = [background, surface, control];
  const hardest = (v: RGB) =>
    grounds.reduce((a, b) => (contrast(v, a) <= contrast(v, b) ? a : b));
  // Accent chroma follows the seed's vividness, capped so no accent glows.
  const [seedL, seedC, seedH] = lch(seed);
  const vividness = Math.min(1, seedC / maxChroma(seedL, seedH));
  const accentChroma = (lightness: number) =>
    Math.min(dark ? 0.14 : 0.15, vividness * maxChroma(lightness, seedH));
  const ink = solve(seed, hardest(seed), 4.5, dark, true, accentChroma);
  const fill = solve(seed, background, 3, dark, true, accentChroma);
  const brandSeed = color(dark ? Math.max(seedL, 0.8) : seedL, Math.min(seedC * 1.8, 0.18), seedH);
  const brand = solve(brandSeed, worseGround(brandSeed, background, surface), 4.5, dark, true);
  const [fillL, fillC] = lch(fill);
  const backgroundL = lch(background)[0];
  const wash = (fraction: number) =>
    color(backgroundL + (fillL - backgroundL) * fraction, fillC * Math.sqrt(fraction), seedH);
  const semantic = (hue: number, chroma: number) => {
    const tone = color(0.62, chroma, (hue * Math.PI) / 180);
    return hex(solve(tone, hardest(tone), 4.5, dark, true));
  };
  const rpe = RPE_STEPS.map(([hue, chroma]) => semantic(hue, chroma));
  return {
    muted: hex(wash(1 / 3)),
    dim: hex(wash(2 / 3)),
    background: hex(background),
    surface: hex(surface),
    control: hex(control),
    hairline: hex(solve(neutral, surface, 1.25, dark)),
    border: hex(solve(neutral, worseGround(neutral, background, surface), 3, dark)),
    text: hex(solve(neutral, hardest(neutral), 13, dark)),
    secondary: hex(solve(neutral, hardest(neutral), 4.5, dark)),
    ink: hex(ink),
    brand: hex(brand),
    fill: hex(fill),
    chartFill: hex(wash(2 / 3)),
    onFill: luminance(fill) > 0.179 ? '#000000' : '#ffffff',
    success: semantic(150, 0.15),
    error: semantic(29, 0.17),
    ...Object.fromEntries(rpe.map((tone, step) => [`rpe${step}`, tone])),
  };
}
/** The replica custom property holding the RPE colour for a logged value. */
export const rpeVar = (rpe: number) => `var(--replica-rpe${rpeStep(rpe)})`;
export function previewTone(seed: string, dark: boolean) {
  return previewPalette(seed, dark).ink;
}
