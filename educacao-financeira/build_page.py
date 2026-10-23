"""Gera o _elementor_data da página "Educação Financeira" (fundcoop.com.br).

Uso: python3 build_page.py [files.json] [--final] > page.json
files.json (opcional): {"pdf": url, "pptx": url, "xls": url} com os arquivos
já enviados para a Biblioteca de Mídia. Sem ele os botões ficam com "#";
com --final o script recusa gerar a página se faltar algum arquivo.
Estrutura legada Section/Column (o site não tem Flexbox Container ativo).
"""
import hashlib
import json
import sys

ARGS = [a for a in sys.argv[1:] if a != "--final"]
FILES = json.load(open(ARGS[0])) if ARGS else {}
PDF_URL = FILES.get("pdf", "#")
PPTX_URL = FILES.get("pptx", "#")
XLS_URL = FILES.get("xls", "#")
if "--final" in sys.argv:
    for name, url in (("pdf", PDF_URL), ("pptx", PPTX_URL), ("xls", XLS_URL)):
        assert url.startswith("https://fundcoop.com.br/wp-content/uploads/"), f"{name}: {url}"

NAVY = "#271E59"   # títulos da home
# Verde primário do kit (contraste 8:1 com branco). O teal da home (#0EBD9E)
# não passa no WCAG para texto branco nem para títulos sobre fundo claro.
GREEN = "#0D5C3A"
GREEN_HOVER = "#01490E"
GRAY = "#707A8C"   # texto corrido da home
CARD = "#00850D2B" # fundo dos cards de aviso da home

_seen = set()


def eid(key):
    h = hashlib.md5(("edufin-" + key).encode()).hexdigest()[:8]
    assert h not in _seen
    _seen.add(h)
    return h


def px(v, unit="px"):
    return {"unit": unit, "size": v, "sizes": []}


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
        s[f"{p}_line_height"] = px(lh, "em")
    if ls is not None:
        s[f"{p}_letter_spacing"] = px(ls)
    return s


def widget(key, wtype, settings):
    return {"id": eid(key), "elType": "widget", "widgetType": wtype, "settings": settings, "elements": []}


def column(key, size, widgets, **settings):
    return {"id": eid(key), "elType": "column", "settings": {"_column_size": size, "_inline_size": None, **settings},
            "elements": widgets, "isInner": False}


def section(key, columns, width=890, **settings):
    base = {"layout": "boxed", "content_width": px(width), "gap": "no"}
    return {"id": eid(key), "elType": "section", "settings": {**base, **settings}, "elements": columns,
            "isInner": False}


def heading(key, text, tag, family, weight, size, size_t, size_m, color, align="center", lh=1.1, ls=None, pad_b=0):
    s = {"title": text, "header_size": tag, "align": align, "title_color": color,
         **typo("typography", family, weight, size, size_t, size_m, lh=lh, ls=ls)}
    if pad_b:
        s["_padding"] = dims(0, 0, pad_b, 0)
    return widget(key, "heading", s)


def big_heading(key, text, tag, size=65, size_t=48, size_m=36):
    return heading(key, text, tag, "Ubuntu", 700, size, size_t, size_m, NAVY, lh=1, ls=-2, pad_b=10)


def text(key, html, size=20, align="justify", color=GRAY):
    return widget(key, "text-editor", {
        "editor": html, "align": align, "text_color": color,
        **typo("typography", "DM Sans", 400, size, 16, 15, lh=1.7),
    })


def button(key, label, url, outline=False, download=False):
    # Downloads ficam na mesma aba (atributo download); o resto abre em nova aba.
    link = {"url": url, "is_external": "" if download else "on", "nofollow": "",
            "custom_attributes": "download|" if download else ""}
    s = {
        "text": label, "align": "left", "align_mobile": "center",
        "link": link,
        **typo("typography", "Syne", 700, 16, 15, 15, lh=1.2),
        "border_radius": radius(50),
        "text_padding": dims(14, 30, 14, 30),
        "background_background": "classic",
        "button_background_hover_background": "classic",
    }
    if outline:
        # Padding 2px menor para compensar a borda e igualar a altura dos botões cheios.
        s.update({"button_text_color": GREEN, "background_color": "#FFFFFF",
                  "hover_color": "#FFFFFF", "button_background_hover_color": GREEN,
                  "border_border": "solid", "border_width": radius(2), "border_color": GREEN,
                  "text_padding": dims(12, 28, 12, 28)})
    else:
        s.update({"button_text_color": "#FFFFFF", "background_color": GREEN,
                  "hover_color": "#FFFFFF", "button_background_hover_color": GREEN_HOVER})
    return widget(key, "button", s)


