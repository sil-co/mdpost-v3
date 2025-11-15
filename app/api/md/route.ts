import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    // const relPath = searchParams.get("path");
    const relPath = decodeURIComponent(searchParams.get("path") || "");
    if (!relPath) return NextResponse.json({ error: "Missing path" }, { status: 400 });
     const basePath = path.join(process.cwd(), "content", "mdblog");
    const fullPath = path.join(basePath, relPath);
    if (!fs.existsSync(fullPath)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const content = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ content });
}
