import React, { FC } from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useGlobalViewModel } from '../../vm';

export const HomePage: FC = () => {
    const { home } = useGlobalViewModel();

    return (
        <Flex justifyContent="center" alignContent="center">
            {home.loading ? (
                <Spinner />
            ) : (
                <Text whiteSpace="pre-line">{home.viewModelDescription}</Text>
            )}
        </Flex>
    );
};
