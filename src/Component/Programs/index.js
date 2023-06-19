import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { fonts } from '../../utils'

const Programs = (props) => {

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems:"center" }}
                showsVerticalScrollIndicator={false}
            >
                <FastImage
                    source={{ uri: 'https://neoestudio.net/' + props.image }}
                    resizeMode={FastImage.resizeMode.contain}
                    style={styles.img}
                />
                {/* <Text style={styles.descript}>
                    {props.description}
                </Text> */}
                <TouchableOpacity
                    onPress={props.clickHandler}
                    style={styles.btn}
                >
                    <FastImage
                        source={require('../../Images/button.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.imgBtn}
                    >
                        <Text style={styles.btnText}>
                            {"Seleccionar estilo"}
                        </Text>
                    </FastImage>
                </TouchableOpacity>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems:"center",
    },
    img: {
        width: widthPercentageToDP(95),
        height: heightPercentageToDP(70),
        //alignSelf: "center",
        //marginRight: widthPercentageToDP(2),
        //backgroundColor:"red"
    },
    descript: {
        fontFamily: fonts.novaRegular,
        fontSize: widthPercentageToDP(4.5),
        color: '#000',
        textAlign: 'justify',
        flexWrap: 'wrap',
        //flexGrow: 1,
        //backgroundColor:"yellow"
    },
    btn: {
        alignSelf: "center",
        marginTop: heightPercentageToDP(-2)
    },
    imgBtn: {
        width: widthPercentageToDP(60),
        height: widthPercentageToDP(15),
        marginTop: heightPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"red"
    },
    btnText: {
        fontFamily: fonts.novaBold,
        fontSize: widthPercentageToDP(5),
        color: "#ffff"
    }
})

export default Programs