import { View, Text, Image } from 'react-native'
import { Cover } from '../Types'
import FavouriteButton from './FavouriteButton'
import LikeButton from './LikeButton'
import { FC } from 'react'
import { primaryAccent, primaryBg } from '../colors'
import { Montserrat_Bold, Montserrat_Medium, Montserrat_Regular } from '../font-exporter'
import { useCovers } from '../context/useCoversContext'

type Props = { shouldShowActionButtons?: boolean | undefined, item: Cover }

const CoverItem: FC<Props> = ({ item, shouldShowActionButtons }) => {
    let { favouriteCovers } = useCovers()
    let authorNames = stringBuilder(item.authors.map(x => x.name))
    let subjects = stringBuilder(item.subject)
    let isFavourite = favouriteCovers.find((fav) => fav.cover_id == item.cover_id)

    return <View style={{
        backgroundColor: primaryBg, borderRadius: 4, marginBottom: 15, flexDirection: 'row', elevation: 10,
    }} >
        <Image src={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`} style={{
            width: 110, height: 160, borderBottomLeftRadius: 4, borderTopLeftRadius: 4
        }} resizeMode='stretch'/>
        <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 10 }}>
            <Text style={{
                color: primaryAccent, fontSize: 18, fontFamily: Montserrat_Bold, flex: 1,
                textDecorationLine: 'underline'
            }}>
                {item.title}
            </Text>
            <View style={{ flex: 5, justifyContent: 'center' }}>
                <Text style={{ fontFamily: Montserrat_Regular, fontSize: 12, color: primaryAccent }}
                    ellipsizeMode='tail' numberOfLines={3}>
                    {`Genres: ${subjects}`}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                <View style={{
                    flexDirection: 'column', justifyContent: 'flex-end',
                    flex: 3
                }}>
                    <Text style={{ fontFamily: Montserrat_Medium, fontSize: 12, color: primaryAccent }}
                        ellipsizeMode='tail' numberOfLines={1}>
                        {`Authors: ${authorNames}`}
                    </Text>
                    <Text style={{ fontFamily: Montserrat_Medium, fontSize: 12, color: primaryAccent }}>
                        {`Published: ${item.first_publish_year}`}
                    </Text>
                </View>
                {shouldShowActionButtons && <View style={{ flex: 1, alignSelf: 'flex-end', flexDirection: 'row' }}>
                    <FavouriteButton cover={item} isPressed={isFavourite != undefined} />
                    <LikeButton cover={item} isPressed={false} />
                </View>}
            </View>
        </View>
    </View>
}

const stringBuilder = (strArr: string[]): string => {
    let str = ""
    strArr.forEach((val, ind) => {
        if (ind == strArr.length - 1) str += val
        else str += val + ', '
    })
    return str
}

export default CoverItem