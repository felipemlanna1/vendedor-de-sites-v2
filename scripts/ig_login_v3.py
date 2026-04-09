#!/usr/bin/env python3
"""Instagram login via Playwright v3 - handles PT-BR login page."""
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

        # Go to login page
        print("[INFO] Navegando para pagina de login...")
        page.goto("https://www.instagram.com/accounts/login/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(6)

        # Find all input fields
        inputs = page.query_selector_all('input')
        print(f"[INFO] Encontrados {len(inputs)} campos de input")
        for i, inp in enumerate(inputs):
            name = inp.get_attribute("name") or "?"
            atype = inp.get_attribute("type") or "?"
            aria = inp.get_attribute("aria-label") or "?"
            print(f"  Input {i}: name={name}, type={atype}, aria-label={aria}")

        # Try different selectors for username field
        username_input = None
        selectors = [
            'input[name="username"]',
            'input[aria-label*="telefone"]',
            'input[aria-label*="celular"]',
            'input[aria-label*="nome de usu"]',
            'input[aria-label*="email"]',
            'input[aria-label*="Phone"]',
            'input[type="text"]',
        ]
        for sel in selectors:
            try:
                el = page.query_selector(sel)
                if el and el.is_visible():
                    username_input = el
                    print(f"[INFO] Username field found with: {sel}")
                    break
            except:
                continue

        if not username_input:
            # Fallback: get first visible input
            for inp in inputs:
                if inp.is_visible():
                    username_input = inp
                    print("[INFO] Using first visible input for username")
                    break

        if not username_input:
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-no-input.png"))
            print("[ERROR] Nenhum campo de input encontrado")
            browser.close()
            return {"status": "FAILED", "reason": "no_input_fields"}

        # Fill username
        print("[INFO] Preenchendo username...")
        username_input.click()
        time.sleep(1)
        username_input.fill("_pipelinestudio")
        time.sleep(1.5)

        # Find password field
        password_input = None
        pwd_selectors = [
            'input[name="password"]',
            'input[type="password"]',
            'input[aria-label*="Senha"]',
            'input[aria-label*="Password"]',
        ]
        for sel in pwd_selectors:
            try:
                el = page.query_selector(sel)
                if el and el.is_visible():
                    password_input = el
                    print(f"[INFO] Password field found with: {sel}")
                    break
            except:
                continue

        if not password_input:
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-no-pwd.png"))
            print("[ERROR] Campo de senha nao encontrado")
            browser.close()
            return {"status": "FAILED", "reason": "no_password_field"}

        # Fill password
        print("[INFO] Preenchendo senha...")
        password_input.click()
        time.sleep(0.8)
        password_input.fill("P@lioed2011")
        time.sleep(1.5)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-filled.png"))

        # Click login button - try multiple approaches
        print("[INFO] Clicando em Entrar...")
        logged = False

        # Try submit button
        submit_btn = page.query_selector('button[type="submit"]')
        if submit_btn and submit_btn.is_visible():
            submit_btn.click()
            logged = True
            print("[INFO] Clicou no botao submit")

        if not logged:
            # Try button with text
            btns = page.query_selector_all('button')
            for btn in btns:
                try:
                    text = btn.inner_text().strip().lower()
                    if text in ["entrar", "log in", "login"]:
                        btn.click()
                        logged = True
                        print(f"[INFO] Clicou no botao: {text}")
                        break
                except:
                    continue

        if not logged:
            # Press Enter as fallback
            page.keyboard.press("Enter")
            print("[INFO] Pressionou Enter")

        # Wait for login to process
        print("[INFO] Aguardando resposta do login (12s)...")
        time.sleep(12)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-post-login.png"))
        current_url = page.url
        print(f"[INFO] URL apos login: {current_url}")

        # Check for errors
        error_el = page.query_selector('#slfErrorAlert, [data-testid="login-error-message"]')
        if error_el:
            error_text = error_el.inner_text()
            print(f"[ERROR] Erro de login: {error_text}")
            browser.close()
            return {"status": "FAILED", "reason": f"login_error: {error_text}"}

        # Check for challenge
        if "challenge" in current_url:
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-challenge.png"))
            print("[CRITICAL] Instagram pediu verificacao de seguranca!")
            browser.close()
            return {"status": "FAILED", "reason": "security_challenge"}

        # Handle post-login dialogs (up to 3 times)
        for attempt in range(4):
            time.sleep(3)
            try:
                btns = page.query_selector_all('button')
                for btn in btns:
                    try:
                        if not btn.is_visible():
                            continue
                        text = btn.inner_text().strip().lower()
                        if text in ["not now", "agora não", "agora nao", "save info",
                                   "salvar informações", "salvar informacoes", "ativar",
                                   "turn on", "cancelar"]:
                            btn.click()
                            print(f"[INFO] Dialog: clicou em '{text}'")
                            time.sleep(2)
                            break
                    except:
                        continue
            except:
                pass

        # Verify session
        print("[INFO] Verificando sessao no feed...")
        page.goto("https://www.instagram.com/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(5)

        page.screenshot(path=str(SCREENSHOT_DIR / "phase3-feed.png"))
        current_url = page.url

        session_ok = False
        if "login" not in current_url and "accounts" not in current_url:
            # Check for navigation bar (only visible when logged in)
            body_html = page.content()
            if 'aria-label="Home"' in body_html or 'aria-label="Pagina inicial"' in body_html or 'aria-label="Página inicial"' in body_html:
                session_ok = True
                print("[SUCCESS] Sessao ATIVA - nav Home detectado")
            elif 'role="navigation"' in body_html:
                session_ok = True
                print("[SUCCESS] Sessao ATIVA - nav bar detectada")
            else:
                # Check for modal overlay (not logged in shows this)
                modal = page.query_selector('div[role="dialog"]')
                if modal and modal.is_visible():
                    modal_text = modal.inner_text().lower()
                    if "cadastre" in modal_text or "entrar" in modal_text or "criar" in modal_text:
                        print("[WARN] Modal de cadastro detectado - NAO logado")
                        session_ok = False
                    else:
                        session_ok = True
                else:
                    session_ok = True
                    print("[INFO] Nenhum modal de login - assumindo sessao OK")

        # Double-check: visit own profile
        if session_ok:
            page.goto("https://www.instagram.com/_pipelinestudio/", wait_until="domcontentloaded", timeout=30000)
            time.sleep(4)
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-self.png"))

            # Check for edit profile button (only visible on own profile when logged in)
            body_text = page.inner_text("body")
            if "editar perfil" in body_text.lower() or "edit profile" in body_text.lower():
                print("[SUCCESS] Confirmado - botao 'Editar perfil' visivel")

            # Check for login modal again
            modal = page.query_selector('div[role="dialog"]')
            if modal and modal.is_visible():
                modal_text = modal.inner_text().lower()
                if "cadastre" in modal_text or "entrar" in modal_text:
                    session_ok = False
                    print("[WARN] Modal de login apareceu no perfil proprio - sessao INVALIDA")

        if session_ok:
            STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
            context.storage_state(path=str(STORAGE_PATH))
            print(f"[INFO] Estado do browser salvo em {STORAGE_PATH}")
        else:
            page.screenshot(path=str(SCREENSHOT_DIR / "phase3-failed.png"))

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
