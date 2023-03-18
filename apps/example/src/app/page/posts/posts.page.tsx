import React, { FC, useEffect, useState } from 'react';
import { loadPosts } from '../../data';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';

export const PostsPage: FC = () => {
    const [posts, setPosts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(function load() {
        loadPosts()
            .then(setPosts)
            .then(() => setLoading(false));
    }, []);

    return (
        <Flex direction="column">
            <Heading>Posts</Heading>
            {loading ? (
                <Box>
                    Loading content without View Model. Navigating to another
                    page should forget the data and coming back will start
                    loading from again.
                    <Spinner />
                </Box>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post}>{post}</li>
                    ))}
                </ul>
            )}
        </Flex>
    );
};
