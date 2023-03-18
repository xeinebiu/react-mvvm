import { delay } from '../util';

const posts = ['Post 1', 'Post 2', 'Post 3'];

export async function loadPosts(): Promise<string[]> {
    // simulate data loading
    await delay(5000);
    return posts;
}

export async function addPost(name: string): Promise<void> {
    // simulate data loading
    await delay(5000);
    posts.unshift(name);
}
