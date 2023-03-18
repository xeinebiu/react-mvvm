import React, { FC } from 'react';
import { useViewModel } from '@xeinebiu/react-mvvm';
import { ViewModelsType } from '../../vm';
import {
    Box,
    Flex,
    Heading,
    Button,
    Input,
    Spinner,
    Text,
} from '@chakra-ui/react';
export const MvvmCreatePostPage: FC = () => {
    const { postsViewModel } = useViewModel<ViewModelsType>();

    return (
        <Flex direction="column">
            <Heading>Create a Post with View Model</Heading>
            {postsViewModel.addPostLoading ? (
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
                        value={postsViewModel.createPostName}
                        onChange={e =>
                            postsViewModel.setCreatePostName(
                                e.target.value as string,
                            )
                        }
                    />
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={postsViewModel.addPost}>
                        Create
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};
