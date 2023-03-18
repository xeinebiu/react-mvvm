import { useCallback, useEffect, useState } from 'react';
import { addPost, loadPosts } from '../data';

export type PostsViewModel = {
    posts: string[];

    loading: boolean;

    addPostLoading: boolean;

    createPostName: string;

    setCreatePostName(name: string): void;

    addPost(): void;
};

export function PostsViewModelImpl(): PostsViewModel {
    const [posts, setPosts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [addPostLoading, setAddPostLoading] = useState(false);
    const [createPostName, setCreatePostName] = useState('');

    const _loadPosts = useCallback(() => {
        setLoading(true);

        loadPosts()
            .then(setPosts)
            .then(() => setLoading(false));
    }, []);

    const _addPost = useCallback(() => {
        setAddPostLoading(true);
        addPost(createPostName)
            .then(() => setAddPostLoading(false))
            .then(() => setCreatePostName(''))
            .then(() => _loadPosts());
    }, [_loadPosts, createPostName]);

    useEffect(
        function load() {
            _loadPosts();
        },
        [_loadPosts],
    );

    return {
        posts: posts,
        loading: loading,
        addPostLoading: addPostLoading,
        addPost: _addPost,
        createPostName: createPostName,
        setCreatePostName: setCreatePostName,
    };
}
