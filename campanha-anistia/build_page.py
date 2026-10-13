"""Gera o _elementor_data da página "Campanha Anistia" (fundcoop.com.br).

Uso: python3 build_page.py <placeholder_id> <placeholder_url> > page.json
Estrutura legada Section/Column (o site não tem Flexbox Container ativo).
"""
import hashlib
import json
import sys

PH_ID = int(sys.argv[1])
PH_URL = sys.argv[2]

ART_ID = 1746  # CAMPANHA 2026 (arte enviada pela cooperativa)
ART_URL = "https://fundcoop.com.br/wp-content/uploads/2026/06/CAMPANHA-2026.jpeg"

NAVY = "#271E59"   # títulos da home
TEAL = "#0EBD9E"   # títulos dos cards de aviso da home
GRAY = "#707A8C"   # texto corrido da home
CARD = "#00850D2B" # fundo dos cards de aviso da home

_seen = set()


def eid(key):
    h = hashlib.md5(("anistia-" + key).encode()).hexdigest()[:8]
    assert h not in _seen
    _seen.add(h)
    return h


def px(v):
    return {"unit": "px", "size": v, "sizes": []}


def dims(t, r, b, l, unit="px"):
    return {"unit": unit, "top": str(t), "right": str(r), "bottom": str(b), "left": str(l), "isLinked": False}


def radius(v):
    return {"unit": "px", "top": str(v), "right": str(v), "bottom": str(v), "left": str(v), "isLinked": True}


def typo(prefix, family, weight, size, size_t=None, size_m=None, lh=None, ls=None):
    p = prefix
    s = {f"{p}_typography": "custom", f"{p}_font_family": family, f"{p}_font_weight": str(weight),
         f"{p}_font_size": px(size)}
    if size_t is not None:
        s[f"{p}_font_size_tablet"] = px(size_t)
    if size_m is not None:
        s[f"{p}_font_size_mobile"] = px(size_m)
    if lh is not None:
        s[f"{p}_line_height"] = {"unit": "em", "size": lh, "sizes": []}
    if ls is not None:
        s[f"{p}_letter_spacing"] = px(ls)
    return s


def widget(key, wtype, settings):
    return {"id": eid(key), "elType": "widget", "widgetType": wtype, "settings": settings, "elements": []}


def column(key, size, widgets, **settings):
    return {"id": eid(key), "elType": "column", "settings": {"_column_size": size, "_inline_size": None, **settings},
            "elements": widgets, "isInner": False}


def section(key, columns, inner=False, **settings):
    return {"id": eid(key), "elType": "section", "settings": settings, "elements": columns, "isInner": inner}


def big_heading(key, text, tag, size=65, size_t=48, size_m=36, pad_b=10):
    return widget(key, "heading", {
        "title": text, "header_size": tag, "align": "center", "title_color": NAVY,
        **typo("typography", "Ubuntu", 700, size, size_t, size_m, lh=1, ls=-2),
        "_padding": dims(0, 0, pad_b, 0),
    })


def lead(key, html, size=20, align="center", color=GRAY):
    return widget(key, "text-editor", {
        "editor": html, "align": align, "text_color": color,
        **typo("typography", "DM Sans", 400, size, 16, 15, lh=1.7),
    })


# 1. Título --------------------------------------------------------------------
intro = section("s-intro", [
    column("c-intro", 100, [
        big_heading("h-title", "Campanha Anistia 2026", "h1"),
        lead("t-intro",
             "<p>Duas campanhas, mais benefícios para você: a <strong>Anistia FundCoop</strong>, "
             "para ex-cooperados retornarem à cooperativa, e a campanha <strong>Indique e Jogue Junto</strong>, "
             "que premiou quem indicou novos cooperados. Confira abaixo a arte da campanha e as fotos dos ganhadores.</p>"),
    ]),
], layout="boxed", content_width=px(890), gap="no",
    padding=dims(60, 0, 30, 0), padding_tablet=dims(50, 20, 20, 20), padding_mobile=dims(40, 20, 10, 20))

# 2. Arte da campanha ------------------------------------------------------------
art = section("s-art", [
    column("c-art", 100, [
        widget("i-art", "image", {
            "image": {"id": ART_ID, "url": ART_URL, "alt": "Campanha FundCoop 2026: Indique e Jogue Junto e Anistia da FundCoop", "source": "library"},
            "image_size": "large", "align": "center",
            "width": {"unit": "%", "size": 100, "sizes": []},
            "image_border_radius": radius(10),
            "image_box_shadow_box_shadow_type": "yes",
            "image_box_shadow_box_shadow": {"horizontal": 0, "vertical": 30, "blur": 60, "spread": 0, "color": "rgba(111,104,146,0.18)"},
            "link_to": "file", "open_lightbox": "yes",
        }),
    ]),
], layout="boxed", content_width=px(960), gap="no",
    padding=dims(20, 0, 60, 0), padding_tablet=dims(10, 20, 40, 20), padding_mobile=dims(10, 20, 30, 20))


