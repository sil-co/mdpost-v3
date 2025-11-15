import { getFolderTree } from "@/lib/getFolderTree";
import { NextResponse } from "next/server";
import path from "path";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const subPath = searchParams.get("path") || ""; // eg, "abc"
    const contentPath = path.join(process.cwd(), "content/mdblog", subPath);
    const folderTree = getFolderTree(contentPath);
    if (!folderTree) {
        return NextResponse.json({ error: "Folder not found"}, { status: 404 });
    }
    return NextResponse.json(folderTree);
}
