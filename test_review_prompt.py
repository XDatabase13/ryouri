#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
review_recipe_pages.py のプロンプト有効性テスト
================================================
実際のレシピ3件 + 意図的に内容を取り違えたダミー2件を
同じプロンプトでGeminiに判定させ、正しくOK/NGが返るか検証する。

期待結果:
  実在レシピ3件 → OK
  ダミーレシピ2件 → NG

使い方:
  $env:GEMINI_API_KEY="..."
  py test_review_prompt.py
"""
import sys
sys.path.insert(0, ".")
from review_recipe_pages import build_prompt, call_gemini, extract
from pathlib import Path

# ----------------------------------------------------------------------
# テストケース定義
# ----------------------------------------------------------------------
# source キーがあれば実HTMLから抽出、なければ name/ingredients/lead/steps を直接使う
TEST_CASES = [
    # --- 正常系: 実在レシピ（OK が期待値）---
    {
        "label": "[実在] 肉じゃが",
        "source": "recipes/meat-and-potato-stew.html",
        "expect": "OK",
    },
    {
        "label": "[実在] カレーライス",
        "source": "recipes/curry-rice.html",
        "expect": "OK",
    },
    {
        "label": "[実在] ラーメン",
        "source": "recipes/ramen.html",
        "expect": "OK",
    },

    # --- 異常系: ダミー（NG が期待値）---
    {
        "label": "[ダミー] 肉じゃが名前 × 唐揚げ内容",
        "name": "肉じゃが",
        "ingredients": ["豚肉", "じゃがいも", "にんじん", "玉ねぎ"],
        "lead": "鶏もも肉をカラッと揚げた、子どもから大人まで大人気の一品。"
                "外はサクサク、中はジューシーな食感が魅力で、お弁当にもぴったりです。",
        "steps": [
            "鶏もも肉を一口大に切り、醤油・みりん・にんにく・生姜で下味をつける。",
            "30分ほど漬け込んで味をなじませる。",
            "片栗粉をしっかりまぶす。",
            "170〜180度の油で3〜4分揚げる。",
            "一度取り出して休ませ、高温で二度揚げしてカリッと仕上げる。",
        ],
        "expect": "NG",
    },
    {
        "label": "[ダミー] カレーライス名前 × 肉じゃが内容",
        "name": "カレーライス",
        "ingredients": ["じゃがいも", "にんじん", "玉ねぎ", "豚肉"],
        "lead": "砂糖と醤油の甘辛い煮汁がじゃがいもにしみ込んだ、ほっこり温かい家庭の味。"
                "煮崩れに注意しながら弱火でじっくり仕上げるのがポイントです。",
        "steps": [
            "じゃがいも・にんじん・玉ねぎを切り、じゃがいもは水にさらす。",
            "鍋に油をひき、豚肉を炒めて色が変わったら野菜を加える。",
            "だし汁・砂糖・醤油・みりんを加えて煮立てる。",
            "アクを取りながら蓋をして弱火で20分煮る。",
            "煮汁を煮詰めて味をなじませたら完成。",
        ],
        "expect": "NG",
    },
]


# ----------------------------------------------------------------------
# テスト実行
# ----------------------------------------------------------------------
def run():
    import os
    if not os.environ.get("GEMINI_API_KEY"):
        print("エラー: 環境変数 GEMINI_API_KEY が未設定です。")
        return

    results = []
    print(f"{'='*60}")
    print(f"プロンプト有効性テスト ({len(TEST_CASES)}件)")
    print(f"{'='*60}\n")

    for i, case in enumerate(TEST_CASES, 1):
        label  = case["label"]
        expect = case["expect"]

        # データ取得
        if "source" in case:
            html = Path(case["source"]).read_text(encoding="utf-8")
            name, ingredients, steps, lead = extract(html)
        else:
            name        = case["name"]
            ingredients = case["ingredients"]
            steps       = case["steps"]
            lead        = case["lead"]

        print(f"[{i}/{len(TEST_CASES)}] {label}")
        print(f"  料理名 : {name}")
        print(f"  食材   : {' / '.join(ingredients)}")
        print(f"  期待値 : {expect}")

        try:
            res     = call_gemini(build_prompt(name, ingredients, steps, lead))
            verdict = res.get("verdict", "?")
            reason  = res.get("reason", "")
            passed  = (verdict == expect)
            mark    = "PASS" if passed else "FAIL"
            print(f"  結果   : {verdict}  →  [{mark}]" + (f"  理由: {reason}" if reason else ""))
            results.append({"label": label, "expect": expect, "verdict": verdict, "passed": passed, "reason": reason})
        except Exception as e:
            print(f"  結果   : ERROR  →  [FAIL]  {e}")
            results.append({"label": label, "expect": expect, "verdict": "ERROR", "passed": False, "reason": str(e)})

        print()

    # サマリー
    passed_count = sum(1 for r in results if r["passed"])
    total        = len(results)
    print(f"{'='*60}")
    print(f"結果サマリー: {passed_count}/{total} PASS")
    print(f"{'='*60}")
    for r in results:
        mark = "PASS" if r["passed"] else "FAIL"
        line = f"  [{mark}] {r['label']}  期待={r['expect']} / 実際={r['verdict']}"
        if not r["passed"] and r["reason"]:
            line += f"  ({r['reason']})"
        print(line)

    if passed_count == total:
        print("\nプロンプトは正しく機能しています。")
    else:
        fail_count = total - passed_count
        print(f"\n{fail_count}件のテストが期待通りに動作しませんでした。プロンプトの見直しを検討してください。")


if __name__ == "__main__":
    run()
