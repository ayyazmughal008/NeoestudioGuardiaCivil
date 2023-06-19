import React from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { fonts } from '../../utils'


const NewBattle = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileView}>
                {/* <FastImage
                    source={require('../../screens/Home/assets/Photo_or_avatar.png')}
                    style={styles.profleImg}
                    resizeMode={FastImage.resizeMode.contain}
                /> */}
                {!props.userImage ?
                    <FastImage
                        source={require('../../screens/Home/assets/Photo_or_avatar.png')}
                        style={styles.profleImg}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    : <FastImage
                        source={{ uri: "https://neoestudio.net/public/userImage/" + props.userImage }}
                        style={styles.profleImg}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
                <View>
                    <Text style={styles.folderName}>
                        {props.name}
                    </Text>
                    <Text style={styles.smallName}>
                        {props.ActiveUsers}{" participantes"}
                    </Text>
                </View>
            </View>
            {!props.FolderDetails || !props.FolderDetails.length ?
                <View />
                : props.FolderDetails.map((item, index) => {
                    return (
                        <View key={"unique" + index} style={{ marginTop: heightPercentageToDP(1) }}>
                            <View style={styles.folderView}>
                                <FastImage
                                    source={require('../../Images/empty_box.png')}
                                    style={[styles.vectorIcon3, {
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }]}>
                                    {props.isActive &&
                                        <FastImage
                                            source={require('../../Images/Check.png')}
                                            style={styles.vectorIcon}
                                        />
                                    }
                                </FastImage>
                                <Text style={styles.folderName}>
                                    {item.folderName}
                                </Text>
                            </View>
                            <View style={styles.listView}>
                                {!item.data || !item.data.length ?
                                    <View />
                                    : item.data.map((item, index) => {
                                        return (
                                            <View
                                                key={"unique" + index}
                                                style={styles.listItemView}>
                                                <FastImage
                                                    source={require('../../Images/Circulo.png')}
                                                    style={[styles.vectorIcon2, {
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }]}>
                                                    {props.isActive &&
                                                        <FastImage
                                                            source={require('../../Images/Check.png')}
                                                            style={styles.vectorIcon}
                                                        />
                                                    }
                                                </FastImage>
                                                <Text style={styles.fileName}>
                                                    {item.ExamName}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>

                    )
                })

            }
            <TouchableOpacity onPress={props.clickHandler} style={styles.btn}>
                <FastImage
                    source={require('../../Images/Unirse_al_combate.png')}
                    style={styles.btn}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        alignSelf: "center",
        marginBottom: heightPercentageToDP(1)
    },
    profileView: {
        width: widthPercentageToDP(95),
        flexDirection: "row",
        alignItems: "center",
        flex: 0,
        marginBottom: heightPercentageToDP(2)
    },
    profleImg: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
        borderRadius: widthPercentageToDP(5),
    },
    folderView: {
        width: widthPercentageToDP(90),
        flexDirection: "row",
        alignItems: "center",
        flex: 0,
    },
    vectorIcon: {
        width: widthPercentageToDP(6),
        height: widthPercentageToDP(6),
    },
    vectorIcon2: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
    },
    vectorIcon3: {
        width: widthPercentageToDP(8.5),
        height: widthPercentageToDP(8.5),
    },
    folderName: {
        marginLeft: widthPercentageToDP(6),
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        color: "#000"
    },
    smallName: {
        marginLeft: widthPercentageToDP(6),
        fontSize: widthPercentageToDP(3.5),
        fontFamily: fonts.elegance,
        color: "#000"
    },
    fileName: {
        marginLeft: widthPercentageToDP(4),
        fontSize: widthPercentageToDP(4),
        fontFamily: fonts.elegance,
        color: "#000",
        //fontWeight:"normal"
    },
    listView: {
        width: widthPercentageToDP(80),
        //flexDirection: "row-reverse",
        flex: 0,
        marginLeft: widthPercentageToDP(7),
        marginTop: heightPercentageToDP(0.5)
    },
    listItemView: {
        width: widthPercentageToDP(80),
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(1)
    },
    btn: {
        width: widthPercentageToDP(60),
        height: widthPercentageToDP(17),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        //backgroundColor: "red"
    }
})

export default NewBattle

