# 한글 자모 테스트 · Hangul Letter Quiz

ハングル（韓国語の字母）を覚えたかを確認する、1ファイル完結・ビルド不要のクイズです。
スマホのブラウザで開いて、繰り返し回せます。

> ハングル1字 → ローマ字4択 → 正誤判定と「初声・中声・終声」の分解、発音の解説、音声。
> 表示言語は**日本語 / 繁體中文 / English**の3つ。設定はブラウザに保存されます。

---

## 特徴

| | |
|---|---|
| **113問** | 基本子音19・激音/濃音18・母音48・パッチム28 |
| **3言語** | 日本語・繁體中文・English（右上で切替、`localStorage`に記憶） |
| **解説つき** | 字母を初声/中声/終声に分解し、字母名・種別（平音/濃音/激音/鼻音/流音/単母音/二重母音/内破音）・説明を表示 |
| **音声** | 端末の韓国語TTS（Web Speech API）。「聞く」「ゆっくり」の2段階 |
| **誤答の設計** | 紛らわしい選択肢を手で用意（까→ka/ga/tto、외→we/wi/eo など） |
| **復習** | 結果画面から「まちがえた字だけ復習」に直行。通算成績も保存 |
| **依存なし** | フレームワーク・CDN・ビルドツール不使用。`file://` でも動く |

---

## ファイル構成

```
hangul-quiz/
├── index.html     画面の骨組み（テキストは空、JSが流し込む）
├── style.css      配色・レイアウト（CSS変数のみ、ライト/ダーク不要の固定配色）
├── data.js        113問のデータ＋字母の解説テーブル（ja / zh / en）
├── i18n.js        UI文言の3言語辞書
├── app.js         出題・判定・復習・音声・言語切替のロジック
├── README.md
└── LICENSE
```

読み込み順は `data.js` → `i18n.js` → `app.js`。すべて `<script>` の通常読み込みなので、サーバーなしで動きます。

---

## ローカルで動かす

```bash
git clone https://github.com/<your-name>/hangul-quiz.git
cd hangul-quiz
python3 -m http.server 8000
# → http://localhost:8000
```

`index.html` をダブルクリックしても動きます（`file://`）。ただし一部のブラウザは `file://` で音声を制限するので、確認はローカルサーバー経由がおすすめです。

---

## GitHub Pages で公開する

### A. ブラウザだけで完結（CLIなし）

1. GitHub で **New repository** → 名前は `hangul-quiz`、**Public** を選択 → Create
2. **uploading an existing file** をクリックし、`index.html` `style.css` `data.js` `i18n.js` `app.js` `README.md` `LICENSE` をまとめてドラッグ＆ドロップ
3. **Commit changes**
4. **Settings → Pages** → Source は **Deploy from a branch**、Branch は **main** / **/(root)** → **Save**
5. 1〜2分後、`https://<your-name>.github.io/hangul-quiz/` で公開される

### B. コマンドライン（gh CLI）

```bash
# リポジトリ作成（このフォルダ内で実行）
gh repo create hangul-quiz --public --source=. --remote=origin --push

# Pages を main のルートで有効化
gh api -X POST repos/:owner/hangul-quiz/pages \
  -f 'source[branch]=main' -f 'source[path]=/'

# 反映待ち（数十秒〜2分）
gh api repos/:owner/hangul-quiz/pages --jq .html_url
```

### C. Actions で自動デプロイする場合（任意）

`.github/workflows/pages.yml` を置けば、push のたびに再デプロイできます。静的ファイルのみなので、`upload-pages-artifact` にリポジトリ直下を渡すだけで十分です。

```yaml
name: Deploy to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

> スマホでは、公開URLを開いてブラウザメニューの「ホーム画面に追加」でアプリのように起動できます。

---

## 問題を追加する

`data.js` の `ITEMS` に1行足すだけです。**1音節のハングル**を `h` に入れてください（分解処理が自動で走ります）。

```js
{h:'꿀', r:'kkul', d:['kul','gul','kkul'], c:'final', n:{
  ja:'꿀は「はちみつ」。終声ㄹは[l]。',
  zh:'꿀是「蜂蜜」。終聲ㄹ讀[l]。',
  en:'꿀 means honey. Final ㄹ is [l].'}},
```

| フィールド | 内容 |
|---|---|
| `h` | ハングル1字（必須・重複不可） |
| `r` | 正解のローマ字（文化観光部2000年式） |
| `d` | 誤答候補3つ。正解と重複させない |
| `c` | `basic` / `tense` / `vowel` / `final` |
| `n` | 解説。`ja` / `zh` / `en`。不要なら `null` |

`n` を `null` にすると、字母の分解と発音説明だけが出ます（基本子音の多くはこれ）。

### 発音の基準

- ローマ字は**文化観光部2000年式**。パッチムの ㄱ/ㄷ/ㅂ は `k` / `t` / `p`。
- パッチムは**代表音**（내파음）で出題。값 → `gap`（`gaps` ではない）。
- 連音・鼻音化などの音変は、字母の段階では扱いません（`닭` は `dak`、`닭을` は解説の中で `[달글]` として言及）。

---

## 仕様メモ

- **音声**は `speechSynthesis` の `ko-KR`。端末に韓国語音声が無い場合は警告を出し、他の機能は通常どおり動きます。
- **成績**は `localStorage` の `hq.stats`（answered / correct / runs）、**言語**は `hq.lang`。どちらも端末内のみで、送信しません。
- **キーボード**: `1`〜`4` で選択、`Enter` / `Space` で次へ。
- `prefers-reduced-motion` を尊重し、アニメーションを実質無効化します。

---

## ライセンス

MIT — [`LICENSE`](LICENSE) を参照。問題文・解説は自由に改変してかまいません。
