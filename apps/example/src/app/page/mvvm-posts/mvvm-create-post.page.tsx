import React, { FC } from 'react';
import {
    Box,
    Flex,
    Heading,
    Button,
    Input,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { useGlobalViewModel } from '../../vm';

export const MvvmCreatePostPage: FC = () => {
    const { posts } = useGlobalViewModel();

    return (
        <Flex direction="column">
            <Heading>Create a Post with View Model</Heading>
            {posts.addPostLoading ? (
                <Box>
                    Creating ...
                    <Spinner />
                </Box>
            ) : (
                <Flex direction="column" gap="16px">
                    <Text>
                        Navigating to another page and coming back, should
                        remember the input value
                    </Text>
                    <Input
                        variant="flushed"
                        placeholder="Name of the post"
                        value={posts.createPostName}
                        onChange={e =>
                            posts.setCreatePostName(e.target.value as string)
                        }
                    />
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={posts.addPost}>
                        Create
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};
