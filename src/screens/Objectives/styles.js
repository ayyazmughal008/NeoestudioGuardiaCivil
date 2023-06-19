import { Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { fonts } from '../../utils'
export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        //alignItems: "center"
    },
    logo: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(9),
        position:"absolute",
        right:"1%",
        top:"0%"
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
    headerView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(9),
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: Platform.OS === 'android' ? 0 : heightPercentageToDP(5)
    },
    menu: {
        position:"absolute",
        top:"20%",
        left:"3%"
    },
    rankView: {
        marginLeft: widthPercentageToDP(1)
    },
    courseName: {
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.elegance,
        color: "#000",
        marginLeft: widthPercentageToDP(5),
        marginTop: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
    },
    mainView: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(5),
        alignItems: "center",
    },
    itemTimeView: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginLeft: widthPercentageToDP(7),
        width: widthPercentageToDP(55),
        height: heightPercentageToDP(4),
        alignItems: "center",
        justifyContent: "space-between"
    },
    itemText: {
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        color: "#000",
    },
    itemMin: {
        fontSize: widthPercentageToDP(3),
        fontFamily: fonts.elegance,
        color: "#000",
    },
    counterView: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(7),
        //backgroundColor:"red",
        justifyContent: "center"
    },
    plusMinus: {
        width: widthPercentageToDP(12),
        height: widthPercentageToDP(10)
    },
    counterText: {
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        color: "#000",
        marginLeft: widthPercentageToDP(0.2),
        marginRight: widthPercentageToDP(0.2)
    },
    modalMain: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerModal: {
        width: "100%",
        height: "100%",
        marginBottom: widthPercentageToDP(10),
        marginLeft: widthPercentageToDP(5),
        marginRight: widthPercentageToDP(5)
    },
    navigation: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100)
    },
    topModal: {
        flexDirection:"row",
        flexWrap:"wrap",
        width:widthPercentageToDP(100),
        marginTop:heightPercentageToDP(5),
        marginLeft:widthPercentageToDP(3)
    },
    navigationHeader: {
        flexDirection:"row",
        flexWrap:"wrap",
        position:"absolute",
        right:"5%"
    },
    loaderStyle: {
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(3)
    },
    mainModalView: {
        flex: 1,
        //marginTop: heightPercentageToDP(10)
    },
    titleText: {
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
        marginTop: heightPercentageToDP(1),
        marginBottom: widthPercentageToDP(4)
    },
    jump: { marginBottom: heightPercentageToDP(30) },
    topJump: {
        height: heightPercentageToDP(4)
    },
    modalTitle: {
        width:widthPercentageToDP(100),
        // position: "absolute",
        // left: "4%",
        // top: '4%'
        marginLeft:widthPercentageToDP(3)
    },
    modalTitleDetail:{
        width:widthPercentageToDP(60)
    },
    modalTileView: {
       width:widthPercentageToDP(40),
    },
    ModalTitleText: {
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        color: "#ffff",
    },
    ModalTitleText3: {
        fontSize: widthPercentageToDP(4.3),
        fontFamily: fonts.novaBold,
        color: "#ffff",
        marginLeft: widthPercentageToDP(3),

    },
    topTitle: {
        fontSize: widthPercentageToDP(5),
        fontFamily:fonts.novaBold,
        color: "#ffff",
    },
    pragsonTitle: {
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
        marginTop: heightPercentageToDP(10),
        marginBottom:heightPercentageToDP(2)
    },
    yearlyTitle:{
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.elegance,
        color: "#ffff",
        textAlign: "center",
        marginTop: heightPercentageToDP(2),
        marginBottom:heightPercentageToDP(2)
    },
    screenTitle:{
        marginTop:heightPercentageToDP(-2),
        marginBottom:heightPercentageToDP(1),
        marginLeft:heightPercentageToDP(1),
        fontSize: widthPercentageToDP(5),
        fontFamily: fonts.elegance,
        color: "#000",
    }
})