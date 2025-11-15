import { Metadata } from "next";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ which: string; }>;
}

export async function generateMetadata({ params }: { params: Promise<{ which: string }>}): Promise<Metadata> {
    const { which } = await params;

    // Change metadata dynamically based on "which"
    switch (which) {
        case "":
        case "tech":
            return {
                title: "Tech Blog",
                description: "Read my blog posts and tech notes.",
            };
        default:
            return {
                title: "Portfolio",
                description: "My Portfolio",
            };
    }
}

export default function WhichLayout({ children }: LayoutProps) {
    return (
        <div className="flex w-full">{children}</div>
    );
}
