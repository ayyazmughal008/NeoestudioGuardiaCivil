import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { Badge } from 'react-native-elements'
import { fonts } from '../../utils'

export default class Directory extends React.Component {

    render() {
        const { title, img, clickHandler, status, isActive, count } = this.props
        return (
            <TouchableOpacity
                style={{
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(6),
                    alignItems: "center",
                    //justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: heightPercentageToDP(3)
                }}
                disabled={status === "Habilitado" ? false : true}
                onPress={clickHandler}
            >
                {isActive ?
                    <View>
                        <FastImage
                            source={img}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(20),
                                height: widthPercentageToDP(20)
                            }}
                        />
                        <Badge
                            status="error"
                            value={!count ? "!" : count}
                            containerStyle={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                            }}
                        />
                    </View>
                    : <FastImage
                        source={img}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(20),
                            height: widthPercentageToDP(20)
                        }}
                    />
                }
                <Text style={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexShrink: 1,
                    flexGrow: 1,
                    fontSize: widthPercentageToDP(4),
                    fontFamily: fonts.elegance,
                    color: "#252525",
                    marginLeft: widthPercentageToDP(2.5),
                    //textAlign: "center",
                    marginTop: widthPercentageToDP(1.5)
                }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}
