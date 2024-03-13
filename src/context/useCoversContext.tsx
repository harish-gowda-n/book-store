import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import { Cover, CoverApiResponse } from "../Types";
import axios from "axios";
import { fetchFavourites } from "../Asyncstore";

type CoversContextType = {
    covers: Cover[];
    isFetchingRemote: boolean;
    refreshRemoteData: () => void
    refreshFavouriteCovers: () => void
    favouriteCovers: Cover[];
    setFavouriteCovers: Dispatch<SetStateAction<Cover[]>>;
};

const CoversContext = createContext<CoversContextType | undefined>(undefined);

function useCovers(): CoversContextType {
    const context = useContext(CoversContext);
    if (!context) {
        throw new Error("used out of scope");
    }
    return context;
}

const CoversProvider = (props: { children: ReactNode }): ReactElement => {

    useEffect(() => {
        refreshRemoteData()
        refreshFavouriteCovers()
    }, [])

    const refreshRemoteData = useCallback(() => {
        axios.get<CoverApiResponse>("https://openlibrary.org/subjects/sci-fi.json?details=true")
            .then((res) => {
                // console.log("response received => ");
                // console.log(res);
                if (res.status == 200) {
                    let data = res.data
                    setCovers(data.works)
                }
            }).catch((err) => {
                console.log(`Error loading data -> ${err}`);
            }).finally(() => {
                setIsFetchingRemote(false)
            })
    }, [])

    const refreshFavouriteCovers = useCallback(async () => {
        setFavouriteCovers(await fetchFavourites())
    }, [])

    const [covers, setCovers] = useState<Cover[]>([])
    const [isFetchingRemote, setIsFetchingRemote] = useState<boolean>(true)
    const [favouriteCovers, setFavouriteCovers] = useState<Cover[]>([])

    return <CoversContext.Provider {...props} value={{
        covers, isFetchingRemote, refreshRemoteData,
        favouriteCovers, setFavouriteCovers, refreshFavouriteCovers
    }} />;
};

export { CoversProvider, useCovers };