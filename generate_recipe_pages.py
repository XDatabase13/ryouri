#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
冷蔵庫レスキュー レシピ 静的ページ生成バッチ
================================================
data.js の各レシピに対して recipes/<slug>.html を生成する。

使い方:
  export GEMINI_API_KEY="..."
  python3 generate_recipe_pages.py --dry-run       # API呼ばず1件分の処理内容を表示
  python3 generate_recipe_pages.py --limit 3       # 先頭3件のみ生成
  python3 generate_recipe_pages.py                 # 全件生成
"""

import os, re, json, argparse, time, html
from pathlib import Path

# ----------------------------------------------------------------------
# 設定
# ----------------------------------------------------------------------
OUT_DIR = Path("recipes")
DATA_JS = Path("data.js")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")

LEVEL_JA = {"Beginner": "簡単", "Intermediate": "普通", "Advanced": "手間"}


# ----------------------------------------------------------------------
# データ読み込み
# ----------------------------------------------------------------------
def load_recipes():
    """data.js (const RECIPES = [...];) から JSON 配列を抽出してパース"""
    text = DATA_JS.read_text(encoding="utf-8")
    start = text.index("[")
    end = text.rindex("]") + 1
    return json.loads(text[start:end])


def slugify(en):
    return re.sub(r"^-+|-+$", "", re.sub(r"[^a-z0-9]+", "-", en.lower()))


# ----------------------------------------------------------------------
# Gemini プロンプト生成
# ----------------------------------------------------------------------
def build_prompt(r):
    ingredients = "、".join(r["ingredients"])
    level = LEVEL_JA.get(r["level"], r["level"])

    return f"""あなたは料理レシピライターです。以下のレシピについて、日本語で解説テキストを生成してください。

# レシピデータ
- 料理名: {r['ja']} ({r['en']})
- カテゴリ: {r['category']}
- 難易度: {level}
- 主な食材: {ingredients}

