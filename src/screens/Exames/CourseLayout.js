import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import {
    widthPercentageToDP,
    heightPercentageToDP
} from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { fonts } from '../../utils'

export default class Course extends React.Component {

    render() {
        const { image, text, } = this.props
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                }}
            >
                <FastImage
                    source={image}
                    style={{
                        width: widthPercentageToDP(15),
                        height: widthPercentageToDP(15)
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                    style={{
                        fontSize: widthPercentageToDP(3.5),
                        fontFamily: fonts.novaRegular,
                        color: "#707070",
                        marginTop: heightPercentageToDP(1)
                    }}>
                    {text}
                </Text>
            </View>
        )
    }
}