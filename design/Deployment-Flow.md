# Markdown File Viewer - Deployment Flow
## Overview
There are two GitHub repositories:
1. `mdblog`
    - Stores Markdown files under `/content/mdblog/**`
    - Uses GitHub Webhook -> Notifies server when Markdown files change.
2. `MarkdownViewer` (mdpost-pub) (Next.js + Playwright)
    - Reads Markdown files and displays them as blog pages.
    - Uses GitHub Actions for automatic build -> test -> deploy.

---

## Deployment Flow 
```mermaid
flowchart TD
    %% Repositories
    A1[Developer edits Markdown files in local PC] --> A2[Push to GitHub: mdblog repo]

    %% mdblog Webhook pipeline
    A2 --> W1[GitHub Webhook triggers POST request to Ubuntu server]
    W1 --> W2[Server pulls latest mdblog content via git pull]
    W2 --> W3[Updated Markdown files stored in /content/mdblog/**]

    %% Viewer Repo
    B1[Developer edits Next.js project code locally] --> B2[Push to GitHub: mdpost-pub repo]

    %% GitHub Actions pipeline
    B2 --> C1[GitHub Actions start]
    C1 --> C2[Install dependencies]
    C2 --> C3[Run Playwright tests]
    C3 --> C4[Build Next.js app]
    C4 --> C5[Deploy to Ubuntu server via SSH or rsync]

    %% Viewer reads Markdown
    W3 --> V1[MarkdownViewer reads Markdown from /content/mdblog/**]
    C5 --> V1

    %% Final page
    V1 --> U1[User visits website and sees updated blog]
```

---

## Explanation
### mdblog Repository Flow
- Push `.md` files -> GitHub
- GitHub **webhook** sends a request to Ubuntu server
- Server runs `git pull` -> updates Markdown content
- Next.js app reads these files automatically

### MarkdownViewer Repository Flow
- Push Next.js code to GitHub
- GitHub Actions:
    1. Install dependencies
    2. Run Playwright tests
    3. Build Next.js
    4. Deploy to Ubuntu server
