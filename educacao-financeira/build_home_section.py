"""Gera a seção "Educação Financeira" do homepage (página 21) de fundcoop.com.br.

Uso: python3 build_home_section.py <image_id> <image_url> <page_url> > section.json
<page_url> é o endereço que o WordPress deu à página depois de publicada.
Copia o padrão das seções "Simule seu empréstimo" (a68c2aa) e "Segurança e
Garantia" (763d82f): seção → coluna → inner section 50/50 com título,
texto com link no fim e imagem com cantos de 10px. Entra depois de 763d82f,
com o texto à esquerda (as duas seções anteriores alternam o lado).
"""
import hashlib
import json
import sys

IMG_ID = int(sys.argv[1])
IMG_URL = sys.argv[2]
PAGE_URL = sys.argv[3]
assert PAGE_URL.startswith("https://fundcoop.com.br/") and "?" not in PAGE_URL, PAGE_URL

_seen = set()


def eid(key):
    h = hashlib.md5(("home-edufin-" + key).encode()).hexdigest()[:8]
    assert h not in _seen
    _seen.add(h)
    return h


def px(v, unit="px"):
    return {"unit": unit, "size": v, "sizes": []}


def dims(t, r, b, l):
    return {"unit": "px", "top": str(t), "right": str(r), "bottom": str(b), "left": str(l), "isLinked": False}


heading = {
    "id": eid("heading"), "elType": "widget", "widgetType": "heading", "elements": [],
    "settings": {
        "title": "Educação Financeira", "header_size": "h2", "align": "start", "title_color": "#271E59",
        "typography_typography": "custom", "typography_font_family": "Ubuntu", "typography_font_weight": "700",
        "typography_font_size": px(45), "typography_font_size_tablet": px(50), "typography_font_size_mobile": px(40),
        "typography_line_height": px(1, "em"), "typography_letter_spacing": px(-2),
        "_padding": dims(0, 0, 50, 0), "_padding_tablet": dims(0, 0, 20, 0), "_padding_mobile": dims(0, 0, 20, 0),
    },
}

text = {
    "id": eid("text"), "elType": "widget", "widgetType": "text-editor", "elements": [],
    "settings": {
        "editor": ("<p>Cuidar do seu dinheiro é investir no seu futuro! Conheça o novo espaço de Educação Financeira "
                   "da FundCoop, com conteúdos, ferramentas e materiais para ajudar você a organizar o orçamento, "
                   "controlar despesas, evitar o endividamento e usar o crédito com responsabilidade. "
                   f'<a href="{PAGE_URL}">Clique aqui e saiba mais.</a></p>'),
        "align": "justify", "text_color": "#707A8C",
        "typography_typography": "custom", "typography_font_family": "DM Sans", "typography_font_weight": "400",
        "typography_font_size": px(20), "typography_font_size_tablet": px(16), "typography_font_size_mobile": px(14),
        "typography_line_height": px(1.7, "em"), "typography_line_height_mobile": px(1.5, "em"),
    },
}

image = {
    "id": eid("image"), "elType": "widget", "widgetType": "image", "elements": [],
    "settings": {
        "image": {"id": IMG_ID, "url": IMG_URL, "alt": "Educação Financeira na Prática - FundCoop", "source": "library"},
        "image_size": "large",
        "image_border_radius": {"unit": "px", "top": "10", "right": "10", "bottom": "10", "left": "10", "isLinked": True},
    },
}

section = {
    "id": eid("section"), "elType": "section", "isInner": False,
    "settings": {"margin": dims(0, 0, 50, 0)},
    "elements": [{
        "id": eid("column"), "elType": "column", "isInner": False,
        "settings": {"_column_size": 100, "_inline_size": None},
        "elements": [{
            "id": eid("inner"), "elType": "section", "isInner": True,
            "settings": {"structure": "20", "content_position": "middle"},
            "elements": [
                {"id": eid("col-text"), "elType": "column", "isInner": True,
                 "settings": {"_column_size": 50, "_inline_size": None}, "elements": [heading, text]},
                {"id": eid("col-image"), "elType": "column", "isInner": True,
                 "settings": {"_column_size": 50, "_inline_size": None}, "elements": [image]},
            ],
        }],
    }],
}

if __name__ == "__main__":
    json.dump(section, sys.stdout, ensure_ascii=False, separators=(",", ":"))
