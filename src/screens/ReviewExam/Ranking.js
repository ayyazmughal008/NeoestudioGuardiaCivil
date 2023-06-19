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
            totalPoints
        } = this.props
        return (
            <View style={{
                //flex:1,
                width: widthPercentageToDP(40),
                height: heightPercentageToDP(15),
                marginTop: heightPercentageToDP(1),
                marginBottom: heightPercentageToDP(1),
                //backgroundColor: "red",
            }}>

                <View style={styles.sliderView}>
                    <View
                        style={styles.container}
                    >
                        {minLength !== 'null' &&
                            <LinearGradient
                                style={[styles.slider, {
                                    width: `${minLength}%`,
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
                                width: `${maxLength}%`,
                                borderTopLeftRadius: maxLength === 100 ? widthPercentageToDP(5) : widthPercentageToDP(0),
                                borderBottomLeftRadius: maxLength === 100 ? widthPercentageToDP(5) : widthPercentageToDP(0)
                                //height: `100%`,
                            }]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={["#99adbc", "#2c3f4f"]}
                        >

                        </LinearGradient>
                        {minLength !== 'null' &&
                            <FastImage
                                source={require('../../Images/slider.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={[styles.sliderImage, {
                                    left: `${minLength - 10}%`,
                                    //right: `${maxLength}%`,
                                }]}
                            >
                                <Text style={styles.percentageText}>
                                    {minLength}{"%"}
                                </Text>
                            </FastImage>
                        }
                    </View>
                    {totalPoints !== 'null' &&
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            marginLeft: widthPercentageToDP(5)
                            //alignItems: "center"
                        }}>
                            <Text style={styles.pointsText}>
                                {getPoints}{" "}
                            </Text> 
                            {/* <Text style={styles.pointsText2}>
                                {"/ "}{totalPoints}
                            </Text> */}
                        </View>
                    }
                </View>
                <Text style={styles.subjectText}>
                    {subject}
                </Text>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(4),
        borderRadius: widthPercentageToDP(5),
        borderWidth: widthPercentageToDP(1),
        borderColor: "#C0C0C0",
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: widthPercentageToDP(6),
        marginTop: heightPercentageToDP(3)
        //justifyContent:"center",
        //alignItems:"center"
    },
    slider: {
        height: heightPercentageToDP(3),
        borderTopLeftRadius: widthPercentageToDP(5),
        borderBottomLeftRadius: widthPercentageToDP(5)
    },
    sliderImage: {
        width: widthPercentageToDP(15),
        height: widthPercentageToDP(15),
        marginTop: widthPercentageToDP(-4.5),
        //marginLeft:widthPercentageToDP(1),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        // backgroundColor: "red"
    },
    percentageText: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: fonts.elegance,
        color: "#000",
        textAlign: "center",
    },
    slider2: {
        height: heightPercentageToDP(3),
        borderTopRightRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5)
    },
    pointsText: {
        fontSize: widthPercentageToDP(3),
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
    },
    pointsText2: {
        fontSize: widthPercentageToDP(2.5),
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
        marginTop: widthPercentageToDP(0.5)
        //marginLeft:widthPercentageToDP(10)
    },
    sliderView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(10),
        flexDirection: "row",
        flexWrap: "wrap",
        //justifyContent: "space-between",
        alignItems: "center"
    },
    subjectText: {
        fontSize: widthPercentageToDP(3),
        fontFamily: fonts.elegance,
        color: "#ffff",
        //textAlign: "center",
        position: "absolute",
        left: "14%",
        top: "35%"
    }
})
