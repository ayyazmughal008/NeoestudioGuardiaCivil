import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { fonts } from '../../utils'


const NewBattle = (props) => {
    return (
        <TouchableOpacity
            onPress={props.clickHandler}
            style={styles.container}>
            <View style={styles.listItemView}>
                <FastImage
                    source={require('../../Images/Circulo.png')}
                    style={[styles.vectorIcon2, {
                        justifyContent: "center",
                        alignItems: "center"
                    }]}>
                    {props.isActive === "True" &&
                        <FastImage
                            source={require('../../Images/Check.png')}
                            style={styles.vectorIcon}
                        />
                    }
                </FastImage>
                <Text style={styles.folderName}>
                    {props.ExamName}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        alignSelf: "center",
        marginLeft: widthPercentageToDP(10),
        marginTop: heightPercentageToDP(0.5)
        //marginBottom: heightPercentageToDP(3)
    },
    folderView: {
        width: widthPercentageToDP(90),
        flexDirection: "row",
        alignItems: "center",
        flex: 0,
    },
    vectorIcon: {
        width: widthPercentageToDP(6),
        height: widthPercentageToDP(6),
    },
    vectorIcon2: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
    },
    vectorIcon3: {
        width: widthPercentageToDP(8.5),
        height: widthPercentageToDP(8.5),
    },
    folderName: {
        marginLeft: widthPercentageToDP(6),
        fontSize: widthPercentageToDP(4.5),
        fontFamily: fonts.novaRegular,
        color: "#000"
    },
    fileName: {
        marginLeft: widthPercentageToDP(4),
        fontSize: widthPercentageToDP(5),
        fontFamily: fonts.novaRegular,
        color: "#000",
    },
    listView: {
        width: widthPercentageToDP(80),
        //flexDirection: "row-reverse",
        flex: 0,
        marginLeft: widthPercentageToDP(7),
        marginTop: heightPercentageToDP(1)
    },
    listItemView: {
        width: widthPercentageToDP(80),
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(1)
    }
})

export default NewBattle