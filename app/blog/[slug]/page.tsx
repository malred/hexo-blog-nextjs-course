// app/blog/[slug]/page.tsx

// 服务端组件可以使用async
export default async function BlogPage({
                                           params,
                                           searchParams,
                                       }: {
    params: { slug: string } // 接收url参数: (/blog/[slug] -> slug)
    searchParams: {}
}) {
    // 请求后端数据
    let res = await fetch(`http://localhost:3000/api/blogs/${params.slug}`, {
        method: "GET"
    })
    let json = await res.json()
    let html
    if (json.error)
        html = "Ooh! Something went wrong"
    else
        html = json.html

    return (
        // flex flex-row justify-center -> 内容居中
        <div className={'w-screen flex flex-row justify-center'}>
            {/*
                prose让文本中的标题有对应的样式
                dark:prose-invert是让prose适配黑暗主题
             */}
            <div className={`prose dark:prose-invert`}
                 dangerouslySetInnerHTML={{__html: html}}>
            </div>
        </div>
    )
}