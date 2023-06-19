import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems:"center"
    },
    logo: {
        width: "28%",
        height: "19%",
        position: "absolute",
        right: "1%",
        top: "0%",
        zIndex: 3
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
    graph1: {
        flex: 1,
        marginLeft: 16,
        marginStart: 15,
        //height:heightPercentageToDP(50)
    },
    logoView: {
        position: "absolute",
        top: "0%",
        right: "3%"
    },
    leftLine: {
        position: "absolute",
        left: "3%",
        bottom: "2%"
    },
    bottomLine: {
        position: "absolute",
        bottom: "2%",
        left: "5%"
    },
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
    },
})