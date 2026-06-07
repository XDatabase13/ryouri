#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
料理レシピページ 内容整合チェック (Geminiセルフレビュー・バッチ)
=================================================================
recipes/ 内の各HTMLから「料理名・食材・作り方」を抽出し、
Gemini APIに「この作り方はこの料理・食材に対して正しいか」を判定させる。
取り違え・別レシピ混入・料理名と手順の矛盾を検出する。

- Claudeのトークンは一切使わない（Gemini APIのみで完結）
- 出力を最小化（OK/NG+短い理由のJSON1行）してAPIコストを抑制
- 結果は review_recipe_result.csv に保存。NG/要確認のみ画面表示
- APIエラー時は最大3回まで自動リトライ（指数バックオフ）
- 再実行時はOK/NG確定済みをスキップし、ERRORのみ再チェック

使い方:
  $env:GEMINI_API_KEY="..."   (PowerShell)
  py review_recipe_pages.py
  py review_recipe_pages.py --limit 5   (先頭5件だけ試す)
"""
import os, re, json, glob, time, argparse, csv
import urllib.request, urllib.error
from pathlib import Path

API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

RECDIR = Path("recipes")
MAX_RETRIES = 3  # 1ファイルあたりのAPI最大試行回数


def extract(html):
    """HTMLから判定に必要な最小情報（料理名・食材・作り方・紹介文）を抽出"""
    # 料理名
    name_m = re.search(r'<p class="page-heading">(.*?)</p>', html)
    name = re.sub(r"<[^>]+>", "", name_m.group(1)).strip() if name_m else ""

    # 紹介文
    lead_m = re.search(r'<p style="margin-top:14px[^"]*">(.*?)</p>', html, re.S)
    lead = re.sub(r"<[^>]+>", "", lead_m.group(1)).strip() if lead_m else ""

    # 食材（「使う食材」セクションのul）
    ing_block = re.search(r'使う食材.*?<ul class="disclaimer-list">(.*?)</ul>', html, re.S)
    ingredients = []
    if ing_block:
        ingredients = [re.sub(r"<[^>]+>", "", li).strip()
                       for li in re.findall(r'<li>(.*?)</li>', ing_block.group(1), re.S)]

    # 作り方（「作り方」セクションのol）
    steps_block = re.search(r'作り方.*?<ol class="disclaimer-list">(.*?)</ol>', html, re.S)
    steps = []
    if steps_block:
        steps = [re.sub(r"<[^>]+>", "", li).strip()
                 for li in re.findall(r'<li>(.*?)</li>', steps_block.group(1), re.S)]

    return name, ingredients, steps, lead


def build_prompt(name, ingredients, steps, lead):
    ing_text = "、".join(ingredients)
    steps_text = "\n".join(f"{i+1}. {s}" for i, s in enumerate(steps))
    return f"""あなたは料理の専門家です。以下は、あるレシピページから抽出したデータです。

# 料理名
{name}

# 主な食材
{ing_text}

# 紹介文
{lead}

# 作り方の手順
{steps_text}

# 判定タスク
上記の「紹介文」と「作り方の手順」が、「{name}」という料理に対して正しいかを判定してください。
特に次を確認:
- 紹介文や手順が別の料理のものになっていないか（例: 肉じゃがなのにカレーの説明）
- 料理名と食材・手順が明らかに矛盾していないか
- 食材と作り方の工程が大きく食い違っていないか

# 出力（JSONのみ。前後に文章やマークダウンを付けない）
{{"verdict": "OK" または "NG", "reason": "NGの場合のみ、何がどう食い違うかを30字以内で。OKなら空文字"}}"""


def call_gemini(prompt):
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseMimeType": "application/json"}
    }
    req = urllib.request.Request(
        URL, data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as r:
        result = json.loads(r.read().decode("utf-8"))
        text = result["candidates"][0]["content"]["parts"][0]["text"]
        return json.loads(text)


def main():
    ap = argparse.ArgumentParser(description="レシピページ整合チェック")
    ap.add_argument("--limit", type=int, help="先頭N件だけチェック（動作確認用）")
    args = ap.parse_args()

    if not API_KEY:
        print("エラー: 環境変数 GEMINI_API_KEY が未設定です。")
        print("  $env:GEMINI_API_KEY='your-key-here'  を実行してから再試行してください。")
        return

    files = sorted(glob.glob(str(RECDIR / "*.html")))
    if args.limit:
        files = files[:args.limit]

    print(f"検査対象: {len(files)} ファイル / モデル: {MODEL}\n")

    # 既存CSVを読み込んでマージ（再実行時にデータを保持）
    csv_file = Path("review_recipe_result.csv")
    results_map = {}
    if csv_file.exists():
        with open(csv_file, "r", encoding="utf-8-sig") as cf:
            reader = csv.reader(cf)
            next(reader, None)
            for row in reader:
                if len(row) == 3:
                    results_map[row[0]] = row

    ng = []
    for i, f in enumerate(files, 1):
        fn = os.path.basename(f)

        # OK/NG/SKIPが確定済みのファイルは再チェックしない
        if results_map.get(fn, ["", ""])[1] in ("OK", "NG", "SKIP"):
            print(f"[{i}/{len(files)}] {fn}: スキップ（確定済み）")
            continue

        html = Path(f).read_text(encoding="utf-8")
        name, ingredients, steps, lead = extract(html)
        if not steps:
            results_map[fn] = [fn, "SKIP", "作り方が抽出できず"]
            print(f"[{i}/{len(files)}] {fn}: SKIP（作り方なし）")
            continue

        verdict = reason = None
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                res = call_gemini(build_prompt(name, ingredients, steps, lead))
                verdict = res.get("verdict", "?")
                reason = res.get("reason", "")
                break  # 成功したらリトライ終了
            except Exception as e:
                if attempt < MAX_RETRIES:
                    wait = 3.0 * attempt  # 3秒 → 6秒 と伸ばす
                    print(f"[{i}/{len(files)}] {fn}: リトライ {attempt}/{MAX_RETRIES}（{wait:.0f}秒後） {e}")
                    time.sleep(wait)
                else:
                    verdict = "ERROR"
                    reason = str(e)

        results_map[fn] = [fn, verdict, reason]
        if verdict == "NG":
            ng.append((fn, reason))
            print(f"[{i}/{len(files)}] {fn}: NG — {reason}")
        elif verdict == "ERROR":
            print(f"[{i}/{len(files)}] {fn}: ERROR（{MAX_RETRIES}回失敗）")
        else:
            print(f"[{i}/{len(files)}] {fn}: OK")
        time.sleep(1.0)

    with open(csv_file, "w", encoding="utf-8-sig", newline="") as cf:
        w = csv.writer(cf)
        w.writerow(["file", "verdict", "reason"])
        for key in sorted(results_map.keys()):
            w.writerow(results_map[key])

    print(f"\n=== 完了 ===")
    print(f"検査 {len(files)}件 / 結果は {csv_file} に保存されました")
    if ng:
        print("\n⚠️ 要確認（NG）一覧:")
        for fn, reason in ng:
            print(f"  ● {fn} — {reason}")
    else:
        print("✅ 取り違え等のNGは検出されませんでした。")


if __name__ == "__main__":
    main()
