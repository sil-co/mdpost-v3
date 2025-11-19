"use client";

import Sidebar from "@/components/Sidebar";
import { useLanguage } from "@/context/LanguageContext";
import { FolderNode } from "@/lib/getFolderTree";
import { use, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Layout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ which: string; }>
}>) {
    const { which } = use(params);
    const pathname = usePathname();
    const [folderTree, setFolderTree] = useState<FolderNode | null>(null);
    const { language, setLanguage } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const langDir = language === "en" ? "en" : "ja";
        fetch(`/api/mdblog?path=${langDir}/${which}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                return setFolderTree(data);
            })
            .catch((err) => console.error("Failed to load folder tree", err));
    }, [language]);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex min-h-screen w-full relative">
            {/* Sidebar (hidden on mobile, side-in when open) */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out overflow-x-hidden
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 overflow-y-auto`}>
                {which !== "tech" &&
                    <div className="flex gap-2 p-2">
                        <button
                            className={`px-3 py-1 rounded ${language === "en"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                }`}
                            onClick={() => setLanguage("en")}
                        >
                            English
                        </button>
                        <button
                            className={`px-3 py-1 rounded ${language === "ja"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                }`}
                            onClick={() => setLanguage("ja")}
                        >
                            Japanese
                        </button>

                    </div>
                }
                {folderTree &&
                    <Sidebar
                        tree={folderTree}
                        basePath={`/${which}`}
                    />
                }
            </aside>
            {/* Overlay (for mobile when sidebar is open) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 w-full flex flex-col overflow-y-auto ml-0 md:ml-64">
                {/* Top bar for mobile */}
                <div className="md:hidden fixed w-full flex items-center justify-between p-3 border-b border-gray-200 bg-white top-0 z-20">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        {isSidebarOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                    <h1 className="font-semibold text-lg">
                        {which === "tech" ? "Tech Blog" : "My Portfolio"}
                    </h1>
                </div>
                {/* Page content */}
                <main className="flex-1 overflow-y-auto md:mt-0 mt-12">{children}</main>
            </div>
        </div>
    );
}