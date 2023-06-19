import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native'
import { styles } from './styles';
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';
// import { dispatchFunc } from '../../Redux/action'

class DialogBox extends Component {

    render() {
        const { isDialogOpen, errorMessage, } = this.props.dialog
        return (
            <Modal
                transparent={true}
                visible={isDialogOpen}
                supportedOrientations={['portrait', 'landscape']}
                onRequestClose={() => {
                    console.log('alert close')
                }}
            >
                <View style={styles.modalMain2}>
                    <FastImage
                        source={require('../../screens/Home/assets/email_box.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.quesBox}>
                        <Text style={styles.text2}>
                            {errorMessage.split("<br/>").join("\n")}
                            {/* {errorMessage.replaceAll("<br/>", "\n")} */}
                        </Text>
                        <TouchableOpacity
                            style={styles.confirmBtn}
                            onPress={this.props.dispatchFunction}
                        >
                            <FastImage
                                source={require('../../Images/Cerrar.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.confirmStyle}
                            />
                        </TouchableOpacity>
                    </FastImage>
                </View>
            </Modal>
        )
    }
}
const mapStateToProps = state => ({
    dialog: state.dialog,
});
export default connect(mapStateToProps)(DialogBox);
