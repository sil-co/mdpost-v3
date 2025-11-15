"use client";

import { use } from "react";
import MarkdownViewer from "@/components/MarkdownViewer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";


export default function PostPage({ params }: { params: Promise<{ which: string; slug: string[] }> }) {
    const { which, slug } = use(params);
    const pathname = usePathname();
    const { language } = useLanguage();
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    useEffect(() => {
        async function getMarkdown(slug: string[]) {
            const path = slug.join("/");
            const res = await fetch(`/api/md?path=${encodeURIComponent(`${language}/${which}/${path}`+ ".md")}`, {
                cache: "no-store",
            });
            const data = await res.json();
            setMarkdown(data.content);
        }

        getMarkdown(slug);
    }, [language, pathname, which]);

    return (
        <main className="flex flex-1 p-6 w-full justify-center">
            <MarkdownViewer content={markdown} />
        </main>
    );
}
