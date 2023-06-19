import React, { Component } from 'react';
import { View, Modal, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../utils';


const DialogBox = (props) => {
    return (
        <Modal
            transparent={true}
            visible={props.isDialogOpen}
            animationType="fade"
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => {
                console.log('alert close')
            }}
        >
            <TouchableOpacity
                style={styles.modalMain2}
                onPress={props.closeBox}
            >
                <View style={styles.quesBox}>
                    <View style={styles.toptile}>
                        <Text style={styles.toptext}>
                            {'Elige la imagen de tu perfil'}
                        </Text>
                    </View>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={["#006176", "#00a7cb"]}
                        style={styles.bottomView}>
                        <TouchableOpacity
                            onPress={props.galleryClick}
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.btnText}>
                                {"Fotografía"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={props.preClick}
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.btnText}>
                                {"Avatar"}
                            </Text>
                        </TouchableOpacity>

                    </LinearGradient>
                </View>
            </TouchableOpacity>
        </Modal>
    )

}


const styles = StyleSheet.create({
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(0,0,0,0.6)"
    },
    quesBox: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(20),
        marginLeft: widthPercentageToDP(0),
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        backgroundColor: '#FAF9F6',
        borderRadius: widthPercentageToDP(5),
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    btnText: {
        color: "#ffff",
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        textAlign:"center"
    },
    bottomView: {
        width: "100%",
        height: "30%",
        flexDirection: "row",
        position: "absolute",
        bottom: "0%",
        alignItems: "center",
        justifyContent: "space-around",
        //backgroundColor: lightBlue,
        borderBottomLeftRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5)
    },
    toptile: {
        width: "100%",
        height: "35%",
        alignItems:"center",
        justifyContent: "center",
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: "#000"
    },
    toptext: {
        color: "#000",
        fontSize: widthPercentageToDP(4.5),
        fontFamily: fonts.novaBold,
        //paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1),
        textAlign:'justify'
    },
    centerView: {
        flex: 1
    },
    radioStyle: {
        paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
    }
})

export default DialogBox;