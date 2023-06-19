import { Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { fonts } from '../../utils'

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    logo: {
        position: "absolute",
        right: '0%',
        top: Platform.OS === 'android' ? "0%" : '5%',
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(9),
    },
    directoryView: {
        // width:widthPercentageToDP(100),
        // height:heightPercentageToDP(48),
        flex: 1,
        alignItems: "center",
        marginTop: heightPercentageToDP(14)
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    chatView: {
        flex: 1,
        marginTop: widthPercentageToDP(2),

    },
    bottomView: {
        position: "absolute",
        bottom: "0%",
        width: widthPercentageToDP(100),
        height: widthPercentageToDP(20),
        backgroundColor: "#e9e9e9",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: widthPercentageToDP(0.3),
        borderTopColor: "grey"
    },
    textInput: {
        width: widthPercentageToDP(60),
        height: widthPercentageToDP(13),
        color: "#000",
        fontFamily: fonts.elegance,
        fontSize: widthPercentageToDP(4),
        paddingLeft: widthPercentageToDP(1.5)
        //backgroundColor:"red"
    },
    jump: {
        height: heightPercentageToDP(10)
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        width: widthPercentageToDP(70),
        height: widthPercentageToDP(13),
        flexWrap: "wrap",
        borderRadius: widthPercentageToDP(10),
        backgroundColor: "#ffff",
        //justifyContent:"space-between"
    },
    attachment: {
        position: "absolute",
        left: "3%",
        bottom: "30%"
    },
    profileVie: {
        width: widthPercentageToDP(100),
        alignItems: "center"
    },
    profile: {
        width: widthPercentageToDP(25),
        height: widthPercentageToDP(25),
        borderRadius: widthPercentageToDP(25) / 2
    },
    profileName:{
        color: "#000",
        fontFamily: fonts.elegance,
        fontSize: widthPercentageToDP(5),
    },
    clear:{
        color: "#000",
        fontFamily: fonts.elegance,
        fontSize: widthPercentageToDP(3),
    }

})