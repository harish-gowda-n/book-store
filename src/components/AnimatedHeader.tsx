import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Animated, StyleSheet } from 'react-native';

const AnimatedHeader = () => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {

        return () => {
            scrollY.removeAllListeners();
        };
    }, []);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
    );

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [0, -100],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={{ flex: 1 }}>
            <Animated.View
                style={[
                    styles.header,
                    { transform: [{ translateY: headerTranslateY }], opacity: headerOpacity },
                ]}
            >
                <Text style={styles.title}>My App Title</Text>
            </Animated.View>
            <ScrollView
                style={{ flex: 1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ height: 200, backgroundColor: '#ccc' }} />
                <View style={styles.content}>
                    {Array.from({ length: 50 }, (_, index) => (
                        <Text key={index} style={styles.item}>
                            Item {index}
                        </Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 100,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        elevation: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    item: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#cccccc',
    },
});

export default AnimatedHeader;