# 制約
- 実際のレシピに即した具体的な内容にすること。
- 分量の記載は不要。手順の流れと調理のポイントを伝えること。
- 文章中にマークダウン記号(**、##、- など)を使わず、プレーンな文章にすること。
- 出力は必ず指定のJSON形式のみ。前後に説明文を付けない。

# 出力JSON形式
{{
  "lead": "この料理の紹介文（80〜120字。どんな料理か、どんな人に向いているか）",
  "howto": ["手順1", "手順2", "手順3", "手順4", "手順5"],
  "tips": ["調理のコツや注意点を1〜2個。各30〜60字"]
}}"""


# ----------------------------------------------------------------------
# Gemini API 呼び出し
# ----------------------------------------------------------------------
def call_gemini(prompt, dry_run=False):
    if dry_run:
        return {
            "lead": "（ダミー）この料理の紹介文がここに入ります。",
            "howto": ["（ダミー）手順1", "手順2", "手順3", "手順4", "手順5"],
            "tips": ["（ダミー）調理のコツがここに入ります。"],
        }
    import google.generativeai as genai
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel(GEMINI_MODEL)
    resp = model.generate_content(prompt)
    raw = resp.text.strip()
    raw = re.sub(r"^```(json)?|```$", "", raw, flags=re.MULTILINE).strip()
    return json.loads(raw)


# ----------------------------------------------------------------------
# HTML 組み立て
# ----------------------------------------------------------------------
def esc(s):
    return html.escape(str(s), quote=True)


def render_html(r, content):
    level = LEVEL_JA.get(r["level"], r["level"])

    tags_html = f'<span class="tag">{esc(r["category"])}</span>'
    tags_html += f'<span class="tag">{esc(level)}</span>'
    for ing in r["ingredients"]:
        tags_html += f'<span class="tag">{esc(ing)}</span>'

    ing_li = "\n".join(f"      <li>{esc(i)}</li>" for i in r["ingredients"])
    howto_li = "\n".join(f"      <li>{esc(s)}</li>" for s in content.get("howto", []))

    tips_section = ""
    if content.get("tips"):
        tips_li = "\n".join(f"      <li>{esc(t)}</li>" for t in content["tips"])
        tips_section = f"""
<div class="panel">
  <p class="section-title">調理のコツ</p>
  <ul class="disclaimer-list">
{tips_li}
  </ul>
</div>"""

    from urllib.parse import quote
    search_url = f"https://www.google.com/search?q={quote(r['ja'] + ' レシピ 作り方')}&udm=14"

    return TEMPLATE.format(
        ja=esc(r["ja"]),
        en=esc(r["en"]),
        lead=esc(content.get("lead", "")),
        tags=tags_html,
        ing_li=ing_li,
        howto_li=howto_li,
        tips_section=tips_section,
        search_url=search_url,
    )


TEMPLATE = '''<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{ja}の作り方 - 冷蔵庫レスキュー</title>
<link rel="stylesheet" href="../style.css?v=2">
</head>
<body>
<header>
  <h1>冷蔵庫<span>レスキューver3</span></h1>
  <p class="lead"><a href="../index.html" class="back-link">← 食材から料理を探す</a></p>
</header>

<div class="panel">
  <p class="page-heading">{ja}</p>
  <p class="page-subtext">{en}</p>
  <div class="tags">{tags}</div>
  <p style="margin-top:14px; font-size:.92rem; line-height:1.75;">{lead}</p>
</div>

<div class="panel">
  <p class="section-title">使う食材</p>
  <ul class="disclaimer-list">
{ing_li}
  </ul>
</div>

<div class="panel">
  <p class="section-title">作り方</p>
  <ol class="disclaimer-list">
{howto_li}
  </ol>
</div>
{tips_section}
<div class="panel">
  <div class="searchbtns">
    <a href="{search_url}" target="_blank" rel="noopener">Googleでレシピを詳しく調べる</a>
  </div>
  <div class="notice">ボタンを押すとGoogle検索結果が新しいタブで開きます。具体的な分量や調理手順は検索先のレシピサイトをご参照ください。</div>
</div>

<footer>
  <div class="footer-links">
    <a href="../index.html">トップに戻る</a>
    <a href="../disclaimer.html">免責事項</a>
  </div>
</footer>
</body>
</html>
'''


# ----------------------------------------------------------------------
# メイン
# ----------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="冷蔵庫レスキュー レシピ静的ページ生成")
    ap.add_argument("--dry-run", action="store_true",
                    help="APIを呼ばず1件分の処理内容を表示するだけ")
    ap.add_argument("--limit", type=int,
                    help="先頭N件のみ生成（動作確認用）")
    args = ap.parse_args()

    recipes = load_recipes()
    print(f"レシピ総数: {len(recipes)}件")

    targets = recipes[:args.limit] if args.limit else recipes

    if args.dry_run:
        r = targets[0]
        slug = slugify(r["en"])
        prompt = build_prompt(r)
        content = call_gemini(prompt, dry_run=True)
        page_html = render_html(r, content)
        print(f"\n{'='*60}")
        print(f"[DRY RUN] 処理対象: {r['ja']} ({r['en']})")
        print(f"出力先: {OUT_DIR}/{slug}.html")
        print(f"\n--- プロンプト ---\n{prompt}")
        print(f"\n--- ダミーコンテンツ (API応答の想定形式) ---")
        print(json.dumps(content, ensure_ascii=False, indent=2))
        print(f"\n--- 生成HTML（先頭600字） ---\n{page_html[:600]}...")
        print(f"{'='*60}")
        print(f"\n対象 {len(targets)}件のうち1件を表示しました。")
        print("実際に生成するには --dry-run を外してください。")
        return

    if not os.environ.get("GEMINI_API_KEY"):
        print("エラー: 環境変数 GEMINI_API_KEY が設定されていません。")
        print("  export GEMINI_API_KEY='your-key-here'  を実行してから再試行してください。")
        return

    OUT_DIR.mkdir(exist_ok=True)
    generated, failed = [], []

    for i, r in enumerate(targets, 1):
        slug = slugify(r["en"])
        try:
            prompt = build_prompt(r)
            content = call_gemini(prompt)
            page_html = render_html(r, content)
            out_path = OUT_DIR / f"{slug}.html"
            out_path.write_text(page_html, encoding="utf-8")
            generated.append(slug)
            print(f"[{i}/{len(targets)}] {r['ja']} → {out_path}")
            time.sleep(1.0)  # APIレート制限対策
        except Exception as ex:
            print(f"[{i}/{len(targets)}] !! {r['ja']} 失敗: {ex}")
            failed.append(r["ja"])

    print(f"\n完了: {len(generated)}件生成 / {len(failed)}件失敗 → {OUT_DIR}/")
    if failed:
        print(f"失敗: {', '.join(failed)}")


if __name__ == "__main__":
    main()
