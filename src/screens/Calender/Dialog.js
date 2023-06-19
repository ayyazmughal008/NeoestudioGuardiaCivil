import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native'
import { styles } from './styles';
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';
// import { dispatchFunc } from '../../Redux/action'

export default class DialogBox extends Component {

    render() {
        const { isDialogOpen, onClickMe, description } = this.props
        return (
            <Modal
                transparent={true}
                visible={isDialogOpen}
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={() => {
                    console.log('alert close')
                }}
            >
                <View
                    style={styles.modalMain2}>
                    <View style={styles.innerModal}>
                        <FastImage
                            source={require('../../screens/Home/assets/email_box.png')}
                            resizeMode={FastImage.resizeMode.stretch}
                            style={styles.quesBox}
                        >
                            <View style={styles.textView}>
                                <Text style={styles.text2}>
                                    {description}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.confirmBtn}
                                onPress={onClickMe}
                            >
                                <FastImage
                                    source={require('../../Images/Cerrar.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.confirmStyle}
                                >
                                </FastImage>
                            </TouchableOpacity>
                        </FastImage>
                    </View>
                </View>
            </Modal>
        )
    }
}