# 3. Cards das duas campanhas (estilo dos cards de aviso da home) ---------------
def card(key, title, html, side):
    margin = dims(0, 15, 0, 0) if side == "left" else dims(0, 0, 0, 15)
    return column(key, 50, [
        widget(key + "-h", "heading", {
            "title": title, "header_size": "h2", "align": "start", "title_color": TEAL,
            **typo("typography", "Syne", 700, 30, 26, 26, lh=1.1),
        }),
        lead(key + "-t", html, size=18, align="start", color=NAVY),
    ],
        background_background="classic", background_color=CARD,
        border_radius=radius(20),
        padding=dims(35, 45, 25, 45), padding_tablet=dims(25, 30, 15, 30), padding_mobile=dims(25, 25, 15, 25),
        margin=margin, margin_tablet=margin,
        margin_mobile=dims(0, 0, 30, 0) if side == "left" else dims(0, 0, 0, 0),
        animation="fadeInLeft" if side == "left" else "fadeInRight")


cards = section("s-cards", [
    card("c-indique", "Indique e Jogue Junto",
         "<p>De <strong>01 a 30 de junho de 2026</strong>, os cooperados indicaram novos cooperados e concorreram a prêmios. "
         "Premiação para os 10 cooperados com maior pontuação:</p>"
         "<ul>"
         "<li><strong>1º lugar:</strong> camisa oficial + R$ 300 em capital social</li>"
         "<li><strong>2º lugar:</strong> camisa oficial + R$ 200 em capital social</li>"
         "<li><strong>3º lugar:</strong> camisa oficial + R$ 100 em capital social</li>"
         "<li><strong>4º ao 10º lugar:</strong> kit churrasco para 10 pessoas</li>"
         "</ul>", "left"),
    card("c-anistia", "Anistia da FundCoop",
         "<p>Para ex-cooperados retornarem à FundCoop <strong>sem integralização de capital</strong> "
         "e ainda participarem da promoção Indique e Jogue Junto.</p>"
         "<p>A Anistia foi prorrogada até <strong>30 de julho de 2026</strong>. "
         "Obrigado a todos que voltaram a fazer parte da nossa cooperativa!</p>", "right"),
], layout="boxed", content_width=px(1170), gap="no", structure="20",
    padding=dims(0, 0, 80, 0), padding_tablet=dims(0, 20, 50, 20), padding_mobile=dims(0, 20, 40, 20))

# 4. Ganhadores -------------------------------------------------------------------
winners_head = section("s-win-head", [
    column("c-win-head", 100, [
        big_heading("h-win", "Nossos Ganhadores", "h2"),
        lead("t-win", "<p>Parabéns a todos os ganhadores! Clique em uma foto para ampliar.</p>"),
    ]),
], layout="boxed", content_width=px(890), gap="no",
    padding=dims(0, 0, 30, 0), padding_tablet=dims(0, 20, 20, 20), padding_mobile=dims(0, 20, 10, 20))


# Cada slot vai compacto no save-page; o marcador SLOT_MARKER é trocado depois
# (content/edit com replace_all) pelas configurações comuns em SHARED.
SLOT_MARKER = '"_css_classes":"fc-slot"'

SHARED = {
    "image_size": "medium_large",
    "width": {"unit": "%", "size": 100, "sizes": []},
    "height": px(260), "height_tablet": px(300), "height_mobile": px(210),
    "object-fit": "cover", "object-position": "top center",
    "image_border_radius": radius(10),
    "hover_animation": "grow",
    "caption_source": "custom", "caption_align": "center",
    "text_color": NAVY, "caption_space": px(10),
    **typo("caption_typography", "Syne", 700, 15, 15, 14, lh=1.3),
    "link_to": "file", "open_lightbox": "yes",
    "_element_width": "initial", "_element_custom_width": {"unit": "%", "size": 20, "sizes": []},
    "_element_width_tablet": "initial", "_element_custom_width_tablet": {"unit": "%", "size": 33.333, "sizes": []},
    "_element_width_mobile": "initial", "_element_custom_width_mobile": {"unit": "%", "size": 50, "sizes": []},
    "_padding": dims(0, 8, 0, 8), "_padding_mobile": dims(0, 6, 0, 6),
    "_css_classes": "fc-slot",
}


def slot(n):
    label = f"Ganhador(a) {n:02d}"
    return widget(f"slot-{n}", "image", {
        "image": {"id": PH_ID, "url": PH_URL, "alt": label, "source": "library"},
        "caption": label,
        "_css_classes": "fc-slot",
    })


grid = section("s-grid", [
    column("c-grid", 100, [slot(n) for n in range(1, 46)], align="center",
           space_between_widgets=24),
], layout="boxed", content_width=px(1170), gap="no",
    padding=dims(0, 0, 50, 0), padding_tablet=dims(0, 14, 40, 14), padding_mobile=dims(0, 14, 30, 14))

# 5. Fechamento ------------------------------------------------------------------
outro = section("s-outro", [
    column("c-outro", 100, [
        lead("t-outro", "<p><strong>Mais informações?</strong> Procure a cooperativa.</p>"),
    ]),
], layout="boxed", content_width=px(890), gap="no",
    padding=dims(0, 0, 20, 0), padding_tablet=dims(0, 20, 20, 20))

data = [intro, art, cards, winners_head, grid, outro]

if __name__ == "__main__":
    mode = sys.argv[3] if len(sys.argv) > 3 else "data"
    if mode == "shared":
        # Conteúdo que substitui SLOT_MARKER (sem as chaves externas do objeto).
        print(json.dumps(SHARED, separators=(",", ":"))[1:-1])
    else:
        json.dump(data, sys.stdout, ensure_ascii=False, separators=(",", ":"))
