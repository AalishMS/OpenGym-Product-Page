from playwright.sync_api import sync_playwright, expect
from pathlib import Path
out=Path(__file__).parent
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:4173/',wait_until='networkidle')
 positions=[]
 for index,screen in enumerate(['plan','keypad','progress']):
  stage=page.locator('.story-stage').nth(index)
  stage.evaluate('e=>{const r=e.getBoundingClientRect();window.scrollTo({top:scrollY+r.top+r.height/2-(innerHeight+64)/2,behavior:"instant"})}')
  expect(page.locator('.story-choice').nth(index)).to_have_attribute('aria-pressed','true')
  expect(page.locator('#feature-preview .mock-app')).to_have_attribute('aria-label',f'light {screen} OpenGym screen recreated from the app screenshot')
  positions.append(page.locator('.story-preview').bounding_box()['y'])
 assert max(positions)-min(positions)<2,positions
 assert 80<=positions[0]<=100,positions
 page.screenshot(path=str(out/'sticky-desktop.png'))
 page.get_by_role('button',name='Show plan preview').click()
 expect(page.locator('.story-choice').nth(0)).to_have_attribute('aria-pressed','true')
 for height in [600,800]:
  page.set_viewport_size({'width':1280,'height':height})
  page.get_by_role('button',name='Show log preview').click()
  page.wait_for_timeout(150)
  box=page.locator('.story-preview').bounding_box()
  assert box['y']+box['height']<=height,(height,box)
 for width in [390,768]:
  page.set_viewport_size({'width':width,'height':844})
  assert page.locator('.story-preview').evaluate('e=>getComputedStyle(e).position')=='static'
  page.locator('.story-choice').nth(2).click()
  expect(page.locator('#feature-preview .mock-app')).to_have_attribute('aria-label','light progress OpenGym screen recreated from the app screenshot')
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 page.emulate_media(reduced_motion='no-preference')
 page.set_viewport_size({'width':1440,'height':1000})
 page.get_by_role('button',name='Show log preview').click()
 expect(page.locator('#feature-preview .mock-app')).to_have_attribute('aria-label','light keypad OpenGym screen recreated from the app screenshot')
 page.wait_for_timeout(1000)
 expect(page.locator('.story-progress button').nth(1)).to_have_attribute('aria-pressed','true')
 assert not errors,errors
 print('PASS: scroll changes each screen; preview stays pinned; indicator navigation; short desktop viewports; mobile selection; reduced motion and animated transitions; no browser errors.')
 b.close()
