import { useEffect, useState } from 'react';
import { Post } from './post.type';

export function usePostsLoader() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(setPosts)
            .then(() => setIsLoading(false));
    }, []);

    return { posts, isLoading };
}
