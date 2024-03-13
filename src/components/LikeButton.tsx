import React, { FC, useCallback, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assuming you're using Expo Icons
import useAnimatedButton from '../custom_hooks/useAnimatedButton';
import { Cover } from '../Types';
import { primaryAccent } from '../colors';

const LikeButton: FC<{ cover: Cover, isPressed: boolean }> = ({ cover, isPressed }) => {
    const { AnimatedButton, pressed } = useAnimatedButton(isPressed)

    const handleToggle = useCallback(() => {
        if (pressed) {
            // in pressed state, so perform action for unpressed
            console.log("un-pressed");
        } else {
            // in un-pressed state, so perform action for pressed
            console.log("pressed");
        }
    }, [pressed])

    return (
        <AnimatedButton
            onPress={handleToggle}
            Child={() => {
                return <Ionicons name={pressed ? 'heart' : 'heart-outline'} size={25} color={pressed ? 'red' : primaryAccent} />
            }} />
    );
};

export default LikeButton;
