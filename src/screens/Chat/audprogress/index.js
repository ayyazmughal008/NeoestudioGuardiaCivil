import React from 'react'
import { connect } from 'react-redux';
import { View, Text, Platform } from 'react-native'
import TrackPlayer, { getDuration } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
let handler = require('./handler_s.png');
import { heightPercentageToDP, widthPercentageToDP } from '../../../Component/MakeMeResponsive'
class AudProgressBar extends TrackPlayer.ProgressComponent {

    formatTime = (position) => {
        let cur = position
        let nmin = parseInt(cur / 60)
        let min = ("0" + parseInt(cur / 60)).slice(-2)
        let sec = ("0" + parseInt(cur - nmin * 60)).slice(-2)
        return min + ':' + sec
    }

    render() {
        let duration = this.state.duration
        let tot = this.formatTime(duration)

        return (
            <View style={{
                width: widthPercentageToDP(70),
            }}>

                {/* <Text style={{
                    fontSize: widthPercentageToDP(4),
                    width: widthPercentageToDP(80),
                    textAlign: "right"
                }}>
                    {this.formatTime(this.state.position)} /{tot}
                </Text> */}

                <Slider
                    value={this.getProgress()}
                    disabled={false}
                    trackStyle={{
                        backgroundColor: "#6A6B6F",
                        height: heightPercentageToDP(10),
                        borderRadius: widthPercentageToDP(2),
                        borderBottomWidth: widthPercentageToDP(1),
                        borderBottomColor: "#ffffff"
                    }}
                    minimumTrackTintColor="#007EBA"
                    maximumTrackTintColor="#6A6B6F"
                    // style={{
                    //     borderRadius: widthPercentageToDP(10),
                    //     marginBottom: widthPercentageToDP(5)
                    // }}
                    thumbImage={handler}
                    thumbStyle={{
                        width: widthPercentageToDP(70),
                        height: heightPercentageToDP(25),
                        backgroundColor: "transparent"
                    }}
                />
            </View>
        );
    }

}
export default AudProgressBar;