import React from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import Gradient from 'react-native-linear-gradient'
import { fonts } from '../../utils'
export default class SurveyItems extends React.Component {

    render() {
        const {
            onChangeTextHandler,
            value,
            clickHandler1,
            clickHandler2,
            clickHandler3,
            clickHandler4,
            clickHandler5,
            isRating,
            isComment,
            question,
            networkText
        } = this.props
        return (
            <View
                style={{
                    //flex: 1,
                    width: widthPercentageToDP(100),
                    alignItems: 'center',
                    marginTop: widthPercentageToDP(2)
                }}>
                <Text
                    style={{
                        paddingLeft: widthPercentageToDP(7),
                        paddingRight: widthPercentageToDP(7),
                        fontSize: widthPercentageToDP(4),
                        fontFamily: fonts.elegance,
                        color: "#000",
                        //fontWeight:"bold"
                    }}>
                    {question}
                </Text>
                {isRating &&
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                            width: widthPercentageToDP(85),
                            marginTop: widthPercentageToDP(2),
                            marginBottom: widthPercentageToDP(2),
                            justifyContent: "space-between"
                        }}>
                        <TouchableOpacity
                            onPress={clickHandler1}
                        >
                            <FastImage
                                source={
                                    value === 1 ?
                                        require('../../Images/gold_start.png')
                                        : value === 2 ?
                                            require('../../Images/gold_start.png')
                                            : value === 3 ?
                                                require('../../Images/gold_start.png')
                                                : value === 4 ?
                                                    require('../../Images/gold_start.png')
                                                    : value === 5 ?
                                                        require('../../Images/gold_start.png')
                                                        : require('../../Images/silver_star.png')
                                }
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10),
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={clickHandler2}
                        >
                            <FastImage
                                source={
                                    value === 1 ?
                                        require('../../Images/silver_star.png')
                                        : value === 2 ?
                                            require('../../Images/gold_start.png')
                                            : value === 3 ?
                                                require('../../Images/gold_start.png')
                                                : value === 4 ?
                                                    require('../../Images/gold_start.png')
                                                    : value === 5 ?
                                                        require('../../Images/gold_start.png')
                                                        : require('../../Images/silver_star.png')
                                }
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10),
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={clickHandler3}
                        >
                            <FastImage
                                source={
                                    value === 1 ?
                                        require('../../Images/silver_star.png')
                                        : value === 2 ?
                                            require('../../Images/silver_star.png')
                                            : value === 3 ?
                                                require('../../Images/gold_start.png')
                                                : value === 4 ?
                                                    require('../../Images/gold_start.png')
                                                    : value === 5 ?
                                                        require('../../Images/gold_start.png')
                                                        : require('../../Images/silver_star.png')
                                }
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10),
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={clickHandler4}
                        >
                            <FastImage
                                source={
                                    value === 1 ?
                                        require('../../Images/silver_star.png')
                                        : value === 2 ?
                                            require('../../Images/silver_star.png')
                                            : value === 3 ?
                                                require('../../Images/silver_star.png')
                                                : value === 4 ?
                                                    require('../../Images/gold_start.png')
                                                    : value === 5 ?
                                                        require('../../Images/gold_start.png')
                                                        : require('../../Images/silver_star.png')
                                }
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10),
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={clickHandler5}
                        >
                            <FastImage
                                source={
                                    value === 1 ?
                                        require('../../Images/silver_star.png')
                                        : value === 2 ?
                                            require('../../Images/silver_star.png')
                                            : value === 3 ?
                                                require('../../Images/silver_star.png')
                                                : value === 4 ?
                                                    require('../../Images/silver_star.png')
                                                    : value === 5 ?
                                                        require('../../Images/gold_start.png')
                                                        : require('../../Images/silver_star.png')
                                }
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(10),
                                    height: widthPercentageToDP(10),
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                {isComment &&
                    <Gradient
                        style={{
                            height: widthPercentageToDP(18),
                            width: widthPercentageToDP(85),
                            marginBottom: widthPercentageToDP(2),
                            borderWidth: widthPercentageToDP(0.3),
                            borderColor: "#000",
                            marginTop: widthPercentageToDP(2)
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={["#cacaca", "#e9e9e9"]
                        }
                    >
                        <TextInput
                            placeholder="Escribe aquí tu comentario."
                            placeholderTextColor="grey"
                            style={{
                                width: widthPercentageToDP(85),
                                height: widthPercentageToDP(18),
                                paddingTop: widthPercentageToDP(-2),
                                paddingLeft: widthPercentageToDP(2),
                                color: "#000",
                                fontFamily: fonts.elegance,
                                fontSize: widthPercentageToDP(4),
                                //backgroundColor:"red"
                            }}
                            numberOfLines={5}
                            multiline
                            returnKeyType={"next"}
                            editable={true}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value = {networkText}
                            onChangeText={text => onChangeTextHandler(text)}
                        />
                    </Gradient>
                }
            </View>
        )
    }
}
