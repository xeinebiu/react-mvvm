import React, { FC } from 'react';
import { useViewModel } from '@xeinebiu/react-mvvm';
import { ViewModelsType } from '../../vm';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
export const MvvmPostsPage: FC = () => {
    const { postsViewModel } = useViewModel<ViewModelsType>();

    return (
        <Flex direction="column">
            <Heading>Posts with View Model</Heading>
            {postsViewModel.loading ? (
                <Box>
                    Loading content on View Model. Navigating to another page
                    will not forget the data and coming back will use the data
                    from first request
                    <Spinner />
                </Box>
            ) : (
                <Flex direction="column">
                    {postsViewModel.addPostLoading ? (
                        <Flex>
                            <Text>Adding another post ...</Text>
                            <Spinner />
                        </Flex>
                    ) : null}
                    <ul>
                        {postsViewModel.posts.map(post => (
                            <li key={post}>{post}</li>
                        ))}
                    </ul>
                </Flex>
            )}
        </Flex>
    );
};
