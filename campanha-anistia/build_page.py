"""Gera o _elementor_data da página "Campanha Anistia" (fundcoop.com.br).

Uso: python3 build_page.py <placeholder_id> <placeholder_url> <top10_id> <top10_url> [data|shared]
Estrutura legada Section/Column (o site não tem Flexbox Container ativo).

Layout: imagem TOP 10 no início da página, depois a grade com os 45
demais ganhadores e a linha de fechamento.
"""
import hashlib
import json
import os
import sys

PH_ID = int(sys.argv[1])
PH_URL = sys.argv[2]
TOP_ID = int(sys.argv[3])
TOP_URL = sys.argv[4]

NAVY = "#271E59"   # títulos da home
GRAY = "#707A8C"   # texto corrido da home

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


# 1. TOP 10 (imagem enviada pela cooperativa) ------------------------------------
top10 = section("s-top10", [
    column("c-top10", 100, [
        widget("i-top10", "image", {
            "image": {"id": TOP_ID, "url": TOP_URL, "alt": "Conheça os ganhadores: TOP 10 da campanha", "source": "library"},
            "image_size": "full", "align": "center",
            "width": {"unit": "%", "size": 100, "sizes": []},
            "image_border_radius": radius(10),
            "image_box_shadow_box_shadow_type": "yes",
            "image_box_shadow_box_shadow": {"horizontal": 0, "vertical": 30, "blur": 60, "spread": 0, "color": "rgba(111,104,146,0.18)"},
            "link_to": "file", "open_lightbox": "yes",
        }),
    ]),
], layout="boxed", content_width=px(720), gap="no",
    padding=dims(60, 0, 70, 0), padding_tablet=dims(40, 20, 50, 20), padding_mobile=dims(30, 16, 40, 16))

# 2. Demais ganhadores -------------------------------------------------------------------
winners_head = section("s-win-head", [
    column("c-win-head", 100, [
        big_heading("h-win", "Demais Ganhadores", "h2"),
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


# Fotos dos ganhadores (photos.json: [[attachment_id, caminho em uploads], ...],
# na ordem dos slots). Slots sem foto ficam com o placeholder.
_photos_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "photos.json")
PHOTOS = json.load(open(_photos_path)) if os.path.exists(_photos_path) else []
UPLOADS = "https://fundcoop.com.br/wp-content/uploads/"
SLOT_COUNT = len(PHOTOS) or 45


def slot(n):
    label = f"Ganhador(a) {n:02d}"
    if n <= len(PHOTOS):
        img_id, img_url = PHOTOS[n - 1][0], UPLOADS + PHOTOS[n - 1][1]
    else:
        img_id, img_url = PH_ID, PH_URL
    return widget(f"slot-{n}", "image", {
        "image": {"id": img_id, "url": img_url, "alt": label, "source": "library"},
        "caption": label,
        "_css_classes": "fc-slot",
    })


grid = section("s-grid", [
    column("c-grid", 100, [slot(n) for n in range(1, SLOT_COUNT + 1)], align="center",
           space_between_widgets=24,
           # Sem isto a figura com legenda encolhe até a largura natural da foto
           # e fotos em pé/deitadas ficam com larguras diferentes.
           custom_css=("selector .fc-slot figure.wp-caption{display:block;width:100%;margin:0;}\n"
                       "selector .fc-slot figure.wp-caption > a{display:block;}")),
], layout="boxed", content_width=px(1170), gap="no",
    padding=dims(0, 0, 50, 0), padding_tablet=dims(0, 14, 40, 14), padding_mobile=dims(0, 14, 30, 14))

# 3. Fechamento ------------------------------------------------------------------
outro = section("s-outro", [
    column("c-outro", 100, [
        lead("t-outro", "<p><strong>Mais informações?</strong> Procure a cooperativa.</p>"),
    ]),
], layout="boxed", content_width=px(890), gap="no",
    padding=dims(0, 0, 20, 0), padding_tablet=dims(0, 20, 20, 20))

data = [top10, winners_head, grid, outro]

if __name__ == "__main__":
    mode = sys.argv[5] if len(sys.argv) > 5 else "data"
    if mode == "shared":
        # Conteúdo que substitui SLOT_MARKER (sem as chaves externas do objeto).
        print(json.dumps(SHARED, separators=(",", ":"))[1:-1])
    else:
        json.dump(data, sys.stdout, ensure_ascii=False, separators=(",", ":"))
