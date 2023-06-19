import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { Badge } from 'react-native-elements'
import DeviceInfo from 'react-native-device-info'
import { fonts } from '../../utils'

export default class Download extends React.Component {

    render() {
        const { image, text, clickHandler, isActive, count } = this.props
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: widthPercentageToDP(80),
                    height: heightPercentageToDP(8),
                    marginTop: DeviceInfo.isTablet() ? heightPercentageToDP(3) : 0
                }}
                onPress={clickHandler}
            >
                {isActive ?
                    <View>
                        <FastImage
                            source={require('../../Images/directory.png')}
                            style={{
                                width: widthPercentageToDP(18),
                                height: widthPercentageToDP(18)
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                        <Badge
                            status="error"
                            value={count}
                            containerStyle={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                            }}
                        />
                    </View>
                    : <FastImage
                        source={require('../../Images/directory.png')}
                        style={{
                            width: widthPercentageToDP(18),
                            height: widthPercentageToDP(18)
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                }
                <Text
                    style={{
                        flex: 1,
                        flexWrap: 'wrap',
                        flexShrink: 1,
                        flexGrow: 1,
                        fontSize: widthPercentageToDP(4),
                        fontFamily: fonts.elegance,
                        color: "#252525",
                        marginLeft: widthPercentageToDP(2)
                    }}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}