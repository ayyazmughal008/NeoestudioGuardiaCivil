import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../utils';

export default class Player extends React.Component {

    render() {
        const {
            minLength,
            maxLength,
            subject,
            getPoints,
            totalPoints,
            obtainPercentage,
            drawer,
            isHome
        } = this.props
        return (
            <View style={styles.container}>
                <FastImage
                    style={styles.sliderOuter}
                    source={require('../../Images/border1.png')}
                    resizeMode={FastImage.resizeMode.cover}
                >
                    <View style={styles.sliderInner}>
                        {minLength !== 'null' &&
                            <LinearGradient
                                style={[styles.slider, {
                                    width: `${minLength}%`,
                                    borderTopRightRadius: minLength === 100 ? widthPercentageToDP(5) : widthPercentageToDP(0),
                                    borderBottomRightRadius: minLength === 100 ? widthPercentageToDP(5) : widthPercentageToDP(0)
                                    //height: `100%`,
                                }]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={["#006176", "#00a7cb"]}
                            >

                            </LinearGradient>
                        }
                        <LinearGradient
                            style={[styles.slider2, {
                                width: `${maxLength - 0.5}%`,
                                borderTopLeftRadius: maxLength === 100 ? widthPercentageToDP(5) : widthPercentageToDP(0),
                                borderBottomLeftRadius: maxLength === 100 ? widthPercentageToDP(5) : widthPercentageToDP(0)
                                //height: `100%`,
                            }]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#3d3f3e", "#474847", "#616260", "#707070"]}
                        >

                        </LinearGradient>
                        <Text style={styles.subjectText}>
                            {subject}
                        </Text>
                    </View>
                </FastImage>
                <View style={styles.myView}>
                    {minLength !== 'null' &&
                        <FastImage
                            source={require('../../Images/slider.png')}
                            resizeMode={FastImage.resizeMode.cover}
                            style={[styles.sliderImage, {
                                marginLeft: `${minLength}%`,
                                //right: `${minLength - 10}%`,
                            }]}
                        >
                            <Text style={styles.percentageText}>
                                {Math.round(obtainPercentage)}{"%"}
                            </Text>
                        </FastImage>
                    }
                </View>
                {isHome ?
                    <View style={styles.valueView}>
                        <Text style={[styles.pointsText, {
                            color: drawer ? "#ffff" : "#000"
                        }]}>
                            {getPoints}{" "}
                        </Text>
                        <Text style={[styles.pointsText2, {
                            color: drawer ? "#ffff" : "#000"
                        }]}>
                            {getPoints === null ? '' : "pts"}
                        </Text>
                    </View>
                    : <View style={styles.valueView}>
                        <Text style={[styles.pointsText, {
                            color: drawer ? "#ffff" : "#000"
                        }]}>
                            {getPoints === "null" ? "" : getPoints}{" "}
                        </Text>
                        <Text style={[styles.pointsText2, {
                            color: drawer ? "#ffff" : "#000"
                        }]}>
                            {"/ "}{totalPoints === "null" ? "" : totalPoints}
                        </Text>
                    </View>
                }
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(7),
        flexDirection: "row",
        //backgroundColor: "yellow",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        marginLeft: widthPercentageToDP(3),
    },
    sliderOuter: {
        width: widthPercentageToDP(70),
        height: widthPercentageToDP(10.5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"red",
        alignSelf: 'center',
        //aspectRatio: 4.9,
    },
    myView: {
        width: widthPercentageToDP(59),
        height: widthPercentageToDP(13),
        marginTop: heightPercentageToDP(-3),
        position: "absolute",
        left: "-2.5%",
        //backgroundColor: "red"
    },
    sliderInner: {
        width: widthPercentageToDP(67),
        height: widthPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        //backgroundColor:"red"
    },
    sliderImage: {
        width: widthPercentageToDP(15),
        height: widthPercentageToDP(15),
        marginTop: heightPercentageToDP(-0.3),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"red"
    },
    slider: {
        marginTop: heightPercentageToDP(0.3),
        height: widthPercentageToDP(7),
        borderTopLeftRadius: widthPercentageToDP(5),
        borderBottomLeftRadius: widthPercentageToDP(5),
        // borderTopRightRadius: widthPercentageToDP(5),
        // borderBottomRightRadius: widthPercentageToDP(5)
    },
    slider2: {
        marginTop: heightPercentageToDP(0.3),
        height: widthPercentageToDP(7),
        borderTopRightRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5),
        // borderTopLeftRadius: widthPercentageToDP(5),
        // borderBottomLeftRadius: widthPercentageToDP(5),
    },
    valueView: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: widthPercentageToDP(5),
        marginTop: heightPercentageToDP(2.5),
        alignItems: "center",
        //backgroundColor:"green",
        width: widthPercentageToDP(20)
    },
    pointsText: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: fonts.elegance,
        color: "#000",
    },
    pointsText2: {
        fontSize: widthPercentageToDP(3),
        fontFamily: fonts.elegance,
        color: "#000",
        marginTop: widthPercentageToDP(0.5)
        //marginLeft:widthPercentageToDP(10)
    },
    subjectText: {
        fontSize: widthPercentageToDP(2),
        fontFamily: fonts.elegance,
        color: "#ffff",
        position: "absolute",
        left: "4%",
        top: "28%"
    },
    percentageText: {
        fontSize: widthPercentageToDP(2.5),
        fontFamily: fonts.agency,
        color: "#000",
        textAlign: "center",
    },
})