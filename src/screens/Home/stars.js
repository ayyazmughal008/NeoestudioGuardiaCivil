import React from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'

export default class SurveyItems extends React.Component {

    render() {
        const {
            value,
            clickHandler1,
            clickHandler2,
            clickHandler3,
            clickHandler4,
            clickHandler5,
        } = this.props
        return (
            <View
                style={{
                    //flex: 1,
                    width: widthPercentageToDP(100),
                    alignItems: 'center',
                    marginTop: widthPercentageToDP(2)
                }}>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        width: widthPercentageToDP(75),
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

            </View>
        )
    }
}