def card(key, size, widgets, side, stack_tablet=False):
    # Card branco com sombra suave, como os cards de "Benefícios exclusivos" da home.
    margins = {"left": dims(0, 12, 0, 0), "mid": dims(0, 6, 0, 6), "right": dims(0, 0, 0, 12)}[side]
    extra = {"_inline_size_tablet": 100, "margin_tablet": dims(0, 0, 20, 0)} if stack_tablet else {}
    return column(key, size, widgets, **extra,
                  content_position="top",
                  background_background="classic", background_color="#FFFFFF",
                  border_radius=radius(10),
                  box_shadow_box_shadow_type="yes",
                  box_shadow_box_shadow={"horizontal": 0, "vertical": 30, "blur": 60, "spread": 0,
                                         "color": "rgba(111,104,146,0.16)"},
                  padding=dims(35, 30, 35, 30), padding_tablet=dims(25, 20, 25, 20),
                  margin=margins, margin_mobile=dims(0, 0, 30, 0),
                  animation="fadeInUp")


def card_title(key, label):
    return heading(key, label, "h3", "Ubuntu", 700, 24, 20, 22, NAVY, align="start", lh=1.3, ls=-1)


def card_text(key, html):
    return text(key, html, size=16, align="start")


# 1. Abertura ----------------------------------------------------------------------
intro = section("s-intro", [
    column("c-intro", 100, [
        big_heading("h-title", "Educação Financeira", "h1"),
        heading("h-tagline", "Cuidar do seu dinheiro é investir no seu futuro!", "h2",
                "Syne", 700, 28, 24, 22, GREEN, pad_b=10),
        text("t-intro",
             "<p>Na Fundcoop, acreditamos que a educação financeira promove qualidade de vida, segurança e "
             "tranquilidade. Por isso, incentivamos nossos cooperados a desenvolver uma relação consciente com o "
             "dinheiro, favorecendo a realização de sonhos e a construção de um futuro mais saudável.</p>"
             "<p>Administrar bem os recursos envolve conhecer hábitos de consumo, definir prioridades, controlar "
             "despesas, evitar o endividamento e fazer escolhas responsáveis.</p>"
             "<p>Neste espaço, você encontrará conteúdos, ferramentas e materiais para ampliar seus conhecimentos e "
             "adotar hábitos financeiros mais saudáveis.</p>"),
    ]),
], padding=dims(60, 0, 30, 0), padding_tablet=dims(50, 20, 20, 20), padding_mobile=dims(40, 20, 10, 20))

# 2. Por onde começar? (card verde claro, como os avisos da home) -------------------
start = section("s-start", [
    column("c-start", 100, [
        heading("h-start", "Por onde começar?", "h2", "Syne", 700, 30, 26, 26, GREEN, align="start"),
        text("t-start",
             "<p>Conheça sua realidade financeira: registre ganhos e despesas, acompanhe os gastos, identifique "
             "excessos e estabeleça metas. Com planejamento e disciplina, é possível equilibrar o orçamento, criar "
             "uma reserva para imprevistos, usar o crédito com responsabilidade e alcançar objetivos de curto, "
             "médio e longo prazo.</p>", size=18, color=NAVY),
        heading("h-start-cta", "Aprenda, planeje e transforme sua vida financeira.", "p",
                "Syne", 700, 20, 18, 18, NAVY, align="start", lh=1.4),
    ], background_background="classic", background_color=CARD, border_radius=radius(20),
        padding=dims(40, 50, 40, 50), padding_tablet=dims(30, 30, 30, 30), padding_mobile=dims(25, 25, 25, 25),
        animation="fadeInUp"),
], padding=dims(20, 0, 60, 0), padding_tablet=dims(10, 20, 40, 20), padding_mobile=dims(10, 20, 30, 20))

# 3. Nosso compromisso com você -------------------------------------------------------
commitment = section("s-commit", [
    column("c-commit", 100, [
        big_heading("h-commit", "Nosso compromisso com você", "h2", 45, 36, 30),
        text("t-commit",
             "<p>Na Fundcoop, o cooperativismo também significa promover conhecimento, autonomia e desenvolvimento "
             "coletivo. Queremos caminhar ao seu lado, oferecendo informações e recursos para fortalecer sua saúde "
             "financeira e apoiar decisões conscientes.</p>"
             "<p>A educação financeira transforma conhecimento em escolhas melhores e novas possibilidades.</p>"
             "<p>Explore nossos conteúdos e comece hoje mesmo a cuidar melhor do seu dinheiro.</p>"),
    ]),
], padding=dims(0, 0, 60, 0), padding_tablet=dims(0, 20, 40, 20), padding_mobile=dims(0, 20, 30, 20))

