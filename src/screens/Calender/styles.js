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
        top: Platform.OS === 'android' ? "0%": '5%',
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(9),
    },
    directoryView: {
        // width:widthPercentageToDP(100),
        // height:heightPercentageToDP(48),
        flex: 1,
        alignItems: "center",
        marginTop: heightPercentageToDP(-2)
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
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:"red"
    },
    innerModal2: {
        width: "100%",
        height: "100%",
        marginBottom: widthPercentageToDP(10),
        marginLeft: widthPercentageToDP(5),
        marginRight: widthPercentageToDP(5)
    },
    quesBox: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25),
        marginLeft: widthPercentageToDP(2),
        alignItems: "center",
        //justifyContent: "center",
    },
    modalButton: {
        backgroundColor: "#007EBA",
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
        borderRadius: widthPercentageToDP(8) / 2,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:"7%"
    },
    modalText: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: fonts.novaBold,
        color: "#000",
        marginTop:widthPercentageToDP(2),
        padding:widthPercentageToDP(1)
    },
    modalBtnText:{
        fontSize: widthPercentageToDP(3),
        fontFamily: fonts.novaBold,
        color: "#ffff",
    },
    textView: {
        padding:widthPercentageToDP(2),
        marginTop: widthPercentageToDP(5),
        marginRight:widthPercentageToDP(2),
        //alignItems:"center"
    },
    text2: {
        color: "#000",
        fontFamily: fonts.novaRegular,
        fontSize: widthPercentageToDP(4),
        //textAlign:"center",
        width: widthPercentageToDP(78),
        paddingLeft: widthPercentageToDP(3),
        //marginTop: widthPercentageToDP(5)

    },
    confirmBtn: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(10),
        position:"absolute",
        bottom:"5%",
        justifyContent: "center",
        alignItems: "center",
    },
    confirmStyle: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center",
    },
    confirmText: {
        color: "#ffff",
        fontFamily: fonts.novaRegular,
        fontSize: widthPercentageToDP(3.5),
    },
})