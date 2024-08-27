// api/blogs/route.ts

import {NextRequest, NextResponse} from "next/server";
import {readFile} from "node:fs/promises";
import {marked} from "marked";

// 接收GET请求
export async function GET(req: NextRequest) {
    // 解析url
    let slug = req.url.slice(
        req.url.lastIndexOf('/') + 1,
        req.url.length
    )

    let html
    try {
        // 读取md文件
        const text = await readFile(`./contents/${slug}.md`, 'utf8')
        html = marked(text)
    } catch (err) {
        console.error(err)
        // 错误返回
        return NextResponse.json({error: err})
    }

    // 返回html内容
    return NextResponse.json({html})
}

// 接收POST请求
export async function POST(req: NextRequest) {
    return NextResponse.json({})
}