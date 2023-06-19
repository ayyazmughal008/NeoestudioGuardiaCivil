import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { Badge } from 'react-native-elements'
import { fonts } from '../../utils'

export default class UploadFiles extends React.Component {

    render() {
        const { image, text, clickHandler, status, textUri, isActive } = this.props
        return (
            <View style={{
                width: widthPercentageToDP(63),
                height: heightPercentageToDP(8),
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        //flex:1,
                        width: widthPercentageToDP(60),
                        height: heightPercentageToDP(7),
                    }}
                    onPress={clickHandler}
                    disabled={status === "Deshabilitado" ? true : false}
                >
                    {isActive ?
                        <View>
                            <FastImage
                                source={require('./assets/upload.png')}
                                style={{
                                    width: widthPercentageToDP(20),
                                    height: widthPercentageToDP(17)
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                            <Badge
                                status="error"
                                value={"!"}
                                containerStyle={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                }}
                            />
                        </View>
                        : <FastImage
                            source={require('./assets/upload.png')}
                            style={{
                                width: widthPercentageToDP(20),
                                height: widthPercentageToDP(17)
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    }
                    <Text
                        style={{
                            fontSize: widthPercentageToDP(5),
                            fontFamily: fonts.elegance,
                            color: "#252525",
                            marginLeft: widthPercentageToDP(2)
                        }}>
                        {text}
                    </Text>
                </TouchableOpacity>
                {/* {textUri && */}
                <Text
                    style={{
                        fontSize: widthPercentageToDP(3),
                        fontFamily: fonts.elegance,
                        color: "#252525",
                        textAlign: "right",
                        marginTop: widthPercentageToDP(-3),
                        marginRight: widthPercentageToDP(2)
                    }}>
                    {textUri}
                </Text>
                {/* } */}
            </View>
        )
    }
}