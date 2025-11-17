"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

export default function Mermaid({ chart }: { chart: string; }) {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<string>("");

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            suppressErrorRendering: true, // prevent rendering error SVG
        });

        // Renders SVG from Mermaid
        // Uses unique IDs so diagrams don't collide
        async function render() {
            if (!containerRef.current) return;

            try {
                const { svg } = await mermaid.render(
                    `mermaid-${Math.random().toString(36).slice(2)}`,
                    chart
                );
                svgRef.current = svg;
                containerRef.current.innerHTML = svg;
            } catch (err) {
                containerRef.current.innerHTML = `<pre>${err}</pre>`;
            }
        }
        render();
    }, [chart]);

    // Opens SVG in new browser tab
    function openInNewTab() {
        const svg = svgRef.current;
        if (!svg) return;
        const newWindow = window.open("", "_blank");
        if (newWindow) {
            newWindow.document.write(`
                <html>
                <head>
                    <title>Mermaid Diagram</title>
                    <style>
                        body { margin: 0; padding: 20px; }
                        svg { width: 100%; height: auto; }
                    </style>
                </head>
                <body>
                    ${svg}
                </body>
                </html>
            `);
        }
    }

    return (
        <div className="flex flex-col items-end">
            <button
                onClick={openInNewTab}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 shadow-sm transition"
            >
                Open in new tab
            </button>
            <div ref={containerRef} className="w-full" />
        </div>
    );
}
