import React, { FC } from 'react';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useGlobalViewModel } from '../../vm';
export const MvvmPostsPage: FC = () => {
    const { posts } = useGlobalViewModel();

    return (
        <Flex direction="column">
            <Heading>Posts with View Model</Heading>
            {posts.loading ? (
                <Box>
                    Loading content on View Model. Navigating to another page
                    will not forget the data and coming back will use the data
                    from first request
                    <Spinner />
                </Box>
            ) : (
                <Flex direction="column">
                    {posts.addPostLoading ? (
                        <Flex>
                            <Text>Adding another post ...</Text>
                            <Spinner />
                        </Flex>
                    ) : null}
                    <ul>
                        {posts.posts.map(post => (
                            <li key={post}>{post}</li>
                        ))}
                    </ul>
                </Flex>
            )}
        </Flex>
    );
};
