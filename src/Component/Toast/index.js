import React, { useState, useEffect } from 'react'
import { Text, Modal, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { hideToastFunc } from '../../Redux/action'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { fonts } from '../../utils'

const Toast = (props) => {
    const dispatch = useDispatch()
    const showToast = useSelector((state) => state.user.showToast);

    useEffect(() => {
        setTimeout(() => {
            dispatch(hideToastFunc())
        }, 1000);
    }, [])

    return (
        <Modal
            visible={showToast}
            animationType='slide'
            transparent={true}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => console.log("Hi")}
        >
            <View style={{ flex: 1 }}>
                <View
                    // start={{ x: 0, y: 0 }}
                    // end={{ x: 1, y: 0 }}
                    // colors={["#ffffff", "#fafafa"]}
                    style={{
                        width: widthPercentageToDP(95),
                        height: heightPercentageToDP(6),
                        borderWidth: widthPercentageToDP(0.2),
                        borderColor: "#000",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        bottom: "5%",
                        alignSelf: "center",
                        backgroundColor:"#ffffff"
                    }}
                >
                    <Text style={{
                        fontFamily: fonts.novaBold,
                        fontSize: widthPercentageToDP(4),
                        color: "#000"
                    }}>
                        {"!Enhorabuena!"}
                    </Text>
                    <Text style={{
                        fontFamily: fonts.elegance,
                        fontSize: widthPercentageToDP(4),
                        color: "#000"
                    }}>
                        {"Has completado y archivado esta tarea."}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

export default Toast