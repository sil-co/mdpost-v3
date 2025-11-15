
import { FolderNode, getFolderTree } from "@/lib/getFolderTree";
import { redirect } from "next/navigation";
import path from "path";

export default async function Page({ params }: { params: Promise<{ which: string; }>}) {
    const { which } = await params;

    const tree = getFolderTree(path.join(process.cwd(), `/content/mdblog/en/${which}`));
    if (!tree) return null;

    function findFirstMd(node: FolderNode): string | null {
        if (node.name.endsWith(".md")) return node.path.replace(/\.md$/, "");
        if (node.children) {
            for (const c of node.children) {
                const f = findFirstMd(c);
                if (f) return f;
            }
        }
        return null;
    }
    const firstMd = findFirstMd(tree);
    if (firstMd) redirect(`/${which}/${firstMd}`);
    return null;
}
