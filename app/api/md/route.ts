import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const relPath = decodeURIComponent(searchParams.get("path") || "");
    if (!relPath) {
        return NextResponse.json({ error: "Missing path" }, { status: 400 });
    }
    if (relPath.includes("\0")) {
        return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const basePath = path.join(process.cwd(), "content", "mdblog");
    const resolvePath = path.resolve(basePath, relPath);
    if (!resolvePath.startsWith(basePath)) {
        return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    }
    if (!resolvePath.endsWith(".md")) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 403 });
    }

    const fullPath = resolvePath;
    if (!fs.existsSync(fullPath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ content });
}