# 4. Materiais da FundCoop -------------------------------------------------------------
materials_head = section("s-mat-head", [
    column("c-mat-head", 100, [
        big_heading("h-mat", "Materiais da Fundcoop", "h2", 45, 36, 30),
    ]),
], padding=dims(0, 0, 20, 0), padding_tablet=dims(0, 20, 10, 20), padding_mobile=dims(0, 20, 10, 20))

materials = section("s-mat", [
    card("c-mat-ppt", 50, [
        card_title("h-mat-ppt", "Apresentação: Educação Financeira na Prática"),
        card_text("t-mat-ppt",
                  "<p>Os riscos do mau uso do crédito, as vantagens e desvantagens de ter contas em vários bancos, "
                  "renda extra e dicas para fazer escolhas financeiras mais conscientes.</p>"),
        button("b-mat-pdf", "Ver apresentação (PDF)", PDF_URL),
        button("b-mat-pptx", "Baixar em PowerPoint", PPTX_URL, outline=True, download=True),
    ], "left"),
    card("c-mat-xls", 50, [
        card_title("h-mat-xls", "Planilha de Orçamento Familiar"),
        card_text("t-mat-xls",
                  "<p>Planilha em Excel para planejar as despesas domésticas do mês, registrar entradas e saídas, "
                  "acompanhar o saldo e a posição dos seus investimentos.</p>"),
        button("b-mat-xls", "Baixar planilha (Excel)", XLS_URL, download=True),
    ], "right"),
], width=960, structure="20",
    padding=dims(10, 0, 40, 0), padding_tablet=dims(10, 20, 30, 20), padding_mobile=dims(10, 20, 20, 20))

sections_pdf = []
if PDF_URL != "#":
    # Visualizador do plugin PDF Embedder (já ativo no site).
    sections_pdf.append(section("s-pdf", [
        column("c-pdf", 100, [
            widget("w-pdf", "shortcode", {"shortcode": f'[pdf-embedder url="{PDF_URL}"]'}),
        ]),
    ], width=960, padding=dims(0, 0, 60, 0), padding_tablet=dims(0, 20, 40, 20), padding_mobile=dims(0, 20, 30, 20)))

# 5. Links úteis -------------------------------------------------------------------------
links_head = section("s-links-head", [
    column("c-links-head", 100, [
        big_heading("h-links", "Links úteis", "h2", 45, 36, 30),
        text("t-links", "<p>Conteúdos gratuitos de instituições oficiais para você continuar aprendendo.</p>",
             align="center"),
    ]),
], padding=dims(0, 0, 20, 0), padding_tablet=dims(0, 20, 10, 20), padding_mobile=dims(0, 20, 10, 20))

LINKS = [
    ("bcb-cursos", "Cursos de Cidadania Financeira",
     "Cursos gratuitos do Banco Central do Brasil sobre cidadania financeira.",
     "Acessar cursos", "https://www.bcb.gov.br/cidadaniafinanceira/cursos"),
    ("bcb-biblioteca", "Biblioteca de Cidadania Financeira",
     "Materiais educativos sobre finanças pessoais do Banco Central do Brasil.",
     "Acessar biblioteca", "https://www.bcb.gov.br/cidadaniafinanceira/cidadania_biblioteca"),
    ("susep-planilhas", "Planilhas Financeiras",
     "Planilhas para organizar suas finanças, disponíveis na área Meu Futuro Seguro do site da SUSEP.",
     "Acessar planilhas", "https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/ferramentas/planilhas-financeiras-1"),
]

links = section("s-links", [
    card(f"c-{k}", 33, [
        card_title(f"h-{k}", title),
        card_text(f"t-{k}", f"<p>{desc}</p>"),
        button(f"b-{k}", label, url),
    ], side, stack_tablet=True)
    for (k, title, desc, label, url), side in zip(LINKS, ["left", "mid", "right"])
], width=1170, structure="30",
    padding=dims(10, 0, 60, 0), padding_tablet=dims(10, 20, 40, 20), padding_mobile=dims(10, 20, 30, 20))

# 6. Fechamento ---------------------------------------------------------------------------
outro = section("s-outro", [
    column("c-outro", 100, [
        heading("h-outro",
                "Fundcoop — Educação financeira para uma vida mais equilibrada, consciente e cheia de possibilidades!",
                "p", "Syne", 700, 24, 20, 18, GREEN, lh=1.4),
    ]),
], padding=dims(0, 0, 40, 0), padding_tablet=dims(0, 20, 30, 20))

data = [intro, start, commitment, materials_head, materials, *sections_pdf, links_head, links, outro]

if __name__ == "__main__":
    json.dump(data, sys.stdout, ensure_ascii=False, separators=(",", ":"))
