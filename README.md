# Markdown Blog and Portfolio Viewer
A simple and dynamic **Markdown-based blog and portfolio viewer** built with Next.js, TypeScript, and TailwindCSS. 
This app automatically reads a local Markdown folder structure and displays it on a collapsible sidebar.
It also supports Youtube embeds, external links, and GitHub-style Markdown features like tables and checklists.

---

## Features
- **Auto-generated sidebar** based on local folder structure
- **Markdown file rendering** with syntax highlighting and GitHub-style formatting
- **Youtube embed support** via `<iframe>` in Markdown
- **External links open in a new tab**
- **Language toggle** (English / Japanese folders), but it doesn't display on "/tech".
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
    │   ├── tech/
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
