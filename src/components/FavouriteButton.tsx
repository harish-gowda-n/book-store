import React, { FC, useCallback, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assuming you're using Expo Icons
import useAnimatedButton from '../custom_hooks/useAnimatedButton';
import { Cover } from '../Types';
import { primaryAccent } from '../colors';
import { deleteFavourite, fetchFavourites, storeFavouriteCover } from '../Asyncstore';
import { useCovers } from '../context/useCoversContext';

const FavouriteButton: FC<{ cover: Cover, isPressed: boolean }> = ({ cover, isPressed }) => {
    const { AnimatedButton, pressed } = useAnimatedButton(isPressed)
    const { setFavouriteCovers } = useCovers()

    const handleToggle = useCallback(async () => {
        if (pressed) {
            // in pressed state, so perform action for unmarked as favourite
            await deleteFavourite(cover)
        } else {
            // in un-pressed state, so perform action for marked as favourite
            await storeFavouriteCover(cover)
        }
        setFavouriteCovers(await fetchFavourites())
    }, [pressed])

    return (
        <AnimatedButton
            onPress={handleToggle}
            Child={() => {
                return <Ionicons name={pressed ? 'star' : 'star-outline'} size={25} color={primaryAccent} />
            }} />
    );
};

export default FavouriteButton;
