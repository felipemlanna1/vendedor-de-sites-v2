#!/usr/bin/env python3
"""Login no Instagram via Playwright e salvar sessao."""
import sys
import time
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

STATE_DIR = Path(__file__).parent.parent / "data" / "_state"
STORAGE_PATH = STATE_DIR / "instagram_session.json"
SCREENSHOT_DIR = STATE_DIR / "screenshots"
SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)

USERNAME = "_pipelinestudio"
PASSWORD = "P@lioed2011"


def login():
    with sync_playwright() as p:
        # Usar estado salvo se existir
        context_opts = {
            "viewport": {"width": 1280, "height": 900},
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }

        if STORAGE_PATH.exists():
            context_opts["storage_state"] = str(STORAGE_PATH)
            print(f"Carregando sessao salva de {STORAGE_PATH}")

        browser = p.chromium.launch(headless=True)
        context = browser.new_context(**context_opts)
        page = context.new_page()

        # Navegar para Instagram
        print("Navegando para Instagram...")
        page.goto("https://www.instagram.com/", wait_until="networkidle", timeout=30000)
        time.sleep(3)

        # Screenshot inicial
        page.screenshot(path=str(SCREENSHOT_DIR / "login_check.png"))

        # Verificar se ja esta logado
        content = page.content()
        if "login" not in page.url and ("feed" in content.lower() or page.query_selector('svg[aria-label="Home"]') or page.query_selector('a[href="/direct/inbox/"]')):
            print("JA LOGADO - sessao ativa!")
            page.screenshot(path=str(SCREENSHOT_DIR / "logged_in.png"))
            # Verificar com perfil publico
            page.goto("https://www.instagram.com/instagram/", wait_until="networkidle", timeout=30000)
            time.sleep(2)
            page.screenshot(path=str(SCREENSHOT_DIR / "verify_session.png"))

            # Salvar sessao
            context.storage_state(path=str(STORAGE_PATH))
            print(f"Sessao salva em {STORAGE_PATH}")
            browser.close()
            return True

        # Precisa fazer login
        print("Nao logado. Fazendo login...")

        # Aceitar cookies se aparecer
        try:
            cookie_btn = page.query_selector('button:has-text("Allow"), button:has-text("Accept"), button:has-text("Permitir")')
            if cookie_btn:
                cookie_btn.click()
                time.sleep(2)
        except:
            pass

        # Se esta na pagina de login, preencher
        try:
            # Esperar o campo de username
            page.wait_for_selector('input[name="username"]', timeout=10000)

            # Preencher username
            username_input = page.query_selector('input[name="username"]')
            username_input.click()
            time.sleep(1)
            username_input.fill(USERNAME)
            time.sleep(1)

            # Preencher password
            password_input = page.query_selector('input[name="password"]')
            password_input.click()
            time.sleep(1)
            password_input.fill(PASSWORD)
            time.sleep(1)

            page.screenshot(path=str(SCREENSHOT_DIR / "before_login.png"))

            # Clicar no botao de login
            login_btn = page.query_selector('button[type="submit"]')
            if login_btn:
                login_btn.click()
            else:
                page.keyboard.press("Enter")

            print("Aguardando login processar...")
            time.sleep(8)

            page.screenshot(path=str(SCREENSHOT_DIR / "after_login.png"))

            # Verificar resultado
            current_url = page.url
            content = page.content()

            # Checar erros
            if "challenge" in current_url or "suspicious" in content.lower():
                print("ERRO: Instagram pediu verificacao de seguranca!")
                page.screenshot(path=str(SCREENSHOT_DIR / "challenge.png"))
                browser.close()
                return False

            if "incorrect" in content.lower() or "senha" in content.lower() and "incorreta" in content.lower():
                print("ERRO: Senha incorreta!")
                browser.close()
                return False

            # Tratar dialogs pos-login
            time.sleep(3)

            # "Save Login Info?"
            try:
                save_btn = page.query_selector('button:has-text("Save Info"), button:has-text("Salvar"), button:has-text("Save info")')
                if save_btn:
                    save_btn.click()
                    time.sleep(2)
                else:
                    not_now = page.query_selector('button:has-text("Not Now"), button:has-text("Agora não"), button:has-text("Not now")')
                    if not_now:
                        not_now.click()
                        time.sleep(2)
            except:
                pass

            # "Turn on Notifications?"
            try:
                not_now = page.query_selector('button:has-text("Not Now"), button:has-text("Agora não"), button:has-text("Not now")')
                if not_now:
                    not_now.click()
                    time.sleep(2)
            except:
                pass

            page.screenshot(path=str(SCREENSHOT_DIR / "post_login.png"))

            # Verificar sessao navegando para perfil publico
            print("Verificando sessao...")
            page.goto("https://www.instagram.com/instagram/", wait_until="networkidle", timeout=30000)
            time.sleep(3)
            page.screenshot(path=str(SCREENSHOT_DIR / "verify_session.png"))

            # Checar se conseguiu acessar o perfil
            if page.query_selector('header section') or "instagram" in page.content().lower():
                print("LOGIN BEM SUCEDIDO!")
                # Salvar sessao
                context.storage_state(path=str(STORAGE_PATH))
                print(f"Sessao salva em {STORAGE_PATH}")
                browser.close()
                return True
            else:
                print("ERRO: Login parece ter falhado.")
                browser.close()
                return False

        except Exception as e:
            print(f"ERRO durante login: {e}")
            page.screenshot(path=str(SCREENSHOT_DIR / "error.png"))
            browser.close()
            return False


if __name__ == "__main__":
    success = login()
    if success:
        print("\n=== SESSAO ATIVA ===")
        sys.exit(0)
    else:
        print("\n=== LOGIN FALHOU ===")
        sys.exit(1)
