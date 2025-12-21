import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Mermaid from "./Mermaid";

const schema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), "iframe"],
    attributes: {
        ...(defaultSchema.attributes || {}),
        iframe: [
            "src",
            "width",
            "height",
            // "allow",
            "allowfullscreen",
            "frameborder",
            "title",
            "referrerpolicy",
            "loading",
        ],
    },
    protocols: {
        ...(defaultSchema.protocols || {}),
        src: ["https"],
    },
    clobberPrefix: "",
    allowComments: false,
};

// small helper: true if className contains language-mermaid token
function isMermaidClass(className?: string | null) {
    if (!className) return false;
    // matches "language-mermaid" even if other token (hljs, etc.) exist
    return /\blanguage-mermaid\b/.test(className);
}

function isSafeYouTube(src?: string) {
    return (
        typeof src === "string" &&
        (src.startsWith("https://www.youtube.com/embed/") ||
            src.startsWith("https://www.youtube-nocookie.com/embed/"))
    );
}

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <article className="prose lg:prose-xl max-w-2xl w-full">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    [rehypeRaw],
                    [rehypeSanitize, schema],
                    [rehypeHighlight],
                ]}
                components={{
                    // Mermaid block detection:
                    iframe({ src, ...props }) {
                        if (!isSafeYouTube(src)) return null;

                        return (
                            <div className="w-full aspect-video">
                                <iframe
                                    {...props}
                                    src={src}
                                    loading="lazy"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        );
                    },
                    pre({ node, className, children, ...props }) {
                        // children usually: [<code className="..." {...}>code text</code>]
                        const child = Array.isArray(children) ? children[0] : children;
                        const childClass = child?.props?.className ?? null;
                        if (isMermaidClass(childClass)) {
                            // Extract code text reliably
                            const codeChildren = child?.props?.children ?? "";
                            const codeText = Array.isArray(codeChildren) ? codeChildren.join("") : String(codeChildren);
                            return <Mermaid chart={codeText} />;
                        }
                        return (
                            <pre className={className} {...props}>{children}</pre>
                        )
                    },

                    // handle <code> that might be rendered without a <pre> wrapper
                    code({ node, className, children, ...props }) {
                        if (isMermaidClass(className)) {
                            // children can be an array of strings/nodes
                            const codeText = String(children).trim();
                            return <Mermaid chart={codeText} />;
                        }

                        // normal inline or code block fallback
                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },

                    // Url auto open in new tab
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
