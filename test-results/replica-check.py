from playwright.sync_api import sync_playwright, expect
from pathlib import Path
out=Path(__file__).parent
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 errors=[];failed=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('response',lambda r:failed.append(r.url) if r.status>=400 else None)
 page.goto('http://127.0.0.1:4173/',wait_until='networkidle')
 assert page.evaluate("document.fonts.check('14px Manrope')")
 assert page.locator('img[src*="screenshots"]').count()==0
 assert page.locator('.hero .replica-set-head').first.inner_text().split()==['Set','Prev','Kg','Reps']
 assert page.locator('.hero .replica-exercise-heading').first.inner_text().split()==['1','SQUAT']
 assert page.locator('.personalization-preview .replica-plan-card').count()==8
 assert page.locator('.personalization-preview .replica-nav').inner_text().split()==['Plans','History','Stats','Settings']
 for theme in ['Light','Dark']:
  page.get_by_role('button',name=theme,exact=False).click()
  colors=set()
  for color in ['Electric Blue','Warm Amber','Deep Orange','Hot Pink','Cyan','Purple','Steel Gray','Green']:
   page.get_by_role('button',name=color,exact=True).click()
   colors.add(page.locator('.personalization-preview .mock-app').evaluate("e=>getComputedStyle(e).getPropertyValue('--replica-ink')"))
   assert page.locator('.personalization-preview .replica-plan-card').count()==8
  assert len(colors)==8
 page.locator('.story-choice').nth(1).click()
 expect(page.locator('#feature-preview .replica-keypad')).to_be_visible()
 assert page.locator('#feature-preview .replica-key-grid>span').count()==12
 page.locator('.story-choice').nth(2).click()
 expect(page.locator('#feature-preview .replica-stats-header')).to_have_text('Statistics')
 assert page.locator('#feature-preview .replica-volume-card').inner_text().find('Volume load')>=0
 page.locator('header.header').get_by_role('link',name='Releases',exact=True).click()
 expect(page.locator('.release-entry')).to_have_count(7)
 page.locator('header.header').get_by_role('link',name='Features',exact=True).click()
 for width in [320,390,768,1024,1440]:
  page.set_viewport_size({'width':width,'height':1000})
  page.goto('http://127.0.0.1:4173/',wait_until='networkidle')
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
  for mock in page.locator('.mock-app').all():
   box=mock.bounding_box()
   assert abs(box['width']/box['height']-412/915)<.001,(width,box)
   assert box['x']>=0 and box['x']+box['width']<=width+1,(width,box)
   assert abs(mock.locator('.replica-canvas').bounding_box()['width']-box['width'])<1
  if width==390:
   page.screenshot(path=str(out/'replica-mobile-page.png'),full_page=True)
  if width==1440:
   page.screenshot(path=str(out/'replica-desktop-hero.png'))
 assert not errors,errors
 assert not failed,failed
 print('PASS: reference labels/data, 4-item navigation, keypad, statistics, 16 theme combinations, 5 viewport sizes, artboard proportions, release navigation, font loading; no browser errors or failed requests.')
 b.close()
