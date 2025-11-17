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

    function openInNewTab() {
        const svg = svgRef.current;
        if (!svg) return;

        // Inline JS for pan/zoom (small, no external scripts)
        const html = `
      <html>
        <head>
          <title>Mermaid Diagram</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            html, body { margin:0; padding:0; overflow:hidden; height:100%; }
            body { display:flex; justify-content:center; align-items:center; background:#f9f9f9; }
            svg { max-width:100%; max-height:100%; touch-action: pan-x pan-y; }
          </style>
        </head>
        <body>
          <div id="svg-container">${svg}</div>
          <script>
            const svg = document.querySelector('svg');
            let scale = 1;
            let startX, startY, originX=0, originY=0;

            svg.addEventListener('wheel', e => {
              e.preventDefault();
              const delta = e.deltaY < 0 ? 1.1 : 0.9;
              scale *= delta;
              svg.style.transform = \`translate(\${originX}px, \${originY}px) scale(\${scale})\`;
            });

            svg.addEventListener('pointerdown', e => {
              e.preventDefault();
              startX = e.clientX - originX;
              startY = e.clientY - originY;
              svg.setPointerCapture(e.pointerId);
            });

            svg.addEventListener('pointermove', e => {
              if (startX !== undefined) {
                originX = e.clientX - startX;
                originY = e.clientY - startY;
                svg.style.transform = \`translate(\${originX}px, \${originY}px) scale(\${scale})\`;
              }
            });

            svg.addEventListener('pointerup', e => {
              startX = undefined;
              startY = undefined;
            });
          </script>
        </body>
      </html>
    `;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank", "width=800,height=600");
    }

    return (
        <div className="flex flex-col items-end">
            <div ref={containerRef} className="w-full" />
            <button
                onClick={openInNewTab}
                className="mt-2 flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 shadow-sm transition"
            >
                Open in new tab
            </button>
        </div>
    );
}
