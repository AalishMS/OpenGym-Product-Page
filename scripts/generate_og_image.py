import base64
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent

# Base64 assets
font_space_700 = base64.b64encode((root / 'public/fonts/space-grotesk-700.woff2').read_bytes()).decode('utf-8')
font_space_600 = base64.b64encode((root / 'public/fonts/space-grotesk-600.woff2').read_bytes()).decode('utf-8')
font_inter_400 = base64.b64encode((root / 'public/fonts/inter-400.woff2').read_bytes()).decode('utf-8')
font_inter_500 = base64.b64encode((root / 'public/fonts/inter-500.woff2').read_bytes()).decode('utf-8')
font_inter_600 = base64.b64encode((root / 'public/fonts/inter-600.woff2').read_bytes()).decode('utf-8')
font_mono_600 = base64.b64encode((root / 'public/fonts/jetbrains-mono-600.woff2').read_bytes()).decode('utf-8')

applogo = base64.b64encode((root.parent / 'gymapp-offline/logo/applogo.png').read_bytes()).decode('utf-8')
img_workout = base64.b64encode((root / 'test-results/replica-workout.png').read_bytes()).decode('utf-8')

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
@font-face {{
  font-family: 'Space Grotesk';
  src: url(data:font/woff2;base64,{font_space_700}) format('woff2');
  font-weight: 700;
}}
@font-face {{
  font-family: 'Space Grotesk';
  src: url(data:font/woff2;base64,{font_space_600}) format('woff2');
  font-weight: 600;
}}
@font-face {{
  font-family: 'Inter';
  src: url(data:font/woff2;base64,{font_inter_400}) format('woff2');
  font-weight: 400;
}}
@font-face {{
  font-family: 'Inter';
  src: url(data:font/woff2;base64,{font_inter_500}) format('woff2');
  font-weight: 500;
}}
@font-face {{
  font-family: 'Inter';
  src: url(data:font/woff2;base64,{font_inter_600}) format('woff2');
  font-weight: 600;
}}
@font-face {{
  font-family: 'JetBrains Mono';
  src: url(data:font/woff2;base64,{font_mono_600}) format('woff2');
  font-weight: 600;
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background: #0d0d0d;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #f7f7f6;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}}

/* Ambient backgrounds & subtle tech accents */
.bg-gradient {{
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle 750px at 80% 50%, rgba(169, 202, 232, 0.09) 0%, rgba(35, 50, 62, 0.16) 50%, transparent 80%),
    radial-gradient(circle 500px at 15% 15%, rgba(255, 255, 255, 0.02) 0%, transparent 60%);
}}

.bg-grid {{
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 95%);
}}

/* Main container */
.og-wrapper {{
  position: relative;
  z-index: 10;
  width: 1200px;
  height: 630px;
  padding: 56px 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}}

/* Left Column */
.left-col {{
  width: 630px;
  display: flex;
  flex-direction: column;
}}

.brand-row {{
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}}

.brand-logo {{
  width: 44px;
  height: 44px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}}

.brand-title {{
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #f7f7f6;
  letter-spacing: -0.02em;
}}

.badge-tag {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a9cae8;
  background: rgba(169, 202, 232, 0.1);
  border: 1px solid rgba(169, 202, 232, 0.25);
  padding: 4px 12px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}}

.badge-tag-dot {{
  width: 6px;
  height: 6px;
  background: #a9cae8;
  border-radius: 50%;
  box-shadow: 0 0 6px #a9cae8;
}}

.eyebrow {{
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: #a9cae8;
  margin-bottom: 14px;
  text-transform: uppercase;
}}

.headline {{
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 1.0;
  letter-spacing: -0.055em;
  color: #f7f7f6;
  margin-bottom: 20px;
}}

.headline-accent {{
  color: #a9cae8;
  background: linear-gradient(135deg, #e3f0fb 0%, #a9cae8 60%, #6ba3d6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}}

.subheading {{
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  color: #999999;
  max-width: 530px;
  margin-bottom: 32px;
}}

/* Badges list matching website hero details */
.details-row {{
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 36px;
}}

.detail-item {{
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #cccccc;
}}

.detail-check {{
  color: #a9cae8;
  font-weight: 700;
  font-size: 16px;
}}

/* Platform / URL bar */
.url-bar {{
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #666666;
}}

.url-highlight {{
  color: #888888;
}}

.url-dot {{
  opacity: 0.3;
}}

/* Right Column: Visual Stage */
.right-col {{
  width: 420px;
  height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}}

/* Arched backdrop matching website .hero-visual::before */
.arch-backdrop {{
  position: absolute;
  width: 356px;
  height: 512px;
  border-radius: 178px 178px 24px 24px;
  background: #23323e;
  border: 1px solid rgba(169, 202, 232, 0.15);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 50px rgba(169, 202, 232, 0.08);
}}

/* Phone Mockup Frame */
.phone-mockup {{
  position: relative;
  z-index: 5;
  width: 292px;
  height: 494px;
  background: #242424;
  border: 1px solid #494949;
  border-radius: 36px;
  padding: 8px;
  box-shadow: 
    0 24px 65px rgba(0, 0, 0, 0.65),
    0 4px 16px rgba(0, 0, 0, 0.4);
}}

.phone-screen-container {{
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  background: #e5e8e8;
  position: relative;
}}

.phone-screenshot {{
  width: 100%;
  height: auto;
  display: block;
}}

/* Subtle glass reflection */
.glass-shine {{
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 45%);
  pointer-events: none;
}}
</style>
</head>
<body>
  <div class="bg-gradient"></div>
  <div class="bg-grid"></div>

  <div class="og-wrapper">
    <!-- Left Column -->
    <div class="left-col">
      <div class="brand-row">
        <img class="brand-logo" src="data:image/png;base64,{applogo}" alt="OpenGym" />
        <span class="brand-title">&gt; OpenGym</span>
        <div class="badge-tag">
          <span class="badge-tag-dot"></span>
          Offline-First
        </div>
      </div>

      <p class="eyebrow">YOUR TRAINING. YOUR TERMS.</p>

      <h1 class="headline">
        Make <span class="headline-accent">every</span><br>set count.
      </h1>

      <p class="subheading">
        Sign in on first launch, then keep training with local-first data that stays available offline.
      </p>

      <div class="details-row">
        <div class="detail-item">
          <span class="detail-check">✓</span>
          <span>Offline after sign-in</span>
        </div>
        <div class="detail-item">
          <span class="detail-check">✓</span>
          <span>Open source</span>
        </div>
        <div class="detail-item">
          <span class="detail-check">✓</span>
          <span>Local-first data</span>
        </div>
      </div>

      <div class="url-bar">
        <span class="url-highlight">open-gym-product-page.vercel.app</span>
        <span class="url-dot">·</span>
        <span>Android Workout Tracker</span>
      </div>
    </div>

    <!-- Right Column: Visual Mockup -->
    <div class="right-col">
      <div class="arch-backdrop"></div>
      <div class="phone-mockup">
        <div class="phone-screen-container">
          <img class="phone-screenshot" src="data:image/png;base64,{img_workout}" alt="OpenGym App" />
          <div class="glass-shine"></div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
"""

out_file = root / 'public/og-image.png'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
    page.set_content(html_content, wait_until='networkidle')
    page.wait_for_timeout(200)
    page.screenshot(path=str(out_file))
    print(f"Generated public/og-image.png ({out_file.stat().st_size} bytes)")
    browser.close()
