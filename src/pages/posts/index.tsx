import React, {useState} from "react";

import {getAllPosts, Post} from "@/./services/post";
import Link from "next/link";
import Head from "next/head";


interface PropsType {
    posts: Post[]
}


export default function Main({posts}: PropsType) {

    const [filterData, setFilterData] = useState<string>('')

    const changeFilterData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterData(event.target.value)
    }

    return (
        <section>
            <Head>
                <title>All posts</title>
            </Head>
            <h1>Posts</h1>
            <input placeholder='search' value={filterData} onChange={changeFilterData}/>
            <div>
                {
                    posts
                        .filter(({title}) => title.includes(filterData))
                        .map(({id, title}) => (
                            <Link href={`posts/${id}`}>
                                <div key={id}>{title}</div>
                            </Link>
                        ))
                }
            </div>
        </section>
    )
}

export async function getServerSideProps() {
    const posts = await getAllPosts()
    return {
        props: {
            posts
        }
    }
}
