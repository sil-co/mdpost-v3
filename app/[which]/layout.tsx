import { Metadata } from "next";
import { formatTitle } from "@/lib/formatTitle";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ which: string; }>;
}

export async function generateMetadata({ params }: { params: Promise<{ which: string }>}): Promise<Metadata> {
    const { which } = await params;

    if (which[0].toLocaleLowerCase() === "p") {
        return {
            title: "My Portfolio",
            description: "My Portfolio",
        }
    } else {
        return {
            title: formatTitle(which),
            description: "Enjoy my markdown posts!!"
        }
    }
}

export default function WhichLayout({ children }: LayoutProps) {
    return (
        <div className="flex w-full">{children}</div>
    );
}
