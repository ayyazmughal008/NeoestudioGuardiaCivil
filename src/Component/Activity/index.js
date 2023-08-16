import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import {fonts} from '../../utils'


const Activity = (props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.clickHandler}
            activeOpacity={1}
        >
            <FastImage
                source={props.type === 'video' ?
                    require('../../Images/video.png')
                    : props.type === 'pdf' ?
                        require('../../Images/pdf.png')
                        : props.type === 'audio' ?
                            require('../../Images/audio.png')
                            : props.type === 'review' ?
                                require('../../Images/personality2.png')
                                : props.type === 'exam' ?
                                    props.name.includes('Orto') ?
                                        require('../../screens/Exames/assets/ortografia.png')
                                        : props.name.includes('Inglés') ?
                                            require('../../screens/Exames/assets/Ingless.png')
                                            : props.name.includes('Psico') ?
                                                require('../../screens/Exames/assets/Psicotecnicos.png')
                                                : props.name.includes('Gramática') ?
                                                    require('../../screens/Exames/assets/cono.png')
                                                    : require('../../screens/Exames/assets/cono.png')
                                    : props.type === 'personality' ?
                                        require('../../Images/personality2.png')
                                        : require('../../Images/personality2.png')

                }
                resizeMode={FastImage.resizeMode.contain}
                style={styles.img}
            />

            {(props.type === 'exam' || props.type === 'review' || props.type === 'personality') ?
                <Text style={[styles.title, {
                    fontFamily: props.studentExamStatus === 'end' ?
                        fonts.elegance
                        : props.isCompleted === 'no' ?
                            fonts.novaBold : fonts.novaRegular,
                }]}>
                    {(props.type === 'exam' || props.type === 'review' || props.type === 'personality') ?
                        props.activityName !== "" ? props.activityName
                            : props.title !== "" ? props.title
                                : props.name !== "" ? props.name : "" : ""
                    }
                </Text>
                : <Text style={[styles.title, {
                    fontFamily: props.isCompleted === 'no' ? fonts.novaBold : fonts.novaRegular,
                }]}>
                    {/* {!props.activityName ? props.name
                        : !props.name ? props.title : props.activityName} */}
                    {props.activityName !== "" ? props.activityName
                        : props.title !== "" ? props.title
                            : props.name !== "" ? props.name : ""}
                </Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fefefe',
        borderRadius: 5,
        height: 60,
        margin: 5,
        //marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: "center",
        flexDirection: "row"
    },
    img: {
        width: widthPercentageToDP(12),
        height: widthPercentageToDP(12),
        marginLeft: widthPercentageToDP(4)
    },
    title: {
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1,
        flexGrow: 1,
        fontSize: widthPercentageToDP(4),
        color: "#252525",
        marginLeft: widthPercentageToDP(2.5),
        //textAlign: "center",
        marginTop: widthPercentageToDP(1.5)
    }
})

export default Activity