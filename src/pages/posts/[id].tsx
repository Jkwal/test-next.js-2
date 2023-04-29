import Image from "next/image";
import {useRouter} from "next/router";

import {getAllPosts, getOnePost, Post} from "@/services/post";
import Head from "next/head";

interface PropsType {
    post: Post,
}

export default function PostPage({post}: PropsType) {

    const {id, body, title} = post

    const {query, back} = useRouter()

    const goBack = () => {
        back()
    }

    return (
        <section>
            <Head>
                <title>{title}</title>
            </Head>
            <div>Id: {query.id}</div>
            <div>
                <div>Title:{title}</div>
                <div>Body:{body}</div>
                <div>id from post:{id}</div>
                <Image
                    src={`https://source.unsplash.com/random/200x200?sig=${query.id}`}
                    alt='Random image'
                    width={150}
                    height={150}
                    quality={1}
                />
            </div>
            <button onClick={goBack}>Go Back</button>
        </section>
    )
}

export async function getStaticProps(context: any) {
    const post = await getOnePost(context.params.id)

    return {
        props: {
            post
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    const posts = await getAllPosts()

    return {
        paths: posts.map(({id}) => ({params: {id: id.toString()}})),
        fallback: false,
    }
}