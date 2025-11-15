# Requirements Definition Document
- Project: Markdown Blog & Portfolio Viewew
- Technology Stack: Next.js (App Router), TypeScript, TailwindCSS, Github Actions
- Version: 1.0

---

## Project Overview
The goal of this project is to create a Markdown-based blog and portfolio viewew that automatically reads Markdown files stored in a local folder structure. <br>
Markdown files are managed in **VSCode and GitHub**, and the websites automatically updates via **Github Actions** upon each push.<br>
Users can read content but content **cannot edit** it from the browser.

---

## Objectives
### Main Purpose
- Allow the creator to write documentation, blog posts, portfolios, or technical notes entirely in Markdown using VSCode.
- Automatically publish the latest Markdown content to a web server using GitHub Actions.
- Provide a clean, responsive, searchable, and easy-to-navigate UI for uses to read Markdown files.

### Target Users
- Anyone who reads the blog/portfolio (public readers)
- The content creator (administrator)
- Developers who want a reference implementation of a Markdown-based CMS-less blog

---

## Functional Requirements (FR)
### Content Management
- FR-1: The system must load Markdwon files frm a local folder structure (`/content/mdblog/**`).
- FR-2: The system must support two languages (`en`, `ja`), each in its own folder. 
- FR-3: The system must parse Markdwon and render it into HTML using ReactMarkdown.
- FR-4: The system must support GitHub-style Markdown:
    - Tables
    - Inline code / fenced code blocks 
    - Links (external links must open in new tabs)
- FR-5: The system must support embedded HTML inside Markdown (e.g., `<ifram>` for YouTube).
- FR-6: The system must highlight the currently selected Markdown file in the sidebar.
- FR-7: The system must support Mermaid inside Markdown (e.g., `mermaid` for design).

### Navigation & UI
- FR-8: The app must automatically generate a sidebar navigation menu based on the folder structure.
- FR-9: The sidebar must support collapsible folders.
- FR-10: The first Markdown file in a folder must automatically load on initial access.
- FR-11: The layout must include:
    - Sidebar (tree menu)
    - Main content area (Markdown content)
- FR-12: The UI must support a "language switcher" for EN/JA folders in Portfolio.
> Note: it must not be displayed on `/tech` (tech blog).

### API & Backend
- FR-13: Provide an API route to retrieve folder structures:
    - `/api/mdblog?path={dir}`
- FR-14: Provide an API route to retrieve Markdown file contents:
    - `/api/md?path={file}`
- FR-15: The backend must sanitize embedded HTML to avoid XSS, using: 
    - `rehype-sanitize`

### Deployment & CI/CD
- FR-16: Markdown changes must automatically deploy using GitHub Actions.
- FR-17: The server must always display the latest Markdown content after deployment.
- FR-18: Users must not be able to edit or upload content - the system is read-only for visitors.

---

## Non-functional Requirements (NFR)
### Performance
- NFR-1: Markdown rendering must complete within 200ms on the server side.
- NFR-2: Sidebar generation must be fast even when Markdown file increase.

### Security
- NFR-3: Embedded HTML must be sanitized to prevent XSS.
- NFR-4: GitHub Actions secrets (e.g., deployment server SSH keys) must be securely stored.

### Scalability
- NFR-5: The app must handle hundreads of Markdown files without UI slowdown.
- NFR-6: Folder depth up to at least 5 levels must be supported.

### Maintainability
- NFR-7: Content updates must require no code changes (Markdown-only workflow).
- NFR-8: All content must be compatible with VSCode Markdown.

### Usability
- NFR-9: The app must be mobile-responsibe using TailwindCSS.
- NFR-10: External links must be clearly distinguishable and open in new tabs

---

## Folder Structure Requirements
- NFR-11: The content foler must foloow this structure:
```
content/
└── mdblog/
    ├── en/
    └── ja/
```

- NFR-12: The foler tree must directly map to the sidebar structure.

---

## Environment Requirements
### Development
- Node.js (LTS)
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Playwright

### Production
- Deployed server or platform (e.g., Vercel, VPS)
- GitHub Actions pipeline for CI/CD
- Folder structure included during build

---

## Out-of-Scope
- No WYSIWYG editor
- No user-generated content
- No database
- No authentication or login
- No API to edit/delete Markdown files
- No write access from the browser

---

## Success Criteria
The project is considered successful if:
1. Markdown edited in VSCode -> Publish to GitHub -> Automatically deployed.
2. Sidebar accurately reflects folder structure.
3. Markdown renders correctly with all GitHub-flavored features.
4. The site is stable, secure, and responsive.
5. The creator can fully manage content without touching code.
