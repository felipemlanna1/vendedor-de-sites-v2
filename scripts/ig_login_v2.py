#!/usr/bin/env python3
"""Instagram login via Playwright v2 - handles login modal properly."""
import sys
import time
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

STORAGE_PATH = Path("data/_state/ig-browser-state.json")
SCREENSHOT_DIR = Path("data/reports/lead-saude-mg")

def login_instagram():
    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        )
        page = context.new_page()

        # Go directly to login page
        print("[INFO] Navegando para pagina de login...")
        page.goto("https://www.instagram.com/accounts/login/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(5)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-login-page.png"))

        # Handle cookie consent if present
        try:
            cookie_btns = page.query_selector_all('button:has-text("Allow essential and optional cookies"), button:has-text("Permitir cookies essenciais e opcionais"), button:has-text("Accept All"), button:has-text("Permitir todos")')
            for btn in cookie_btns:
                if btn.is_visible():
                    btn.click()
                    print("[INFO] Aceitou cookies")
                    time.sleep(2)
                    break
        except:
            pass

        # Check if we see the login form
        username_input = page.wait_for_selector('input[name="username"]', timeout=15000)
        if not username_input:
            print("[ERROR] Campo de username nao encontrado")
            browser.close()
            return {"status": "FAILED", "reason": "no_login_form"}

        # Fill username
        print("[INFO] Preenchendo username...")
        username_input.click()
        time.sleep(0.8)
        username_input.fill("")
        time.sleep(0.3)
        # Type character by character for more human-like behavior
        for char in "_pipelinestudio":
            username_input.type(char, delay=80)
        time.sleep(1.2)

        # Fill password
        print("[INFO] Preenchendo password...")
        password_input = page.query_selector('input[name="password"]')
        password_input.click()
        time.sleep(0.8)
        for char in "P@lioed2011":
            password_input.type(char, delay=60)
        time.sleep(1.5)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-filled.png"))

        # Click login button
        print("[INFO] Clicando em Login...")
        login_btn = page.query_selector('button[type="submit"]')
        if login_btn:
            login_btn.click()
        else:
            page.keyboard.press("Enter")

        # Wait for login to process
        print("[INFO] Aguardando resposta do login (10s)...")
        time.sleep(10)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-post-login.png"))

        current_url = page.url
        print(f"[INFO] URL atual: {current_url}")

        # Check for challenge/security
        if "challenge" in current_url:
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-challenge.png"))
            print("[CRITICAL] Instagram pediu verificacao de seguranca!")
            print("[CRITICAL] Resolva manualmente e tente novamente.")
            browser.close()
            return {"status": "FAILED", "reason": "security_challenge"}

        if "two_factor" in current_url:
            print("[CRITICAL] 2FA requerido!")
            browser.close()
            return {"status": "FAILED", "reason": "2fa_required"}

        # Handle post-login dialogs
        for _ in range(3):
            time.sleep(2)
            try:
                # "Save login info" or "Not now"
                btns = page.query_selector_all('button')
                for btn in btns:
                    try:
                        text = btn.inner_text().strip().lower()
                        if text in ["not now", "agora não", "agora nao", "save info", "salvar informações"]:
                            btn.click()
                            print(f"[INFO] Clicou em: {text}")
                            time.sleep(2)
                            break
                    except:
                        continue
            except:
                pass

        # Now verify the session
        print("[INFO] Verificando sessao...")
        page.goto("https://www.instagram.com/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(5)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-feed.png"))

        # Check if we see the feed (not login page)
        current_url = page.url
        page_html = page.content()

        session_ok = False

        # Check for feed indicators
        if "login" not in current_url and "accounts" not in current_url:
            # Look for navigation elements that only appear when logged in
            nav_home = page.query_selector('svg[aria-label="Home"], svg[aria-label="Pagina inicial"], svg[aria-label="Página inicial"]')
            nav_search = page.query_selector('svg[aria-label="Search"], svg[aria-label="Pesquisar"]')
            if nav_home or nav_search:
                session_ok = True
                print("[SUCCESS] Feed detectado - navegacao presente")
            elif 'aria-label="Home"' in page_html or 'aria-label="Pagina inicial"' in page_html:
                session_ok = True
                print("[SUCCESS] Feed detectado via HTML")
            else:
                # Check body text
                body_text = page.inner_text("body")
                if "suggested" in body_text.lower() or "sugest" in body_text.lower() or "stories" in body_text.lower():
                    session_ok = True
                    print("[SUCCESS] Feed detectado via texto")

        if not session_ok:
            # Try navigating to a profile to double-check
            page.goto("https://www.instagram.com/_pipelinestudio/", wait_until="domcontentloaded", timeout=30000)
            time.sleep(4)
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-self-profile.png"))

            body_text = page.inner_text("body")
            if "edit profile" in body_text.lower() or "editar perfil" in body_text.lower():
                session_ok = True
                print("[SUCCESS] Perfil proprio acessivel - sessao ativa")
            elif "followers" in body_text.lower() or "seguidores" in body_text.lower():
                # Check if there's a login modal
                modal = page.query_selector('div[role="dialog"]')
                if modal:
                    modal_text = modal.inner_text()
                    if "cadastre" in modal_text.lower() or "entrar" in modal_text.lower() or "log in" in modal_text.lower():
                        session_ok = False
                        print("[WARN] Modal de login detectado - sessao NAO ativa")
                    else:
                        session_ok = True
                else:
                    session_ok = True
                    print("[SUCCESS] Perfil visivel sem modal - sessao ativa")

        # Final verification
        if session_ok:
            # Save browser state
            STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
            context.storage_state(path=str(STORAGE_PATH))
            print(f"[INFO] Estado do browser salvo em {STORAGE_PATH}")
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-final.png"))
        else:
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-failed.png"))
            print("[ERROR] Login falhou - nao foi possivel confirmar sessao")

        browser.close()

        return {
            "status": "ACTIVE" if session_ok else "FAILED",
            "account": "_pipelinestudio",
            "storage_path": str(STORAGE_PATH) if session_ok else None
        }

if __name__ == "__main__":
    result = login_instagram()
    print(f"\n[RESULT] {json.dumps(result, indent=2)}")

    with open("data/_state/ig-login-result.json", "w") as f:
        json.dump(result, f, indent=2)

    sys.exit(0 if result["status"] == "ACTIVE" else 1)
