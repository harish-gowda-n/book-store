import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cover } from "./Types";
import { FAV_COVERS } from "./constants/Constants";

export const storeFavouriteCover = async (cover: Cover): Promise<void> => {
    let favourites = await fetchFavourites()
    favourites.push(cover)
    AsyncStorage.setItem(FAV_COVERS, JSON.stringify(favourites))
}

export const fetchFavourites = async (): Promise<Cover[]> => {
    let favourites = await AsyncStorage.getItem(FAV_COVERS)
    if (favourites) {
        favourites = JSON.parse(favourites)
    }
    return (favourites ? favourites : []) as Cover[]
}

export const deleteFavourite = async (cover: Cover): Promise<void> => {
    let favourites = await fetchFavourites()
    favourites = favourites.filter((favCovers) => favCovers.cover_id != cover.cover_id)
    AsyncStorage.setItem(FAV_COVERS, JSON.stringify(favourites))
}