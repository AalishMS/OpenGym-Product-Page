from playwright.sync_api import sync_playwright
import json
from pathlib import Path
out = Path(__file__).parent
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width":1440,"height":1000}, reduced_motion="reduce")
    errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto('http://127.0.0.1:4173', wait_until='networkidle')
    page.screenshot(path=str(out/'polish-desktop.png'),full_page=True)
    assert page.locator('img[src*="screenshots"]').count() == 0
    page.get_by_role('button',name='03 See the work adding up.').click()
    assert page.locator('#feature-preview .mock-app').get_attribute('aria-label').startswith('light progress')
    page.get_by_role('button',name='Purple',exact=True).click()
    before=page.locator('.personalization-preview .mock-app').evaluate("e=>getComputedStyle(e).getPropertyValue('--mock-accent')")
    page.get_by_role('button',name='Warm Amber',exact=True).click()
    after=page.locator('.personalization-preview .mock-app').evaluate("e=>getComputedStyle(e).getPropertyValue('--mock-accent')")
    assert before != after
    page.get_by_role('button',name='Dark',exact=False).click()
    assert page.locator('.personalization-preview .mock-app--dark').count() == 1
    page.locator('#personalization').screenshot(path=str(out/'polish-theme.png'))
    page.get_by_role('button',name='Increase weight').click()
    assert '580kg' in page.locator('.demo-summary').inner_text()
    page.get_by_role('button',name='Complete set',exact=True).click()
    assert page.get_by_role('button',name='Set completed').count() == 1
    page.locator('header').get_by_role('link',name='Releases',exact=True).click()
    page.locator('.release-entry').first.wait_for()
    assert page.locator('.release-entry').count() == 7
    page.get_by_role('searchbox').fill('timer')
    assert page.locator('.release-entry').count() == 2
    page.get_by_role('searchbox').fill('zzzz')
    assert page.get_by_role('heading',name='No matching releases').is_visible()
    page.get_by_role('button',name='Clear search').click()
    page.screenshot(path=str(out/'polish-releases.png'),full_page=True)
    page.reload(wait_until='networkidle')
    assert page.title() == 'Releases · OpenGym'
    page.locator('header').get_by_role('link',name='Features',exact=True).click()
    page.wait_for_timeout(300)
    assert page.locator('#features').is_visible()
    assert page.locator('#features').bounding_box()['y'] < 150
    for width in [320,390,768,1024]:
        page.set_viewport_size({'width':width,'height':900})
        page.goto('http://127.0.0.1:4173', wait_until='networkidle')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'overflow {width}'
        for mock in page.locator('.mock-app').all():
            assert mock.evaluate('e=>{const c=e.querySelector(".mock-content");return c.scrollHeight<=c.clientHeight}'), f'mock overflow {width}'
        if width == 390:
            page.screenshot(path=str(out/'polish-mobile.png'),full_page=True)
            page.get_by_role('button',name='Open menu').click()
            page.keyboard.press('Escape')
            assert page.get_by_role('button',name='Open menu').evaluate('e=>e===document.activeElement')
            page.get_by_role('button',name='Open menu').click()
            page.locator('header').get_by_role('link',name='Releases',exact=True).click()
            page.locator('.release-entry').first.wait_for()
            assert page.locator('.release-entry').count()==7
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            page.screenshot(path=str(out/'polish-releases-mobile.png'),full_page=True)
    assert not errors, errors
    print('PASS: desktop/mobile, theme, feature switcher, set logging, releases, search, deep link, navigation, Escape; no page errors.')
    browser.close()

