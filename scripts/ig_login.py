#!/usr/bin/env python3
"""Instagram login via Playwright - saves browser state for reuse."""
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
        # Try to reuse existing state
        context_opts = {
            "viewport": {"width": 1280, "height": 900},
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        }

        if STORAGE_PATH.exists():
            context_opts["storage_state"] = str(STORAGE_PATH)
            print("[INFO] Reutilizando estado de browser salvo")

        browser = p.chromium.launch(headless=False)
        context = browser.new_context(**context_opts)
        page = context.new_page()

        # Navigate to Instagram
        print("[INFO] Navegando para instagram.com...")
        page.goto("https://www.instagram.com/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(4)

        # Take screenshot to check state
        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-check.png"))

        # Check if already logged in by looking for feed elements
        logged_in = False
        try:
            # Look for elements that indicate logged in state
            if page.query_selector('svg[aria-label="Home"]') or page.query_selector('svg[aria-label="Pagina inicial"]'):
                logged_in = True
                print("[INFO] JA ESTA LOGADO - feed detectado")
            elif page.query_selector('input[name="username"]'):
                logged_in = False
                print("[INFO] Tela de login detectada - precisa logar")
            else:
                # Check URL
                if "/accounts/login" in page.url or "/accounts/emailsignup" in page.url:
                    logged_in = False
                    print("[INFO] Redirecionado para login")
                else:
                    # Maybe cookie dialog is blocking
                    cookie_btn = page.query_selector('button:has-text("Allow")')
                    if cookie_btn:
                        cookie_btn.click()
                        time.sleep(2)
                    # Check again
                    if page.query_selector('input[name="username"]'):
                        logged_in = False
                    else:
                        logged_in = True
        except Exception as e:
            print(f"[WARN] Erro ao verificar estado: {e}")

        if not logged_in:
            print("[INFO] Fazendo login...")
            # Navigate to login page explicitly
            page.goto("https://www.instagram.com/accounts/login/", wait_until="domcontentloaded", timeout=30000)
            time.sleep(3)

            # Accept cookies if present
            try:
                cookie_btns = page.query_selector_all('button:has-text("Allow"), button:has-text("Permitir"), button:has-text("Accept")')
                for btn in cookie_btns:
                    btn.click()
                    time.sleep(1)
            except:
                pass

            # Fill credentials
            username_input = page.wait_for_selector('input[name="username"]', timeout=10000)
            username_input.click()
            time.sleep(0.5)
            username_input.fill("_pipelinestudio")
            time.sleep(1)

            password_input = page.query_selector('input[name="password"]')
            password_input.click()
            time.sleep(0.5)
            password_input.fill("P@lioed2011")
            time.sleep(1)

            # Click login button
            login_btn = page.query_selector('button[type="submit"]')
            if login_btn:
                login_btn.click()
            else:
                page.keyboard.press("Enter")

            print("[INFO] Aguardando resposta do login...")
            time.sleep(8)

            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-post-login.png"))

            # Handle post-login dialogs
            try:
                # "Save login info" dialog
                save_btn = page.query_selector('button:has-text("Save Info"), button:has-text("Salvar"), button:has-text("Save Your Login Info")')
                if save_btn:
                    save_btn.click()
                    print("[INFO] Salvou informacoes de login")
                    time.sleep(3)

                # "Not now" for save info
                not_now = page.query_selector('button:has-text("Not Now"), button:has-text("Agora nao"), button:has-text("Agora Não")')
                if not_now:
                    not_now.click()
                    print("[INFO] Pulou 'salvar info'")
                    time.sleep(2)
            except:
                pass

            try:
                # "Turn on notifications" dialog
                not_now2 = page.query_selector('button:has-text("Not Now"), button:has-text("Agora nao"), button:has-text("Agora Não")')
                if not_now2:
                    not_now2.click()
                    print("[INFO] Pulou notificacoes")
                    time.sleep(2)
            except:
                pass

            # Check for security challenges
            current_url = page.url
            page_content = page.content()

            if "challenge" in current_url or "suspicious" in current_url.lower():
                page.screenshot(path=str(SCREENSHOT_DIR / "phase3-challenge.png"))
                print("[CRITICAL] Instagram pediu verificacao de seguranca!")
                print("[CRITICAL] Resolva no celular e tente novamente.")
                browser.close()
                return {"status": "FAILED", "reason": "security_challenge"}

            if "login" in current_url and "two_factor" in current_url:
                print("[CRITICAL] 2FA requerido!")
                browser.close()
                return {"status": "FAILED", "reason": "2fa_required"}

        # Verify session by visiting a known profile
        print("[INFO] Verificando sessao visitando @instagram...")
        page.goto("https://www.instagram.com/instagram/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(4)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-verify.png"))

        # Check if we can see the profile
        page_text = page.inner_text("body") if page.query_selector("body") else ""

        session_ok = False
        if "followers" in page_text.lower() or "seguidores" in page_text.lower():
            session_ok = True
            print("[SUCCESS] Sessao ATIVA - perfil @instagram visivel")
        elif page.query_selector('header section'):
            session_ok = True
            print("[SUCCESS] Sessao ATIVA - header do perfil detectado")
        else:
            print("[WARN] Nao conseguiu confirmar sessao")
            # Still might be OK, check for login redirect
            if "login" not in page.url:
                session_ok = True
                print("[INFO] URL nao e login, assumindo sessao OK")

        # Save browser state for reuse
        if session_ok:
            STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
            context.storage_state(path=str(STORAGE_PATH))
            print(f"[INFO] Estado do browser salvo em {STORAGE_PATH}")

        browser.close()

        return {
            "status": "ACTIVE" if session_ok else "FAILED",
            "account": "_pipelinestudio",
            "storage_path": str(STORAGE_PATH) if session_ok else None
        }

if __name__ == "__main__":
    result = login_instagram()
    print(f"\n[RESULT] {json.dumps(result, indent=2)}")

    # Save result
    with open("data/_state/ig-login-result.json", "w") as f:
        json.dump(result, f, indent=2)

    sys.exit(0 if result["status"] == "ACTIVE" else 1)
