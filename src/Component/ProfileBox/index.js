import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { fonts } from '../../utils'

export default class HomeMenu extends React.Component {

    render() {
        const {
            username,
            experience,
            aptos,
            puntos,
            percentage,
            profileImage,
            rankImage,
            rankName
        } = this.props
        return (
            <View style={{
                width: widthPercentageToDP(95),
                flex: 0,
                flexDirection: "row",
                alignItems: "center",
                marginTop: heightPercentageToDP(1),
                marginBottom: heightPercentageToDP(1)
            }}>
                {!profileImage ?
                    <FastImage
                        source={require('../../screens/Home/assets/Photo_or_avatar.png')}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.bageImg}
                    />
                    : <FastImage
                        source={{ uri: 'https://neoestudio.net/public/userImage/' + profileImage }}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.bageImg2}
                    />}
                <View style={{
                    width: widthPercentageToDP(65),
                    height: heightPercentageToDP(8),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginLeft: widthPercentageToDP(2)
                    //backgroundColor: "red"
                }}>
                    <View style={{ alignItems: "center" }}>
                        {!rankImage ?
                            <FastImage
                                source={{ uri: 'https://neoestudio.net/gamification/1642874385.png' }}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.smallIcon}
                            />
                            : <FastImage
                                source={{ uri: 'https://neoestudio.net/' + rankImage }}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.smallIcon}
                            />
                        }
                        <Text style={styles.smallTxt}>
                            {!rankName ? "Aspirante" : rankName}
                        </Text>
                        <Text style={styles.smallTxt2}>
                            {!username ? "" : username.slice(0, 8)}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <FastImage
                            source={require('../../Images/Timer.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.smallIcon}
                        />
                        <Text style={styles.smallTxt}>
                            {!experience ? 0 : experience === 'NaN' ? 0 : experience}
                        </Text>
                        <Text style={styles.smallTxt2}>
                            {'Tiempo'}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <FastImage
                            source={require('../../screens/Home/assets/Medallas.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.smallIcon}
                        />
                        <Text style={styles.smallTxt}>
                            {!aptos ? 0 : aptos}
                        </Text>
                        <Text style={styles.smallTxt2}>
                            {"Aptos"}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", marginRight: widthPercentageToDP(2) }}>
                        <FastImage
                            source={require('../../screens/Home/assets/Puntos.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.smallIcon}
                        />
                        <Text style={styles.smallTxt}>
                            {!puntos ? 0 : puntos}
                        </Text>
                        <Text style={styles.smallTxt2}>
                            {"Correctas"}
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <FastImage
                            source={require('../../screens/Home/assets/Percentage.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={[styles.smallIcon, {
                                width: widthPercentageToDP(11),
                                height: widthPercentageToDP(11),
                                marginTop: heightPercentageToDP(0.5)
                            }]}
                        />
                        <Text style={[styles.smallTxt, {
                            marginTop: heightPercentageToDP(1.5)
                        }]}>
                            {!percentage ? 0 : percentage}
                        </Text>
                        <Text style={styles.smallTxt2}>
                            {"Percentil"}
                        </Text>
                    </View>
                </View>
            </View>
        )

    }
}
const styles = StyleSheet.create({
    imgStyle: {
        width: widthPercentageToDP(33),
        height: widthPercentageToDP(30)
    },
    bageImg: {
        width: widthPercentageToDP(23),
        height: widthPercentageToDP(23),
        borderRadius: widthPercentageToDP(5),
    },
    bageImg2: {
        width: widthPercentageToDP(23),
        height: widthPercentageToDP(23),
        borderRadius: widthPercentageToDP(5),
    },
    smallIcon: {
        width: widthPercentageToDP(14),
        height: widthPercentageToDP(14),
    },
    smallTxt: {
        marginTop: heightPercentageToDP(0.5),
        color: '#252525',
        fontSize: widthPercentageToDP(3.5),
        fontFamily: fonts.novaBold,
    },
    smallTxt2: {
        marginTop: heightPercentageToDP(0.5),
        color: '#252525',
        fontSize: widthPercentageToDP(3),
        fontFamily: fonts.novaRegular,
    }
})
