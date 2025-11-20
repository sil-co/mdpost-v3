"use client";

import { useEffect, useRef, useState } from "react";
import { FolderNode } from "@/lib/getFolderTree";
import { ChevronRight, ChevronDown, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
    tree: FolderNode;
    basePath: string;
    title: string;
}

export default function Sidebar({ tree, basePath, title }: SidebarProps) {
    const pathname = usePathname();

    const findFirstMarkdown = (node: FolderNode): string | null => {
        if (node.name.endsWith(".md")) return node.path;
        if (node.children) {
            for (const child of node.children) {
                const found = findFirstMarkdown(child);
                if (found) return found;
            }
        }
        return null;
    }

    return (
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto h-full">
            <h1 className="text-2xl mb-2 font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                {title}
            </h1>
            {tree.children?.map((child) => (
                <FolderList
                    key={child.path}
                    node={child}
                    basePath={basePath}
                    pathname={pathname}
                />
            ))}
        </div>
    );
}

const folderContainsPath = (node: FolderNode, pathname: string, basePath: string): boolean => {
    const normalizedPathname = decodeURI(pathname).replace(/\/$/, "");
    if (node.name.endsWith(".md")) {
        const slugPath = node.path.replace(/\.md$/, "");
        const normalizedPath = slugPath.replace(/\\/g, "/");
        const encodedPath = encodeURI(normalizedPath);
        const href = `${basePath}/${encodedPath}`;
        const normalizedHref = decodeURI(href).replace(/\/$/, "");
        return normalizedHref === normalizedPathname;
    }
    if (node.children) {
        return node.children.some(child =>
            folderContainsPath(child, pathname, basePath)
        );
    }
    return false;
};

function FolderList({
    node,
    basePath,
    pathname
}: {
    node: FolderNode;
    basePath: string;
    pathname: string;
}) {
    const shouldBeOpen = folderContainsPath(node, pathname, basePath);
    const [open, setOpen] = useState(shouldBeOpen);
    const isMarkdown = node.name.endsWith(".md");
    const hasChildren = node.children && node.children.length > 0;

    if (isMarkdown) {
        const slugPath = node.path.replace(/\.md$/, "");
        const normalizedPath = slugPath.replace(/\\/g, "/");
        const encodedPath = encodeURI(normalizedPath);
        const href = `${basePath}/${encodedPath}`;
        const normalizedPathname = decodeURI(pathname).replace(/\/$/, "");
        const normalizedHref = decodeURI(href).replace(/\/$/, "");
        const isActive = normalizedPathname === normalizedHref;

        const activeRef = useRef<HTMLAnchorElement | null>(null);
        useEffect(() => {
            if (isActive && activeRef.current) {
                activeRef.current.scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                });
            }
        }, [isActive]);

        return (
            <Link
                ref={activeRef}
                href={href}
                className={`flex items-center gap-2 py-1 text-sm rounded-md w-full text-left ${isActive
                    ? "bg-amber-200 text-blue-700 font-medium"
                    : "text-blue-600 hover:underline cursor-pointer"
                    }`}
            >
                <FileText size={14} className="min-w-[14]" />
                {node.name.replace(".md", "")}
            </Link>
        );
    }

    return (
        <div className="select-none">
            <div
                className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100`}
                onClick={() => setOpen(!open)}
            >
                <span className="font-medium text-gray-700">{node.name}</span>
                {hasChildren && (
                    <>
                        {open ? (
                            <ChevronDown size={14} className="text-gray-600" />
                        ) : (
                            <ChevronRight size={14} className="text-gray-600" />
                        )}
                    </>
                )}

            </div>

            {hasChildren && open && (
                <ul className="ml-2 mt-1 border-l border-gray-200 pl-2 space-y-1">
                    {node.children!.map((child) => (
                        <li key={child.path}>
                            <FolderList
                                node={child}
                                basePath={basePath}
                                pathname={pathname}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
