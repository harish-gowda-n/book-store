import React, { FC, useCallback } from 'react'
import { Alert, FlatList, ListRenderItem, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { primaryAccent, primaryBg, secondaryBg } from '../colors'
import { Montserrat_Bold, Montserrat_SemiBold } from '../font-exporter'
import { useCovers } from '../context/useCoversContext'
import { Cover } from '../Types'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { deleteFavourite } from '../Asyncstore'
import CoverItem from '../components/renderCoverItem'

const FavouritesScreen: FC = () => {

    const { favouriteCovers, refreshFavouriteCovers } = useCovers()

    const renderFavItem: ListRenderItem<Cover> = useCallback(({ item }) => {
        return (
            <Swipeable
                onSwipeableOpen={async () => {
                    console.log("removing from favourites");
                    await deleteFavourite(item)
                    refreshFavouriteCovers()
                }}
                containerStyle={{ height: 160, marginBottom: 10 }}
                renderRightActions={RightSwipeActions}>
                <CoverItem item={item} />
            </Swipeable>
        )
    }, [])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor={primaryBg}
            />
            <View style={styles.header}>
                <Text style={{ marginStart: 10, color: primaryAccent, fontSize: 24, fontFamily: Montserrat_Bold }}>
                    {'Favourites'}
                </Text>
            </View>
            <FlatList style={{ flex: 1, marginHorizontal: 5, marginVertical: 5 }} data={favouriteCovers}
                renderItem={renderFavItem} numColumns={1} ListEmptyComponent={ListEmptyComponent} />
        </SafeAreaView>
    )
}

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

export default FavouritesScreen

const RightSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: primaryAccent,
                    paddingHorizontal: 30,
                    fontFamily: Montserrat_Bold,
                    textAlign: 'right',
                    paddingVertical: 20,
                }}
            >
                {'Swipe to remove'}
            </Text>
        </View>
    );
};

const ListEmptyComponent: FC = () => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: Montserrat_SemiBold, fontSize: 18, color: primaryAccent }}>
            {'No favourites yet...'}
        </Text>
    </View>
}