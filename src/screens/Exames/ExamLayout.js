import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import {
    widthPercentageToDP,
    heightPercentageToDP
} from '../../Component/MakeMeResponsive'
import { fonts } from '../../utils'

export default class Course extends React.Component {

    render() {
        const { text, clickHandler, status, activeStatus, studentExamStatus, onLongPres, examStatus } = this.props
        return (
            <View
                style={{
                    alignItems: "center",
                }}
            >

                <TouchableOpacity
                    onPress={clickHandler}
                    disabled={studentExamStatus ? false : status === "Deshabilitado" ? true : false}
                    onLongPress={onLongPres}
                    delayLongPress={1001}
                >
                    <Text
                        style={{
                            fontSize: widthPercentageToDP(4),
                            fontFamily: status === "Habilitado" ?
                            fonts.novaRegular :
                                studentExamStatus ?
                                fonts.novaBold
                                    : fonts.novaBold,
                            color: activeStatus === "true" ? "#0A52CB"
                                : examStatus === 'paused' ?
                                    "#0A52CB"
                                    : status === "Habilitado" ?
                                        "#202020"
                                        : studentExamStatus ?
                                            "#202020"
                                            : "#202020",
                            marginTop: heightPercentageToDP(1),
                            //fontWeight: studentExamStatus ? 'bold' : status === "Deshabilitado" ? "300" : "bold"
                        }}>
                        {text}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }
}