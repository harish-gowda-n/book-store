import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    ListRenderItem,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { primaryAccent, primaryBg, secondaryBg } from '../colors';
import { Montserrat_Bold } from '../font-exporter';
import { useCovers } from '../context/useCoversContext';
import { Cover } from '../Types';
import SearchBar from '../components/SearchBar';
import { useIsFocused} from '@react-navigation/native';
import CoverItem from '../components/renderCoverItem';

const HomeScreen: FC = () => {

    const { covers, isFetchingRemote, refreshRemoteData } = useCovers()
    const [searchKey, setSearchKey] = useState("")
    const [queriedCovers, setQueriedCovers] = useState<Cover[]>([])

    useEffect(() => {
        if (!isFetchingRemote) {
            if (covers.length == 0) {
                //list empty after fetching from remote, so show an error
                handleDataFetchError()
            }
        }
    }, [isFetchingRemote])

    useEffect(() => {
        if (searchKey.length > 0) {
            let qCovers = covers.filter((cover) => cover.title.toLocaleLowerCase().includes(searchKey.toLowerCase()))
            setQueriedCovers(qCovers)
        } else {
            setQueriedCovers(covers)
        }
    }, [searchKey, covers])

    const handleDataFetchError = useCallback(() => {
        Alert.alert("Failed to load data",
            "Please click on refresh or try again later...",
            [{
                text: 'Retry',
                onPress: () => refreshRemoteData(),
                style: 'cancel',
            }])
    }, [])

    const renderCoverItem: ListRenderItem<Cover> = useCallback(({ item }) => {
        return <CoverItem item={item} shouldShowActionButtons />
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={primaryBg}
            />
            <View style={styles.header}>
                <Text style={{ marginStart: 10, color: primaryAccent, fontSize: 24, fontFamily: Montserrat_Bold }}>
                    Book Store
                </Text>
                <View style={{
                    width: '100%', position: 'absolute', alignItems: 'flex-end', justifyContent: 'center',
                }}>
                    <SearchBar searchKey={searchKey} setSearchKey={setSearchKey} />
                </View>
            </View>
            {/* This is to ensure that the flatlist re renders when the favourites list updates */}
            {useIsFocused() &&
                <FlatList style={{ flex: 1, marginHorizontal: 5, marginVertical: 5 }} data={queriedCovers}
                    renderItem={renderCoverItem} numColumns={1}
                    refreshControl={<RefreshControl refreshing={isFetchingRemote} onRefresh={refreshRemoteData} />} />}
        </SafeAreaView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: secondaryBg,
        flexDirection: 'column'
    },
    header: {
        height: 50,
        backgroundColor: primaryBg,
        elevation: 10,
        zIndex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
});