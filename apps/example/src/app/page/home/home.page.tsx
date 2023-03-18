import React, { FC } from 'react';
import { useViewModel } from '@xeinebiu/react-mvvm';
import { ViewModelsType } from '../../vm';
import { Flex, Spinner, Text } from '@chakra-ui/react';

export const HomePage: FC = () => {
    const { homeViewModel } = useViewModel<ViewModelsType>();

    return (
        <Flex justifyContent="center" alignContent="center">
            {homeViewModel.loading ? (
                <Spinner />
            ) : (
                <Text whiteSpace="pre-line">
                    {homeViewModel.viewModelDescription}
                </Text>
            )}
        </Flex>
    );
};
