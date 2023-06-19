import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import {fonts} from '../../utils'
export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        //alignItems: "center"
    },
    logo: {
        position: "absolute",
        right: '0%',
        top: "5%",
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(7)
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
    pic1: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25)
    },
    viewLinnear: {
        flexDirection: "row",
        alignItems: "center",
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(15),
        marginTop: heightPercentageToDP(-2),
        justifyContent: "center"
    },
    pic2: {
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(15),

    },
    pic3: {
        position: "absolute",
        left: '3%',
        top: '50%',
        width: widthPercentageToDP(15),
        height: widthPercentageToDP(15)
    },
    textPic1: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(4),
        marginTop: heightPercentageToDP(3)
    },
    checkboxView: {
        flexDirection: "row",
        width: widthPercentageToDP(100),
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: heightPercentageToDP(2)
    },
    checkBox: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center"
    },
    text2: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(6),
    },
    bottomView: {
        position: "absolute",
        bottom: "5%",
        alignItems: "center"
    },
    button: {
        width: widthPercentageToDP(31),
        height: widthPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center",
        //alignSelf:"center"
        margin: widthPercentageToDP(1),
        //backgroundColor:"red"
    },
    title: {
        fontSize: widthPercentageToDP(6),
        fontFamily: fonts.novaBold,
        color: "#000",
    },
    tick: {
        width: widthPercentageToDP(6),
        height: widthPercentageToDP(6)
    },
    packageImageView: {
        width: widthPercentageToDP(35),
        height: widthPercentageToDP(30),
        //alignItems: "center",
        //backgroundColor:"red",
        margin: widthPercentageToDP(1),
        alignSelf: "center"
    },
    totalPriceView: {
        width: widthPercentageToDP(97),
        height: heightPercentageToDP(5.5),
        alignSelf: "center",
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: "center",
        alignItems: "center"
    },
    priceText: {
        fontSize: widthPercentageToDP(5),
        fontFamily: fonts.novaBold,
        color: "#ffff",
    },
    PriceView: {
        width: widthPercentageToDP(97),
        height: heightPercentageToDP(5.5),
        alignSelf: "center",
        //backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: "center",
        alignItems: "center",
        marginTop: heightPercentageToDP(2)
    },
    smallPrice: {
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.novaBold,
        color: "#000",
    },
    btnStyle: {
        //marginTop:heightPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center",
        width: widthPercentageToDP(70),
        height: widthPercentageToDP(15),
        alignSelf: "center",
        //backgroundColor:"yellow"
        marginTop: heightPercentageToDP(2),
    },
    rowView: {
        marginTop: heightPercentageToDP(1),
        width: widthPercentageToDP(100),
        height: widthPercentageToDP(10),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    left: {
        width: "65%",
        //height: "100%",
        //justifyContent: "center",
        //alignItems: "center"
    },
    right: {
        width: "35%",
        //height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    packageDetail: {
        width: widthPercentageToDP(100),
        height: widthPercentageToDP(80),
        //backgroundColor:"red"
    }
})