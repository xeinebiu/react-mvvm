import { Link, Route, Routes } from 'react-router-dom';
import { MvvmProvider, useMvvm } from '@xeinebiu/react-mvvm';
import {
    Box,
    Button,
    ChakraProvider,
    extendTheme,
    Flex,
    Heading,
    HStack,
    Spacer,
    Stack,
} from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            500: '#2C3333',
        },
        onBrand: {
            500: '#CBE4DE',
        },
        primaryTextColor: {
            500: '#2C3333',
        },
    },
});

export function GlobalMvvmExample() {
    const viewModels = useMvvm({
        posts: PostsViewModelImpl(),
        home: HomeViewModelImpl(),
    });

    return (
        <ChakraProvider theme={theme}>
            <MvvmProvider viewModels={viewModels}>
                <Flex
                    minH="60px"
                    color="onBrand.500"
                    bg="brand.500"
                    alignItems="center"
                    p="8px"
                    gap="16px">
                    <Heading size="md">MVVM Example</Heading>

                    <Spacer />

                    <Link to="/">Home</Link>
                    <Link to="/posts">Posts</Link>
                    <Link to="/posts-mvvm">MVVM Posts</Link>
                    <Link to="/create-post-mvvm">Create MVVM Post</Link>
                </Flex>
                <Box p="8px" color="primaryTextColor.500">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/posts" element={<PostsPage />} />
                        <Route path="/posts-mvvm" element={<MvvmPostsPage />} />
                        <Route
                            path="/create-post-mvvm"
                            element={<MvvmCreatePostPage />}
                        />
                    </Routes>
                </Box>

                <Stack gap={8}>
                    <HStack>
                        {renderA ? <ComponentA /> : null}
                        <Button onClick={() => setRenderA(!renderA)}>
                            Render A {renderA}
                        </Button>
                    </HStack>
                    <HStack>
                        {renderB ? <ComponentB /> : null}
                        <Button onClick={() => setRenderB(!renderB)}>
                            Render B {renderA}
                        </Button>
                    </HStack>
                </Stack>
            </MvvmProvider>
        </ChakraProvider>
    );
}
