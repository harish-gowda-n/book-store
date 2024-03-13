import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryAccent, primaryBg } from '../colors';
import { Montserrat_Medium } from '../font-exporter';
import { useNavigation } from '@react-navigation/native';

type Props = {
    searchKey: string;
    setSearchKey: Dispatch<SetStateAction<string>>
}
const SearchBar: FC<Props> = ({ searchKey, setSearchKey, }) => {

    const [isSearchBarVis, setIsSearchBarVis] = useState(false)
    const animation = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return { width: animation.value == 1 ? withTiming('100%', { duration: 300 }) : withTiming(0, { duration: 300 }) }
    })
    const searchInputRef = useRef<TextInput>(null)
    const navigation = useNavigation()

    const navigateToFavourites = useCallback(() => {
        navigation.navigate("Favs")
    }, [])

    useEffect(() => {
        if (!isSearchBarVis) {
            setSearchKey("")
        }
    }, [isSearchBarVis])

    return <View style={{
        alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row',
        backgroundColor: isSearchBarVis ? primaryAccent : primaryBg, paddingEnd: 10
    }}>
        <Animated.View style={[{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderRadius: 10
        }, animatedStyle,]}>
            {isSearchBarVis && <TextInput ref={searchInputRef} value={searchKey} onChangeText={setSearchKey}
                style={{ width: '60%', borderRadius: 10, fontFamily: Montserrat_Medium, color: primaryBg }}
                placeholder='Search book title...' placeholderTextColor={primaryBg} />}

        </Animated.View>
        {
            !isSearchBarVis && <TouchableOpacity style={{ marginEnd: 20 }} onPress={navigateToFavourites}>
                <Ionicons name={'star'} size={25} color={'gold'} />
            </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => {
            animation.value = animation.value == 1 ? 0 : 1
            setIsSearchBarVis(animation.value == 0)
            if (animation.value == 0) searchInputRef.current?.focus()
        }}>
            <Ionicons name={isSearchBarVis ? 'close' : 'search'} size={25} color={isSearchBarVis ? primaryBg : primaryAccent} />
        </TouchableOpacity>
    </View>
}

export default SearchBar;