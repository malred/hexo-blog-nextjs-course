// app/blog/[slug]/page.tsx

export default function BlogPage() {
    return (
        <div>
            {/*生成随机数*/}
            blog {Math.round(Math.random() * 10)}
        </div>
    )
}