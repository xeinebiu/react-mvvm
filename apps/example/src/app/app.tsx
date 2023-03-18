import { Link, Route, Routes } from 'react-router-dom';
import { HomePage, MvvmCreatePostPage, MvvmPostsPage, PostsPage } from './page';
import { MvvmProvider, useMvvm } from '@xeinebiu/react-mvvm';
import { HomeViewModelImpl, PostsViewModelImpl, ViewModelsType } from './vm';
import {
    Box,
    ChakraProvider,
    extendTheme,
    Flex,
    Heading,
    Spacer,
} from '@chakra-ui/react';
import React from 'react';

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

export function App() {
    const viewModels = useMvvm<ViewModelsType>({
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
            </MvvmProvider>
        </ChakraProvider>
    );
}

export default App;
