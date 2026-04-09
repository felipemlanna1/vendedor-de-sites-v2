#!/usr/bin/env python3
"""Login no Instagram via Playwright - v2 com deteccao correta de modal."""
import sys
import time
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
        context_opts = {
            "viewport": {"width": 1280, "height": 900},
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }

        # Tentar carregar sessao salva
        if STORAGE_PATH.exists():
            context_opts["storage_state"] = str(STORAGE_PATH)
            print("Carregando sessao salva...")

        browser = p.chromium.launch(headless=True)
        context = browser.new_context(**context_opts)
        page = context.new_page()

        # Navegar para Instagram
        print("Navegando para Instagram...")
        page.goto("https://www.instagram.com/", wait_until="networkidle", timeout=30000)
        time.sleep(4)

        # Fechar modal de cookies/login se aparecer
        try:
            close_btn = page.query_selector('[role="dialog"] button svg, [role="dialog"] [aria-label="Close"]')
            if close_btn:
                close_btn.click()
                time.sleep(2)
        except:
            pass

        page.screenshot(path=str(SCREENSHOT_DIR / "step1_initial.png"))

        # Verificar se realmente logado - checar se NÃO tem modal de login
        is_logged = False
        try:
            # Se tem o link para inbox/direct, esta logado
            inbox = page.query_selector('a[href="/direct/inbox/"]')
            # Se tem o icone de home no nav
            home = page.query_selector('svg[aria-label="Home"], svg[aria-label="Pagina inicial"]')
            # Se NÃO tem o modal de "See photos"
            login_modal = page.query_selector('div:has-text("See photos, videos and more")')
            login_form = page.query_selector('input[name="username"]')

            if (inbox or home) and not login_form:
                is_logged = True
                print("Sessao ativa confirmada!")
            elif login_form or login_modal:
                is_logged = False
                print("Precisa fazer login (formulario de login detectado)")
            else:
                # Tentar acessar perfil para confirmar
                page.goto("https://www.instagram.com/instagram/", wait_until="networkidle", timeout=30000)
                time.sleep(3)
                # Se redirecionou pra login, nao esta logado
                if "login" in page.url or "accounts" in page.url:
                    is_logged = False
                    print("Redirecionado para login - nao esta logado")
                else:
                    # Verificar se tem grid de posts (sem modal bloqueando)
                    modal_check = page.query_selector('div[role="dialog"]')
                    if modal_check:
                        is_logged = False
                        print("Modal de login detectado - nao esta logado")
                    else:
                        is_logged = True
        except:
            is_logged = False

        if is_logged:
            print("JA LOGADO!")
            context.storage_state(path=str(STORAGE_PATH))
            page.screenshot(path=str(SCREENSHOT_DIR / "logged_in_confirmed.png"))
            browser.close()
            return True

        # Fazer login
        print("\n--- Iniciando login ---")

        # Navegar para pagina de login
        page.goto("https://www.instagram.com/accounts/login/", wait_until="networkidle", timeout=30000)
        time.sleep(4)

        # Aceitar cookies
        try:
            cookie_btns = page.query_selector_all('button')
            for btn in cookie_btns:
                text = btn.inner_text().lower()
                if 'allow' in text or 'accept' in text or 'permitir' in text or 'aceitar' in text:
                    btn.click()
                    time.sleep(2)
                    break
        except:
            pass

        page.screenshot(path=str(SCREENSHOT_DIR / "step2_login_page.png"))

        # Preencher username - tentar varios seletores
        username_selectors = [
            'input[name="username"]',
            'input[aria-label*="username" i]',
            'input[aria-label*="Phone" i]',
            'input[aria-label*="email" i]',
            'input[type="text"]',
        ]
        username_input = None
        for sel in username_selectors:
            try:
                page.wait_for_selector(sel, timeout=5000)
                username_input = page.query_selector(sel)
                if username_input:
                    print(f"Username input encontrado: {sel}")
                    break
            except:
                continue

        if not username_input:
            print("ERRO: Campo username nao encontrado com nenhum seletor!")
            page.screenshot(path=str(SCREENSHOT_DIR / "error_no_username.png"))
            browser.close()
            return False

        username_input.click()
        time.sleep(1)
        username_input.fill("")
        time.sleep(0.5)
        for ch in USERNAME:
            username_input.type(ch, delay=80)
        time.sleep(1.5)

        # Preencher password - tentar varios seletores
        password_selectors = [
            'input[name="password"]',
            'input[aria-label*="Password" i]',
            'input[aria-label*="Senha" i]',
            'input[type="password"]',
        ]
        password_input = None
        for sel in password_selectors:
            try:
                password_input = page.query_selector(sel)
                if password_input:
                    print(f"Password input encontrado: {sel}")
                    break
            except:
                continue

        if not password_input:
            print("ERRO: Campo password nao encontrado!")
            browser.close()
            return False

        password_input.click()
        time.sleep(1)
        for ch in PASSWORD:
            password_input.type(ch, delay=60)
        time.sleep(1.5)

        page.screenshot(path=str(SCREENSHOT_DIR / "step3_filled.png"))

        # Clicar login
        login_btn = page.query_selector('button[type="submit"]')
        if login_btn:
            login_btn.click()
        else:
            page.keyboard.press("Enter")

        print("Aguardando login...")
        time.sleep(10)

        page.screenshot(path=str(SCREENSHOT_DIR / "step4_after_login.png"))

        # Checar resultado
        current_url = page.url
        content = page.content().lower()

        if "challenge" in current_url:
            print("ERRO CRITICO: Instagram pediu challenge/verificacao!")
            page.screenshot(path=str(SCREENSHOT_DIR / "challenge.png"))
            browser.close()
            return False

        if "suspicious" in content:
            print("ERRO CRITICO: Login suspeito detectado!")
            browser.close()
            return False

        # Tratar "Save Login Info"
        time.sleep(3)
        try:
            btns = page.query_selector_all('button')
            for btn in btns:
                text = btn.inner_text().lower()
                if 'save info' in text or 'salvar' in text:
                    btn.click()
                    print("Clicou 'Save Info'")
                    time.sleep(3)
                    break
                elif 'not now' in text or 'agora' in text:
                    btn.click()
                    print("Clicou 'Not Now'")
                    time.sleep(3)
                    break
        except:
            pass

        # Tratar "Turn on Notifications"
        time.sleep(2)
        try:
            btns = page.query_selector_all('button')
            for btn in btns:
                text = btn.inner_text().lower()
                if 'not now' in text or 'agora' in text:
                    btn.click()
                    print("Dispensou notificacoes")
                    time.sleep(2)
                    break
        except:
            pass

        page.screenshot(path=str(SCREENSHOT_DIR / "step5_post_dialogs.png"))

        # Verificar sessao com perfil publico
        print("Verificando sessao com perfil publico...")
        try:
            page.goto("https://www.instagram.com/instagram/", wait_until="domcontentloaded", timeout=30000)
        except:
            pass
        time.sleep(6)
        page.screenshot(path=str(SCREENSHOT_DIR / "step6_verify.png"))

        # Confirmar - checar se NÃO tem modal de login
        modal = page.query_selector('div[role="dialog"]')
        login_redirect = "login" in page.url or "accounts" in page.url

        if not login_redirect and not modal:
            print("LOGIN BEM SUCEDIDO!")
            context.storage_state(path=str(STORAGE_PATH))
            print(f"Sessao salva em {STORAGE_PATH}")
            browser.close()
            return True

        # Ultima tentativa - fechar modal e ver se tem conteudo
        if modal:
            try:
                page.evaluate("document.querySelector('[role=\"dialog\"]').remove()")
                time.sleep(1)
                # Se tem header com info do perfil, esta logado
                header = page.query_selector('header section')
                if header:
                    print("LOGIN BEM SUCEDIDO (apos remover modal)!")
                    context.storage_state(path=str(STORAGE_PATH))
                    browser.close()
                    return True
            except:
                pass

        print("ERRO: Login parece ter falhado.")
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
