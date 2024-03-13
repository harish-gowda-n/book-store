import { FC, useCallback, useState } from 'react';
import { TouchableOpacity, } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const useAnimatedButton = (initialPressed = false) => {
    const [pressed, setPressed] = useState(initialPressed);

    const handlePress = useCallback(() => {
        setPressed(!pressed);
    }, [pressed]);

    const clicked = useSharedValue(false);

    const tap = Gesture.Tap()
        .onBegin(() => {
            clicked.value = true;
        })
        .onFinalize(() => {
            clicked.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(clicked.value ? 1.5 : 1) }],
    }));

    const AnimatedButton: FC<{ Child: FC, onPress: () => void }> = ({ Child, onPress }) => {
        return <TouchableOpacity onPress={() => { onPress(); handlePress() }}>
            <GestureDetector gesture={tap}>
                <Animated.View style={[{ padding: 5 }, animatedStyles]}>
                    <Child />
                </Animated.View>
            </GestureDetector>
        </TouchableOpacity>
    }

    return { pressed, handlePress, AnimatedButton };
};

export default useAnimatedButton;
