// app/blog/[slug]/page.tsx

import {readFile} from "node:fs/promises";
import {marked} from "marked";

export default async function BlogPage({
                                           params,
                                           searchParams,
                                       }: {
    params: { slug: string } // 接收url参数: (/blog/[slug] -> slug)
    searchParams: {}
}) {
    const text = await readFile(`./contents/${params.slug}.md`, 'utf8')
    const html = marked(text)

    return (
        // flex flex-row justify-center -> 内容居中
        <div className={'w-screen flex flex-row justify-center'}>
            {/* prose让文本中的标题有对应的样式 */}
            <div className={'prose'} dangerouslySetInnerHTML={{__html: html}}></div>
        </div>
    )
}