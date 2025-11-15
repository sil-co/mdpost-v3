"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

export default function Mermaid({ chart }: { chart: string; }) {
    const ref = useRef<HTMLDivElement>(null);

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
            if (ref.current) {
                try {
                    const { svg } = await mermaid.render(
                        `mermaid-${Math.random().toString(36).slice(2)}`,
                        chart
                    );
                    ref.current.innerHTML = svg;
                } catch (err) {
                    ref.current.innerHTML = `<pre>${err}</pre>`;
                }
            }
        }
        render();
    }, [chart]);

    return <div ref={ref} />;
}