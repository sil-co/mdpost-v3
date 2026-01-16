The English version is the bottom.

# Markdown ブログ＆ポートフォリオビューアー
Next.js、TypeScript、TailwindCSS を用いて構築された、シンプルでダイナミックな **Markdown ベースのブログ＆ポートフォリオビューアー** です。
このアプリは、ローカルの Markdown フォルダ構造を自動的に読み取り、折りたたみ可能なサイドバーに表示します。

また、YouTube の埋め込み、外部リンク、表やチェックリストなどの GitHub スタイルの Markdown 機能もサポートしています。

--

## プレビュー
![プレビュー動画](./resources/video/introduction.gif)

---

## 機能
- **ローカルフォルダ構造に基づいた自動生成サイドバー**
- **Markdown ファイルのレンダリング**（構文ハイライトと GitHub スタイルのフォーマットに対応）
- **YouTube の埋め込み**（Markdown の `<iframe>` 経由）
- **外部リンクを新しいタブで開く**
- **言語切り替え**（英語 / 日本語フォルダ）（"/tech-blog" では表示されません）
- **TypeScript + TailwindCSS + ReactMarkdown で構築**

---

## はじめに
1. このプロジェクトをクローンします: `git clone <リポジトリ名>` -> `cd <リポジトリ名>`
2. 依存関係をインストールします: `npm install` または `pnpm install`
3. コンテンツフォルダを作成します: `mkdir -p ./content/mdblog/en` および `mkdir -p ./content/mdblog/ja`
4. Markdown ファイルを追加します
フォルダ構造の例:
```
content/
└── mdblog/
├── en/
│ ├── tech-blog/
│ │ ├── dsa/
│ │ └── java/
│ │ └── springboot/
│ └── portfolio/
│ ├── About me/
│ └── 履歴書/
│ └── 作品/
└── ja/
└── ポートフォリオ/
├── 自己紹介/
└── 履歴書/
└── 作品/
```
5. 開発サーバーを起動: `npm run dev` または `pnpm run dev`
6. 開く: [http:localhost:3000](http:localhost:3000)

---

## 技術スタック
| テクノロジー | 目的 |
| ------------------------------------ | --------------------------------------------------- |
| **Next.js (App Router)** | レンダリングとルーティングのためのフレームワーク |
| **TypeScript** | 型安全性と IDE サポート |
| **Tailwind CSS** | スタイルとレイアウト |
| **ReactMarkdown** | Markdown レンダリング |
| **remark-gfm** | GitHub 風の Markdown (表、チェックリストなど) |
| **rehype-raw** + **rehype-sanitize** | 安全な HTML レンダリング (`<iframe>` など) |

---

## API ルート
| ルート | 説明 |
| ------------------------ | -------------------------------- |
| `/api/mdblog?path={dir}` | フォルダ構造を JSON 形式で返します |
| `/api/md?path={file}` | Markdown コンテンツを返します |

---

## 開発ノート
- アプリは初回アクセス時に **最初の Markdown ファイル** を自動的に読み込みます。
- サイドバーは **現在アクティブなファイル** をハイライト表示します。
- 埋め込まれた HTML (例: `<iframe>`) を含む Markdown ファイルは、`rehype-sanitize` を使用して安全にレンダリングされます。

---

## カスタマイズ
- Markdown のスタイル設定を改善するために、Tailwind Typography を追加します。`pnpm add @tailwindcss/typography` または `npm install @tailwindcss/typography` を実行します。
次に、`tailwind.config.js` で有効化します。
```js
plugins: [require("@tailwindcss/typography")],
```

---

# Markdown Blog and Portfolio Viewer
A simple and dynamic **Markdown-based blog and portfolio viewer** built with Next.js, TypeScript, and TailwindCSS. 
This app automatically reads a local Markdown folder structure and displays it on a collapsible sidebar.
It also supports Youtube embeds, external links, and GitHub-style Markdown features like tables and checklists.

---

## Preview
![Preview video](./resources/video/introduction.gif)

---

## Features
- **Auto-generated sidebar** based on local folder structure
- **Markdown file rendering** with syntax highlighting and GitHub-style formatting
- **Youtube embed support** via `<iframe>` in Markdown
- **External links open in a new tab**
- **Language toggle** (English / Japanese folders), but it doesn't display on "/tech-blog".
- **Built with TypeScript + TailwindCSS + ReactMarkdown**

---

## Getting Started
1. Clone this project: `git clone <this-repository>` -> `cd <this-repository>`
2. Install dependencies: `npm install` or `pnpm install`
3. Create Content folder: `mkdir -p ./content/mdblog/en` and `mkdir -p ./content/mdblog/ja`
4. Add your Markdown files
Example folder structure:
```
content/
└── mdblog/
    ├── en/
    │   ├── tech-blog/
    │   │   ├── dsa/
    │   │   └── java/
    │   │       └── springboot/
    │   └── portfolio/
    │       ├── About me/
    │       └── Resume/
    │           └── Works/
    └── ja/
        └── portfolio/
            ├── About me/
            └── Resume/
                └── Works/
```
5. Run development server: `npm run dev` or `pnpm run dev`
6. Open: [http:localhost:3000](http:localhost:3000)

---

## Tech Stack
| Technology                           | Purpose                                             |
| ------------------------------------ | --------------------------------------------------- |
| **Next.js (App Router)**             | Framework for rendering and routing                 |
| **TypeScript**                       | Type safety and IDE support                         |
| **Tailwind CSS**                     | Styling and layout                                  |
| **ReactMarkdown**                    | Markdown rendering                                  |
| **remark-gfm**                       | GitHub-flavored Markdown (tables, checklists, etc.) |
| **rehype-raw** + **rehype-sanitize** | Safe HTML rendering (for `<iframe>`, etc.)          |

---

## API Routes
| Route                    | Description                      |
| ------------------------ | -------------------------------- |
| `/api/mdblog?path={dir}` | Returns folder structure as JSON |
| `/api/md?path={file}`    | Returns Markdown content         |

---

## Development Notes
- The app automatically loads the **first Markdown file** on initial access.
- The sidebar highlights the **currently active file**.
- Markdown files with embedded HTML (e.g. `<iframe>`) are safely rendered using `rehype-sanitize`.

---

## Customization
- Add Tailwind Typography for better Markdown styling: `pnpm add @tailwindcss/typography` or `npm install @tailwindcss/typography`.
Then enable it in `tailwind.config.js`:
```js
plugins: [require("@tailwindcss/typography")],
```
