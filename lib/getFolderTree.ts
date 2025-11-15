import path from "path";
import fs from "fs";

export interface FolderNode {
    name: string;
    path: string;
    children?: FolderNode[];
}

/**
 * Recursively gets a folder tree including only markdown files (.md).
 * Skips .git and other non-markdown folders.
 */
export function getFolderTree(dirPath: string, basePath = dirPath): FolderNode | null {
    const name = path.basename(dirPath);
    if (name.startsWith(".git") || name.startsWith(".")) return null;
    const node: FolderNode = {
        name,
        path: path.relative(basePath, dirPath)
    };
    const entries: fs.Dirent[] = fs.readdirSync(dirPath, { withFileTypes: true });
    const folders = entries.filter(e => e.isDirectory());
    const mdFiles = entries.filter(e => e.isFile() && e.name.endsWith(".md"));
    const children: FolderNode[] = [];
    for (const file of mdFiles) {
        children.push({
            name: file.name,
            path: path.relative(basePath, path.join(dirPath, file.name))
        });
    }
    for (const folder of folders) {
        const child = getFolderTree(path.join(dirPath, folder.name), basePath);
        if (child) children.push(child);
    }

    if (children.length === 0) return node;
    node.children = children;
    return node;
}

