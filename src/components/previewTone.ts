// Port of the accent solver in gymapp-offline/lib/theme/tones.dart and
// app_theme.dart. Keep ink and fill separate, as in the Flutter app.
type RGB = [number, number, number];
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
function lab(v: RGB): RGB {
  const [r, g, b] = v.map(linear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
function tone(seed: RGB, lightness: number): RGB {
  const [, a, b] = lab(seed);
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    gamma(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    gamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    gamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}
function solve(
  seed: RGB,
  ground: RGB,
  target: number,
  dark: boolean,
  preserve = false,
): RGB {
  if (preserve && contrast(seed, ground) >= target) return seed;
  const extreme = tone(seed, dark ? 1 : 0);
  if (contrast(extreme, ground) < target) return extreme;
  let lo = dark ? lab(ground)[0] : 0;
  let hi = dark ? 1 : lab(ground)[0];
  for (let i = 0; i < 22; i++) {
    const mid = (lo + hi) / 2;
    if (contrast(tone(seed, mid), ground) >= target) {
      if (dark) hi = mid;
      else lo = mid;
    } else {
      if (dark) lo = mid;
      else hi = mid;
    }
  }
  return tone(seed, dark ? hi : lo);
}
const hex = (v: RGB) =>
  `#${v
    .map((c) =>
      Math.round(c * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
export function previewPalette(seedHex: string, dark: boolean) {
  const seed = rgb(seedHex),
    neutral = rgb('#8a8a8a');
  const background = rgb(dark ? '#0d0d0d' : '#f7f7f6');
  const surface = tone(neutral, lab(background)[0] + (dark ? 0.075 : -0.061));
  const ground =
    contrast(seed, background) < contrast(seed, surface) ? background : surface;
  const ink = solve(seed, ground, 4.5, dark, true);
  const fill = solve(seed, background, 3, dark, true);
  const between = (fraction: number) =>
    tone(
      seed,
      lab(background)[0] + (lab(fill)[0] - lab(background)[0]) * fraction,
    );
  return {
    muted: hex(between(1 / 3)),
    dim: hex(between(2 / 3)),
    background: hex(background),
    surface: hex(surface),
    border: hex(solve(neutral, surface, dark ? 3 : 1.9, dark)),
    text: hex(solve(neutral, background, 13, dark)),
    secondary: hex(solve(neutral, surface, 4.5, dark)),
    ink: hex(ink),
    fill: hex(fill),
    onFill: luminance(fill) > 0.179 ? '#000000' : '#ffffff',
  };
}
export function previewTone(seed: string, dark: boolean) {
  return previewPalette(seed, dark).ink;
}
