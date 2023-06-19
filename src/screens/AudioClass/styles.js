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
        marginTop: heightPercentageToDP(5)
    },
    AudioView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(60),
        // backgroundColor:"red",
        alignItems: "center",
        marginTop: heightPercentageToDP(4)
    },
    audioBG: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(14.5),
        marginTop:widthPercentageToDP(0)
        //flex:1
    },
    playerView: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: widthPercentageToDP(5),
    },
    buttonStyle: {
        width: widthPercentageToDP(10),
        height: heightPercentageToDP(5)
    },
    playButton:{
        width: widthPercentageToDP(12),
        height: heightPercentageToDP(6)
    },
    btStyles: {
        marginLeft: widthPercentageToDP(1),
        marginRight: widthPercentageToDP(1),
        marginTop:widthPercentageToDP(3)
    },
    trackText: {
        color: "#707070",
        fontFamily: fonts.novaBold,
        fontSize: widthPercentageToDP(3),
        marginLeft:widthPercentageToDP(2),
        //textAlign:"right"
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})