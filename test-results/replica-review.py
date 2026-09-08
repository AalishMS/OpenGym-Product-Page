from playwright.sync_api import sync_playwright
from pathlib import Path
out=Path(__file__).parent
with sync_playwright() as p:
 b=p.chromium.launch(headless=True)
 page=b.new_page(viewport={'width':1440,'height':1000},device_scale_factor=2,reduced_motion='reduce')
 errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 for screen in ['home','home_dark','workout','workout_keypad','statistics']:
  page.goto('http://127.0.0.1:4173/',wait_until='networkidle')
  if screen=='home_dark':page.get_by_role('button',name='Dark',exact=False).click()
  if screen=='workout_keypad':page.locator('.story-choice').nth(1).click()
  if screen=='statistics':page.locator('.story-choice').nth(2).click()
  selector='.hero .mock-app' if screen=='workout' else '.personalization-preview .mock-app' if screen.startswith('home') else '#feature-preview .mock-app'
  mock=page.locator(selector)
  mock.evaluate("e=>{e.id='capture';e.style.width='412px';e.style.height='915px';e.style.position='fixed';e.style.inset='0 auto auto 0';e.style.zIndex='1000';document.body.append(e)}")
  page.wait_for_timeout(150)
  page.locator('#capture').screenshot(path=str(out/f'replica-{screen}.png'))
 print(errors)
 b.close()
