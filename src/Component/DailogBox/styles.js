import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { fonts } from '../../utils'
export const styles = StyleSheet.create({
    modalMain2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column"
        //backgroundColor:"red"
    },
    quesBox: {
        width: widthPercentageToDP(95),
        height: widthPercentageToDP(61),
        //marginLeft: widthPercentageToDP(2),
        alignItems: "center",
        //backgroundColor: "red",
        alignSelf: "center"
        // justifyContent: "center",
    },
    text2: {
        color: "#000",
        fontFamily: fonts.novaRegular,
        fontSize: widthPercentageToDP(4.2),
        textAlign: "justify",
        paddingLeft: widthPercentageToDP(5),
        paddingRight: widthPercentageToDP(6),
        paddingTop: heightPercentageToDP(2.5)
        //paddingLeft: widthPercentageToDP(1),
        //marginTop: widthPercentageToDP(7)

    },
    confirmBtn: {
        width: widthPercentageToDP(60),
        height: widthPercentageToDP(16),
        position: "absolute",
        bottom: "6%",
        //backgroundColor: "yellow"
    },
    confirmStyle: {
        width: "100%",
        height: "100%",
    },
    confirmText: {
        color: "#ffff",
        fontFamily: fonts.novaRegular,
        fontSize: widthPercentageToDP(3.5),
    },
})