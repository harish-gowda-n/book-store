import React, { FC, useEffect, useState } from 'react';
import { TouchableOpacity, Animated, Easing } from 'react-native';

const AnimatedButton: FC<{ VectorComponent: FC, onPress: (pressed: boolean) => void }> = ({ VectorComponent, onPress }) => {
    const [pressed, setPressed] = useState(false);
    const [animation] = useState(new Animated.Value(1));

    const handlePress = () => {
        setPressed(!pressed);
        Animated.sequence([
            Animated.timing(animation, {
                toValue: 1.2,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animation, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animatedStyle = {
        transform: [{ scale: animation }],
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Animated.View style={[{ padding: 10 }, animatedStyle]}>
                <VectorComponent />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default AnimatedButton;
