import {API_URL} from "./index";

export interface Post {
    useId: number,
    id: number,
    title: string,
    body: string,
}

export async function getAllPosts(): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts`)
    return  await response.json()
}

export async function getOnePost(id: number): Promise<Post> {
    const response = await fetch(`${API_URL}/posts/${id}`)
    return  await response.json()
}